import { NextResponse } from "next/server";
import JSZip from "jszip";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  // Create Supabase client that can read auth and storage
  const supabase = await createClient();

  // Get the currently authenticated user from Supabase auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  // If not authenticated, return error
  if (authError || !user) {
    return NextResponse.json({ message: "Authentication required" }, { status: 401 });
  }

  // Look up the user's profile to get display name and folder path
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, folder_path")
    .eq("id", user.id)
    .single();

  // If profile missing or folder path absent, send error
  if (profileError || !profile?.folder_path) {
    return NextResponse.json(
      { message: profileError?.message ?? "Profile not found" },
      { status: 400 },
    );
  }

  // List all files in the user's storage folder, sorted by updated time
  const { data: files, error: listError } = await supabase.storage
    .from("client-galleries")
    .list(profile.folder_path, {
      sortBy: { column: "updated_at", order: "desc" },
    });

  if (listError) {
    return NextResponse.json(
      { message: listError.message },
      { status: 500 },
    );
  }

  // Remove any placeholder files that may have been added to keep empty folders
  const activeFiles = (files ?? []).filter((file) => file.name !== ".emptyFolderPlaceholder");

  if (activeFiles.length === 0) {
    return NextResponse.json(
      { message: "No files available for download" },
      { status: 404 },
    );
  }

  // Build an in-memory ZIP archive
  const zip = new JSZip();

  for (const file of activeFiles) {
    // Compose the storage path to each file
    const filePath = `${profile.folder_path}/${file.name}`;

    // Download the file blob from Supabase storage
    const { data: fileBlob, error: downloadError } = await supabase.storage
      .from("client-galleries")
      .download(filePath);

    if (downloadError || !fileBlob) {
      return NextResponse.json(
        { message: downloadError?.message ?? "Unable to download file" },
        { status: 500 },
      );
    }

    // Convert to ArrayBuffer and add to the zip under the original filename
    const fileBuffer = await fileBlob.arrayBuffer();
    zip.file(file.name, fileBuffer, {
      // Preserve file modification date when available
      date: file.updated_at ? new Date(file.updated_at) : undefined,
    });
  }

  // Generate the ZIP archive as an ArrayBuffer with moderate compression
  const archiveBuffer = (await zip.generateAsync({
    type: "arraybuffer",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  })) as ArrayBuffer;
  const archiveBytes = new Uint8Array(archiveBuffer);

  // Create a safe filename using the user's full name or folder path
  const labelSource = profile.full_name ?? profile.folder_path;
  const safeLabel =
    labelSource
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "gallery";
  const filename = `${safeLabel}.zip`;

  // Return the ZIP with appropriate headers for download
  return new NextResponse(archiveBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
      "Content-Length": String(archiveBytes.byteLength),
    },
  });
}

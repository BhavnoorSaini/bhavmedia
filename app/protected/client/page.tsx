import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ImageIcon } from "lucide-react";
import { Suspense } from "react";
import { GalleryGrid, GalleryImage } from "@/components/gallery-grid";
import { DownloadAllButton } from "./download-all-button";

export const metadata: Metadata = {
  title: "BhavMedia Client Portal",
  description:
    "Centralize gallery previews and bulk downloads.",
  alternates: {
    canonical: "/protected/client",
  },
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    images: [
      {
        url: "/opengraph-image.png",
      },
    ],
  },
};

// Name of the Supabase storage bucket that holds client galleries
const GALLERY_BUCKET = "client-galleries";

const SIGNED_URL_TTL_SECONDS = 60 * 60; // Supabase signed URLs expire hourly

const SIGNED_URL_BATCH_SIZE = 90; // Stay under Supabase's 100-url limit per request

type StoredGalleryFile = {
  name: string;
  path: string;
  updated_at?: string | null;
  created_at?: string | null;
};

/**
 * Create signed URLs for a set of gallery files.
 * Split the list into smaller chunks, request signed URLs for each
 * chunk in parallel, and then re-assemble the final array of `GalleryImage`
 */
async function createSignedGalleryImages(
  supabase: Awaited<ReturnType<typeof createClient>>,
  files: StoredGalleryFile[],
): Promise<GalleryImage[]> {
  if (files.length === 0) return [];

  // Split the files into batches to avoid exceeding provider limits
  const chunks: StoredGalleryFile[][] = [];
  for (let i = 0; i < files.length; i += SIGNED_URL_BATCH_SIZE) {
    chunks.push(files.slice(i, i + SIGNED_URL_BATCH_SIZE));
  }

  // Request signed URLs for each chunk in parallel for speed
  const chunkResults = await Promise.all(
    chunks.map(async (chunk) => {
      const { data, error } = await supabase.storage
        .from(GALLERY_BUCKET)
        .createSignedUrls(
          chunk.map((file) => file.path),
          SIGNED_URL_TTL_SECONDS,
        );

      if (error) {
        // Storage errors
        throw new Error(error.message);
      }

      return { chunk, data: data ?? [] };
    }),
  );

  // Re-map the signed URL responses back to the `GalleryImage` shape
  return chunkResults
    .flatMap(({ chunk, data }) =>
      data.map((signed, index) => {
        if (!signed?.signedUrl) return null;
        const file = chunk[index];

        return {
          name: file.name,
          url: signed.signedUrl,
          updatedAt: file.updated_at ?? file.created_at,
        } satisfies GalleryImage;
      }),
    )
    .filter(Boolean) as GalleryImage[];
}

/**
 * Server component that loads the authenticated user's profile, lists
 * gallery files from Supabase storage, obtains signed URLs and renders the
 * client gallery UI. If the user is not authenticated it redirects to login
 */
async function UserProfile() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  // Fetch Profile Data
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, folder_path")
    .eq("id", userData.user.id)
    .single();

  if (profileError || !profile) {
    return <div>Error loading profile: {profileError?.message}</div>;
  }

  // List all files in the folder_path
  const { data: files, error: storageError } = await supabase.storage
    .from(GALLERY_BUCKET)
    .list(profile.folder_path, {
      sortBy: { column: "updated_at", order: "desc" },
    });

  if (storageError) {
    return <div>Error fetching images: {storageError.message}</div>;
  }

  // Prepare file list and create Signed URLs for each image (1 hour expiry)
  const imageFiles = (files ?? [])
    .filter((file) => file.name !== ".emptyFolderPlaceholder")
    .map((file) => ({
      ...file,
      path: `${profile.folder_path}/${file.name}`,
    })) satisfies StoredGalleryFile[];

  let galleryImages: GalleryImage[] = [];

  try {
    // Request signed URLs for all images (batched by helper above)
    galleryImages = await createSignedGalleryImages(supabase, imageFiles);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch signed links";
    // If signed URL generation fails
    return <div>Error fetching signed links: {message}</div>;
  }

  return (
    <div className="flex flex-col gap-12">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-background via-primary/5 to-background px-6 py-12 text-center sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, hsl(var(--primary) / 0.12), transparent 45%), radial-gradient(circle at 88% 0%, hsl(var(--primary) / 0.08), transparent 35%), linear-gradient(130deg, rgba(255, 255, 255, 0.04) 0%, transparent 45%)",
          }}
        />
        <div className="relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Welcome, {profile.full_name ?? "there"}
            </h1>
            <p className="text-base text-muted-foreground">
              Tap any photo to preview it or download everything at once below.
            </p>
          </div>
          <DownloadAllButton
            disabled={galleryImages.length === 0}
            className="w-full sm:w-auto"
          />
        </div>
      </section>

      {galleryImages.length > 0 ? (
        <GalleryGrid images={galleryImages} />
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border/60 bg-muted/20 p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="text-lg font-semibold">Gallery in progress</p>
          <p className="text-sm text-muted-foreground">
            Files will appear here as soon as they are ready.
          </p>
        </div>
      )}
    </div>
  );
}

export default function ProtectedPage() {
  return (
    <Suspense fallback={<div className="h-64 w-full rounded-3xl border border-border/60 bg-muted/30 animate-pulse" />}>
      <UserProfile />
    </Suspense>
  );
}

'use server';
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { r2Client } from "@/lib/r2/r2";

export async function getPhotos() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
  });

  try {
    const { Contents } = await r2Client.send(command);
    return Contents?.map((file) => ({
      key: file.Key,
      url: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/${file.Key}`,
    })) || [];
  } catch (error) {
    console.error("Error fetching from R2:", error);
    return [];
  }
}

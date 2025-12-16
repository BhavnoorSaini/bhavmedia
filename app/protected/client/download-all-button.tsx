"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

/* Props for the DownloadAllButton component */
type DownloadAllButtonProps = {
  disabled?: boolean;
  className?: string;
};

/* Extracts filename from Content-Disposition header */
function getFilenameFromHeader(headerValue: string | null) {
  if (!headerValue) return null;
  /* Regex to match filename patterns */
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(headerValue);
  
  /* Prefer encoded filename if available else plain filename */
  const value = match?.[1] ?? match?.[2];

  if (!value) return null;
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function DownloadAllButton({ disabled, className }: DownloadAllButtonProps) {
  /* State for loading and error message */
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* Label based on loading state */
  const label = isLoading ? "Preparing archive..." : "Download all";

  /* Handles the download button click */
  const handleClick = async () => {
    setErrorMessage(null); /* Clear previous errors */
    setIsLoading(true);

    try {
      /* Fetch the download route */
      const response = await fetch("/protected/client/download");

      /* Throw error if response is not ok */
      if (!response.ok) {
        const { message } = await response.json().catch(() => ({ message: null }));
        throw new Error(message ?? "Unable to prepare download");
      }

      /* Create a blob from the response and trigger download */
      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const filename = getFilenameFromHeader(
        response.headers.get("Content-Disposition"), /* Extract filename from header */
      ) ?? "gallery.zip"; /* Fallback filename */

      /* Create and click an anchor element to start download */
      const anchor = document.createElement("a");
      anchor.href = downloadUrl; /* Set download URL */
      anchor.download = filename; /* Set filename */
      document.body.appendChild(anchor); /* Append anchor to body */
      anchor.click(); /* Trigger download */
      anchor.remove(); /* Remove anchor from body so it doesn't clutter the DOM */
      URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      /* Set error message on failure */
      const fallback =
        error instanceof Error ? error.message : "Unexpected download error";
      setErrorMessage(fallback);
    } finally {
      setIsLoading(false); /* Reset loading state after download attempt */
    }
  };

  return (
    <div className={className}>
      <Button
        onClick={handleClick}
        disabled={disabled || isLoading}
        variant="default"
        className="gap-2"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span>{label}</span>
      </Button>
      {/* Display error message if present*/}
      {errorMessage ? (
        <p className="mt-2 text-sm text-destructive">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

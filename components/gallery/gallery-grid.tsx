"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type GalleryImage = {
  name: string;
  url: string;
  updatedAt?: string | null;
};

type Props = {
  images: GalleryImage[];
};

// Progressive rendering constants: render a small batch first, then load more
// in steps to avoid layout thrash with very large galleries.
const INITIAL_VISIBLE = 12;
const LOAD_STEP = 12;

export function GalleryGrid({ images }: Props) {
  // Selected image shown in the preview modal
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  // Aspect ratio used for the preview container while the image loads
  const [previewAspectRatio, setPreviewAspectRatio] = useState(1);

  // Number of images currently rendered
  const [visibleCount, setVisibleCount] = useState(() => Math.min(INITIAL_VISIBLE, images.length));

  // Sentinel element for IntersectionObserver-driven incremental loading
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const handleSelect = useCallback((image: GalleryImage) => {
    setSelected(image);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(images.length, prev + LOAD_STEP));
  }, [images.length]);

  // Memoize the slice of images that will actually render
  const visibleImages = useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);

  const hasMore = visibleCount < images.length;

  // Close preview on Escape key
  useEffect(() => {
    if (!selected) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, selected]);

  // Reset the preview aspect ratio each time a new image URL is selected.
  // The actual ratio is measured when the <Image> load event fires.
  useEffect(() => {
    setPreviewAspectRatio(1);
  }, [selected?.url]);

  // Reset visible count when the images array changes (new gallery)
  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_VISIBLE, images.length));
  }, [images.length]);

  // IntersectionObserver to progressively load more images when the
  // Infinite-scroll style
  useEffect(() => {
    if (!hasMore) return undefined;
    const target = sentinelRef.current;
    if (!target) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((prev) => Math.min(images.length, prev + LOAD_STEP));
        }
      },
      { rootMargin: "400px 0px" },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, images.length]);

  // Prevent background scrolling while modal preview is open
  useEffect(() => {
    if (!selected) return undefined;
    const { style } = document.documentElement;
    const originalOverflow = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = originalOverflow;
    };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((img, index) => (
          <GalleryCard
            key={img.name}
            image={img}
            isFirst={index === 0}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {hasMore ? (
        <>
          <div ref={sentinelRef} aria-hidden className="h-1 w-full opacity-0" />
          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleLoadMore}
              variant="outline"
              size="sm"
            >
              Load {Math.min(LOAD_STEP, images.length - visibleCount)} more
            </Button>
          </div>
        </>
      ) : null}

      {selected ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${selected.name}`}
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-card shadow-2xl ring-1 ring-border"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close preview"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground transition hover:bg-muted/80 focus:outline-none focus:ring-2 focus:ring-ring"
              onClick={close}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-4 p-5 sm:p-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1">
                  <ImageIcon className="h-4 w-4" />
                  High-res preview
                </span>
              </div>

              <div className="relative rounded-xl bg-muted/50 p-3 ring-1 ring-border">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: previewAspectRatio, maxHeight: "70vh", minHeight: "240px" }}
                >
                  <Image
                    src={selected.url}
                    alt={`Preview of ${selected.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 70vw"
                    className="rounded-lg object-contain"
                    onLoad={({ currentTarget }) => {
                      // Measure intrinsic image ratio once loaded so the
                      // preview container can use a natural aspect ratio.
                      if (currentTarget.naturalWidth && currentTarget.naturalHeight) {
                        setPreviewAspectRatio(currentTarget.naturalWidth / currentTarget.naturalHeight);
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <div className="flex items-center gap-2">
                  {/* Download button rendered as a styled link to preserve
                      native download behavior while using the app Button */}
                  <Button variant="default" asChild>
                    <a href={selected.url} download target="_blank" rel="noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

type GalleryCardProps = {
  image: GalleryImage;
  isFirst: boolean;
  onSelect: (image: GalleryImage) => void;
};

const GalleryCard = memo(function GalleryCard({ image, isFirst, onSelect }: GalleryCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(image)}
      onKeyDown={(event) => {
        // Support Enter and Space to open preview for keyboard users
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(image);
        }
      }}
      className="group relative overflow-hidden rounded-2xl border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          src={image.url}
          alt={`Client photo ${image.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
          priority={isFirst}
          loading={isFirst ? "eager" : "lazy"}
        />
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
        <div className="relative flex items-center justify-end gap-3 px-4 pb-4 pt-3 text-foreground">
          {/* Small download button for each card. Stop propagation so the
              click doesn't also trigger the card's onClick (open preview). */}
          <Button asChild size="sm" variant="secondary">
            <a href={image.url} download target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
              <Download className="h-4 w-4" />
              <span className="sr-only">Download {image.name}</span>
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
});

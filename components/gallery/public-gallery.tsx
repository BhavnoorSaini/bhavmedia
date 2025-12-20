"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, Maximize2, X } from "lucide-react";

export type GalleryImage = {
  name: string;
  url: string;
};

type Props = {
  images: GalleryImage[];
};

const INITIAL_VISIBLE = 10; // reduce initial load for performance
const LOAD_STEP = 8; // load 8 more images each time user scrolls near bottom

export function GalleryGrid({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [previewAspectRatio, setPreviewAspectRatio] = useState(1);
  const [visibleCount, setVisibleCount] = useState(() => Math.min(INITIAL_VISIBLE, images.length));
  
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setSelected(null), []);
  const handleSelect = useCallback((image: GalleryImage) => setSelected(image), []);

  const visibleImages = useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);
  const hasMore = visibleCount < images.length;

  // Keyboard navigation
  useEffect(() => {
    if (!selected) return;
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [selected, close]);

  // Infinite Scroll
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
      { rootMargin: "100px 0px" } // Load images when user is 100px away from bottom
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, images.length]);

  // Prevent background scroll when preview window is open
  useEffect(() => {
    if (!selected) return;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = "auto"; };
  }, [selected]);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {visibleImages.map((img, index) => (
          <GalleryCard
            key={img.name}
            image={img}
            isFirst={index === 0}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={sentinelRef} className="h-20 w-full" aria-hidden="true" />
      )}

      {/* Lightbox Preview */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute right-4 top-4 z-[110] rounded-full bg-muted/80 p-2 text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col gap-4 p-4 sm:p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <ImageIcon className="h-4 w-4 text-primary" />
                <span>High-Resolution Preview</span>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-muted/30 ring-1 ring-border">
                <div
                  className="relative mx-auto w-full transition-all duration-500"
                  style={{ 
                    aspectRatio: previewAspectRatio, 
                    maxHeight: "75vh",
                    minHeight: "300px" 
                  }}
                >
                  <Image
                    src={selected.url}
                    alt={selected.name}
                    fill
                    priority
                    sizes="90vw"
                    className="object-contain"
                    onLoad={({ currentTarget }) => {
                      if (currentTarget.naturalWidth && currentTarget.naturalHeight) {
                        setPreviewAspectRatio(currentTarget.naturalWidth / currentTarget.naturalHeight);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const GalleryCard = memo(function GalleryCard({ 
  image, 
  isFirst, 
  onSelect 
}: { 
  image: GalleryImage; 
  isFirst: boolean; 
  onSelect: (img: GalleryImage) => void 
}) {
    return (
        <div
        role="button"
        tabIndex={0}
        className="group relative cursor-pointer overflow-hidden rounded-xl border border-border/60 bg-background/90 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
        onClick={() => onSelect(image)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(image)}
        >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
            <Image
            src={image.url}
            alt={image.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition duration-700 group-hover:scale-105"
            loading={isFirst ? "eager" : "lazy"}
            priority={isFirst}
            />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 transition-opacity backdrop-blur-[2px] group-hover:opacity-100">
            <div className="rounded-full bg-primary p-2.5 text-primary-foreground shadow-lg shadow-primary/30">
            <Maximize2 className="h-4 w-4" />
            </div>
        </div>
        </div>
    );
});
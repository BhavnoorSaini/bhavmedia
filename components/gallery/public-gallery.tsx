"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

export type GalleryImage = {
  name: string;
  url: string;
};

type Props = {
  images: GalleryImage[];
};

const INITIAL_VISIBLE = 25; // reduce initial load for performance
const LOAD_STEP = 10; // load more images each time user scrolls near bottom

export function GalleryGrid({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
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
          {
              rootMargin: "400px",
          }
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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {visibleImages.map((img, index) => (
          <GalleryCard
            key={img.name}
            image={img}
            isFirst={index < 4}
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-105 backdrop-blur-md"
          >
            <X className="h-6 w-6 stroke-[2]" />
          </button>

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={selected.url}
                alt={selected.name}
                fill
                priority
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
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
          className="group relative cursor-pointer overflow-hidden rounded-3xl border border-border/40 bg-muted/20 shadow-sm transition-all hover:-translate-y-2 hover:shadow-xl"
          onClick={() => onSelect(image)}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(image)}
        >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/50">
            <Image
              src={image.url}
              alt={image.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="object-cover transition duration-700 group-hover:scale-110"
              loading={isFirst ? "eager" : "lazy"}
              priority={isFirst}
            />
        </div>
        
        <div className="absolute inset-0 flex items-center justify-center bg-background/10 opacity-0 transition-all duration-300 backdrop-blur-[2px] group-hover:opacity-100">
            <div className="rounded-full bg-background/90 p-4 text-foreground shadow-xl transition-transform group-hover:scale-110">
              <Maximize2 className="h-5 w-5 stroke-[1.5]" />
            </div>
        </div>
        </div>
    );
});

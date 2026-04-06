"use client";

import Image from "next/image";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Download, X, Maximize2 } from "lucide-react";

export type GalleryImage = {
  name: string;
  url: string;
  updatedAt?: string | null;
};

type Props = {
  images: GalleryImage[];
};

const INITIAL_VISIBLE = 12;
const LOAD_STEP = 12;

export function GalleryGrid({ images }: Props) {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [visibleCount, setVisibleCount] = useState(() => Math.min(INITIAL_VISIBLE, images.length));
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const close = useCallback(() => setSelected(null), []);

  const handleSelect = useCallback((image: GalleryImage) => {
    setSelected(image);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(images.length, prev + LOAD_STEP));
  }, [images.length]);

  const visibleImages = useMemo(() => images.slice(0, visibleCount), [images, visibleCount]);
  const hasMore = visibleCount < images.length;

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

  useEffect(() => {
    setVisibleCount(Math.min(INITIAL_VISIBLE, images.length));
  }, [images.length]);

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
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visibleImages.map((img, index) => (
          <GalleryCard
            key={img.name}
            image={img}
            isFirst={index < 4}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {hasMore ? (
        <>
          <div ref={sentinelRef} aria-hidden className="h-1 w-full opacity-0" />
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background/50 px-8 text-sm font-medium transition-colors hover:bg-muted"
            >
              Load {Math.min(LOAD_STEP, images.length - visibleCount)} more
            </button>
          </div>
        </>
      ) : null}

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-md"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close preview"
            className="absolute right-6 top-6 z-[110] rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20 hover:scale-105 backdrop-blur-md"
            onClick={close}
          >
            <X className="h-6 w-6 stroke-[2]" />
          </button>

          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview ${selected.name.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
            className="relative w-full h-full max-w-7xl flex flex-col items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[90vh]">
              <Image
                src={selected.url}
                alt={`Preview of ${selected.name.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
                fill
                sizes="100vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="absolute bottom-6 sm:bottom-10 z-[110]">
              <a 
                href={selected.url} 
                download 
                target="_blank" 
                rel="noreferrer"
                className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-white/10 px-8 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-white/20 backdrop-blur-md ring-1 ring-white/20 shadow-xl"
              >
                <Download className="h-4 w-4" />
                Download High-Res
              </a>
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
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(image);
        }
      }}
      className="group relative overflow-hidden rounded-[2rem] border border-border/40 bg-muted/20 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted/50">
        <Image
          src={image.url}
          alt={`Client photo ${image.name.split('.')[0].replace(/[-_]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-110"
          priority={isFirst}
          loading={isFirst ? "eager" : "lazy"}
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/10 opacity-0 transition-all duration-300 backdrop-blur-[2px] group-hover:opacity-100">
          <div className="rounded-full bg-background/90 p-4 text-foreground shadow-xl transition-transform group-hover:scale-110 mb-4">
            <Maximize2 className="h-5 w-5 stroke-[1.5]" />
          </div>
      </div>
      
      {/* Individual card download button overlay */}
      <div className="absolute inset-x-0 bottom-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="relative flex items-center justify-center pb-6 pt-4">
          <a 
            href={image.url} 
            download 
            target="_blank" 
            rel="noreferrer" 
            onClick={(event) => event.stopPropagation()}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-background px-6 text-xs font-medium text-foreground transition-transform hover:scale-105 shadow-lg"
          >
            <Download className="h-3.5 w-3.5" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
});

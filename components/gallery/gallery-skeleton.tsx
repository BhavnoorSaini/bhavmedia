export function GallerySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="aspect-[3/4] w-full animate-pulse rounded-xl border border-border/60 bg-muted/30" 
        />
      ))}
    </div>
  );
}
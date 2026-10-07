type ProductImageProps = {
  label: string;
  src?: string;
  className?: string;
};

export function ProductImage({ label, src, className = "" }: ProductImageProps) {
  if (src) {
    return <img src={src} alt={label} className={`object-cover ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center bg-[var(--color-accent-100)] text-[var(--color-accent-700)] text-center text-xs font-medium px-2 ${className}`}
    >
      {label}
    </div>
  );
}

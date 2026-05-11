interface SectionHeaderProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}

export function SectionHeader({
  subtitle,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-8 ${align === "center" ? "text-center" : "text-left"}`}>
      {subtitle && (
        <p
          className={`text-xs uppercase tracking-wider font-medium mb-2 ${
            light ? "text-white/70" : "text-primary"
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-2xl sm:text-3xl font-semibold ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-2 text-sm max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

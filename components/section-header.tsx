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
    <div className={`mb-8 lg:mb-10 ${align === "center" ? "text-center" : "text-left"}`}>
      {subtitle && (
        <p
          className={`text-xs lg:text-sm uppercase tracking-wider font-medium mb-2 ${
            light ? "text-white/70" : "text-primary"
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-semibold ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm lg:text-base max-w-3xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          } ${light ? "text-white/70" : "text-muted-foreground"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

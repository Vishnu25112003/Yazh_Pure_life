import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features?: string[];
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
}: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
          <Icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground mt-2 leading-relaxed">
            {description}
          </p>
        </div>
        {features && features.length > 0 && (
          <ul className="space-y-2 pt-2">
            {features.map((feature, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

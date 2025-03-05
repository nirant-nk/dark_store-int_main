
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className,
  valuePrefix,
  valueSuffix,
}: StatCardProps) {
  return (
    <div className={cn(
      "relative overflow-hidden rounded-lg border bg-card p-5 shadow-sm transition-all duration-200 hover:shadow-md",
      className
    )}>
      <div className="flex justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h4 className="mt-2 text-2xl font-bold tracking-tight">
            {valuePrefix}{value}{valueSuffix}
          </h4>
          
          {trend && (
            <p className={cn(
              "mt-1 flex items-center text-xs font-medium",
              trend.positive ? "text-green-600" : "text-red-600"
            )}>
              <span className={cn(
                "mr-1 text-sm",
                trend.positive ? "text-green-600" : "text-red-600"
              )}>
                {trend.positive ? "↑" : "↓"}
              </span>
              {Math.abs(trend.value)}%
              <span className="ml-1 text-muted-foreground">vs. last week</span>
            </p>
          )}

          {description && (
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          )}
        </div>
        
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
    </div>
  );
}

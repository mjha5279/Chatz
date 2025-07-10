import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  isOnline: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function StatusIndicator({
  isOnline,
  size = "md",
  className,
}: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "h-2 w-2",
    md: "h-3 w-3",
    lg: "h-4 w-4",
  };

  return (
    <div
      className={cn(
        "rounded-full border-2 border-sidebar",
        sizeClasses[size],
        isOnline ? "bg-green-500" : "bg-gray-400",
        className,
      )}
    />
  );
}

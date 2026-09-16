import * as React from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Avatar({
  src,
  alt = "User Avatar",
  name = "",
  size = "md",
  className,
  ...props
}: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base font-semibold",
    xl: "h-20 w-20 text-xl font-bold",
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full ring-1 ring-border bg-muted items-center justify-center font-medium text-muted-foreground",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !imgError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <span>{getInitials(name || alt)}</span>
      )}
    </div>
  );
}

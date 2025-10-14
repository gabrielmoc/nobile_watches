import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full font-lato font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-neutral-200 text-neutral-900",
        primary: "bg-primary-500 text-white",
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-white",
        outline: "border border-neutral-300 text-neutral-900 bg-transparent",
      },
      size: {
        sm: "h-5 px-2 text-xs",
        md: "h-6 px-3 text-sm",
        lg: "h-8 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <span ref={ref} className={badgeVariants({ variant, size, className })} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

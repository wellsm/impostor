import { Root, Thumb } from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/lib/utils";

const switchVariants = cva(
  "peer inline-flex shrink-0 items-center rounded border border-transparent shadow-xs outline-none transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
  {
    variants: {
      size: {
        default: "h-[1.15rem] w-8",
        lg: "h-6 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const thumbVariants = cva(
  "pointer-events-none block rounded bg-background ring-0 transition-transform dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground",
  {
    variants: {
      thumb: {
        default:
          "size-4 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0",
        lg: "h-[1.15rem] w-5 data-[state=checked]:translate-x-[calc(100%+4px)] data-[state=unchecked]:translate-x-[0.15rem]",
      },
    },
    defaultVariants: {
      thumb: "default",
    },
  }
);

function Switch({
  size,
  className,
  ...props
}: React.ComponentProps<typeof Root> & VariantProps<typeof switchVariants>) {
  return (
    <Root
      className={cn(switchVariants({ size, className }))}
      data-slot="switch"
      {...props}
    >
      <Thumb
        className={cn(thumbVariants({ thumb: size, className }))}
        data-slot="switch-thumb"
      />
    </Root>
  );
}

export { Switch };

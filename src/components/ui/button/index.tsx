import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { type ButtonVariants, buttonVariants } from "./variants";

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonVariants) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      data-size={size}
      data-slot="button"
      data-variant={variant}
      {...props}
    />
  );
}

export { Button };

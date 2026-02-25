import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";
import { type BadgeVariants, badgeVariants } from "./variants";

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeVariants) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      className={cn(badgeVariants({ variant }), className)}
      data-slot="badge"
      data-variant={variant}
      {...props}
    />
  );
}

export { Badge };

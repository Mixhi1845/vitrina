import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const dotVariants = cva(
  "size-[16rem] sm:size-[40rem] lg:size-[62.5rem] absolute",
  {
    variants: {
      variant: {
        netflix:
          "bg-[radial-gradient(closest-side,rgba(229,9,20,0.25),rgba(229,9,20,0))]",
        imdb: "bg-[radial-gradient(closest-side,rgba(226,182,22,0.25),rgba(226,182,22,0))]",
        white:
          "bg-[radial-gradient(closest-side,rgba(255,255,255,0.25),rgba(255,255,255,0))]",
      },
    },
    defaultVariants: {
      variant: "white",
    },
  }
);

export interface DotProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dotVariants> {
  count: 1 | 2 | 3;
}

function Dot({ className, variant, count, ...props }: DotProps) {
  const dots = [];

  if (count >= 1) {
    dots.push(
      <div
        key="dot1"
        className={cn(
          dotVariants({ variant }),
          className,
          "hidden top-[-75px] sm:top-[-400px] lg:top-[-570px] left-[15%]"
        )}
        {...props}
      />
    );
  }

  if (count >= 2) {
    dots.push(
      <div
        key="dot2"
        className={cn(
          dotVariants({ variant }),
          className,
          "hidden lg:top-[480px] left-[75%]"
        )}
        {...props}
      />
    );
  }

  if (count >= 3) {
    dots.push(
      <div
        key="dot3"
        className={cn(
          dotVariants({ variant }),
          className,
          "hidden lg:top-[1400px] left-[-25%]"
        )}
        {...props}
      />
    );
  }

  return <>{dots}</>;
}

export { Dot, dotVariants };

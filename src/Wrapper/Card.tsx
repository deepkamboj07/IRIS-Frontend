// components/ui/Card.tsx

import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../libs/utils";

const cardVariants = cva(
  "w-full max-w-full p-6 rounded-2xl shadow-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700",
  {
    variants: {
      centered: {
        true: "mx-auto",
        false: "",
      },
    },
    defaultVariants: {
      centered: true,
    },
  }
);

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  centered?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  centered,
  className,
  ...props
}) => {
  return (
    <div className={cn(cardVariants({ centered }), className)} {...props}>
      {children}
    </div>
  );
};

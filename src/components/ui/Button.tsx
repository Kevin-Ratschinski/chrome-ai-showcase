import { cn } from "../../lib/util";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export default function Button({ className, ...props }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & { variant?: "primary" | "ghost" }) {
  const variant = props.variant ?? "primary";
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-2xl text-sm px-3 py-2 shadow-sm outline-none",
        variant === "primary" && "bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white",
        variant === "ghost" && "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800",
        "disabled:opacity-50",
        className
      )}
    />
  );
}

import { type TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/util";

export default function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-2xl border px-3 py-2 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-700",
        className
      )}
    />
  );
}

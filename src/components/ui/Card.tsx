import { cn } from "../../lib/util";

interface CardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export function Card({ children, title, className }: CardProps) {
  return (
    <section className={cn("rounded-3xl border border-slate-200 dark:border-slate-800 p-4 md:p-6 shadow-sm bg-white dark:bg-slate-900", className)}>
      {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
      {children}
    </section>
  );
}

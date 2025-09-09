export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 dark:border-slate-800/60 mt-8">
      <div className="container mx-auto px-4 py-6 text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} Chrome AI Showcase</div>
    </footer>
  );
}

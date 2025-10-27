import { Link, NavLink } from "react-router";
import { useAppStore } from "../../state/store";

export default function Navbar() {
  const { theme, toggleTheme } = useAppStore();
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur bg-white/80 dark:bg-slate-950/70">
      <div className="container mx-auto px-4 h-14 flex items-center gap-4">
        <Link to="/" className="font-semibold">
          Chrome AI Showcase
        </Link>
        <nav className="flex-1 flex items-center gap-4 text-sm">
          <NavLink to="/" className={({ isActive }) => (isActive ? "font-medium" : "")}>
            Playground
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "font-medium" : "")}>
            About
          </NavLink>
        </nav>
        <button className="border rounded px-2 py-1" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

import { useState } from "react";
import { cn } from "../../lib/util";

export interface Tab {
  id: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const first = tabs.find((tab: Tab) => !tab.disabled) ?? tabs[0];
  const [active, setActive] = useState(first.id);
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map((tab: Tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && setActive(tab.id)}
            className={cn(
              "px-3 py-1.5 rounded-full text-sm border",
              active === tab.id ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "bg-transparent",
              tab.disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {tabs.map((tab: Tab) => (
          <div key={tab.id} hidden={active !== tab.id}>
            {tab.children}
            {tab.disabled && <p className="text-xs text-slate-500 mt-2">Disabled - Feature not available.</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

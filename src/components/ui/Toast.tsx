import { createContext, useContext, useState, useCallback } from "react";
import { cn } from "../../lib/util";

type ToastMessage = {
  id: number;
  message: string;
  visible: boolean;
};

const Ctx = createContext<{ notify: (message: string) => void }>({
  notify: () => {
    console.warn("useToast() used outside of ToastProvider");
  },
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const notify = useCallback((message: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, message, visible: true }]);

    setTimeout(() => {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, visible: false } : m)));
    }, 1500);

    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 2000);
  }, []);

  return (
    <Ctx value={{ notify }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "rounded-xl bg-slate-900 text-white text-sm px-3 py-2 shadow-lg dark:bg-white dark:text-slate-900 transition-opacity duration-500",
              message.visible ? "opacity-100" : "opacity-0"
            )}
          >
            {message.message}
          </div>
        ))}
      </div>
    </Ctx>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(Ctx);

import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import { useAppStore } from "./state/store";
import { useEffect } from "react";
import { detectAllCapabilities } from "./lib/chromeAI/capabilities";

function App() {
  const setAvailability = useAppStore((state) => state.setAvailability);

  useEffect(() => {
    detectAllCapabilities().then(setAvailability);
  }, [setAvailability]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-6 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

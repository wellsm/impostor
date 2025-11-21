import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { ModeToggle } from "./components/app/mode-toggle.tsx";
import { ThemeProvider } from "./components/app/theme-provider.tsx";
import { Game } from "./pages/game.tsx";
import { Home } from "./pages/home.tsx";
import { Players } from "./pages/players.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="impostor-theme">
      <div className="relative">
        <BrowserRouter>
          <Routes>
            <Route element={<Home />} index />
            <Route element={<Players />} path="/players" />
            <Route element={<Game />} path="/game" />
          </Routes>
        </BrowserRouter>
        <div className="absolute top-2 right-2">
          <ModeToggle />
        </div>
      </div>
    </ThemeProvider>
  </StrictMode>
);

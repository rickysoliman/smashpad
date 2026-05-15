"use client";

import { useState, useEffect } from "react";
import LandingPage from "./components/landing-page";
import Game from "./components/game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setGameStarted(false);
      }
    });
  }, []);

  return gameStarted ? (
    <Game activeThemeIndex={activeThemeIndex} />
  ) : (
    <>
      <LandingPage
        handleButtonClick={() => setGameStarted(true)}
        activeThemeIndex={activeThemeIndex}
        setActiveThemeIndex={setActiveThemeIndex}
      />
    </>
  );
}

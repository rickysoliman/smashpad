"use client";

import { useState, useEffect } from "react";
import LandingPage from "./components/landing-page";
import Game from "./components/game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  // Handle entering and exiting Fullscreen
  useEffect(() => {
    if (gameStarted) {
      // Ask the browser to make the entire HTML document fullscreen
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      // If we are currently in fullscreen, exit it
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.error("Error attempting to exit fullscreen:", err);
        });
      }
    }
  }, [gameStarted]);

  // Handle the Escape key AND native fullscreen exits
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setGameStarted(false);
      }
    };

    // If the user exits fullscreen using the browser's native UI or Escape key,
    // we need to make sure our React state stays in sync!
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setGameStarted(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
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

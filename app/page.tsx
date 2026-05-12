"use client";

import { useState, useEffect } from "react";
import LandingPage from "./components/landing-page";
import Game from "./components/game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setGameStarted(false);
      }
    });
  }, []);

  return gameStarted ? (
    <Game />
  ) : (
    <>
      <LandingPage handleButtonClick={() => setGameStarted(true)} />
    </>
  );
}

"use client";

import { useState } from "react";
import LandingPage from "./components/landing-page";
import Game from "./components/game";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);

  return gameStarted ? (
    <>
      <Game />
      <button onClick={() => setGameStarted(false)}>Exit</button>
    </>
  ) : (
    <>
      <LandingPage />
      <button onClick={() => setGameStarted(true)}>Start</button>
    </>
  );
}

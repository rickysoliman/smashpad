import { useState, useEffect } from "react";

export default function Game() {
  const [mostRecentKey, setMostRecentKey] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      setMostRecentKey(e.key);
    });
  }, []);

  return (
    <>
      {mostRecentKey && <div className="most-recent-key">{mostRecentKey}</div>}
    </>
  );
}

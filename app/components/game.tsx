import { useEffect } from "react";

export default function Game() {
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      console.log(e);
    });
  }, []);

  return <div>Game Component</div>;
}

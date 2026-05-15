import { useState, useEffect } from "react";

interface ActiveSymbol {
  id: string;
  char: string;
  x: number;
  y: number;
}

export default function Game({
  activeThemeIndex,
}: {
  activeThemeIndex: number;
}) {
  const [activeSymbols, setActiveSymbols] = useState<ActiveSymbol[]>([]);
  const [count, setCount] = useState(0);

  const themeEmojis = {
    space: ["🚀", "🛸", "☄️", "🔭", "🪐", "🛰️", "⭐", "🌙", "👽", "👨‍🚀"],
    jungle: ["🐒", "🐸", "🐍", "🦜", "🐅", "🐆", "🦓", "🦍", "🌴", "🌺"],
    city: ["🚗", "🚕", "🚌", "🚓", "🚑", "🚒", "🏢", "🏦", "🚦", "🏙️"],
    sea: ["🐟", "🐠", "🐡", "🐬", "🐳", "🐋", "🦈", "🐙", "🦀", "🐢"],
    castle: ["🏰", "👑", "🐉", "🛡️", "⚔️", "🧙‍♂️", "🧚‍♀️", "🦄", "🏇", "💎"],
  };

  const themeKeys = ["space", "jungle", "city", "sea", "castle"] as const;
  const currentTheme = themeKeys[activeThemeIndex];
  const currentEmojiList = themeEmojis[currentTheme];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();

      setCount((prevCount) => prevCount + 1);

      getDisplaySymbol(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getRandomEmoji = () => {
    const randomIndex = Math.floor(Math.random() * currentEmojiList.length);
    return currentEmojiList[randomIndex];
  };

  const getDisplaySymbol = (key: string) => {
    const regex = /^[A-Za-z0-9]$/;
    const displaySymbol = regex.test(key)
      ? key.toUpperCase()
      : getRandomEmoji();

    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 100);

    const uniqueId = crypto.randomUUID();

    setActiveSymbols((prevSymbols) => [
      ...prevSymbols,
      { id: uniqueId, char: displaySymbol, x: randomX, y: randomY },
    ]);

    setTimeout(() => {
      setActiveSymbols((currentSymbols) =>
        currentSymbols.filter((sym) => sym.id !== uniqueId)
      );
    }, 2100);
  };

  return (
    <>
      <p className="keys-count">Keys Smashed: {count}</p>
      {activeSymbols.map((sym) => (
        <div
          key={sym.id}
          className="floating-symbol"
          style={{
            position: "absolute",
            left: `${sym.x}px`,
            top: `${sym.y}px`,
          }}
        >
          {sym.char}
        </div>
      ))}
    </>
  );
}

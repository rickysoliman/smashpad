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

  // Create the AudioContext outside the effect so it persists
  // (We use a ref or state if needed, but a simple module-level or lazy init works best for browsers)

  const playRandomNote = () => {
    // Standardize the AudioContext for cross-browser compatibility
    const AudioContext =
      window.AudioContext || (window as any).webkitAudioContext;
    const audioCtx = new AudioContext();

    // Exact frequencies for C Major Scale (C3 to C4)
    const frequencies = [
      261.63, // C4
      293.66, // D4
      329.63, // E4
      349.23, // F4
      392.0, // G4
      440.0, // A4
      493.88, // B4
      523.25, // C5
    ];

    const randomFreq =
      frequencies[Math.floor(Math.random() * frequencies.length)];

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    // A BiquadFilter helps mimic the acoustic properties of a physical instrument
    const filter = audioCtx.createBiquadFilter();

    // Triangle waves have more "body" and sound much more like a piano/keyboard
    oscillator.type = "triangle";
    oscillator.frequency.value = randomFreq;

    // Filter Envelope: Mimics the bright "smack" of a hammer hitting a string
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(randomFreq * 4, audioCtx.currentTime); // Starts bright
    filter.frequency.exponentialRampToValueAtTime(
      randomFreq,
      audioCtx.currentTime + 0.3
    ); // Quickly mellows out

    // Wire it up: Oscillator -> Filter -> Gain (Volume) -> Speakers
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Volume Envelope: The exact shape of a piano note's volume over time
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);

    // Attack: Instant sharp strike
    gainNode.gain.linearRampToValueAtTime(1, now + 0.01);
    // Decay: Initial loud impact fades quickly
    gainNode.gain.exponentialRampToValueAtTime(0.3, now + 0.2);
    // Sustain & Release: The string rings out into silence
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    oscillator.start(now);
    oscillator.stop(now + 2.5);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " ") e.preventDefault();

      setCount((prevCount) => prevCount + 1);
      getDisplaySymbol(e.key);

      // Fire the synth function on every key press!
      playRandomNote();
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
      <div className="keys-count-wrapper">
        <p className="keys-count">Keys Smashed: {count}</p>
      </div>
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

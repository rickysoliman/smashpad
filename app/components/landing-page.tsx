import { useState, useEffect } from "react";

export default function LandingPage({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0);

  useEffect(() => {
    const activeTheme = themes[activeThemeIndex];

    document.body.style.backgroundImage = `url('${activeTheme.background}')`;
    document.body.style.color = `${activeTheme.borderColor}`;
  }, [activeThemeIndex]);

  const themes = [
    {
      name: "space",
      icon: "/space-icon.png",
      background: "/space.jpg",
      backgroundColor: "#2b2266",
      borderColor: "#ffffff",
    },
    {
      name: "jungle",
      icon: "/jungle-icon.png",
      background: "/jungle.jpg",
      backgroundColor: "#297b2b",
      borderColor: "#95d535",
    },
    {
      name: "city",
      icon: "/city-icon.png",
      background: "/city.jpg",
      backgroundColor: "#627382",
      borderColor: "#f68d1e",
    },
    {
      name: "sea",
      icon: "/sea-icon.png",
      background: "/sea.jpg",
      backgroundColor: "#26a8c3",
      borderColor: "##6BEAFF",
    },
    {
      name: "castle",
      icon: "/castle-icon.png",
      background: "/castle.jpg",
      backgroundColor: "#645087",
      borderColor: "#e1ad2c",
    },
  ];

  const handleThemeButtonClick = (themeIndex: number) => {
    setActiveThemeIndex(themeIndex);
  };

  return (
    <>
      <h1 className="title">Smash Pad</h1>
      <div className="theme-select-wrapper">
        <h3 className="theme-select-title">Select Theme</h3>
        <div className="theme-buttons-wrapper">
          {themes.map((theme, i) => (
            <button
              key={theme.name}
              className="theme-button"
              onClick={() => handleThemeButtonClick(i)}
              style={{
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
                color: theme.borderColor,
                borderWidth: "4px",
                borderStyle: "solid",
              }}
            >
              <img
                className="theme-button-icon"
                src={theme.icon}
                alt={`${theme.name} icon`}
              />
              {theme.name}
            </button>
          ))}
        </div>
      </div>
      <button className="start-button" onClick={handleButtonClick}>
        Start
      </button>
    </>
  );
}

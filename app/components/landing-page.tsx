import { useState } from "react";

export default function LandingPage({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) {
  const [theme, setTheme] = useState("space");

  const themes = [
    { name: "space", icon: "/space-icon.png" },
    { name: "jungle", icon: "/jungle-icon.png" },
    { name: "city", icon: "/city-icon.png" },
    { name: "sea", icon: "/sea-icon.png" },
    { name: "castle", icon: "/castle-icon.png" },
  ];

  const handleThemeButtonClick = (themeName: string) => {
    setTheme(themeName);
  };

  return (
    <>
      <h1 className="title">Smash Pad</h1>
      <div className="theme-select-wrapper">
        <h3 className="theme-select-title">Select Theme</h3>
        <div className="theme-buttons-wrapper">
          {themes.map((theme) => (
            <button
              className="theme-button"
              onClick={() => handleThemeButtonClick(theme.name)}
            >
              <img className="theme-button-icon" src={theme.icon}></img>
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

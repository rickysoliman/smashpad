import { useEffect } from "react";

export default function LandingPage({
  handleButtonClick,
  activeThemeIndex,
  setActiveThemeIndex,
}: {
  handleButtonClick: () => void;
  activeThemeIndex: number;
  setActiveThemeIndex: (index: number) => void;
}) {
  const themes = [
    {
      name: "space",
      icon: "/space-icon.png",
      background: "/space-background.png",
      backgroundColor: "#2b2266",
      borderColor: "#ffffff",
    },
    {
      name: "jungle",
      icon: "/jungle-icon.png",
      background: "/jungle-background.png",
      backgroundColor: "#297b2b",
      borderColor: "#95d535",
    },
    {
      name: "city",
      icon: "/city-icon.png",
      background: "/city-background.png",
      backgroundColor: "#627382",
      borderColor: "#f68d1e",
    },
    {
      name: "sea",
      icon: "/sea-icon.png",
      background: "/sea-background.png",
      backgroundColor: "#26a8c3",
      borderColor: "#6beaff",
    },
    {
      name: "castle",
      icon: "/castle-icon.png",
      background: "/castle-background.png",
      backgroundColor: "#645087",
      borderColor: "#e1ad2c",
    },
  ];

  useEffect(() => {
    const activeTheme = themes[activeThemeIndex];

    document.body.style.backgroundImage = `url('${activeTheme.background}')`;
    document.body.style.color = activeTheme.borderColor;

    document.documentElement.style.setProperty(
      "--btn-bg",
      activeTheme.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--btn-border",
      activeTheme.borderColor
    );
    document.documentElement.style.setProperty(
      "--btn-text",
      activeTheme.borderColor
    );
  }, [activeThemeIndex]);

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
              className={`theme-button ${
                i === activeThemeIndex ? "selected" : ""
              }`}
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

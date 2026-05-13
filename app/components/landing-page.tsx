export default function LandingPage({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) {
  return (
    <>
      <h1 className="title">Smash Pad</h1>
      <button className="start-button" onClick={handleButtonClick}>
        Start
      </button>
    </>
  );
}

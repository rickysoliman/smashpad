export default function LandingPage({
  handleButtonClick,
}: {
  handleButtonClick: () => void;
}) {
  return (
    <>
      <button className="start-button" onClick={handleButtonClick}>
        Start
      </button>
    </>
  );
}

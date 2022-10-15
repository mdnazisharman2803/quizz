import { useState } from "react";
import Quize from "./Quiz";

const Main = () => {
  const [showIntro, setShowIntro] = useState(1);

  if (showIntro)
    return (
      <div className="main-container">
        <h2>Test your ability</h2>
        <button
          className="start-btn"
          onClick={() => {
            setShowIntro(0);
          }}
        >
          Start Quiz
        </button>
      </div>
    );
  return (
    <Quize
      onExit={() => {
        setShowIntro(1);
      }}
    />
  );
};

export default Main;

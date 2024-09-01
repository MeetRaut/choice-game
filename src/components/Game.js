import React, { useState } from 'react';
import { scenarios } from './ScenarioContent';
import ImpactSummary from './ImpactSummary';
import './choice.css';

const Game = () => {
  const [currentScenarioId, setCurrentScenarioId] = useState(1);
  const [history, setHistory] = useState([]);

  const currentScenario = scenarios[currentScenarioId];

  const handleChoice = (choice) => {
    const nextScenarioId = currentScenario.outcomes[choice];
    
    console.log('Current Scenario ID:', currentScenarioId);
    console.log('Next Scenario ID:', nextScenarioId);

    if (typeof nextScenarioId === 'number' && scenarios[nextScenarioId]) {
      if (nextScenarioId === 16) {
        setHistory([...history, currentScenarioId, nextScenarioId]);
        setCurrentScenarioId(nextScenarioId);
      } else {
        setHistory([...history, currentScenarioId]);
        setCurrentScenarioId(nextScenarioId);
      }
    } else {
      console.error(`Invalid choice: ${choice} for scenario ID: ${currentScenarioId}`);
    }
  };

  return (
    <div className="game">
      {currentScenarioId === 16 ? (
        <ImpactSummary history={history} />
      ) : (
        <div className="scenario">
          <p>{currentScenario.text}</p>
          <div className="options">
            {Object.entries(currentScenario.options).map(([key, text]) => (
              <button key={key} onClick={() => handleChoice(key)}>
                {text}
              </button>
            ))}
            {history.length > 0 && (
              <button className="go-back-button" onClick={() => {
                setCurrentScenarioId(history.pop());
                setHistory([...history]);
              }}>
                Go Back
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;

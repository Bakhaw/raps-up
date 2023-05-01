import { useContext } from "react";

import { GameContext } from "@/context";

const Scoreboard = () => {
  const currentGame = useContext(GameContext);
  const { scoreboard } = currentGame;

  return (
    <div>
      <ul>
        {Object.keys(scoreboard).map((teamName, index) => (
          <li key={index}>
            <h1>{teamName}</h1>
            <h1>{scoreboard[teamName]}</h1>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scoreboard;

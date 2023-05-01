import { createContext, useEffect, useState } from "react";

import { Game } from "@/types";
import { initialCounter, initialGame } from "@/pages/api/data";

interface GameContextValue extends Game {
  counter: number;
  methods: {
    goToNextRound?: () => void;
    resetCounter?: () => void;
    saveCard?: () => void;
    skipCard?: () => void;
  };
}

export const GameContext = createContext<GameContextValue>({
  ...initialGame,
  counter: 0,
  methods: {},
});

interface ContextProviderProps {
  children: JSX.Element;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(initialGame);
  const [counter, setCounter] = useState(initialCounter);

  const isDeckEnd = currentGame.deck.length === 0;
  const activeCard = currentGame.deck[0];

  function skipCard() {
    if (isDeckEnd || counter === 0) return;

    setCurrentGame((currentGame) => {
      const [currentCard, ...restCards] = currentGame.deck;
      const newDeck = [...restCards, currentCard];

      return {
        ...currentGame,
        deck: newDeck,
      };
    });
  }

  function saveCard() {
    if (isDeckEnd || counter === 0) return;

    setCurrentGame((currentGame) => {
      const newDeck = currentGame.deck.filter(
        (item) => item.chunks[0] !== activeCard.chunks[0]
      );
      const newSavedCards = [...currentGame.savedCards, activeCard];
      const newScoreboard = {
        ...currentGame.scoreboard,
        [currentGame.activeTeam]:
          currentGame.scoreboard[currentGame.activeTeam] + 1,
      };

      return {
        ...currentGame,
        deck: newDeck,
        savedCards: newSavedCards,
        scoreboard: newScoreboard,
      };
    });
  }

  function goToNextRound() {
    if (currentGame.savedCards.length === 0) return;

    setCurrentGame((currentGame) => {
      const teams = currentGame.teams.map((team) => team.name);
      const [activeTeam, ...restTeams] = teams;

      return {
        ...currentGame,
        activeTeam: activeTeam,
        deck: currentGame.savedCards,
        nextTeams: [...restTeams, activeTeam],
        round: currentGame.round + 1,
        savedCards: [],
      };
    });

    setCounter(initialCounter);
  }

  function resetCounter() {
    setCounter(initialCounter);
  }

  useEffect(() => {
    if (counter === 0) {
      return setCurrentGame((currentGame) => {
        const [firstEl, ...rest] = currentGame.nextTeams;

        return {
          ...currentGame,
          activeTeam: firstEl,
          nextTeams: [...rest, firstEl],
        };
      });
    }

    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const contextValue = {
    ...currentGame,
    counter,
    methods: {
      goToNextRound,
      resetCounter,
      saveCard,
      skipCard,
    },
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export default ContextProvider;

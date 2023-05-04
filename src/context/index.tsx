import { createContext, useEffect, useState } from "react";

import { Game } from "@/types";
import { initialCounter, initialGame } from "@/pages/api/data";

interface GameContextValue extends Game {
  counter: number;
  methods: {
    goToNextRound: () => void;
    goToNextTurn: () => void;
    resetCounter: () => void;
    saveCard: () => void;
    skipCard: () => void;
  };
}

export const GameContext = createContext<GameContextValue>({
  ...initialGame,
  counter: 0,
  methods: {
    goToNextRound: () => {},
    goToNextTurn: () => {},
    resetCounter: () => {},
    saveCard: () => {},
    skipCard: () => {},
  },
});

interface ContextProviderProps {
  children: JSX.Element;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [currentGame, setCurrentGame] = useState(initialGame);
  const [counter, setCounter] = useState(initialCounter);

  const isDeckEnd = currentGame.deck.length === 0;
  const isCounterEnd = counter === 0;
  const activeCard = currentGame.deck[0];

  function skipCard() {
    if (isDeckEnd || isCounterEnd) return;

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
    if (isDeckEnd || isCounterEnd) return;

    setCurrentGame((currentGame) => {
      const newDeck = currentGame.deck.filter(
        (item) => item.chunks[0] !== activeCard.chunks[0]
      );
      const newSavedCards = [...currentGame.savedCards, activeCard];
      const newScoreboard = {
        ...currentGame.scoreboard,
        [currentGame.activeTeam.name]:
          currentGame.scoreboard[currentGame.activeTeam.name] + 1,
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
    // if (currentGame.savedCards.length === 0) return;

    setCurrentGame((currentGame) => {
      const { round, savedCards, teams } = currentGame;

      return {
        ...currentGame,
        activePlayer: teams[0].players[0],
        activePlayerIndex: 0,
        activeTeam: teams[0],
        activeTeamIndex: 0,
        activeTurn: 1,
        deck: savedCards,
        round: round + 1,
        savedCards: [],
      };
    });

    setCounter(initialCounter);
  }

  function goToNextTurn() {
    const { activePlayerIndex, activeTurn, teams } = currentGame;
    // const isRoundEnd =
    //   activePlayerIndex === teams.length && activeTurn === teams.length;

    // if (isRoundEnd) return;

    setCurrentGame((currentGame) => {
      const { activePlayerIndex, activeTeamIndex, activeTurn, teams } =
        currentGame;

      // isTurnEnd is used to know if ALL teams has played a round
      const isTurnEnd = activeTurn === teams.length;
      const newActiveTeamIndex = isTurnEnd ? 0 : activeTeamIndex + 1;
      const newActiveTeam = teams[newActiveTeamIndex];
      const newActiveTurn = isTurnEnd ? 1 : activeTurn + 1;
      const newActivePlayerIndex =
        newActiveTurn === teams.length
          ? activePlayerIndex + 1
          : activePlayerIndex;

      return {
        ...currentGame,
        activePlayer: newActiveTeam.players[activePlayerIndex],
        activePlayerIndex: newActivePlayerIndex,
        activeTeamIndex: newActiveTeamIndex,
        activeTeam: newActiveTeam,
        activeTurn: newActiveTurn,
      };
    });
  }

  function resetCounter() {
    setCounter(initialCounter);
  }

  useEffect(() => {
    if (isCounterEnd) return;

    if (isDeckEnd) return setCounter(0);

    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter, isCounterEnd, isDeckEnd]);

  const contextValue = {
    ...currentGame,
    counter,
    methods: {
      goToNextRound,
      goToNextTurn,
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

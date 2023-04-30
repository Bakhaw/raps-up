import { useEffect, useState } from "react";

import { initialState } from "./api/data";

import Card from "@/components/Card";

const initialCounter = 5; // 30 seconds

function Home() {
  const [currentGame, setCurrentGame] = useState(initialState);
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
        [currentGame.currentTeam]:
          currentGame.scoreboard[currentGame.currentTeam] + 1,
      };

      return {
        ...currentGame,
        deck: newDeck,
        savedCards: newSavedCards,
        scoreboard: newScoreboard,
      };
    });
  }

  function goToNextLevel() {
    if (currentGame.savedCards.length === 0) return;

    setCurrentGame((currentGame) => ({
      ...currentGame,
      deck: currentGame.savedCards,
      currentCardIndex: 0,
      round: currentGame.round + 1,
      savedCards: [],
    }));

    setCounter(initialCounter);
  }

  useEffect(() => {
    if (counter === 0) {
      return setCurrentGame((currentGame) => {
        const [firstEl, ...rest] = currentGame.nextTeams;

        return {
          ...currentGame,
          currentTeam: currentGame.nextTeams[0],
          nextTeams: [...rest, firstEl],
        };
      });
    }

    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [counter]);

  const cardsLeft = currentGame.deck.length;

  console.log(currentGame);

  return (
    <main className="flex flex-col gap-12 h-screen overflow-hidden">
      <h1 className="text-center">
        Time&apos;s Up mais en Rap t&apos;as capté
      </h1>

      <div className="flex justify-around">
        <div>
          <h1>Manche {currentGame.round}</h1>
          <h1>{cardsLeft} carte(s) restante(s)</h1>

          <div className="flex">
            <button className="bg-red-600 text-white px-4" onClick={skipCard}>
              Skip
            </button>
            <button className="bg-green-600 text-white px-4" onClick={saveCard}>
              Save
            </button>
          </div>

          <h1>{counter} secondes</h1>
        </div>

        <ul>
          {Object.keys(currentGame.scoreboard).map((teamName, index) => (
            <li key={index}>
              <h1>{teamName}</h1>
              <h1>{currentGame.scoreboard[teamName]}</h1>
            </li>
          ))}
        </ul>
      </div>

      <div className="self-center">
        {isDeckEnd && <button onClick={goToNextLevel}>Manche suivante</button>}

        {!isDeckEnd && counter > 0 ? (
          <Card chunks={activeCard.chunks} />
        ) : (
          <>
            <h1>Au tour de {currentGame.currentTeam}</h1>
            <button onClick={() => setCounter(initialCounter)}>Démarrer</button>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;

import { useContext } from "react";
import { Button } from "react-daisyui";

import { GameContext } from "@/context";

import Card from "@/components/Card";
import CustomModal from "@/components/CustomModal";
import Scoreboard from "@/components/Scoreboard";

function Home() {
  const currentGame = useContext(GameContext);
  const {
    activePlayer,
    activePlayerIndex,
    activeTeam,
    activeTurn,
    counter,
    deck,
    methods,
    round,
    teams,
  } = currentGame;

  const isCounterEnd = counter === 0;
  const isDeckEnd = deck.length === 0;
  const isRoundEnd =
    activePlayerIndex === teams.length && activeTurn === teams.length;

  const showNextRoundButton = (isDeckEnd || isRoundEnd) && isCounterEnd;
  const showStartButton = !isDeckEnd && !isRoundEnd && isCounterEnd;
  const showCard = !isDeckEnd && !isCounterEnd;

  function onStartButtonClick() {
    methods.goToNextTurn();
    methods.resetCounter();
  }

  const cardsLeft = deck.length;
  const activeCard = deck[0];

  console.log(currentGame);

  return (
    <main className="flex flex-col gap-12 h-screen overflow-hidden">
      <h1 className="text-center">
        Time&apos;s Up mais en Rap t&apos;as capté
      </h1>

      <div className="flex justify-around">
        <div>
          <h1>Manche {round}</h1>
          <h1>{cardsLeft} carte(s) restante(s)</h1>

          <div className="flex">
            <Button onClick={methods.skipCard}>Skip</Button>
            <Button onClick={methods.saveCard}>Save</Button>
          </div>

          <h1>{counter} secondes</h1>
        </div>

        <CustomModal
          body={<Scoreboard />}
          header="Tableau des scores"
          openButton="Scores"
        />
      </div>

      <div className="self-center">
        {showNextRoundButton && (
          <Button onClick={methods.goToNextRound}>Manche suivante</Button>
        )}

        {showCard && (
          <div>
            <h1>{activeTeam.name}</h1>
            <h1>{activePlayer.name}</h1>
            <Card chunks={activeCard.chunks} />
          </div>
        )}

        {showStartButton && (
          <Button onClick={onStartButtonClick}>Démarrer</Button>
        )}
      </div>
    </main>
  );
}

export default Home;

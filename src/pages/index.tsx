import { useContext } from "react";
import { Button } from "react-daisyui";

import { GameContext } from "@/context";

import Card from "@/components/Card";
import CustomModal from "@/components/CustomModal";
import Scoreboard from "@/components/Scoreboard";

function Home() {
  const currentGame = useContext(GameContext);
  const { activeTeam, counter, deck, methods, round } = currentGame;

  const isDeckEnd = deck.length === 0;
  const activeCard = deck[0];
  const cardsLeft = deck.length;

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
        {isDeckEnd && (
          <Button onClick={methods.goToNextRound}>Manche suivante</Button>
        )}

        {!isDeckEnd && counter > 0 && (
          <>
            <h1>{activeTeam}</h1>
            <Card chunks={activeCard.chunks} />
          </>
        )}

        {!isDeckEnd && counter === 0 && (
          <>
            <h1>Au tour de {activeTeam}</h1>
            <Button onClick={methods.resetCounter}>Démarrer</Button>
          </>
        )}
      </div>
    </main>
  );
}

export default Home;

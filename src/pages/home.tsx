import { useNavigate } from "react-router";
import { GameMode } from "@/components/form/game-mode";
import { Settings } from "@/components/form/settings";
import { CategoriesList } from "@/components/list/categories";
import { PlayersList } from "@/components/list/players";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/game";

export function Home() {
  const navigate = useNavigate();
  const { mode, players, categories, startGame } = useGameStore();

  const startGameAndRedirect = () => {
    startGame();
    navigate("/game");
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center bg-background">
      <main className="w-full flex-1 space-y-6 p-4">
        <section className="pt-6 text-center">
          <h1 className="font-bold text-5xl tracking-tighter">Impostor</h1>
        </section>
        <section className="text-center">
          <GameMode />
        </section>
        <PlayersList />
        <CategoriesList />
        <Settings />
        <Button
          className="w-full"
          disabled={
            players.length < 3 ||
            categories.filter((c) => c.selected).length === 0
          }
          onClick={() => startGameAndRedirect()}
          size="xl"
        >
          Iniciar Jogo
        </Button>
      </main>
    </div>
  );
}

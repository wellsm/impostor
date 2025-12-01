import { useState } from "react";
import { RevealCard } from "@/components/app/reveal-card";
import { Topbar } from "@/components/app/topbar";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/game";

export function Game() {
  const {
    players,
    settings: { word },
  } = useGameStore();

  const [revealed, setRevealed] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const currentPlayer = players[currentIndex];

  function handleNext() {
    setCurrentIndex(i => i + 1);
    setRevealed(false); // ← zera quando troca
  }

  if (!word) {
    return null;
  }

  return (
    <div className="flex h-screen flex-col">
      <Topbar backUrl="/" title="Jogo" />
      <main className="flex h-full flex-1 flex-col items-center justify-center space-y-6 p-12">
        <RevealCard
          key={currentPlayer.id}
          onReveal={() => setRevealed(true)}
          player={currentPlayer}
          word={word}
        />

        {revealed && (
          currentIndex < players.length - 1 ? (
            <Button className="w-full" onClick={handleNext} size="xl">
              Próximo
            </Button>
          ) : (
            <Button className="w-full" onClick={() => navigate("/fim")} size="xl">
              Iniciar
            </Button>
          )
        )}
      </main>
    </div>
  );
}

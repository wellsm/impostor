import { NavLink } from "react-router";
import { Topbar } from "@/components/app/topbar";
import { AddPlayer } from "@/components/form/add-player";
import { PlayersList } from "@/components/list/players";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/game";

export function Players() {
  const { players } = useGameStore();

  return (
    <div className="h-screen">
      <Topbar backUrl="/" title="Gerenciar Jogadores" />
      <main className="h-full flex-1 space-y-6 p-4">
        <section>
          <AddPlayer />
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Jogadores</h2>
          </div>
          <PlayersList full withRemove />
        </section>
        <NavLink to="/">
          <Button className="sticky bottom-0 w-full" size="lg">
            Concluido
          </Button>
        </NavLink>
      </main>
    </div>
  );
}

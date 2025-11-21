import { Topbar } from "@/components/app/topbar";
import { PlayersList } from "@/components/list/players";

export function Game() {
  return (
    <div className="h-screen">
      <Topbar backUrl="/" title="Jogo" />
      <main className="h-full flex-1 space-y-6 p-4">
        <PlayersList full hideTitle showImpostor />
      </main>
    </div>
  );
}

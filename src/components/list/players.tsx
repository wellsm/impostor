import { ArrowRight, HatGlasses, Trash2 } from "lucide-react";
import { Activity } from "react";
import { NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game";
import { Button } from "../ui/button";

type Props = {
  hideTitle?: boolean;
  full?: boolean;
  showImpostor?: boolean;
  withRemove?: boolean;
};

export function PlayersList({
  hideTitle = false,
  full = false,
  showImpostor = false,
  withRemove = false,
}: Props) {
  const { mode, players, removePlayer } = useGameStore();

  return (
    <Activity mode={mode === "local" ? "visible" : "hidden"}>
      <section>
        <Activity mode={hideTitle ? "hidden" : "visible"}>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Jogadores</h2>
            <NavLink to="/players">
              <Button color="primary" size="sm" variant="ghost">
                Gerenciar
                <ArrowRight className="size-4" />
              </Button>
            </NavLink>
          </div>
        </Activity>
        <div
          className={cn(
            "mt-4 gap-3",
            full ? "grid grid-cols-1" : "flex flex-wrap"
          )}
        >
          {players.map((player) => (
            <Badge
              className={cn(
                "rounded border-border bg-zinc-200/50 p-4 px-4 py-2 font-semibold text-foreground text-sm dark:bg-[#211c27]",
                full &&
                  "flex w-full justify-between border-border bg-secondary",
                showImpostor && player.isImpostor && "border-destructive"
              )}
              key={player.id}
            >
              {player.name}
              <Activity
                mode={showImpostor && player.isImpostor ? "visible" : "hidden"}
              >
                <HatGlasses className="size-5 text-destructive" />
              </Activity>

              <Activity mode={withRemove ? "visible" : "hidden"}>
                <Button
                  className="-mr-2 p-0"
                  onClick={() => removePlayer(player.id)}
                  size="icon-sm"
                  variant="ghost"
                >
                  <Trash2 className="size-5" />
                </Button>
              </Activity>
            </Badge>
          ))}
          {players.length === 0 && (
            <div className="w-full bg-muted p-4">Nenhum jogador adicionado</div>
          )}
        </div>
      </section>
    </Activity>
  );
}

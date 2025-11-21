import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game";
import { Button } from "../ui/button";

type Props = {
  full?: boolean;
  withRemove?: boolean;
};

export function PlayersList({ full = false, withRemove = false }: Props) {
  const { players, removePlayer } = useGameStore();

  return (
    <div
      className={cn("mt-4 gap-3", full ? "grid grid-cols-1" : "flex flex-wrap")}
    >
      {players.map((player) => (
        <Badge
          className={cn(
            "rounded bg-primary/20 px-4 py-2 font-semibold text-primary text-sm",
            full &&
              "flex w-full justify-between border-border bg-secondary text-foreground"
          )}
          key={player.id}
        >
          {player.name}
          {withRemove && (
            <Button
              className="-mr-2 p-0"
              onClick={() => removePlayer(player.id)}
              size="icon-sm"
              variant="ghost"
            >
              <Trash2 className="size-5" />
            </Button>
          )}
        </Badge>
      ))}
      {players.length === 0 && (
        <div className="w-full bg-muted p-4">Nenhum jogador adicionado</div>
      )}
    </div>
  );
}

import { Minus, Plus } from "lucide-react";
import { useGameStore } from "@/stores/game";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";

export function Settings() {
  const {
    players,
    settings: { howManyImpostors, timeLimit, hintForImpostor, revealImpostor },
    setSettings,
  } = useGameStore();

  return (
    <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 sm:space-y-0">
      <div className="flex items-center justify-between">
        <label className="font-medium" htmlFor="impostors">
          Número de Impostores
        </label>
        <div className="flex items-center gap-2">
          <Button
            disabled={howManyImpostors <= 1}
            onClick={() =>
              setSettings({ howManyImpostors: howManyImpostors - 1 })
            }
            size="icon-sm"
          >
            <Minus />
          </Button>
          <span className="w-8 text-center font-bold">{howManyImpostors}</span>
          <Button
            disabled={players.length <= howManyImpostors + 2}
            onClick={() =>
              setSettings({ howManyImpostors: howManyImpostors + 1 })
            }
            size="icon-sm"
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="font-medium" htmlFor="time_limit">
            Tempo Limite da Partida
          </label>
          <span className="font-medium text-zinc-600 dark:text-zinc-400">
            {timeLimit} min
          </span>
        </div>
        <Slider
          defaultValue={[timeLimit]}
          max={10}
          min={2}
          onValueChange={([value]) => setSettings({ timeLimit: value })}
          step={1}
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="font-medium" htmlFor="impostor_hint">
          Dica para impostor
        </label>
        <Switch
          checked={hintForImpostor}
          onCheckedChange={(checked) =>
            setSettings({ hintForImpostor: checked })
          }
          size="lg"
        />
      </div>
      <div className="flex items-center justify-between">
        <label className="font-medium" htmlFor="show_impostor">
          Mostrar quem é o impostor
        </label>
        <Switch
          checked={revealImpostor}
          onCheckedChange={(checked) =>
            setSettings({ revealImpostor: checked })
          }
          size="lg"
        />
      </div>
    </div>
  );
}

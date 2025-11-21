import { Globe, Wifi } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game";

export function GameMode() {
  const { mode, setMode } = useGameStore();

  return (
    <div>
      <div className="mt-6 flex justify-center">
        <RadioGroup
          className="flex gap-0 rounded border"
          defaultValue="local"
          onValueChange={setMode}
        >
          <Label
            className={cn(
              "flex items-center justify-center space-x-1 p-2 px-3",
              mode === "local" && "bg-primary text-white"
            )}
          >
            <RadioGroupItem className="sr-only" value="local" />
            <Globe className="size-4" />
            <span>Local</span>
          </Label>
          <Label
            className={cn(
              "flex items-center justify-center space-x-1 p-2 px-3 text-muted",
              mode === "online" && "bg-primary text-white"
            )}
          >
            <RadioGroupItem
              className="sr-only"
              disabled={true}
              value="online"
            />
            <Wifi className="size-4" />
            <span>Online</span>
          </Label>
        </RadioGroup>
      </div>
      <p className="mt-4 px-6 text-sm text-zinc-600 dark:text-zinc-400">
        {mode === "local"
          ? "Jogue com amigos que estão no mesmo local."
          : "Jogue com seus online usando WhatsApp, Discord, etc"}
      </p>
    </div>
  );
}

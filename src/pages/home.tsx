import { ArrowRight, Globe, Wifi } from "lucide-react";
import { Activity } from "react";
import { NavLink, useNavigate } from "react-router";
import { Settings } from "@/components/form/settings";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { useGameStore } from "@/stores/game";

export function Home() {
  const navigate = useNavigate();
  const { mode, setMode, players, categories, selectCategories, startGame } =
    useGameStore();

  const startGameAndRedirect = () => {
    startGame();
    navigate("/game");
  };

  const isAllSelected =
    categories.filter((c) => c.selected).length === categories.length;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col items-center justify-center bg-background">
      <main className="w-full flex-1 space-y-6 p-4">
        <section className="pt-6 text-center">
          <h1 className="font-bold text-5xl tracking-tighter">Impostor</h1>
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
                  "flex items-center justify-center space-x-1 p-2 px-3",
                  mode === "online" && "bg-primary text-white"
                )}
              >
                <RadioGroupItem className="sr-only" value="online" />
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
        </section>
        <Activity mode={mode === "local" ? "visible" : "hidden"}>
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl">Jogadores</h2>
              <NavLink to="/players">
                <Button color="primary" size="sm" variant="ghost">
                  Gerenciar
                  <ArrowRight className="size-4" />
                </Button>
              </NavLink>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {players.map((player) => (
                <Badge
                  className="rounded bg-primary/20 px-4 py-2 font-semibold text-primary text-sm"
                  key={player.id}
                >
                  {player.name}
                </Badge>
              ))}
              {players.length === 0 && (
                <div className="w-full bg-muted p-4">
                  Nenhum jogador adicionado
                </div>
              )}
            </div>
          </section>
        </Activity>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl">Categorias</h2>
            <Button
              onClick={() =>
                selectCategories(
                  categories.map((c) => ({
                    ...c,
                    selected: !isAllSelected,
                  }))
                )
              }
              size="sm"
              variant="ghost"
            >
              {isAllSelected ? "Desmarcar todos" : "Selecionar todos"}
            </Button>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6">
            {categories.map((category) => (
              <Label
                className="flex items-center gap-3 rounded bg-zinc-200/50 p-4 dark:bg-[#211c27]"
                htmlFor={category.name}
                key={category.name}
              >
                <Checkbox
                  checked={category.selected}
                  className="rounded border-zinc-400 dark:border-border"
                  id={category.name}
                  onCheckedChange={(checked) =>
                    selectCategories(
                      categories.map((c) => ({
                        ...c,
                        selected:
                          c.name === category.name
                            ? (checked as boolean)
                            : c.selected,
                      }))
                    )
                  }
                />
                <span className="font-medium">{category.name}</span>
              </Label>
            ))}
          </div>
        </section>
        <section>
          <h2 className="font-bold text-xl">Configurações</h2>
          <Settings />
        </section>
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

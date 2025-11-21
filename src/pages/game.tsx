import { ALargeSmall, Crosshair } from "lucide-react";
import { Topbar } from "@/components/app/topbar";
import { PlayersList } from "@/components/list/players";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { useGameStore } from "@/stores/game";

export function Game() {
  const {
    settings: { word },
  } = useGameStore();

  if (!word) {
    return null;
  }

  return (
    <div className="h-screen">
      <Topbar backUrl="/" title="Jogo" />
      <main className="h-full flex-1 space-y-6 p-4">
        <PlayersList full hideTitle showImpostor />
        <section className="space-y-4">
          <Item asChild size="sm" variant="outline">
            <div>
              <ItemMedia>
                <ALargeSmall className="size-5" />
              </ItemMedia>
              <ItemContent className="flex items-center">
                <ItemTitle className="font-bold">Palavra</ItemTitle>
                <ItemDescription>{word.value}</ItemDescription>
              </ItemContent>
            </div>
          </Item>
          <Item asChild size="sm" variant="outline">
            <div>
              <ItemMedia>
                <Crosshair className="size-5" />
              </ItemMedia>
              <ItemContent className="flex items-center">
                <ItemTitle className="font-bold">Dica</ItemTitle>
                <ItemDescription>{word.hint}</ItemDescription>
              </ItemContent>
            </div>
          </Item>
        </section>
      </main>
    </div>
  );
}

import { Pointer } from "lucide-react";
import { useState } from "react";
import { type Player, useGameStore, type Word } from "@/stores/game";

type Props = {
    player: Player;
    word: Word;
    onReveal?: () => void;
};

export function RevealCard({ player, word, onReveal }: Props) {
    const {
        settings: { hintForImpostor, revealImpostor },
    } = useGameStore();

    const [revealed, setRevealed] = useState(false);

    const handleRevealStart = () => {
        setRevealed((prev) => {
            if (!prev) {
                onReveal?.();
            }
            return true;
        });
    };

    const handleRevealEnd = () => {
        setRevealed(false);
    };

    return (
        <div
            className="h-[50%] w-full select-none"
            onMouseDown={handleRevealStart}
            onMouseUp={handleRevealEnd}
            onTouchEnd={handleRevealEnd}
            onTouchStart={handleRevealStart}
        >
            <div
                className={`transform-3d relative h-full w-full rounded-xl bg-blue-500 transition-transform duration-300 ${revealed ? "rotate-y-180" : ""
                    }`}
            >
                {/* Frente */}
                <div className="backface-hidden absolute flex h-full w-full items-center justify-center">
                    <div className="space-y-12 p-6">
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold text-2xl uppercase">{player.name}</h3>
                            <span className="text-center text-sm">
                                Não diga a palavra para os outros meliantes
                            </span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <Pointer className="-rotate-45 size-8" />
                            <span className="text-center font-bold text-foreground uppercase">
                                Segure para revelar
                            </span>
                        </div>
                    </div>
                </div>

                {/* Verso */}
                <div className="backface-hidden absolute flex h-full w-full rotate-y-180 items-center justify-center rounded-xl bg-blue-700">
                    <div className="space-y-16 p-6">
                        <div className="space-y-2 text-center">
                            <h3 className="font-bold text-2xl uppercase">{player.name}</h3>
                            {hintForImpostor && player.isImpostor && (
                                <span className="text-center text-sm">Dica: {word.hint}</span>
                            )}
                        </div>
                        <div className="space-y-2">
                            {revealImpostor && player.isImpostor && (
                                <div className="rounded-xl border-2 border-foreground bg-background p-3 text-center font-bold text-red-700">
                                    VOCÊ É O IMPOSTOR
                                </div>
                            )}

                            {player.isImpostor && !hintForImpostor && !revealImpostor && (
                                <div className="rounded-xl border-2 border-foreground bg-background p-3 text-center font-bold text-foreground">
                                    {word.hint}
                                </div>
                            )}

                            {!player.isImpostor && (
                                <div className="rounded-xl border-2 border-foreground bg-background p-3 text-center font-bold text-foreground">
                                    {word.value}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

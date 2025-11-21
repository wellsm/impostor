import { create } from "zustand";
import { persist } from "zustand/middleware";
import { WORDS } from "@/data/words";

export type Player = {
  id: string;
  name: string;
  isImpostor: boolean;
};

export type Category = {
  name: string;
  selected: boolean;
};

export type Word = {
  value: string;
  hint: string;
};

export type Settings = {
  word?: Word;
  howManyImpostors: number;
  timeLimit: number;
  hintForImpostor: boolean;
  revealImpostor: boolean;
};

export type GameMode = "local" | "online";

export const CATEGORIES = [
  "Cotidiano",
  "Comidas",
  "Animais",
  "Profissões",
  "Esportes",
  "Lugares",
] as const;

export type Game = {
  mode: GameMode;
  setMode: (mode: GameMode) => void;
  startGame: () => void;
  // Players
  players: Player[];
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  chooseRandomImpostors: () => void;
  // Categories
  categories: Category[];
  selectCategories: (categories: Category[]) => void;
  //Settings
  settings: Settings;
  setSettings: (settings: Partial<Settings>) => void;
};

export const useGameStore = create<Game>()(
  persist(
    (set, get) => ({
      mode: "local",
      setMode: (mode) => set({ mode }),

      players: [],

      addPlayer: (name: string) =>
        set({
          players: [
            ...get().players,
            { id: crypto.randomUUID(), name, isImpostor: false },
          ],
        }),

      removePlayer: (id) =>
        set({
          players: get().players.filter((p) => p.id !== id),
        }),

      chooseRandomImpostors: () => {
        const {
          players,
          settings: { howManyImpostors },
        } = get();

        const shuffled = [...players].sort(() => Math.random() - 0.5);
        const selected = shuffled
          .slice(0, howManyImpostors)
          .map((player) => player.id);

        set({
          players: players.map((player) => ({
            ...player,
            isImpostor: selected.includes(player.id),
          })),
        });
      },

      categories: CATEGORIES.map((name) => ({
        name,
        selected: false,
      })),

      selectCategories: (categories) => set({ categories }),

      settings: {
        word: undefined,
        howManyImpostors: 1,
        timeLimit: 5,
        hintForImpostor: false,
        revealImpostor: false,
      },

      setSettings: (value: Partial<Settings>) =>
        set({ settings: { ...get().settings, ...value } }),

      startGame: () => {
        const { categories, settings } = get();

        const selectedCategories = categories.filter((c) => c.selected);
        const choosenCategories =
          selectedCategories.length > 0 ? selectedCategories : categories;

        const category =
          choosenCategories[
            Math.floor(Math.random() * choosenCategories.length)
          ];

        const words = WORDS[category.name];

        if (!words || words.length === 0) {
          return;
        }

        const word = words[Math.floor(Math.random() * words.length)];

        set({
          settings: {
            ...settings,
            word,
          },
        });

        get().chooseRandomImpostors();
      },
    }),
    {
      name: "impostor-game",
    }
  )
);

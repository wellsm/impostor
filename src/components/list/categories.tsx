import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGameStore } from "@/stores/game";

export function CategoriesList() {
  const { categories, selectCategories } = useGameStore();

  const isAllSelected =
    categories.filter((c) => c.selected).length === categories.length;

  return (
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
  );
}

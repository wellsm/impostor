import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/stores/game";

const formSchema = z.object({
  name: z.string(),
});

export function AddPlayer() {
  const { addPlayer } = useGameStore();

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({ name }: z.infer<typeof formSchema>) => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    addPlayer(name);
    form.reset();
  };

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <Field>
        <Input
          {...form.register("name")}
          autoComplete="off"
          className="h-10 rounded"
          placeholder="Digite o nome do jogador..."
          required
        />
      </Field>
      <Button className="w-full" disabled={!form.formState.isValid} size="lg">
        {form.formState.isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Adicionar Jogador"
        )}
      </Button>
    </form>
  );
}

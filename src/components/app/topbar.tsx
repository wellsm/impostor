import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

type Props = {
  title: string;
  backUrl: string;
};

export function Topbar({ title, backUrl }: Props) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between border-border border-b bg-background/80 p-2 backdrop-blur-sm">
      <NavLink to={backUrl}>
        <Button variant="ghost">
          <ArrowLeft className="size-4" />
        </Button>
      </NavLink>
      <h1 className="font-bold text-foreground text-lg">{title}</h1>
      <div className="w-10">
        <ModeToggle />
      </div>
    </header>
  );
}

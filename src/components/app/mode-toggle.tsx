import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/app/theme-provider";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      className="size-10"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
      variant="outline"
    >
      {theme === "dark" && <Sun className="size-6" />}
      {theme === "light" && <Moon className="size-6" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

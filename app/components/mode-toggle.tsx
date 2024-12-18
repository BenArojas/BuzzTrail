import { Moon, Sun } from "lucide-react";
import { Theme, useTheme } from "remix-themes";

import { Button } from "./ui/button";

export function ModeToggle() {
  const [theme, setTheme] = useTheme();

  const isDarkMode = theme === Theme.DARK;

  return (
    <div onClick={() => setTheme(isDarkMode ? Theme.LIGHT : Theme.DARK)}>
      <Button
        variant="ghost"
        size="default"
        className="relative flex items-center justify-center"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 z-10" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 z-10" />
          <span className="absolute left-full ml-2 z-10">
            <span className="opacity-0 dark:opacity-100">
              {isDarkMode ? "Dark" : "Light"}
            </span>
            <span className="opacity-100 dark:opacity-0 absolute left-0 top-0">
              {isDarkMode ? "Dark" : "Light"}
            </span>
          </span>
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}

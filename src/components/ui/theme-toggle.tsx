import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../hooks/useTheme-provider";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <>
      {theme === "light" && (
        <Sun
          onClick={() => setTheme("dark")}
          className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 cursor-pointer text-teal-500 transition-all dark:scale-0 dark:-rotate-90"
        />
      )}
      {theme === "dark" && (
        <Moon
          onClick={() => setTheme("light")}
          className="h-[1.2rem] w-[1.2rem] scale-0 rotate-90 cursor-pointer transition-all dark:scale-100 dark:rotate-0"
        />
      )}
    </>
  );
}

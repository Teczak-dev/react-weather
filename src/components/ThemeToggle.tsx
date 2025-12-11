import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    const root = document.documentElement;

    function toggleTheme() {
        root.classList.add("theme-transition");

        window.setTimeout(() => {
            root.classList.remove("theme-transition");
        }, 300);

        if (theme === "dark") setTheme("light");
        else setTheme("dark");
    }

    return (
        <Button variant="outline" onClick={toggleTheme}>
            {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
    );
}

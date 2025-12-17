import "./App.css";
import { ThemeProvider } from "./hooks/useTheme-provider";
import { ThemeToggle } from "./components/ui/theme-toggle";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ThemeToggle />
        <p className="">Hello world</p>
      </ThemeProvider>
    </>
  );
}

export default App;

import { createRoot } from "react-dom/client";
import App from "./App";
import { UiProvider } from "./src/provider/UiProvider";

createRoot(document.getElementById("root")!).render(
  <UiProvider>
    <App />
  </UiProvider>
);

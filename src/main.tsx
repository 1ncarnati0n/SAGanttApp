import { createRoot } from "react-dom/client";

import App from "./App";
import "./styles/globals.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container element not found");
}

createRoot(container).render(
  <>
    <App />
  </>
);

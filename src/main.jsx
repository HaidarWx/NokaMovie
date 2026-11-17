import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

const queryClient = new QueryClient();
createRoot(document.querySelector(".mainContainer")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
);

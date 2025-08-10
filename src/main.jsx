import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import GlobalStyle from "./styles/GlobalSytle";

createRoot(document.getElementById("root")).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>
);

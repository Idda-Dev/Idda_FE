import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import MissonPage from "./pages/MissonPage";
import CommunityPage from "./pages/CommunityPage";
import ShopPage from "./pages/ShopPage";
import TestPage from "./pages/TestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/mission", element: <MissonPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/test", element: <TestPage /> },
    ],
  },
]);

export default router;

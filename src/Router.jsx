import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import MissionPage from "./pages/MissionPage";
import CommunityPage from "./pages/CommunityPage";
import ShopPage from "./pages/ShopPage";
import TestPage from "./pages/TestPage";
import NewPage from "./pages/NewPage";
import PostItemPage from "./features/PostItem/pages/PostItemPage";
import MyCouponsPage from "./features/MyCoupons/pages/MyCouponsPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "/mission", element: <MissionPage /> },
      { path: "/community", element: <CommunityPage /> },
      { path: "/community/post/:postId", element: <PostItemPage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/test", element: <TestPage /> },
      { path: "/coupon", element: <MyCouponsPage /> },
      { path: "/new", element: <NewPage /> }

    ],
  },
]);

export default router;

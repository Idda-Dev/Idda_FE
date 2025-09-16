import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./pages/MainPage";
import MissionPage from "./pages/MissionPage";
import MissionCalendarPage from "./pages/MissionCalendarPage";
import CommunityPage from "./pages/CommunityPage";
import ShopPage from "./pages/ShopPage";
import PostItemPage from "./features/PostItem/pages/PostItemPage";
import MyCouponsPage from "./features/MyCoupons/pages/MyCouponsPage";
import FirstPage from "./features/ServiceInfo/pages/FirstPage";
import SecondPage from "./features/ServiceInfo/pages/SecondPage";

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
      { path: "/coupon", element: <MyCouponsPage /> },
      { path: "/mission/calendar", element: <MissionCalendarPage /> },
      { path: "/serviceInfo/serviceInfo1", element: <FirstPage /> },
      { path: "/serviceInfo/serviceInfo2", element: <SecondPage/> },
    ],
  },
]);

export default router;

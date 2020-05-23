import Hotel from "./components/Hotel";
import Orders from "./components/Orders/Orders";
import Checkout from "./components/Checkout/Checkout";
import Auth from "./components/Auth/LoginPage";
import Logout from "./components/Auth/logout/Logout";
import MyOrders from "./components/MyOrders/MyOrders";
import Success from "./components/SuccessPage/SuccessPage";

export const routes = [
  { path: "/", component: Hotel },
  { path: "/checkout", component: Checkout },
  { path: "/auth", component: Auth },
  { path: "/logout", component: Logout },
  { path: "/success", component: Success },
  { path: "/orders", component: MyOrders },
  { path: "/order/:hotel", component: Orders },
  { path: "*", component: Hotel }
];

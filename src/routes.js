import Hotel from "./components/Hotel";
import Orders from "./components/Orders/Orders";
import Checkout from "./components/Checkout/Checkout";
import Auth from "./components/Auth/LoginPage";
import Success from "./components/SuccessPage/SuccessPage";

export const routes = [
  { path: "/", component: Hotel },
  { path: "/checkout", component: Checkout },
  { path: "/auth", component: Auth },
  { path: "/success", component: Success },
  { path: "/order/:hotel", component: Orders },
  { path: "*", component: Hotel }
];

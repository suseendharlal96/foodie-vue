import Hotel from "./components/Hotel";
import Orders from "./components/Orders/Orders";
import Checkout from './components/Checkout/Checkout'

export const routes = [
  { path: "/", component: Hotel },
  { path: "/checkout", component: Checkout },
  { path: "/order/:hotel", component: Orders },
  { path: "*", component: Hotel },
];

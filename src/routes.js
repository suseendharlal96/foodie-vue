import Hotel from "./components/Hotel";
import Orders from "./components/Orders/Orders";

export const routes = [
  { path: "/", component: Hotel },
  { path: "/order/:hotel", component: Orders },
  { path: "*", component: Hotel },
];

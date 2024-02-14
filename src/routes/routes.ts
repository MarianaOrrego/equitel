import Home from "../components/pages/Home";
import Products from "../components/pages/Products";
import Sales from "../components/pages/Sales";
import Stock from "../components/pages/Stock";
import Users from "../components/pages/Users";

type JSXComponent = () => JSX.Element;

interface Route {
  to: string;
  path: string;
  Component: JSXComponent;
  name: string;
}

export const routes: Route[] = [
  {
    path: "/",
    to: "/",
    Component: Home,
    name: "Inicio",
  },
  {
    path: "/users/*",
    to: "/users",
    Component: Users,
    name: "Usuarios",
  },
  {
    path: "/products/*",
    to: "/products",
    Component: Products,
    name: "Productos",
  },
  {
    path: "/stock/*",
    to: "/stock",
    Component: Stock,
    name: "Inventario",
  },
  {
    path: "/sales/*",
    to: "/sales",
    Component: Sales,
    name: "Ventas",
  }
];
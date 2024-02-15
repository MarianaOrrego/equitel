import Audit from "../components/pages/Audit";
import Home from "../components/pages/Home";
import Products from "../components/pages/Products";
import Provider from "../components/pages/Provider";
import Sales from "../components/pages/Sales";
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
    name: "Inventario",
  },
  {
    path: "/provider/*",
    to: "/provider",
    Component: Provider,
    name: "Proveedores",
  },
  {
    path: "/sales/*",
    to: "/sales",
    Component: Sales,
    name: "Ventas",
  },
  {
    path: "/audit/*",
    to: "/audit",
    Component: Audit,
    name: "Auditoría",
  }
];
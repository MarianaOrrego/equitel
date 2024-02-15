import { Suspense } from "react";
import {
  BrowserRouter,
  NavLink,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import logo from "../logo.svg";
import { routes } from "./routes";

export const Navigation = ({
  user,
  onLogout,
}: {
  user: any;
  onLogout: () => void;
}) => {

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login")
  };

  const allowedRoutes = routes.filter((route) => {
    if (user.rolId === 1) {
      return true;
    } else if (user.rolId === 2) {
      return route.name === "Inicio" || route.name === "Ventas";
    }
    return false;
  });

  return (
    <Suspense fallback={<span>Loading ...</span>}>
        <div className="main-layout">
          <nav>
            <img src={logo} alt="React Logo" />
            <ul>
              {allowedRoutes.map(({ to, name }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) => (isActive ? "nav-active" : "")}
                  >
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button onClick={handleLogout}>Cerrar sesión</button>
          </nav>

          <Routes>
            {routes.map(({ to, path, Component }) => (
              <Route key={to} path={path} element={<Component />} />
            ))}

            <Route path="*" element={<Navigate to={routes[0].to} replace />} />
          </Routes>
        </div>
    </Suspense>
  );
};

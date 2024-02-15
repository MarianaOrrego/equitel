import { BrowserRouter as Router } from "react-router-dom";

import Login from "./auth/Login";
import useAuth from "./hooks/useAuth";
import { Navigation } from "./routes/Navigation";

function App() {
  const { isLoggedIn, userData, handleLoginSuccess, handleLogout } = useAuth();

  return (
    <Router>
      {isLoggedIn ? (
        <Navigation user={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </Router>
  );
}

export default App;

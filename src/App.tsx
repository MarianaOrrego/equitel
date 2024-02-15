import Login from "./auth/Login";
import useAuth from "./hooks/useAuth";
import { Navigation } from "./routes/Navigation";

function App() {
  const { isLoggedIn, userData, handleLoginSuccess, handleLogout } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Navigation user={userData} onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
}

export default App;

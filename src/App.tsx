import Login from "./components/auth/Login";
import { Navigation } from "./routes/Navigation";

function App() {
  const isLoggedIn = true; 

  return (
    <>
      {isLoggedIn ? <Navigation /> : <Login />}
    </>
  );
}

export default App;

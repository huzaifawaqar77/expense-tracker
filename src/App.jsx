import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

// Components
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const { isAuthReady, user } = useAuthContext();

  return (
    <div className="App">
      {isAuthReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={user ? <Home /> : <Login />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={"/"} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={"/"} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;

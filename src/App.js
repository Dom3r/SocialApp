import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Home/Profile/Profile";
import Login from "./Pages/Home/Login/Login";
import Register from "./Pages/Home/Register/Register";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Resetpassword from "./Pages/Home/Reset-Password/ResetPassword";
import Verifyemail from "./Pages/Home/Verify-Email/VerifyEmail";
import Forgotpassword from "./Pages/Home/Forgot-Password/ForgotPassword";
import Chat from "./Pages/Home/Chat/Chat";

function App() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user?.other?.verified === true ? (
                <Home />
              ) : (
                <Navigate to={"/login"} replace={true} />
              )
            }
          ></Route>
          <Route path="/Profile/:id" element={<Profile />}></Route>
          <Route
            path="/login"
            element={
              user?.other?.verified === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/verify/email"
            element={
              user?.Status === "Sending" ? (
                <Verifyemail />
              ) : user?.other?.verified === true ? (
                <Navigate to={"/"} replace={true} />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route path="/forgot/password" element={<Forgotpassword />}></Route>
          <Route path="/reset/password" element={<Resetpassword />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

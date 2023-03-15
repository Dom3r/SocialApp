import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./login.css";
import { useState } from "react";
import { login } from "../../../Component/ReduxContainer/apiCall";
export default function Login() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className="mainContainerForsignup">
      <div className="submainContainer">
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className="logoText">
            <span className="socialPart">Social</span> App
          </p>
          <p className="introtext">
            Start expanding your{" "}
            <span className="socialPart">social networks </span>
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p className="createaccountTxt">Log in to Your Account</p>
          <input
            type="email"
            name=""
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="inputText"
          />
          <input
            type="password"
            placeholder="password"
            name=""
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="inputText"
          />
          <button className="btnforsignup" onClick={handleClick}>
            Login
          </button>
          <Link to={"/forgot/password"}>
            <p style={{ textAlign: "start", marginLeft: "30%" }}>
              Forgot password
            </p>
          </Link>
          <Link to={"/register"}>
            <p style={{ textAlign: "start", marginLeft: "30%" }}>
              Create New Account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

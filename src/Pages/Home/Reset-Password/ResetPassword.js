import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Resetpassword() {
  const location = useLocation();
  const code = location.search.split("?")[1];
  console.log(code);
  const [password, setPassword] = useState("");
  console.log(password);
  const handleClick = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:5000/api/user/reset/password?${code}`, {
      method: "PUT",
      headers: { "Content-Type": "application/JSON" },
      body: JSON.stringify({ password: password }),
    }).then((data) => {
      alert("Your password reset was successfull");
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "25%",
          padding: "20px",
          margin: "auto",
          borderRadius: "10px",
          backgroundColor: "rgb(72 167 108)",
        }}
      >
        <p style={{ color: "white" }}>Enter Your New Password</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type={"password"}
            placeholder="**********"
            style={{
              flex: 1,
              minWidth: "40px",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            style={{
              width: "40%",
              border: "none",
              padding: "10px 20px",
              backgroundColor: "white",
              color: "black",
              borderRadius: "10px",
              margin: "auto",
              marginTop: "20px",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
}

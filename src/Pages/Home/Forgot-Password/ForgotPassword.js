import React, { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const handleclick = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }
    const response = await fetch(
      `http://localhost:5000/api/user/exists?email=${email}`
    );
    const data = await response.json();
    if (data.exists) {
      // Send the reset password request to the server
      await fetch(`http://localhost:5000/api/user/forgot/password`, {
        method: "POST",
        headers: { "Content-Type": "application/JSON" },
        body: JSON.stringify({ email: email }),
      })
        .then(() => {
          alert("We sent you a token email");
        })
        .catch(() => {
          alert("Fail to proccess");
        });
    } else {
      alert("There is no user with this email");
    }
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
        <p style={{ color: "white" }}>Enter your Email</p>
        <form style={{ display: "flex", flexDirection: "column" }}>
          <input
            type={"text"}
            placeholder="Email"
            style={{
              flex: 1,
              minWidth: "40px",
              margin: "10px",
              padding: "10px",
              borderRadius: "10px",
            }}
            onChange={(e) => setEmail(e.target.value)}
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
            onClick={handleclick}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

import React from "react";
import Contact from "../../../Component/Contact/Contact";
import Navbar from "../../../Component/Navbar/Navbar";

export default function Chat() {
  return (
    <div>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Contact />
      </div>
    </div>
  );
}

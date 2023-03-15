import React from "react";
import { useSelector } from "react-redux";
import Leftbar from "../../Component/Leftsidecontainer/LeftBar";
import MainPost from "../../Component/MainPostContainer/MainPost";
import Navbar from "../../Component/Navbar/Navbar";
import Rightbar from "../../Component/RightsideContainer/Rightbar";
import "./home-page.css";

export default function HomePage() {
  // const userDetails = useSelector((state) => state.user);
  // let user = userDetails.user;
  // console.log(user);
  return (
    <div className="home">
      <Navbar />
      <div className="componentContainer">
        <Leftbar />
        <MainPost />
        <Rightbar />
      </div>
    </div>
  );
}

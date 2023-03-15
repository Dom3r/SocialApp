import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../../Component/Navbar/Navbar";
import ProfileLeftbar from "../../../Component/ProfileLeftsidecontainer/ProfileLeftBar";
import ProfileMainPost from "../../../Component/ProfileMainPostContainer/ProfileMainPost";
import ProfileRightbar from "../../../Component/ProfileRightsideContainer/ProfileRightbar";
import "./profile.css";

export default function Profile() {
  return (
    <div className="profileContainer">
      <Navbar />
      <div className="subProfileContainer">
        <ProfileLeftbar />
        <ProfileMainPost />
        <ProfileRightbar />
      </div>
    </div>
  );
}

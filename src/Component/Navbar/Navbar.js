import React from "react";
import "./navbar.css";
import searchIcon from "../Images/search.png";
import messageIcon from "../Images/message.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxContainer/userReducer";
export default function Navbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  console.log(user);
  let id = user?.other?._id;
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="mainNavbar">
      <div className="LogoContainer">
        <Link to={"/"}>
          <p>Social</p>
        </Link>
      </div>

      <div>
        <div className="searchInputContainer">
          <img src={`${searchIcon}`} className="searchIcon" alt="" />
          <input
            type="text"
            className="searchInput"
            placeholder="search your friends"
            name=""
            id=""
          />
        </div>
      </div>
      <div className="IconsContainer">
        <Link to={"/Chat"}>
          <img src={`${messageIcon}`} className="Icons" alt="" />
        </Link>
        <Link to={`/Profile/${id}`}>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onClick="window.location.reload();"
          >
            <img
              src={`${user?.other?.profilePhoto}`}
              className="ProfileImage"
              alt=""
            />
            <p style={{ marginLeft: "5px" }}>{user?.other?.username}</p>
          </div>
        </Link>
        <Link to={"/Login"}>
          <div
            style={{
              marginRight: "30px",
              marginLeft: "20px",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            <p>Logout</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

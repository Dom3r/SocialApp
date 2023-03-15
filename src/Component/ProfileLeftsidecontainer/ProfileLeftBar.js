import React, { useEffect } from "react";
import "./profileleftbar.css";
import image from "../Images/profile.png";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
export default function ProfileLeftbar() {
  let location = useLocation();
  let id = location.pathname.split("/")[2];
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  const [Follow, setUnFollow] = useState("Follow/Unfollow");
  const accessToken = user.accessToken;

  const [users, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${id}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);
  let followersCounter = users?.Followers?.length;
  let followingCounter = users?.Following?.length;

  const [Followinguser, setFollowinguser] = useState([]);
  useEffect(() => {
    const getFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`
        );
        setFollowinguser(res.data);
      } catch (error) {
        console.log("Error");
      }
    };
    getFollowing();
  }, []);

  const handleFollow = async () => {
    if (Follow === "Follow") {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("Unfollow");
    } else {
      await fetch(`http://localhost:5000/api/user/following/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/JSON", token: accessToken },
        body: JSON.stringify({ user: `${user.other._id}` }),
      });
      setUnFollow("Follow");
    }
    window.location.reload();
  };
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/user/editbio`,
        {
          bio: bio,
        },
        {
          headers: {
            "Content-Type": "application/JSON",
            token: accessToken,
          },
        }
      );
      // Update the bio in the frontend to reflect the changes
      setuser((prevState) => ({
        ...prevState,
        bio: bio,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="ProfileLeftbar">
      <div className="NotificationsContainer">
        <img src={`${image}`} className="ProfilepageCover" alt="" />
        <div style={{ display: "flex", alignItems: "center", marginTop: -30 }}>
          <img
            src={`${users.profilePhoto}`}
            className="Profilepageimage"
            alt=""
          />
          <div>
            <p
              style={{
                marginLeft: 6,
                marginTop: 20,
                color: "black",
                textAlign: "start",
              }}
            >
              {users.username}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Followings
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followingCounter}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: -20,
          }}
        >
          <p style={{ color: "black", marginLeft: 20, fontSize: "14px" }}>
            Followers
          </p>
          <p
            style={{
              color: "black",
              marginRight: 20,
              fontSize: "12px",
              marginTop: 17,
            }}
          >
            {followersCounter}
          </p>
        </div>
        <div style={{ marginTop: -20 }}>
          <h5
            style={{
              color: "black",
              marginLeft: 10,
              fontSize: "14px",
              marginRight: 30,
              marginTop: 30,
              textAlign: "start",
            }}
          >
            User bio
          </h5>
          <p
            style={{
              color: "black",
              fontSize: "12px",
              marginTop: -20,
              textAlign: "start",
              marginLeft: "10px",
            }}
          >
            {users.bio}
          </p>
        </div>
        {user.other._id !== id ? (
          <div>
            <button
              onClick={handleFollow}
              style={{
                width: "100%",
                paddingTop: 7,
                paddingBottom: 7,
                border: "none",
                backgroundColor: "green",
                color: "white",
              }}
            >
              Follow/Unfollow
            </button>
          </div>
        ) : (
          <div>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <label>
                  <div>Edit mode:</div>
                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                  />
                </label>
                <div>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            ) : (
              <button
                style={{
                  width: "100%",
                  paddingTop: 7,
                  paddingBottom: 7,
                  border: "none",
                  backgroundColor: "green",
                  color: "white",
                }}
                onClick={() => setIsEditing(true)}
              >
                Edit biogram
              </button>
            )}
          </div>
        )}
      </div>

      <div className="NotificationsContainer">
        <h3>Followings</h3>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <p style={{ marginLeft: 10 }}>Friends</p>
          <p style={{ marginRight: 10, color: "#aaa" }}>See all</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", marginLeft: 5 }}>
          {Followinguser.map((item) => (
            <Link to={`/Profile/${item._id}`}>
              <div
                style={{ marginLeft: 4, cursor: "pointer" }}
                key={item._id}
                onClick="window.location.reload();"
              >
                <img
                  src={`${item.profilePhoto}`}
                  className="friendimage"
                  alt=""
                />
                <p style={{ marginTop: -2 }}>{item.username}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

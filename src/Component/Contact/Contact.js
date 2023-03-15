import React, { useEffect, useState } from "react";
import "./contact.css";
import ChatContainer from "../ChatContainer/ChatContainer";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Contact() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const [users, setUsers] = useState();
  const [currentChatUser, setCurrentChatUser] = useState("");
  const accesstoken = user.accessToken;
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/following/${id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {}
    };
    getUsers();
  }, []);
  const handleUser = (e) => {
    setCurrentChatUser(e);
  };
  return (
    <div className="mainContactContainer">
      <div>
        <div style={{ width: "25rem", padding: "10px" }}>
          <input
            type="search"
            placeholder="Search your friends"
            className="searchBarContact"
          />
        </div>
        <div className="usersDetailContainer">
          {users?.map((item) => (
            <div>
              {item?._id !== id ? (
                <div
                  className="userContainer"
                  onClick={(e) => handleUser(item)}
                >
                  <img
                    src={`${item?.profilePhoto}`}
                    className="chatUserImage"
                    alt=""
                  />
                  <div>
                    <p
                      style={{
                        textAlign: "start",
                        marginTop: "5px",
                        fontSize: "15px",
                      }}
                    >
                      {item?.username}
                    </p>
                    <p
                      style={{
                        textAlign: "start",
                        marginTop: "-8px",
                        fontSize: "13px",
                      }}
                    >
                      Open your message
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
      {currentChatUser !== "" ? (
        <ChatContainer currentChatUser={currentChatUser} />
      ) : (
        <div style={{ marginLeft: "50px", marginTop: "20px" }}>
          <p style={{ fontSize: "30px", color: "green" }}>
            Open your tab message choosing from left
          </p>
        </div>
      )}
    </div>
  );
}

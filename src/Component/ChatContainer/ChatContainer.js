import React, { useEffect, useRef, useState } from "react";
import "./chatcontainer.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
export default function ChatContainer({ currentChatUser }) {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails.user;
  let id = user.other._id;
  const accesstoken = user.accessToken;
  const socket = useRef();
  const scrollRef = useRef();
  const [message, setMessage] = useState();
  const [inputMessage, setInputMessage] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/post/get/chat/msg/${id}/${currentChatUser._id}`,
          {
            headers: {
              token: accesstoken,
            },
          }
        );
        setMessage(res.data);
      } catch (error) {}
    };
    getMessage();
  }, [currentChatUser._id]);
  useEffect(() => {
    if (currentChatUser !== "") {
      socket.current = io("http://localhost:5000");
      socket.current.emit("addUser", id);
    }
  }, [id]);
  console.log(socket);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, message);

  const sendMsg = () => {
    const messages = {
      myself: true,
      message: inputMessage,
    };
    socket.current.emit("send-msg", {
      to: currentChatUser._id,
      from: id,
      message: inputMessage,
    });
    fetch(`http://localhost:5000/api/post/msg`, {
      method: "POST",
      headers: { "Content-Type": "application/JSON", token: accesstoken },
      body: JSON.stringify({
        from: id,
        to: currentChatUser._id,
        message: inputMessage,
      }),
    });
    setMessage(message.concat(messages));
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <div className="mainChatContainer">
      <div>
        <div
          style={{
            display: "flex",
            marginLeft: "30px",
            marginTop: "20px",
            backgroundColor: "rgb(241 243 241)",
            width: "auto",
            padding: "6px",
            borderRadius: "10px",
          }}
        >
          <img
            src={`${currentChatUser.profilePhoto}`}
            className="userProfile"
            alt=""
          />
          <p style={{ marginLeft: "6px" }}>{currentChatUser?.username}</p>
        </div>
        <div className="msgContainer">
          {message?.map((item) => (
            <div ref={scrollRef}>
              {item?.myself === false ? (
                <div className="msgFriend">
                  <img
                    src={`${currentChatUser.profilePhoto}`}
                    className="chatUserProfile"
                    alt=""
                  />
                  <p className="msgTxt">{item?.message}</p>
                </div>
              ) : (
                <div className="msgMy">
                  <p className="msgTxt">{item?.message}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="msgSenderContainer">
          <input
            type="text"
            placeholder="Type your message here"
            name=""
            id=""
            className="msgInput"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button className="msgBtn" onClick={sendMsg}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

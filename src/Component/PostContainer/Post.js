import React, { useState } from "react";
import "./post.css";
import ProfileImage from "../Images/profile.png";
import LikeIcon from "../Images/like.png";
import CommentIcon from "../Images/speech-bubble.png";
import anotherlikeicon from "../Images/setLike.png";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
export default function Post({ post }) {
  const userDetails = useSelector((state) => state.user);
  let users = userDetails?.user;
  const [user, setuser] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/post/user/details/${post.user}`
        );
        setuser(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);
  const userId = users.other._id;
  const accessToken = users.accessToken;
  const [Like, setLike] = useState([
    post.like.includes(userId) ? anotherlikeicon : LikeIcon,
  ]);
  const [count, setCount] = useState(post.like.length);
  const [Comments, setComments] = useState(post.comments);
  const [commentwriting, setcommentwriting] = useState("");
  const [show, setshow] = useState(false);

  const handleLike = async () => {
    if (Like == LikeIcon) {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(anotherlikeicon);
      setCount(count + 1);
    } else {
      await fetch(`http://localhost:5000/api/post/${post._id}/like`, {
        method: "PUT",
        headers: { "Content-Type": "application/Json", token: accessToken },
      });
      setLike(LikeIcon);
      setCount(count - 1);
    }
  };

  const addComment = async () => {
    const comment = {
      postid: `${post._id}`,
      username: `${users.other.username}`,
      comment: `${commentwriting}`,
      profilePhoto: `${users.other?.profilePhoto}`,
    };
    await fetch(`http://localhost:5000/api/post/comment/post`, {
      method: "PUT",
      headers: { "Content-Type": "application/Json", token: accessToken },
      body: JSON.stringify(comment),
    });
    setComments(Comments.concat(comment));
  };

  const handleComment = () => {
    addComment();
  };

  console.log(Comments);

  const handleshow = () => {
    if (show === false) {
      setshow(true);
    } else {
      setshow(false);
    }
  };
  console.log(user);

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div>
          <div style={{ display: "flex", alignItems: "center" }}>
            {user.profilePhoto == "" ? (
              <img src={`${ProfileImage}`} className="PostImage" alt="" />
            ) : (
              <img src={`${user.profilePhoto}`} className="PostImage" alt="" />
            )}

            <div>
              <p style={{ marginLeft: "5px", textAlign: "start" }}>
                {user.username}
              </p>
            </div>
          </div>
          <p
            style={{
              textAlign: "start",
              width: "96%",
              marginLeft: 20,
              marginTop: 0,
            }}
          >
            {post.title}
          </p>
          {post.image !== "" ? (
            <img src={`${post.image}`} className="PostImages" alt="" />
          ) : post.video !== "" ? (
            <video className="PostImages" width="500" height="500" controls>
              <source src={`${post.video}`} type="video/mp4" />
            </video>
          ) : (
            ""
          )}
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", marginLeft: "10px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src={`${Like}`}
                  className="iconsforPost"
                  onClick={handleLike}
                  alt=""
                />
                <p style={{ marginLeft: "6px" }}>{count} Likes</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: 20,
                  cursor: "pointer",
                }}
              >
                <img
                  src={`${CommentIcon}`}
                  className="iconsforPost"
                  onClick={handleshow}
                  alt=""
                />
                <p style={{ marginLeft: "6px" }}>{Comments.length} Comments</p>
              </div>
            </div>
          </div>
          {show === true ? (
            <div style={{ padding: "10px" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`${users?.other?.profilePhoto}`}
                  className="PostImage"
                  alt=""
                />

                <input
                  type="text"
                  className="commentinput"
                  placeholder="Write your comment"
                  onChange={(e) => setcommentwriting(e.target.value)}
                />
                <button className="addCommentbtn" onClick={handleComment}>
                  Post
                </button>
              </div>
              {Comments.map((item) => (
                <div style={{ alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {item.profilePhoto === "" ? (
                      <img
                        src={`${ProfileImage}`}
                        className="PostImage"
                        alt=""
                      />
                    ) : (
                      <img
                        src={`${item.profilePhoto}`}
                        className="PostImage"
                        alt=""
                      />
                    )}
                    <p
                      style={{ marginLeft: "6px", fontSize: 18, marginTop: 6 }}
                    >
                      {item.username}
                    </p>
                  </div>
                  <p
                    style={{
                      marginLeft: "55px",
                      textAlign: "start",
                      marginTop: -16,
                    }}
                  >
                    {item.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

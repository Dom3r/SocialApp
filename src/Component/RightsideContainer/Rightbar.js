import React, { useEffect } from "react";
import "./rightbar.css";
import ads from "../Images/ads.jpeg";
import axios from "axios";
import { useState } from "react";
import Follow from "./Follow";
import { useSelector } from "react-redux";
export default function Rightbar() {
  const userDetails = useSelector((state) => state.user);
  let user = userDetails?.user;
  const id = user?.other?._id;
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getuser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/user/all/user/${id}`,
          {
            params: {
              exclude: id,
            },
          }
        );
        setUsers(res.data);
      } catch (error) {
        console.log("Some error occured");
      }
    };
    getuser();
  }, []);

  return (
    <div className="rightbar">
      <div className="rightcontainer">
        <div className="adsContainer">
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              Example ads
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Description
            </p>
          </div>
        </div>
        <div className="adsContainer">
          <img src={`${ads}`} className="adsimg" alt="" />
          <div>
            <p
              style={{ textAlign: "start", marginLeft: "10px", marginTop: -20 }}
            >
              Example ads
            </p>
            <p
              style={{
                textAlign: "start",
                marginLeft: "10px",
                fontSize: "12px",
                marginTop: "-16px",
              }}
            >
              Description
            </p>
          </div>
        </div>
      </div>

      <div className="rightcontainer2">
        <h3 style={{ textAlign: "start", marginLeft: "10px" }}>
          Suggested for you
        </h3>
        {users.map((item) => (
          <Follow userdetails={item} />
        ))}
      </div>
    </div>
  );
}

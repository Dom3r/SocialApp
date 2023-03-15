import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./register.css";
import { register } from "../../../Component/ReduxContainer/apiCall";
import app from "../../../firebase";
import { useNavigate } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
export default function Register() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhonenumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const userDetails = user.user;
  const navigator = useNavigate();

  //Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [fileError, setFileError] = useState("");

  //Validation functions
  const validateFile = () => {
    if (!file) {
      setFileError("Please select a profile image");
    } else {
      setFileError("");
    }
  };

  const validateEmail = () => {
    const emailInput = document.getElementById("emailInput");
    if (!emailInput.checkValidity() || emailInput.value.length == 0) {
      setEmailError("Please enter a valid email");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
    } else {
      setPasswordError("");
    }
  };

  const validateUsername = () => {
    if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long");
    } else {
      setUsernameError("");
    }
  };

  const validatePhoneNumber = () => {
    const phoneNumberRegex = /^\d{8,}$/;
    if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError(
        "Phone number must contain only numbers and be at least 8 characters long"
      );
    } else {
      setPhoneNumberError("");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    validateFile();
    validateEmail();
    validatePassword();
    validateUsername();
    validatePhoneNumber();

    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const StorageRef = ref(storage, fileName);
    if (
      !usernameError &&
      !passwordError &&
      !fileError &&
      !phoneNumberError &&
      !emailError
    ) {
      const uploadTask = uploadBytesResumable(StorageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          // eslint-disable-next-line default-case
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            register(dispatch, {
              email,
              password,
              username,
              phoneNumber,
              profilePhoto: downloadURL,
            });
          });
        }
      );
    }
  };
  console.log(userDetails?.Status);
  if (userDetails?.Status === "Sending") {
    navigator("/verify/email");
  }
  return (
    <div className="mainContainerForsignup">
      <div className="submainContainer">
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className="logoText">
            <span className="part">Social</span> App
          </p>
          <p className="introtext">
            Start expanding your <span className="part">social networks </span>
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p className="createaccountTxt">Create New Account</p>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {fileError && <div className="error-message">{fileError}</div>}
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="inputText"
          />
          {usernameError && (
            <div className="error-message">{usernameError}</div>
          )}
          <input
            type="text"
            placeholder="Phonenumber"
            onChange={(e) => setPhonenumber(e.target.value)}
            className="inputText"
          />
          {phoneNumberError && (
            <div className="error-message">{phoneNumberError}</div>
          )}
          <input
            type="email"
            name=""
            id="emailInput"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            className="inputText"
          />
          {emailError && <div className="error-message">{emailError}</div>}
          <input
            type="password"
            placeholder="password"
            name=""
            onChange={(e) => setPassword(e.target.value)}
            id=""
            className="inputText"
          />
          {passwordError && (
            <div className="error-message">{passwordError}</div>
          )}
          <button className="btnforsignup" onClick={handleClick}>
            Register
          </button>
          <Link to={"/"}>
            <p style={{ textAlign: "start", marginLeft: "25%" }}>
              Already have a account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/user");
const PostRouter = require("./router/post");
const cors = require("cors");
const socket = require("socket.io");
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connection successfull"))
  .catch(() => {
    console.log("Some error occured");
  });
app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/post", PostRouter);

const server = app.listen(5000, () => {
  console.log("Server is running");
});

const socketIo = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
socketIo.on("connection", (socket) => {
  global.chatsocket = socket;
  socket.on("addUser", (id) => {
    // eslint-disable-next-line no-undef
    onlineUsers.set(id, socket.id);
  });
  socket.on("send-msg", (data) => {
    // eslint-disable-next-line no-undef
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});

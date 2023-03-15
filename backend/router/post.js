const router = require("express").Router();
const { verifyToken } = require("./verifytoken");
const Post = require("../Modals/Post");
const User = require("../Modals/User");
const Message = require("../Modals/Message");

//Create new post
router.post("/user/post", verifyToken, async (req, res) => {
  try {
    let { title, image, video } = req.body;
    let newPost = new Post({
      title,
      image,
      video,
      user: req.user.id,
    });
    const post = await newPost.save();
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});
//Update post uploaded by user
router.put("/update/post/:id", verifyToken, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json("Post does not found");
    }

    post = await Post.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    let updatepost = await post.save();
    res.status(200).json(updatepost);
  } catch (error) {
    return res.status(500).json("Internal error occured");
  }
});

//Upload post by one user
router.get("/get/post/:id", async (req, res) => {
  try {
    const mypost = await Post.find({ user: req.params.id });
    if (!mypost) {
      return res.status(200).json("You don't have any post");
    }

    res.status(200).json(mypost);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

//Like
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.like.includes(req.user.id)) {
      if (post.dislike.includes(req.user.id)) {
        await post.updateOne({ $pull: { dislike: req.user.id } });
      }
      await post.updateOne({ $push: { like: req.user.id } });
      return res.status(200).json("Post has been liked");
    } else {
      await post.updateOne({ $pull: { like: req.user.id } });
      return res.status(200).json("Post has been unlike");
    }
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
});
//Dislike
router.put("/:id/dislike", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.dislike.includes(req.user.id)) {
      if (post.like.includes(req.user.id)) {
        await post.updateOne({ $pull: { like: req.user.id } });
      }
      await post.updateOne({ $push: { dislike: req.user.id } });
      return res.status(200).json("Post has been disliked");
    } else {
      await post.updateOne({ $pull: { dislike: req.user.id } });
      return res.status(200).json("Post has been unlike");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

//Delete post
router.delete("/delete/post/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.user === req.user.id) {
      const deletepost = await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json("You post has been deleted");
    } else {
      return res.status(400).json("You are not allow to delete this post");
    }
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});
//Comment
router.put("/comment/post", verifyToken, async (req, res) => {
  const { comment, postid, profilePhoto } = req.body;
  const comments = {
    user: req.user.id,
    username: req.user.username,
    comment,
    profilePhoto,
  };
  const post = await Post.findById(postid);
  post.comments.push(comments);
  await post.save();
  res.status(200).json(post);
});

/// Get a Following user
router.get("/following/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const followinguser = await Promise.all(
    user.Following.map((item) => {
      return User.findById(item);
    })
  );

  let followingList = [];
  followinguser.map((person) => {
    const { email, password, phoneNumber, Following, Followers, ...others } =
      person._doc;
    followingList.push(others);
  });

  res.status(200).json(followingList);
});

/// Get a Followers user
router.get("/followers/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const followersuser = await Promise.all(
      user.Followers.map((item) => {
        return User.findById(item);
      })
    );

    let followersList = [];
    followersuser.map((person) => {
      const { email, password, phoneNumber, Following, Followers, ...others } =
        person._doc;
      followersList.push(others);
    });

    res.status(200).json(followersList);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

//Make message
router.post("/msg", verifyToken, async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const newMessage = await Message.create({
      message: message,
      Chatusers: [from, to],
      sender: from,
    });

    return res.status(200).json(newMessage);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

//Get message
router.get("/get/chat/msg/:user1Id/:user2Id", async (req, res) => {
  try {
    const from = req.params.user1Id;
    const to = req.params.user2Id;

    const newMessage = await Message.find({
      Chatusers: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const allMessage = newMessage.map((msg) => {
      return {
        myself: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    return res.status(200).json(allMessage);
  } catch (error) {
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;

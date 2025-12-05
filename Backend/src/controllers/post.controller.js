import sharp from "sharp";
import cloudinary from "../config/cloudinary.js";
import Post from "../models/posts.model.js";
import User from "../models/user.model.js";
import Comment from "../models/comment.model.js";

export const addPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res.status(400).json({ message: "Image Require", success: false });
    }

    //image upload
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({
        width: 800,
        height: 800,
        fit: "inside",
      })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    //   buffer to datauri
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri, {
      folder: "Instagram_posts",
      resource_type: "image",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
      transformation: [
        { width: 800, height: 800, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    const user = await User.findById(authorId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    const newPost = await post.populate({
      path: "author",
      select: "-passsword",
    });

    return res.status(200).json({
      success: true,
      status: 1,
      message: "Post Created Succesfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePhoto" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: { path: "author", select: "username profilePhoto" },
      });

    return res.status(200).json({
      success: true,
      status: 1,
      message: "Get All Post Succesfully",
      data: post,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username ,profilePhoto",
      })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        select: "username ,profilePhoto",
      });

    return res.status(200).json({
      success: true,
      status: 1,
      message: "Get User Own Post Succesfully",
      data: posts,
    });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    // likekarnewalaId
    const like_user_id = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        status: 0,
        message: "Post not found",
        data: [],
      });
    }

    //like logic
    await post.updateOne({ $addToSet: { likes: like_user_id } });
    await post.save();

    //implement socket io - realtime notification

    return res.status(200).json({
      success: true,
      status: 1,
      message: "Like Post Succesfully",
      data: post,
    });
  } catch (error) {}
};

export const disLikePost = async (req, res) => {
  try {
    // likekarnewalaId
    const like_user_id = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        status: 0,
        message: "Post not found",
        data: [],
      });
    }

    //dislike logic
    await post.updateOne({ $pull: { likes: like_user_id } });
    await post.save();

    //implement socket io - realtime notification

    return res.status(200).json({
      success: true,
      status: 1,
      message: "Dislike Post Succesfully",
      data: post,
    });
  } catch (error) {}
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const commented_user_Id = req.id;
    const { text } = req.body;

    const post = await Post.findById(postId).populate("author", "-password");
    if (!text)
      return res.status(400).json({
        status: 0,
        success: false,
        message: "Text is Required",
        data: null,
      });

    const comment = await Comment.create({
      text,
      author: commented_user_Id,
      post: postId,
    });

    await comment.populate({
            path:'author',
            select:"username profilePhoto"
        });
        
    post.comments.push(comment._id);
    const updatedPost = await post.save();

    return res.status(200).json({
      status: 1,
      success: true,
      message: "Comment Add Succesfully",
      data: { updatedPost, comment: comment },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentsOfPost = async (req, res) => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "-password"
    );

    if (!comments) {
      return res.status(404).json({
        status: 0,
        success: false,
        message: "No Commetns are Found",
      });
    }
    return res.status(200).json({
      status: 1,
      success: true,
      message: "Get Comments Successfully",
      data: comments,
    });
  } catch (error) {
    console.log(error);
  }
};

//Bookmark or Unbookmark the Post
export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const user = await User.findById(userId);

    let updatedUser;

    if (user.bookmarks.includes(postId)) {
      // Remove bookmark   //already bookmark so it will unbookmark
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { bookmarks: postId } },
        { new: true }
      );

      return res.status(200).json({
        success: true,
        type: "unsaved",
        message: "Removed from bookmarks",
        data: updatedUser,
      });
    } else {
      // Add bookmark //make bookmark post
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { bookmarks: postId } },
        { new: true }
      ).populate('bookmarks').lean();

      return res.status(200).json({
        success: true,
        type: "saved",
        message: "Added to bookmarks",
        data: updatedUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};


export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        status: 0,
        success: false,
        message: "No Post Found",
      });
    }
    //check if logged-in user is own of post
    if (post.author.toString() !== authorId.toString()) {
      return res.status(403).json({
        status: 0,
        success: false,
        message: "Unauthorized to delete this post",
      });
    }

    //delete post
    await Post.findByIdAndDelete(postId);

    //remove post id fro user id also
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    //delete associated Comments from comment model also
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      status: 1,
      success: true,
      message: "Delete Post Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

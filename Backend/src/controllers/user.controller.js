import cloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";

//Get Profile
export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    let user = await User.findById(userId)
      .select("-password")
      .populate("posts")
      .populate("bookmarks")
      .populate("followers")
      .populate("following")
      .lean();

    return res.status(200).json({
      status: 1,
      success: true,
      message: "Get User Profile Successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

//Edit Profile
export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;
    let cloudResponse;

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture) user.profilePhoto = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "User Edit Profile Successful",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const suggestedUser = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );

    if (!suggestedUser) {
      return res.status(400).json({
        success: false,
        message: "Currently do not have any User",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get Suggested User Successfull",
      data: suggestedUser,
    });
  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKrnewala = req.id; //self
    const jiskoFollowKrunga = req.params.id; //other user id

    if (followKrnewala === jiskoFollowKrunga) {
      return res.status(400).json({
        status: 0,
        success: false,
        message: "You cannot follow/unfollow yourself",
      });
    }
    const user = await User.findById(followKrnewala);
    const targetUser = await User.findById(jiskoFollowKrunga);

    if (!user || !targetUser) {
      return res.status(404).json({
        status: 0,
        success: false,
        message: "User Not Found",
      });
    }
    //check that user follow or unfollow the user;

    const isFollowing = user.following.includes(jiskoFollowKrunga);

    if (isFollowing) {
      //already following that user so unfollow logic
      await Promise.all([
        User.updateOne(
          { _id: followKrnewala },
          { $pull: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $pull: { followers: followKrnewala } }
        ),
      ]);

      return res.status(200).json({
        success: true,
        status: 1,
        message: "Unfollow User Successfully",
      });
    } else {
      // follow logic
      await Promise.all([
        User.updateOne(
          { _id: followKrnewala },
          { $push: { following: jiskoFollowKrunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKrunga },
          { $push: { followers: followKrnewala } }
        ),
      ]);

      return res.status(200).json({
        success: true,
        status: 1,
        message: "Follow User Successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

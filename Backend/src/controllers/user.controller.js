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
    // get Current User (self)
    const currentUser = await User.findById(req.id);

    // IDs to exclude: Current user + current users you already follow
    const excludeIds = [req.id, ...currentUser.following];

    // Find users except these IDs
    const suggestedUsers = await User.find({ _id: { $nin: excludeIds } })
      .select("-password")
      .limit(10); // optional

    return res.status(200).json({
      success: true,
      message: "Suggested users fetched successfully",
      data: suggestedUsers,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
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

// export const getAllFollowers = async (req, res) => {
//   try {
//     const userId = req.id; // logged-in user id

//     const user = await User.findById(userId)
//       .populate("followers", "name email avatar") // select fields to return
//       .select("followers");

//     if (!user) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     return res.status(200).json({
//       success: true,
//       followers: user.followers,
//     });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Server error" });
//   }
// };


export const getAllFollowers = async (req, res) => {
  try {
    const userId = req.user.id;
    const search = req.query.search?.trim() || "";

    // Fetch the user and populate followers
    const user = await User.findById(userId)
      .populate({
        path: "following",
        select: "name username email profilePhoto",
        match: search
          ? {
              $or: [
                { name: { $regex: search, $options: "i" } },
                { username: { $regex: search, $options: "i" } },
              ],
            }
          : {}, // if no search, return all
      })
      .select("following");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get Followers List Successfully",
      data: user.following || [],
    });
  } catch (error) {
    console.error("Followers Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

import express from 'express';
import { addComment, addPost, bookmarkPost, deletePost, disLikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../controllers/post.controller.js';
import upload from '../middleware/multer.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
const router = express.Router();

// Get All Post 
router.get('/',getAllPost);

// Get User Own Post in profile 
router.get('/user',isAuthenticated, getUserPost);

// Add Post 
router.post("/add-post",isAuthenticated, upload.single("image"), addPost);

// Like Post 
router.put("/like/:id", isAuthenticated, likePost);

// disLike Post 
router.put("/dislike/:id", isAuthenticated, disLikePost);

// Comment on Post 
router.post("/comment/:id", isAuthenticated, addComment);

// Get all Comment on Post  
router.get("/comments/:id", isAuthenticated, getCommentsOfPost);

//Bookmark or Unbookmark the Post
router.put("/bookmark/:id", isAuthenticated, bookmarkPost);

//Delete Post
router.delete("/:id", isAuthenticated, deletePost);

export default router;
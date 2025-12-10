import express from 'express';
import { editProfile, followOrUnfollow, getAllFollowers, getProfile, getSuggestedUser } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
const router = express.Router();



router.get('/:id/profile',isAuthenticated , getProfile);
router.get('/suggested',isAuthenticated , getSuggestedUser);
router.get('/follower-list',isAuthenticated , getAllFollowers);
router.post('/profile/edit',isAuthenticated, upload.single('profilePicture'), editProfile);
router.post('/followorunfollow/:id',isAuthenticated , followOrUnfollow);
router.post('/followorunfollow/:id',isAuthenticated , followOrUnfollow);



export default router; 
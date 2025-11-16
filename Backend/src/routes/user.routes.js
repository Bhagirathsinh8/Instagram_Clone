import express from 'express';
import { editProfile, followOrUnfollow, getProfile, getSuggestedUser } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import upload from '../middleware/multer.js';
const router = express.Router();



router.get('/:id/profile',isAuthenticated , getProfile);
router.post('/profile/edit',isAuthenticated, upload.single('profilePicture'), editProfile);
router.get('/suggested',isAuthenticated , getSuggestedUser);
router.post('/followorunfollow/:id',isAuthenticated , followOrUnfollow);


export default router; 
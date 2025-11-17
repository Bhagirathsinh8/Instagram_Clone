import express from "express";
const router = express.Router();


import tempRoutes from './temp.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';
import messageRoutes from './message.route.js';



router.use('/temp', tempRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/message', messageRoutes);



export default router;
import express from "express";
const router = express.Router();


import tempRoutes from './temp.routes.js';
import authRoutes from './auth.routes.js';



router.use('/temp', tempRoutes);
router.use('/auth', authRoutes);



export default router;
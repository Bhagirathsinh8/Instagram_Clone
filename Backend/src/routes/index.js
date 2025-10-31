import express from "express";
const router = express.Router();


import tempRoutes from './temp.routes.js';



router.use('/temp', tempRoutes);
export default router;
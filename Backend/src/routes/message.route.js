import express from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { getMessge, sendMessage } from '../controllers/message.controller.js';

const router = express.Router();


router.get('/all/:id', isAuthenticated, getMessge);

router.post('/send/:id', isAuthenticated, sendMessage);



export default router;
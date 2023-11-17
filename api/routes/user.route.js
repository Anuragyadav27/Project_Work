import express from 'express';
import { UpdateUser, deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// creating routes related to user
router.post('/update/:id', verifyToken,UpdateUser)
router.delete('/delete/:id', verifyToken,deleteUser);

export default router
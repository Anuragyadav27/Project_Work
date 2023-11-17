import express from "express";
import { signOut, signin, signup } from "../controllers/auth.controller.js";

const router = express.Router();

// creating authenticatin  routes
router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout',signOut)

export default router
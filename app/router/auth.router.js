import authController from "../controllers/auth.controller.js";

import { Router } from "express";

export const router = Router();

router.post('/signup', authController.postSignUp);
router.post('/login', authController.postLogin);

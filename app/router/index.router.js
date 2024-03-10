import { Router } from "express";

import {router as userRouter} from "./user.router.js";
import {router as articleRouter} from "./article.router.js";
import {router as bakeryRouter} from "./bakery.router.js";
import {router as authRouter} from "./auth.router.js";
import {router as bakery_has_articleRouter} from "./bakery_has_article.router.js";

export const router = Router();

router.use(userRouter);
router.use(articleRouter);
router.use(bakeryRouter);
router.use(authRouter);
router.use(bakery_has_articleRouter);

router.use((req, res) => {
    res.status(404).json('Not found');
});

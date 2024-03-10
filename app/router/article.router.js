import articleController from "../controllers/article.controller.js";

import validation from "../validation/validation.js";
import authorization from "../middlewares/authorization.js";

import createSchema from "../validation/schemas/article/create.schema.js";
import updateSchema from "../validation/schemas/article/update.schema.js";

import { Router } from "express";

export const router = Router();

router.get('/articles', articleController.getAll);
router.get('/articles/:id', articleController.getOne);
router.post('/articles',  articleController.create);
router.patch('/articles/:id',validation('body', updateSchema), articleController.update);
router.delete('/articles/:id',authorization.isAdmin, articleController.delete);
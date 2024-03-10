import bakery_has_articleController from "../controllers/bakery_has_article.controller.js";

import { Router } from "express";

export const router = Router();

router.get('/bakery_has_articles', bakery_has_articleController.getAll);
router.get('/bakery_has_articles/:id', bakery_has_articleController.getOne);
router.post('/bakery_has_articles', bakery_has_articleController.create);
router.patch('/bakery_has_articles/:id', bakery_has_articleController.update);
router.delete('/bakery_has_articles/:id', bakery_has_articleController.delete);
import bakeryController from "../controllers/bakery.controller.js";
import validation from "../validation/validation.js";
import authorization from "../middlewares/authorization.js";

import createSchema from "../validation/schemas/bakery/create.schema.js";
import updateSchema from "../validation/schemas/bakery/update.schema.js";

import { Router } from "express";

export const router = Router();

router.get('/bakeries', bakeryController.getAll);
router.get('/bakeries/:id', bakeryController.getOne);
router.post('/bakeries', validation('body', createSchema) ,authorization.isAdmin, bakeryController.create);
router.patch('/bakeries/:id', validation('body', updateSchema) ,authorization.isAdmin, bakeryController.update);
router.delete('/bakeries/:id',authorization.isAdmin, bakeryController.delete);













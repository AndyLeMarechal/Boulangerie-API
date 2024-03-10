
import userController from "../controllers/user.controller.js";
import validation from "../validation/validation.js";
import authorization from "../middlewares/authorization.js";

import createSchema from "../validation/schemas/user/create.schema.js";
import updateSchema from "../validation/schemas/user/update.schema.js";

import { Router } from "express";

export const router = Router();

router.get('/users', userController.getAll);
router.get('/users/:id',authorization.isAdmin, userController.getOne);
router.post('/users',validation('body', createSchema), authorization.isAdmin, userController.create);
router.patch('/users/:id',validation('body', updateSchema),authorization.isAdmin, userController.update);
router.delete('/users/:id',authorization.isAdmin, userController.delete);
















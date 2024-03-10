import "dotenv/config";

import express from "express";

import { bodySanitizer } from "./app/middlewares/body-sanitizer.js";

import { router as apiRouter } from "./app/router/index.router.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bodySanitizer);
app.use("/api", apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/api`);
});
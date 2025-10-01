import express, { Router } from "express";
import appController from "../controller/app.controller";

const router: Router = express.Router();

router.get("/loggerAPI", appController.loggerFunction);
export default router;
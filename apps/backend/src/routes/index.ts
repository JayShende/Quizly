import express, { Router } from "express";
import testRoute from "./test.route";
import quizRoute from "./quiz.route";
import questionRoute from "./question.route";
import responseRoute from "./response.route";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/quiz",
    route: quizRoute,
  },
  {
    path: "/question",
    route: questionRoute,
  },
  {
    path: "/response",
    route: responseRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;

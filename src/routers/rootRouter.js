import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { main, home, search } from "../controllers/videoController";
import { publicOnlyMiddleware } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", main);
rootRouter.get("/home", home);

rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);

rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

rootRouter.get("/search", search);

export default rootRouter;

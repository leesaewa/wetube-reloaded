import express from "express";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
} from "../controllers/userController";
import { error, main, home, search } from "../controllers/videoController";
import { publicOnlyMiddleware, avatarUpload } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", main);
rootRouter.get("/home", home);
rootRouter.get("/404", error);

rootRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(avatarUpload.single("avatar"), postJoin);

rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);

rootRouter.get("/search", search);

export default rootRouter;

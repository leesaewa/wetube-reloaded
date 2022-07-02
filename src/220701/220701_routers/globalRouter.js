import express from "express";
import {
  home,
  trending,
  newPage,
} from "../220701_controller/storiesController";
import { join, login } from "../220701_controller/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/trending", trending);
globalRouter.get("/new", newPage);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;

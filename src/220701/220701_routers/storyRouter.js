import express from "express";

import {
  story,
  storyId,
  storyDelete,
  storyEdit,
} from "../220701_controller/storiesController";

const storyRouter = express.Router();

storyRouter.get("/", story);
storyRouter.get("/:id(\\d+)", storyId);
storyRouter.get("/:id(\\d+)/edit", storyEdit);
storyRouter.get("/:id(\\d+)/delete", storyDelete);

export default storyRouter;

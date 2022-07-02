import express from "express";

import { users, userEdit, userId } from "../220701_controller/userController";

const userRouter = express.Router();

userRouter.get("/", users);
userRouter.get("/edit-profile", userEdit);
userRouter.get("/:id(\\d+)", userId);

export default userRouter;

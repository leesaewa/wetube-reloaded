import express, { application } from "express";
import morgan from "morgan";
import session from "express-session";

// router import
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express(); //create express application
const logger = morgan("dev");

app.set("view engine", "pug");
//views 경로 바꾸기
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "Hello!", resave: true, saveUninitialized: true }));

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

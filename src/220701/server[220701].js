import express from "express";
//import morgan from "morgan";

// router import
import globalRouter from "./220701_routers/globalRouter";
import storyRouter from "./220701_routers/storyRouter";
import userRouter from "./220701_routers/userRouter";

const PORT = 4000;

const app = express(); //create express application
//const logger = morgan("dev");
// const logger = (req, res, next) => {
//   return res.send("I love middlewares");
//   next();
// };
// app.use(logger);

app.use("/", globalRouter);
app.use("/stories", storyRouter);
app.use("/users", userRouter);

//외부 접속
const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT}/`);

app.listen(PORT, handleListening);

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

// 정답
// (1) 가장 먼저 URL을 디자인합니다.

// globalRouter: "/", "/trending", "/new", "/join", "/login"
// userRouter: "/users", "/users/:id", "/users/edit-profile"
// storyRouter: "/stories/:id", "/stories/:id/edit", "/stories/:id/delete"
// 알맞은 도메인(/, /users, /stories)을 기반으로 각각의 라우터에 라우트를 나눠주면 됩니다.
// (2) src 폴더에 controllers 폴더를 만들고 storiesController와 userController로 파일을 나누어 코드를 작성합니다.: Router

// (2-1) export const 컨트롤러 이름 = (req, res) => res.send("<h1>설명<h1>")

// 각 라우트가 컨트롤러를 가질 수 있도록 각 라우트와 연결할 컨트롤러를 만들고 내보냅니다(export).
// 자바스크립트의 모든 파일은 독립적이기 때문에 해당 파일 혹은 변수를 다른 파일에서 사용하기 위해서는 export/import를 해줘야 합니다.
// (2-2) export const seeStory = (req, res) => res.send(`<h1>seeStory: ${req.params.id}</h1>`)

// 3-4. 에서처럼 라우트에 /:id를 포함하여 작성할 경우, :id는 매개변수로 url 안에 변수를 포함시킬 수 있게 됩니다. 따라서 사용자가 /stories/123으로 이동할 경우 화면에는 seeStory: 123이 나옵니다.
// 참고 링크
// (3) src 폴더에 routers 폴더를 만들고 globalRouter, storyRouter, userRouter로 파일을 나누어 아래와 같이 코드를 작성합니다. 아래 내용은 storyRouter 파일에 대한 해설로 나머지 라우터도 동일한 방식으로 작성하면 됩니다.

// (3-1) import express from "express" : 라우터 파일에 express를 불러옵니다.

// (3-2)import {seeStory, editStory, deleteStory} from "../controllers/storiesController": import {컨트롤러, ...} from “컨트롤러 위치”로 각 라우트에 연결할 컨트롤러를 불러옵니다.

// (3-3) const storyRouter = express.Router(): 스토리 라우터를 만듭니다.

// (3-4) 라우터 이름.get("/라우트", 컨트롤러), storyRouter.get("/:id", seeStory)

// 스토리 라우터의 도메인인 /stories에 해당하는 GET 라우트를 모두 연결하고, 각각의 GET 라우트의 컨트롤러도 연결합니다.
// 기준이 되는 url(/stories)를 생략하고 뒷부분인 :/id만 적으면 됩니다.
// (3-5) export default storyRouter: 스토리 라우터를 export default 해줍니다.

// (4) import storyRouter from "./routers/storyRouter"

// export default 변수명으로 내보낸 파일은 import 변수명 from "파일 위치"로 불러올 수 있습니다.
// 모든 라우터 파일을 서버(index.js)에 불러옵니다.
// (5) app.use("/", globalRouter), app.use("/stories", storyRouter), app.use("/users", userRouter): app.use()`로 각각의 기준이 되는 라우트(url)에 라우터를 연결합니다.

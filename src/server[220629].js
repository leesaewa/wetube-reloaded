import express from "express";

const PORT = 4000;

const app = express(); //create express application

const URLlogger = (req, res, next) => {
  console.log("Path: ", req.path);
  next();
};
const TimeLpogger = (req, res, next) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  console.log(`Time: ${year}.${month}.${day}`);
  next();
};

const securityLogger = (req, res, next) => {
  const protocol = req.protocol;
  //console.log(protocol);

  if (protocol === "https") {
    console.log("Secure");
  } else {
    console.log("Insecure");
  }
  next();
};

const protectorMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not Allowed!</h1>");
  }
  next();
};

const handleHome = (req, res) => {
  return res.send("I love middlewares");
};

//get response
//req, res의 이름은 마음대로 지어도 됨. 하지만 반드시 두 개의 arguments가 필요
app.use(URLlogger, TimeLpogger, securityLogger);
app.get("/", handleHome);
app.get("/protected", protectorMiddleware);

//외부 접속
const handleListening = () =>
  console.log(`server listening on port http://localhost:${PORT}/`);

app.listen(PORT, handleListening);

//
//
//
// 정답
//
//
//

// (1) URL Logger 미들웨어는 방문 중인 URL을 기록해야 합니다.

// 요청의 path 값인 req.path를 기록하면 됩니다.
// 참고 링크
// 현재 미들웨어 함수가 요청-응답 주기를 종료하지 못하면 next()을 호출하여 다음 미들웨어 함수에 제어 권한을 전달해야 합니다. 그렇지 않으면 요청이 보류되기 때문에 미들웨어의 마지막에 next()를 호출합니다.
// (2) timeLogger 미들웨어는 년, 월, 일을 기록해야 합니다.

// 자바스크립트의 date() 메서드를 사용하여 현재 년, 월, 일을 구하고 콘솔에 기록하면 됩니다.
// 참고 링크
// next()를 호출하여 다음 미들웨어로 넘어갑니다.
// (3) protectorLogger 미들웨어는 사용자가 /protected로 이동하려고 할 경우 이동하지 못하게 해야 합니다.

// if 문을 사용하여 req.path가 /protected일 경우 html로 작성한 Forbidden을 반환하면 됩니다.
// next()를 호출하여 다음 미들웨어로 넘어갑니다.
// (4) secureLogger 미들웨어는 req의 protocol을 확인하여 기록해야 합니다.

// if else 문을 사용하여 req.protocol이 https인지 http인지에 따라 콘솔 기록이 달라지도록 코드를 작성하면 됩니다.
// 참고 링크
// 마지막으로 next()를 호출하여 다음으로 넘어가면 됩니다.
// (5) app.use(URLLogger, timeLogger, secureLogger, protectorLogger)

// app.use()는 지정된 경로에서 지정된 미들웨어 함수 또는 함수를 마운트 하는 메서드로, 요청한 경로의 베이스가 경로와 일치할 때 미들웨어 함수를 실행합니다.
// 참고 링크
// app.use()의 인자로 미들웨어(URLLogger, timeLogger, secureLogger, protectorLogger)를 넣으면 됩니다.
// (주의) 코드는 위에서부터 아래로 순서대로 읽히기 때문에 app.use(미들웨어)를 get 요청보다 위에 작성해야 합니다.

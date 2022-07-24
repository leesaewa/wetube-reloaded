# Wetube Reloaded

<a href="https://github.com/leesaewa/wetube_TIL">Study log</a>

## Log

---

#### 220724

- video controller scss 추가
- video player time/timeline/fullscreen/키보드 단축키 추가

#### 220723

- 공통/헤더 scss 작업
- header 반응형 작업

#### 220722

- **프론트엔드 작업 시작**
- video controller 버튼 추가

#### 220721

- webpack 추가
- edit profile
- bug fix
- scss 추가

#### 220720

- file upload 기능 추가

#### 220719

- 마이페이지(프로필 수정)
- 미들웨어 추가
- 비밀번호 수정 추가
- **코드 챌린지** 이메일, 유저네임 중복체크해서 수정못하게 하기.
  -> 추가로 깃허브로 로그인했을 때, 이메일 수정 못하게 함.
- **문제 발생** join 가입이 안되고 `Error: E11000 duplicate key error collection: wetube.users index: githubId_1 dup key: { githubId: null } at MongoServerError.<anonymous>` 이런 에러가 뜰 때는 `db.dropDatabase()`로 db삭제 후, 다시 시도해보기

#### 220716

- session, cookie
- `.env`파일 추가(보안)
- 로그아웃 추가
- 소셜 로그인(깃허브) 추가 // ~~계정없을 때 로그인 안됨. 다시 손 봐야 함.~~
  **(220719 원인 파악 완료)** -> 깃허브 계정에 `name`을 설정 안했을 때, 아래의 에러가 발생함.
  **`name`이 설정 안 됐을 때 `anonymous`로 로그인 되도록 수정할 것.**
  <img src="https://user-images.githubusercontent.com/97646713/179736225-cd6534fb-4fb2-45ab-a14b-99af160dd7fb.png" width="100%">

#### 220714

- **middlewares.js** 추가
- Create account
- password hasshing
- bcrypt.js
- status code
- login 추가
- session, cookie

#### 220712

- video delete, search 추가

#### 220711

- mongoDB schema 수정
- video upload, edit 추가
- 그 외 코드 정리

#### 220703

- mongoDB 추가
- 가짜 array database 추가
- server -> init.js로 수정하고 import db 옮김.

---

### Global Router

/ -> Home

/join -> Join

/login -> Login

/search -> Search

### User Router

/users/:id -> See user profile

/users/logout -> log out

/users/edit -> Edit my profile

/users/delete -> Delete my profile

### Video Router

/videos/:id -> See Video

/videos/:id/edit -> Edit Video

/videos/:id/delete -> Delete Video

/videos/upload -> Upload video

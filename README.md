# Wetube Reloaded

<a href="https://github.com/leesaewa/wetube_TIL">Study log</a>

## Log

---

#### 220716

- session, cookie
- `.env`파일 추가(보안)
- 소셜 로그인(깃허브) 추가 // 계정없을 때 로그인 안됨. 다시 손 봐야 함.
- 로그아웃 추가

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

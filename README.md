# Wetube Reloaded

## Log

---

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

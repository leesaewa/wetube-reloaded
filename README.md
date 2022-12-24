# MARAUTUBE
- Youtube clone coding
- `Harry Potter`의 `Marauders Map`에서 모티브를 얻어 제작함.
- 평범하지 않은 마법학교를 다니고 있지만, 머로더즈는 장난치기 좋아하는 10대 학생들이기에 교수님들이 접속할 수 없는 마법을 건 비밀 커뮤니티 사이트를 만들었다는 컨셉.
- `Harry Potter`の`Marauders Map`からモチーフを得て制作。
- 普通じゃない魔法学校に通っているが、マローダーズはいたずらが好きな10代の学生たちだから教授たちが接続できない魔法をかけた秘密のコミュニティーサイトを作ったというコンセプト。

# Preview (Last Updaate: 2022.10)
## PC
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau00.jpg">
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau01.jpg">
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau02.jpg">
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau05.jpg">

## SP
<img src="https://user-images.githubusercontent.com/97646713/209444306-d65420f4-aaf7-49c1-931e-46f7540a21ae.JPG">

# Link

<a href="https://github.com/leesaewa/wetube_TIL">Study log</a>

<a href="https://marautube.herokuapp.com/">heroku url/결과물 보러가기/作品見に行く</a>
- 헤로쿠 링크 살려둠 (221214)　Herokuリンク生かした
- ~~링크 이전 중. (221211~현재)~~

# Tool
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> <img src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black"/> <img src="https://img.shields.io/badge/Pug-A86454?style=flat-square&logo=Pug&logoColor=white"/>


<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/> <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=Express&logoColor=white"/> <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white"/> <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=black"/>

<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/> <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white"/> <img src="https://img.shields.io/badge/Visual Studio Code-007ACC?style=flat-square&logo=Visual Studio Code&logoColor=white"/> <img src="https://img.shields.io/badge/Heroku-#430098?style=flat-square&logo=Heroku&logoColor=white"/>

---

# Added Function
### <a href="https://leesaewa.github.io/design_portfolio/src/detail/project/pf_marautube.html#cursor">Mouse cursor custom</a>
<img src="https://user-images.githubusercontent.com/97646713/209444372-422da2ad-235e-498d-b7f6-fc3dee7d2a3c.JPG">

### <a href="https://leesaewa.github.io/design_portfolio/src/detail/project/pf_marautube.html#loading">Loading Animation</a>
<img src="https://user-images.githubusercontent.com/97646713/209444404-0af395e5-a74e-4d1d-9ded-e9cc31e3696b.JPG">

### <a href="https://leesaewa.github.io/design_portfolio/src/detail/project/pf_marautube.html#dark">Dark Mode</a>
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau06.jpg">

### Join -> Profile Image Preview / Upload -> video&thumbnail Preview
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau04.jpg"> <img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau08.jpg">

### Login -> Menu Drop Down
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau07.jpg">

### <a href="https://marautube.herokuapp.com/404">404 Error Page</a>
<img src="https://leesaewa.github.io/design_portfolio/src/img/portfolio/marau10.jpg">

---
# Nomad Coder Challenge 16th
<a href="https://nomadcoders.co/community/thread/5739">우수 졸업생 졸업작품 선정</a>
<img src="https://user-images.githubusercontent.com/97646713/209444874-34d36fc3-003c-4a1c-a4c0-7c4e94779c9e.jpg">

---

# Log

#### 221009

- 수정함. ~~사이트 열었을 때 다크모드부터 뜨니까 '라이트 모드'부터 뜨도록 수정해야 함.~~
- 스마트폰 -> 검색창이 제대로 출력되도록 수정함.
- 스마트폰 -> `다크 모드 버튼` 출력시키려면 UI 전면 수정해야 함!!
  - `hamburger menu`로 바꿔야 다 들어감 ㅠㅠ
- `loading` 완료되면 삭제되도록 했는데, 두 번 실행해서 삭제할 아이템이 없어서 에러가 뜨는 것 같음... 문제는 없는데 콘솔창에 에러가 떠서 그냥 화남 ㅠㅠ

#### 221005~6

- 스마트폰 사이즈 > `footer bottom`에 `padding` 추가
- 다크 모드 추가와 로딩 속도로 인한 자연스러운 배경 전환 효과를 위해 `background-image` 삭제.

- `Dark mode` 추가했지만 불완전함.

  - ~~(221006 문제점)~~

  1. ~~페이지 이동할 때마다 다크 모드 버튼이 풀림.~~
  2. ~~localStorage에 저장되게 했으나, 저장은 되는데 다크 모드 적용이 안됨.~~

  - ~~아이디 저장할 때처럼 session, cookie 시도해보기~~
  - **221006 01:58 해결**
    - `localStorage`에 대한 지식이 부족했음.
    - 기본적으로 `문자형(string)` 데이터 타입만 지원함. 이를 해결하기 위해서는 `JSON` 형태로 데이터를 읽고 써야함.
      ```
      > localStorage.setItem('json', JSON.stringify({a: 1, b: 2}))
      undefined
      > JSON.parse(localStorage.getItem('json'))
      {a: 1, b: 2}
      ```
  - **해결 방법**
    - `localStorage` 에 저장된 값을 `JSON`이 아니라 그냥 `문자형(string)` 데이터 타입으로 사용함.
    - 다크 모드 기본 동작과 `localStorage` 저장하는 코드를 `darkThemeClick` 함수 안에 모아놓고, 윈도우가 로드될 때 실행되는 이벤트 안에 조건문으로 `localStorage`에 저장된 값을 불러오게 구성함.
    - 코드가 길고 중복되니까 코드 정리는 필요할듯.

- ~~Mission 스마트폰 -> 다크모드 버튼과 검색창이 출력되게 수정해야 함.~~
- ~~사이트 열었을 때 다크모드부터 뜨니까 '라이트 모드'부터 뜨도록 수정해야 함.~~

#### 221003~4 챌린지 끝난 후의 업데이트

- 로딩 좀 더 빠르게 page loader를 `setTimeout`에서 `transitionend`로 바꿈.

  - `transitionend`는 `CSS transition`이 완료되면 발생함.
    `transition 속성`이 `제거`되거나 `display`가 `none`으로 설정된 경우와 같이 완료 전에 transition이 제거된 경우에는 이벤트가 생성되지 않음.

- `textarea`로 폼을 작성(Submit)하고 출력할 떄, `줄바꿈`이 되지 않는 현상을 수정함.

  - `CSS`에 ~~white-spce:pre~~를 줘서 `textarea`에 작성한대로 출력되도록 설정함.
  - **(221004 02:52수정)** 자동 줄바꿈이 되지 않아서 `white-spce:pre-line`으로 수정.

- `smartphone`에서 비디오가 재생되지 않는 현상이 발생.
  - `VideoUploader` `middlewear`에서 `contentType`을 지정해줌.
  - ~~확인 필요.~~ 여전히 재생이 안됨. 왜 그럴까?

#### 220807

- heroku 배포중...ㅠㅠ 에러와의 싸움
- 깃허브 로그인 시, channel에서 프로필 이미지 안 뜨는 거 수정함
- AWS S3 설정

#### 220806

- style 완료(메인, 헤더, 마이페이지, 비디오 디테일)
- js 수정

#### 220805

- 3페이지 빼고 스타일 적용 완료
- js->file preview 추가하고 썸네일, 동영상 부분도 다시 손 봄.
- 회원가입할 때 프로필 이미지 설정 가능함.
- 폼 스타일 통일함

#### 220804

- style 추가
- js->file preview, animation 등등 추가

#### 220803

- 로딩 추가
- 404페이지 라우터로 분리
- intro페이지 추가(main)
- style추가 및 수정
- 파일 정리/추가/수정
- 커서 변경
- 이미지 추가

#### 220802

- 코멘트 삭제 추가
- 코멘트-> 프로필 이미지 노출(깃허브, 일반, 설정 없을 때)
- 페이크 코멘트 추가 완료 (시간도 추가)
- 녹화 페이지/업로드 페이지 나눔
- edit profile style 추가/수정 -> 파일 프리뷰 추가

#### 220801

- profile scss 추가
- (실시간처럼 보이도록) 페이크 코멘트 추가

#### 220731

- 코멘트 입력/출력 추가함
- 깃허브 문제...

  - ~~깃허브로 로그인하고 영상 업로드하면 등록이 안됨... 하...~~
    - ?? 갑자기 됨.................? 프로필 이미지 수정했더니 되는 건가?
      보안 문제?? 의미 불명...ㅠㅠ 멘붕
  - ~~깃허브로 로그인하면 프로필 이미지가 노출이 안됨....하....딥빡~~
    - `server.js`에 `res.header("Cross-Origin-Embedder-Policy", "require-corp");`, `"require-corp"`를 `"credentialless"`로 바꿔줬더니 이미지가 제대로 나옴...
    - <a href="https://github.com/leesaewa/wetube_TIL/blob/main/bug/github_login.md">bug 문서 참조</a>
      - ~~어딘가에서 꼬인건지 원인을 대략 알 것 같은데 확실하지 않음.~~

#### 220730

- flash message 추가

#### 220729

- 코드 정리
- ~~비디오 변환(mp4) 추가 --> 1초 미만으로 녹화되면 썸네일 추출이 안되는 에러가 있음.~~
  - **해결** `ffmpeg`에서 `"00:00:01"`로 설정했기 때문임.
- 썸네일 추가
- 업로드한 영상 제목 등 수정이 적용되지 않는 것을 수정함.

#### 220727

- 비디오 녹화 기능 추가

#### 220725

- 푸터, 해더, 비디오 scss/js 수정

#### 220724

- header style/js 수정
- view API 추가
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

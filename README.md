<img src="https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=header&text=🧙‍♂️Harry_Potter🧙‍♂️&fontSize=90" />


## 프로젝트 소개

해당 질문에 답을 하여서 성향에 맞는 해리포터 총 4개의 기숙사 중 
하나에 배정할 수 있는 간단한 테스트를 할 수 있는 사이트입니다. 

**연결 링크**: __

![image](https://github.com/jaeyoung9083/Outsourcing_project/assets/69897998/2ef91f24-e903-4908-ac72-fe98ce133f23)


### :boxing_glove: 개발기간

**(23.07.17~23.07.21)**

## :magic_wand: Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Development

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/> 

<br/><br/>

## 화면 구성

## Main Page

![Main Page](https://github.com/jaeyoung9083/Outsourcing_project/blob/master/assets/69897998/c23e60c1-eca0-483e-bb0f-ee33d415761b.png)

Description and details about the main page go here...

## Question Page

![Question Page](![image](https://github.com/jaeyoung9083/Outsourcing_project/assets/69897998/eec77011-a871-4b81-a1ac-fcc1a46deb21)
)

Description and details about the question page go here...

---

## :partying_face: 주요 기능

### 메인페이지

#### Firestore에서 DB가져오기

- 회원가입 한 유저의 글 (Fid)을 가져오고, 이 피드정보를 하나의 리스트로 불러와서 보여줍니다.
- 현재 웹 페이지의 사이즈에 맞춰 피드의 사이즈가 조절이 됩니다.

### 회원 가입 페이지

- 신규 가입은 E-mail을 이용하여 회원 등록이 가능하게 구성하였습니다.
- E-mail과 비밀번호 입력시 하단의 Error Message를 통해 Validation Check를 하였습니다.
- 회원 로그인 & 로그아웃이 가능하며 상태 변경시 알림을 Alert 창으로 띄워줍니다.
- 상단의 Logo와 버튼을 통해 클릭하면 언제든 Home으로 돌아갈 수 있습니다.

### 게시글 작성 페이지

- 게시글 작성시 Category를 본인이 설정하여 원하는 이미지와 함께 게시글을 작성할 수 있습니다.
- 회원가입 시 설정한 Nick Name 과 Category가 피드에 함께 반영됩니다.

### 마이페이지

- 해당하는 회원이 작성한 글들만 정리해서 보여줍니다.
- Profile을 수정하여 저장할 수 있습니다.

### 상세 페이지

- Category 내부 탭에 분류된 각 반려동물의 특징 및 설명 - Animal 클릭시 해당 정보만 보여줍니다.
- 특징과 설명 아래에는 회원들이 작성한 해당 Category 관련 피드들을 순차적으로 볼 수 있습니다.

### 상세 피드 페이지

- 회원분들이 작성한 게시글을 볼 수 있으며 이는 해당 회원이 아니면 수정과 삭제가 불가합니다.
- 본인만 글을 삭제, 수정 가능하며 본인이 아니라면 버튼이 보이지 않습니다.
- 어디서든 Logo를 클릭하면 Home으로 돌아갈 수 있습니다.

## :sunglasses:주요 파일

#### - firebase.js: firebase 환경 변수 파일

#### - Posting.jsx: 글 작성 관련 페이지

#### - SignupPage.jsx: Firebase Authentication 회원 등록

#### - LoginPage.jsx: Firebase Authentication 로그인

#### - fids.js: Redux로 받아온 firestore db 제어

#### - DetailFeedPage.jsx: 피드 상세정보 페이지

#### - DetailPage.jsx: nav바 동물 메뉴 페이지

<br/><br/>

<br/><br/>

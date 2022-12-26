# 🐶 반려견 사진 공유 커뮤니티, Dogunity
<img width="1417" alt="Dogunity 대문" src="https://user-images.githubusercontent.com/85475577/209555392-856b3c40-2acc-4ff7-bcdb-8a13a472d5b8.png">

<br/>

## 📄 개요
- 서비스명: Dogunity
- 개발 기간: 2022. 12. 05 ~ 2022. 12. 15
- API 문서: [바로 가기](https://docs.google.com/spreadsheets/d/1XdrjOtKVlDG0ygvYMTHH1godDH44bpZUhKWLTbYaKog/edit?usp=sharing)
- ERD: [바로 가기](https://www.erdcloud.com/d/i9wvFZpTQMp2rWBPh)

<br/>

## 👫 팀 구성
- **Frontend** [김준호](https://github.com/FoxMon)    
- **Backend** [연다은봄](https://github.com/robinyeon)  

<br/>

## 🔎 주요 기능
### 1️⃣ 반려견 커뮤니티  
반려견과 관련된 다양한 커뮤니티를 생성하고 관련 게시물을 공유할 수 있는 서비스  
```
- 커뮤니티 
    - 커뮤니티 목록 불러오기 (pagination)
    - 커뮤니티 만들기
    - 커뮤니티 수정하기
    - 커뮤니티 삭제하기
    - 커뮤니티 좋아요, 좋아요 취소

- 커뮤니티 게시물
    - 커뮤니티 피드(게시물 목록) 불러오기 (pagination)
    - 게시물 한 개 정보 불러오기
    - 게시물 작성하기
    - 게시물 수정하기
    - 게시물 삭제하기
    - 게시물 좋아요, 좋아요 취소


- 커뮤니티 게시물 댓글
    - 댓글 불러오기
    - 댓글 작성
    - 댓글 삭제


- 이미지 처리 기능 구현
    - 커뮤니티 대문 사진 업로드 및 수정
    - 게시물 이미지 업로드 및 수정
```

### 2️⃣ 유저 서비스
```
- 로그인, 회원가입: Access token, Refresh token
```

### 3️⃣ 마이페이지
```
- 내가 만든 커뮤니티 모아보기
- 내가 작성한 게시물 모아보기
- 좋아요한 커뮤니티 모아보기
- 좋아요한 게시물 모아보기
- 유저 정보 수정
```

<br/>

## 🧩 BackEnd

```
Version
    node v16.13.2

Library
    express
    jsonwebtoken
    multer-s3
    aws-sdk
    mysql2
    sequelize
    
    
Github
https://github.com/orgs/Team08-DogNA/repositories
```

<br/>

## 🗂️ 백엔드 폴더 구조

- config

  - sequelize

- models

  - community.model
  - communityComment.model
  - communityPost.model
  - communityPostLike.model
  - user.model
  - userCommunity.model
  - refreshToken.model
  
- services

  - auth.service
  - community.service
  - post.service
  - user.service
  
- controllers

  - auth.ctrl
  - community.ctrl
  - post.ctrl
  - user.ctrl
  
- routes

  - auth.route
  - community.route
  - post.route
  - user.route

- middlewares
  
  - error
  - tokenVerification
  - uploadImage

- utils

  - ApiError
  - constants

<br/>


## 🏁 테스트 방법

1. 해당 프로젝트를 clone 합니다.

   ```
   git clone https://github.com/Dogunity/frontend.git
   git clone https://github.com/Dogunity/backend.git
   ```

2. 프로젝트 실행에 필요한 패키지를 설치합니다.

   ```
   cd front
   npm install

   cd back
   npm install
   ```

3. 프론트엔드와 백엔드를 실행합니다.

   ```
   cd front
   npm run dev

   cd back
   npm start
   ```

<br/>


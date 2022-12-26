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


# Project structure

### configs

- 패키지 설정 코드 작성
- `sequelize.js` : Sequelize <> DB(MySQL) 연결

### services

- 하나 이상의 model을 활용하여 로직 구현

### models

- DB 모델 작성

### controllers

- Router에 적용할 컨트롤러 작성

### routes

- Request, response 처리

### middlewares

- 커스텀 미들웨어 작성

### utils

- 재사용 코드 작성
- 환경 변수를 포함한 상수 정의

<br/>

# Common rules

## Code

- camelCase (MySQL 컬럼 포함)
- 주석처리 시 `//` 사용
- Model, Controller, Service, Router 작성 시 각 파일명은 하기와 같은 규칙 준수 (e.g. 커뮤니티 게시판)
  - e.g. community.**model.js**
  - e.g. community.**ctrl.js**
  - e.g. community.**service.js**
  - e.g. community.**route.js**

<br/>

## Git

### Commit convention

- 영문 기입
- e.g. `Feat: Draft rule.md`
- 메시지 컨벤션 하단 참고:

```
Feat 기능 구현 및 파일 생성
Fix 버그 및 에러 수정
```

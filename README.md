# BackEnd

DOGUNITY backend

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

## Project Start

**npm start**

## Directory

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

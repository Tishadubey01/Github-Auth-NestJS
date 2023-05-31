# Github Integration in NestJS

## Description

This is a simple NestJS application that integrates with Github's API. It allows anyone to authorise their Github account and view their repositories. The application allows user to create a repository, view their profile and list all their repositories. It also displays the number of repositories the user has.



## Prerequisites

- NodeJS
- NestJS
- Github Account

## Installation

```bash
$ npm install -g @nestjs/cli
```
### Dependencies 
```bash
$ npm install @nestjs/config
$ npm install passport @nestjs/passport passport-github
$ npm install passport-jwt
$ npm install @nestjs/jwt

## Running the app

```bash
# development
$ npm run start
```

## Test

```bash
# unit tests
$ npm run test
```
 
## API Documentation

1. Create a repository

```bash
POST `http://localhost:3000/auth/create-repo`
```
![image](https://i.imgur.com/AX8tVg5.png)

2. View user profile

```bash
GET `http://localhost:3000/profile`
```
![image](https://i.imgur.com/7IJ9r7c.png)
3. List all repositories

```bash
GET `http://localhost:3000/repositories`
```
![image](https://i.imgur.com/q2iYuxx.png)
4. Get repository count

```bash
GET `http://localhost:3000/repositories/count`
```
![image](https://i.imgur.com/5yaUJfs.png)

## Flow
The application uses the Github OAuth App flow to authenticate users. The application redirects the user to Github's login page where they are prompted to login and authorise the application. Once the user authorises the application, they are redirected back to the application where they can view their profile and repositories. The application uses the personal access token to make requests to the Github API.

## UI Overview
### Login Page:
![image](https://i.imgur.com/wa4zGfD.png)
- On clicking the `Login with Github` you will be redirected to GitHub authorization.
 ![image](https://i.imgur.com/XsPWCim.png)
- On successfull authorization, you will be redirected to homepage, where you have option to create repository, get profile information and view all the repositories the user has. 
 ![image](https://i.imgur.com/PdRPOyG.png)
- As we can the repository has been created from website, but is displayed on user's account.
![image](https://i.imgur.com/BKc8Rqh.png)







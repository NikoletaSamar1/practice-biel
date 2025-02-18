export interface User {
    "id": string,
    "email": string,
    "username": string,
    "fullName": string,
    "age": number,
    "role": Role
  }

  export type Role = "admin" | "user";

  export interface UserForRegistration {
    "username": string,
    "fullName": string,
    "email": string,
    "age": number,
    "password": string
  }


  export interface UserAuthResponse {
    accessToken: string;
    user: User;
  }


  export interface LoginUser {
    "email": string,
    "password": string
  }
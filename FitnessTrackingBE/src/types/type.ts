export interface UserSignUp {
    username: string;
    email: string;
    password: string;
}

export interface UserProfile {
    id:number,
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    bio: string,
    weight: number,
    height: number,
    avatar: string,
}

export interface Token {userId: number, username:string, email:string}
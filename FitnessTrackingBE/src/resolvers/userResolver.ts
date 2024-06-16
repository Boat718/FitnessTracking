import { prisma } from "../server";
import bcrypt from "bcrypt"
import { UserSignUp } from "../types/type";

export const getUser = () => {
    return  {
        id: 1233,
        username: "testuser",
        email: "testuser@gmail.com",
        password: "123",
    };
}

export const signUpUser = async (parent:any, args:any) => { 

    try {
        const user:UserSignUp = {...args.input};
        const email = await prisma.user.findFirst({
            where: {
                email: args.input.email
            }
        });
        if(email) {
            return {
                status: 400,
                message: "Email already exists"
            }
        }

        await prisma.user.create({
            data:{...user,
            password:  bcrypt.hashSync(user.password, 10)
            }})

        return {
            status: 200,
            message: "User created successfully"
        }
    } catch (error:any) {
        return {
            status: 500,
            message: error.message.toString(),
        }
    }
}

export const signInUser = async (parent:any, args:any) => {
    try {
        const {email, password} =  args;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        
        if(!user) {
            return {
                status: 400,
                message: "Email or Password is wrong!!"
            }
        }

        const chekPassword = bcrypt.compareSync(password, user.password);

        if (!chekPassword) {
            return {
                status: 400,
                message: "Email or Password is wrong!!"
            }
        }

        return {
            status: 200,
            message: "Login successfully"
        }

    } catch (error:any) {
        return {
            status: 500,
            message: JSON.parse(error.message),
        }
    }
}
import { prisma } from "../server";
import bcrypt from "bcrypt"

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
        const user = {...args.input};
        console.log(user)
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
            message: error.message
        }
    }
    
}
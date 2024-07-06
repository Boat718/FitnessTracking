import { prisma } from "../server";
import { Token, UserProfile, UserSignUp } from "../types/type";
import jwt from "jsonwebtoken"
import { Response, Request } from 'express';


export const getUserProfile = async (parent:any, args: any, context:any) => {

    try {
        const req:Request = context.req;
        const token:string = req.cookies.access_token;

        if (!token) {
            return {
                status: 403,
                message: "No access token"
            }
        } else {
            const data:Token = jwt.verify(token, process.env.SECRET_KEY as string) as Token;
            const userId = data.userId;

            const userProfileData = await prisma.userProfile.findFirst({
                where: {
                    userId: userId
                }
            })
            
            if(userProfileData) {
                return userProfileData;
            } else {
                return {
                    status: 404,
                    message: "User profile not found"
                }
            }
        }        
    } catch (error: any) {
        return {
            status: 500,
            message: error.message.toString(),
        }
    }

}

export const createAndUpdateUserProfile = async (parent:any, args: any, context:any) => {
    try {
        const req:Request = context.req;

        const token = req.cookies.access_token;

        if (!token) {
            return {
                status: 403,
                message: "No access token"
            }
        } else {
            const data:Token = jwt.verify(token, process.env.SECRET_KEY as string) as Token;
            const userId = data.userId;

            const userProfile:UserProfile = {...args.input};

            const checkUserId = await prisma.userProfile.findFirst({
                where:{
                    userId: userId
                }
            });

            if(checkUserId) {
                await prisma.userProfile.update({
                    where: {
                        userId: userId
                    },
                    data: userProfile})
                } else {
                await prisma.userProfile.create({
                    data: {...userProfile, userId: userId}
                })
            }

            return {
                status: 200,
                message: "Created successfully"
            }
        }
        
    } catch (error:any) {
        return {
            status: 500,
            message: error.message.toString(),
        }
    }

}
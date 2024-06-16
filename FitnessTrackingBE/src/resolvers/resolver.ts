import { getUser, signInUser, signUpUser } from "./userResolver";

export const resolver = {
    Query: {
        getUser
    },
    Mutation: {
        signUpUser,
        signInUser
    }
}
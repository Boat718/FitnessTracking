import { getUser, signUpUser } from "./userResolver";

export const resolver = {
    Query: {
        getUser
    },
    Mutation: {
        signUpUser
    }
}
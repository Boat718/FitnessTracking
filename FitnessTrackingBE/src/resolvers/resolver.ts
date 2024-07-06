import { createAndUpdateUserProfile, getUserProfile } from "./userProfileResolver";
import { getUser, signInUser, signUpUser } from "./userResolver";

export const resolver = {
    Query: {
        getUser,
        getUserProfile
    },
    Mutation: {
        signUpUser,
        signInUser,
        createAndUpdateUserProfile,
    }
}
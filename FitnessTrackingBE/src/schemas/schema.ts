export const typeDefs = `#graphql
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
    }

    type UserProfile {
        id: ID!,
        firstName: String!,
        lastName: String!,
        age: Int!,
        gender: String!,
        bio: String!,
        weight: Int,
        height: Int,
        avatar: String,
    }

    type Message {
        status: Int!,
        message: String!
    }

    input SignUpUserInput {
        username: String!,
        email: String!,
        password: String!
    }

    type Query {
        getUser: User
        getUserProfile: UserProfile
        user(id: ID!): User
        profile(id: ID!): UserProfile
    }

    input UpdateProfileInput {
        firstName: String
        lastName: String
        age: Int
        gender: String
        bio: String
        weight: Int
        height: Int
        avatar: String
    }

    type Mutation {
        signUpUser(input: SignUpUserInput!): Message!
        signInUser(email: String!, password: String!): Message!
        createAndUpdateUserProfile(input: UpdateProfileInput!): Message!
    }

`
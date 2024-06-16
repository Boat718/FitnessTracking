export const typeDefs = `#graphql
    type User {
        id: ID!,
        username: String!,
        email: String!,
        password: String!,
    }

    type Profile {
        id: ID!,
        firstName: String!,
        lastName: String!,
        age: Int!,
        gender: String!,
        bio: String!,
        weight: Int,
        height: Int,
        avatar: String!,
        user: User!
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
        user(id: ID!): User
        profile(id: ID!): Profile
    }

    type Mutation {
        signUpUser(input: SignUpUserInput!): Message!
        signInUser(email: String!, password: String!): Message!
    }

`
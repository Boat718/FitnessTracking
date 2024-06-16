import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from '@apollo/server/standalone';
import { PrismaClient } from "@prisma/client";
import { configDotenv } from "dotenv";
import { typeDefs } from "./schemas/schema";
import { resolver } from "./resolvers/resolver";

const PORT = process.env.PORT as string;

export const prisma = new PrismaClient({
    log:['query']
})

const server: ApolloServer = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolver
})

const { url } = await startStandaloneServer(server, {
    listen:{
        port:parseInt(PORT)
    }
})

console.log(`🚀 Server ready at port ${url}`)
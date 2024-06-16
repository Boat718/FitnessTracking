import { ApolloServer } from "@apollo/server"
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./schemas/schema";
import { resolver } from "./resolvers/resolver";
import { expressMiddleware } from '@apollo/server/express4';
import {Application, Request , Response} from 'express'
import express from "express";
import  cookie  from 'cookie';

const app: Application = express();
const PORT = process.env.PORT as string;

export const prisma = new PrismaClient({
    log:['query']
})

interface Context {
    token?: string;
  }

const server =  async () => {
    
    const apolloServer = new ApolloServer<Context>({
        typeDefs: typeDefs,
        resolvers: resolver,
    })
    await apolloServer.start();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use("/graphql", expressMiddleware(apolloServer, {
        context: async ({ req, res }) => ({req, res})
    }))

    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}/graphql `)
    })
}

server();

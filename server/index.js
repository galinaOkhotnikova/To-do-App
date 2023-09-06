import http from 'http';
import corsMiddleware from 'cors';
import bodyParserMiddleware from 'body-parser';

import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import { typeDefs, resolvers } from './schema.js';
import {port, host} from './config.js';

const { json } = bodyParserMiddleware;
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
    '/graphql',
    corsMiddleware(),
    json(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);


await new Promise((resolve) => httpServer.listen({ port: port }, resolve));

console.log(`🚀 Server ready at ${host}`);

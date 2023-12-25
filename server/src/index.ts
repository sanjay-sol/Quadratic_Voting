import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express, { Request, Response } from 'express';
import { connectDB } from './config/connection';
// import moment from 'moment';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema/eventSchema';
import eventResolvers from './graphql/resolvers/eventResolver'; 
import voterResolvers from './graphql/resolvers/voterResolver';
import createEventMutation from './graphql/mutations/EventMutation';
import updateVoteMutation from './graphql/mutations/updateVoteData';

dotenv.config();

const app = express();
const PORT: number = 4000;

const resolvers = {
  Query: {
    ...eventResolvers.Query,
    ...voterResolvers.Query,
  },
  Mutation: {
    createEvent: createEventMutation,
    updateVoteData: updateVoteMutation,
    ...eventResolvers.Mutation,
    ...voterResolvers.Mutation,
  },
};

const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      listen: { port: PORT },
    });
     console.log(`GraphQL server is running on port ${PORT}`);
    console.log(`GraphQL Playground: ${url}`);
  } catch (error) {
    console.error(error);
  }
};

startServer();

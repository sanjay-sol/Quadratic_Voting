import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { connectDB } from './config/connection';
// import moment from 'moment';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema/eventSchema';
import eventResolvers from './graphql/resolvers/eventResolver'; 
import voterResolvers from './graphql/resolvers/voterResolver';
import createEventMutation from './graphql/mutations/EventMutation';
import updateVoteMutation from './graphql/mutations/updateVoteData';

dotenv.config();

const PORT: number = 3000;

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
      listen: { port: 4000 },
    });
     console.log(` GraphQL is running on port ${4000}`);
  } catch (error) {
    console.error(error);
  }
};

startServer();

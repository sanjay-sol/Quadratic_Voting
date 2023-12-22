import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express, { Request, Response } from 'express';
import { connectDB } from './config/connection';
// import moment from 'moment';
import dotenv from 'dotenv';
import { typeDefs } from './graphql/schema/eventSchema';
import eventResolvers from './graphql/resolvers/eventResolver'; 
import createEventMutation from './graphql/mutations/EventMutation';
import updateVoteMutation from './graphql/mutations/updateVoteData';

dotenv.config();

const app = express();
const PORT: number = 3000;

const resolvers = {
  Query: {
    ...eventResolvers.Query,
  },
  Mutation: {
    createEvent: createEventMutation,
    updateVoteData: updateVoteMutation,
    ...eventResolvers.Mutation,
  },
};

const startServer = async () => {
  try {
    await connectDB();
    console.log('Connected to DB');

    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from Quadratic Voting!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });

    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log('GraphQL server is running on port 4000');
  } catch (error) {
    console.error(error);
  }
};

startServer();

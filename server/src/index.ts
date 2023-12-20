import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express, { Request, Response } from 'express';
import { connectDB } from './config/connection';
import userModel from './models/event.model';
import voterModel from './models/voter.model';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT: number = 3000;

// GraphQL type definitions
type Event = {
  id: string;
  secret_key: string;
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: Date;
  end_event_date: Date;
  created_at: Date;
  event_data: Record<string, any>;
};

const typeDefs = `
  type Event {
    id: String
    secret_key: String
    event_title: String
    event_description: String
    attestation_uid: String
    num_voters: Int
    credits_per_voter: Int
    start_event_date: String
    end_event_date: String
    created_at: String
    event_data: String
  }

  type Voter {
    id: String
    event_uuid: String
    voter_name: String
    vote_data: String
  }

  input EventInput {
    event_title: String
    event_description: String
    attestation_uid: String
    num_voters: Int
    credits_per_voter: Int
    start_event_date: String
    end_event_date: String
    created_at: String
    event_data: String
  }

  input VoterInput {
    event_uuid: String
    voter_name: String
    vote_data: String
  }

  type Query {
    events: [Event]
    voters: [Voter]
  }

  type Mutation {
    createEvent(event: EventInput): Event
    createVoter(voter: VoterInput): Voter
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    events: async () => {
      return await userModel.find();
    },
    voters: async () => {
      return await voterModel.find();
    },
  },
  Mutation: {
    createEvent: async (_:any, { event }: { event: Event }) => {
      try {
        const createdEvent = await userModel.create({
          ...event,
        });

        const voteData = event.event_data || {};
        const voters = Array.from({ length: event.num_voters }, (_, index) => {
          return {
            event_uuid: createdEvent.id,
            voter_name: `Voter ${index + 1}`,
            vote_data: JSON.stringify(voteData),
          };
        });

        await voterModel.insertMany(voters);

        return createdEvent;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create event');
      }
    },
  },
};

const startServer = async () => {
  try {
    // Connect to the database
    if (!process.env.MONGO_URI) {
      return console.error('Missing MONGO_URI!!');
    }
    await connectDB();
    console.log('Connected to DB');

    // Setup basic Express server
    app.get('/', (req: Request, res: Response) => {
      res.send('Hello from Quadratic Voting!');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on Port ${PORT}`);
    });

    // Start ApolloServer
    const server = new ApolloServer({ typeDefs, resolvers });
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log('GraphQL server is running on port 4000');
  } catch (error) {
    console.error(error.message);
  }
};

startServer();

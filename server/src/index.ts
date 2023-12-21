import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import express, { Request, Response } from 'express';
import { connectDB } from './config/connection';
import userModel from './models/event.model';
import voterModel from './models/voter.model';

import moment from 'moment'; 

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT: number = 3000;

type EventSubject = {
  title: string;
};

type EventInput = {
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: string;
  end_event_date: string;
  created_at: string;
  event_data: EventSubject[];
};

type VoterInput = {
  event_uuid: string;
  voter_name: string;
  vote_data: string;
};

type Event = {
  id: string;
  secret_key: string;
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: string;
  end_event_date: string;
  created_at: string;
  event_data: EventSubject[];
};

type Voter = {
  id: string;
  event_uuid: string;
  voter_name: string;
  vote_data: string;
};

// GraphQL Schema
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
    event_data: [EventSubject]
  }

  type EventSubject {
    title : String
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
    event_data: [EventSubjectInput]
  }

  input EventSubjectInput {
    title: String
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

// GraphQL Resolvers
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
    createEvent: async (_: any, { event }: { event: EventInput }) => {
      try {

        const createdEvent = await userModel.create({
          ...event,
        });

        const voters = Array.from({ length: event.num_voters }, (_, index) => {
          const vote_data = [];
          for (const subject of event.event_data) {
            vote_data.push({
              title: subject.title,
              votes: 0,
            });
          }
          return {
            event_uuid: createdEvent.id,
            voter_name: `Voter ${index + 1}`,
            vote_data: vote_data,
          };
        });

        await voterModel.insertMany(voters);

        return createdEvent;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create event');
      }
    },
    createVoter: async (_: any, { voter }: { voter: VoterInput }) => {
      try {
        return await voterModel.create({
          ...voter,
        });
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create voter');
      }
    },
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
    console.error(error.message);
  }
};


startServer();

import {  Document } from 'mongoose';

interface IVoter extends Document {
  id: string;
  event_uuid: string;
  voter_name: string;
  vote_data: Record<string, any>;
}
type VoterInput = {
  event_uuid: String;
  voter_name: String;
  vote_data: number[];
};
type Project = {
    title: string;
    votes: number;
};

type ProjectVotes = Record<string, number>;

type TotalVotes = Record<string, number>;

type QuadraticVotes = Record<string, number>;

type MatchingPoolFactors = Record<string, number>;

export { VoterInput , IVoter , Project , ProjectVotes , TotalVotes , QuadraticVotes , MatchingPoolFactors };

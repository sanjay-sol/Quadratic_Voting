import mongoose, { Schema, Document, Types } from 'mongoose';

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

export { VoterInput , IVoter };

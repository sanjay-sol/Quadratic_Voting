import { VoterInput as VoterInputType } from '../types/voterTypes';

export type Voter = {
  id: String;
  event_uuid: String;
  voter_name: String;
  vote_data: String;
};

export type VoterInput = VoterInputType;

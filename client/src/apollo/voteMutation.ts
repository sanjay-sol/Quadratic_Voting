import { gql } from '@apollo/client';

export const UPDATE_VOTE_MUTATION = gql`
  mutation UpdateVoteData($updateVoteDataId: ID!, $name: String, $votes: [Int]) {
    updateVoteData(id: $updateVoteDataId, name: $name, votes: $votes) {
      id
      event_uuid
      voter_name
      vote_data {
        title
        votes
      }
    }
  }
`;

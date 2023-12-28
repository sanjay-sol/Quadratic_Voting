import { gql } from '@apollo/client';

export const GET_VOTER_QUERY = gql`
 query ExampleQuery($getVoterId: ID!) {
  getVoter(id: $getVoterId) {
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


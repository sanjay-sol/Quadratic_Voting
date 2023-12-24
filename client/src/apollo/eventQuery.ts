// queries.js
import { gql } from '@apollo/client';

export const GET_VOTERS_QUERY = gql`
  query GetVotersByEventId($getVotersByEventIdId: ID!, $secretKey: String!) {
    getVotersByEventId(id: $getVotersByEventIdId, secret_key: $secretKey) {
      id
      voter_name
      vote_data {
        title
        votes
      }
    }
  }
`;

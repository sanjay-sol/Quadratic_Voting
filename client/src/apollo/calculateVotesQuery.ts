import { gql } from '@apollo/client';

export const CALUCULATE_VOTES_QUERY = gql`
  query CalculateVotes($eventUuid: String!) {
  calculateVotes(eventUuid: $eventUuid) {
    title
    QvRatio
    totalVotes
  }
}
`;


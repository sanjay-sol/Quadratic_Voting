import { gql } from '@apollo/client';

export const GET_EVENT_QUERY = gql`
  query ExampleQuery($getEventId: ID!) {
    getEvent(id: $getEventId) {
      id
      secret_key
      event_title
      event_description
      attestation_uid
      num_voters
      credits_per_voter
      start_event_date
      end_event_date
      created_at
      event_data {
        title
      }
    }
  }
`;


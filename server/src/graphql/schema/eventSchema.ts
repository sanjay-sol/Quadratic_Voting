export const typeDefs = `
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
  
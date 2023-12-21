export type EventSubject = {
  title: String;
};

export type EventSubjectInput = {
  title: String;
};

export type EventInput = {
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

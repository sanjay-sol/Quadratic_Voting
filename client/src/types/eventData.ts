interface Project {
  title: string;
}

export interface EventData {
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: string;
  end_event_date: string;
  created_at: string;
  event_data: Project[];
}
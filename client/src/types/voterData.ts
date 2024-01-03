
export type VoteData = {
    title: string;
    votes: number;
}

export type GetVoter = {
    event_uuid: string;
    id: string;
    vote_data: VoteData[];
    voter_name: string;
}

export type eventData = {
    title: string;
}

"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GET_VOTERS_QUERY } from '../../apollo/eventQuery';
import { GET_EVENT_QUERY } from '../../apollo/getEventQuery';
import { useQuery } from '@apollo/client';

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const secret_key = searchParams.get('secret_key');

  const { loading: voterLoading, error: voterError, data: voterData } = useQuery(GET_VOTERS_QUERY, {
    variables: { getVotersByEventIdId: id, secretKey: secret_key },
  });

  const { loading: eventLoading, error: eventError, data: eventData } = useQuery(GET_EVENT_QUERY, {
    variables: { getEventId: id },
  });

  const [voters, setVoters] = useState([]);

  useEffect(() => {
    if (!voterLoading && !voterError && voterData) {
      setVoters(voterData.getVotersByEventId);
    }
  }, [voterLoading, voterError, voterData]);

  return (
    <div>
      {eventLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>|{eventData?.getEvent?.event_title}</h1>
          <p>{eventData?.getEvent?.event_description}</p>
          {voters.map((voter: any) => (
            <div key={voter.id}>
              <p>{`http://localhost:3000/vote?eventId=${id}&voterId=${voter.id}`}</p>
              {/* Uncomment the following lines when you have data to display */}
              {/* <h2>Voter: {voter.voter_name}</h2>
              <ul>
                {voter.vote_data.map((vote: any) => (
                  <li key={vote.title}>
                    {vote.title}: {vote.votes} votes
                  </li>
                ))}
              </ul> */}
              {/* <a href={generateVoteUrl(voter.id)} target="_blank" rel="noopener noreferrer">
                Vote Now
              </a> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GET_VOTERS_QUERY } from '../../apollo/eventQuery'
import { useQuery } from '@apollo/client';
const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const secret_key = searchParams.get('secret_key');
 const { loading, error, data } = useQuery(GET_VOTERS_QUERY, {
    variables: { getVotersByEventIdId: id, secretKey: secret_key },
  });

  const [voters, setVoters] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setVoters(data.getVotersByEventId);
    }
  }, [loading, error, data]);

  const generateVoteUrl = (voterId:any) => {
    // Assuming your voting page is named 'vote' and takes the voterId as a query parameter
    return `/vote?voterId=${voterId}`;
  };

  return (
    <div>
      <h1>Event ID: {id}</h1>
      <label>Secret Key: {secret_key}</label>

      {voters.map((voter:any) => (
          <div key={voter.id}>
              <p>http://localhost:3000/vote?eventId={id}&voterId={voter.id }</p>
          {/* <h2>Voter: {voter.voter_name}</h2>
          <ul>
            {voter.vote_data.map((vote:any) => (
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
  );
};

export default Page;

"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT_QUERY } from '../apollo/getEventQuery';
import { UPDATE_VOTE_MUTATION } from '../apollo/voteMutation';
import { GET_VOTER_QUERY } from '../apollo/getVoter';
import { useRouter } from 'next/navigation';
import ErrorPage from './ErrorPage';


const VoteForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const voterId = searchParams.get('voterId');

  const { loading: voterLoading, error: voterError, data: voterData } = useQuery(GET_VOTER_QUERY, {
    variables: { getVoterId: voterId },
  });
  const [votes, setVotes] = useState<number[]>([]);
  const [name, setName] = useState<string>('');
  const [loading , setLoading] = useState<boolean>(false);

  const [updateVoteData] = useMutation(UPDATE_VOTE_MUTATION, {
     refetchQueries: [
      { query: GET_VOTER_QUERY, variables: { getVoterId: voterId } },
    ],
  });

  useEffect(() => {
    if (!voterLoading && voterData && voterData.getVoter) {
      const initialVotes = voterData.getVoter.vote_data.map((vote: any) => vote.votes) || Array(voterData.getVoter.vote_data.length).fill(0);
      setVotes(initialVotes);
      setName(voterData.getVoter.voter_name || '');
    }
  }, [voterLoading, voterData?.getVoter, voterData]);

    const { loading: eventLoading, error: eventError, data: eventData } = useQuery(GET_EVENT_QUERY, {
    variables: { getEventId: voterData?.getVoter?.event_uuid },
  });

  const handleVoteChange = (index: any, value: any) => {
    const updatedVotes = [...votes];
    updatedVotes[index] = value;
    setVotes(updatedVotes);
  };

  const handleVoteSubmit = async () => {
    try {
      setLoading(true);
      const checkForNullvotes = votes.map(item => (item === null ? 0 : item));
      const { data } = await updateVoteData({
        variables: {
          updateVoteDataId: voterId,
          name: name,
          votes: checkForNullvotes,
        },
      });
      router.push(`/success?eventId=${voterData?.getVoter?.event_uuid}&voterId=${voterId}`);
      setLoading(false);
    } catch (error: any) {
      alert('Error updating vote data');
      setLoading(false);
      console.error('Error updating vote data:', error.message);
    }
  };
  if (!voterData?.getVoter || voterError) {
    return <ErrorPage message="No Voter Exists with that ID" />;
  }

  return (
  <div className="flex flex-col justify-center items-center">
    {(eventLoading || voterLoading) ? (
      <p>Fetching Vote Data...</p>
    ) : (
          <>
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500 to-pink-500">
        <h1 className='text-4xl font-extrabold text-zinc-300'>{eventData?.getEvent?.event_title}</h1>
        <p>{eventData?.getEvent?.event_description}</p>
        <input
          className='text-black w-52 p-2 m-4 rounded-md'
          placeholder='Enter Your Name'
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <form className="max-w-md min-h-full mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
          {eventData?.getEvent?.event_data?.map((event: any, index: number) => (
            <div key={index} className='flex flex-row gap-2 m-2 p-3 justify-center items-center'>
              <label className="block mb-2 text-gray-900 font-medium" key={index}>
                {event.title}
                <br />
                <input
                  className="w-auto p-2 mt-1 rounded-md"
                  type="number"
                  value={votes[index]}
                  onChange={(e) => handleVoteChange(index, parseInt(e.target.value, 10))}
                />
              </label>
            </div>
          ))}
          {name ? (
            loading ? (
              <button className='bg-purple-600 text-white font-bold p-3 rounded-md w-full cursor-not-allowed' type="button" disabled>
                Updating...
              </button>
            ) : (
              <button className='bg-purple-600 text-white font-bold p-3 rounded-md w-full' type="button" onClick={handleVoteSubmit}>
                Submit Votes
              </button>
            )
          ) : (
            <button className='bg-purple-600 text-white font-bold p-3 rounded-md w-full cursor-not-allowed' type="button" disabled>
              Enter Name
            </button>
          )}
              </form>
          </div>
      </>
    )}
  </div>
);

};

export default VoteForm;

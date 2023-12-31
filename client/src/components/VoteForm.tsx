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
    updatedVotes[index] =  value;
    console.log(updatedVotes);
    setVotes(updatedVotes);
  };

  const handleVoteSubmit = async () => {
    try {
      setLoading(true);
      const checkForNullVotes = votes.map((item) => isNaN(item) ? 0 : Math.abs(item));
      const { data } = await updateVoteData({
        variables: {
          updateVoteDataId: voterId,
          name: name,
          votes: checkForNullVotes,
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
  if (eventLoading || voterLoading) {
    return (
      <div className="flex flex-col justify-center h-screen items-center ">
        <p>Fetching Vote Data..</p>
      </div>
    );
  }
  if (!voterData?.getVoter || voterError) {
    return <ErrorPage message="No Voter Exists with that ID" />;
  }
  

  return (
  <div className="flex flex-col justify-center items-center ">
    {(eventLoading || voterLoading) ? (
      <p>Fetching Vote Data...</p>
    ) : (
          <>
          <div className='flex flex-col justify-center items-center border-2 m-2 border-white w-full max-w-4xl'>
          <h1 className='p-2 text-3xl font-semibold mb-2'>{eventData?.getEvent?.event_title}</h1>
          <p className='p-2 text-lg font-light'>{eventData?.getEvent?.event_description}</p>
        </div>
        <input
          className='text-black w-52 p-2 m-4 rounded-md'
          placeholder='Enter Your Name'
          type="text"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        />
        <form className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
          {eventData?.getEvent?.event_data?.map((event: any, index: number) => (
            <div key={index} className='flex flex-row gap-2  m-2 p-3 justify-center items-center'>
              <label className="block mb-2 text-gray-900 font-medium" key={index}>
                {event.title}
                <br />
                <input
                  className="min-w-96 p-3 mt-1 rounded-md"
                  type="number"
                  value={isNaN(votes[index]) ? 0 : votes[index] }
                  onChange={(e) => handleVoteChange(index, parseInt(e.target.value,10))}
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
      </>
    )}
  </div>
);

};

export default VoteForm;

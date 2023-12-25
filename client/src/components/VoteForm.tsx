"use client";
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT_QUERY } from '../apollo/getEventQuery';
import { UPDATE_VOTE_MUTATION } from '../apollo/voteMutation';

const VoteForm: React.FC = () => {
   const searchParams = useSearchParams();
    const eventId = searchParams.get('eventId');
  const voterId = searchParams.get('voterId');
  const { loading: eventLoading, error: eventError, data: eventData } = useQuery(GET_EVENT_QUERY, {
    variables: { getEventId: eventId },
  });

    const [votes, setVotes] = useState<any>([]);
    const [name, setName] = useState<string>('');

  const [updateVoteData] = useMutation(UPDATE_VOTE_MUTATION);

  useEffect(() => {
    if (!eventLoading && eventData && eventData.getEvent) {
      // Initialize votes array with zeros
      const initialVotes = Array(eventData.getEvent.event_data.length).fill(0);
      setVotes(initialVotes);
    }
  }, [eventData, eventLoading]);

  const handleVoteChange = (index:any, value:any) => {
    const updatedVotes = [...votes];
    updatedVotes[index] = value;
    setVotes(updatedVotes);
  };

  const handleVoteSubmit = async () => {
    try {
      const { data } = await updateVoteData({
        variables: {
          updateVoteDataId: voterId,
          name: name, 
          votes: votes,
        },
      });

      console.log('Vote data updated:', data.updateVoteData);
    } catch (error:any) {
      console.error('Error updating vote data:', error.message);
    }
  };

  if (eventLoading) return <p>Loading...</p>;
    if (eventError) return <p>Error loading event data</p>;

    const  {getEvent}  = eventData;


  return (
    <div className='flex flex-col'>
      <h1>{getEvent?.event_title}</h1>
      <p>{getEvent?.event_description}</p>
     <input className='text-black w-52 p-2 m-4' type="text" value={name} onChange={(e:any)=> setName(e.target.value)} />
      <form className='flex flex-col justify-center items-center'>
        {getEvent?.event_data?.map((event:any, index:any) => (
            <div key={index} className='flex flex-row gap-2 m-2 p-3 justify-center items-center'>
               
            <label>
                    {event.title} Votes:
                    
                    <input
                        className='text-black p-3 m-2 rounded-md'
                type="number"
                value={votes[index]}
                onChange={(e) => handleVoteChange(index, parseInt(e.target.value, 10))}
              />
            </label>
          </div>
        ))}
              {name ?
                  <button className='bg-red-200 text-black font-bold p-3 rounded-md w-36' type="button" onClick={handleVoteSubmit}>
                      Submit Votes
                  </button>
                  : <button className='bg-red-200 text-black font-bold p-3 rounded-md w-36' type="button" disabled>
                      Enter Name
                  </button> }
      </form>
    </div>
  );
};

export default VoteForm;

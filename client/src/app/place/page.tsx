"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_VOTER_QUERY } from '../../apollo/getVoter';

const Page: React.FC = () => {
  const [voterId, setVoterId] = useState<string>("");
  const router = useRouter();

  const { loading, error, data } = useQuery(GET_VOTER_QUERY, {
    variables: { getVoterId: voterId },
    skip: voterId === "", 
  });

  const handleRedirect = async () => {
    if (voterId === null || voterId === undefined || voterId === "") {
      alert("Please enter a Voter ID!!!");
      return;
    }

    try { 
      const voterExists = data && data.getVoter;
      console.log("voterExists", data)
      if (!voterExists) {
        alert("Voter does not exist");
      } else {
        router.push(`/vote?voterId=${voterId}`);
      }
    } catch (err) {
      console.error("Error while checking voter:", err);
      
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
      <input className='text-black p-3 rounded-md' placeholder='658d03aaaf9b8ab1e10f33f4' type="text" value={voterId} onChange={(e) => setVoterId(e.target.value)} />
      <button className='bg-green-600 p-3 m-3 rounded-md' onClick={handleRedirect}>Submit</button>
    </div>
  );
};

export default Page;

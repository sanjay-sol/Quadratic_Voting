"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { GET_VOTERS_QUERY } from '../../apollo/eventQuery';
import { GET_EVENT_QUERY } from '../../apollo/getEventQuery';
import { useQuery } from '@apollo/client';
import ErrorPage from '../error/page';

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
  const [copiedLinks, setCopiedLinks] = useState<any>([]);

  useEffect(() => {
    if (!voterLoading && !voterError && voterData) {
      setVoters(voterData.getVotersByEventId);
    }
  }, [voterLoading, voterError, voterData]);

  const copyToClipboard = (text: any, index: any) => {
    navigator.clipboard.writeText(text);
    setCopiedLinks((prevCopiedLinks: any) => [...prevCopiedLinks, index]);
  };

  const downloadLinks = () => {
    const linksText = voters.map((voter: any) => `${process.env.NEXT_PUBLIC_CLIENT_API}/vote?voterId=${voter.id}`).join('\n');
    const blob = new Blob([linksText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'voter_links.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  if ((voterLoading && voterData?.getVotersByEventId.length == 0) || eventLoading) {
    return <p>Loading...</p>;
  }

  if (voterError || eventError) {
    return <ErrorPage message="Error fetching data" />;
  }

  if (voterData?.getVotersByEventId?.length == 0) {
    return <ErrorPage message="No Event Exists with that Pair of ID and secretKey" />;
  }
 return (
  <div className="flex items-center justify-center min-h-screen">
    {eventLoading ? (
      <p>Loading...</p>
    ) : (
      <div className='flex flex-col items-center p-4'>
        <h1 className='text-4xl font-bold mb-4'>Event Details</h1>
        <div className='flex flex-col justify-center items-center border-2 m-2 border-white w-full max-w-4xl'>
          <h1 className='p-2 text-3xl font-semibold mb-2'>{eventData?.getEvent?.event_title}</h1>
          <p className='p-2 text-lg font-light'>{eventData?.getEvent?.event_description}</p>
        </div>
        <div className='flex flex-col justify-center items-center border-2 border-white w-full max-w-4xl mt-4'>
          <h1 className='font-bold text-2xl mb-2 p-2'>Results Dashboard</h1>
          <p className='p-2 text-base'>{`${process.env.NEXT_PUBLIC_CLIENT_API}/results?eventId=${id}`}</p>
        </div>
        <div className='flex flex-col justify-center items-center border-2 m-2 border-white w-full max-w-4xl mt-4'>
          <h1 className='font-bold text-2xl mb-2 p-2'>Private Admin Dashboard</h1>
          <p className='p-2 text-base'>{`${process.env.NEXT_PUBLIC_CLIENT_API}/event?id=${id}&secret_key=${secret_key}`}</p>
        </div>
        <div className='flex flex-col justify-center items-center border-2 p-3 border-white w-full max-w-4xl mt-4'>
          <h1 className='font-bold text-2xl mb-2'>Voter Links</h1>
          <div className='w-full bg-gray-800 h-64 rounded-md m-3 overflow-y-scroll'>
            {voters.map((voter: any, index) => (
              <div className='flex justify-center scrollbar-hide items-baseline p-2 m-3' key={voter.id}>
                <p className='text-base'>{`${process.env.NEXT_PUBLIC_CLIENT_API}/vote?voterId=${voter.id}`}</p>
                <button className='bg-gray-500 pl-1 pr-2 ml-2 rounded-md' onClick={() => copyToClipboard(`http://localhost:3000/vote?voterId=${voter.id}`,index)}>
                  {copiedLinks.includes(index) ? <span className='text-sm'>Copied</span> : <span className='text-sm'>Copy Link</span>}
                </button>
              </div>
            ))}
          </div>
          <button className='bg-blue-500 p-3 m-3 rounded-md' onClick={downloadLinks}>
            Download Voter Links
          </button>
        </div>
        <p className='mt-4 text-lg'>Results display here!!!!!!!!!</p>
      </div>
    )}
  </div>
);


};

export default Page;

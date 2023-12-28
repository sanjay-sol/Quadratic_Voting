"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useRouter } from 'next/navigation';
const Page = () => {
     const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const voterId = searchParams.get('voterId');

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/vote?eventId=${eventId}&voterId=${voterId}`);
  };
  const handleRedirect2 = () => {
    router.push(`/results?eventId=${eventId}`);
  };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <button className='bg-red-400 p-3 m-4 rounded-md' onClick={handleRedirect}>Update Votes</button>
                <br />
                <button className='bg-red-400 p-3 m-4 rounded-md' onClick={handleRedirect2}>View Results</button>
        </div>
        </main>
    );
};

export default Page;

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
        <main className="flex flex-col items-center justify-start h-screen  bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-white text-center">
        <h1 className="text-4xl pt-10 font-bold mb-4">
          Your Votes are in !!
        </h1>
        <p className="text-2xl text-slate-200 ">
          You have successfully placed your votes
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 lg:gap-8 xl:gap-12">
        <button className='bg-purple-700 font-semibold p-4 m-4 rounded-md' onClick={handleRedirect}>Update Votes</button>
        <button className='bg-pink-700 font-semibold p-4 m-4 rounded-md' onClick={handleRedirect2}>View Results</button>
      </div>
    </main>
    );
};

export default Page;

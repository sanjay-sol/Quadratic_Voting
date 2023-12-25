"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
const Page = () => {
     const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');
  const voterId = searchParams.get('voterId');

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-5xl font-bold text-gray-800">Success</h1>
                <p className="text-2xl font-bold text-gray-800">
                    Event Id: {eventId}
                </p>
                <p className="text-2xl font-bold text-gray-800">
                    Voter Id: {voterId}
                </p>

        </div>
        </main>
    );
};

export default Page;

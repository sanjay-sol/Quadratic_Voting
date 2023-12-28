"use client";
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useRouter } from 'next/navigation';
const Page = () => {
     const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/results?eventId=${eventId}`);
  };
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-5xl font-bold text-gray-800">Results Page is Here</h1>
                 <p className="text-2xl font-bold text-gray-800">
                    Event Id: {eventId}
                </p>
        </div>
        </main>
    );
};

export default Page;

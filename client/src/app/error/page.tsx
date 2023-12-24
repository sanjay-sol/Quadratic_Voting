"use client";
import EventForm from '../../components/EventForm';
import React from 'react';
import Error from '../../components/Error';
const Page = () => {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            <Error message="Error in creating the Event!!" />
        </div>
        </main>
    );
};

export default Page;

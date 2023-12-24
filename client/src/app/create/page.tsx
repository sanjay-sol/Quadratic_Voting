"use client";
import EventForm from '../../components/EventForm';
import React from 'react';

const Page = () => {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
            <h1>Create Event</h1>
            <EventForm />
        </div>
        </main>
    );
};

export default Page;

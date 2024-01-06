"use client";
import EventForm from '../../components/EventForm';
import React from 'react';

const Page = () => {

    return (
      <div className="flex flex-col justify-center  p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
        <EventForm />
      </div>
    );
};

export default Page;

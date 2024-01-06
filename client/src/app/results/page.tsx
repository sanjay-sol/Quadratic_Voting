"use client";
import React from "react";
import Results from "@/components/Results";
import { useSearchParams } from "next/navigation";

const Page = () => {
    const searchParams = useSearchParams();
    const eventId = searchParams.get("eventId");
  
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between p-24">
      <div>
        <h1 className="text-5xl font-bold text-gray-800">
          Results Page is Here
        </h1>
        <Results eventId={eventId} />
      </div>
    </main>
  );
};

export default Page;

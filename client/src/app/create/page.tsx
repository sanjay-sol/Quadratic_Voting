"use client";
import EventForm from "../../components/EventForm";
import React from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const isAttest = searchParams.get("isAttest");

  const parsedIsAttest: boolean | null =
    isAttest === "true" ? true : isAttest === "false" ? false : null;

  const isAttestProp: boolean | null =
    parsedIsAttest !== null ? parsedIsAttest : false;

  return (
    <div className="flex flex-col justify-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
      <EventForm isAttest={isAttestProp} />
    </div>
  );
};

export default Page;

"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GET_VOTERS_QUERY } from "../../apollo/eventQuery";
import { GET_EVENT_QUERY } from "../../apollo/getEventQuery";
import { useQuery } from "@apollo/client";
import ErrorPage from "../error/page";
import Results from "@/components/Results";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const secret_key = searchParams.get("secret_key");

  const {
    loading: voterLoading,
    error: voterError,
    data: voterData,
  } = useQuery(GET_VOTERS_QUERY, {
    variables: { getVotersByEventIdId: id, secretKey: secret_key },
  });

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useQuery(GET_EVENT_QUERY, {
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
    const linksText = voters
      .map(
        (voter: any) =>
          `${process.env.NEXT_PUBLIC_CLIENT_API}/vote?voterId=${voter.id}`
      )
      .join("\n");
    const blob = new Blob([linksText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "voter_links.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  if (
    (voterLoading && voterData?.getVotersByEventId.length == 0) ||
    eventLoading
  ) {
    return (
      <div className="flex flex-col justify-center h-screen items-center">
        <p>Fetching Data...</p>
      </div>
    );
  }

  if (voterError || eventError) {
    return <ErrorPage message="Error fetching data" />;
  }

  if (voterData?.getVotersByEventId?.length == 0) {
    return (
      <ErrorPage message="No Event Exists with that Pair of ID and secretKey" />
    );
  }
  console.log("voter"+voters)
  return (
    <div className="flex items-center justify-center min-h-screen">
      {eventLoading ? (
        <div className="flex flex-col justify-center h-screen items-center">
          <p>Fetching Data...</p>
        </div>
      ) : (
        <div className="flex flex-col w-screen justify-center items-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <h1 className="text-4xl font-bold mb-4 text-fuchsia-950">
            Event Details
          </h1>
          <div className="flex flex-col justify-center items-center border-2 m-2 border-white w-full max-w-4xl">
            <h1 className="p-2 text-3xl font-semibold mb-2 text-green-400">
              {eventData?.getEvent?.event_title}
            </h1>
            <p className="p-2 text-lg font-light">
              {eventData?.getEvent?.event_description}
            </p>
          </div>
          <div className="flex flex-col justify-center  border-2 border-white w-full max-w-4xl mt-4">
            <h1 className="font-bold text-2xl mb-2 p-2 text-purple-950">
              RESULTS DASHBOARD
              <p className="mt-2 font-semibold text-lg text-slate-800">
                Statistics dashboard URL
              </p>
            </h1>
            <div className="flex flex-col justify-center items-center">
              <p className="p-2 text-base">{`${process.env.NEXT_PUBLIC_CLIENT_API}/results?eventId=${id}`}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center border-2 m-2 border-white w-full max-w-4xl mt-4">
            <h1 className="font-bold text-2xl mb-2 p-2 text-purple-950">
              PRIVATE ADMIN DASHBOARD
              <p className="mt-2 font-semibold text-lg text-slate-800">
                Save this URL to manage event and make changes
              </p>
            </h1>
            <div className="flex flex-col justify-center items-center">
              <p className="mb-1 text-base">{`${process.env.NEXT_PUBLIC_CLIENT_API}/event?id=${id}&secret_key=${secret_key}`}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center  border-2 p-3 border-white w-full max-w-4xl mt-4">
            <h1 className="font-bold text-2xl mb-2 text-purple-950">
              VOTER LINKS
              <p className="mt-2 font-semibold text-lg text-slate-800">
                Share privately with the voters to vote
              </p>
            </h1>
            <div className=" flex flex-col justify-center items-center border-2 h-auto max-h-full rounded-md m-3 ">
              {voters.map((voter: any, index) => (
                <div
                  className="flex justify-center scrollbar-hide items-baseline p-2 m-1"
                  key={voter.id}
                >
                  <p className="text-base">{`${process.env.NEXT_PUBLIC_CLIENT_API}/vote?voterId=${voter.id}`}</p>
                  <button
                    className="bg-gradient-to-r from-purple-700 to-pink-700 pl-2 pt-1 pb-1 pr-2 ml-2 rounded-md"
                    onClick={() =>
                      copyToClipboard(
                        `${process.env.NEXT_PUBLIC_CLIENT_API}/vote?voterId=${voter.id}`,
                        index
                      )
                    }
                  >
                    {copiedLinks.includes(index) ? (
                      <span className="text-sm">Copied</span>
                    ) : (
                      <span className="text-sm">Copy Link</span>
                    )}
                  </button>
                </div>
              ))}
            </div>
            <button
              className="bg-blue-500 p-3 m-3 rounded-md"
              onClick={downloadLinks}
            >
              Download Voter Links
            </button>
          </div>
          <div className="w-2/4">
            <Results eventId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;

"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_EVENT_QUERY } from "../../apollo/getEventQuery";
import { UPDATE_VOTE_MUTATION } from "../../apollo/voteMutation";
import { GET_VOTER_QUERY } from "../../apollo/getVoter";
import { useRouter } from "next/navigation";
import ErrorPage from "../../components/ErrorPage";

const Page: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const voterId = searchParams.get("voterId");

  const {
    loading: voterLoading,
    error: voterError,
    data: voterData,
  } = useQuery(GET_VOTER_QUERY, {
    variables: { getVoterId: voterId },
  });

  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useQuery(GET_EVENT_QUERY, {
    variables: { getEventId: voterData?.getVoter?.event_uuid },
  });

  const [votes, setVotes] = useState<number[]>([]);
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [credits, setCredits] = useState<number>(0);

  const [updateVoteData] = useMutation(UPDATE_VOTE_MUTATION, {
    refetchQueries: [
      { query: GET_VOTER_QUERY, variables: { getVoterId: voterId } },
    ],
  });

     
  
  const calculateVotes = async (rData: any) => {
    const votesArr = await rData?.vote_data?.map((item: any, _: any) => item.votes);
    const votesArrMultiple = await  votesArr.map((item: any, _: any) => item * item);
    setVotes(votesArr);

    console.log("votesArrMultiple", votesArrMultiple);  
    setCredits(
      eventData?.getEvent?.credits_per_voter -
        votesArrMultiple.reduce((a: any, b: any) => a + b, 0)
    );
  };


  useEffect(() => {
    // const fetchData = async () => {
      if (!eventLoading && eventData && eventData.getEvent) {
        setCredits(eventData.getEvent.credits_per_voter);
      }
    // }
    // fetchData();
  }, [eventLoading, eventData?.getEvent, eventData]);

  useEffect(() => {
  const fetchData = async () => {
    if (!voterLoading && voterData && voterData.getVoter) {
      const initialVotes =
        voterData.getVoter.vote_data.map((vote: any) => vote.votes) ||
        Array(voterData.getVoter.vote_data.length).fill(0);
      setVotes(initialVotes);
      setName(voterData.getVoter.voter_name || "");
      console.log(voterData?.getVoter);
      await calculateVotes(voterData?.getVoter); 
    }
  };

  fetchData();
}, [voterLoading, voterData?.getVoter, voterData]);



  useEffect(() => {
    console.log("voterData", voterData)
  },[voterData])

  const makeVote = (index: number, isIncrement: boolean) => {
    const tempArr = votes;
    isIncrement
      ? (tempArr[index] = tempArr[index] + 1)
      : (tempArr[index] = tempArr[index] - 1);

    setVotes(tempArr);

    const sumVotes = tempArr
      .map((num, _) => num * num)
      .reduce((a, b) => a + b, 0);
    setCredits(eventData?.getEvent?.credits_per_voter - sumVotes);
  };
  const calculateShow = (current: number, increment: boolean) => {
    const change = increment ? 1 : -1;
    const canOccur =
      Math.abs(Math.pow(current, 2) - Math.pow(current + change, 2)) <= credits;
    if (current === 0 && credits === 0) {
      return false;
    }

    if (increment) {
      return current <= 0 ? true : canOccur;
    } else {
      return current >= 0 ? true : canOccur;
    }
  };

  const handleVoteSubmit = async () => {
    try {
      setLoading(true);
      const checkForNullVotes = votes.map((item) =>
        isNaN(item) ? 0 : Math.abs(item)
      );
      const { data } = await updateVoteData({
        variables: {
          updateVoteDataId: voterId,
          name: name,
          votes: checkForNullVotes,
        },
      });
      router.push(
        `/success?eventId=${voterData?.getVoter?.event_uuid}&voterId=${voterId}`
      );
      setLoading(false);
    } catch (error: any) {
      alert("Error updating vote data");
      setLoading(false);
      console.error("Error updating vote data:", error.message);
    }
  };

  if (eventLoading || voterLoading) {
    return (
      <div className="flex flex-col justify-center h-screen items-center">
        <p>Fetching Vote Data...</p>
      </div>
    );
  }
  if (!voterData?.getVoter || voterError) {
    return <ErrorPage message="No Voter Exists with that ID!!" />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {eventLoading || voterLoading ? (
        <p>Fetching Vote Data...</p>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center border-2 m-2 border-white w-full max-w-4xl">
            <h1 className="p-2 text-3xl font-semibold mb-2">
              {eventData?.getEvent?.event_title}
            </h1>
            <p className="p-2 text-lg font-light">
              {eventData?.getEvent?.event_description}
            </p>
          </div>
          <input
            className="text-black w-52 p-2 m-4 rounded-md"
            placeholder="Enter Your Name"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
          <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
            {/* {eventData?.getEvent?.event_data?.map((event: any, index: number) => (
              <div key={index} className='flex flex-row gap-2 m-2 p-3 justify-center items-center'>
                <label className="block mb-2 text-gray-900 font-medium" key={index}>
                  {event.title} {"  "} <span className='pl-10 text-gray-800'> credits available : {credits}</span>
                  <br />
                  <div className='flex flex-row justify-center items-baseline'>
                    <button className='bg-red-300 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md' onClick={() => makeVote(votes[index],false)}>
                      -
                    </button>
                    <input
                      className="min-w- p-3 mt-1 rounded-md"
                      type="number"
                      value={votes[index]}
                      disabled
                      // onChange={(e) => handleVoteChange(index, parseInt(e.target.value, 10))}
                    />
                    <button className='bg-green-300 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md' onClick={() => makeVote(votes[index],true)}>
                      +
                    </button>
                  </div>
                </label>
              </div>
            ))} */}
            <div className="w-full max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
              {eventData?.getEvent?.event_data?.map((option: any, i: any) => {
                // Loop through each voteable option
                return (
                  <div
                    key={i}
                    className="flex flex-row gap-2 m-2 p-3 justify-center items-center"
                  >
                    <div>
                      <label>Title</label>
                      <h3>{option.title}</h3>
                    </div>
                    <div className="block mb-2 text-gray-900 font-medium">
                      <label>Votes</label>
                      Remaining credits: {credits}
                      <input
                        className="min-w- p-3 mt-1 rounded-md"
                        type="number"
                        value={votes[i]}
                        disabled
                      />
                      <div className="flex flex-row justify-center items-baseline">
                        {calculateShow(votes[i], false) ? (
                          <button
                            className="bg-red-500 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md"
                            onClick={() => makeVote(i, false)}
                          >
                            -
                          </button>
                        ) : (
                          <button
                            className="bg-red-200 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md cursor-not-allowed"
                            disabled
                          >
                            -
                          </button>
                        )}
                        {calculateShow(votes[i], true) ? (
                          <button
                            className="bg-green-500 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md"
                            onClick={() => makeVote(i, true)}
                          >
                            +
                          </button>
                        ) : (
                          <button
                            className=" bg-green-200 pl-4 pr-4 pt-3 pb-3 m-2 text-black rounded-md cursor-not-allowed"
                            disabled
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {name ? (
              loading ? (
                <button
                  className="bg-purple-600 text-white font-bold p-3 rounded-md w-full cursor-not-allowed"
                  type="button"
                  disabled
                >
                  Updating...
                </button>
              ) : (
                <button
                  className="bg-purple-600 text-white font-bold p-3 rounded-md w-full"
                  type="button"
                  onClick={handleVoteSubmit}
                >
                  Submit Votes
                </button>
              )
            ) : (
              <button
                className="bg-purple-600 text-white font-bold p-3 rounded-md w-full cursor-not-allowed"
                type="button"
                disabled
              >
                Enter Name
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;

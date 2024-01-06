"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CALUCULATE_VOTES_QUERY } from "../../apollo/calculateVotesQuery";
import { useQuery } from "@apollo/client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
const Page = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const {
    loading: eventLoading,
    error: eventError,
    data: eventData,
  } = useQuery(CALUCULATE_VOTES_QUERY, {
    variables: { eventUuid: eventId },
  });
  useEffect(() => {
    if (!eventLoading && !eventError && eventData) {
      console.log("eventData" + eventData?.calculateVotes);
    }
  }, [eventLoading, eventError, eventData]);

  const labelsData = eventData?.calculateVotes?.map((vote: any) => vote.title);

  const data = {
    labels: labelsData,
    datasets: [
      {
        label: "Quadratic Votes",
        data: eventData?.calculateVotes?.map((vote: any) => vote.QvRatio * 100),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Total",
        data: eventData?.calculateVotes?.map((vote: any) => vote.totalVotes),
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgb(54, 162, 235)",
        pointBackgroundColor: "rgb(54, 162, 235)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(54, 162, 235)",
      },
    ],
  };

  const router = useRouter();

  const handleRedirect = () => {
    router.push(`/results?eventId=${eventId}`);
  };
  return (
    <main className="flex min-h-screen flex-col bg-white items-center justify-between p-24">
      <div>
        <h1 className="text-5xl font-bold text-gray-800">
          Results Page is Here
        </h1>
        <p className="text-2xl font-bold text-gray-800">Event Id: {eventId}</p>
        <Radar data={data} />;
      </div>
    </main>
  );
};

export default Page;

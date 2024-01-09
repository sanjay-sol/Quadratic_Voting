"use client";

import React, { useEffect } from "react";
import { CALUCULATE_VOTES_QUERY } from "../apollo/calculateVotesQuery";
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
const Results = ({ eventId }: { eventId: any }) => {
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
        label: "Total Votes",
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

  return (
    <main className="">
      <div>
        <Radar data={data} />
      </div>
    </main>
  );
};

export default Results;

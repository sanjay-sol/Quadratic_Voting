import React, { useState, ChangeEvent, FormEvent } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_EVENT } from "../apollo/eventMutation";
import { useRouter } from "next/navigation";
import { EventData } from "../types/eventData";

const EventForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState<EventData>({
    event_title: "My Event Title",
    event_description: "My Event Description",
    attestation_uid: "",
    num_voters: 10,
    credits_per_voter: 100,
    start_event_date: "",
    end_event_date: "",
    created_at: new Date().toISOString(),
    event_data: [],
  });

  const [createEvent] = useMutation(CREATE_EVENT);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddProject = () => {
    setEventData((prevData) => ({
      ...prevData,
      event_data: [...prevData.event_data, { title: "" }],
    }));
  };

  const handleProjectInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setEventData((prevData) => {
      const updatedEventData = [...prevData.event_data];
      updatedEventData[index] = { title: value };
      return {
        ...prevData,
        event_data: updatedEventData,
      };
    });
  };

  const handleCreateEvent = async () => {
    try {
      setLoading(true);
      const startDate = new Date(eventData.start_event_date);
      const endDate = new Date(eventData.end_event_date);
      if (
        eventData.event_title === "" ||
        eventData.event_description === "" ||
        !eventData.num_voters ||
        !eventData.credits_per_voter ||
        !eventData.start_event_date ||
        !eventData.end_event_date
      ) {
        setLoading(false);
        return alert("Please fill all the fields");
      }

      if (startDate >= endDate) {
        setLoading(false);
        return alert("End date must be greater than start date");
      }
      const { data } = await createEvent({
        variables: {
          event: eventData,
        },
      });

      if (!data?.createEvent?.id || !data?.createEvent?.secret_key)
        return alert("Error creating event");
      router.push(
        `/event?id=${data.createEvent?.id}&secret_key=${data.createEvent?.secret_key}`
      );
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      alert("Error creating event");
      console.error("Error creating event:", error.message);
      //TODO : Add a toast alert here
      // router.push('/error');
    }
  };

  return (
    <div className="flex flex-col  w-screen justify-center items-center ">
      <div className="w-6/12 mx-auto flex flex-col justify-center items-center  p-6">
        <h1 className="text-black font-semibold text-4xl">
          Create a New Event
        </h1>
        <p className="mt-2 font-semibold text-lg text-slate-800">
          To create an event, simply fill out the event settings, add your
          options, and we will generate you quicklinks that you can share with
          your audience.
        </p>
      </div>
      <div className="w-6/12 mx-auto flex flex-col justify-center  p-6">
        <h1 className="text-black font-medium text-3xl">Global Settings</h1>
        <p className="mt-2 font-semibold text-lg text-slate-800">
          These settings are used to setup your event. You can add an event
          title and description, select the number of voters, how many vote
          credits do they each receive, and a start and end date for voting.
        </p>
      </div>
      <form className="w-6/12 mx-auto flex flex-col justify-center p-6">
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          EVENT TITLE
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            What is your event called ?
          </span>
          <input
            type="text"
            name="event_title"
            className="w-full font-normal p-2 mt-1 rounded-md"
            placeholder="Enter Event Title"
            value={eventData.event_title}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          EVENT DESCRIPTION
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            Describe your event in 180 words
          </span>
          <input
            type="text"
            name="event_description"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.event_description}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          Attestation UID:
          <input
            type="text"
            name="attestation_uid"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.attestation_uid}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          NUMBER OF VOTERS
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            How many voting links would you like to generate? (Max: 250)
          </span>
          <input
            type="number"
            name="num_voters"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.num_voters}
            onChange={(e) =>
              setEventData({
                ...eventData,
                num_voters: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          CREDITS PER VOTER
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            How many credits will each voter receive?
          </span>
          <input
            type="number"
            name="credits_per_voter"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.credits_per_voter}
            onChange={(e) =>
              setEventData({
                ...eventData,
                credits_per_voter: parseInt(e.target.value),
              })
            }
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          START EVENT DATE
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            When would you like to begin polling?
          </span>
          <input
            type="datetime-local"
            name="start_event_date"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.start_event_date}
            onChange={(e) =>
              setEventData({ ...eventData, start_event_date: e.target.value })
            }
          />
        </label>
        <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-2xl text-black">
          END EVENT DATE
          <br />
          <span className="block mb-2 font-semibold text-lg text-slate-200">
            When would you like to end polling?
          </span>
          <input
            type="datetime-local"
            name="end_event_date"
            className="w-full font-normal p-2 mt-1 rounded-md"
            value={eventData.end_event_date}
            onChange={(e) =>
              setEventData({ ...eventData, end_event_date: e.target.value })
            }
          />
        </label>
        <div className=" mx-auto flex flex-col justify-center  p-6">
          <h1 className="text-black font-medium text-3xl">Options</h1>
          <p className="mt-2 font-semibold text-lg text-slate-800">
            These settings enable you to add options that voters can delegate
            their voting credits to. You can choose to add an option title,
            description, and link.
          </p>
        </div>
        <div>
          {/* <p>--------------------------------------------</p> */}
          <h3 className="text-black text-xl mb-2 font-semibold">Add Options</h3>
          {eventData.event_data.map((project, index) => (
            <div key={index} className="mb-2">
              <label className="block mb-2 bg-gradient-to-r from-purple-600 to-pink-700 p-4 rounded-md font-bold text-xl text-black">
                OPTION {index + 1}:
                <input
                  type="text"
                  value={project.title}
                  placeholder="Enter Option Title"
                  onChange={(e) => handleProjectInputChange(index, e)}
                  className="w-full font-normal p-2 mt-1 rounded-md"
                />
              </label>
            </div>
          ))}
          <button
            className="bg-green-300 rounded-lg p-2 mt-2 text-black"
            type="button"
            onClick={handleAddProject}
          >
            Add Option
          </button>
        </div>
        {/* <p>--------------------------------------------</p> */}
        {eventData.event_data.length > 1 ? (
          loading ? (
            <button
              className="bg-purple-800 rounded-lg p-3 text-white font-bold mt-4 w-full"
              disabled
              type="button"
            >
              Creating Event...
            </button>
          ) : (
            <button
              className="bg-purple-800 rounded-lg p-3 text-white font-bold mt-4 w-full"
              type="button"
              onClick={handleCreateEvent}
            >
              Create Event
            </button>
          )
        ) : (
          <button
            className="bg-purple-800 rounded-lg p-3 text-white font-bold mt-4 w-full cursor-not-allowed"
            type="button"
            disabled
          >
            Add at least 2 Options
          </button>
        )}
      </form>
    </div>
  );
};

export default EventForm;

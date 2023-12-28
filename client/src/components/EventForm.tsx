import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EVENT } from '../apollo/eventMutation';
import { useRouter } from 'next/navigation';

interface Project {
  title: string;
}

interface EventData {
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: string;
  end_event_date: string;
  created_at: string;
  event_data: Project[];
}

const EventForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [eventData, setEventData] = useState<EventData>({
    event_title: '',
    event_description: '',
    attestation_uid: '',
    num_voters: 0,
    credits_per_voter: 0,
    start_event_date: '',
    end_event_date: '',
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
      event_data: [...prevData.event_data, { title: '' }],
    }));
  };

  const handleProjectInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
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
      if (eventData.event_title === "" || eventData.event_description === "" || !eventData.num_voters || !eventData.credits_per_voter || !eventData.start_event_date || !eventData.end_event_date) {
        setLoading(false);
        return alert('Please fill all the fields');
      }

      if (startDate >= endDate) {
        setLoading(false);
      return alert('End date must be greater than start date');
    }
      const { data } = await createEvent({
        variables: {
          event: eventData,
        },
      });

      if (!data?.createEvent?.id || !data?.createEvent?.secret_key) return alert('Error creating event');
      
      console.log('Event created:', data.createEvent);
      console.log('Event created:', data.createEvent?.id);
      console.log('Event created:', data.createEvent?.secret_key);
      router.push(`/event?id=${data.createEvent?.id}&secret_key=${data.createEvent?.secret_key}`);
      setLoading(false);
    } catch (error: any) {
      console.error('Error creating event:', error.message);
      //TODO : Add a toast alert here
      // router.push('/error');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <form className="max-w-md mx-auto p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow-md">
        <h1 className="text-2xl pl-24 font-bold text-gray-800"> Event Details</h1>
        <label className="block mb-2 text-gray-900 font-medium">
          Event Title:
          <input
            type="text"
            name="event_title"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.event_title}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Event Description:
          <input
            type="text"
            name="event_description"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.event_description}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Attestation UID:
          <input
            type="text"
            name="attestation_uid"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.attestation_uid}
            onChange={handleInputChange}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Number of Voters:
          <input
            type="number"
            name="num_voters"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.num_voters}
            onChange={(e) => setEventData({ ...eventData, num_voters: parseInt(e.target.value) })}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Credits Per Voter:
          <input
            type="number"
            name="credits_per_voter"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.credits_per_voter}
            onChange={(e) => setEventData({ ...eventData, credits_per_voter: parseInt(e.target.value) })}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Start Event Date:
          <input
            type="datetime-local"
            name="start_event_date"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.start_event_date}
            onChange={(e) => setEventData({ ...eventData, start_event_date: e.target.value })}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          End Event Date:
          <input
            type="datetime-local"
            name="end_event_date"
            className="w-full p-2 mt-1 rounded-md"
            value={eventData.end_event_date}
            onChange={(e) => setEventData({ ...eventData, end_event_date: e.target.value })}
          />
        </label>
        <label className="block mb-2 text-gray-900 font-medium">
          Created At:
        </label>
        <div>
          <p>--------------------------------------------</p>
          <h3 className="text-black font-semibold underline">Options Data</h3>
          {eventData.event_data.map((project, index) => (
            <div key={index} className="mb-2">
              <label className="text-black">
                Option {index + 1}:
                <input
                  type="text"
                  value={project.title}
                  placeholder="Enter Option Title"
                  onChange={(e) => handleProjectInputChange(index, e)}
                  className="w-full p-2 mt-1 rounded-md"
                />
              </label>
            </div>
          ))}
          <button className="bg-green-300 rounded-lg p-2 mt-2 text-black" type="button" onClick={handleAddProject}>
            Add Option
          </button>
        </div>
        <p>--------------------------------------------</p>
        {eventData.event_data.length > 1 ? (
  loading ? (
    <button
      className="bg-purple-800 rounded-lg p-3 text-white font-bold mt-4 w-full" disabled
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

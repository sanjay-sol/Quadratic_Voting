"use client";
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
  const [eventData, setEventData] = useState<EventData>({
    event_title: '',
    event_description: '',
    attestation_uid: '',
    num_voters: 0,
    credits_per_voter: 0,
    start_event_date: '',
    end_event_date: '',
    created_at: '',
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
      const { data } = await createEvent({
        variables: {
          event: eventData,
        },
      });
        
        if(!data?.createEvent?.id || !data?.createEvent?.secret_key) return alert('Error creating event');

        console.log('Event created:', data.createEvent);
        console.log('Event created:', data.createEvent?.id);
        console.log('Event created:', data.createEvent?.secret_key);
        router.push(`/event?id=${data.createEvent?.id}&secret_key=${data.createEvent?.secret_key}`)
    } catch (error:any) {

        console.error('Error creating event:', error.message);
        //TODO : Add an toast alert here
        // router.push('/error');
    }
  };

  return (
    <div className='flex flex-col justify-center text-center items-center'>
      <form className='flex flex-col gap-7 bg-red-300 p-4 rounded-lg' onSubmit={(e: FormEvent) => e.preventDefault()}>
        {/* Form input fields */}
        <label>
          Event Title:
          <input
            type="text"
            name="event_title"
            className='text-black'
            value={eventData.event_title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Event Description:
            <input
            className='text-black'
            name="event_description"
            value={eventData.event_description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Attestation UID:
                  <input
                      className='text-black'
            type="text"
            name="attestation_uid"
            value={eventData.attestation_uid}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Number of Voters:
                  <input
                      className='text-black'
            type="number"
            name="num_voters"
            value={eventData.num_voters}
            onChange={(e)=> setEventData({...eventData, num_voters: parseInt(e.target.value)}) }
          />
        </label>
        <label>
          Credits Per Voter:
            <input
            className='text-black'
            type="number"
            name="credits_per_voter"
            value={eventData.credits_per_voter}
            onChange={(e)=> setEventData({...eventData, credits_per_voter: parseInt(e.target.value)}) }
          />
        </label>
        <label>
          Start Event Date:
            <input
            className='text-black'
            type="text"
            name="start_event_date"
            value={eventData.start_event_date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Event Date:
            <input
            className='text-black'
            type="text"
            name="end_event_date"
            value={eventData.end_event_date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Created At:
            <input
             className='text-black'
            type="text"
            name="created_at"
            value={eventData.created_at}
            onChange={handleInputChange}
          />
        </label>

        {/* Event Data (Array of Projects) */}
        <div>
          <h3 className='text-black'>Event Data</h3>
          {eventData.event_data.map((project, index) => (
            <div key={index}>
              <label>
                Project {index + 1}:
                <input
                  className='text-black'
                  type="text"
                  value={project.title}
                  onChange={(e) => handleProjectInputChange(index, e)}
                />
              </label>
            </div>
          ))}
          <button className='bg-green-200 rounded-lg p-2 text-black' type="button" onClick={handleAddProject}>
            Add Project
          </button>
        </div>

        <button className='bg-purple-200 rounded-lg p-3 text-black font-bold' type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;

import voterModel from "../../models/voter.model";
import userModel from '../../models/event.model';
import { EventInput } from '../types/eventTypes';

const createEventMutation = async (_: any, { event }: { event: EventInput }) => {
    try {
        const createdEvent = await userModel.create({
          ...event,
        });

        const voters = Array.from({ length: event.num_voters }, (_, index) => {
          const vote_data = [];
          for (const subject of event.event_data) {
            vote_data.push({
              title: subject.title,
              votes: 0,
            });
          }
          return {
            event_uuid: createdEvent.id,
            voter_name: `Voter ${index + 1}`,
            vote_data: vote_data,
          };
        }); 

      await voterModel.insertMany(voters);

      return createdEvent;

  } catch (error) {
    console.error(error);
    throw new Error('Failed to create event');
  }
};

export default createEventMutation;

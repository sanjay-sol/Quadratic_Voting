import voterModel from '../../models/voter.model';
import eventModel from '../../models/event.model';

const eventResolvers = {
  Query: {
    events: async () => {
      return await eventModel.find();
        },
    getEvent: async (_: any, { id }: { id: string }) => {
        return await eventModel.findOne({id: id});
        },
    getAllEvents: async () => {
            return await eventModel.find();
        },
    getVotersByEventId: async (_: any, { id, secret_key }: { id: string, secret_key: string } ) => {
           try {
               const voters = await voterModel.find({ event_uuid: id });
               const event = await eventModel.findOne({ id: id, secret_key: secret_key });
                if (!event) {
                    return [];
                }
                return voters;
            } catch (error) {
                console.error(error);
                return [];
            }
        }
    },
    Mutation: { }
};

export default eventResolvers;

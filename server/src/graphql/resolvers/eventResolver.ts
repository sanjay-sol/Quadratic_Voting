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
    },
    Mutation: { }
};

export default eventResolvers;

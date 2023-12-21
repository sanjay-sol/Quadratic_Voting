import userModel from '../../models/event.model';

const eventResolvers = {
  Query: {
    events: async () => {
      return await userModel.find();
        },
    getEvent: async (_: any, { id }: { id: string }) => {
        return await userModel.findOne({id: id});
    },
    },
    Mutation: {}
};

export default eventResolvers;

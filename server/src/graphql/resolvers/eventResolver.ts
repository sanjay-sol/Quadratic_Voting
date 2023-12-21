import userModel from '../../models/event.model';

const eventResolvers = {
  Query: {
    events: async () => {
      return await userModel.find();
    },
    },
    Mutation: {}
};

export default eventResolvers;

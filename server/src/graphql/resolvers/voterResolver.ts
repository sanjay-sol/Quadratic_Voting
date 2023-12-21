import voterModel from '../../models/voter.model';

const voterResolvers = {
  Query: {
    voters: async () => {
      return await voterModel.find();
    },
  },
};

export default voterResolvers;

import voterModel from '../../models/voter.model';
import { VoterInput } from '../types/voterTypes';

const createVoterMutation = async (_: any, { voter }: { voter: VoterInput }) => {
  try {
    return await voterModel.create({
      ...voter,
    });
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create voter');
  }
};

export default createVoterMutation;

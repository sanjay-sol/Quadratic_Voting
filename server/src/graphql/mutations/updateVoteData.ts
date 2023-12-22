import voterModel from '../../models/voter.model';

const updateVoteMutation = async (_: any, { id, name, votes }: { id: string; name: string; votes: number[] }) => {
  try {
    const voter = await voterModel.findOne({ id: id });

    if (!voter) {
      throw new Error('Voter not found');
    }

    if (name !== "") {
      voter.voter_name = name;
    }
      
    for (let i = 0; i < votes.length; i++) {
      voter.vote_data[i].votes = votes[i];
    }
      
      if (voter._id) {
        await voterModel.findByIdAndUpdate(
        voter._id,{
            voter_name: name !== '' ? name : voter.voter_name,
            vote_data: voter.vote_data,
        },
        { new: true }
    )}
             
    return voter;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to update vote');
  }
};

export default updateVoteMutation;

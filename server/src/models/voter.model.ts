import mongoose, { Schema, Document, Types } from 'mongoose';

interface IVoter extends Document {
  id: string;
  event_uuid: string;
  voter_name: string;
  vote_data: Record<string, any>;
}

const votersSchema: Schema = new Schema({
  id: { type: String, default: () => new Types.ObjectId().toString(), index: true },
  event_uuid: { type: String, required: true },
  voter_name: String,
  vote_data: { type: Schema.Types.Mixed },
});

export default mongoose.model<IVoter>('Voters', votersSchema);

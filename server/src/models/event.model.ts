import mongoose, { Schema, Document, Types } from 'mongoose';

interface IEvent extends Document {
  id: string;
  secret_key: string;
  event_title: string;
  event_description: string;
  attestation_uid: string;
  num_voters: number;
  credits_per_voter: number;
  start_event_date: Date;
  end_event_date: Date;
  created_at: Date;
  event_data: Record<string, any>;
}

const eventsSchema: Schema = new Schema({
  id: { type: String, default: () => new Types.ObjectId().toString(), index: true },
  secret_key: { type: String, default: () => new Types.ObjectId().toString() },
  event_title: String,
  event_description: String,
  attestation_uid: { type: String, default: "" },
  num_voters: { type: Number, default: 10 },
  credits_per_voter: { type: Number, default: 5 },
  start_event_date: { type: Date, default: Date.now },
  end_event_date: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  event_data: { type: Schema.Types.Mixed },
});

export default mongoose.model<IEvent>('Events', eventsSchema);

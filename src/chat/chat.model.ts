import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

export const Chat = new Schema(
  {
    sender: { type: String },
    receiver: { type: String },
    message: { type: String },
  },
  { timestamps: true },
);

export interface Chat extends mongoose.Document {
  sender: string;
  receiver: string;
  message: string;
}

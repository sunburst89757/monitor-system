import { Schema } from 'mongoose';
 
export const errorSchema = new Schema({
  _id: { type: String, required: true },
  type: { type: String, required: true },
  subtype: { type: String, required: true },
  startTime:{ type: Date, required: true},
  pageURL: { type: String, required: true},
});

import { Schema } from "mongoose";
import mongoose from 'mongoose';

const endpointSchema = new Schema({
    endpoint: { type: String, required: true },
    stat: { type: String, default: 'Stable' },
    history: [{ type: Number }]
  });

const schemaAplication = new Schema({
    developers: [String],
    link: { type: String },
    status: { type: String, default: 'Stable' },
    endpoints: [endpointSchema]
  });


const Aplication = mongoose.model('Aplication', schemaAplication);
export default Aplication;
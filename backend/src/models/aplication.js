
import mongoose, { Schema } from 'mongoose';

const timeCode =new Schema({
    time: { type: String },
    code: { type: Number}

});
const endpointSchema = new Schema({
    endpoint: { type: String, required: true },
    stat: { type: String, default: 'Stable' },
    history: [timeCode],
    states:[Number]
  });

const schemaAplication = new Schema({
    developers: [String],
    link: { type: String },
    status: { type: String, default: 'Stable' },
    canChangeStatus: { type: Boolean, default: true },
    endpoints: [endpointSchema],
    bug: { type: Boolean, default: false}

  });
  schemaAplication.pre('save', function (next) {
    if (!this.canChangeStatus) {
      this.status = 'Unstable';
    }
    next();
  });

const Aplication = mongoose.model('Aplication', schemaAplication);
export default Aplication;
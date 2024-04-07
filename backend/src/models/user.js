// src/models/User.js
import mongoose, { Schema } from 'mongoose';
const bugSchema = new Schema({
  bug: { type: String},
  status: { type: String },
});
const endpointSchema = new Schema({
    link: { type: String, required: true },
    stat: { type: String, default: 'Stable' },
    history: [{ type: Number }]
  });
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, requirred: true },
    email: { type: String, required: true, unique: true },
    isDeveloper: { type: Boolean, required: false, default: false },
    endpoints: [endpointSchema],
    bugtosolve: [bugSchema]
 });

const User = mongoose.model('User', userSchema);

export default User;


// Path: backend/src/config/db.js

// src/models/User.js
// import { Schema } from "mongoose";
// import mongoose from 'mongoose';

// const endpointSchema = new Schema({
//     endpoint: { type: String, required: true },
//     stat: { type: String, default: 'Stable' },
//     history: [{ type: Number }]
//   });

// const schemaAplication = new Schema({
//     link: { type: String, required: true },
//     status: { type: String, default: 'Stable' },
//     endpoints: [endpointSchema]
//   });
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     isDeveloper: { type: Boolean, required: false, default: false },
//     aplicatie: [schemaAplication]
//  });

// const User = mongoose.model('User', userSchema);

// export default User;


// // Path: backend/src/config/db.js
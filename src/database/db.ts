import mongoose from 'mongoose';

// School Schema
const SchoolSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Unique school ID
  name: { type: String, required: true, unique: true }, // Unique name for the school
  address: { type: String, required: true }, // Address need not be unique
  latitude: { type: Number, required: true }, // Correct spelling of latitude
  longitude: { type: Number, required: true },
});

// Create a Mongoose model from the schema
const School = mongoose.model('School', SchoolSchema);

export default School;

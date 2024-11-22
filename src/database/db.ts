import mongoose from 'mongoose';

//school Schema

const SchoolSchema = new mongoose.Schema({
  id: { type: 'string', required: true, unique: true },
  name: { type: 'string', required: true, unique: true },
  address: { type: 'string', required: true, unique: true },
  latlitude: { type: 'number', required: true },
  longitude: { type: 'number', required: true },
});

const School = mongoose.model('School', SchoolSchema);

export default { School };

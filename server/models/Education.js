import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    branch: { type: String, required: true },
    institution: { type: String, default: '' },
    year: { type: String, required: true },
    description: { type: String, default: '' }
  },
  { timestamps: true }
);

export default mongoose.model('Education', educationSchema);

import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    technologies: [{ type: String }],
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
    featured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);

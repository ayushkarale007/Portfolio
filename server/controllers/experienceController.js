import Experience from '../models/Experience.js';

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch experience', error: error.message });
  }
};

export const createExperience = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    res.status(201).json({ success: true, message: 'Experience created successfully', data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Experience creation failed', error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    res.json({ success: true, message: 'Experience updated successfully', data: experience });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Experience update failed', error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({ success: false, message: 'Experience not found' });
    }

    res.json({ success: true, message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete experience', error: error.message });
  }
};

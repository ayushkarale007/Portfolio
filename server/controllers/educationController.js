import Education from '../models/Education.js';

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ year: -1 });
    res.json({ success: true, data: education });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch education', error: error.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json({ success: true, message: 'Education created successfully', data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Education creation failed', error: error.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    res.json({ success: true, message: 'Education updated successfully', data: education });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Education update failed', error: error.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);

    if (!education) {
      return res.status(404).json({ success: false, message: 'Education not found' });
    }

    res.json({ success: true, message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete education', error: error.message });
  }
};

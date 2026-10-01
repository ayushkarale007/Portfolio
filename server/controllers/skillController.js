import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json({ success: true, data: skills });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch skills', error: error.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, message: 'Skill created successfully', data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Skill creation failed', error: error.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill updated successfully', data: skill });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Skill update failed', error: error.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }

    res.json({ success: true, message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete skill', error: error.message });
  }
};

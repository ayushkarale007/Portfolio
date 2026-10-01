import ContactMessage from '../models/ContactMessage.js';

export const createContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const contactMessage = await ContactMessage.create({ name, email, subject, message });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: contactMessage
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send message', error: error.message });
  }
};

export const getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch messages', error: error.message });
  }
};

export const markContactMessageRead = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: 'read' },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }

    res.json({ success: true, message: 'Message marked as read', data: message });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message', error: error.message });
  }
};

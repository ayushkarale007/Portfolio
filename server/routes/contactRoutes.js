import express from 'express';
import { createContactMessage, getContactMessages, markContactMessageRead } from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createContactMessage);
router.get('/', protect, adminOnly, getContactMessages);
router.put('/:id/read', protect, adminOnly, markContactMessageRead);

export default router;

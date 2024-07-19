const express = require('express');
const router = express.Router();
const notesController = require('../controller/noteController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addNote', authMiddleware, notesController.createNote);
router.get('/getAll', authMiddleware, notesController.getNotes);
router.put('/:noteId', authMiddleware, notesController.updateNote);
router.put('/:noteId/archive', authMiddleware, notesController.archiveNote);
router.put('/:noteId/trash', authMiddleware, notesController.trashNote);
router.get('/archived', authMiddleware, notesController.getArchiveNotes);
router.get('/trashed', authMiddleware, notesController.getTrashedNotes);

module.exports = router;

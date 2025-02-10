const router = require('express').Router();
const ensureAuthenticated = require('../Middlewares/Authentication');

const { getNotes, addNote, editNote, deleteNote, uploadFile, getFile } = require('../Controller/NoteController');

const multer = require('multer');
const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
const upload = multer({ storage: multer.memoryStorage() });


router.get('/notes', ensureAuthenticated, getNotes);

router.post('/add-note', ensureAuthenticated, upload.array('files'), addNote);

router.put('/edit-note/:id', ensureAuthenticated, editNote);

router.delete('/delete-note/:id', ensureAuthenticated, deleteNote);

router.post('/upload-file', ensureAuthenticated, upload.single('file'), uploadFile);

router.get('/file/:fileId', getFile);

module.exports = router;
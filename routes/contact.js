const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

router.post('/', upload.single('cv'), contactController.submitForm);

router.get('/', contactController.getContacts);

// stock du fichier
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Simuler base de données temporaire
let contacts = [];

// POST: réception des données
router.post('/', upload.single('cv'), (req, res) => {
  const { nom, prenom, email, telephone, objet, message, societe } = req.body;

  const nouveauContact = {
    nom,
    prenom,
    email,
    telephone,
    objet,
    message,
    societe,
    fichier: req.file?.filename || null,
    date: new Date()
  };

  contacts.push(nouveauContact);
  console.log('Contact reçu :', nouveauContact);

  res.status(200).json({ success: true, message: 'Message reçu avec succès.' });
});

// GET : affiche les infos
router.get('/', (req, res) => {
  res.json(contacts);
});

module.exports = router;
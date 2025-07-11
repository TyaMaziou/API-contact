const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// stockage des infos dans un fichier json en attendant
const fs = require('fs');
const contactsFile = 'contacts.json';


// stock du fichier 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// charge les données si fichier existant
let contacts = [];
if (fs.existsSync(contactsFile)) {
  contacts = JSON.parse(fs.readFileSync(contactsFile));
}

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
  fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
  res.status(200).json({ success: true, message: 'Message reçu avec succès.' });
});

// GET: affiche les messages
router.get('/', (req, res) => {
  res.json(contacts);
});


module.exports = router;
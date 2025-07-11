// const fs = require('fs');
// const path = require('path');

// exports.handleContactForm = (req, res) => {
//   const { nom, prenom, email, telephone, message, objet, societe } = req.body;
//   const file = req.file;

//   console.log("Données reçues :", req.body);
//   console.log("Fichier reçu :", file?.filename);

//   res.status(200).json({
//     success: true,
//     message: 'Merci, le formulaire est bien reçu',
//     data: {
//       nom, prenom, email, telephone, message, objet, societe,
//       cv: file ? `/uploads/${file.filename}` : null
//     }
//   });
// };

// exports.getContacts = (req, res) => {
//   const filePath = path.join(__dirname, '../data/contacts.json');
//   if (!fs.existsSync(filePath)) {
//     return res.json([]);
//   }

//   const data = fs.readFileSync(filePath, 'utf8');
//   try {
//     const contacts = JSON.parse(data);
//     res.json(contacts);
//   } catch (err) {
//     res.status(500).json({ error: 'Erreur lors de la lecture des données' });
//   }
// };
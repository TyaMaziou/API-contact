exports.handleContactForm = (req, res) => {
  const { nom, prenom, email, telephone, message, objet, societe } = req.body;
  const file = req.file;

  console.log("Données reçues :", req.body);
  console.log("Fichier reçu :", file?.filename);

  res.status(200).json({
    success: true,
    message: 'Merci, le formulaire est bien reçu',
    data: {
      nom, prenom, email, telephone, message, objet, societe,
      cv: file ? `/uploads/${file.filename}` : null
    }
  });
};

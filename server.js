const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ⚠️ assure-toi que ce chemin est bien là
app.use('/api/contact', contactRoutes);

// Pour tester que le serveur tourne
app.get('/', (req, res) => {
  res.send('API en ligne');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

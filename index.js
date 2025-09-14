const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch(err => console.error(err));

// Schéma et modèle
const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Quote = mongoose.model('Quote', quoteSchema);

// GET toutes les citations
app.get('/quotes', async (req, res) => {
  try {
    const quotes = await Quote.find();
    res.json(
      quotes.map(q => ({
        id: q._id,
        text: q.text,
        createdAt: q.createdAt
      }))
    );
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// GET une citation par ID
app.get('/quotes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: "ID invalide." });

    const quote = await Quote.findById(req.params.id);
    if (!quote) return res.status(404).json({ error: "Citation non trouvée." });

    // Include ObjectId in the response
    res.json({
      id: quote._id,
      text: quote.text,
      createdAt: quote.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// POST ajouter une nouvelle citation
app.post('/quotes', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "Le champ 'text' est requis." });
    }
    const newQuote = new Quote({ text });
    await newQuote.save();
    res.status(201).json({
      id: newQuote._id,
      text: newQuote.text,
      createdAt: newQuote.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// PUT modifier une citation par ID
app.put('/quotes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: "ID invalide." });

    const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedQuote) return res.status(404).json({ error: "Citation non trouvée." });
    res.json({ message: "Citation mise à jour avec succès.", updatedQuote });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

// DELETE supprimer une citation par ID
app.delete('/quotes/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.status(400).json({ error: "ID invalide." });

    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) return res.status(404).json({ error: "Citation non trouvée." });
    res.json({ message: "Citation supprimée avec succès.", deletedQuote });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur." });
  }
});

app.listen(port, () => {
  console.log(`API DailyQuotes en écoute sur http://localhost:${port}`);
});

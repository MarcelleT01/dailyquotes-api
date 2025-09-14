const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
    const quotes = await Quote.find();
    res.json(quotes);
});

// GET une citation par ID
app.get('/quotes/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        if (!quote) return res.status(404).json({ error: "Citation non trouvée." });
        res.json(quote);
    } catch (err) {
        res.status(400).json({ error: "ID invalide." });
    }
});

// POST ajouter une nouvelle citation
app.post('/quotes', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Le texte de la citation est requis." });

    const newQuote = new Quote({ text });
    await newQuote.save();
    res.status(201).json(newQuote);
});

// PUT modifier une citation par ID
app.put('/quotes/:id', async (req, res) => {
    try {
        const updatedQuote = await Quote.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedQuote) return res.status(404).json({ error: "Citation non trouvée." });
        res.json({ message: "Citation mise à jour avec succès.", updatedQuote });
    } catch (err) {
        res.status(400).json({ error: "ID invalide." });
    }
});

// DELETE supprimer une citation par ID
app.delete('/quotes/:id', async (req, res) => {
    try {
        const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
        if (!deletedQuote) return res.status(404).json({ error: "Citation non trouvée." });
        res.json({ message: "Citation supprimée avec succès.", deletedQuote });
    } catch (err) {
        res.status(400).json({ error: "ID invalide." });
    }
});

app.listen(port, () => {
    console.log(`API DailyQuotes en écoute sur http://localhost:${port}`);
});

import express from "express";

const app = express();
app.use(express.json());

// Tableau de citations (simule une base de données)
let quotes = [
    { id: 1, text: "La vie est belle." },
    { id: 2, text: "Crois en toi." },
    { id: 3, text: "Sois optimiste." }
];

// 🟢 1. GET toutes les citations
app.get('/quotes', (req, res) => {
    res.json(quotes);
});

// 🟢 2. GET une citation par ID
app.get('/quotes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const quote = quotes.find(q => q.id === id);
    if (!quote) return res.status(404).json({ error: "Citation non trouvée." });
    res.json(quote);
});

// 🟡 3. POST ajouter une nouvelle citation
app.post('/quotes', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Le texte est requis." });
    const newQuote = { id: quotes.length + 1, text };
    quotes.push(newQuote);
    res.status(201).json(newQuote);
});

// 🔵 4. PUT modifier une citation existante
app.put('/quotes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;
    const quote = quotes.find(q => q.id === id);
    if (!quote) return res.status(404).json({ error: "Citation non trouvée." });

    quote.text = text || quote.text;
    res.json({ message: "Citation mise à jour avec succès.", quote });
});

// 🔴 5. DELETE supprimer une citation
app.delete('/quotes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = quotes.findIndex(q => q.id === id);
    if (index === -1) return res.status(404).json({ error: "Citation non trouvée." });

    const deleted = quotes.splice(index, 1);
    res.json({ message: "Citation supprimée avec succès.", deleted });
});

// 🚀 Lancement du serveur
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

import axios from "axios";

const BASE_URL = "http://localhost:3000/quotes"; // adapte selon ta route

// 1. GET : récupérer toutes les citations
const getQuotes = async () => {
  try {
    const res = await axios.get(BASE_URL);
    console.log("Toutes les citations :", res.data);
  } catch (err) {
    console.error("Erreur GET :", err.message);
  }
};

// 2. POST : ajouter une citation
const addQuote = async () => {
  try {
    const res = await axios.post(BASE_URL, {
      author: "Albert Einstein",
      text: "La vie, c’est comme une bicyclette, il faut avancer pour ne pas perdre l’équilibre."
    });
    console.log("Citation ajoutée :", res.data);
    return res.data._id; // on récupère l'id pour le PUT et DELETE
  } catch (err) {
    console.error("Erreur POST :", err.message);
  }
};

// 3. PUT : modifier une citation
const updateQuote = async (id) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, {
      author: "Albert Einstein",
      text: "La vie est belle et il faut avancer !"
    });
    console.log("Citation modifiée :", res.data);
  } catch (err) {
    console.error("Erreur PUT :", err.message);
  }
};

// 4. DELETE : supprimer une citation
const deleteQuote = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    console.log("Citation supprimée :", res.data);
  } catch (err) {
    console.error("Erreur DELETE :", err.message);
  }
};

// 👇 Exécution séquentielle
const testAPI = async () => {
  await getQuotes();
  const newId = await addQuote();
  await updateQuote(newId);
  await deleteQuote(newId);
  await getQuotes();
};

testAPI();

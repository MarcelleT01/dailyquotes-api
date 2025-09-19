#  Daily Quotes API  
![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)  
![Express](https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express)  
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen?logo=mongodb)  
![License](https://img.shields.io/badge/license-MIT-blue)  

Une mini API RESTful permettant de **créer, lire, mettre à jour et supprimer des citations**.  
Construite avec **Node.js + Express** et connectée à **MongoDB**.  

---

##  Fonctionnalités  

- Ajouter une nouvelle citation   
- Récupérer toutes les citations   
- Récupérer une citation par ID   
- Mettre à jour une citation  
- Supprimer une citation  

---

##  Stack utilisée  

- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [MongoDB](https://www.mongodb.com/) avec [Mongoose](https://mongoosejs.com/)  
- [Nodemon](https://nodemon.io/) (pour le développement)  

---

Endpoints disponibles
Méthode	Endpoint	Description
GET	/api/quotes	Récupérer toutes les citations
GET	/api/quotes/:id	Récupérer une citation par ID
POST	/api/quotes	Ajouter une nouvelle citation
PUT	/api/quotes/:id	Modifier une citation existante
DELETE	/api/quotes/:id	Supprimer une citation
 Exemple de requête (Postman)
Ajo
uter une citation
POST /api/quotes
Body (JSON) :

json

{
  "text": "La vie est belle.",
  "author": "Anonyme"
}
Réponse :

json

{
  "_id": "68c693f8dbb975be54eec4a9",
  "text": "La vie est belle.",
  "author": "Anonyme",
  "createdAt": "2025-09-15T17:54:11.228Z"
}

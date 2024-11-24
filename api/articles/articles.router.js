const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller.js');
const authMiddleware = require('../../middlewares/auth'); // Importation du middleware d'authentification


// Route pour créer un nouvel article (tout utilisateur connecté peut créer un article)
router.post('/', authMiddleware, articlesController.createArticle);


// Route pour mettre à jour un article (seulement pour les administrateurs)
router.put('/:id', authMiddleware, articlesController.updateArticle);

// Route pour supprimer un article (seulement pour les administrateurs)
router.delete('/:id', authMiddleware, articlesController.deleteArticle);

module.exports = router;

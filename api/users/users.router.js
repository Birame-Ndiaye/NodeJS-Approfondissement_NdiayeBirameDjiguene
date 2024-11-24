const express = require("express");
const router = express.Router();
const usersController = require("./users.controller");
const authMiddleware = require("../../middlewares/auth");
const { isAdmin } = require("../../middlewares/auth");

// Route publique pour la connexion
router.post('/login', usersController.login);

// Appliquer le middleware d'authentification à partir d'ici
router.use(authMiddleware);

router.post('/', usersController.create);

// Routes accessibles aux utilisateurs authentifiés
router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.put("/:id", usersController.update);
router.delete("/:id", usersController.delete);

// Routes accessibles uniquement aux administrateurs
router.get('/admin/users', isAdmin, usersController.getAll);
router.get('/admin/users/:id', isAdmin, usersController.getById);
router.post('/admin/users', isAdmin, usersController.create);
router.put('/admin/users/:id', isAdmin, usersController.update);
router.delete('/admin/users/:id', isAdmin, usersController.delete);

// Route publique pour obtenir les articles d'un utilisateur

router.get('/:userId/articles', usersController.getUserArticles);

module.exports = router;

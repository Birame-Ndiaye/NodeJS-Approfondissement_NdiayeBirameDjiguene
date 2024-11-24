// tests/articles.spec.js
require('module-alias/register');
const request = require('supertest');
const app = require('../server'); // Assurez-vous que le chemin vers votre serveur est correct
const mockingoose = require('mockingoose');
const Article = require('@api/articles/articles.model'); // Chemin vers votre modèle Article
const User = require('@api/users/users.model'); // Chemin vers votre modèle User
const jwt = require('jsonwebtoken');
// tests/articles.spec.js (suite)

// Clé secrète pour JWT (doit correspondre à celle utilisée dans votre middleware d'authentification)
const JWT_SECRET = 'votre_clé_secrète';

// Utilisateur fictif
const fakeUser = {
  _id: '60e8f0f4c8b4a42c3c4d1234',
  name: 'Admin User',
  email: 'admin@example.com',
  role: 'admin',
};

// Générer un token JWT pour l'utilisateur fictif
const token = jwt.sign({ id: fakeUser._id }, JWT_SECRET, { expiresIn: '1h' });
// tests/articles.spec.js (suite)

beforeEach(() => {
    mockingoose.resetAll();
  });
  
  afterAll(() => {
    mockingoose.resetAll();
  });
// tests/articles.spec.js (suite)

describe('Articles API', () => {
  
    // Test de création d'un article
    it('should create a new article', async () => {
      // Données de l'article à créer
      const newArticle = {
        _id: '60e8f1a2c8b4a42c3c4d1235',
        title: 'Mon Nouvel Article',
        content: 'Ceci est le contenu de mon article.',
        user: fakeUser._id,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      // Mock de la méthode save de Mongoose pour retourner l'article créé
      mockingoose(Article).toReturn(newArticle, 'save');
  
      // Envoyer une requête POST pour créer un article
      const res = await request(app)
        .post('/api/articles') // Assurez-vous que le chemin est correct
        .set('x-access-token', token)
        .send({
          title: 'Mon Nouvel Article',
          content: 'Ceci est le contenu de mon article.',
          status: 'published',
        });
  
      // Vérifier le code de réponse
      expect(res.status).toBe(201);
  
      // Vérifier le corps de la réponse
      expect(res.body).toHaveProperty('_id');
      expect(res.body.title).toBe('Mon Nouvel Article');
      expect(res.body.content).toBe('Ceci est le contenu de mon article.');
      expect(res.body.status).toBe('published');
      expect(res.body.user).toBe(fakeUser._id);
    });
  
    // Test de mise à jour d’un article
    it('should update an existing article', async () => {
      // Données de l'article mis à jour
      const updatedArticle = {
        _id: '60e8f1a2c8b4a42c3c4d1235',
        title: 'Article Mis à Jour',
        content: 'Contenu mis à jour.',
        user: fakeUser._id,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      // Mock de la méthode findByIdAndUpdate de Mongoose pour retourner l'article mis à jour
      mockingoose(Article).toReturn(updatedArticle, 'findOneAndUpdate');
  
      // Envoyer une requête PUT pour mettre à jour l'article
      const res = await request(app)
        .put('/api/articles/60e8f1a2c8b4a42c3c4d1235') // Assurez-vous que l'ID est correct
        .set('x-access-token', token)
        .send({
          title: 'Article Mis à Jour',
          content: 'Contenu mis à jour.',
        });
  
      // Vérifier le code de réponse
      expect(res.status).toBe(200);
  
      // Vérifier le corps de la réponse
      expect(res.body.title).toBe('Article Mis à Jour');
      expect(res.body.content).toBe('Contenu mis à jour.');
    });
  
    // Test de suppression d’un article
    it('should delete an existing article', async () => {
      // Données de l'article supprimé
      const deletedArticle = {
        _id: '60e8f1a2c8b4a42c3c4d1235',
        title: 'Mon Nouvel Article',
        content: 'Ceci est le contenu de mon article.',
        user: fakeUser._id,
        status: 'published',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      // Mock de la méthode findByIdAndDelete de Mongoose pour retourner l'article supprimé
      mockingoose(Article).toReturn(deletedArticle, 'findOneAndDelete');
  
      // Envoyer une requête DELETE pour supprimer l'article
      const res = await request(app)
        .delete('/api/articles/60e8f1a2c8b4a42c3c4d1235') // Assurez-vous que l'ID est correct
        .set('x-access-token', token);
  
      // Vérifier le code de réponse
      expect(res.status).toBe(200);
  
      // Vérifier le corps de la réponse
      expect(res.body.message).toBe('Article supprimé avec succès');
      expect(res.body.deletedArticle._id).toBe('60e8f1a2c8b4a42c3c4d1235');
    });
  
  });
    
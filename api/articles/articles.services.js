 const Article = require('../articles/articles.schema');
 const mongoose = require('mongoose');

// Méthode pour créer un article
async function createArticle(data) {
  try {
    const newArticle = new Article({
      title: data.title,
      content: data.content,
      user: data.user,
      status: data.status || 'draft', 
    });
    const savedArticle = await newArticle.save();
    return savedArticle;
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'article: ${error.message}`);
  }
}

async function updateArticle(id, data) {
  const updatedArticle = await Article.findByIdAndUpdate(id, data, { new: true });
  return updatedArticle;
}


async function getArticlesByUser(userId) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('ID utilisateur invalide');
  }
  return await Article.find({ user: userId }).populate('user');
}



// Méthode pour supprimer un article
async function deleteArticle(articleId) {
  try {
    const deletedArticle = await Article.findByIdAndDelete(articleId);

    if (!deletedArticle) {
      throw new Error('Article non trouvé');
    }

    return deletedArticle;
  } catch (error) {
    throw new Error(`Erreur lors de la suppression de l'article: ${error.message}`);
  }
}



module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticlesByUser
};

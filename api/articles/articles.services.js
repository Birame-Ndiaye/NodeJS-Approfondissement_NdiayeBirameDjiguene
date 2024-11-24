 const Article = require('../articles/articles.schema');

// Méthode pour créer un article
async function createArticle(data) {
  try {
    const newArticle = new Article({
      title: data.title,
      content: data.content,
      user: data.user,
      status: data.status || 'draft', // Par défaut à 'draft' si non spécifié
    });
    const savedArticle = await newArticle.save();
    return savedArticle;
  } catch (error) {
    throw new Error(`Erreur lors de la création de l'article: ${error.message}`);
  }
}
async function getArticlesByUser(userId) {
  try {
    const articles = await Article.find({ author: userId })
      .populate('user', '-password -__v') // Exclure le mot de passe et __v
      .exec();
    return articles;
  } catch (err) {
    throw err;
  }
}

// Méthode pour mettre à jour un article
async function updateArticle(articleId, data) {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        title: data.title,
        content: data.content,
        user: data.user,
        status: data.status,
      },
      { new: true, runValidators: true } // Options pour retourner le document mis à jour et appliquer les validateurs
    );

    if (!updatedArticle) {
      throw new Error('Article non trouvé');
    }

    return updatedArticle;
  } catch (error) {
    throw new Error(`Erreur lors de la mise à jour de l'article: ${error.message}`);
  }
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

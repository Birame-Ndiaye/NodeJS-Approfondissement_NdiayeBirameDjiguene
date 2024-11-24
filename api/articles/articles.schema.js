// const { Schema, model } = require("mongoose");

// const articleSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   content: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User", // Référence à l'utilisateur qui a créé l'article
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['draft', 'published'], // Ajout de l'énumération pour le statut
//     default: 'draft', // Optionnel : définir 'draft' comme valeur par défaut
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = model("Article", articleSchema);
// articles.model.js
const { Schema, model } = require("mongoose");

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // Référence à l'utilisateur qui a créé l'article
    required: true,
  },
  status: {
    type: String,
    enum: ['draft', 'published'], // Ajout de l'énumération pour le statut
    default: 'draft', // Optionnel : définir 'draft' comme valeur par défaut
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Article", articleSchema);

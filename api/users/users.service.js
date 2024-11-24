const User = require("./users.model");
const bcrypt = require("bcrypt");


// class UserService {
//   async getUserById(id) {
//     return await User.findById(id).select('-password');
//   }
//   async getUserByEmail(email) {
//     return await User.findOne({ email: email.toLowerCase() });
//   }
//   getAll() {
//     return User.find({}, "-password");
//   }
//   get(id) {
//     return User.findById(id, "-password");
//   }
//   create(data) {
//     const user = new User(data);
//     return user.save();
//   }
//   update(id, data) {
//     return User.findByIdAndUpdate(id, data, { new: true });
//   }
//   delete(id) {
//     return User.deleteOne({ _id: id });
//   }
//   async checkPasswordUser(email, password) {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return false;
//     }
//     const bool = await bcrypt.compare(password, user.password);
//     if (!bool) {
//       return false;
//     }
//     return user._id;
//   }
// }
// users.service.js

const userModel= require('./users.model');

class UsersService {
  // Obtenir tous les utilisateurs
  async getAll() {
    return await User.find().select('-password');
  }

  // Obtenir un utilisateur par ID
  async getById(id) {
    return await User.findById(id).select('-password');
  }

  // Créer un nouvel utilisateur
  async create(data) {
    const user = new User(data);
    return await user.save();
  }

  // Mettre à jour un utilisateur
  async update(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true }).select('-password');
  }

  // Supprimer un utilisateur
  async delete(id) {
    return await User.findByIdAndDelete(id);
  }

  // Obtenir un utilisateur par email
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }


  
}



module.exports = new UsersService();


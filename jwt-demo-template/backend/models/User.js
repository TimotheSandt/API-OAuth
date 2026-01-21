const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongodb');

// ============================================
// TODO 3: Fonction pour créer un utilisateur
// ============================================
// Créer une fonction pour insérer un utilisateur dans MongoDB
// AVANT l'insertion, hacher le password avec bcrypt
//
// Étapes:
// 1. Valider les données (email, password, name)
// 2. Générer un salt avec bcrypt.genSalt(10)
// 3. Hacher le password avec bcrypt.hash(password, salt)
// 4. Insérer dans la collection 'users' avec insertOne()
// 5. Retourner l'utilisateur créé (avec _id)
//
// async function createUser(db, { email, password, name }) {
//   // TODO: Valider que email, password et name existent
//
//   // TODO: Hacher le password
//   // const salt = await bcrypt.genSalt(10);
//   // const hashedPassword = await bcrypt.hash(password, salt);
//
//   // TODO: Insérer dans MongoDB
//   // const result = await db.collection('users').insertOne({
//   //   email: email.toLowerCase().trim(),
//   //   password: hashedPassword,
//   //   name: name.trim(),
//   //   createdAt: new Date()
//   // });
//
//   // TODO: Retourner l'utilisateur créé
//   // return { _id: result.insertedId, email, name, createdAt: new Date() };
// }

// ============================================
// TODO 4: Fonction pour trouver un utilisateur
// ============================================
// Créer une fonction pour trouver un utilisateur par email
//
// async function findUserByEmail(db, email) {
//   // TODO: Utiliser db.collection('users').findOne({ email: ... })
// }

// ============================================
// TODO 5: Fonction pour trouver par ID
// ============================================
// Créer une fonction pour trouver un utilisateur par _id
//
// async function findUserById(db, userId) {
//   // TODO: Utiliser db.collection('users').findOne({ _id: new ObjectId(userId) })
// }

// ============================================
// TODO 6: Fonction comparePassword
// ============================================
// Créer une fonction pour comparer un password en clair avec un hash
//
// async function comparePassword(plainPassword, hashedPassword) {
//   // TODO: Utiliser bcrypt.compare(plainPassword, hashedPassword)
// }

// ============================================
// TODO 7: Fonction pour retourner user sans password
// ============================================
// Créer une fonction utilitaire pour exclure le password d'un objet user
//
// function userWithoutPassword(user) {
//   // TODO: Créer une copie de user et supprimer la propriété password
//   // const { password, ...userWithoutPass } = user;
//   // return userWithoutPass;
// }

module.exports = {
  // À décommenter après implémentation:
  // createUser,
  // findUserByEmail,
  // findUserById,
  // comparePassword,
  // userWithoutPassword
};

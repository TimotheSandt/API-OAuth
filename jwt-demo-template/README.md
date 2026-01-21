# 🎓 JWT Demo - Template TP

> **Application complète Vue.js + Express + MongoDB avec authentification JWT**
> **BUT Info S4 - R401 - 2025-2026**

---

## 📋 Vue d'Ensemble

Ce template vous permet de construire une application web complète avec authentification JWT stateless :

- **Backend** : Express.js + MongoDB + JWT
- **Frontend** : Vue.js 3 + Vue Router + Axios
- **Architecture** : Stateless (pas de session serveur)
- **Stockage** : JWT dans `localStorage` du navigateur

**Votre objectif** : Compléter les **18 TODOs** pour créer un système d'authentification JWT fonctionnel.

---

## 🏗️ Architecture

```
┌─────────────────┐          ┌─────────────────┐          ┌─────────────────┐
│   Vue.js SPA    │          │  Express Server │          │    MongoDB      │
│   (Port 5173)   │ ◄────►   │   (Port 3000)   │ ◄────►   │ (Port 27017)    │
│                 │   HTTP   │                 │   CRUD   │                 │
│ localStorage:   │          │  JWT Verify     │          │  Users only     │
│ - accessToken   │          │  (Stateless)    │          │  (No tokens!)   │
└─────────────────┘          └─────────────────┘          └─────────────────┘
```

### Flux d'authentification

1. **Inscription/Login** → Backend génère JWT → Frontend stocke dans `localStorage`
2. **Requêtes protégées** → Frontend envoie JWT dans header `Authorization: Bearer ...`
3. **Backend vérifie JWT** → Si valide, retourne les données → Sinon 401 Unauthorized
4. **Pas de session** → Le serveur ne stocke rien, tout est dans le token

---

## 📁 Structure du Projet

```
jwt-demo-template/
├── backend/
│   ├── models/
│   │   └── User.js              # TODO 3, 4, 5, 6, 7
│   ├── middleware/
│   │   └── auth.js              # TODO 8
│   ├── routes/
│   │   └── auth.js              # TODO 9, 10, 11
│   ├── .env                     # Configuration (FOURNI)
│   ├── server.js                # TODO 1, 2
│   └── package.json             # Dépendances (FOURNI)
│
└── frontend/
    ├── src/
    │   ├── views/
    │   │   ├── Register.vue     # TODO 15
    │   │   ├── Login.vue        # TODO 16
    │   │   └── Home.vue         # TODO 17, 18
    │   ├── services/
    │   │   └── api.js           # TODO 12, 13, 14
    │   ├── router/
    │   │   └── index.js         # TODO 14
    │   ├── App.vue              # Racine (FOURNI)
    │   ├── main.js              # Point d'entrée (FOURNI)
    │   └── style.css            # CSS (FOURNI)
    ├── index.html               # HTML racine (FOURNI)
    ├── vite.config.js           # Config Vite (FOURNI)
    └── package.json             # Dépendances (FOURNI)
```

---

## 🎯 Liste des TODOs

### 📦 Backend (11 TODOs)

#### **Fichier: `backend/server.js`**

- **TODO 1** : Configuration CORS
  - Configurer `corsOptions` pour autoriser le frontend (`http://localhost:5173`)
  - Activer `credentials: true`

- **TODO 2** : Connexion MongoDB
  - Créer un client avec `new MongoClient(process.env.MONGODB_URI)`
  - Se connecter avec `client.connect()`
  - Stocker la référence dans `app.locals.db = client.db()`

#### **Fichier: `backend/models/User.js`**

- **TODO 3** : Fonction `createUser(db, { email, password, name })`
  - Hacher le password avec `bcrypt.genSalt()` et `bcrypt.hash()`
  - Insérer dans la collection 'users' avec `insertOne()`
  - Retourner l'utilisateur créé (avec `_id`)

- **TODO 4** : Fonction `findUserByEmail(db, email)`
  - Utiliser `db.collection('users').findOne({ email })`

- **TODO 5** : Fonction `findUserById(db, userId)`
  - Utiliser `db.collection('users').findOne({ _id: new ObjectId(userId) })`

- **TODO 6** : Fonction `comparePassword(plainPassword, hashedPassword)`
  - Utiliser `bcrypt.compare()` pour comparer

- **TODO 7** : Fonction `userWithoutPassword(user)`
  - Retourner une copie de l'objet user sans la propriété password

#### **Fichier: `backend/middleware/auth.js`**

- **TODO 8** : Middleware `authenticateToken`
  - Extraire le token du header `Authorization` (format: `Bearer TOKEN`)
  - Vérifier et décoder avec `jwt.verify(token, process.env.JWT_SECRET)`
  - Récupérer l'utilisateur avec `findUserById(req.app.locals.db, userId)`
  - Exclure le password avec `userWithoutPassword()`
  - Ajouter à `req.user` et appeler `next()`
  - Gérer les erreurs : `TokenExpiredError` (401), `JsonWebTokenError` (403)

#### **Fichier: `backend/routes/auth.js`**

- **TODO 9** : Route `POST /register`
  - Récupérer `db` depuis `req.app.locals.db`
  - Valider les champs requis
  - Vérifier que l'email n'existe pas avec `findUserByEmail(db, email)`
  - Créer l'utilisateur avec `createUser(db, { email, password, name })`
  - Générer un token JWT avec `generateToken(user._id)`
  - Retourner le token et l'utilisateur (sans password)

- **TODO 10** : Route `POST /login`
  - Récupérer `db` depuis `req.app.locals.db`
  - Trouver l'utilisateur avec `findUserByEmail(db, email)`
  - Comparer le password avec `comparePassword(password, user.password)`
  - Si valide, générer un token JWT
  - Retourner le token et l'utilisateur (sans password)

- **TODO 11** : Route `GET /profile` (protégée)
  - Utiliser le middleware `authenticateToken`
  - Retourner `req.user` (ajouté par le middleware)

---

### 🎨 Frontend (7 TODOs)

#### **Fichier: `frontend/src/services/api.js`**

- **TODO 12** : Intercepteur de requête Axios
  - Récupérer le token de `localStorage.getItem('accessToken')`
  - Si le token existe, l'ajouter au header : `config.headers.Authorization = 'Bearer ' + token`

- **TODO 13** : Intercepteur de réponse Axios
  - Détecter les erreurs 401 (`error.response?.status === 401`)
  - Supprimer `accessToken` et `user` de localStorage
  - Rediriger vers `/login` avec `window.location.href`

- **TODO 14** : Service `authService`
  - **`register(userData)`** : Appeler `POST /auth/register`, sauvegarder token et user
  - **`login(credentials)`** : Appeler `POST /auth/login`, sauvegarder token et user
  - **`logout()`** : Supprimer token et user de localStorage
  - **`getProfile()`** : Appeler `GET /auth/profile`
  - **`isAuthenticated()`** : Retourner `true` si token existe
  - **`getCurrentUser()`** : Récupérer et parser l'utilisateur depuis localStorage

#### **Fichier: `frontend/src/router/index.js`**

- **TODO 15** : Navigation Guard
  - Implémenter `router.beforeEach((to, from, next) => { ... })`
  - Si route nécessite auth (`requiresAuth`) ET non connecté → rediriger `/login`
  - Si route nécessite guest (`requiresGuest`) ET connecté → rediriger `/home`
  - Sinon laisser passer avec `next()`

#### **Fichier: `frontend/src/views/Register.vue`**

- **TODO 16** : Méthode `handleRegister`
  - Appeler `authService.register(this.form)`
  - En cas de succès : afficher message et rediriger vers `/home`
  - En cas d'erreur : afficher le message d'erreur

#### **Fichier: `frontend/src/views/Login.vue`**

- **TODO 17** : Méthode `handleLogin`
  - Appeler `authService.login(this.form)`
  - En cas de succès : afficher message et rediriger vers `/home`
  - En cas d'erreur : afficher le message d'erreur

#### **Fichier: `frontend/src/views/Home.vue`**

- **TODO 18** : Hook `mounted()` + Méthodes
  - **`mounted()`** : Récupérer l'utilisateur actuel et appeler `fetchProfile()`
  - **`fetchProfile()`** : Appeler `authService.getProfile()` et stocker dans `this.profile`
  - **`handleLogout()`** : Appeler `authService.logout()` et rediriger vers `/login`

---

## 🚀 Installation et Lancement

### Prérequis

- Node.js 18+ installé
- MongoDB installé et démarré sur `localhost:27017`

### 1. Installation Backend

```bash
cd backend
npm install
npm start
```

Le serveur démarre sur **http://localhost:3000**

### 2. Installation Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application démarre sur **http://localhost:5173**

---

## 🧪 Tests

### Test Backend (avec curl)

```bash
# 1. Inscription
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123","name":"Test User"}'

# 2. Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'

# 3. Profil (remplacer YOUR_TOKEN)
curl -X GET http://localhost:3000/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Test Frontend

1. Ouvrir **http://localhost:5173**
2. S'inscrire avec un compte test
3. Se connecter
4. Vérifier que la page Home affiche le profil
5. Tester le bouton "Déconnexion"
6. Vérifier les redirections automatiques

---

## 📊 Validation des Acquis

### Checklist Backend ✅

- [ ] MongoDB se connecte correctement
- [ ] CORS autorise les requêtes depuis Vue.js
- [ ] Le password est haché avant sauvegarde
- [ ] L'inscription crée un utilisateur et retourne un JWT
- [ ] Le login vérifie le password et retourne un JWT
- [ ] Le middleware `authenticateToken` extrait et vérifie le JWT
- [ ] La route `/profile` nécessite un JWT valide
- [ ] Les erreurs JWT sont gérées (401 pour token expiré, 403 pour invalide)

### Checklist Frontend ✅

- [ ] Axios ajoute automatiquement le JWT aux requêtes (intercepteur)
- [ ] Les erreurs 401 déconnectent automatiquement l'utilisateur
- [ ] L'inscription fonctionne et redirige vers `/home`
- [ ] Le login fonctionne et redirige vers `/home`
- [ ] La page Home affiche le profil utilisateur
- [ ] Le bouton "Déconnexion" fonctionne
- [ ] Les routes protégées redirigent vers `/login` si non connecté
- [ ] Impossible d'accéder à `/login` ou `/register` si déjà connecté

### Checklist Architecture JWT ✅

- [ ] Le JWT est stocké dans `localStorage` (pas de cookie httpOnly ici)
- [ ] Le serveur ne stocke **aucune session**
- [ ] MongoDB ne contient **que les utilisateurs**, pas de tokens
- [ ] Le token expire après 1 heure (`JWT_EXPIRES_IN=1h`)
- [ ] Le système est **stateless** (le serveur ne garde aucun état)

---

## 🔑 Concepts Clés à Maîtriser

### JWT (JSON Web Token)

- **Structure** : `header.payload.signature`
- **Génération** : `jwt.sign({ userId }, SECRET, { expiresIn })`
- **Vérification** : `jwt.verify(token, SECRET)`
- **Avantage** : Stateless, scalable, pas de session serveur

### Bcrypt

- **Hachage** : `bcrypt.hash(password, saltRounds)`
- **Comparaison** : `bcrypt.compare(plainPassword, hashedPassword)`
- **Sécurité** : Impossible de "décoder" un hash, seulement comparer

### Axios Interceptors

- **Request** : Modifier toutes les requêtes avant envoi (ajouter JWT)
- **Response** : Gérer toutes les réponses/erreurs (déconnecter si 401)

### Vue Router Guards

- **beforeEach** : Vérifier l'authentification avant chaque navigation
- **meta** : Stocker des métadonnées (requiresAuth, requiresGuest)

### localStorage

- **Stockage** : `localStorage.setItem('key', 'value')`
- **Récupération** : `localStorage.getItem('key')`
- **Suppression** : `localStorage.removeItem('key')`

---

## 🛠️ Dépannage

### Erreur CORS

**Problème** : `Access to XMLHttpRequest ... has been blocked by CORS policy`
**Solution** : Vérifier que `corsOptions` dans `server.js` autorise `http://localhost:5173`

### MongoDB ne se connecte pas

**Problème** : `MongoServerError: connect ECONNREFUSED`
**Solution** : Lancer MongoDB avec `mongod` ou vérifier que le service est démarré

### Token expiré immédiatement

**Problème** : Le token expire dès la création
**Solution** : Vérifier `JWT_EXPIRES_IN=1h` dans `.env` (pas `1H` ou `60m`)

### Redirections infinies

**Problème** : La page redirige en boucle
**Solution** : Vérifier la logique du navigation guard (TODO 12)

### Token non envoyé

**Problème** : Le header `Authorization` est vide
**Solution** : Vérifier l'intercepteur de requête Axios (TODO 9)

---

## 📚 Ressources Supplémentaires

### Documentation officielle

- [Express.js](https://expressjs.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/current/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Vue.js 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)

### Exemples complets

Consultez le dossier `../exemples-presentation/` pour 5 exemples JS complets :

1. `1-basic-jwt.js` : Utilisation basique de JWT
2. `2-simple-api-jwt.js` : API minimale avec JWT
3. `3-passport-local.js` : Passport Local Strategy
4. `4-passport-jwt.js` : Passport JWT + RBAC
5. `5-refresh-token.js` : Pattern Refresh Token complet

---

## 💡 Conseils

### Ordre de travail recommandé

1. **Backend d'abord** (TODOs 1-8)
   - Commencez par `server.js` (CORS + MongoDB)
   - Puis `User.js` (hachage de password)
   - Ensuite `auth.js` middleware (vérification JWT)
   - Terminez par `routes/auth.js` (register, login, profile)
   - **Testez avec curl** avant de passer au frontend

2. **Frontend ensuite** (TODOs 9-17)
   - Commencez par `api.js` (intercepteurs + authService)
   - Puis `router/index.js` (navigation guard)
   - Ensuite les vues : `Register.vue`, `Login.vue`, `Home.vue`
   - **Testez dans le navigateur** avec les DevTools

### Débogage

- **Backend** : `console.log()` dans les routes et middlewares
- **Frontend** : Console du navigateur (F12) pour voir les requêtes Axios
- **Network** : Onglet Network pour voir les headers et réponses
- **localStorage** : Application → Storage → Local Storage dans DevTools

### Validation progressive

Testez **après chaque TODO complété** :

- TODO 1-2 → `curl http://localhost:3000/` doit retourner JSON
- TODO 3-4 → Créez un utilisateur manuellement dans MongoDB, testez comparePassword
- TODO 5 → Testez avec un token valide/invalide/expiré
- TODO 6-7 → Testez register et login avec curl
- TODO 8 → Testez `/profile` avec un token valide
- TODO 9-11 → Ouvrez la console, vérifiez les headers des requêtes
- TODO 12 → Testez les redirections manuellement dans l'URL
- TODO 13-17 → Testez le flow complet : register → login → home → logout

---

## ⚠️ Notes Importantes

### Sécurité en Production

Ce projet est **éducatif**. En production :

- ✅ **Ne JAMAIS** commiter de fichier `.env` avec des secrets réels
- ✅ Utiliser des secrets longs et aléatoires (min 256 bits)
- ✅ Activer HTTPS (TLS/SSL)
- ✅ Utiliser `httpOnly` cookies pour stocker le JWT (pas localStorage)
- ✅ Implémenter des Refresh Tokens pour renouveler l'Access Token
- ✅ Ajouter un système de révocation de tokens
- ✅ Limiter les tentatives de login (rate limiting)
- ✅ Valider et sanitiser toutes les entrées utilisateur

### localStorage vs httpOnly Cookies

**Ce projet utilise `localStorage` pour la simplicité pédagogique.**

**En production**, préférez les **httpOnly cookies** pour stocker le JWT :

- ✅ Protection contre XSS (JavaScript ne peut pas lire le cookie)
- ✅ Envoi automatique du cookie par le navigateur
- ❌ Nécessite de gérer CSRF (utiliser `sameSite: 'strict'`)

---

**Bon courage pour ce TP ! 🚀**

**BUT Info S4 - R401 - Année Universitaire 2025-2026**

require('dotenv').config(); // charge les variables définies dans le fichier .env

const express = require("express"); // importe la bibliothèque Express
const argon2 = require("argon2"); // importe la bibliothèque Argon2
const app = express(); // crée une instance de l'application Express
const port = 3000; // définit le port sur lequel le serveur écoutera
const jwt = require("jsonwebtoken"); // importe la bibliothèque jsonwebtoken

app.use(express.json()); // utilise le middleware express.json() pour parser les corps de requête en JSON

// Définir un tableau d'objets pour stocker les utilisateurs
let users = [
    { id: 1, name: 'Cloud', email: 'cloud@example.com', password: "jjk13" },
    { id: 2, name: 'Jotaro', email: 'jotaro@example.com', password: "jojo13" }
];

// Middleware de vérification du token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Route pour récupérer les utilisateurs
app.get("/users", authenticateToken, (req, res) => {
    res.json(users);
});

// Route pour créer un utilisateur
app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password);

        const newUser = {
            id: users.length + 1,
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        };
        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ user: newUser, token: token });
    } catch (err) {
        res.status(500).send('Erreur lors du hachage du mot de passe');
    }
});

// Route pour modifier un utilisateur
app.put("/users/:id", authenticateToken, (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        res.json(user);
    } else {
        res.status(404).send("Utilisateur non trouvé");
    }
});

// Route pour supprimer un utilisateur
app.delete("/users/:id", authenticateToken, (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});

// Démarrer le serveur et écouter sur le port spécifié
app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});

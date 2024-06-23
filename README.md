# formExpress

# README

## Description
Cette application est un serveur Express simple qui permet de gérer des utilisateurs. Les utilisateurs peuvent être créés, récupérés, mis à jour et supprimés. Le serveur utilise Argon2 pour le hachage des mots de passe et JSON Web Tokens (JWT) pour l'authentification des utilisateurs.

## Prérequis
- Node.js
- npm (Node Package Manager)

## Installation
1. Clonez ce dépôt :
    ```bash
    git clone <url-du-repo>
    ```

2. Accédez au répertoire du projet :
    ```bash
    cd <nom-du-repertoire>
    ```

3. Installez les dépendances :
    ```bash
    npm install
    ```

4. Créez un fichier `.env` à la racine du projet et ajoutez-y la clé secrète JWT :
    ```env
    JWT_SECRET=your_jwt_secret_key
    ```

## Utilisation
1. Démarrez le serveur :
    ```bash
    node <nom-du-fichier>.js
    ```

2. Le serveur sera exécuté sur `http://localhost:3000`.

## Routes

### Récupérer les utilisateurs
- **URL** : `/users`
- **Méthode** : `GET`
- **Headers** : 
    - `Authorization: Bearer <token>`
- **Réponse** : 
    ```json
    [
        {
            "id": 1,
            "name": "Cloud",
            "email": "cloud@example.com",
            "password": "hashed_password"
        },
        {
            "id": 2,
            "name": "Jotaro",
            "email": "jotaro@example.com",
            "password": "hashed_password"
        }
    ]
    ```

### Créer un utilisateur
- **URL** : `/users`
- **Méthode** : `POST`
- **Body** : 
    ```json
    {
        "name": "Nom",
        "email": "email@example.com",
        "password": "mot_de_passe"
    }
    ```
- **Réponse** : 
    ```json
    {
        "user": {
            "id": 3,
            "name": "Nom",
            "email": "email@example.com",
            "password": "hashed_password"
        },
        "token": "jwt_token"
    }
    ```

### Modifier un utilisateur
- **URL** : `/users/:id`
- **Méthode** : `PUT`
- **Headers** : 
    - `Authorization: Bearer <token>`
- **Body** : 
    ```json
    {
        "name": "Nouveau Nom",
        "email": "nouveau_email@example.com"
    }
    ```
- **Réponse** : 
    ```json
    {
        "id": 1,
        "name": "Nouveau Nom",
        "email": "nouveau_email@example.com",
        "password": "hashed_password"
    }
    ```

### Supprimer un utilisateur
- **URL** : `/users/:id`
- **Méthode** : `DELETE`
- **Headers** : 
    - `Authorization: Bearer <token>`
- **Réponse** : 
    ```json
    {
        "id": 1,
        "name": "Cloud",
        "email": "cloud@example.com",
        "password": "hashed_password"
    }
    ```

## Middleware

### authenticateToken
Ce middleware vérifie la présence et la validité d'un token JWT dans les en-têtes de la requête. Si le token est valide, les informations de l'utilisateur sont ajoutées à l'objet de la requête (`req.user`).

## Auteur
- **Votre Nom**

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus d'informations.

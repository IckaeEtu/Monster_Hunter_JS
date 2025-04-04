# Monster Hunter JS - Gestionnaire de Chasseurs et d'Équipements

Ce projet est une application web complète de gestion de chasseurs, inspirée de l'univers de Monster Hunter. Elle permet aux utilisateurs de créer et de gérer des profils de chasseurs, de chasser des monstres dans divers environnements, et de fabriquer des équipements puissants à partir des matériaux récoltés.

## Fonctionnalités Principales

* **Gestion des Chasseurs (Fonctionnalités Actuelles) :**
    * **Liste des Chasseurs :** Affichage d'une liste complète des chasseurs créés, permettant une vue d'ensemble rapide de vos personnages.
    * **Favoris :** Possibilité d'ajouter des chasseurs à votre liste de favoris pour un accès rapide et facile.

* **Fonctionnalités en Développement :**
    * **Création de Profils Détaillés :**
        * Nom du chasseur
        * Spécialisation (Épéiste, Artilleur, Soutien)
        * Arme de base
        * Armure de base
        * Sélection multiple de monstres favoris
    * **Modification et Suppression de Profils :** Options pour modifier et supprimer les profils de chasseurs existants, offrant une gestion complète de vos personnages.

**Note :** Les fonctionnalités de création, modification et suppression de profils de chasseurs sont en cours d'implémentation. Je n'arrive pas à fixer un bug lié au type d'arme quand j'essaie de créer ou de modifier un chasseur dans le JSON.

* **Chasse de Monstres :**
    * Chasser des monstres dans différents environnements.
    * Gestion des matériaux récoltés sur les monstres vaincus.
    * Système de coffre pour stocker les composants et les matériaux.

* **Création d'Équipements :**
    * Fabrication d'armes et d'armures à partir des matériaux récoltés.
    * Gestion de l'inventaire des équipements disponibles.
    * Équipement des chasseurs avec les armes et armures créées.

* **Interface Utilisateur :**
    * Interface intuitive et conviviale pour une expérience utilisateur optimale.

## Technologies Utilisées

* HTML
* CSS
* JavaScript

## Arborescence du Projet et Description des Dossiers

* **assets/** : Contient toutes les ressources statiques du projet.
    * **data/** : Stocke les données du jeu au format JSON (`data_mh.json`).
    * **icons/** : Contient les icônes utilisées dans l'interface utilisateur.
* **style/** : Stocke les fichiers CSS pour la mise en forme de l'application (`style.css`).
    * **images/** : Contient les images utilisées dans l'interface utilisateur.

* **utils/** : Contient des fonctions utilitaires JavaScript réutilisables.
    * `favorisChasseurs.js` : Gestion des chasseurs favoris.
    * `inventaire.js` : Gestion de l'inventaire des joueurs.
    * `storage.js` : Gestion du stockage des données (local storage, API, etc.).

* **views/** : Contient les différentes vues (pages) de l'application.
    * **armures/** : Vues liées à la gestion des armures.
    * **chasseurs/** : Vues liées à la gestion des chasseurs.
    * **coffres/** : Vues liées à la gestion des coffres de stockage.
    * **common/** : Composants d'interface utilisateur réutilisables.
    * **environnements/** : Vues liées à la gestion des environnements de chasse.
    * **equipements/** : Vues liées à la gestion des équipements.
    * **favoris/** : Vues liées à la gestion des favoris.
    * **models/** : Modèles de données JavaScript (`Arme.js`, `Armure.js`, `Chasseur.js`, `Environnement.js`, `Monstre.js`, `Type.js`).
    * **monstres/** : Vues liées à la gestion des monstres.
    * **quetes/** : Vues liées à la gestion des quêtes.
    * **terraindechasse/** : Vues liées à la gestion des terrains de chasse.

* **app.js** : Fichier JavaScript principal de l'application.
* **config.js** : Fichier de configuration de l'application.
* **index.html** : Fichier HTML principal de l'application.
* **provider.js** : Gestion des données (API, etc.).

## Installation

1. Clonez le dépôt : `git clone <URL_du_dépôt>`
2. Ouvrez le projet dans un serveur local, par exemple avec `php -S localhost:8000`.
3. Ouvrez votre navigateur web et accédez à l'adresse du serveur.

## Contributeurs

* RIEGO Mickael - [@IckaeEtu](https://github.com/IckaeEtu)
* DORÉ Benjamin - [@ArKoSs145](https://github.com/ArKoSs145)

## Comment Contribuer

Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/nouvelle-fonctionnalite`).
3. Commitez vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`).
4. Pushez à la branche (`git push origin feature/nouvelle-fonctionnalite`).
5. Ouvrez une Pull Request.
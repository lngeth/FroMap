# Site web : FroMap :cheese:

## Description

Projet en binome, jeu culturel sur les différents fromages produits en France. On les retrouve sur une carte du monde affichant les régions françaises contenant des fromages spécifiques.

## Concept du jeu

*L'accès au jeu requiert l'authentification de l'utilisateur à notre base de donnée Firebase. Il pourra s'inscrire via un lien de connexion dans la barre de navigation.*

L’utilisateur clique sur une région et doit choisir le bon lait utilisé pour la conception d'un fromage de la région choisie.  
Il y a trois choix de lait possibles: 
- chèvre :goat:
- brebis :sheep:
- vache :cow:

Si la bonne réponse a été choisie, l'utilisateur gagne 10 points sinon il en perd 5.   
Son solde de point est enregistré dans une base de données Firestore lié avec son compte utilisateur.

## Installation

1. Cloner le projet sur votre machine
2. Ouvrer le dossier avec votre IDE préféré
3. Ouvrer 1 terminal à la racine du projet
4. Dans le premier terminal, lancer la commande suivante :
```text
npm install
-- Cela permet d'installer toutes les dépendances nécessaires pour le projet --
```
5. Ensuite, lancer la commande suivante :
```text
npm run serve
-- Lancement du serveur sur le localhost au port 8080 --
```
6. Un lien sera disponible dans le terminal, cliquer dessus (un navigateur s'ouvrira)
7. Amusez-vous :yum:

## Modules utilisés
- __Firebase__ : pour le Back-end
- __Axios__ : pour les requètes HTTP sur des API externes (comme Opendatasoft)
- __Vue-router__ : pour la gestion des routes
- __Bootstrap CSS/JS__ : pour le visuel du site

## Contexte de la réalisation du projet

Ce site a été réalisé dans le cadre d'un projet noté pour le module de Programmation Web (PWEB).  
Les images récupérées ont uniquement un but éducatif et non commercial.

## Auteurs

:bear: Laurent NGETH
[GitHub](https://github.com/lngeth)
[LinkedIn](https://www.linkedin.com/in/laurentngeth/)  
:boy: Thomas ROBERT
[GitHub](https://github.com/thmsrbrt)
[LinkedIn](https://www.linkedin.com/in/thomas-robert1/)

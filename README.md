# Endagri

![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg) 

Cette application à l'application web Endagri

## Pour commencer

Ces instructions vous permettront d'obtenir une copie du projet sur votre machine locale à des fins de développement et de test. Consultez la section "Déploiement" pour obtenir des notes sur la manière de déployer le projet sur un système réel. Cette application nécessite d'avoir installer node et npm dans leur version LTS, et idéalement yarn.

### Installation

Une série d'exemples qui vous expliquent, étape par étape, comment faire fonctionner un environnement de développement

#### Clôner le code
```
git clone https://github.com/agrarian-systems-consulting/endagri-front.git
```
#### Installer les dépendances avec yarn
Il est également possible d'utiliser npm pour installer les dépendances et lancer tous les scripts décrits ci-après. Yarn étant plius performant, cette technologie est recommandée.

```
cd endagri-front
yarn install
```
#### Exécuter en mode développement
Le mode développement exécute le code en temps réel et rafraichit l'application à chaque changement enregistré dans le code. Il dispose également de fonctions de log plus complètes qu'en production.
```
yarn start
```


## Déploiement
```
yarn build
npm install -g serve

```
Ceci a pour effet de créer un dossier build qui contient le code de production a déployer.
Il est ensuite possible de lancer la version prod grâce à la commande suivante.
```
serve -s build
```
Pour en savoir plus sur le déploiement d'une appli React,  https://create-react-app.dev/docs/deployment/

## Built With

- [Express](https://expressjs.com/fr/) - Le framework utilisé pour construire l'API



# Endagri

![BuildStatus](https://img.shields.io/badge/Build-Passing-brightgreen.svg) 

Cette application à l'application web Endagri

## Pour commencer

Ces instructions vous permettront d'obtenir une copie du projet sur votre machine locale à des fins de développement et de test. Consultez la section "Déploiement" pour obtenir des notes sur la manière de déployer le projet sur un système réel. 

### Prerequisites

Cette application React utilise [yarn](https://yarnpkg.com/) pour la gestion de ses packages. Il doit être possible de les gérer avec [npm](https://www.npmjs.com/), cependant nous ne pouvons pas garantir du bon fonctionnement de l'application avec npm.

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
_Attention_ : cette application est connectée directement à l'API REST et à la base de données en production.

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

- [React](https://fr.reactjs.org/) - The web framework used
- [Yarn](https://yarnpkg.com/) - Dependency Management
- [React-router](https://reacttraining.com/react-router/web/guides/quick-start) - Routing management in react. Toutes les routes sont accessibles dans `src/app/layout/App.jsx`
- [Semantic-ui-react](https://react.semantic-ui.com/) - Front-end framework
- [Formik](https://github.com/jaredpalmer/formik) - Build forms in React
- [Yup](https://github.com/jquense/yup) - Form validation


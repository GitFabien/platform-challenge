Engineering Challenge — From Code to Container to Infrastructure

## 🚀 Projet et Objectifs
Ce dépôt contient le livrable pour le challenge DevOps, consistant à reprendre une application Node.js existante, corriger un défaut initial, implémenter de nouvelles fonctionnalités via une collaboration rigoureuse sur GitHub (Issues, branches, Pull Requests, revues croisées et protection de la branche `main`), puis automatiser le tout via des pipelines CI/CD (Node.js, Docker et validation Terraform).

---

## 🏗️ Architecture du Projet
L'application repose sur une architecture backend légère construite avec **Express.js** et testée via **node:test**. 
L'infrastructure et le déploiement conteneurisé sont automatisés par **Docker** (poussé sur le registre GHCR) et validés localement via **Terraform**.

---

## 💻 Installation Locale
Pour exécuter l'application en local sur votre machine :

1. Cloner le dépôt :
   ```bash
   git clone [https://github.com/Lyne-vanelle/platform-challenge.git](https://github.com/Lyne-vanelle/platform-challenge.git)
   cd platform-challenge
Installer les dépendances :Bashnpm install
Lancer l'application en mode développement :Bashnpm start
🧪 TestsLe projet intègre des tests unitaires automatisés pour valider chaque route et le comportement global de l'application :Bashnpm test


🐳 Utilisation de DockerPour construire l'image Docker de l'application et la lancer localement :Construire l'image :Bashdocker build -t devops-platform-challenge .
Exécuter le conteneur :Bashdocker run --rm -p 3000:3000 devops-platform-challenge


L'application sera accessible sur http://localhost:3000.🔄 

Explication des Pipelines CI/CDLe dépôt utilise GitHub Actions pour garantir la qualité et automatiser les processus :Node.js CI (node-ci.yml) : S'exécute à chaque Pull Request et push sur main pour installer les dépendances et lancer la suite de tests unitaires.

Docker CI (docker.yml) : Construit l'image et l'authentifie/la pousse vers le registre de conteneurs GitHub (GHCR).Terraform 

Validation (terraform.yml) : Exécute terraform fmt -check, terraform init et terraform validate pour s'assurer de la validité de l'infrastructure (sans déploiement cloud requis).⚙

️ Explication de TerraformTerraform est utilisé pour valider la configuration d'infrastructure de manière statique et locale en CI. Les commandes clés validées automatiquement sont :terraform fmt -check : Vérifie le formatage du code.

terraform init : Initialise les providers et modules.terraform validate : Valide la syntaxe et la cohérence des fichiers de configuration.

📋 Workflow de DéveloppementLe projet respecte une gouvernance stricte :Branches : Interdiction de coder directement sur main. Utilisation de branches de fonctionnalités (feature/...), de corrections (fix/...) ou de maintenance (chore/...).Issues & PR : Chaque modification est liée à une Issue GitHub et passe par une Pull Request utilisant un template standardisé.

Revues : Exigence d'au moins 1 approbation par un autre membre de l'équipe et de tests CI au vert avant tout merge sur main.🛠️ Commandes UtilesActionCommandeInstaller les dépendancesnpm installLancer les testsnpm testDémarrer l'appnpm startBuild Dockerdocker build -t devops-platform-challenge .Run Dockerdocker run --rm -p 3000:3000 devops-platform-challenge
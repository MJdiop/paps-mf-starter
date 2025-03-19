#!/usr/bin/env node

const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];
const gitRepoUrl =
  'https://github.com/paps-app/paps-micro-frontend-app-starter.git';

if (!projectName) {
  console.error(
    'Veuillez spécifier un nom de projet : yarn create paps-mf-starter <nom-projet>'
  );
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);
const git = simpleGit();

console.log(`Clonage du dépôt ${gitRepoUrl} dans ${projectDir}...`);

git.clone(gitRepoUrl, projectDir, (err) => {
  if (err) {
    console.error('Erreur lors du clonage du dépôt :', err);
    process.exit(1);
  }

  // Supprime le dossier .git pour ne pas hériter de l'historique Git
  const gitFolder = path.join(projectDir, '.git');
  fs.rmSync(gitFolder, { recursive: true, force: true });

  console.log('Installation des dépendances...');
  execSync('yarn install', { cwd: projectDir, stdio: 'inherit' });

  console.log(`Projet ${projectName} créé avec succès !`);
});

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const projectName = process.argv[2];

if (!projectName) {
  console.error(
    'Veuillez spécifier un nom de projet : yarn create paps-mf-starter <nom-projet>'
  );
  process.exit(1);
}

const projectDir = path.resolve(process.cwd(), projectName);

// Crée le dossier du projet
fs.mkdirSync(projectDir, { recursive: true });

// Crée une structure de base
const files = {
  'package.json': JSON.stringify(
    {
      name: projectName,
      version: '1.0.0',
      private: true,
    },
    null,
    2
  ),
  'README.md': `# ${projectName}\n\nProjet créé avec create-paps-mf-starter`,
};

Object.entries(files).forEach(([fileName, content]) => {
  fs.writeFileSync(path.join(projectDir, fileName), content);
});

console.log(`Projet ${projectName} créé avec succès !`);

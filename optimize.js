#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Optimizando proyecto...');

// Limpiar archivos temporales
const tempFiles = [
  'node_modules/.cache',
  'dist',
  '.vite',
  'coverage'
];

tempFiles.forEach(file => {
  if (fs.existsSync(file)) {
    fs.rmSync(file, { recursive: true, force: true });
    console.log(`✅ Eliminado: ${file}`);
  }
});

// Limpiar archivos .map
const findAndDeleteMaps = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findAndDeleteMaps(filePath);
    } else if (file.endsWith('.map')) {
      fs.unlinkSync(filePath);
      console.log(`✅ Eliminado: ${filePath}`);
    }
  });
};

findAndDeleteMaps('.');

console.log('✨ Optimización completada!');
console.log('💡 Ejecuta: npm run dev');

#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurador de Upstash Redis para Revelación de Género\n');

console.log('📋 Pasos para configurar Upstash:');
console.log('');
console.log('1. Ve a https://upstash.com');
console.log('2. Crea una cuenta gratuita');
console.log('3. Crea un nuevo proyecto');
console.log('4. Crea una base de datos Redis');
console.log('5. Copia la URL y el REST Token');
console.log('');

// Leer las variables del usuario
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise(resolve => readline.question(prompt, resolve));

async function setup() {
  try {
    const redisUrl = await question('🔗 Ingresa tu UPSTASH_REDIS_REST_URL: ');
    const redisToken = await question('🔑 Ingresa tu UPSTASH_REDIS_REST_TOKEN: ');
    
    readline.close();
    
    // Crear el archivo .env.local
    const envContent = `# Variables de entorno para Upstash Redis
UPSTASH_REDIS_REST_URL=${redisUrl}
UPSTASH_REDIS_REST_TOKEN=${redisToken}
`;
    
    fs.writeFileSync('.env.local', envContent);
    
    console.log('');
    console.log('✅ ¡Configuración completada!');
    console.log('📁 Se creó el archivo .env.local');
    console.log('🔄 Reinicia tu servidor de desarrollo: npm run dev');
    console.log('');
    console.log('🎯 Tu aplicación ahora usará Upstash Redis para guardar las predicciones');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    readline.close();
  }
}

setup();

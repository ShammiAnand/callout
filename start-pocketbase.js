import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the PocketBase executable
const isWindows = os.platform() === 'win32';
const pocketbasePath = path.join(__dirname, 'pocketbase', isWindows ? 'pocketbase.exe' : 'pocketbase');

// Make sure the executable has the right permissions (not needed on Windows)
if (!isWindows) {
  try {
    fs.chmodSync(pocketbasePath, '755');
    console.log('Set executable permissions for PocketBase');
  } catch (error) {
    console.error('Error setting permissions:', error);
  }
}

// Start PocketBase
const pocketbase = spawn(pocketbasePath, ['serve'], {
  cwd: path.join(__dirname, 'pocketbase'),
});

// Log output
pocketbase.stdout.on('data', (data) => {
  console.log(`PocketBase: ${data}`);
});

pocketbase.stderr.on('data', (data) => {
  console.error(`PocketBase Error: ${data}`);
});

pocketbase.on('close', (code) => {
  console.log(`PocketBase process exited with code ${code}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Stopping PocketBase...');
  pocketbase.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('Stopping PocketBase...');
  pocketbase.kill();
  process.exit();
}); 
import http from 'http';
import { readFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const EAG_ROOT = join(__dirname, '../../');
const DASHBOARD_DIR = join(__dirname, '../dashboard');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

function readDirFiles(dirPath, isSkill = false) {
  if (!existsSync(dirPath)) return [];
  const results = [];
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory() && isSkill) {
      const skillFile = join(fullPath, 'SKILL.md');
      if (existsSync(skillFile)) {
        results.push({
          name: item,
          type: 'skill',
          content: readFileSync(skillFile, 'utf8')
        });
      }
    } else if (stat.isFile() && item.endsWith('.md')) {
      results.push({
        name: item.replace('.md', ''),
        type: 'file',
        content: readFileSync(fullPath, 'utf8')
      });
    }
  }
  return results;
}

export function startDashboardServer(port = 3333) {
  const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      return res.end();
    }

    if (req.url === '/api/data' && req.method === 'GET') {
      try {
        const data = {
          agents: readDirFiles(join(EAG_ROOT, 'agents')),
          skills: readDirFiles(join(EAG_ROOT, 'skills'), true),
          rules: readDirFiles(join(EAG_ROOT, 'rules')),
          workflows: readDirFiles(join(EAG_ROOT, 'workflows')),
          governance: {
            rules: existsSync(join(EAG_ROOT, 'RULES.md')) ? readFileSync(join(EAG_ROOT, 'RULES.md'), 'utf8') : '',
            soul: existsSync(join(EAG_ROOT, 'SOUL.md')) ? readFileSync(join(EAG_ROOT, 'SOUL.md'), 'utf8') : ''
          },
          package: existsSync(join(EAG_ROOT, 'package.json')) ? JSON.parse(readFileSync(join(EAG_ROOT, 'package.json'), 'utf8')) : {},
          plugin: existsSync(join(EAG_ROOT, 'plugin.json')) ? JSON.parse(readFileSync(join(EAG_ROOT, 'plugin.json'), 'utf8')) : {}
        };
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    if (req.url === '/api/doctor' && req.method === 'GET') {
      const eagBin = join(EAG_ROOT, 'bin/eag.js');
      // Adding FORCE_COLOR=1 to capture ANSI colors if needed, but for web we might want to strip or convert them.
      // We'll strip them in the frontend using a simple regex.
      exec(`node "${eagBin}" doctor`, (error, stdout, stderr) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ output: stdout, error: stderr, code: error ? error.code : 0 }));
      });
      return;
    }

    if (req.url === '/api/verify' && req.method === 'POST') {
      const eagBin = join(EAG_ROOT, 'bin/eag.js');
      exec(`node "${eagBin}" verify`, (error, stdout, stderr) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ output: stdout, error: stderr, code: error ? error.code : 0 }));
      });
      return;
    }

    // Static file serving
    let filePath = join(DASHBOARD_DIR, req.url === '/' ? 'index.html' : req.url);
    if (!existsSync(filePath)) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const ext = extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';

    try {
      const content = readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (err) {
      res.writeHead(500);
      res.end(`Server Error: ${err.code}`);
    }
  });

  server.listen(port, () => {
    console.log(`\n🚀 EAG Dashboard server running at http://localhost:${port}`);
  });
  
  return server;
}

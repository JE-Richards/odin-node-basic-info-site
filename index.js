import * as http from 'node:http';
import * as fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
  // base file path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const publicDir = path.join(__dirname, 'public');

  // route handling
  let filepath = '';
  if (req.url === '/') {
    filepath = path.join(publicDir, 'index.html');
  } else if (req.url === '/about') {
    filepath = path.join(publicDir, 'about.html');
  } else if (req.url === '/contact-me') {
    filepath = path.join(publicDir, 'contact-me.html');
  } else {
    filepath = path.join(publicDir, '404.html');
  }

  // returning desired files
  fs.readFile(filepath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 - internal server error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});

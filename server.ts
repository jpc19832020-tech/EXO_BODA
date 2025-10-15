// server.ts - Static Wedding Site Server
import { createServer } from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';

const currentPort = 3000;
const hostname = '0.0.0.0';

// Static file server for wedding site
async function createWeddingServer() {
  try {
    // Create HTTP server that serves the wedding site
    const server = createServer((req, res) => {
      try {
        let filePath = '';
        let contentType = 'text/html';

        // Route handling
        if (req.url === '/' || req.url === '/index.html') {
          filePath = join(process.cwd(), 'index.html');
          contentType = 'text/html';
        } else if (req.url?.endsWith('.css')) {
          filePath = join(process.cwd(), req.url);
          contentType = 'text/css';
        } else if (req.url?.endsWith('.js')) {
          filePath = join(process.cwd(), req.url);
          contentType = 'application/javascript';
        } else if (req.url?.endsWith('.json')) {
          filePath = join(process.cwd(), req.url);
          contentType = 'application/json';
        } else if (req.url?.startsWith('/assets/')) {
          filePath = join(process.cwd(), req.url);
          const ext = req.url.split('.').pop();
          contentType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 
                        ext === 'png' ? 'image/png' : 'image/webp';
        } else {
          // Default to index.html for SPA routing
          filePath = join(process.cwd(), 'index.html');
          contentType = 'text/html';
        }

        // Read and serve the file
        const fileContent = readFileSync(filePath);
        
        res.writeHead(200, {
          'Content-Type': contentType,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        
        res.end(fileContent);
      } catch (error) {
        console.error('Error serving file:', error);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
      }
    });

    // Start the server
    server.listen(currentPort, hostname, () => {
      console.log(`> Wedding site server running at http://${hostname}:${currentPort}`);
      console.log(`> Serving from: ${process.cwd()}`);
    });

  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

// Start the server
createWeddingServer();

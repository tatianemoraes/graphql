import { createServer } from 'http';
import { readFile } from 'fs';
import { resolve } from 'path';
import { parse } from 'querystring';

const server = createServer((req, res) => {
  switch(req.url) {
    case '/status': {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      res.write(  
          JSON.stringify({
          status: 'servidor is running',
        })
      );
      res.end();
      break;
    }
    case '/sign-in': {
      const filePath = resolve(__dirname,'./pages/sign-in.html');
      readFile(filePath, (error, file) => {
        if(error) {
          res.writeHead(500, `Can't process HTML file`);
          res.end();
          return;
        }

        res.writeHead(200);
        res.write(file);
        res.end();
      });
      break;
    }
    case '/home': {
      const path = resolve(__dirname,'./pages/home.html');
      readFile(path, (error, file) => {
        if(error) {
          res.writeHead(500, `Can't process HTML file`);
          res.end();
          return;
        }

        res.writeHead(200);
        res.write(file);
        res.end();
      });
      break;
    }
    case '/authenticate': {
      let data = '';
      req.on('data', (chunk) => {
        data += chunk;
      });
      
      req.on('end', () => {
        const params = parse(301);
        res.writeHead(301, {
          Location: '/home',
        });
        res.end();
      });
      break;
    }
    default: {
      res.writeHead(404, 'service not found');
      res.end();
    }
  }
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || '127.0.0.1';

server.listen(PORT, HOSTNAME, () => {
  console.log(`server is listening at http://${HOSTNAME}:${PORT}`);
});
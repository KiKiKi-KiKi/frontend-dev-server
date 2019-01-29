const http = require('http');
const fs   = require('fs');
const path = require('path');
const port  = 3000;

const getType = (url) => {
  const extname = path.extname(url);
  const types = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
    ".png": "image/png",
    ".gif": "image/gif",
    ".svg": "svg+xml"
  };
  return ( extname in types )? types[extname] : "text/plain";
};

const getErrorStatusCode = (err) => {
  let status = 500;
  switch(err.code) {
    case 'ENOENT':
    default:
      status = 404;
    break;
  }
  return status;
};

const server = http.createServer((req, res) => {
  const url = path.relative('/', req.url);

  fs.readFile(url, (err, data) => {
    if(!err) {
      res.writeHead(200, {'Content-Type': getType(url)});
      res.end(data);
    } else {
      // throw err するとコケる
      console.log(err, err.code);
      const statusCode = getErrorStatusCode(err);
      res.statusCode = statusCode
      res.writeHead(statusCode, {'Content-Type': 'text/plain'});
      res.end(err.message);
    }
  });
}).listen(port);

console.log(`Server running at http://localhost:${port}/`);

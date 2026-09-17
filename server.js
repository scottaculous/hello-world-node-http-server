'use strict';

const fs = require('fs');
const http = require('http');

const host = '0.0.0.0';
const port = Number(process.env.PORT) || 3000;
const index = fs.readFileSync(__dirname + '/index.html', 'utf8');
const favicon = fs.readFileSync(__dirname + '/favicon.ico');

http.createServer(function (req, res) {
  if (req.url === '/healthz') {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('ok');
    return;
  }

  if (req.url.indexOf('favicon') > -1) {
    res.writeHead(200, {'Content-Type': 'image/x-icon'});
    res.end(favicon);
    return;
  }

  const revision = process.env.K_REVISION || 'local';
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(index.replace(/{GIT_COMMIT_HASH}/g, revision));
}).listen(port, host, function () {
  console.log(`Listening on http://${host}:${port}`);
});

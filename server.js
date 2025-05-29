// server.js
const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();

// SSL certificate
const options = {
  key: fs.readFileSync('cert/key.pem'),
  cert: fs.readFileSync('cert/cert.pem')
};

// Serve static files (HTML, JS, MP4, etc.)
app.use(express.static(__dirname + '/public'));

https.createServer(options, app).listen(4433, () => {
  console.log('HTTPS server running at https://localhost:4433');
});

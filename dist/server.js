// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Path to your Swagger folders
const swaggerBase = path.join(__dirname, 'swagger');

app.use(express.static(__dirname)); // serve HTML and JS

// API to list all swagger.json files
app.get('/api/swagger-list', (req, res) => {
  const folders = fs.readdirSync(swaggerBase, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => ({
      name: dirent.name,
      url: `/swagger/${dirent.name}/swagger.json`
    }));
  res.json(folders);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
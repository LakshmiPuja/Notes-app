const http = require('http');
const app = require('./app');
const path = require('path');
const express = require('express');

const port = 3000;
const server = http.createServer(app);

// Serve frontend assets
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

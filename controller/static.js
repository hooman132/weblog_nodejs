var path = require("path");
const express = require("express");
const staticServer = express();

// Serve static files from the 'public' directory
staticServer.use(express.static("public"));

// Serve Bootstrap RTL files from 'node_modules/bootstrap-v4-rtl/dist'
staticServer.use(
  express.static(
    path.join(__dirname, "..", "node_modules", "bootstrap-v4-rtl", "dist")
  )
);
// Serve Bootstrap RTL files from 'node_modules/bootstrap-v4-rtl/dist'
staticServer.use(
  express.static(path.join(__dirname, "..", "node_modules", "jquery", "dist"))
);

// Serve Font Awesome files from 'node_modules/font-awesome/css'
staticServer.use(
  express.static(path.join(__dirname, "..", "node_modules", "font-awesome"))
);

module.exports = { staticServer };

var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

var port = process.env.PORT || 5000;
// eslint-disable-next-line no-console
app.listen(port, () => console.log("server started " + port));

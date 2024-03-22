import express from "express";
import morgan from "morgan";

import fs from "fs";

const app = new express();

// Log-Datei für HTTP-Zugriffe
const accessLogStream = fs.createWriteStream("access.log", { flags: "a" })
app.use(morgan("combined", { stream: accessLogStream })); // combined: Standard-Format von Apache Web-Server

const errorLogStream = fs.createWriteStream("access-error.log", { flags: "a" });
app.use(morgan("combined", {
  stream: errorLogStream,
  skip: function (req, res) { return res.statusCode < 400 }
}));

app.use( express.json() );

const PORT_NUMMER = 8080;
app.listen(PORT_NUMMER, () => {
    console.log(`Web-Server lauscht auf Port ${PORT_NUMMER}.\n`);
});
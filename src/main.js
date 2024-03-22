import express from "express";

import { getLogger } from './logger.js';

const logger = getLogger(import.meta.url);

const app = new express();

// Log-Datei für HTTP-Zugriffe


app.use( express.json() );

const PORT_NUMMER = 8080;
app.listen(PORT_NUMMER, () => {
    logger.info(`Web-Server gestartet auf Port ${PORT_NUMMER}.\n`);
});
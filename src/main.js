import express from "express";

import { getLogger,
         registriereHttpLogger }   from './logger.js';
import { initializeOpenApi }       from './openapi.js';
import { modusName }               from './modus.js';
import { datenbankInitialisieren } from './datenbank.js';

const logger = getLogger(import.meta.url);

const app = new express();
app.use( express.json() );
registriereHttpLogger(app);

initializeOpenApi(app);

logger.info(`Betriebsmodus: ${modusName}`);

await datenbankInitialisieren();



const PORT_NUMMER = 8080;
app.listen(PORT_NUMMER, () => {
    logger.info(`Web-Server gestartet auf Port ${PORT_NUMMER}.\n`);
});
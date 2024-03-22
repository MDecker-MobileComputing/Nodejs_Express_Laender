import { initialize } from "express-openapi";

import { getLogger } from './logger.js';

const logger = getLogger(import.meta.url);


/**
 * OpenAPI initialisieren.
 *
 * @param {*} app Express.js-Objekt
 */
export function initializeOpenApi(app) {

    const istNichtProduktiv = (process.env.NODE_ENV !== "production");

    initialize({
        app,
        apiDoc       : "./doc/api-definition-base.yml",
        paths        : "./src/pfade",
        docsPath     : "/api-definition",
        exposeApiDocs: istNichtProduktiv
      });

    logger.info(`OpenAPI initialisiert (Modus: ${istNichtProduktiv ? "DEV/TEST" : "PRODUCTIV"}).`);
}

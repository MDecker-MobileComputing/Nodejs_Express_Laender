import { initialize } from "express-openapi";

import { getLogger } from './logger.js';
import { istNichtProduktiv } from './modus.js';

const logger = getLogger(import.meta.url);


/**
 * OpenAPI initialisieren.
 * <br><br>
 *
 * Tutorial: https://bump.sh/blog/express-api-openapi
 *
 * @param {*} app Express.js-Objekt
 */
export function initializeOpenApi(app) {

    initialize({
        app,
        apiDoc       : "./doc/api-definition-base.yml",
        paths        : "./src/pfade",
        docsPath     : "/api-definition",
        exposeApiDocs: istNichtProduktiv
      });

    logger.info("OpenAPI initialisiert");
}

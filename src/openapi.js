import { initialize } from "express-openapi";
import swaggerUi      from "swagger-ui-express";
import YAML           from "yamljs";

import { getLogger }         from './logger.js';
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
        docsPath     : "/api-definition", // http://localhost:8080/api/v1/api-definition (JSON-Format)
        exposeApiDocs: istNichtProduktiv
      });

    const swaggerDocument = YAML.load('./doc/api-definition-base.yml');
    app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    logger.info("OpenAPI initialisiert");
}

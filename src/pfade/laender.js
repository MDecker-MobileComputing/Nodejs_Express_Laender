
import { holeAlleLaender }           from "../service.js";
import { neuesLand, sucheLand }      from "../service.js";
import { CUSTOM_HEADER_FEHLER_TEXT } from "../konstanten.js";


/**
 * Operationen für den Pfad "/laender" (Collection).
 * <br><br>
 *
 * Liste der 3-Buchstabencodes für Länder (ISO 3166-1 Alpha 3):
 * https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste
 *
 * @returns Objekt mit den Operationen für den Pfad "/laender"
 */
export default function () {

    // Unterstützte HTTP-Methoden definieren
    const operations = { GET, POST };

    /**
     * Funktion für HTTP-GET-Request auf Collection:
     * Liste aller Länder zurückgeben.
     *
     * Pfad: http://localhost:8080/api/v1/laender
     */
    function GET(req, res, next) {

        const suchString = req.query.q;

        let laenderArray = null;
        if (suchString) {

            laenderArray = sucheLand( suchString );
            if (laenderArray.length === 0) {

                res.setHeader( CUSTOM_HEADER_FEHLER_TEXT,
                               `Kein Land gefunden, das den Suchstring "${suchString}" enthält.` );
            }

        } else {

            laenderArray = holeAlleLaender();
        }

        if (laenderArray.length > 0) {

            res.status( 200 ); // OK
            res.json( laenderArray );

        } else {

            res.status( 404 ); // NOT FOUND
            res.json( laenderArray );
        }
    }


    /**
     * Funktion für HTTP-POST-Request auf Collection:
     * Neues Land anlegen.
     */
    async function POST(req, res, next) {

        const neuLand = {
            code      : req.body.code.trim().toUpperCase(),
            name      : req.body.name.trim(),
            hauptstadt: req.body.hauptstadt.trim(),
            einwohner : req.body.einwohner
        };

        const erfolgreich = await neuesLand( neuLand );
        if (erfolgreich) {

            res.status(201); // 201: CREATED
            res.json( neuLand );

        } else {

            res.status(409); // 409: CONFLICT
            res.setHeader( CUSTOM_HEADER_FEHLER_TEXT,
                           `Land mit Code "${neuLand.code}" existiert bereits.` );
            res.json( {} );
        }
    };


    GET.apiDoc = {
        summary: "Liste aller Länder",
        operationId: "getLaender",
        responses: {
            200: {
                description: "Liste aller Länder",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Land"
                            }
                        }
                    }
                }
            },
        }
    };

    POST.apiDoc = {
        summary: "Neues Land anlegen",
        operationId: "neuesLand",
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/Land'
                    }
                }
            }
        },
        responses: {
            201: {
                description: "Land erfolgreich angelegt",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Land"
                        }
                    }
                }
            },
            409: {
                description: "Land existiert bereits",
                content: {
                    "application/json": {
                        schema: {
                            type: "object"
                        }
                    }
                }
            }
        }
    };


    return operations;
  }

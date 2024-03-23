
import { holeAlleLaender }           from "../service.js";
import { neuesLand }                 from "../service.js";
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

        const laenderArray = holeAlleLaender();

        res.status(200).json( laenderArray );
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
            res.setHeader( CUSTOM_HEADER_FEHLER_TEXT, `Land mit Code "${neuLand.code}" existiert bereits.` );
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

    /*
    POST.apiDoc = {
        summary: "Neues Land anlegen",
        operationId: "neuesLand"
    };
    */

    return operations;
  }

import { holeLandNachCode }          from "../../service.js";
import { CUSTOM_HEADER_FEHLER_TEXT } from "../../konstanten.js";

/**
 * Operationen für den Pfad "/laender/:code" (Ressource).
 */
export default function () {

    // Unterstützte HTTP-Methoden definieren
    const operations = { GET };

    /**
     * Ein Land anhand des 3-Buchstabencodes zurückgeben.
     *
     * @param {*} req Request-Objekt, um Pfadparameter `code`
     *                auszulesen
     *
     * @param {*} res Response-Objekt, um HTTP-Statuscode und
     *                Antwort-JSON zu setzen
     */
    function GET(req, res) {

        const laenderCode = req.params.code.trim().toUpperCase();

        const landObjekt = holeLandNachCode( laenderCode );

        if ( Object.keys(landObjekt).length === 0 ) {

            res.status( 404 );
            res.setHeader( CUSTOM_HEADER_FEHLER_TEXT, `Land mit Code "${laenderCode}" nicht gefunden.` );
            res.json( {} );

        } else {

            res.status( 200 );
            res.json( landObjekt );
        }
    }

    GET.apiDoc = {
        summary: "Einzelnes Land",
        operationId: "getLand",
        responses: {
            200: {
                description: "Land gefunden",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/Land"
                        }
                    }
                }
            }, 
            404: {
                description: "Land nicht gefunden",
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
};

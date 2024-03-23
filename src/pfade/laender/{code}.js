import { holeLandNachCode } from '../../service.js';

/**
 * Operationen für den Pfad "/laender/:code" (Ressource).
 */
export default function () {

    // Unterstützte HTTP-Methoden definieren
    const operations = { GET };

    function GET(req, res, next) {

        const laenderCode = req.params.code.trim().toUpperCase();

        const landObjekt = holeLandNachCode( laenderCode );

        if ( Object.keys(landObjekt).length === 0 ) {


            res.status( 404 );
            res.json( {} );

        } else {

            res.status( 200 );
            res.json( landObjekt );
        }
    }

    return operations;
};

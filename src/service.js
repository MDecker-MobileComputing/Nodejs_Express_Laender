import { getLogger }  from "./logger.js";

import { queryAlleLaender } from "./datenbank.js";
import { queryLandByCode  } from "./datenbank.js";
import { upsertLand       } from "./datenbank.js";

const logger = getLogger(import.meta.url);


/**
 * Liste aller Länder zurückgeben.
 *
 * @returns Array mit allen Länderobjekten, sortiert aufsteigend
 *          nach dem Ländercode.
 */
export function holeAlleLaender() {

    const laenderArray = queryAlleLaender();

    if ( laenderArray.length === 0 ) {

        logger.warn("Kein einziges Land gefunden.");
    }

    return laenderArray
}

/**
 * Volltextsuche nach Ländern.
 *
 * @param {*} suchstring Such-String, der im Landesnamen oder in der Hauptstadt vorkommen kann.
 *
 * @return Array mit Treffern oder leerer Array, wenn kein Land gefunden wurde.
 */
export function sucheLand(suchstring) {

    const laenderArray = queryAlleLaender();

    const suchstringNormalisiert = suchstring.trim().toLowerCase();

    const filterFunktion = (land) => {
            return land.name.toLowerCase().includes(       suchstringNormalisiert ) ||
                   land.hauptstadt.toLowerCase().includes( suchstringNormalisiert );
        };

    const trefferArray = laenderArray.filter( filterFunktion );

    if ( trefferArray.length === 0 ) {

        logger.warn(`Kein Land gefunden, das den Suchstring "${suchstring}" enthält.`);
    }

    return trefferArray;
}


/**
 * Einzelnes Land anhand des Ländercodes zurückgeben.
 *
 * @param {*} code Länder-Code nach "ISO 3166-1 Alpha 3", z.B. "DEU" für Deutschland
 *
 * @returns Land-Objekt oder leeres Objekt, wenn Land nicht gefunden wurde.
 */
export function holeLandNachCode( code ) {

    const land = queryLandByCode( code );
    if ( land === undefined ) {

        logger.warn(`Land mit Code "${code}" nicht gefunden.`);
        return {};
    }

    return land;
}


/**
 * Neues Land in Datenbank speichern.
 *
 * @param {*} landObjekt Neues Land-Objekt
 *
 * @returns `true`, wenn Land erfolgreich gespeichert wurde,
 *          sonst `false`.
 */
export async function neuesLand(landObjekt) {

    const altLand = queryLandByCode(landObjekt.code);
    if (altLand) {

        logger.warn(`Land mit Code "${landObjekt.code}" existiert bereits.`);
        return false;
    }

    await upsertLand(landObjekt); // Datenbank-Operation

    const jsonString = JSON.stringify(landObjekt);
    logger.info("Neues Land gespeichert: " + jsonString);

    return true;
}

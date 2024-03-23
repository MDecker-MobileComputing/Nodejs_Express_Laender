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

        logger.warn("Keine Länder gefunden.");
    }

    return laenderArray
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
export function neuesLand(landObjekt) {

    const altLand = holeLandNachCode(landObjekt.code);
    if (altLand) {

        logger.warn(`Land mit Code "${landObjekt.code}" existiert bereits.`);
        return false;
    }

    upsertLand(landObjekt);

    const jsonString = JSON.stringify(landObjekt);
    logger.info("Neues Land gespeichert: " + jsonString);
}

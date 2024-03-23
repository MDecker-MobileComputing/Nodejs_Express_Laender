import { JSONFilePreset } from "lowdb/node";

import { getLogger } from './logger.js';

const logger = getLogger(import.meta.url);

const anfangsDaten =  {

    "DEU": {
        code: "DEU",
        name: "Deutschland",
        hauptstadt: "Berlin",
        einwohner: 84607016
    },
    "FRA": {
        code: "FRA",
        name: "Frankreich",
        hauptstadt: "Paris",
        einwohner: 68373433
    }
};


/* Objekt für Zugriff auf Datenbank. */
let datenbank = null;


/**
 * Datenbank initialisieren.
 */
export async function datenbankInitialisieren() {

    const datenbankDatei = "db.json";
    datenbank = await JSONFilePreset( datenbankDatei, anfangsDaten );
    await datenbank.write();

    logger.info(`Datenbank mit Datei "${datenbankDatei}" initialisiert.`);
    anzahlDatensaetzeToLogger();
}


export function queryAlleLaender() {

        return Object.values( datenbank.data );
}


/**
 * Upsert (Update oder Insert) für ein Land.
 *
 * @param {object} landObjekt Neues Land
 */
export async function upsertLand(landObjekt) {

    datenbank.data[ landObjekt.code ] = landObjekt;
    await datenbank.write();

    logger.info(`Land "${land.code}" gespeichert.`);
    anzahlDatensaetzeToLogger();
}


/**
 * Schreibt aktuelle Anzahl der Datensätze auf den Logger.
 */
function anzahlDatensaetzeToLogger() {

    const anzahlDatensaetze = Object.keys( datenbank.data ).length;
    logger.info(`Anzahl Datensätze (Länder): ${anzahlDatensaetze}`);
}
import { JSONFilePreset } from "lowdb/node";

import { getLogger } from './logger.js';

const logger = getLogger(import.meta.url);


/** Initiale Daten wenn Datenbankdatei noch leer ist. */
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


/**
 * Liefert Array aller Länder zurück
 *
 * @returns Array mit allen Länderobjekten, sortiert aufsteigend
 *          nach dem Ländercode.
 */
export function queryAlleLaender() {

    const laenderArray = Object.values( datenbank.data );

    const sortiertFunktion = (land1, land2) => land1.code.localeCompare( land2.code );

    const ergebnisSortiertArray = laenderArray.sort( sortiertFunktion );

    return ergebnisSortiertArray;
}


/**
 * Einzelnes Land anhand von ISO-Code abfragen.
 *
 * @param {*} code ISO-Code (ISO 3166-1 Alpha 3) des Landes,
 *                 z.B. "DEU" für Deutschland
 *
 * @returns Landobjekt oder `undefined`, wenn Land nicht gefunden
 */
export function queryLandByCode(code) {

    return datenbank.data[ code ];
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
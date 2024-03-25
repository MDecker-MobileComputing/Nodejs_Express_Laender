import fs              from "fs";
import path            from "path";
import morgan          from "morgan";
import url             from "url";
import winston         from "winston";
import DailyRotateFile from "winston-daily-rotate-file";


import { istNichtProduktiv } from './modus.js';

/** Ordner relativ zum Wurzelverzeichnis, in den die Log-Dateien geschrieben werden. */
const LOG_ORDNER = "logs/";


/**
 * Erzeugt einen Logger mit Winston, der in einer bestimmten Quellcode-Datei zu verwenden ist.
 * <br><br>
 *
 * Log-Levels nach absteigender Prio: error, warn, info, http, verbose, debug, silly
 */
export function getLogger(importMetaUrl) {

  const dateiname = path.basename( url.fileURLToPath(importMetaUrl) );

  const rotierendeLogDateiTransport =
        new DailyRotateFile({
                      filename: `${LOG_ORDNER}/application-%DATE%.log`,
                      datePattern: "YYYY-MM-DD_HH-mm",
                      frequency: "3m", // alle 3 Minuten neues Log-File (für Demo-Zwecke), wird evtl. erst nach Log-Nachricht gemacht
                      zippedArchive: false, // keine Komprimierung der alten Log-Dateien
                      auditFile: `${LOG_ORDNER}/logrotate-audit.json`, // Datei mit Informationen über rotierte Log-Dateien
                      maxSize: "20m",
                      maxFiles: "30d" });

  rotierendeLogDateiTransport.on("rotate", (dateinameAlt, dateinameNeu) => {

     console.log(`Log-Datei rotiert: ${dateinameAlt} -> ${dateinameNeu}`);
  });
  rotierendeLogDateiTransport.on("error", fehler => {

    console.log("Fehler beim Log-Rotate: " + fehler);
  });


  // Ziele für die Log-Nachrichten definieren; wenn nicht in Produktionsumgebung, dann zusätzlich auf Konsole ausgeben
  const transportsArray =  [
            new winston.transports.File({ filename: `${LOG_ORDNER}/application-error.log`, level: "error" }),
            new winston.transports.File({ filename: `${LOG_ORDNER}/application.log` }),
            rotierendeLogDateiTransport
        ];
  if (istNichtProduktiv) {
    transportsArray.push(new winston.transports.Console());
  }

  return winston.createLogger({
    level: "info", // kleinste Log-Prio (Log-Level), die noch protokolliert wird
    format: winston.format.combine(
      winston.format.label({ label: dateiname }),
      winston.format.timestamp({ format: "YYYY-MM-DD_HH:mm:ss:SSS" }),
      winston.format.printf(nachricht => {
        return `${nachricht.timestamp} [${nachricht.label}] ${nachricht.level.toUpperCase()}: ${nachricht.message}`;
      })
    ),
    defaultMeta: { service: "laender" },
    transports: transportsArray
  });
}


/**
 * Middleware-Funktion von Library "morgan", die HTTP-Zugriffe protokolliert,
 * registriert für Express-App.
 *
 * @param {*} app Express-Objekt
 */
export function registriereHttpLogger(app) {

    const MODE_APPEND = { flags: "a" };

    const accessLogStream = fs.createWriteStream(`${LOG_ORDNER}/access.log`, MODE_APPEND)
    app.use(morgan("combined", { stream: accessLogStream })); // combined: Standard-Format von Apache Web-Server

    const errorLogStream = fs.createWriteStream(`${LOG_ORDNER}/access-error.log`, MODE_APPEND);
    app.use(morgan("combined", {
        stream: errorLogStream,
        skip: function (req, res) { return res.statusCode < 400 }
    }));
}

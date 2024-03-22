
/*
 * In Abhängigkeit des Betriebsmodus (Entwicklung/Test oder Produktiv) werden einige Komponenten
 * der Anwendung unterschiedlich konfiguriert:
 *
 * * Im Entwicklung/Test-Modus wird die Konsole zusätzlich zu den Log-Dateien verwendet.
 *
 * * Im Entwicklung/Test-Modus wird die OpenAPI-Dokumentation via HTTP aktiviert.
 *
 */

export const istNichtProduktiv = (process.env.NODE_ENV !== "production");

export const modusName = istNichtProduktiv ? "Entwicklung/Test" : "Produktiv";


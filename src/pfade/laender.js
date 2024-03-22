
/**
 * Operationen für den Pfad "/laender" (Collection).
 * <br><br>
 *
 * Liste der 3-Buchstabencodes für Länder: https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste
 *
 * @returns Objekt mit den Operationen für den Pfad "/laender"
 */
export default function () {

    // Unterstützte HTTP-Methoden definieren
    const operations = { GET, POST };

    /**
     * Liste aller Länder zurückgeben.
     *
     * Pfad: http://localhost:8080/api/v1/laender
     */
    function GET(req, res, next) {

        res.status(200).json([
            { code: "DEU", name: "Deutschland", hauptstadt: "Berlin", einwohner: 84607016 },
            { code: "FRA", name: "Frankreich" , hauptstadt: "Paris" , einwohner: 68373433 }
        ]);
    }

    function POST(req, res, next) {}

    /*
    GET.apiDoc = {
        summary: "Liste aller Länder",
        operationId: "getLaender"
    };

    POST.apiDoc = {
        summary: "Neues Land anlegen",
        operationId: "neuesLand"
    };
    */

    return operations;
  }

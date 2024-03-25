# REST-API für Länder #

<br>

REST-API für Länder, basierend auf einer OpenAPI-Spezifikation, die zur Laufzeit anhand der Quellcode-Dateien
im Verzeichnis [src/pfade/](src/pfade) von `swagger-ui-express` ergänzt wird.

<br>

----

## Unterstützte HTTP-Operationen ##

<br>

| Beschreibung      | **URL-Pfad**                | `GET` | `POST` | `PUT` | `PATCH` | `DELETE` |
|-------------------|-----------------------------| :---: | :---:  | :---: | :---:   | :---:    |
| Ressource  "Land" | `/api/v1/laender/:code`     | X     |        |       |         |          |
| Collection "Land" | `/api/v1/laender/`          | X     | X      |       |         |          |

<br>

* Die Werte für `code` beim Zugriff auf die Ressource sind
  [dreibuchstabige Codes für Länder nach "ISO-3166 Alpha 3"](https://de.wikipedia.org/wiki/ISO-3166-1-Kodierliste),
  z.B. "DEU" für Deutschland oder "FRA" für Frankreich.

* Die Operation `GET` auf der Collection unterstützt auch den URL-Parameter `q` für eine Volltextsuche (durchsucht Name des Landes und Hauptstadt).

<br>

siehe auch:

----

## License ##

<br>

See the [LICENSE file](LICENSE.md) for license rights and limitations (BSD 3-Clause License)
for the files in this repository.

<br>

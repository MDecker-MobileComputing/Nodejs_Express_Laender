import { getLogger }  from './logger.js';

import { queryAlleLaender } from './datenbank.js';

const logger = getLogger(import.meta.url);


export function holeAlleLaender() {

    return queryAlleLaender();
}


/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { downloadData } from './downloadData.js';
import constants from './constants';

//The max size of the logs in # of characaters
const MAX_LOGS_SIZE = 1.5e7/2; //15 MB or 7.5M characters

const _strify = obj => (typeof obj === 'string') ? obj : JSON.stringify(obj);

let LOGS_SIZE = 0;
let logs = [];

function _log(logLevel, logMessage, logSource) {
    if(!logMessage) {
        throw new Error("Log Message required");
    }
    logLevel  = logLevel  || constants.LOG_LEVEL.INFO;
    logSource = logSource || constants.LOG_SOURCE.PARTNER;

    const logStr = [new Date().toISOString(), _strify(logLevel), _strify(logSource), `${_strify(logMessage)}\n`].join("|");
    
    //If logs size is greater than max size, empty it.
    if(LOGS_SIZE + logStr.length >= MAX_LOGS_SIZE) {
        logs = []; 
        LOGS_SIZE = 0;
    }
    LOGS_SIZE += logStr.length;
    logs.push(logStr);
}

/**
 * Log a message at a custom level.
 * @param {object} logMessage
 * @param {string} logLevel 
 * @param {string} [logSource]
 */
export function log(logMessage, logLevel, logSource) {
    _log(logLevel, logMessage, logSource);
}

/**
 * 
 * @returns a deep copy of the logs array
 */
export function getLogs() {
    return JSON.parse(JSON.stringify(logs));
}

/**
 * Download the logs as a file
 */
export function downloadLogs() {
    downloadData(logs.join(''), `log-${new Date().getTime()}.txt`, 'text/plain');
}

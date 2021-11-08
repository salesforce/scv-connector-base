/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { downloadData } from './downloadData.js';

const LOG_LEVEL = {
    ERROR: "ERROR",
    INFO: "INFO"
};

export const LOG_SOURCE = {
    SYSTEM: "SYSTEM",
    PARTNER: "PARTNER"
};

const MAX_LOGS_SIZE = 1e8/2; //100 MB or 50M characters

const _strify = obj => (typeof obj === 'string') ? obj : JSON.stringify(obj);

let LOGS_SIZE = 0;
let logs = [];

function _log(logLevel, logMessage, logSource) {
    if(!logMessage) {
        throw new Error("Log Message required");
    }
    logLevel  = logLevel  || LOG_LEVEL.INFO;
    logSource = logSource || LOG_SOURCE.PARTNER;

    const logStr = [new Date().toLocaleString(), _strify(logLevel), _strify(logSource), `${_strify(logMessage)}\n`].join(" | ");
    
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
 * Log a message at ERROR level
 * @param {object} logMessage
 * @param {string} [logSource]
 */
export function logError(logMessage, logSource) {
    _log(LOG_LEVEL.ERROR, logMessage, logSource);
}
/**
 * Log a message at INFO level
 * @param {object} logMessage
 * @param {string} [logSource]
 */
export function logInfo(logMessage, logSource) {
    _log(LOG_LEVEL.INFO, logMessage, logSource);
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

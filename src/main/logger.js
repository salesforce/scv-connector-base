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

const MAX_LOG_ENTRIES = 10000;

const logs = [];

function _log(logLevel, logMessage, logSource, timestamp) {
    if(!logMessage) {
        throw new Error("Log Message required");
    }
    logLevel  = (typeof logLevel === 'string') ? logLevel : JSON.stringify(logLevel);
    logSource = (typeof logSource === 'string') ? logSource : JSON.stringify(logSource);
        
    logs.push({
        logLevel: logLevel || LOG_LEVEL.INFO,
        logSource: logSource || LOG_SOURCE.PARTNER,
        timestamp: timestamp || new Date().getTime(),
        log: logMessage
    });
    //If logs size is greater than max size, remove the oldest log entry.
    if(logs.length > MAX_LOG_ENTRIES) {
        logs.shift();
    }
}

function _logsAsString() {
    return logs.reduce((acc, log) => {
        return `${acc}${new Date(log.timestamp).toLocaleString()} | ${log.logLevel} | ${log.logSource} | ${JSON.stringify(log.log)}\n`;  
    }, '');
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
    downloadData(_logsAsString(), `log-${new Date().getTime()}.txt`, 'text/plain');
}

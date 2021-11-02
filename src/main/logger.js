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

const LOG_SOURCE = {
    SYSTEM: "SYSTEM",
    VENDOR: "VENDOR"
};

const logs = [];

function _log(logLevel, logMessage, logSource, timestamp) {
    if(!logMessage) {
        throw new Error("Log Message required");
    }
    logLevel  = (typeof logLevel === 'string') ? logLevel : JSON.stringify(logLevel);
    logSource = (typeof logSource === 'string') ? logSource : JSON.stringify(logSource);
        
    logs.push({
        logLevel: logLevel || LOG_LEVEL.INFO,
        logSource: logSource || LOG_SOURCE.VENDOR,
        timestamp: timestamp || new Date().getTime(),
        log: logMessage
    });
}

function _logsAsString() {
    return logs.reduce((acc, log) => {
        return `${acc}${new Date(log.timestamp).toLocaleString()} - ${log.logLevel} - ${log.logSource} - ${JSON.stringify(log.log)}\n`;  
    }, '');
}

class Logger {
    /**
     * Reset the logs array when initializing the logger.
     */
    constructor() {
        logs.splice(0, logs.length);
    }

    /**
     * Log a message at a custom level.
     * @param {string} logLevel 
     * @param {object} logMessage
     * @param {string} [logSource]
     */
    customLog(logLevel, logMessage, logSource) {
        _log(logLevel, logMessage, logSource);
    }

    /**
     * Log a message at ERROR level
     * @param {object} logMessage
     * @param {string} [logSource]
     */
    errorLog(logMessage, logSource) {
        _log(LOG_LEVEL.ERROR, logMessage, logSource);
    }
    /**
     * Log a message at INFO level
     * @param {object} logMessage
     * @param {string} [logSource]
     */
    infoLog(logMessage, logSource) {
        _log(LOG_LEVEL.INFO, logMessage, logSource);
    }
    /**
     * 
     * @returns a deep copy of the logs array
     */
    getLogs() {
        return JSON.parse(JSON.stringify(logs));
    }

    /**
     * Download the logs as a file
     */
    downloadLogs() {
        downloadData(_logsAsString(), `log-${new Date().getTime()}.txt`, 'text/plain');
    }
}

const logger = new Logger();
Object.freeze(logger);
Object.freeze(LOG_SOURCE);
export { logger, LOG_SOURCE };
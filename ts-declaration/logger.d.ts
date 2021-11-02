/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

export interface Logger {
    /**
     * Log a message at a custom level.
     * @param {string} logLevel 
     * @param {object} logMessage 
     * @param {string} [logSource]
     */
    customLog(logLevel: string, logMessage: Object, logSource?: string): void;
    
    /**
     * Log a message at ERROR level
     * @param {object} logMessage 
     * @param {string} [logSource]
     */
    errorLog(logMessage: Object, logSource?: string): void;
    
    /**
     * Log a message at INFO level
     * @param {object} logMessage 
     * @param {string} [logSource]
     */
    infoLog(logMessage: Object, logSource?: string): void;

    /**
     * 
     * @returns a copy of the list of logs
     */
    getLogs(): Object[];

    /**
     * Download the logs as a file
     */
     downloadLogs(): void;
}

export const logger: Logger;
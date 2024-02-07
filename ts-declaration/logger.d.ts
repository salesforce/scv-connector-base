/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import Constants from './types.d.ts';
/**
 * Log a message at a custom level.
 * @param {object} logMessage - The message to be logged
 * @param {Constants.LOG_LEVEL} logLevel - The logging level
 */
 export function log({ logMessage, logLevel }: {
    logMessage: object;
    logLevel: Constants.LOG_LEVEL;
}): void;
/**
 *
 * @returns a deep copy of the logs array
 */
export function getLogs(): any;
/**
 * Download the logs as a file
 */
export function downloadLogs(): void;

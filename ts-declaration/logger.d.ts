/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Log a message at a custom level.
 * @param {string} logLevel 
 * @param {object} logMessage 
 * @param {string} [logSource]
 */
export function log(logLevel: string, logMessage: Object, logSource?: string): void;

/**
 * Log a message at ERROR level
 * @param {object} logMessage 
 * @param {string} [logSource]
 */
export function logError(logMessage: Object, logSource?: string): void;

/**
 * Log a message at INFO level
 * @param {object} logMessage 
 * @param {string} [logSource]
 */
export function logInfo(logMessage: Object, logSource?: string): void;

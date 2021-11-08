/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Log a message at a custom level.
 * @param {object} logMessage - The message to be logged
 * @param {("ERROR"|"INFO")} logLevel - The logging level
 */
export function log({ logMessage, logLevel }: {
    logMessage: object;
    logLevel: ("ERROR"|"INFO");
}): void;
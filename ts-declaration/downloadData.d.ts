/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Download data as a file.
 * @param {object} data 
 * @param {string} fileName 
 * @param {string} fileType
 */
export function downloadData({ data, fileName, fileType }: {
    data: object; 
    fileName: string;
    fileType: string;
}):void;
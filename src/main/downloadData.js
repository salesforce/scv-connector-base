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
 export function downloadData(data, fileName, fileType) {
    if(!document || !data) return;
    
    const dataStr = (typeof data === 'string') ? data : JSON.stringify(data);
    const file = new Blob([dataStr], {type: fileType});
    let a = document.createElement("a") 
    const blobURL = URL.createObjectURL(file);
    a.download = fileName;
    a.href = blobURL;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
}
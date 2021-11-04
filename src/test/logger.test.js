/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

//mock the download data method.
jest.mock('../main/downloadData');



describe('Logger tests', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("Should add an info log message", () => {
        const {logInfo, getLogs} = require('../main/logger');
        logInfo("abcd");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd");
        expect(logs[0].logLevel).toBe("INFO");
        expect(logs[0].logSource).toBe("PARTNER");
    });

    it("Should add an error log message at SYSTEM level", () => {
        const {logError, getLogs} = require('../main/logger');
        logError("abcd2", "SYSTEM");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd2");
        expect(logs[0].logLevel).toBe("ERROR");
        expect(logs[0].logSource).toBe("SYSTEM");
    });

    it("Should add a custom log message at custom level", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd3", "custom_level", "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd3");
        expect(logs[0].logLevel).toBe("custom_level");
        expect(logs[0].logSource).toBe("custom_source");
    });

    it("Should call downloadData when downloadLogs method is called", () => {
        const {logInfo, downloadLogs} = require('../main/logger');
        const {downloadData} = require('../main/downloadData');
        logInfo("abcd");
        downloadLogs();
        expect(downloadData).toBeCalledTimes(1);
    });
    
    it("Should throw an error when log message is missing", () => {
        const {logInfo} = require('../main/logger');
        expect(() => logInfo(null)).toThrow();
    });

    it("Should stringify a logLevel when the logLevel is not a string", () => {
        const {log, getLogs} = require('../main/logger');
        let logLevel = {logLevel:"custom"};
        log("abcd3", logLevel, "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].logLevel).toBe(JSON.stringify(logLevel));
    });

    it("Should set a logLevel as INFO when the logLevel is not provided", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd3", "", "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].logLevel).toBe("INFO");
    });
});
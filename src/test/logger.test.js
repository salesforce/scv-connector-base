/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import constants from '../main/constants';

//mock the download data method.
jest.mock('../main/downloadData');



describe('Logger tests', () => {

    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it("Should add an info log message", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd", constants.LOG_LEVEL.INFO);
        let logs = getLogs();
        expect(logs.length).toBe(1);
        let logStr = logs[0].split("|");
        expect(logStr[1]).toBe(constants.LOG_LEVEL.INFO);
        expect(logStr[2]).toBe(constants.LOG_SOURCE.PARTNER);
        expect(logStr[3]).toBe("abcd\n");
    });

    it("Should add an error log message at SYSTEM level", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd2", constants.LOG_LEVEL.ERROR, constants.LOG_SOURCE.SYSTEM);
        let logs = getLogs();
        expect(logs.length).toBe(1);
        let logStr = logs[0].split("|");
        expect(logStr[1]).toBe(constants.LOG_LEVEL.ERROR);
        expect(logStr[2]).toBe(constants.LOG_SOURCE.SYSTEM);
        expect(logStr[3]).toBe("abcd2\n");
    });

    it("Should add a log message at custom level", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd3", "custom_level", "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        let logStr = logs[0].split("|");
        expect(logStr[1]).toBe("custom_level");
        expect(logStr[2]).toBe("custom_source");
        expect(logStr[3]).toBe("abcd3\n");
    });

    it("Should call downloadData when downloadLogs method is called", () => {
        const {log, downloadLogs} = require('../main/logger');
        const {downloadData} = require('../main/downloadData');
        log("abcd");
        downloadLogs();
        expect(downloadData).toBeCalledTimes(1);
    });
    
    it("Should throw an error when log message is missing", () => {
        const {log} = require('../main/logger');
        expect(() => log(null)).toThrow();
    });

    it("Should stringify a logLevel when the logLevel is not a string", () => {
        const {log, getLogs} = require('../main/logger');
        let logLevel = {logLevel:"custom"};
        log("abcd3", logLevel, "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        let logStr = logs[0].split("|");
        expect(logStr[1]).toBe(JSON.stringify(logLevel));
    });

    it("Should set a logLevel as INFO when the logLevel is not provided", () => {
        const {log, getLogs} = require('../main/logger');
        log("abcd3", "", "custom_source");
        let logs = getLogs();
        expect(logs.length).toBe(1);
        let logStr = logs[0].split("|");
        expect(logStr[1]).toBe(constants.LOG_LEVEL.INFO);
    });
});
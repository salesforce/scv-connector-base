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
        const {logger} = require('../main/index');
        logger.infoLog("abcd");
        let logs = logger.getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd");
        expect(logs[0].logLevel).toBe("INFO");
        expect(logs[0].logSource).toBe("VENDOR");
    });

    it("Should add an error log message at SYSTEM level", () => {
        const {logger} = require('../main/index');
        logger.errorLog("abcd2", "SYSTEM");
        let logs = logger.getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd2");
        expect(logs[0].logLevel).toBe("ERROR");
        expect(logs[0].logSource).toBe("SYSTEM");
    });

    it("Should add a custom log message at custom level", () => {
        const {logger} = require('../main/index');
        logger.customLog("custom_level", "abcd3", "custom_source");
        let logs = logger.getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].log).toBe("abcd3");
        expect(logs[0].logLevel).toBe("custom_level");
        expect(logs[0].logSource).toBe("custom_source");
    });

    it("Should call downloadData when downloadLogs method is called", () => {
        const {logger, downloadData} = require('../main/index');
        logger.downloadLogs();
        expect(downloadData).toBeCalledTimes(1);
    });
    
    it("Should throw an error when log message is missing", () => {
        const {logger} = require('../main/index');
        expect(() => logger.infoLog(null)).toThrow();
    });

    it("Should stringify a logLevel when the logLevel is not a string", () => {
        const {logger} = require('../main/index');
        let logLevel = {logLevel:"custom"};
        logger.customLog(logLevel, "abcd3", "custom_source");
        let logs = logger.getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].logLevel).toBe(JSON.stringify(logLevel));
    });

    it("Should set a logLevel as INFO when the logLevel is not provided", () => {
        const {logger} = require('../main/index');
        logger.customLog("", "abcd3", "custom_source");
        let logs = logger.getLogs();
        expect(logs.length).toBe(1);
        expect(logs[0].logLevel).toBe("INFO");
    });
});
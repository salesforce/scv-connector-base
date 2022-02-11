/**
 * Log a message at a custom level.
 * @param {object} logMessage
 * @param {string} logLevel
 * @param {string} [logSource]
 */
export function log(logMessage: object, logLevel: string, logSource?: string): void;
/**
 *
 * @returns a deep copy of the logs array
 */
export function getLogs(): string[];
/**
 * Download the logs as a file
 */
export function downloadLogs(): void;

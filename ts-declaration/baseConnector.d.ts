/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector: VendorConnector): void;
/**
 * Publish an event or error log to Salesforce
 * @param {object} param
 * @param {string} param.eventType Any event type to be logged
 * @param {object} param.payload Any payload for the log that needs to be logged
 * @param {boolean} param.isError
 */
export function publishLog({ eventType, payload, isError }: {
    eventType: string;
    payload: object;
    isError: boolean;
}): void;
/**
 * Publish a telephony error to Salesforce
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE"|"AGENT_ERROR"|"SOFTPHONE_ERROR")} param.eventType Event type to publish.
 * @param {object} param.error Error object representing the error
 */
export function publishError({ eventType, error }: {
    eventType: ("LOGIN_RESULT" | "LOGOUT_RESULT" | "CALL_STARTED" | "QUEUED_CALL_STARTED" | "CALL_CONNECTED" | "HANGUP" | "PARTICIPANT_CONNECTED" | "PARTICIPANT_ADDED" | "PARTICIPANTS_SWAPPED" | "PARTICIPANTS_CONFERENCED" | "MESSAGE" | "MUTE_TOGGLE" | "HOLD_TOGGLE" | "RECORDING_TOGGLE" | "AGENT_ERROR" | "SOFTPHONE_ERROR" |  "SUPERVISOR_LISTEN_IN" | "SUPERVISOR_BARGED_IN");
    error: object;
}, ...args: any[]): void;
/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published.
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE")} param.eventType Event type to publish
 * @param {object} param.payload Payload for the event. Must to be an object of the payload class associated with the EVENT_TYPE else the event is NOT dispatched
 * @param {boolean} param.registerLog Boolean to opt out of registering logs for events
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - LogoutResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANTS_SWAPPED - HoldToggleResult
 * PARTICIPANTS_CONFERENCED - HoldToggleResult
 * MESSAGE - object
 * MUTE_TOGGLE - MuteToggleResult
 * HOLD_TOGGLE - HoldToggleResult
 * RECORDING_TOGGLE - RecordingToggleResult
 * SUPERVISOR_LISTEN_IN - SuperviseCallResult;
 * SUPERVISOR_BARGED_IN - SuperviseCallResult;
 * CALL_BARGED_IN - SupervisedCallInfo;
 */
export function publishEvent({ eventType, payload, registerLog }: {
    eventType: ("LOGIN_RESULT" | "LOGOUT_RESULT" | "CALL_STARTED" | "QUEUED_CALL_STARTED" | "CALL_CONNECTED" | "HANGUP" | "PARTICIPANT_CONNECTED" | "PARTICIPANT_ADDED" | "PARTICIPANTS_SWAPPED" | "PARTICIPANTS_CONFERENCED" | "MESSAGE" | "MUTE_TOGGLE" | "HOLD_TOGGLE" | "RECORDING_TOGGLE" | "CALL_BARGED_IN" | "SUPERVISOR_LISTEN_IN" | "SUPERVISOR_BARGED_IN");
    payload: object;
    registerLog: boolean;
}): Promise<void>;
import { VendorConnector } from "./types";

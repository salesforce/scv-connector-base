/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import Constants from './types.d.ts';
/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector: VendorConnector): void;
/**
 * Publish an event or error log to Salesforce
 * @param {object} param
 * @param {Constants.EVENT_TYPE} param.eventType Any event type to be logged
 * @param {object} param.payload Any payload for the log that needs to be logged
 * @param {boolean} param.isError
 */
export function publishLog({ eventType, payload, isError }: {
    eventType: Constants.EVENT_TYPE;
    payload: object;
    isError: boolean;
}): void;
/**
 * Publish a telephony error to Salesforce
 * @param {object} param
 * @param {Constants.EVENT_TYPE} param.eventType Event type to publish.
 * @param {object} param.error Error object representing the error
 */
export function publishError({ eventType, error }: {
    eventType: Constants.EVENT_TYPE;
    error: object;
}, ...args: any[]): void;
/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published.
 * @param {object} param
 * @param {Constants.EVENT_TYPE} param.eventType Event type to publish
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
 * AUDIO_STATS - AudioStats;
 */
export function publishEvent({ eventType, payload, registerLog }: {
    eventType: Constants.EVENT_TYPE;
    payload: object;
    registerLog: boolean;
}): Promise<void>;
import { VendorConnector } from "./types";

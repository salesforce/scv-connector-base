/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector: VendorConnector): void;
/**
 * Publish a telephony error to Salesforce
 * @param {EVENT_TYPE} param.eventType Event type that the error is corresponding (i.e. HANGUP, CALL_STARTED).
 * @param {object} error Error object representing the error
 */
export function publishError({ eventType, error }: any): void;
/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published.
 * @param {object} param
 * @param {EVENT_TYPE} param.eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object|GenericResult|CallResult|ParticipantResult|MuteToggleResult|HoldToggleResult|RecordingToggleResult} param.payload Payload for the event. Has to be a payload class associated with the EVENT_TYPE
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - GenericResult
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
 */
export function publishEvent({ eventType, payload }: {
    eventType: any;
    payload: object | GenericResult | CallResult | ParticipantResult | MuteToggleResult | HoldToggleResult | RecordingToggleResult;
}): Promise<void>;
/**
 * Checks the agent's availability
 * @returns {boolean}
 */
export function isAgentAvailable(): boolean;
export namespace Constants {
    namespace EVENT_TYPE {
        const LOGIN_RESULT: string;
        const LOGOUT_RESULT: string;
        const CALL_STARTED: string;
        const QUEUED_CALL_STARTED: string;
        const CALL_CONNECTED: string;
        const HANGUP: string;
        const MUTE_TOGGLE: string;
        const HOLD_TOGGLE: string;
        const RECORDING_TOGGLE: string;
        const PARTICIPANTS_SWAPPED: string;
        const PARTICIPANTS_CONFERENCED: string;
        const PARTICIPANT_ADDED: string;
        const PARTICIPANT_CONNECTED: string;
        const PARTICIPANT_REMOVED: string;
        const MESSAGE: string;
        const AFTER_CALL_WORK_STARTED: string;
        const WRAP_UP_ENDED: string;
        const REMOTE_CONTROLLER: string;
    }
    namespace ERROR_TYPE {
        const GENERIC_ERROR: string;
        const INVALID_PARTICIPANT: string;
        const INVALID_DESTINATION: string;
        const INVALID_PARAMS: string;
        const INVALID_AGENT_STATUS: string;
    }
    const AGENT_STATUS: {
        ONLINE: string;
        OFFLINE: string;
        ACW: string;
        CALLBACK_MISSED_OR_REJECTED: string;
    };
    const PARTICIPANT_TYPE: {
        AGENT: string;
        INITIAL_CALLER: string;
        THIRD_PARTY: string;
    };
    const CALL_TYPE: {
        INBOUND: string;
        OUTBOUND: string;
        CALLBACK: string;
        ADD_PARTICIPANT: string;
    };
    const CONTACT_TYPE: {
        PHONEBOOK: string;
        QUEUE: string;
        PHONENUMBER: string;
        AGENT: string;
    };
    const CALL_STATE: {
        RINGING: string;
        CONNECTED: string;
        TRANSFERRING: string;
        TRANSFERRED: string;
        ENDED: string;
    };
    const HANGUP_REASON: {
        PHONE_CALL_ERROR: string;
        PHONE_CALL_ENDED: string;
    };
}
import { VendorConnector } from "./types.js";
import { GenericResult } from "./types.js";
import { CallResult } from "./types.js";
import { ParticipantResult } from "./types.js";
import { MuteToggleResult } from "./types.js";
import { HoldToggleResult } from "./types.js";
import { RecordingToggleResult } from "./types.js";

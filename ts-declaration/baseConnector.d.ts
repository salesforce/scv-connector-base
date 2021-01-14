/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector: VendorConnector): void;
/**
 * Publish an event to Sfdc
 * @param {object} param
 * @param {EVENT_TYPE} param.eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object|GenericResult|CallResult|ParticipantResult|ParticipantRemovedResult} param.payload Payload for the event. Has to be a result class associated with the EVENT_TYPE
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - GenericResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_REMOVED - ParticipantRemovedResult
 * MESSAGE - object
 */
export function publishEvent({ eventType, payload }: {
    eventType: any;
    payload: object | GenericResult | CallResult | ParticipantResult | ParticipantRemovedResult;
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
}
import { VendorConnector } from "./types.js";
import { GenericResult } from "./types.js";
import { CallResult } from "./types.js";
import { ParticipantResult } from "./types.js";
import { ParticipantRemovedResult } from "./types.js";

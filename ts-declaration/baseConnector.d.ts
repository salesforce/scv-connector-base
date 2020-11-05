/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector: any): void;
/**
 * Publish an event to Sfdc
 * @param {EVENT_TYPE} eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object|GenericResult|CallResult|ParticipantResult|ParticipantRemovedResult} payload Payload for the event. Has to be a result class associated with the EVENT_TYPE
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - GenericResult
 * CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_REMOVED - ParticipantRemovedResult
 * MESSAGE - object
 */
export function publishEvent({ eventType, payload }: any): Promise<void>;
export namespace Constants {
    namespace EVENT_TYPE {
        const LOGIN_RESULT: string;
        const LOGOUT_RESULT: string;
        const CALL_STARTED: string;
        const CALL_CONNECTED: string;
        const HANGUP: string;
        const PARTICIPANT_CONNECTED: string;
        const PARTICIPANT_REMOVED: string;
        const MESSAGE: string;
        const REMOTE_CONTROLLER: string;
    }
    const AGENT_STATUS: {
        ONLINE: string;
        OFFLINE: string;
        ACW: string;
    };
    const PARTICIPANT_TYPE: {
        AGENT: string;
        INITIAL_CALLER: string;
        THIRD_PARTY: string;
    };
    const CALL_TYPE: {
        INBOUND: string;
        OUTBOUND: string;
        ADD_PARTICIPANT: string;
    };
    const CONTACT_TYPE: {
        PHONEBOOK: string;
        QUEUE: string;
        PHONENUMBER: string;
    };
    const CALL_STATE: {
        RINGING: string;
        CONNECTED: string;
        TRANSFERRING: string;
        TRANSFERRED: string;
        ENDED: string;
    };
}

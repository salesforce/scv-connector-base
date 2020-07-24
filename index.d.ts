export function dispatchEvent(eventType: string, payload: object): void;
export function dispatchError(errorType: string, optionalError: string): void;
export function initializeConnector(connector: getConnector): void;
export function isConnectorReady(): boolean;
export function setConnectorReady(): void;
export function getTelephonyEventEmitter(): EventEmitter;
export const Constants: {
    MESSAGE_TYPE: {
        SETUP_CONNECTOR: string;
        CONNECTOR_READY: string;
        TELEPHONY_EVENT_DISPATCHED: string;
        ACCEPT_CALL: string;
        DECLINE_CALL: string;
        END_CALL: string;
        MUTE: string;
        UNMUTE: string;
        HOLD: string;
        RESUME: string;
        SET_AGENT_STATUS: string;
        DIAL: string;
        SEND_DIGITS: string;
        GET_PHONE_CONTACTS: string;
        SWAP_PARTICIPANTS: string;
        JOIN_PARTICIPANTS: string;
        TRANSFER: string;
        GET_LOGIN_SETTINGS: string;
        LOGIN: string;
        PAUSE_RECORDING: string;
        RESUME_RECORDING: string;
    };
    EVENT_TYPE: {
        CALL_STARTED: string;
        CALL_CONNECTED: string;
        CALL_FAILED: string;
        MUTE_TOGGLE: string;
        HOLD_TOGGLE: string;
        HANGUP: string;
        ERROR: string;
        PHONE_CONTACTS: string;
        TRANSFER_CALL_CONNECTED: string;
        TRANSFER_CALL_CLOSED: string;
        LOGIN_SETTINGS: string;
        LOGIN_RESULT: string;
        RECORDING_TOGGLE: string;
    };
    ERROR_TYPE: {
        GENERIC_ERROR: string;
        AGENT_ERROR: string;
        MICROPHONE_NOT_SHARED: string;
        UNSUPPORTED_BROWSER: string;
        AUTHENTICATION_ERROR: string;
        INVALID_AGENT_STATUS: string;
        CAN_NOT_SET_AGENT_STATUS: string;
        CAN_NOT_ACCEPT_THE_CALL: string;
        CAN_NOT_HOLD_CALL: string;
        CAN_NOT_RESUME_CALL: string;
        CAN_NOT_MUTE_CALL: string;
        CAN_NOT_UNMUTE_CALL: string;
        INVALID_PARTICIPANT: string;
        CAN_NOT_LOG_IN: string;
        INVALID_PARAMS: string;
        CAN_NOT_GET_PHONE_CONTACTS: string;
        CAN_NOT_SWAP_PARTICIPANTS: string;
        CAN_NOT_JOIN_PARTICIPANTS: string;
        INVALID_DESTINATION: string;
        INVALID_PHONE_NUMBER: string;
        CAN_NOT_HANGUP_PARTICIPANT: string;
        CAN_NOT_ADD_PARTICIPANT: string;
        CAN_NOT_START_THE_CALL: string;
        CAN_NOT_GET_LOGIN_SETTINGS: string;
        CAN_NOT_PAUSE_RECORDING: string;
        CAN_NOT_RESUME_RECORDING: string;
    };
    AGENT_STATUS: {
        ONLINE: string;
        OFFLINE: string;
        ACW: string;
    };
    PARTICIPANT_TYPE: {
        AGENT: string;
        INITIAL_CALLER: string;
        THIRD_PARTY: string;
    };
    CALL_TYPE: {
        INBOUND: string;
        OUTBOUND: string;
        TRANSFER: string;
    };
    FAILURE_TYPE: {
        NETWORKING_ERROR: string;
        BAD_ENDPOINT_EXCEPTION: string;
    };
    CONTACT_TYPE: {
        PHONEBOOK: string;
        QUEUE: string;
        PHONENUMBER: string;
    };
};
export class Contact {
    constructor(
        id?: string,
        type?: string,
        label?: string,
        phoneNumber?: string,
        prefix?: string,
        extension?: string
    );
};
export class PhoneCallAttributes {
    constructor(
        voiceCallId?: string,
        hangupReason?: string,
        participantType?: Contact,
        parentId?: string,
        isOnHold?: boolean
    );
};
export class PhoneCall {
    constructor(
        callId: string,
        callType: string,
        contact: Contact,
        state: string,
        callAttributes: PhoneCallAttributes,
        phoneNumber: string
    );
};
declare function getConnector(): Connector;
declare interface EventEmitter {
    emit(name: string, listener: Function): EventEmitter;
    on(name: string, args: Object): boolean;
};
declare interface Connector {
    // TODO Finalize the properties of callCenterConfig
    init(callCenterConfig: object): void;
    // TODO Do we need login and getLoginSettings?
    login(credentials: object): void;
    getLoginSettings(): void;
    getCallInProgress(): void;
    acceptCall(call: PhoneCall): void;
    declineCall(call: PhoneCall): void;
    endCall(call: PhoneCall): void;
    mute(): void;
    unmute(): void;
    hold(call: PhoneCall): void;
    resume(call: PhoneCall): void;
    pauseRecording(call: PhoneCall): void;
    resumeRecording(call: PhoneCall): void;
    swapCallParticipants(calls: PhoneCall[]): void;
    joinCallParticipants(agentStatus: string): void;
    dial(contact: Contact): void;
    sendDigits(digits: string): void;
    getPhoneContacts(): void;
    transfer(contact: Contact, call: PhoneCall): void;
};
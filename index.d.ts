export function initializeConnector(connector: getConnector): void;
export async function publishEvent(eventType: Constants.EVENT_TYPE, payload: object): void;
export const Constants: {
    EVENT_TYPE: {
        CALL_STARTED: string;
        CALL_CONNECTED: string;
        PARTICIPANT_CONNECTED: string;
        PARTICIPANT_REMOVED: string;
        LOGIN_RESULT: string;
        LOGOUT_RESULT: string;
        HANGUP: string;
        MESSAGE: string;
        /* This is only added to aid in connector development. This will be removed before publishing it*/
        REMOTE_CONTROLLER: string;
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
        ADD_PARTICIPANT: string;
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
    CAPABILITY_TYPE: {
        SHOW_AGENT_SETTINGS: string;
        MUTE: string;
        RECORD: string;
        HOLD: string;
        MERGE: string;
    },
    CALL_STATE: {
        RINGING: string;
        CONNECTED: string;
        TRANSFERRED: string;
        ENDED: string;
    }
};
export class Contact {
    constructor(ContactParam);
}
export class PhoneCallAttributes {
    constructor(PhoneCallAttributesParam);
}
export class PhoneCall {
    constructor(PhoneCallParam);
}
export type PhoneCallAttributesParam = {
    voiceCallId?: string,
    hangupReason?: string,
    participantType?: Contact,
    parentId?: string,
    isOnHold?: boolean
}
export type PhoneCallParam = {
    callId: string,
    callType: string,
    contact: Contact,
    state: string,
    callAttributes: PhoneCallAttributes,
    phoneNumber: string
}
export type ContactParam = {
    id?: string,
    type?: string,
    label?: string,
    phoneNumber?: string,
    prefix?: string,
    extension?: string
}
export type CapabilitiesResult = {
    hasMute?: boolean,
    hasHold?: boolean,
    hasRecord?: boolean,
    hasMerge?: boolean
}
export type ActiveCallsResult = {
    activeCalls: PhoneCall[]
}
export type MuteToggleResult = {
    isMuted: boolean
}
export type RecordingToggleResult = {
    isRecordingPaused: boolean,
    contactId?: string,
    initialContactId?: string,
    instanceId?: string,
    region?: string
}
export type ParticipantRemovedResult = {
    reason: string
}
export type CallInfo = {
    isOnHold: boolean,
    callStateTimestamp?: Date
}
export type ParticipantResult = {
    initialCallHasEnded: boolean,
    callInfo: CallInfo,
    phoneNumber: string
}
export type ConferenceResult = {
    isThirdPartyOnHold: true,
    isCustomerOnHold: true
}
export type PhoneContactsResult = {
    contacts: Contact[]
}
export type CallResult = {
    call: PhoneCall
}
export type HoldToggleResult = {
    isThirdPartyOnHold: boolean,
    isCustomerOnHold: boolean,
    calls: PhoneCall[]
}
export type InitResult = {
    showLogin?: boolean,
    loginFrameHeight?: number
}
export type GenericResult = {
    success: boolean
}
export type getConnector = () => Connector;
export interface Connector {
    init(callCenterConfig: object): Promise<CallResult>;
    acceptCall(call: PhoneCall): Promise<CallResult>;
    declineCall(call: PhoneCall): Promise<CallResult>;
    endCall(call: PhoneCall): Promise<CallResult>;
    mute(): Promise<MuteToggleResult>;
    unmute(): Promise<MuteToggleResult>;
    hold(call: PhoneCall): Promise<HoldToggleResult>;
    resume(call: PhoneCall): Promise<HoldToggleResult>;
    pauseRecording(call: PhoneCall): Promise<RecordingToggleResult>;
    resumeRecording(call: PhoneCall): Promise<RecordingToggleResult>;
    swap(call1: PhoneCall, call2: PhoneCall): Promise<HoldToggleResult>;
    conference(calls: PhoneCall[]): Promise<ConferenceResult>;
    dial(contact: Contact): Promise<CallResult>;
    sendDigits(digits: string): void;
    setAgentStatus(agentStatus: string): Promise<GenericResult>;
    getPhoneContacts(): Promise<PhoneContactsResult>;
    addParticipant(contact: Contact, call: PhoneCall): Promise<ParticipantResult>;
    logout(): Promise<GenericResult>;
    handleMessage(message: object): void;
    getCapabilities(): Promise<CapabilitiesResult>
}

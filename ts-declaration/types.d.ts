/**
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {boolean} param.isMuted
     */
    constructor({ isMuted }: {
        isMuted: boolean;
    });
    isMuted: boolean;
}
/**
 * Class representing result type for getActiveCalls()
 */
export class ActiveCallsResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {PhoneCall[]} [param.activeCalls]
     */
    constructor({ activeCalls }: {
        activeCalls: PhoneCall[];
    });
    activeCalls: PhoneCall[];
}
/**
 * Class representing result type for getAgentConfig()
 */
export class AgentConfigResult {
    /**
     * Create AgentConfigResult
     * @param {object} param
     * @param {boolean} [param.hasMute]
     * @param {boolean} [param.hasRecord]
     * @param {boolean} [param.hasMerge]
     * @param {boolean} [param.hasSwap]
     * @param {Array} [param.phones]
     * @param {string} [param.selectedPhone]
     */
    constructor({ hasMute, hasRecord, hasMerge, hasSwap, phones, selectedPhone }: {
        hasMute: boolean;
        hasRecord: boolean;
        hasMerge: boolean;
        hasSwap: boolean;
        phones: any[];
        selectedPhone: string;
    });
    hasMute: boolean;
    hasRecord: boolean;
    hasMerge: boolean;
    hasSwap: boolean;
    phones: any[];
    selectedPhone: string;
}
/**
 * Class representing a Phone type
 */
export class Phone {
    /**
     * Create Phone
     * @param {object} param
     * @param {string} param.type
     * @param {string} [param.number]
     */
    constructor({ type, number }: {
        type: string;
        number: string;
    });
    type: string;
    number: string;
}
/**
 * Class representing result type for pauseRecording() & resumeRecording
 */
export class RecordingToggleResult {
    /**
     * Create RecordingToggleResult
     * @param {object} param
     * @param {boolean} param.isRecordingPaused
     * @param {string} [param.contactId]
     * @param {string} [param.initialContactId]
     * @param {string} [param.instanceId]
     * @param {string} [param.region]
     */
    constructor({ isRecordingPaused, contactId, initialContactId, instanceId, region }: {
        isRecordingPaused: boolean;
        contactId: string;
        initialContactId: string;
        instanceId: string;
        region: string;
    });
    isRecordingPaused: boolean;
    contactId: string;
    initialContactId: string;
    instanceId: string;
    region: string;
}
/**
 * Class representing result type for addParticipant()
 */
export class ParticipantResult {
    /**
     * Create ParticipantResult
     * @param {object} param
     * @param {boolean} param.initialCallHasEnded
     * @param {CallInfo} param.callInfo
     * @param {string} param.phoneNumber
     * @param {string} param.callId
     */
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId }: {
        initialCallHasEnded: boolean;
        callInfo: CallInfo;
        phoneNumber: string;
        callId: string;
    });
    initialCallHasEnded: boolean;
    callInfo: CallInfo;
    phoneNumber: string;
    callId: string;
}
/**
 * Class representing result type for removing participant
 */
export class ParticipantRemovedResult {
    /**
     * Create ParticipantRemovedResult
     * @param {object} param
     * @param {PARTICIPANT_TYPE} [param.participantType]
     * @param {string} [param.reason]
     */
    constructor({ reason, participantType }: {
        participantType: any;
        reason: string;
    });
    reason: string;
    participantType: any;
}
/**
 * Class representing result type for getPhoneContacts()
 */
export class PhoneContactsResult {
    /**
     * Create PhoneContactsResult
     * @param {object} param
     * @param {Contact[]} [param.contacts]
     */
    constructor({ contacts }: {
        contacts: Contact[];
    });
    contacts: Contact[];
}
/**
 * Class representing result type for accept(), decline(), dial()
 */
export class CallResult {
    /**
     * Create CallResult
     * @param {object} param
     * @param {PhoneCall} param.call
     */
    constructor({ call }: {
        call: PhoneCall;
    });
    call: PhoneCall;
}
/**
 * Class representing result type for hold() & resume()
 */
export class HoldToggleResult {
    /**
     * Create HoldToggleResult
     * @param {object} param
     * @param {boolean} param.isThirdPartyOnHold
     * @param {boolean} param.isCustomerOnHold
     * @param {PhoneCall[]} [param.calls]
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }: {
        isThirdPartyOnHold: boolean;
        isCustomerOnHold: boolean;
        calls: PhoneCall[];
    });
    calls: PhoneCall[];
    isThirdPartyOnHold: boolean;
    isCustomerOnHold: boolean;
}
/**
 * Class representing result type for init()
 */
export class InitResult {
    /**
     * Create InitResult
     * @param {object} param
     * @param {boolean} [param.showLogin]
     * @param {number} [param.loginFrameHeight]
     */
    constructor({ showLogin, loginFrameHeight }: {
        showLogin: boolean;
        loginFrameHeight: number;
    });
    showLogin: boolean;
    loginFrameHeight: number;
}
/**
 * Class representing generic result type
 */
export class GenericResult {
    /**
     * Create GenericResult
     * @param {object} param
     * @param {boolean} param.success
     */
    constructor({ success }: {
        success: boolean;
    });
    success: boolean;
}
/**
 * Class representing error result type
 */
export class ErrorResult {
    /**
     * Create ErrorResult
     * @param {object} param
     * @param {string} param.type
     * @param {string} param.message
     */
    constructor({ type, message }: {
        type: string;
        message: string;
    });
    type: string;
    message: string;
}
/**
 * Class representing callInfo class
 */
export class CallInfo {
    /**
     * Create CallInfo
     * @param {object} param
     * @param {boolean} param.isOnHold
     * @param {string} [param.initialCallId]
     * @param {Date} [param.callStateTimestamp]
     */
    constructor({ callStateTimestamp, isOnHold, initialCallId }: {
        isOnHold: boolean;
        initialCallId: string;
        callStateTimestamp: Date;
    });
    callStateTimestamp: Date;
    isOnHold: boolean;
    initialCallId: string;
}
/**
 * Class representing a Contact. This object is used to represent
 * phone system contact or any call target
 */
export class Contact {
    /**
     * Create a Contact.
     * @param {object} param
     * @param {string} [param.id] - The unique contactId
     * @param {CONTACT_TYPE} [param.type] - The type of the contact, one of the CONTACT_TYPE values
     * @param {string} [param.name] - The label for this contact to be displayed in the UI
     * @param {string} [param.phoneNumber] - The phone number associcated with this contact
     * @param {string} [param.prefix] - Any prefix to be dialed before dialing the number (i.e. +1)
     * @param {string} [param.extension] - Any extension to be dialed after dialing the number
     * @param {string} [param.endpointARN]
     * @param {string} [param.queue]
     */
    constructor({ phoneNumber, id, type, name, prefix, extension, endpointARN, queue }: {
        id: string;
        type: any;
        name: string;
        phoneNumber: string;
        prefix: string;
        extension: string;
        endpointARN: string;
        queue: string;
    });
    phoneNumber: string;
    id: string;
    type: any;
    name: string;
    prefix: string;
    extension: string;
    endpointARN: string;
    queue: string;
}
/**
* Class representing PhoneCallAttributes
*/
export class PhoneCallAttributes {
    /**
     * Create PhoneCallAttributes.
     * @param {object} param
     * @param {string} [param.voiceCallId] - The voice call id
     * @param {string} [param.hangupReason] - The type of the call, one of the CALL_TYPE values
     * @param {PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
     * @param {string} [param.parentId] - The parent call id of the call
     * @param {boolean} [param.isSoftphoneCall] - is it a softphone call
     * @param {boolean} [param.acceptEnabled]
     * @param {boolean} [param.declineEnabled]
     * @param {boolean} [param.muteEnabled]
     * @param {boolean} [param.swapEnabled]
     * @param {boolean} [param.conferenceEnabled]
     * @param {boolean} [param.holdEnabled]
     * @param {boolean} [param.recordEnabled]
     * @param {boolean} [param.addCallerEnabled]
     */
    constructor({ voiceCallId, hangupReason, participantType, parentId, isOnHold, isSoftphoneCall, acceptEnabled, declineEnabled, muteEnabled, swapEnabled, conferenceEnabled, holdEnabled, recordEnabled, addCallerEnabled }: {
        voiceCallId: string;
        hangupReason: string;
        participantType: any;
        parentId: string;
        isSoftphoneCall: boolean;
        acceptEnabled: boolean;
        declineEnabled: boolean;
        muteEnabled: boolean;
        swapEnabled: boolean;
        conferenceEnabled: boolean;
        holdEnabled: boolean;
        recordEnabled: boolean;
        addCallerEnabled: boolean;
    });
    voiceCallId: string;
    hangupReason: string;
    participantType: any;
    parentId: string;
    isOnHold: any;
    isSoftphoneCall: boolean;
    acceptEnabled: boolean;
    declineEnabled: boolean;
    muteEnabled: boolean;
    swapEnabled: boolean;
    conferenceEnabled: boolean;
    holdEnabled: boolean;
    recordEnabled: boolean;
    addCallerEnabled: boolean;
}
/**
* Class representing a PhoneCall.
*/
export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {object} param
     * @param {string} [param.callId] - The unique callId. This is a required parameter
     * @param {string} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {Contact} [param.contact] - The Call Target / Contact
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {string} [param.agentStatus]
     */
    constructor({ callId, callType, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus }: {
        callId: string;
        callType: string;
        contact: Contact;
        state: string;
        callAttributes: PhoneCallAttributes;
        phoneNumber: string;
        callInfo: CallInfo;
        reason: string;
        closeCallOnError: boolean;
        agentStatus: string;
    });
    callId: string;
    callType: string;
    phoneNumber: string;
    callInfo: CallInfo;
    contact: Contact;
    reason: string;
    closeCallOnError: true;
    agentStatus: string;
    state: string;
    callAttributes: PhoneCallAttributes;
}
/**
* Class representing a VendorConnector.
*/
export class VendorConnector {
    /**
     * Initialize the connector
     * @param {object} connectorConfig
     * @returns {Promise<InitResult>}
     *
     */
    init(config: any): Promise<InitResult>;
    /**
     * Get the currently active calls
     * @returns {Promise<ActiveCallsResult>}
     *
     */
    getActiveCalls(): Promise<ActiveCallsResult>;
    /**
     * Accept call
     * @param {PhoneCall} call - The call to be accepted
     * @returns {Promise<CallResult>}
     *
     */
    acceptCall(call: PhoneCall): Promise<CallResult>;
    /**
     * Decline call
     * @param {PhoneCall} call - The call to be declined
     * @returns {Promise<CallResult>}
     *
     */
    declineCall(call: PhoneCall): Promise<CallResult>;
    /**
     * End call
     * @param {PhoneCall} call - The call to be ended
     * @returns {Promise<>}
     *
     */
    endCall(call: PhoneCall): Promise<any>;
    /**
     * Mute call
     * @returns {Promise<MuteToggleResult>}
     *
     */
    mute(): Promise<MuteToggleResult>;
    /**
     * Unmute call
     * @returns {Promise<MuteToggleResult>}
     *
     */
    unmute(): Promise<MuteToggleResult>;
    /**
     * Hold call
     * @param {PhoneCall} call - The call to be held
     * @returns {Promise<HoldToggleResult>}
     *
     */
    hold(call: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Resume call
     * @param {PhoneCall} call - The call to be resumed
     * @returns {Promise<HoldToggleResult>}
     *
     */
    resume(call: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Set agent status
     * @param {string} agentStatus
     * @returns {Promise<GenericResult>}
     *
     */
    setAgentStatus(agentStatus: string): Promise<GenericResult>;
    /**
     * Set agent status
     * @param {Contact} contact
     * @returns {Promise<GenericResult>}
     *
     */
    dial(contact: Contact): Promise<GenericResult>;
    /**
     * Send digits
     * @param {string} digits
     */
    sendDigits(digits: string): void;
    /**
     * Get phone contacts
     * @returns {Promise<PhoneContactsResult>}
     */
    getPhoneContacts(): Promise<PhoneContactsResult>;
    /**
     * Swap calls
     * @param {PhoneCall} call1
     * @param {PhoneCall} call2
     * @returns {Promise<HoldToggleResult>}
     */
    swap(call1: PhoneCall, call2: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Conference calls
     * @param {PhoneCall[]} calls
     * @returns {Promise<HoldToggleResult>}
     */
    conference(calls: PhoneCall[]): Promise<HoldToggleResult>;
    /**
     * Add participant to call
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @returns {Promise<ParticipantResult>}
     */
    addParticipant(contact: Contact, call: PhoneCall): Promise<ParticipantResult>;
    /**
     * Pause recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>}
     */
    pauseRecording(call: PhoneCall): Promise<RecordingToggleResult>;
    /**
     * Resume recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>}
     */
    resumeRecording(call: PhoneCall): Promise<RecordingToggleResult>;
    /**
     * Get agentConfig
     * @returns {Promise<AgentConfigResult>}
     */
    getAgentConfig(): Promise<AgentConfigResult>;
    /**
     * select phone type along and number if present
     * @param {Phone} phone
     * @returns {Promise<GenericResult>}
     */
    selectPhone(phone: Phone): Promise<GenericResult>;
    /**
     * Logout from Omni
     * @returns {Promise<GenericResult>}
     */
    logout(): Promise<GenericResult>;
    /**
     * Handle message from LWC/Aura component
     * @param {object} message
     */
    handleMessage(message: object): void;
    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall(call: PhoneCall): void;
}
export class Validator {
    static validateString(value: any): typeof Validator;
    static validateBoolean(value: any): typeof Validator;
    static validateEnum(value: any, enumValues: any): typeof Validator;
    static validateDate(value: any): typeof Validator;
    static validateClassObject(object: any, className: any): typeof Validator;
}

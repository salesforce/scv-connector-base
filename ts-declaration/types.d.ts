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
 * Class representing result type for getCapabilities()
 */
export class CapabilitiesResult {
    /**
     * Create CapabilitiesResult
     * @param {object} param
     * @param {boolean} [param.hasMute]
     * @param {boolean} [param.hasHold]
     * @param {boolean} [param.hasRecord]
     * @param {boolean} [param.hasMerge]
     * @param {boolean} [param.hasSwap]
     */
    constructor({ hasMute, hasHold, hasRecord, hasMerge, hasSwap }: {
        hasMute: boolean;
        hasHold: boolean;
        hasRecord: boolean;
        hasMerge: boolean;
        hasSwap: boolean;
    });
    hasMute: boolean;
    hasHold: boolean;
    hasRecord: boolean;
    hasMerge: boolean;
    hasSwap: boolean;
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
 * Class representing result type for removing participant
 */
export class ParticipantRemovedResult {
    /**
     * Create ParticipantRemovedResult
     * @param {object} param
     * @param {string} [param.reason]
     */
    constructor({ reason }: {
        reason: string;
    });
    reason: string;
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
 * Class representing result type for conference()
 */
export class ConferenceResult {
    /**
     * Create ConferenceResult
     * @param {object} param
     * @param {boolean} param.isThirdPartyOnHold
     * @param {boolean} param.isCustomerOnHold
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold }: {
        isThirdPartyOnHold: boolean;
        isCustomerOnHold: boolean;
    });
    isThirdPartyOnHold: boolean;
    isCustomerOnHold: boolean;
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
     * @param {PhoneCall[]} param.calls
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }: {
        isThirdPartyOnHold: boolean;
        isCustomerOnHold: boolean;
        calls: PhoneCall[];
    });
    isThirdPartyOnHold: boolean;
    isCustomerOnHold: boolean;
    calls: PhoneCall[];
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
 * Class representing callInfo class for use in ParticipantResult
 */
export class CallInfo {
    /**
     * Create CallInfo
     * @param {object} param
     * @param {Date} [param.callStateTimestamp]
     * @param {boolean} param.isOnHold
     */
    constructor({ callStateTimestamp, isOnHold }: {
        callStateTimestamp: Date;
        isOnHold: boolean;
    });
    callStateTimestamp: Date;
    isOnHold: boolean;
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
     *
     */
    constructor({ phoneNumber, id, type, name, prefix, extension }: {
        id: string;
        type: any;
        name: string;
        phoneNumber: string;
        prefix: string;
        extension: string;
    });
    phoneNumber: string;
    id: string;
    type: any;
    name: string;
    prefix: string;
    extension: string;
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
    * @param {boolean} [param.isOnHold]
    */
    constructor({ voiceCallId, hangupReason, participantType, parentId, isOnHold }: {
        voiceCallId: string;
        hangupReason: string;
        participantType: any;
        parentId: string;
        isOnHold: boolean;
    });
    voiceCallId: string;
    hangupReason: string;
    participantType: any;
    parentId: string;
    isOnHold: boolean;
}
/**
* Class representing a PhoneCall.
*/
export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {object} param
     * @param {string} param.callId - The unique callId. This is a required parameter
     * @param {string} param.callType - The type of the call, one of the CALL_TYPE values
     * @param {Contact} param.contact - The Call Target / Contact
     * @param {string} param.state - The state of the call, i.e. ringing, connected, declined, failed
     * @param {PhoneCallAttributes} param.callAttributes - Any additional call attributes
     * @param {string} param.phoneNumber - The phone number associated with this call (usually external number) //TODO: remove in 230 and read it from Contact
     * @param {CallInfo} param.callInfo
     */
    constructor({ callId, callType, contact, state, callAttributes, phoneNumber, callInfo }: {
        callId: string;
        callType: string;
        contact: Contact;
        state: string;
        callAttributes: PhoneCallAttributes;
        phoneNumber: string;
        callInfo: CallInfo;
    });
    callId: string;
    callType: string;
    contact: Contact;
    state: string;
    callAttributes: PhoneCallAttributes;
    phoneNumber: string;
    callInfo: CallInfo;
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
     * @returns {Promise<CallResult>}
     *
     */
    endCall(call: PhoneCall): Promise<CallResult>;
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
     * @returns {Promise<ConferenceResult>}
     */
    conference(calls: PhoneCall[]): Promise<ConferenceResult>;
    /**
     * Add participant to call
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @returns {Promise<ConferenceResult>}
     */
    addParticipant(contact: Contact, call: PhoneCall): Promise<ConferenceResult>;
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
     * Get capabilities
     * @returns {Promise<CapabilitiesResult>}
     */
    getCapabilities(): Promise<CapabilitiesResult>;
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
    static validateObject(value: any): typeof Validator;
    static validateEnum(value: any, enumValues: any): typeof Validator;
    static validateArray(value: any): typeof Validator;
    static validateDate(value: any): typeof Validator;
    static validateClassObject(object: any, className: any): typeof Validator;
}

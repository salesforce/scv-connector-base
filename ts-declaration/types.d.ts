/**
 @module types
*/
/**
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create ActiveCallsResult
     * @param {boolean} isMuted
     */
    constructor({ isMuted }: boolean);
    isMuted: any;
}
/**
 * Class representing result type for getActiveCalls()
 */
export class ActiveCallsResult {
    /**
     * Create ActiveCallsResult
     * @param {PhoneCall[]} [activeCalls]
     */
    constructor({ activeCalls }?: PhoneCall[]);
    activeCalls: any;
}
/**
 * Class representing result type for getCapabilities()
 */
export class CapabilitiesResult {
    /**
     * Create CapabilitiesResult
     * @param {boolean} [hasMute]
     * @param {boolean} [hasHold]
     * @param {boolean} [hasRecord]
     * @param {boolean} [hasMerge]
     */
    constructor({ hasMute, hasHold, hasRecord, hasMerge }?: boolean);
    hasMute: any;
    hasHold: any;
    hasRecord: any;
    hasMerge: any;
}
/**
 * Class representing result type for pauseRecording() & resumeRecording
 */
export class RecordingToggleResult {
    /**
     * Create RecordingToggleResult
     * @param {boolean} isRecordingPaused
     * @param {string} [contactId]
     * @param {string} [initialContactId]
     * @param {string} [instanceId]
     * @param {string} [region]
     */
    constructor({ isRecordingPaused, contactId, initialContactId, instanceId, region }: boolean);
    isRecordingPaused: any;
    contactId: any;
    initialContactId: any;
    instanceId: any;
    region: any;
}
/**
 * Class representing result type for removing participant
 */
export class ParticipantRemovedResult {
    /**
     * Create ParticipantRemovedResult
     * @param {string} [reason]
     */
    constructor({ reason }?: string);
    reason: any;
}
/**
 * Class representing result type for addParticipant()
 */
export class ParticipantResult {
    /**
     * Create ParticipantResult
     * @param {boolean} initialCallHasEnded
     * @param {CallInfo} callInfo
     * @param {string} phoneNumber
     * @param {string} [callId]
     */
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId }: boolean);
    initialCallHasEnded: any;
    callInfo: any;
    phoneNumber: any;
    callId: any;
}
/**
 * Class representing result type for conference()
 */
export class ConferenceResult {
    /**
     * Create ConferenceResult
     * @param {boolean} isThirdPartyOnHold
     * @param {boolean} isCustomerOnHold
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold }: boolean);
    isThirdPartyOnHold: any;
    isCustomerOnHold: any;
}
/**
 * Class representing result type for getPhoneContacts()
 */
export class PhoneContactsResult {
    /**
     * Create PhoneContactsResult
     * @param {Contact[]} [contacts]
     */
    constructor({ contacts }?: Contact[]);
    contacts: any;
}
/**
 * Class representing result type for accept(), decline(), dial()
 */
export class CallResult {
    /**
     * Create CallResult
     * @param {PhoneCall} call
     */
    constructor({ call }: PhoneCall);
    call: any;
}
/**
 * Class representing result type for hold() & resume()
 */
export class HoldToggleResult {
    /**
     * Create HoldToggleResult
     * @param {boolean} isThirdPartyOnHold
     * @param {boolean} isCustomerOnHold
     * @param {PhoneCall[]} calls
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }: boolean);
    isThirdPartyOnHold: any;
    isCustomerOnHold: any;
    calls: any;
}
/**
 * Class representing result type for init()
 */
export class InitResult {
    /**
     * Create InitResult
     * @param {boolean} [showLogin]
     * @param {number} [loginFrameHeight]
     */
    constructor({ showLogin, loginFrameHeight }?: boolean);
    showLogin: any;
    loginFrameHeight: any;
}
/**
 * Class representing generic result type
 */
export class GenericResult {
    /**
     * Create GenericResult
     */
    constructor({ success }: {
        success: any;
    });
    success: any;
}
/**
 * Class representing callInfo class for use in ParticipantResult
 */
export class CallInfo {
    /**
     * Create CallInfo
     * @param {Date} [callStateTimestamp]
     * @param {boolean} isOnHold
     */
    constructor({ callStateTimestamp, isOnHold }?: Date);
    callStateTimestamp: any;
    isOnHold: any;
}
/**
 * Class representing a Contact. This object is used to represent
 * phone system contact or any call target
 */
export class Contact {
    /**
     * Create a Contact.
     * @param {string} id - The unique contactId
     * @param {string} type - The type of the contact, one of the CONTACT_TYPE values
     * @param {string} name - The label for this contact to be displayed in the UI
     * @param {string} phoneNumber - The phone number associcated with this contact
     * @param {string} prefix - Any prefix to be dialed before dialing the number (i.e. +1)
     * @param {string} extension - Any extension to be dialed after dialing the number
     *
     */
    constructor({ phoneNumber, id, type, name, prefix, extension }: string);
    phoneNumber: any;
    id: any;
    type: any;
    name: any;
    prefix: any;
    extension: any;
}
/**
* Class representing PhoneCallAttributes
*/
export class PhoneCallAttributes {
    constructor({ voiceCallId, hangupReason, participantType, parentId, isOnHold }: {
        voiceCallId: any;
        hangupReason: any;
        participantType: any;
        parentId: any;
        isOnHold: any;
    });
    voiceCallId: any;
    hangupReason: any;
    participantType: any;
    parentId: any;
    isOnHold: any;
}
/**
* Class representing a PhoneCall.
*/
export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {string} callId - The unique callId. This is a required parameter
     * @param {string} callType - The type of the call, one of the CALL_TYPE values
     * @param {Contact} contact - The Call Target / Contact
     * @param {string} state - The state of the call, i.e. ringing, connected, declined, failed
     * @param {PhoneCallAttributes} callAttributes - Any additional call attributes
     * @param {string} phoneNumber - The phone number associated with this call (usually external number) //TODO: remove in 230 and read it from Contact
     * @param {CallInfo} callInfo
     */
    constructor({ callId, callType, contact, state, callAttributes, phoneNumber, callInfo }: string);
    callId: any;
    callType: any;
    contact: any;
    state: any;
    callAttributes: any;
    phoneNumber: any;
    callInfo: any;
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
    handleMessage(): void;
    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall(): void;
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

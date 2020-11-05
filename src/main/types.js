import constants from './constants.js';

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
    constructor({ isMuted }) {
        this.isMuted = isMuted;
    }
}

/**
 * Class representing result type for getActiveCalls()
 */
export class ActiveCallsResult {
    /**
     * Create ActiveCallsResult
     * @param {PhoneCall[]} [activeCalls]
     */
    constructor({ activeCalls = [] }) {
        if (activeCalls.length > 0) {
            activeCalls.forEach(activeCall => {
                Validator.validateClassObject(activeCall, PhoneCall);
            });
        }
        this.activeCalls = activeCalls;
    }
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
    constructor({ hasMute = true, hasHold = true, hasRecord = true, hasMerge = true }) {
        this.hasMute = hasMute;
        this.hasHold = hasHold;
        this.hasRecord = hasRecord;
        this.hasMerge = hasMerge;
    }
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
    constructor({ isRecordingPaused, contactId = null, initialContactId = null, instanceId = null, region = null }) {
        this.isRecordingPaused = isRecordingPaused;
        this.contactId = contactId;
        this.initialContactId = initialContactId;
        this.instanceId = instanceId;
        this.region = region;
    }
}

/**
 * Class representing result type for removing participant
 */
export class ParticipantRemovedResult {
    /**
     * Create ParticipantRemovedResult
     * @param {string} [reason]
     */
    constructor({ reason = '' }) {
        this.reason = reason;
    }
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
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId = '' }) {
        Validator.validateClassObject(callInfo, CallInfo);
        this.initialCallHasEnded = initialCallHasEnded;
        this.callInfo = callInfo;
        this.phoneNumber = phoneNumber;
        this.callId = callId;
    }
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
    constructor({ isThirdPartyOnHold, isCustomerOnHold }) {
        this.isThirdPartyOnHold = isThirdPartyOnHold;
        this.isCustomerOnHold = isCustomerOnHold;
    }
}

/**
 * Class representing result type for getPhoneContacts()
 */
export class PhoneContactsResult {
    /**
     * Create PhoneContactsResult
     * @param {Contact[]} [contacts]
     */
    constructor({ contacts = [] }) {
        if (contacts.length > 0) {
            contacts.forEach(contact => {
                Validator.validateClassObject(contact, Contact);
            });
        }
        this.contacts = contacts;
    }
}

/**
 * Class representing result type for accept(), decline(), dial()
 */
export class CallResult {
    /**
     * Create CallResult
     * @param {PhoneCall} call
     */
    constructor({ call }) {
        Validator.validateClassObject(call, PhoneCall);
        this.call = call;
    }
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
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }) {
        Object.values(calls).forEach(call => {
            Validator.validateClassObject(call, PhoneCall);
        });
        this.isThirdPartyOnHold = isThirdPartyOnHold;
        this.isCustomerOnHold = isCustomerOnHold;
        this.calls = calls;
    }
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
    constructor({ showLogin = false, loginFrameHeight = 350 }) {
        this.showLogin = showLogin;
        this.loginFrameHeight = loginFrameHeight;
    }
}

/**
 * Class representing generic result type
 */
export class GenericResult {
    /**
     * Create GenericResult
     */
    constructor({ success }) {
        this.success = success;
    }
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
    constructor({ callStateTimestamp = null, isOnHold}) {
        if (callStateTimestamp) {
            Validator.validateDate(callStateTimestamp);
        }
        this.callStateTimestamp = callStateTimestamp;
        this.isOnHold = isOnHold;
    }
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
    constructor({phoneNumber, id, type, name, prefix, extension}) {
        if (phoneNumber) {
            Validator.validateString(phoneNumber);
        }
        if (type) {
            Validator.validateEnum(type, Object.values(constants.CONTACT_TYPE));
        }
        if (id) {
            Validator.validateString(id);
        }
        if (name) {
            Validator.validateString(name);
        }
        if (prefix) {
            Validator.validateString(prefix);
        }
        if (extension) {
            Validator.validateString(extension);
        }

        this.phoneNumber = phoneNumber;
        this.id = id;
        this.type = type;
        this.name = name;
        this.prefix = prefix;
        this.extension = extension;
    }
}

/** 
* Class representing PhoneCallAttributes
*/

 export class PhoneCallAttributes {
    constructor({ voiceCallId, hangupReason, participantType, parentId, isOnHold }) {
        if (voiceCallId) {
            Validator.validateString(voiceCallId);
        }
        if (hangupReason) {
            Validator.validateString(hangupReason);
        }
        if (participantType) {
            Validator.validateEnum(participantType, Object.values(constants.PARTICIPANT_TYPE));
        }
        if (parentId) {
            Validator.validateString(parentId);
        }
        if (isOnHold !== undefined) {
            Validator.validateBoolean(isOnHold);
        }

        this.voiceCallId = voiceCallId;
        this.hangupReason = hangupReason;
        this.participantType = participantType;
        this.parentId = parentId;
        this.isOnHold = isOnHold;
    }
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
    constructor({callId, callType, contact, state, callAttributes, phoneNumber, callInfo}) {
        Validator.validateString(callId)
            .validateEnum(callType ? 
                callType.charAt(0).toUpperCase() + callType.slice(1) :
                callType, Object.values(constants.CALL_TYPE))
            .validateString(state)
            .validateObject(callAttributes)
            .validateString(phoneNumber);
        this.callId = callId;
        this.callType = callType;
        this.contact = contact;
        this.state = state;
        this.callAttributes = callAttributes;
        this.phoneNumber = phoneNumber;
        this.callInfo = callInfo;
    }
}

/** 
* Class representing a VendorConnector. 
*/
/* eslint-disable no-unused-vars */

export class VendorConnector {
    /**
     * Initialize the connector
     * @param {object} connectorConfig
     * @returns {Promise<InitResult>} 
     * 
     */
    init(config) {
        throw new Error('Not implemented');
    }

    /**
     * Get the currently active calls
     * @returns {Promise<ActiveCallsResult>} 
     * 
     */
    getActiveCalls() {
        throw new Error('Not implemented');
    }

    /**
     * Accept call
     * @param {PhoneCall} call - The call to be accepted
     * @returns {Promise<CallResult>} 
     * 
     */
    acceptCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * Decline call
     * @param {PhoneCall} call - The call to be declined
     * @returns {Promise<CallResult>} 
     * 
     */
    declineCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * End call
     * @param {PhoneCall} call - The call to be ended
     * @returns {Promise<CallResult>} 
     * 
     */
    endCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * Mute call
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    mute() {
        throw new Error('Not implemented');
    }

    /**
     * Unmute call
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    unmute() {
        throw new Error('Not implemented');
    }

    /**
     * Hold call
     * @param {PhoneCall} call - The call to be held
     * @returns {Promise<HoldToggleResult>} 
     * 
     */
    hold(call) {
        throw new Error('Not implemented');
    }

    /**
     * Resume call
     * @param {PhoneCall} call - The call to be resumed
     * @returns {Promise<HoldToggleResult>} 
     * 
     */
    resume(call) {
        throw new Error('Not implemented');
    }

    /**
     * Set agent status
     * @param {string} agentStatus
     * @returns {Promise<GenericResult>} 
     * 
     */
    setAgentStatus(agentStatus) {
        throw new Error('Not implemented');
    }

    /**
     * Set agent status
     * @param {Contact} contact
     * @returns {Promise<GenericResult>} 
     * 
     */
    dial(contact) {
        throw new Error('Not implemented');
    }

    /**
     * Send digits
     * @param {string} digits
     */
    sendDigits(digits) {
        throw new Error('Not implemented');
    }

    /**
     * Get phone contacts
     * @returns {Promise<PhoneContactsResult>} 
     */
    getPhoneContacts() {
        throw new Error('Not implemented');
    }

    /**
     * Swap calls
     * @param {PhoneCall} call1
     * @param {PhoneCall} call2
     * @returns {Promise<HoldToggleResult>} 
     */
    swap(call1, call2) {
        throw new Error('Not implemented');
    }

    /**
     * Conference calls
     * @param {PhoneCall[]} calls
     * @returns {Promise<ConferenceResult>} 
     */
    conference(calls) {
        throw new Error('Not implemented');
    }

    /**
     * Add participant to call
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @returns {Promise<ConferenceResult>} 
     */
    addParticipant(contact, call) {
        throw new Error('Not implemented');
    }

    /**
     * Pause recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */
    pauseRecording(call) {
        throw new Error('Not implemented');
    }

    /**
     * Resume recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */
    resumeRecording(call) {
        throw new Error('Not implemented');
    }

    /**
     * Get capabilities
     * @returns {Promise<CapabilitiesResult>} 
     */
    getCapabilities() {
        throw new Error('Not implemented');
    }

    /**
     * Logout from Omni
     * @returns {Promise<GenericResult>} 
     */
    logout() {
        throw new Error('Not implemented');
    }

    /**
     * Handle message from LWC/Aura component
     * @param {object} message
     */
    handleMessage() {
        throw new Error('Not implemented');
    }

    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall() {
        throw new Error('Not implemented');
    }
}

export class Validator {
    static validateString(value) {
        if (typeof value !== 'string') {
            throw new Error(`Invalid argument. Expecting a string but got ${typeof value}`);
        }
        return this;
    }

    static validateBoolean(value) {
        if (typeof value !== 'boolean') {
            throw new Error(`Invalid argument. Expecting a boolean but got ${typeof value}`);
        }
        return this;
    }

    static validateObject(value) {
        if (typeof value !== 'object') {
            throw new Error(`Invalid argument. Expecting an object but got ${typeof value}`);
        }
        return this;
    }

    static validateEnum(value, enumValues) {
        if (!enumValues.includes(value)) {
            throw new Error(`Invalid argument. Expecting a value from ${JSON.stringify(enumValues)} but got ${value}`);
        }
        return this;
    }

    static validateArray(value) {
        if (!Array.isArray(value)) {
            throw new Error(`Invalid argument. Expecting an array from ${JSON.stringify(value)}`);
        }
        return this;
    }

    static validateDate(value) {
        if (!(value instanceof Date)) {
            throw new Error(`Invalid argument. Expecting a Date object but got ${typeof value}`);
        }
        return this;
    }

    static validateClassObject(object, className) {
        if (!(object instanceof className)) {
            throw new Error(`Invalid className. Expecting object of class ${className}`);
        }
        return this;
    }
}
import constants from './constants.js';

/**
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {boolean} param.isMuted
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
     * @param {object} param
     * @param {PhoneCall[]} [param.activeCalls]
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
     * @param {object} param
     * @param {boolean} [param.hasMute]
     * @param {boolean} [param.hasRecord]
     * @param {boolean} [param.hasMerge]
     * @param {boolean} [param.hasSwap]
     */
    constructor({ hasMute = true, hasRecord = true, hasMerge = true, hasSwap = true }) {
        this.hasMute = hasMute;
        this.hasRecord = hasRecord;
        this.hasMerge = hasMerge;
        this.hasSwap = hasSwap;
    }
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
    constructor({ isRecordingPaused, contactId = null, initialContactId = null, instanceId = null, region = null }) {
        this.isRecordingPaused = isRecordingPaused;
        this.contactId = contactId;
        this.initialContactId = initialContactId;
        this.instanceId = instanceId;
        this.region = region;
    }
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
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId }) {
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
     * @param {object} param
     * @param {boolean} param.isThirdPartyOnHold
     * @param {boolean} param.isCustomerOnHold
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
     * @param {object} param
     * @param {Contact[]} [param.contacts]
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
     * @param {object} param
     * @param {PhoneCall} param.call
     */
    constructor({ call }) {
        Validator.validateClassObject(call, PhoneCall);
        this.call = call;
    }
}

/**
 * Class representing result type for endCall() and HANGUP publishEvent
 */
export class HangUpResult {
    /**
     * Create HangUpResult
     * @param {object} param
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {CALL_TYPE} [param.callType]
     * @param {string} [param.callId]
     * @param {string} [param.agentStatus]
     */
    constructor({ reason, closeCallOnError, callType, callId, agentStatus }) {
        if (reason) {
            this.reason = reason;
        }
        if (closeCallOnError) {
            this.closeCallOnError = closeCallOnError;
        }
        if (callType) {
            Validator.validateEnum(callType, Object.values(constants.CALL_TYPE));
            this.callType = callType;
        }
        if (callId) {
            this.callId = callId;
        }
        if (agentStatus) {
            this.agentStatus = agentStatus;
        }
    }
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
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }) {
        if (calls) {
            Object.values(calls).forEach(call => {
                Validator.validateClassObject(call, PhoneCall);
            });
            this.calls = calls;
        }
        this.isThirdPartyOnHold = isThirdPartyOnHold;
        this.isCustomerOnHold = isCustomerOnHold;
    }
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
     * @param {object} param
     * @param {boolean} param.success
     */
    constructor({ success }) {
        this.success = success;
    }
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
    constructor({ type, message }) {
        this.type = type;
        this.message = message;
    }
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
    constructor({ callStateTimestamp = null, isOnHold, initialCallId }) {
        if (callStateTimestamp) {
            Validator.validateDate(callStateTimestamp);
        }
        this.callStateTimestamp = callStateTimestamp;
        this.isOnHold = isOnHold;
        this.initialCallId = initialCallId;
    }
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
     /**
     * Create PhoneCallAttributes.
     * @param {object} param
     * @param {string} [param.voiceCallId] - The voice call id
     * @param {string} [param.hangupReason] - The type of the call, one of the CALL_TYPE values
     * @param {PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
     * @param {string} [param.parentId] - The parent call id of the call
     * @param {boolean} [param.isOnHold]
     */
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
     * @param {object} param
     * @param {string} [param.callId] - The unique callId. This is a required parameter
     * @param {string} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {Contact} [param.contact] - The Call Target / Contact 
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed 
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     */
    constructor({callId, callType, contact, state, callAttributes, phoneNumber, callInfo }) {
        // TODO: Revisit the required fields
        if (callId) {
            Validator.validateString(callId);
            this.callId = callId;
        }
        if (callType) {
            Validator.validateEnum(callType, Object.values(constants.CALL_TYPE));
            this.callType = callType;
        }
        if (phoneNumber) {
            Validator.validateString(phoneNumber);
            this.phoneNumber = phoneNumber;
        }
        if (callInfo) {
            Validator.validateClassObject(callInfo, CallInfo);
            this.callInfo = callInfo;
        }
        if (contact) {
            Validator.validateClassObject(contact, Contact);
            this.contact = contact;
        }
        this.state = state;
        this.callAttributes = callAttributes;
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
     * @returns {Promise<>} 
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
    handleMessage(message) {
        throw new Error('Not implemented');
    }

    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall(call) {
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

    static validateEnum(value, enumValues) {
        const regex = new RegExp(enumValues.join( "|" ), "i");
        if (!regex.test(value)) {
            throw new Error(`Invalid argument. Expecting a value from ${JSON.stringify(enumValues)} but got ${value}`);
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
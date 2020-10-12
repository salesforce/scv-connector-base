import constants from './constants.js';

/**
 @module types
*/

/**
 * Class representing result type for getActiveCalls()
 */
export class ActiveCallsResult {
    /**
     * Create RecordingToggleResult
     * @param {PhoneCall[]} [activeCalls]
     */
    constructor({ activeCalls = [] }) {
        this.activeCalls = activeCalls;
    }
}

/**
 * Class representing result type for getCapabilities()
 */
export class CapabilitiesResult {
    /**
     * Create RecordingToggleResult
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
     * @param {string} reason
     */
    constructor({ reason }) {
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
     */
    constructor({ initialCallHasEnded, callInfo, phoneNumber }) {
        this.initialCallHasEnded = initialCallHasEnded;
        this.callInfo = callInfo;
        this.phoneNumber = phoneNumber;
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
     * @param {Contact[]} contacts
     */
    constructor({ contacts }) {
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
     * Create Result
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
     * @param {Date} callStateTimestamp
     * @param {boolean} isOnHold
     */
    constructor({ callStateTimestamp, isOnHold}) {
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
     * @param {string} label - The label for this contact to be displayed in the UI
     * @param {string} phoneNumber - The phone number associcated with this contact
     * @param {string} prefix - Any prefix to be dialed before dialing the number (i.e. +1)
     * @param {string} extension - Any extension to be dialed after dialing the number
     * 
     */
    constructor({phoneNumber, id, type, label, prefix, extension}) {
        if (phoneNumber) {
            Validator.validateString(phoneNumber);
        }
        if (type) {
            Validator.validateEnum(type, Object.values(constants.CONTACT_TYPE));
        }
        if (id) {
            Validator.validateString(id);
        }
        if (label) {
            Validator.validateString(label);
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
        this.label = label;
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
     */
    constructor({callId, callType, contact, state, callAttributes, phoneNumber}) {
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

    static validateClassObject(object, className) {
        if (!object instanceof className) {
            throw new Error(`Invalid className. Expecting object of class ${className}`);
        }
        return this;
    }
}
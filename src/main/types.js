import constants from './constants.js';

/**
 @module types
*/

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
        Validator.validateString(voiceCallId)
        .validateString(hangupReason)
        .validateEnum(participantType, Object.values(constants.PARTICIPANT_TYPE))
        .validateString(parentId)
        .validateBoolean(isOnHold);

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


class Validator {
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
}
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
            //validateType(contact, Contact); //TODO: add this
        this.callId = callId;
        this.callType = callType;
        this.contact = contact;
        this.state = state;
        this.callAttributes = callAttributes;
        this.phoneNumber = phoneNumber;
    }
}
/**
 * @typedef {string | number | boolean } FieldType
*/

/**
 * @typedef { string[] } FieldValues
*/

 /** Class representing a single login field */
 export class LoginField {
    /**
     * Create a Login Field
     * @param {string} fieldId - Unique Id of the field 
     * @param {string} fieldLabel - The label of the field to be shown in the UI
     * @param {FieldType} fieldType - The type of field. This will deterine what UI control to show in the UI
     * @param {FieldValues} fieldValues - Possible values to choose from in case of an Enum field type
     */
    constructor({fieldId, fieldLabel, fieldType, fieldValues}) {
        Validator.validateString(fieldId)
            .validateString(fieldLabel)
            .validateString(fieldType); //TODO: does fieldValues need validation?

        this.fieldId = fieldId;
        this.fieldLabel = fieldLabel;
        this.fieldType = fieldType;
        this.fieldValues = fieldValues;
    }
 }

 /** Class representing the telephone system branding info- This will be shown in the UI */
 export class TelephonySystemInfo {
    /**
     * Create a TelephonySystemInfo
     * @param {string} companyName - Company name of the telephony System.
     * @param {string} productName - Product name of the telephony system
     * @param {string} brandingAsset - base64 encoded Image of the telephony system branding asset for the UI
     */
    constructor({companyName, productName, brandingAsset}) {
        Validator.validateString(companyName)
            .validateString(productName)
            .validateString(brandingAsset);

        this.companyName = companyName;
        this.productName = productName;
        this.brandingAsset = brandingAsset;
    }
 }

/** Class representing Login Settings */
export class LoginSettings {
    /**
     * Create a LoginSettings.
     * @param {boolean} loginRequired - boolean regarding whether the login is required or not. 
     * @param {TelephonySystemInfo} telephonysystemInfo - Telephony System Info for UI branding
     * @param {LoginField[]} loginFields - Ordered list of login fields to show in the UI
     */
    constructor({loginRequired, telephonySystemInfo, loginFields = []}) {
        Validator.validateBoolean(loginRequired)
            .validateArray(loginFields)
            .validateType(telephonySystemInfo, TelephonySystemInfo);
            
        this.loginRequired = loginRequired;
        this.loginFields = loginFields;
        this.telephonySystemInfo = telephonySystemInfo;
    }
}

class Validator {
    static validateType(value, type) {
        if (!value || !(value instanceof type) || value.constructor.name !== type.name) {
            throw new Error(`Invalid argument. Expecting a ${type.name} but got ${typeof value}`);
        }
        return this;
    }

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

    static validateArray(value) {
        if (!Array.isArray(value)) {
            throw new Error(`Invalid argument. Expecting an array but got ${typeof value}`);
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
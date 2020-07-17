/**
 * @typedef {"PhoneBook" | "Queue" | "PhoneNumber"} ContactType
 * @typedef {"Agent" | "Initial_Caller" | "Third_Party"} ParticipantType
 * @typedef {"Inbound" | "Outbound" | "Transfer"} CallType
 * @typedef {"AlphaNumeric" | "String" | "Number" | "Boolean" | "Enum" } FieldType
 */

/** 
 * Class representing a Contact. This object is used to represent 
 * phone system contact or any call target
 */

export class Contact {

    /**
     * Create a Contact.
     * @param {String} id - The unique contactId
     * @param {ContactType} type - The type of the contact
     * @param {String} label - The label for this contact to be displayed in the UI
     * @param {String} phoneNumber - The phone number associcated with this contact
     * @param {String} prefix - Any preix to be dialed before dialing the number
     * @param {String} extension - Any extenstion to be dialed after dialing the number
     * 
     */
    constructor(phoneNumber, id, type, label, prefix, extension) {
        this.phoneNumber = phoneNumber;
        this.id = id;
        this.type = type;
        this.label = label;
        this.prefix = prefix;
        this.extension = extension;
    }
}

/** 
* Class representing a PhoneCall. 
*/

export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {String} callId - The unique callId. This is a required parameter
     * @param {CallType} callType - The type of the call
     * @param {Contact} contact - The Call Target / Contact 
     * @param {String} callState - The state of the call
     * @param {String} voiceCallId - The Salesforce Id of the VoiceCall Object
     * @param {Object} callAttributes - Any additional call attributes 
     * @param {string} callAttributes.hangupReason - The reason in case the call is ended (TODO)
     * @param {string} callAttributes.parentId - The parent Id of this call in case of transfer
     * @param {Boolean} callAttributes.isOnHold - Is this call on hold  (TODO)
     */
    constructor(callId, callType, contact, callState, voiceCallId, callAttributes) {
        Validator.
            validateString(callId).
            validateString(callType).
            validateString(callState).
            validateObject(callAttributes);
            //validateType(contact, Contact); //TODO: add this
        this.callId = callId;
        this.callType = callType;
        this.contact = contact;
        this.state = callState; //TODO: rename state => callState in core
        this.voiceCallId = voiceCallId;
        this.callAttributes = callAttributes;
    }
}

 /** Class representing a single login field */
 export class LoginField {
    /**
     * Create a Login Field
     * @param {String} fieldId - Unique Id of the field 
     * @param {String} fieldLabel - The label of the field to be shown in the UI
     * @param {FieldType} fieldType - The type of field. This will deterine what UI control to show in the UI
     * @param {fieldValues} fieldValues - Possible values to choose from in case of an Enum field type
     */
    constructor(fieldId, fieldLabel, fieldType, fieldValues) {
        Validator.
            validateString(fieldId).
            validateString(fieldLabel).
            validateString(fieldType); //TODO: does fieldValues need validation?

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
     * @param {String} companyName - Company name of the telephony System.
     * @param {String} productName - Product name of the telephony system
     * @param {String} brandingAsset - base64 encoded Image of the telephony system branding asset for the UI
     */
    constructor(companyName, productName, brandingAsset) {
        Validator.
            validateString(companyName).
            validateString(productName).
            validateString(brandingAsset);

        this.companyName = companyName;
        this.productName = productName;
        this.brandingAsset = brandingAsset;
    }
 }

/** Class representing Login Settings */
export class LoginSettings {
    /**
     * Create a LoginSettings.
     * @param {Boolean} loginRequired - Boolean regarding whether the login is required or not. 
     * @param {LoginField[]} loginFields - Ordered list of login fields to show in the UI
     * @param {TelephonySystemInfo} telephonsystemInfo - Telephony System Info for UI branding
     */
    constructor(loginRequired, loginFields = [], telephonySystemInfo) {
        Validator.
            validateBoolean(loginRequired).
            validateArray(loginFields).
            validateType(telephonySystemInfo, TelephonySystemInfo);
            
        this.loginRequired = loginRequired;
        this.loginFields = loginFields;
        this.telephonySystemInfo = telephonySystemInfo;
    }
}

class Validator {
    static validateType(value, type) {
        if (value === undefined || !(value instanceof type) || value.constructor.name !== type.name) {
            throw new Error("Invalid argument. Expecting a "+ type.name);
        }
        return this;
    }
    static validateString(value) {
        if (typeof value != "string") { 
            throw new Error("Invalid argument. Expecting a string value");
        }
        return this;
    }
    static validateBoolean(value) {
        if (typeof value != "boolean") { 
            throw new Error("Invalid argument. Expecting a boolean value");
        }
        return this;
    }
    static validateArray(value) {
        if (!Array.isArray(value)) { 
            throw new Error("Invalid argument. Expecting an array value");
        }
        return this;
    }
    static validateObject(value) {
        if (typeof value != "object") { 
            throw new Error("Invalid argument. Expecting an object value");
        }
        return this;
    }
}
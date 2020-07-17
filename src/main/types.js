/**
 * @typedef {"PhoneBook" | "Queue" | "PhoneNumber"} ContactType
 */

/** 
 * Class representing a CallTarget. This object is used to represent 
 * phone system contact or an outbound call target
 */

export class CallTarget {

    /**
     * Create a CallTarget.
     * @param {String} id - The unique contactId
     * @param {ContactType} contactType - The type of the contact
     * @param {String} label - The label for this contact to be displayed in the UI
     * @param {String} voiceCallId - The Salesforce Id of the VoiceCall Object
     * @param {String} phoneNumber - The phone number associcated with this contact
     * @param {String} prefix - Any preix to be dialed before dialing the number
     * @param {String} extension - Any extenstion to be dialed after dialing the number
     * 
     */
    constructor(id, type, label, phoneNumber, prefix, extension) {
        this.contactId = id;
        this.contactType = type;
        this.label = label;
        this.phoneNumber = phoneNumber;
        this.prefix = prefix; 
        this.extension = extension;
    }
}

/**
 * @typedef {"Inbound" | "Outbound" | "Transfer"} CallType
 */

/** 
* Class representing a PhoneCall. 
*/

export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {String} callId - The unique callId. This is a required parameter
     * @param {CallType} callType - The type of the call
     * @param {String} callState - The state of the call
     * @param {String} voiceCallId - The Salesforce Id of the VoiceCall Object
     * @param {String} phoneNumber - The phone number of the other party
     * @param {Object} callAttributes - Any additional call attributes 
     * @param {string} callAttributes.reason - The reason in case the call is ended
     * @param {string} callAttributes.parentId - The parent Id of this tis call in case of transfer
     */
    constructor(callId, callType, state, voiceCallId, phoneNumber, callAttributes) {
        this.callType = callType;
        this.callId = callId;
        this.state = state;
        this.voiceCallId = voiceCallId;
        this.phoneNumber = phoneNumber;
        this.callAttributes = callAttributes;
    }
}

/**
 * @typedef {"AlphaNumeric" | "String" | "Number" | "Boolean" | "Enum" } FieldType
 */

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
    constructor(loginRequired, loginFields, telephonsystemInfo) {
        this.loginRequired = loginRequired;
        this.loginFields = loginFields;
        this.telephonsystemInfo = telephonsystemInfo;
    }
}


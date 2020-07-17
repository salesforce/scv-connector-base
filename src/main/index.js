import constants from './constants.js';
import { EventEmitter } from './eventEmitter.js';

let channelPort;
let connectorReady = false;
let vendorAdapter;
const telephonyEventEmitter = new EventEmitter(new Set(Object.keys(constants.EVENT_TYPE)));

function propagateTelephonyEvent(telephonyEventType, telephonyEventPayload) {
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType, telephonyEventPayload }
    });
}

// Register the telephony event types which shall be dispatched cross the window boundary to the parent app window.
const crossWindowTelephonyEventTypes = [
    constants.EVENT_TYPE.CALL_STARTED,
    constants.EVENT_TYPE.CALL_CONNECTED,
    constants.EVENT_TYPE.CALL_FAILED,
    constants.EVENT_TYPE.MUTE_TOGGLE,
    constants.EVENT_TYPE.HOLD_TOGGLE,
    constants.EVENT_TYPE.ERROR,
    constants.EVENT_TYPE.HANGUP,
    constants.EVENT_TYPE.PHONE_CONTACTS,
    constants.EVENT_TYPE.TRANSFER_CALL_CONNECTED,
    constants.EVENT_TYPE.TRANSFER_CALL_CLOSED,
    constants.EVENT_TYPE.LOGIN_SETTINGS,
    constants.EVENT_TYPE.LOGIN_RESULT,
    constants.EVENT_TYPE.RECORDING_TOGGLE
];
    
crossWindowTelephonyEventTypes.forEach((eventType) => {
    telephonyEventEmitter.on(eventType, propagateTelephonyEvent.bind(null, eventType));
});

function channelMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            vendorAdapter().acceptCall(message.data.call);
            break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            vendorAdapter().declineCall(message.data.call);
            break;
        case constants.MESSAGE_TYPE.END_CALL:
            vendorAdapter().endCall(message.data.call, message.data.agentStatus);
            break;
        case constants.MESSAGE_TYPE.MUTE:
            vendorAdapter().mute();
            break;
        case constants.MESSAGE_TYPE.UNMUTE:
            vendorAdapter().unmute();
            break;
        case constants.MESSAGE_TYPE.HOLD:
            vendorAdapter().hold(message.data.call);
            break;
        case constants.MESSAGE_TYPE.RESUME:
            vendorAdapter().resume(message.data.call);
            break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            vendorAdapter().setAgentStatus(message.data.agentStatus);
            break;
        case constants.MESSAGE_TYPE.DIAL:
            vendorAdapter().dial(message.data.callee); //TODO: rename to contact
            break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            vendorAdapter().sendDigits(message.data.digits);
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            vendorAdapter().getPhoneContacts();
            break;
        case constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            vendorAdapter().swapCallParticipants(message.data.calls);
            break;
        case constants.MESSAGE_TYPE.JOIN_PARTICIPANTS:
            vendorAdapter().joinCallParticipants(message.data.calls);
            break;
        case constants.MESSAGE_TYPE.TRANSFER:
            vendorAdapter().transfer(message.data.destination, message.data.call); //TODO: rename estination to contact
            break;
        case constants.MESSAGE_TYPE.GET_LOGIN_SETTINGS:
            vendorAdapter().getLoginSettings();
            break;
        case constants.MESSAGE_TYPE.LOGIN:
            vendorAdapter().login(message.data.credentials);
            break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            vendorAdapter().pauseRecording(message.data.call);
            break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            vendorAdapter().resumeRecording(message.data.call);
            break;
        default:
            break;
            //throw new Error(`Unsupported message type: ${messageEvent.data}`);
    }
}


function windowMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.SETUP_CONNECTOR:
            channelPort = message.ports[0];
            channelPort.onmessage = channelMessageHandler;
            vendorAdapter().init(message.data.connectorConfig);
            window.removeEventListener('message', windowMessageHandler);
            break;
        default:
            break;
            //throw new Error(`Unsupported message type: ${messageEvent.data}`);
    }
}

/*========================== Exported Functions ==========================*/

export function initializeConnector(adapter) {
    vendorAdapter = adapter;
    window.addEventListener('message', windowMessageHandler);
}

export function isConnectorReady() {
    return connectorReady;
}

export function getTelephonyEventEmitter() {
    return telephonyEventEmitter;
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {Object} errorType
 * @param {Object} optionalError
 */
export function dispatchError(errorType, optionalError) {
    if (!constants.ERROR_TYPE.hasOwnProperty(errorType)){
        optionalError = errorType;
        errorType = 'GENERIC_ERROR';
    }

    telephonyEventEmitter.emit(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] })
    if(optionalError) {
        throw new Error(optionalError);
    }
}

/** 
 * Dispatch a telephony event to Salesforce
 * @param {Object} Event Type, i.e. CALL_STARTED    
 * @param {Object} Payload  
 */
export function dispatchEvent(eventType, payload) {
    if (!crossWindowTelephonyEventTypes.includes(eventType)){
        throw new Error(`Unsupported event name: ${eventType}`);
    }
    telephonyEventEmitter.emit(eventType, payload);
}

/** 
 * Notify Salesforce that the connector is ready
 */
export function setConnectorReady() {
    connectorReady = true;
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.CONNECTOR_READY,
        payload: {
            callInProgress: vendorAdapter().getCallInProgress()
        }
    });
}

export const Constants = constants;
export const CrossWindowTelephonyEventTypes = crossWindowTelephonyEventTypes;

/**
 * @typedef {"PhoneBook" | "Queue" | "PhoneNumber"} ContactType
 * @typedef {"Agent" | "Initial_Caller" | "Third_Party"} ParticipantType
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
     * @param {ParticipantType} participantType - participant type
     * 
     */
    constructor(phoneNumber, participantType, id, type, label, prefix, extension) {
        this.phoneNumber = phoneNumber;
        this.participantType = participantType; 
        this.id = id;
        this.type = type;
        this.label = label;
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

        this.callType = callType;
        this.callId = callId;
        this.state = callState; //TODO: rename state => callState in core
        this.voiceCallId = voiceCallId;
        this.contact = contact;
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

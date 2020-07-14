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
            vendorAdapter().dial(message.data.callee);
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
            vendorAdapter().transfer(message.data.destination);
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
            vendorAdapter().init(message.data.connectorConfig, message.data.container);
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

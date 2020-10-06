/**
 @module baseConnector
*/
import constants from './constants.js';
import { EventEmitter } from './eventEmitter.js';

let channelPort;
let connectorReady = false;
let vendorConnector;
const telephonyEventEmitter = new EventEmitter(new Set(Object.keys(constants.EVENT_TYPE)));
const crossWindowTelephonyEventTypes = Object.values(constants.EVENT_TYPE);

function propagateTelephonyEvent(telephonyEventType, telephonyEventPayload) {
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType, telephonyEventPayload }
    });
}

crossWindowTelephonyEventTypes.forEach((eventType) => {
    telephonyEventEmitter.on(eventType, propagateTelephonyEvent.bind(null, eventType));
});

function channelMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            vendorConnector().acceptCall(message.data.call);
            break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            vendorConnector().declineCall(message.data.call);
            break;
        case constants.MESSAGE_TYPE.END_CALL:
            vendorConnector().endCall(message.data.call, message.data.agentStatus);
            break;
        case constants.MESSAGE_TYPE.MUTE:
            vendorConnector().mute();
            break;
        case constants.MESSAGE_TYPE.UNMUTE:
            vendorConnector().unmute();
            break;
        case constants.MESSAGE_TYPE.HOLD:
            vendorConnector().hold(message.data.call);
            break;
        case constants.MESSAGE_TYPE.RESUME:
            vendorConnector().resume(message.data.call);
            break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            vendorConnector().setAgentStatus(message.data.agentStatus);
            break;
        case constants.MESSAGE_TYPE.DIAL:
            vendorConnector().dial(message.data.contact);
            break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            vendorConnector().sendDigits(message.data.digits);
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            vendorConnector().getPhoneContacts(message.data.filter);
            break;
        case constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            //TODO: rename to call1 and call2
            vendorConnector().swap(message.data.callToHold, message.data.callToResume);
            break;
        case constants.MESSAGE_TYPE.CONFERENCE:
            vendorConnector().conference(message.data.calls);
            break;
        case constants.MESSAGE_TYPE.ADD_PARTICIPANT:
            vendorConnector().addParticipant(message.data.contact, message.data.call); 
            break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            vendorConnector().pauseRecording(message.data.call);
            break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            vendorConnector().resumeRecording(message.data.call);
            break;
        case constants.MESSAGE_TYPE.GET_CAPABILITIES:
            vendorConnector().getCapabilities();
            break;
        case constants.MESSAGE_TYPE.LOGOUT:
            vendorConnector().logout();
            break;
        case constants.MESSAGE_TYPE.LMS_MESSAGE_TO_CONNECTOR:
            vendorConnector().handleLmsMessage(message.data);
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
            vendorConnector().init(message.data.connectorConfig);
            window.removeEventListener('message', windowMessageHandler);
            break;
        default:
            break;
            //throw new Error(`Unsupported message type: ${messageEvent.data}`);
    }
}

/*========================== Exported Functions ==========================*/

/**
 * Initialize a vendor connector
 * @param {function} connector Vendor connector function to initialize
 */
export function initializeConnector(connector) {
    vendorConnector = connector;
    window.addEventListener('message', windowMessageHandler);
}

/**
 * @returns {boolean} True if the vendor connector is fully loaded inside SFDC else false
 */
export function isConnectorReady() {
    return connectorReady;
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {string} errorType Error Type, i.e. Constants.ErrorType.MICROPHONE_NOT_SHARED
 * @param {string} optionalError Optional (vendor specific) error message
 */
export function dispatchError(errorType, optionalError) {
    if (!constants.ERROR_TYPE.hasOwnProperty(errorType)){
        optionalError = errorType;
        errorType = 'GENERIC_ERROR';
    }

    telephonyEventEmitter.emit(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] })
    if (optionalError) {
        throw new Error(optionalError);
    }
}

/** 
 * Dispatch a telephony event to Salesforce
 * <pre>
 *  Examples for Event Type | Payload :
 *  ----------------------------------------------- 
 *  Constants.EVENT_TYPE.CALL_STARTED | {PhoneCall}
 *  Constants.EVENT_TYPE.CALL_CONNECTED | {PhoneCall}
 *  Constants.EVENT_TYPE.CALL_FAILED | {PhoneCall}
 *  Constants.EVENT_TYPE.MUTE_TOGGLE | {Boolean}
 *  Constants.EVENT_TYPE.HOLD_TOGGLE | {PhoneCall}
 *  Constants.EVENT_TYPE.ERROR | constants.EVENT_TYPE
 *  Constants.EVENT_TYPE.HANGUP | {PhoneCall}
 *  Constants.EVENT_TYPE.PHONE_CONTACTS | undefined
 *  Constants.EVENT_TYPE.TRANSFER_CALL_CONNECTED | {PhoneCall}
 *  Constants.EVENT_TYPE.TRANSFER_CALL_CLOSED | {PhoneCall}
 *  Constants.EVENT_TYPE.SHOW_LOGIN | {loginFrameHeight: number} Optional, defaults to 150px
 *  Constants.EVENT_TYPE.LOGIN_RESULT | {success: boolean, error: string}
 *  Constants.EVENT_TYPE.RECORDING_TOGGLE | {PhoneCall}
 *  Constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT | {success: boolean, error: string}
 *  Constants.EVENT_TYPE.WRAP_UP_ENDED | {PhoneCall}
 * </pre>
 * @param {String} EventType event type, i.e. Constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} Payload event payload
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
            callInProgress: vendorConnector().getActiveCalls()
        }
    });
}

/** 
 * Connector Constants
 */
export const Constants = constants;

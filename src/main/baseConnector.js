/**
 @module baseConnector
*/
import constants from './constants.js';
import { EventEmitter } from './eventEmitter.js';

let channelPort;
let connectorReady = false;
let vendorConnector;
const telephonyEventEmitter = new EventEmitter(new Set(Object.keys(constants.EVENT_TYPE)));

function propagateTelephonyEvent(telephonyEventType, telephonyEventPayload) {
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType, telephonyEventPayload }
    });
}

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
            vendorConnector().dial(message.data.callee); //TODO: rename to contact
            break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            vendorConnector().sendDigits(message.data.digits);
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            vendorConnector().getPhoneContacts();
            break;
        case constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            vendorConnector().swapCallParticipants(message.data.calls);
            break;
        case constants.MESSAGE_TYPE.JOIN_PARTICIPANTS:
            vendorConnector().joinCallParticipants(message.data.calls);
            break;
        case constants.MESSAGE_TYPE.TRANSFER:
            vendorConnector().transfer(message.data.destination, message.data.call); //TODO: rename estination to contact
            break;
        case constants.MESSAGE_TYPE.GET_LOGIN_SETTINGS:
            vendorConnector().getLoginSettings();
            break;
        case constants.MESSAGE_TYPE.LOGIN:
            vendorConnector().login(message.data.credentials);
            break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            vendorConnector().pauseRecording(message.data.call);
            break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            vendorConnector().resumeRecording(message.data.call);
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
 * @param {Object} connector
 */
export function initializeConnector(connector) {
    vendorConnector = connector;
    window.addEventListener('message', windowMessageHandler);
}

/**
 * Return true if the vendor connector is fully loaded inside SFDC
 */
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
    if (optionalError) {
        throw new Error(optionalError);
    }
}

/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} Event Type, i.e. constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} Payload 
 * Examples for Event Type | Payload 
 *   constants.EVENT_TYPE.CALL_STARTED | {PhoneCall}
 *   constants.EVENT_TYPE.CALL_CONNECTED | {PhoneCall}
 *   constants.EVENT_TYPE.CALL_FAILED | {PhoneCall}
 *   constants.EVENT_TYPE.MUTE_TOGGLE | {Boolean}
 *   constants.EVENT_TYPE.HOLD_TOGGLE | {PhoneCall}
 *   constants.EVENT_TYPE.ERROR | constants.EVENT_TYPE
 *   constants.EVENT_TYPE.HANGUP | {PhoneCall}
 *   constants.EVENT_TYPE.PHONE_CONTACTS | undefined
 *   constants.EVENT_TYPE.TRANSFER_CALL_CONNECTED | {PhoneCall}
 *   constants.EVENT_TYPE.TRANSFER_CALL_CLOSED | {PhoneCall}
 *   constants.EVENT_TYPE.LOGIN_SETTINGS | {LoginSettings} 
 *   constants.EVENT_TYPE.LOGIN_RESULT | {Promise}
 *   constants.EVENT_TYPE.RECORDING_TOGGLE | {PhoneCall}
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
            callInProgress: vendorConnector().getCallInProgress()
        }
    });
}

/** 
 * Connector Constants
 */
export const Constants = constants;
/** 
 * Cross Window Telephony Event Types: a list of events that can be dispatched using dispatchEvent() 
 */
export const CrossWindowTelephonyEventTypes = crossWindowTelephonyEventTypes;

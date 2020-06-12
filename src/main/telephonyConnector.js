import constants from './Constants';
import { EventEmitter } from './eventEmitter';

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
    constants.EVENT_TYPE.LOGIN_RESULT
];
    
crossWindowTelephonyEventTypes.forEach((eventType) => {
    telephonyEventEmitter.on(eventType, propagateTelephonyEvent.bind(null, eventType));
});

function channelMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            vendorAdapter().acceptCall();
            break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            vendorAdapter().declineCall();
            break;
        case constants.MESSAGE_TYPE.END_CALL:
            vendorAdapter().endCall(message.data.participant);
            break;
        case constants.MESSAGE_TYPE.MUTE:
            vendorAdapter().mute();
            break;
        case constants.MESSAGE_TYPE.UNMUTE:
            vendorAdapter().unmute();
            break;
        case constants.MESSAGE_TYPE.HOLD:
            vendorAdapter().hold(message.data.participant);
            break;
        case constants.MESSAGE_TYPE.RESUME:
            vendorAdapter().resume(message.data.participant);
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
            vendorAdapter().swapCallParticipants();
            break;
        case constants.MESSAGE_TYPE.JOIN_PARTICIPANTS:
            vendorAdapter().joinCallParticipants();
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

export function initializeTelephonyConnector(adapter) {
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
 * Dispatch telephony integrateion error
 * @param {Object} errorType
 */
export function dispatchError(errorType, optionalError) {
    if (!(errorType in constants.ERROR_TYPE)){
        errorType = constants.ERROR_TYPE.GENERIC_ERROR;
    }
    telephonyEventEmitter.emit(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] });
    if(optionalError) {
        throw new Error(optionalError);
    }
}

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


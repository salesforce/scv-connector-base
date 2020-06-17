import Constants from './constants';
import { EventEmitter } from './eventEmitter';

let channelPort;
let connectorReady = false;
let vendorAdapter;
const telephonyEventEmitter = new EventEmitter(new Set(Object.keys(Constants.EVENT_TYPE)));

function propagateTelephonyEvent(telephonyEventType, telephonyEventPayload) {
    channelPort.postMessage({
        type: Constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType, telephonyEventPayload }
    });
}

// Register the telephony event types which shall be dispatched cross the window boundary to the parent app window.
const crossWindowTelephonyEventTypes = [
    Constants.EVENT_TYPE.CALL_STARTED,
    Constants.EVENT_TYPE.CALL_CONNECTED,
    Constants.EVENT_TYPE.CALL_FAILED,
    Constants.EVENT_TYPE.MUTE_TOGGLE,
    Constants.EVENT_TYPE.HOLD_TOGGLE,
    Constants.EVENT_TYPE.ERROR,
    Constants.EVENT_TYPE.HANGUP,
    Constants.EVENT_TYPE.PHONE_CONTACTS,
    Constants.EVENT_TYPE.TRANSFER_CALL_CONNECTED,
    Constants.EVENT_TYPE.TRANSFER_CALL_CLOSED,
    Constants.EVENT_TYPE.LOGIN_SETTINGS,
    Constants.EVENT_TYPE.LOGIN_RESULT
];
    
crossWindowTelephonyEventTypes.forEach((eventType) => {
    telephonyEventEmitter.on(eventType, propagateTelephonyEvent.bind(null, eventType));
});

function channelMessageHandler(message) {
    switch (message.data.type) {
        case Constants.MESSAGE_TYPE.ACCEPT_CALL:
            vendorAdapter().acceptCall();
            break;
        case Constants.MESSAGE_TYPE.DECLINE_CALL:
            vendorAdapter().declineCall();
            break;
        case Constants.MESSAGE_TYPE.END_CALL:
            vendorAdapter().endCall(message.data.participant, message.data.agentStatus);
            break;
        case Constants.MESSAGE_TYPE.MUTE:
            vendorAdapter().mute();
            break;
        case Constants.MESSAGE_TYPE.UNMUTE:
            vendorAdapter().unmute();
            break;
        case Constants.MESSAGE_TYPE.HOLD:
            vendorAdapter().hold(message.data.participant);
            break;
        case Constants.MESSAGE_TYPE.RESUME:
            vendorAdapter().resume(message.data.participant);
            break;
        case Constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            vendorAdapter().setAgentStatus(message.data.agentStatus);
            break;
        case Constants.MESSAGE_TYPE.DIAL:
            vendorAdapter().dial(message.data.callee);
            break;
        case Constants.MESSAGE_TYPE.SEND_DIGITS:
            vendorAdapter().sendDigits(message.data.digits);
            break;
        case Constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            vendorAdapter().getPhoneContacts();
            break;
        case Constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            vendorAdapter().swapCallParticipants();
            break;
        case Constants.MESSAGE_TYPE.JOIN_PARTICIPANTS:
            vendorAdapter().joinCallParticipants();
            break;
        case Constants.MESSAGE_TYPE.TRANSFER:
            vendorAdapter().transfer(message.data.destination);
            break;
        case Constants.MESSAGE_TYPE.GET_LOGIN_SETTINGS:
            vendorAdapter().getLoginSettings();
            break;
        case Constants.MESSAGE_TYPE.LOGIN:
            vendorAdapter().login(message.data.credentials);
            break;
        default:
            break;
            //throw new Error(`Unsupported message type: ${messageEvent.data}`);
    }
}


function windowMessageHandler(message) {
    switch (message.data.type) {
        case Constants.MESSAGE_TYPE.SETUP_CONNECTOR:
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
 * Dispatch telephony integration error
 * @param {Object} errorType
 * @param {Object} optionalError
 */
export function dispatchError(errorType, optionalError) {
    if (!Constants.ERROR_TYPE.hasOwnProperty(errorType)){
        errorType = 'GENERIC_ERROR';
    }

    telephonyEventEmitter.emit(Constants.EVENT_TYPE.ERROR, { message: Constants.ERROR_TYPE[errorType] })
    if(optionalError) {
        throw new Error(optionalError);
    }
}

export function setConnectorReady() {
    connectorReady = true;
    channelPort.postMessage({
        type: Constants.MESSAGE_TYPE.CONNECTOR_READY,
        payload: {
            callInProgress: vendorAdapter().getCallInProgress()
        }
    });
}

export const constants = Constants;

import { MESSAGE_TYPES, TELEPHONY_EVENT_TYPES, ERRORS } from './constants';
import { EventEmitter } from './eventEmitter';

let channelPort;
let connectorReady = false;
let vendorAdapter;
const telephonyEventEmitter = new EventEmitter(new Set(Object.keys(TELEPHONY_EVENT_TYPES)));
export const EVENT_TYPE =  TELEPHONY_EVENT_TYPES;

function propagateTelephonyEvent(telephonyEventType, telephonyEventPayload) {
    channelPort.postMessage({
        type: MESSAGE_TYPES.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType, telephonyEventPayload }
    });
}

// Register the telephony event types which shall be dispatched cross the window boundary to the parent app window.
const crossWindowTelephonyEventTypes = [
    TELEPHONY_EVENT_TYPES.CALL_STARTED,
    TELEPHONY_EVENT_TYPES.CALL_CONNECTED,
    TELEPHONY_EVENT_TYPES.CALL_FAILED,
    TELEPHONY_EVENT_TYPES.MUTE_TOGGLE,
    TELEPHONY_EVENT_TYPES.HOLD_TOGGLE,
    TELEPHONY_EVENT_TYPES.ERROR,
    TELEPHONY_EVENT_TYPES.HANGUP,
    TELEPHONY_EVENT_TYPES.PHONE_CONTACTS,
    TELEPHONY_EVENT_TYPES.TRANSFER_CALL_CONNECTED,
    TELEPHONY_EVENT_TYPES.TRANSFER_CALL_CLOSED,
    TELEPHONY_EVENT_TYPES.LOGIN_SETTINGS,
    TELEPHONY_EVENT_TYPES.LOGIN_RESULT
];
    
crossWindowTelephonyEventTypes.forEach((eventType) => {
    telephonyEventEmitter.on(eventType, propagateTelephonyEvent.bind(null, eventType));
});

function channelMessageHandler(message) {
    switch (message.data.type) {
        case MESSAGE_TYPES.ACCEPT_CALL:
            vendorAdapter().acceptCall();
            break;
        case MESSAGE_TYPES.DECLINE_CALL:
            vendorAdapter().declineCall();
            break;
        case MESSAGE_TYPES.END_CALL:
            vendorAdapter().endCall(message.data.participant);
            break;
        case MESSAGE_TYPES.MUTE:
            vendorAdapter().mute();
            break;
        case MESSAGE_TYPES.UNMUTE:
            vendorAdapter().unmute();
            break;
        case MESSAGE_TYPES.HOLD:
            vendorAdapter().hold(message.data.participant);
            break;
        case MESSAGE_TYPES.RESUME:
            vendorAdapter().resume(message.data.participant);
            break;
        case MESSAGE_TYPES.SET_AGENT_STATUS:
            vendorAdapter().setAgentStatus(message.data.agentStatus);
            break;
        case MESSAGE_TYPES.DIAL:
            vendorAdapter().dial(message.data.callee);
            break;
        case MESSAGE_TYPES.SEND_DIGITS:
            vendorAdapter().sendDigits(message.data.digits);
            break;
        case MESSAGE_TYPES.GET_PHONE_CONTACTS:
            vendorAdapter().getPhoneContacts();
            break;
        case MESSAGE_TYPES.SWAP_PARTICIPANTS:
            vendorAdapter().swapCallParticipants();
            break;
        case MESSAGE_TYPES.JOIN_PARTICIPANTS:
            vendorAdapter().joinCallParticipants();
            break;
        case MESSAGE_TYPES.TRANSFER:
            vendorAdapter().transfer(message.data.destination);
            break;
        case MESSAGE_TYPES.GET_LOGIN_SETTINGS:
            vendorAdapter().getLoginSettings();
            break;
        case MESSAGE_TYPES.LOGIN:
            vendorAdapter().transfer(message.data.credentials);
            break;   
        default:
            break;
            //throw new Error(`Unsupported message type: ${messageEvent.data}`);
    }
}


function windowMessageHandler(message) {
    switch (message.data.type) {
        case MESSAGE_TYPES.SETUP_CONNECTOR:
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
    if (!(errorType in ERRORS)){
        errorType = ERRORS.GENERIC_ERROR;
    }
    telephonyEventEmitter.emit(TELEPHONY_EVENT_TYPES.ERROR, { message: ERRORS[errorType] });
    if(optionalError) {
        throw new Error(optionalError);
    }
}

export function setConnectorReady() {
    connectorReady = true;
    channelPort.postMessage({
        type: MESSAGE_TYPES.CONNECTOR_READY,
        payload: {
            callInProgress: vendorAdapter().getCallInProgress()
        }
    });
}


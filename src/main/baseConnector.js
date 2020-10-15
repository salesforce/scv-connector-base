/**
 @module baseConnector
*/
import constants from './constants.js';
import { EventEmitter } from './eventEmitter.js';
import { Validator, GenericResult, InitResult, CallResult, HoldToggleResult, PhoneContactsResult, 
    ConferenceResult, ParticipantResult, RecordingToggleResult, CapabilitiesResult, ActiveCallsResult,
    ParticipantRemovedResult } from './types';

let channelPort;
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

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {string} errorType Error Type, i.e. constants.ErrorType.MICROPHONE_NOT_SHARED
 */
function dispatchError(errorType) {
    telephonyEventEmitter.emit(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] })
}

/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} EventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} Payload event payload
 */
function dispatchEvent(eventType, payload) {
    telephonyEventEmitter.emit(eventType, payload);
}

/** 
 * Notify Salesforce that the connector is ready
 */
async function setConnectorReady() {
    const activeCallsResult = await vendorConnector().getActiveCalls();
    Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.CONNECTOR_READY,
        payload: {
            callInProgress: activeCallsResult.activeCalls
        }
    });
}

async function channelMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            try {
                const result = await vendorConnector().acceptCall(message.data.call);
                Validator.validateClassObject(result, CallResult);
                const { call } = result;
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            try {
                const result =  await vendorConnector().declineCall(message.data.call);
                Validator.validateClassObject(result, CallResult);
                const { call } = result;
                dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.END_CALL:
            try {
                await vendorConnector().endCall(message.data.call, message.data.agentStatus);
                dispatchEvent(constants.EVENT_TYPE.HANGUP);
            } catch (e) {
                // TODO: Define & dispatch error here
            }
        break;
        case constants.MESSAGE_TYPE.MUTE:
            try {
                const result = await vendorConnector().mute();
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, {
                    isMuted: result.isMuted
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_MUTE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.UNMUTE:
            try {
                const result = await vendorConnector().unmute();
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, {
                    isMuted: result.isMuted
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.HOLD:
            try {
                const result = await vendorConnector().hold(message.data.call);
                Validator.validateClassObject(result, HoldToggleResult);
                const { isThirdPartyOnHold, isCustomerOnHold, calls} = result;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_HOLD_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.RESUME:
            try {
                const result = await vendorConnector().resume(message.data.call);
                Validator.validateClassObject(result, HoldToggleResult);
                const { isThirdPartyOnHold, isCustomerOnHold, calls} = result;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            try {
                const result = await vendorConnector().setAgentStatus(message.data.agentStatus);
                Validator.validateClassObject(result, GenericResult);
                const { success } = result;
                dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, { success });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS);
            }
        break;
        case constants.MESSAGE_TYPE.DIAL:
            try {
                const result = await vendorConnector().dial(message.data.contact);
                Validator.validateClassObject(result, CallResult);
                const { call } = result;
                dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, call);
            } catch (e) {
                // TODO: Ideally just dispatch CALL_FAILED should show the error message
                dispatchEvent(constants.EVENT_TYPE.CALL_FAILED);
                dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            // TODO: Define the success and failure event/error?
            await vendorConnector().sendDigits(message.data.digits);
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            try  {
                const result = await vendorConnector().getPhoneContacts(message.data.filter);
                Validator.validateClassObject(result, PhoneContactsResult);
                const { contacts } = result;
                dispatchEvent(constants.EVENT_TYPE.PHONE_CONTACTS, contacts);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS);
            }
        break;
        case constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            try {
                // TODO: Create PhoneCall from call1.callId & call2.callId
                // TODO: rename to call1 and call2
                const result = await vendorConnector().swap(message.data.callToHold, message.data.callToResume);
                Validator.validateClassObject(result, HoldToggleResult);
                const { isThirdPartyOnHold, isCustomerOnHold, calls } = result;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS);
            }
        break;
        case constants.MESSAGE_TYPE.CONFERENCE:
            try {
                const result = await vendorConnector().conference(message.data.calls);
                Validator.validateClassObject(result, ConferenceResult);
                const { isThirdPartyOnHold, isCustomerOnHold } = result;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE);
            }
        break;
        case constants.MESSAGE_TYPE.ADD_PARTICIPANT:
            try {
                const result = await vendorConnector().addParticipant(message.data.contact, message.data.call);
                Validator.validateClassObject(result, ParticipantResult);
                const { initialCallHasEnded, callInfo, phoneNumber } = result;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT);
            }
        break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            try {
                const result = await vendorConnector().pauseRecording(message.data.call);
                Validator.validateClassObject(result, RecordingToggleResult);
                const { isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                } = result;
                dispatchEvent(constants.EVENT_TYPE.RECORDING_TOGGLE, {
                    isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING);
            }
        break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            try {
                const result = await vendorConnector().resumeRecording(message.data.call);
                Validator.validateClassObject(result, RecordingToggleResult);
                const { isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                } = result;
                dispatchEvent(constants.EVENT_TYPE.RECORDING_TOGGLE, {
                    isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING);
            }
        break;
        case constants.MESSAGE_TYPE.GET_CAPABILITIES:
            try {
                const result = await vendorConnector().getCapabilities();
                Validator.validateClassObject(result, CapabilitiesResult);
                // TODO: Change core to match
                const { hasMute, hasHold, hasRecord, hasMerge } = result;
                dispatchEvent(constants.EVENT_TYPE.CAPABILITIES, {
                    hasMute,
                    hasHold,
                    hasRecord,
                    hasMerge
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_CAPABILITIES);
            }
        break;
        case constants.MESSAGE_TYPE.LOGOUT:
            try {
                const result = await vendorConnector().logout();
                Validator.validateClassObject(result, GenericResult);
                const { success } = result;
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, { success });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT);
            }
        break;
        default:
            break;
    }
}

async function windowMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.SETUP_CONNECTOR:
            channelPort = message.ports[0];
            channelPort.onmessage = channelMessageHandler;
            try {
                const result = await vendorConnector().init(message.data.connectorConfig);
                Validator.validateClassObject(result, InitResult);
                if (result.showLogin) {
                    dispatchEvent(constants.EVENT_TYPE.SHOW_LOGIN, {
                        loginFrameHeight: result.loginFrameHeight
                    });
                } else {
                    await setConnectorReady();
                }
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN);
            }
            window.removeEventListener('message', windowMessageHandler);
            break;
        default:
            break;
    }
}

/*========================== Exported Functions ==========================*/

export const Constants = {
    EVENT_TYPE: {
        LOGIN_RESULT: constants.EVENT_TYPE.LOGIN_RESULT,
        LOGOUT_RESULT: constants.EVENT_TYPE.LOGOUT_RESULT,
        CALL_CONNECTED: constants.EVENT_TYPE.CALL_CONNECTED,
        HANGUP: constants.EVENT_TYPE.HANGUP,
        PARTICIPANT_CONNECTED: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED: constants.EVENT_TYPE.PARTICIPANT_REMOVED
    },
    AGENT_STATUS: { ...constants.AGENT_STATUS },
    PARTICIPANT_TYPE: { ...constants.PARTICIPANT_TYPE },
    CALL_TYPE: { ...constants.CALL_TYPE },
    CONTACT_TYPE: { ...constants.CONTACT_TYPE }
};

/**
 * Initialize a vendor connector
 * @param {function} connector Vendor connector function to initialize
 */
export function initializeConnector(connector) {
    vendorConnector = connector;
    window.addEventListener('message', windowMessageHandler);
}

/**
 * Publish an event to Sfdc
 * @param {string} eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object} payload Payload for the event. Has to be a result class associated with the EVENT_TYPE
 */
export function publishEvent({ eventType, payload }) {
    switch(eventType) {
        case Constants.EVENT_TYPE.LOGIN_RESULT:
            try {
                Validator.validateClassObject(payload, GenericResult);
                dispatchEvent(constants.EVENT_TYPE.LOGIN_RESULT, {
                    success: payload.success
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN);
            }
            break;
        case Constants.EVENT_TYPE.LOGOUT_RESULT:
            try {
                Validator.validateClassObject(payload, GenericResult);
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, {
                    success: payload.success
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT);
            }
            break;
        case Constants.EVENT_TYPE.CALL_CONNECTED:
            try {
                Validator.validateClassObject(payload, CallResult);
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL);
            }
            break;
        case Constants.EVENT_TYPE.HANGUP:
            try {
                Validator.validateClassObject(payload, CallResult);
                dispatchEvent(constants.EVENT_TYPE.HANGUP, payload.call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL);
            }
            break;
        case Constants.EVENT_TYPE.PARTICIPANT_CONNECTED:
            try {
                Validator.validateClassObject(payload, ParticipantResult);
                const { initialCallHasEnded, callInfo, phoneNumber } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT)
            }
            break;
        case Constants.EVENT_TYPE.PARTICIPANT_REMOVED:
            try {
                Validator.validateClassObject(payload, ParticipantRemovedResult);
                const { reason } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                    reason
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT)
            }
    }
}

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
 * @param {object} error Error object representing the error
 */
function dispatchError(errorType, error) {
    // eslint-disable-next-line no-console
    console.error(`SCV dispatched error ${errorType}`, error);
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
    const activeCalls = activeCallsResult.activeCalls;
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.CONNECTOR_READY,
        payload: {
            callInProgress: activeCallsResult.activeCalls
        }
    });
    setTimeout(() => {
        for (const callId in activeCalls) {
            const call = activeCalls[callId];
            switch(call.state) {
                case constants.CALL_STATE.CONNECTED:
                    dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, call)
                    break;
                case constants.CALL_STATE.RINGING:
                    dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, call)
                    break;
                case constants.CALL_STATE.TRANSFERRING:
                    dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
                        phoneNumber: call.contact.phoneNumber,
                        callInfo: call.callInfo,
                        initialCallHasEnded: call.callAttributes.initialCallHasEnded
                    });
                    break;
                case constants.CALL_STATE.TRANSFERRED:
                    dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                        phoneNumber: call.contact.phoneNumber,
                        callInfo: call.callInfo,
                        initialCallHasEnded: call.callAttributes.initialCallHasEnded
                    });
                    break;
                default:
                    break;
            }
        }
    }, 3000); //FIXME (dlouvton): make sure to remove the delay and run this code after scrtConnector is loaded (to prevent race conditions)
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            try {
                const result =  await vendorConnector().declineCall(message.data.call);
                Validator.validateClassObject(result, CallResult);
                const { call } = result;
                dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.END_CALL:
            try {
                const result = await vendorConnector().endCall(message.data.call, message.data.agentStatus);
                Validator.validateArray(result);
                result.forEach((res) => {
                    Validator.validateClassObject(res, CallResult);
                    const { call } = res;
                    dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
                });
            } catch (e) {
                // TODO: Define & dispatch error here
                dispatchEvent(constants.EVENT_TYPE.HANGUP);
            }
        break;
        case constants.MESSAGE_TYPE.MUTE:
            try {
                const result = await vendorConnector().mute();
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, {
                    isMuted: result.isMuted
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_MUTE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.UNMUTE:
            try {
                const result = await vendorConnector().unmute();
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, {
                    isMuted: result.isMuted
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_HOLD_CALL, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            try {
                const result = await vendorConnector().setAgentStatus(message.data.agentStatus);
                Validator.validateClassObject(result, GenericResult);
                const { success } = result;
                dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, { success });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, e);
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
                const contacts = result.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        endpointARN: contact.endpointARN,
                        phoneNumber: contact.phoneNumber,
                        name: contact.name,
                        type: contact.type
                    };
                });
                dispatchEvent(constants.EVENT_TYPE.PHONE_CONTACTS, {
                    contacts
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, e);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING, e);
            }
        break;
        case constants.MESSAGE_TYPE.GET_CAPABILITIES:
            try {
                const result = await vendorConnector().getCapabilities();
                Validator.validateClassObject(result, CapabilitiesResult);
                // TODO: Change core to use hasMute, hasMerge, etc
                const { hasMute, hasHold, hasRecord, hasMerge } = result;
                dispatchEvent(constants.EVENT_TYPE.CAPABILITIES, {
                    [constants.CAPABILITY_TYPE.MUTE] : hasMute,
                    [constants.CAPABILITY_TYPE.HOLD] : hasHold,
                    [constants.CAPABILITY_TYPE.RECORD] : hasRecord,
                    [constants.CAPABILITY_TYPE.MERGE] : hasMerge
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_CAPABILITIES, e);
            }
        break;
        case constants.MESSAGE_TYPE.LOGOUT:
            try {
                const result = await vendorConnector().logout();
                Validator.validateClassObject(result, GenericResult);
                const { success } = result;
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, { success });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, e);
            }
        break;
        case constants.MESSAGE_TYPE.MESSAGE:
            // TODO: Define a return type for handling message
            vendorConnector().handleMessage(message.data.message);
        break;
        case constants.MESSAGE_TYPE.WRAP_UP_CALL:
            vendorConnector().wrapUpCall(message.data.call);
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, e);
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
        CALL_STARTED: constants.EVENT_TYPE.CALL_STARTED,
        CALL_CONNECTED: constants.EVENT_TYPE.CALL_CONNECTED,
        HANGUP: constants.EVENT_TYPE.HANGUP,
        PARTICIPANT_CONNECTED: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
        MESSAGE: constants.EVENT_TYPE.MESSAGE,
        /* This is only added to aid in connector development. This will be removed before publishing it*/
        REMOTE_CONTROLLER: 'REMOTE_CONTROLLER'
    },
    AGENT_STATUS: { ...constants.AGENT_STATUS },
    PARTICIPANT_TYPE: { ...constants.PARTICIPANT_TYPE },
    CALL_TYPE: { ...constants.CALL_TYPE },
    CONTACT_TYPE: { ...constants.CONTACT_TYPE },
    CALL_STATE: { ...constants.CALL_STATE }
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
export async function publishEvent({ eventType, payload }) {
    switch(eventType) {
        case Constants.EVENT_TYPE.LOGIN_RESULT:
            try {
                Validator.validateClassObject(payload, GenericResult);
                const { success } = payload;
                dispatchEvent(constants.EVENT_TYPE.LOGIN_RESULT, {
                    success
                });
                if (success) {
                    await setConnectorReady();
                }
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, e);
            }
            break;
        case Constants.EVENT_TYPE.LOGOUT_RESULT:
            try {
                Validator.validateClassObject(payload, GenericResult);
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, {
                    success: payload.success
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, e);
            }
            break;
        case Constants.EVENT_TYPE.CALL_STARTED:
                try {
                    Validator.validateClassObject(payload, CallResult);
                    dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, payload.call);
                } catch (e) {
                    dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, e);
                }
                break;
        case Constants.EVENT_TYPE.CALL_CONNECTED:
            try {
                Validator.validateClassObject(payload, CallResult);
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call);
            } catch (e) {
                // TODO: Should we say CAN_NOT_CONNECT_THE_CALL
                dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, e);
            }
            break;
        case Constants.EVENT_TYPE.HANGUP:
            try {
                Validator.validateClassObject(payload, CallResult);
                dispatchEvent(constants.EVENT_TYPE.HANGUP, payload.call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, e);
            }
            break;
        case Constants.EVENT_TYPE.PARTICIPANT_CONNECTED:
            try {
                Validator.validateClassObject(payload, ParticipantResult);
                const { initialCallHasEnded, callInfo, phoneNumber, callId } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber,
                    callId
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, e)
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
                dispatchError(constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, e)
            }
            break;
        case Constants.EVENT_TYPE.MESSAGE:
            dispatchEvent(constants.EVENT_TYPE.MESSAGE, payload);
            break;
        /* This is only added to aid in connector development. This will be removed before publishing it*/
        case Constants.EVENT_TYPE.REMOTE_CONTROLLER:
            channelMessageHandler(payload);
            break;
    }
}

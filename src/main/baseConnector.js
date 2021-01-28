/* eslint-disable no-unused-vars */
import constants from './constants.js';
import { Validator, GenericResult, InitResult, CallResult, HoldToggleResult, PhoneContactsResult, MuteToggleResult,
    ParticipantResult, ParticipantRemovedResult, RecordingToggleResult, AgentConfigResult, ActiveCallsResult,
    VendorConnector, Contact, Phone} from './types';

let channelPort;
let vendorConnector;
let agentAvailable;

/**
 * Gets the error type from the error object
 * @param {object} e Error object representing the error
 */
function getErrorType(e) {
    return e ? e.type : e;
}

/**
 * Gets the error message from the error object
 * @param {object} e Error object representing the error
 */
function getErrorMessage(e) {
    return e && e.message ? e.message : e;
}
/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} EventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} Payload event payload
 */
function dispatchEvent(eventType, payload) {
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType: eventType, telephonyEventPayload: payload }
    });
}

/** 
 * Notify Salesforce that the connector is ready
 */
async function setConnectorReady() {
    try {
        const agentConfigResult = await vendorConnector.getAgentConfig();
        Validator.validateClassObject(agentConfigResult, AgentConfigResult);
        channelPort.postMessage({
            type: constants.MESSAGE_TYPE.CONNECTOR_READY,
            payload: {
                agentConfig: {
                    [constants.AGENT_CONFIG_TYPE.MUTE] : agentConfigResult.hasMute,
                    [constants.AGENT_CONFIG_TYPE.RECORD] : agentConfigResult.hasRecord,
                    [constants.AGENT_CONFIG_TYPE.MERGE] : agentConfigResult.hasMerge,
                    [constants.AGENT_CONFIG_TYPE.SWAP] : agentConfigResult.hasSwap,
                    [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
                    [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone
                }
            }
        });
    } catch (e) {
        // Post CONNECTOR_READY even if getAgentConfig is not implemented
        channelPort.postMessage({
            type: constants.MESSAGE_TYPE.CONNECTOR_READY,
            payload: {}
        });
    }
}

//TODO: 230 we should convert call object to PhoneCall object
async function channelMessageHandler(message) {
    const eventType = message.data.type;
    switch (eventType) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            try {
                if (message.data.call && message.data.call.callType &&
                    message.data.call.callType.toLowerCase() === constants.CALL_TYPE.OUTBOUND.toLowerCase()) {
                    return;
                }

                const payload = await vendorConnector.acceptCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            try {
                const payload =  await vendorConnector.declineCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.END_CALL:
            try {
                const payload = await vendorConnector.endCall(message.data.call, message.data.agentStatus);
                const activeCallsResult = await vendorConnector.getActiveCalls();
                Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
                const activeCalls = activeCallsResult.activeCalls;
                // after end calls from vendor side, if no more active calls, fire HANGUP
                if (activeCalls.length === 0) {
                    Validator.validateClassObject(payload, CallResult);
                    const { call } = payload;
                    dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
                }
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.MUTE:
            try {
                const payload = await vendorConnector.mute();
                publishEvent({eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_MUTE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.UNMUTE:
            try {
                const payload = await vendorConnector.unmute();
                publishEvent({eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL, e);
            }
        break;
        case constants.MESSAGE_TYPE.HOLD:
            try {
                const payload = await vendorConnector.hold(message.data.call);
                publishEvent({eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_PARTICIPANT:
                        dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_HOLD_CALL, getErrorMessage(e));
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.RESUME:
            try {
                const payload = await vendorConnector.resume(message.data.call);
                publishEvent({eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_PARTICIPANT:
                        dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_CALL, getErrorMessage(e));
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            try {
                const payload = await vendorConnector.setAgentStatus(message.data.agentStatus);
                Validator.validateClassObject(payload, GenericResult);
                const { success } = payload;
                dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, { success });
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_AGENT_STATUS:
                        dispatchError(constants.ERROR_TYPE.INVALID_AGENT_STATUS, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, getErrorMessage(e));
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.DIAL:
            try {
                const payload = await vendorConnector.dial(new Contact(message.data.contact));
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, call);
            } catch (e) {
                dispatchEvent(constants.EVENT_TYPE.CALL_FAILED);
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_DESTINATION:
                        dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e));
                        break;
                    case constants.ERROR_TYPE.GENERIC_ERROR:
                        dispatchError(constants.ERROR_TYPE.GENERIC_ERROR, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, getErrorMessage(e));
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            await vendorConnector.sendDigits(message.data.digits);
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            try  {
                const payload = await vendorConnector.getPhoneContacts(message.data.filter);
                Validator.validateClassObject(payload, PhoneContactsResult);
                const contacts = payload.contacts.map((contact) => {
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
                const payload = await vendorConnector.swap(message.data.callToHold, message.data.callToResume);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, e);
            }
        break;
        case constants.MESSAGE_TYPE.CONFERENCE:
            try {
                const payload = await vendorConnector.conference(message.data.calls);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, e);
            }
        break;
        case constants.MESSAGE_TYPE.ADD_PARTICIPANT:
            try {
                const payload = await vendorConnector.addParticipant(new Contact(message.data.contact), message.data.call);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload });
            } catch (e) {
                // TODO: Can we avoid passing in reason field
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                    reason: constants.EVENT_TYPE.ERROR.toLowerCase()
                });
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_DESTINATION:
                        dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, getErrorMessage(e));
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            try {
                const payload = await vendorConnector.pauseRecording(message.data.call);
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, e);
            }
        break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            try {
                const payload = await vendorConnector.resumeRecording(message.data.call);
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING, e);
            }
        break;
        case constants.MESSAGE_TYPE.LOGOUT:
            try {
                const payload = await vendorConnector.logout();
                Validator.validateClassObject(payload, GenericResult);
                const { success } = payload;
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, { success });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, e);
            }
        break;
        case constants.MESSAGE_TYPE.MESSAGE:
            // TODO: Define a return type for handling message
            vendorConnector.handleMessage(message.data.message);
        break;
        case constants.MESSAGE_TYPE.WRAP_UP_CALL:
            vendorConnector.wrapUpCall(message.data.call);
        break;
        case constants.MESSAGE_TYPE.AGENT_AVAILABLE: {
            agentAvailable = message.data.isAvailable;
            if (agentAvailable) {
                const activeCallsResult = await vendorConnector.getActiveCalls();
                Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
                const activeCalls = activeCallsResult.activeCalls;
                for (const callId in activeCalls) {
                    const call = activeCalls[callId];
                    call.isReplayedCall = true;
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
                                initialCallHasEnded: call.callAttributes.initialCallHasEnded,
                                callId: call.callId
                            });
                            break;
                        case constants.CALL_STATE.TRANSFERRED:
                            dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                                phoneNumber: call.contact.phoneNumber,
                                callInfo: call.callInfo,
                                initialCallHasEnded: call.callAttributes.initialCallHasEnded,
                                callId: call.callId
                            });
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        break;
        case constants.MESSAGE_TYPE.SELECT_PHONE:
            try {
                const result = await vendorConnector.selectPhone(new Phone (message.data.phone));
                Validator.validateClassObject(result, GenericResult);
                dispatchEvent(constants.EVENT_TYPE.PHONE_SELECTED, result);
            } catch (e){
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SELECT_PHONE, e);
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
                const payload = await vendorConnector.init(message.data.connectorConfig);
                Validator.validateClassObject(payload, InitResult);
                if (payload.showLogin) {
                    dispatchEvent(constants.EVENT_TYPE.SHOW_LOGIN, {
                        loginFrameHeight: payload.loginFrameHeight
                    });
                } else {
                    await setConnectorReady();
                }
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_PARAMS:
                        dispatchError(constants.ERROR_TYPE.INVALID_PARAMS, getErrorMessage(e));
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, getErrorMessage(e));
                        break;
                }
            }
            window.removeEventListener('message', windowMessageHandler);
            break;
        default:
            break;
    }
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {string} errorType Error Type, i.e. constants.ErrorType.MICROPHONE_NOT_SHARED
 * @param {object} error Error object representing the error
 */
function dispatchError(errorType, error) {
    // eslint-disable-next-line no-console
    console.error(`SCV dispatched error ${errorType}`, error);
    dispatchEvent(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] });
}

function validatePayload(payload, payloadType, errorType) {
    try {
        Validator.validateClassObject(payload, payloadType);
        return true;
    } catch (e) {
        if (errorType) {
            dispatchError(errorType, e);
        }
        return false;
    }
}

/*========================== Exported Functions ==========================*/

export const Constants = {
    EVENT_TYPE: {
        LOGIN_RESULT: constants.EVENT_TYPE.LOGIN_RESULT,
        LOGOUT_RESULT: constants.EVENT_TYPE.LOGOUT_RESULT,
        CALL_STARTED: constants.EVENT_TYPE.CALL_STARTED,
        QUEUED_CALL_STARTED: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
        CALL_CONNECTED: constants.EVENT_TYPE.CALL_CONNECTED,
        HANGUP: constants.EVENT_TYPE.HANGUP,
        MUTE_TOGGLE: constants.EVENT_TYPE.MUTE_TOGGLE,
        HOLD_TOGGLE: constants.EVENT_TYPE.HOLD_TOGGLE,
        RECORDING_TOGGLE: constants.EVENT_TYPE.RECORDING_TOGGLE,
        PARTICIPANTS_SWAPPED: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
        PARTICIPANTS_CONFERENCED: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
        PARTICIPANT_ADDED: constants.EVENT_TYPE.PARTICIPANT_ADDED, 
        PARTICIPANT_CONNECTED: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
        MESSAGE: constants.EVENT_TYPE.MESSAGE,
        AFTER_CALL_WORK_STARTED: constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED,
        WRAP_UP_ENDED: constants.EVENT_TYPE.WRAP_UP_ENDED,
        /* This is only added to aid in connector development. This will be removed before publishing it*/
        REMOTE_CONTROLLER: 'REMOTE_CONTROLLER'
    },
    ERROR_TYPE: {
        GENERIC_ERROR: constants.ERROR_TYPE.GENERIC_ERROR,
        INVALID_PARTICIPANT: constants.ERROR_TYPE.INVALID_PARTICIPANT,
        INVALID_DESTINATION: constants.ERROR_TYPE.INVALID_DESTINATION,
        INVALID_PARAMS: constants.ERROR_TYPE.INVALID_PARAMS,
        INVALID_AGENT_STATUS: constants.ERROR_TYPE.INVALID_AGENT_STATUS
    },
    AGENT_STATUS: { ...constants.AGENT_STATUS },
    PARTICIPANT_TYPE: { ...constants.PARTICIPANT_TYPE },
    CALL_TYPE: { ...constants.CALL_TYPE },
    CONTACT_TYPE: { ...constants.CONTACT_TYPE },
    CALL_STATE: { ...constants.CALL_STATE }
};

/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector) {
    vendorConnector = connector;
    window.addEventListener('message', windowMessageHandler);
}

/**
 * Publish a telephony error to Salesforce
 * @param {EVENT_TYPE} param.eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object} error Error object representing the error
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - GenericResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_REMOVED - ParticipantRemovedResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANTS_SWAPPED - HoldToggleResult
 * PARTICIPANTS_CONFERENCED - HoldToggleResult
 * MUTE_TOGGLE - MuteToggleResult
 * HOLD_TOGGLE - HoldToggleResult
 * RECORDING_TOGGLE - RecordingToggleResult
 */
export function publishError({ eventType, error }) {
    switch(eventType) {
        case Constants.EVENT_TYPE.LOGIN_RESULT:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, error);
            break;
        case Constants.EVENT_TYPE.LOGOUT_RESULT:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, error);
            break;
        case Constants.EVENT_TYPE.CALL_STARTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error);
            break;
        case Constants.EVENT_TYPE.QUEUED_CALL_STARTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error);
            break;
        case Constants.EVENT_TYPE.CALL_CONNECTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error);
            break;
        case Constants.EVENT_TYPE.HANGUP: 
            dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, error);
            break;
        case constants.EVENT_TYPE.PARTICIPANT_ADDED:
            dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, error);
            break;
        case Constants.EVENT_TYPE.PARTICIPANT_CONNECTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, error);
            break;
        case Constants.EVENT_TYPE.PARTICIPANT_REMOVED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, error); 
            break;
        case Constants.EVENT_TYPE.MUTE_TOGGLE:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, error);
            break;
        case Constants.EVENT_TYPE.HOLD_TOGGLE: 
            dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, error);
            break;
        case Constants.EVENT_TYPE.RECORDING_TOGGLE:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, error);
            break;
        case Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED: 
            dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, error);
            break;
        case Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, error);
            break;
    }
}

/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published. 
 * @param {object} param
 * @param {EVENT_TYPE} param.eventType Event type to publish. Has to be one of EVENT_TYPE
 * @param {object|GenericResult|CallResult|ParticipantResult|ParticipantRemovedResult|MuteToggleResult|HoldToggleResult|RecordingToggleResult} param.payload Payload for the event. Has to be a payload class associated with the EVENT_TYPE
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - GenericResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_REMOVED - ParticipantRemovedResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANTS_SWAPPED - HoldToggleResult
 * PARTICIPANTS_CONFERENCED - HoldToggleResult
 * MESSAGE - object
 * MUTE_TOGGLE - MuteToggleResult
 * HOLD_TOGGLE - HoldToggleResult
 * RECORDING_TOGGLE - RecordingToggleResult
 */
export async function publishEvent({ eventType, payload }) {
    switch(eventType) {
        case Constants.EVENT_TYPE.LOGIN_RESULT: {
            if (validatePayload(payload, GenericResult, constants.ERROR_TYPE.CAN_NOT_LOG_IN)) {
                dispatchEvent(constants.EVENT_TYPE.LOGIN_RESULT, payload);
                if (payload.success) {
                    await setConnectorReady();
                }
            }
            break;
        }
        case Constants.EVENT_TYPE.LOGOUT_RESULT:
            if (validatePayload(payload, GenericResult, constants.ERROR_TYPE.CAN_NOT_LOG_OUT)) {
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, payload);
            }
            break;
        case Constants.EVENT_TYPE.CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, payload.call);
            }
            break;
        case Constants.EVENT_TYPE.QUEUED_CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload.call);
            }
            break;
        case Constants.EVENT_TYPE.CALL_CONNECTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call);
            }
            break;
        case Constants.EVENT_TYPE.HANGUP: {
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_END_THE_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.HANGUP, payload.call);
            }
            break;
        }
        case constants.EVENT_TYPE.PARTICIPANT_ADDED: {
            if (validatePayload(payload, ParticipantResult, constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT)) {
                const { initialCallHasEnded, callInfo, phoneNumber, callId } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber,
                    callId
                });
            }
            break;
        }
        case Constants.EVENT_TYPE.PARTICIPANT_CONNECTED: {
            if (validatePayload(payload, ParticipantResult, constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT)) {
                const { initialCallHasEnded, callInfo, phoneNumber, callId } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber,
                    callId
                    });
            }
            break;
        }
        case Constants.EVENT_TYPE.PARTICIPANT_REMOVED: {
            // TODO: The logic here needs to be modified. Ideally firing ParticipantRemovedResult with 
            // correct participantType should do the trick but we are firing PARTICIPANT_CONNECTED because of a bug W-8601645
            // Once the bug is fixed, this code needs to be updated
            if (validatePayload(payload, ParticipantRemovedResult, constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT)) { 
                const { reason, participantType } = payload;
                const activeCallsResult = await vendorConnector.getActiveCalls();
                if (validatePayload(activeCallsResult, ActiveCallsResult)) {
                    // when no more active calls, fire HANGUP
                    const activeCalls = activeCallsResult.activeCalls;
                    if (activeCalls.length === 0) {
                        dispatchEvent(constants.EVENT_TYPE.HANGUP);
                    } else if (participantType === constants.PARTICIPANT_TYPE.INITIAL_CALLER) {
                        // when there is still transfer call, based on the state of the transfer call, fire PARTICIPANT_ADDED or PARTICIPANT_CONNECTED
                        const transferCall = Object.values(activeCalls).filter((obj) => obj['callType'] === constants.CALL_TYPE.ADD_PARTICIPANT).pop();
                        const event = transferCall.state === constants.CALL_STATE.TRANSFERRING ? constants.EVENT_TYPE.PARTICIPANT_ADDED : constants.EVENT_TYPE.PARTICIPANT_CONNECTED;
                        dispatchEvent(event, {
                            initialCallHasEnded : true
                        })
                    } else {
                        dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                            reason
                        });
                    }
                }
            }
            break;
        }
        case Constants.EVENT_TYPE.MESSAGE:
            dispatchEvent(constants.EVENT_TYPE.MESSAGE, payload);
            break;
        // TODO: Add validations for the ACW & Wrap up ended
        case Constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED:
            dispatchEvent(constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload);
            break;
        case Constants.EVENT_TYPE.WRAP_UP_ENDED:
            dispatchEvent(constants.EVENT_TYPE.WRAP_UP_ENDED, payload);
            break;
        /* This is only added to aid in connector development. This will be removed before publishing it*/
        case Constants.EVENT_TYPE.REMOTE_CONTROLLER:
            channelMessageHandler(payload);
            break;
        case Constants.EVENT_TYPE.MUTE_TOGGLE:
            if (validatePayload(payload, MuteToggleResult, constants.ERROR_TYPE.CAN_NOT_MUTE_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, payload);
            }
            break;
        case Constants.EVENT_TYPE.HOLD_TOGGLE: {
            const { isThirdPartyOnHold, isCustomerOnHold, calls} = payload;
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_HOLD_CALL)) {
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                });
            }
            break;
        }
        case Constants.EVENT_TYPE.RECORDING_TOGGLE: {
            const { isRecordingPaused,
                contactId,
                initialContactId,
                instanceId,
                region
            } = payload;
            if (validatePayload(payload, RecordingToggleResult, constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING)) {
                dispatchEvent(constants.EVENT_TYPE.RECORDING_TOGGLE, {
                    isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                });
            }
        break;
        }
        case Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED: {
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS)) {
                const { isThirdPartyOnHold, isCustomerOnHold, calls } = payload;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                });
            }
        }
        break;
        case Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED: {
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_CONFERENCE)) {
                const { isThirdPartyOnHold, isCustomerOnHold } = payload;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold
                });
            }
        break;
        }
    }
}

/**
 * Checks the agent's availability
 * @returns {boolean}
 */
export function isAgentAvailable() {
    return agentAvailable;
}

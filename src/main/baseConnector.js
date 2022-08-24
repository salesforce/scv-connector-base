/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */
import constants from './constants.js';
import { CONNECTOR_CONFIG_EXPOSED_FIELDS, CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH } from './constants.js';
import { Validator, GenericResult, InitResult, CallResult, HangupResult, HoldToggleResult, PhoneContactsResult, MuteToggleResult,
    ParticipantResult, RecordingToggleResult, AgentConfigResult, ActiveCallsResult, SignedRecordingUrlResult, LogoutResult,
    VendorConnector, Contact, AudioStats, SuperviseCallResult, SupervisorHangupResult, AgentStatusInfo, SupervisedCallInfo, CapabilitiesResult, AgentVendorStatusInfo, StateChangeResult} from './types';
import { enableMos, getMOS, initAudioStats, updateAudioStats } from './mosUtil';
import { log, getLogs } from './logger';

let channelPort;
let vendorConnector;
let agentAvailable;
let isSupervisorConnected;

/**
 * Gets the error type from the error object
 * @param {object} e Error object representing the error
 */
function getErrorType(e) {
    return e && e.type ? e.type : e;
}

/**
 * Sanitizes the object by removing any PII data
 * @param {object} payload
 */
function sanitizePayload(payload) {
    if (payload) {
        if (typeof (payload) === 'function') {
            // remove functions from the payload, because they cannot be copied by the postMessage function
            return;
        } else if (typeof (payload) === 'object') {
            const isArray = Array.isArray(payload);
            const sanitizedPayload = isArray ? [] : {};

            if (isArray) {
                payload.forEach(element => {
                    sanitizedPayload.push(sanitizePayload(element));
                });
            } else {
                for (const property in payload) {
                    if (property !== 'phoneNumber' &&
                        property !== 'number' &&
                        property !== 'name' &&
                        property !== 'callAttributes') {
                        sanitizedPayload[property] = sanitizePayload(payload[property]);
                    }
                }
            }
            return sanitizedPayload;
        }
    }
    return payload;
}

/**
 * Gets the error message from the error object
 * @param {object} e Error object representing the error
 */
function getErrorMessage(e) {
    return e && e.message ? e.message : e;
}
/** 
 * Dispatch a telephony event log to Salesforce
 * @param {String} eventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED    
 * @param {Object} payload event payload
 * @param {Boolean} isError error scenario
 */
function dispatchEventLog(eventType, payload, isError) {
    const sanitizedPayload = sanitizePayload(payload);
    const logLevel = isError ? constants.LOG_LEVEL.ERROR : constants.LOG_LEVEL.INFO;
    log({eventType, payload}, logLevel, constants.LOG_SOURCE.SYSTEM);

    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.LOG,
        payload: { eventType, payload: sanitizedPayload, isError }
    });
}
/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} eventType event type, i.e. constants.EVENT_TYPE.CALL_STARTED
 * @param {Object} payload event payload
 * @param {Boolean} registerLog optional argument to not register the event
 */
function dispatchEvent(eventType, payload, registerLog = true) {
    channelPort.postMessage({
        type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType: eventType, telephonyEventPayload: payload }
    });
    if (registerLog) {
        dispatchEventLog(eventType, payload, false);
    }
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {string} errorType Error Type, ex: constants.ErrorType.MICROPHONE_NOT_SHARED
 * @param {object} error Error object representing the error
 * @param {string} eventType The event that caused this error, ex: constants.MESSAGE_TYPE.ACCEPT_CALL
 */
function dispatchError(errorType, error, eventType) {
    // eslint-disable-next-line no-console
    console.error(`SCV dispatched error ${errorType} for eventType ${eventType}`, error);
    dispatchEvent(constants.EVENT_TYPE.ERROR, { message: constants.ERROR_TYPE[errorType] }, false);
    dispatchEventLog(eventType, { errorType, error }, true);
}

function dispatchInfo(eventType, payload) {
    // eslint-disable-next-line no-console
    console.info(`SCV info message dispatched for eventType ${eventType} with payload ${JSON.stringify(payload)}`);
    dispatchEvent(constants.EVENT_TYPE.INFO, { message: constants.INFO_TYPE[eventType] }, false);
    dispatchEventLog(eventType, payload, false);
}

/** 
 * Notify Salesforce that the connector is ready
 */
async function setConnectorReady() {
    try {
        const agentConfigResult = await vendorConnector.getAgentConfig();
        const capabilitiesResult = await vendorConnector.getCapabilities();
        Validator.validateClassObject(agentConfigResult, AgentConfigResult);
        Validator.validateClassObject(capabilitiesResult, CapabilitiesResult);
        if (capabilitiesResult.supportsMos) {
            enableMos();
        }
        const activeCallsResult = await vendorConnector.getActiveCalls();
        Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
        const activeCalls = activeCallsResult.activeCalls;
        const type = constants.MESSAGE_TYPE.CONNECTOR_READY;
        const payload = {
            agentConfig: {

                [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
                [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone
            },
            capabilities: {
                [constants.CAPABILITIES_TYPE.MUTE] : capabilitiesResult.hasMute,
                [constants.CAPABILITIES_TYPE.RECORD] : capabilitiesResult.hasRecord,
                [constants.CAPABILITIES_TYPE.MERGE] : capabilitiesResult.hasMerge,
                [constants.CAPABILITIES_TYPE.SWAP] : capabilitiesResult.hasSwap,
                [constants.CAPABILITIES_TYPE.SIGNED_RECORDING_URL] : capabilitiesResult.hasSignedRecordingUrl,
                [constants.CAPABILITIES_TYPE.DEBUG_ENABLED] : capabilitiesResult.debugEnabled,
                [constants.CAPABILITIES_TYPE.CONTACT_SEARCH] : capabilitiesResult.hasContactSearch,
                [constants.CAPABILITIES_TYPE.VENDOR_PROVIDED_AVAILABILITY] : capabilitiesResult.hasAgentAvailability,
                [constants.CAPABILITIES_TYPE.SUPERVISOR_LISTEN_IN] : capabilitiesResult.hasSupervisorListenIn,
                [constants.CAPABILITIES_TYPE.SUPERVISOR_BARGE_IN] : capabilitiesResult.hasSupervisorBargeIn,
                [constants.CAPABILITIES_TYPE.MOS] : capabilitiesResult.supportsMos,
                [constants.CAPABILITIES_TYPE.BLIND_TRANSFER] : capabilitiesResult.hasBlindTransfer,
                [constants.CAPABILITIES_TYPE.TRANSFER_TO_OMNI_FLOW] : capabilitiesResult.hasTransferToOmniFlow,
                [constants.CAPABILITIES_TYPE.PENDING_STATUS_CHANGE] : capabilitiesResult.hasPendingStatusChange
            },
            callInProgress: activeCalls.length > 0 ? activeCalls[0] : null
        }
        channelPort.postMessage({
            type,
            payload
        });
        dispatchEventLog(type, payload, false);
    } catch (e) {
        // Post CONNECTOR_READY even if getAgentConfig is not implemented
        channelPort.postMessage({
            type: constants.MESSAGE_TYPE.CONNECTOR_READY,
            payload: {}
        });
        dispatchEventLog(constants.MESSAGE_TYPE.CONNECTOR_READY, {}, false);
    }
}

//TODO: 230 we should convert call object to PhoneCall object
async function channelMessageHandler(message) { 
    const eventType = message.data.type;
    if (eventType !== constants.MESSAGE_TYPE.LOG) {
        dispatchEventLog(eventType, message.data, false);
    }
    switch (eventType) {
        case constants.MESSAGE_TYPE.ACCEPT_CALL:
            try {
                if (message.data.call && message.data.call.callType &&
                    message.data.call.callType.toLowerCase() === constants.CALL_TYPE.OUTBOUND.toLowerCase()) {
                    return;
                }
                initAudioStats();
                if (isSupervisorConnected) {
                    const hangupPayload = await vendorConnector.supervisorDisconnect();
                    Validator.validateClassObject(hangupPayload, SupervisorHangupResult);
                    isSupervisorConnected = false;
                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload.calls);
                }
                let payload = await vendorConnector.acceptCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(call.callType.toLowerCase() === constants.CALL_TYPE.CALLBACK.toLowerCase() ?
                    constants.EVENT_TYPE.CALL_STARTED : constants.EVENT_TYPE.CALL_CONNECTED, call);
            } catch (e) {
                isSupervisorConnected = false;
                dispatchInfo(constants.INFO_TYPE.CAN_NOT_ACCEPT_THE_CALL, {messagetype: constants.MESSAGE_TYPE.ACCEPT_CALL, additionalInfo: e} )
            }
        break;
        case constants.MESSAGE_TYPE.DECLINE_CALL:
            try {
                const payload =  await vendorConnector.declineCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(constants.EVENT_TYPE.HANGUP, call);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, e, constants.MESSAGE_TYPE.DECLINE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.END_CALL:
            try {
                const payload = await vendorConnector.endCall(message.data.call, message.data.agentStatus);
                Validator.validateClassObject(payload, HangupResult);
                const activeCallsResult = await vendorConnector.getActiveCalls();
                Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
                const activeCalls = activeCallsResult.activeCalls;
                const { calls } = payload;
                // after end calls from vendor side, if no more active calls, fire HANGUP, otherwise, fire PARTICIPANT_REMOVED
                if (activeCalls.length === 0) {
                    dispatchEvent(constants.EVENT_TYPE.HANGUP, calls);
                } else {
                    dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, calls.length > 0 && calls[0]);
                }
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, e, constants.MESSAGE_TYPE.END_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.MUTE:
            try {
                const payload = await vendorConnector.mute();
                publishEvent({eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_MUTE_CALL, e, constants.MESSAGE_TYPE.MUTE);
            }
        break;
        case constants.MESSAGE_TYPE.UNMUTE:
            try {
                const payload = await vendorConnector.unmute();
                publishEvent({eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL, e, constants.MESSAGE_TYPE.UNMUTE);
            }
        break;
        case constants.MESSAGE_TYPE.HOLD:
            try {
                const payload = await vendorConnector.hold(message.data.call);
                publishEvent({eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_PARTICIPANT:
                        dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e), constants.MESSAGE_TYPE.HOLD);
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_HOLD_CALL, getErrorMessage(e), constants.MESSAGE_TYPE.HOLD);
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.RESUME:
            try {
                const payload = await vendorConnector.resume(message.data.call);
                publishEvent({eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_PARTICIPANT:
                        dispatchError(constants.ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e), constants.MESSAGE_TYPE.RESUME);
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_CALL, getErrorMessage(e), constants.MESSAGE_TYPE.RESUME);
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.SET_AGENT_STATUS:
            try {
                const statusInfo = message.data.statusInfo || {};
                const enqueueNextState = message.data.enqueueNextState || false;
                const payload = await vendorConnector.setAgentStatus(message.data.agentStatus, statusInfo, enqueueNextState);
                Validator.validateClassObject(payload, GenericResult);
                const { success } = payload;
                dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, { success });
            } catch (e) {
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_AGENT_STATUS:
                        dispatchError(constants.ERROR_TYPE.INVALID_AGENT_STATUS, getErrorMessage(e), constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, getErrorMessage(e), constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.GET_AGENT_STATUS:
            try {
                const payload = await vendorConnector.getAgentStatus();
                Validator.validateClassObject(payload, AgentVendorStatusInfo);
                dispatchEvent(constants.EVENT_TYPE.GET_AGENT_STATUS_RESULT, payload);
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, getErrorMessage(e), constants.MESSAGE_TYPE.GET_AGENT_STATUS);
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
                        dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e), constants.MESSAGE_TYPE.DIAL);
                        break;
                    case constants.ERROR_TYPE.GENERIC_ERROR:
                        dispatchError(constants.ERROR_TYPE.GENERIC_ERROR, getErrorMessage(e), constants.MESSAGE_TYPE.DIAL);
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, getErrorMessage(e), constants.MESSAGE_TYPE.DIAL);
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.SEND_DIGITS:
            try {
                await vendorConnector.sendDigits(message.data.digits);
            } catch (e) {
                dispatchEventLog(constants.MESSAGE_TYPE.SEND_DIGITS, message.data.digits, true);
            }
            break;
        case constants.MESSAGE_TYPE.GET_PHONE_CONTACTS:
            try  {
                const payload = await vendorConnector.getPhoneContacts(message.data.filter);
                Validator.validateClassObject(payload, PhoneContactsResult);
                const contacts = payload.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        type: contact.type,
                        name: contact.name,
                        phoneNumber: contact.phoneNumber,
                        prefix: contact.prefix,
                        extension: contact.extension,
                        endpointARN: contact.endpointARN,
                        queue: contact.queue,
                        availability: contact.availability,
                        recordId: contact.recordId,
                        description: contact.description
                    };
                });
                dispatchEvent(constants.EVENT_TYPE.PHONE_CONTACTS, {
                    contacts, contactTypes: payload.contactTypes
                });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS, e, constants.MESSAGE_TYPE.GET_PHONE_CONTACTS);
            }
        break;
        case constants.MESSAGE_TYPE.SWAP_PARTICIPANTS:
            try {
                // TODO: Create PhoneCall from call1.callId & call2.callId
                // TODO: rename to call1 and call2
                const payload = await vendorConnector.swap(message.data.callToHold, message.data.callToResume);
                publishEvent({ eventType: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, e, constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
            }
        break;
        case constants.MESSAGE_TYPE.CONFERENCE:
            try {
                const payload = await vendorConnector.conference(message.data.calls);
                publishEvent({ eventType: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, e, constants.MESSAGE_TYPE.CONFERENCE);
            }
        break;
        case constants.MESSAGE_TYPE.ADD_PARTICIPANT:
            try {
                const payload = await vendorConnector.addParticipant(new Contact(message.data.contact), message.data.call, message.data.isBlindTransfer);
                publishEvent({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload });
                if (message.data.isBlindTransfer) {
                    dispatchEvent(constants.EVENT_TYPE.HANGUP, message.data.call);
                }
            } catch (e) {
                // TODO: Can we avoid passing in reason field
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                    reason: constants.EVENT_TYPE.ERROR.toLowerCase()
                });
                switch(getErrorType(e)) {
                    case constants.ERROR_TYPE.INVALID_DESTINATION:
                        dispatchError(constants.ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e), constants.MESSAGE_TYPE.ADD_PARTICIPANT);
                        break;
                    default:
                        dispatchError(constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, getErrorMessage(e), constants.MESSAGE_TYPE.ADD_PARTICIPANT);
                        break;
                }
            }
        break;
        case constants.MESSAGE_TYPE.PAUSE_RECORDING:
            try {
                const payload = await vendorConnector.pauseRecording(message.data.call);
                publishEvent({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, e, constants.MESSAGE_TYPE.PAUSE_RECORDING);
            }
        break;
        case constants.MESSAGE_TYPE.RESUME_RECORDING:
            try {
                const payload = await vendorConnector.resumeRecording(message.data.call);
                publishEvent({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING, e, constants.MESSAGE_TYPE.RESUME_RECORDING);
            }
        break;
        case constants.MESSAGE_TYPE.LOGOUT:
            try {
                const payload = await vendorConnector.logout();
                Validator.validateClassObject(payload, LogoutResult);
                const { success, loginFrameHeight } = payload;
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, { success, loginFrameHeight });
            } catch (e) {
                dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, e, constants.MESSAGE_TYPE.LOGOUT);
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
                    const shouldReplay = call.callInfo ? call.callInfo.isReplayable : true;
                    const isSupervisorCall = call.callAttributes && call.callAttributes.participantType === constants.PARTICIPANT_TYPE.SUPERVISOR;
                    const hasSupervisorBargedIn = isSupervisorCall && call.callAttributes && call.callAttributes.hasSupervisorBargedIn;
                    if (shouldReplay) {
                        call.isReplayedCall = true;
                        switch(call.state) {
                            case constants.CALL_STATE.CONNECTED:
                                if (isSupervisorCall) {
                                    isSupervisorConnected = true;
                                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, call);
                                    if (hasSupervisorBargedIn) {
                                        dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, call);
                                    }
                                    break;
                                }
                                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, call);
                                break;
                            case constants.CALL_STATE.RINGING:
                                if (isSupervisorCall) {
                                    isSupervisorConnected = true;
                                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, call);
                                    break;
                                }
                                dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, call);
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
        }
        break;
        case constants.MESSAGE_TYPE.SET_AGENT_CONFIG:
            try {
                const result = await vendorConnector.setAgentConfig(message.data.config);
                Validator.validateClassObject(result, GenericResult);
                dispatchEvent(constants.EVENT_TYPE.AGENT_CONFIG_UPDATED, result);
            } catch (e){
                dispatchError(getErrorType(e) === constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER ? constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER : constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG , getErrorMessage(e), constants.MESSAGE_TYPE.SET_AGENT_CONFIG);
            }
        break;
        case constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL:
            try {
                const { recordingUrl, vendorCallKey, callId } = message.data;
                const result = await vendorConnector.getSignedRecordingUrl(recordingUrl, vendorCallKey, callId);
                Validator.validateClassObject(result, SignedRecordingUrlResult);
                dispatchEvent(constants.EVENT_TYPE.SIGNED_RECORDING_URL, result);
            } catch (e) {
                // In case of an error, we want to show an error message in the recording player
                const signedRecordingUrlResult = new SignedRecordingUrlResult({
                    success: false
                });
                dispatchEvent(constants.EVENT_TYPE.SIGNED_RECORDING_URL, signedRecordingUrlResult, false);
                dispatchEventLog(constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, signedRecordingUrlResult, true);
            }
        break;
        case constants.MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS:
            vendorConnector.downloadLogs(getLogs());
        break;
        case constants.MESSAGE_TYPE.LOG: {
                const { logLevel, logMessage, payload } = message.data;
                vendorConnector.logMessageToVendor(logLevel, logMessage, payload);
            }
        break;
        case constants.MESSAGE_TYPE.SUPERVISE_CALL:
            try {
                isSupervisorConnected = true;
                const result = await vendorConnector.superviseCall(message.data.call);
                Validator.validateClassObject(result, SuperviseCallResult);
                const agentConfigResult = await vendorConnector.getAgentConfig();
                if(agentConfigResult.selectedPhone.type === constants.PHONE_TYPE.SOFT_PHONE) {
                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, result.call);
                } else {
                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, result.call);
                }
            } catch (e){
                isSupervisorConnected = false;
                dispatchError(constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, e, constants.MESSAGE_TYPE.SUPERVISE_CALL);
            }
        break;
        case constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT:
            try {
                const result = await vendorConnector.supervisorDisconnect(message.data.call);
                Validator.validateClassObject(result, SupervisorHangupResult);
                isSupervisorConnected = false;
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, result.calls);
            } catch (e){
                dispatchError(constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, e, constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT);
            }
        break;
        case constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN:
            try {
                const result = await vendorConnector.supervisorBargeIn(message.data.call);
                Validator.validateClassObject(result, SuperviseCallResult);
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, result.call );
            } catch (e){
                dispatchError(constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, e, constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN);
            }
        break;
        default:
            break;
    }
}


async function windowMessageHandler(message) {
    switch (message.data.type) {
        case constants.MESSAGE_TYPE.SETUP_CONNECTOR: {
            const sfDomain = /^https:\/\/[\w-.]+(\.lightning\.force\.com|\.lightning\.pc-rnd\.force\.com|\.stm\.force\.com|\.salesforce\.com|\.my\.salesforce-sites\.com|\.lightning\.localhost\.[\w]+\.force.com)$/;
            const originUrl = new URL(message.origin);
            const url = originUrl.protocol + '//' + originUrl.hostname;

            if (sfDomain.test(url)) {
                channelPort = message.ports[0];
                channelPort.onmessage = channelMessageHandler;
                dispatchEventLog(constants.MESSAGE_TYPE.SETUP_CONNECTOR, exposedConnectorConfig(message.data.connectorConfig), false);
                try {
                    const payload = await vendorConnector.init(message.data.connectorConfig);
                    Validator.validateClassObject(payload, InitResult);
                    if (payload.showLogin) {
                        dispatchEvent(constants.EVENT_TYPE.SHOW_LOGIN, {
                            loginFrameHeight: payload.loginFrameHeight
                        });
                    } else {
                        setConnectorReady();
                    }
                } catch (e) {
                    switch(getErrorType(e)) {
                        case constants.ERROR_TYPE.INVALID_PARAMS:
                            dispatchError(constants.ERROR_TYPE.INVALID_PARAMS, getErrorMessage(e), constants.MESSAGE_TYPE.SETUP_CONNECTOR);
                            break;
                        default:
                            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, getErrorMessage(e), constants.MESSAGE_TYPE.SETUP_CONNECTOR);
                            break;
                    }
                }
            }
            window.removeEventListener('message', windowMessageHandler);
        }
            break;
        default:
            break;
    }
}

function exposedConnectorConfig(payload) {
    payload = payload || {};
    let obj = {};
    //properties that are equal to key
    CONNECTOR_CONFIG_EXPOSED_FIELDS.forEach(prop => {
        if (payload.hasOwnProperty(prop)) {
            obj[prop] = payload[prop];
        }
    });
    //properties that start with key
    CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH.forEach(prop => {
        Object.keys(payload).forEach(key => {
            if (key.startsWith(prop)) {
                obj[key] = payload[key];
            }
        });
    });

    return obj;
}

function validatePayload(payload, payloadType, errorType, eventType) {
    try {
        Validator.validateClassObject(payload, payloadType);
        return true;
    } catch (e) {
        if (errorType) {
            dispatchError(errorType, e, eventType);
        }
        return false;
    }
}

/*========================== Exported Functions ==========================*/
/**
 * Initialize a vendor connector
 * @param {VendorConnector} connector
 */
export function initializeConnector(connector) {
    vendorConnector = connector;
    window.addEventListener('message', windowMessageHandler);
}

/**
 * Publish an event or error log to Salesforce
 * @param {object} param
 * @param {string} param.eventType Any event type to be logged
 * @param {object} param.payload Any payload for the log that needs to be logged
 * @param {boolean} param.isError
 */
export function publishLog({ eventType, payload, isError }) {
    dispatchEventLog(eventType, payload, isError);
}

/**
 * Publish a telephony error to Salesforce
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE"|"AGENT_ERROR"|"SOFTPHONE_ERROR")} param.eventType Event type to publish.
 * @param {object} param.error Error object representing the error
 */
export function publishError({ eventType, error }) {
    switch(eventType) {
        case constants.EVENT_TYPE.LOGIN_RESULT:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_IN, error, constants.EVENT_TYPE.LOGIN_RESULT);
            break;
        case constants.EVENT_TYPE.LOGOUT_RESULT:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_LOG_OUT, error, constants.EVENT_TYPE.LOGOUT_RESULT);
            break;
        case constants.EVENT_TYPE.CALL_STARTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.CALL_STARTED);
            break;
        case constants.EVENT_TYPE.QUEUED_CALL_STARTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.QUEUED_CALL_STARTED);
            break;
        case constants.EVENT_TYPE.CALL_CONNECTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.EVENT_TYPE.CALL_CONNECTED);
            break;
        case constants.EVENT_TYPE.HANGUP: 
            dispatchError(constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, error, constants.EVENT_TYPE.HANGUP);
            break;
        case constants.EVENT_TYPE.PARTICIPANT_ADDED:
            dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_ADDED);
            break;
        case constants.EVENT_TYPE.PARTICIPANT_CONNECTED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_CONNECTED);
            break;
        case constants.EVENT_TYPE.PARTICIPANT_REMOVED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, error, constants.EVENT_TYPE.PARTICIPANT_REMOVED); 
            break;
        case constants.EVENT_TYPE.MUTE_TOGGLE:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, error, constants.EVENT_TYPE.MUTE_TOGGLE);
            break;
        case constants.EVENT_TYPE.HOLD_TOGGLE: 
            dispatchError(getErrorType(error) === constants.ERROR_TYPE.INVALID_PARTICIPANT ? constants.ERROR_TYPE.INVALID_PARTICIPANT : constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, error, constants.EVENT_TYPE.HOLD_TOGGLE);
            break;
        case constants.EVENT_TYPE.RECORDING_TOGGLE:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, error, constants.EVENT_TYPE.RECORDING_TOGGLE);
            break;
        case constants.EVENT_TYPE.PARTICIPANTS_SWAPPED: 
            dispatchError(constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, error, constants.EVENT_TYPE.PARTICIPANTS_SWAPPED);
            break;
        case constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED:
            dispatchError(constants.ERROR_TYPE.CAN_NOT_CONFERENCE, error, constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED);
            break;
        case constants.EVENT_TYPE.AGENT_ERROR:
            dispatchError(constants.ERROR_TYPE.AGENT_ERROR, error, constants.EVENT_TYPE.AGENT_ERROR);
            break;
        case constants.EVENT_TYPE.SOFTPHONE_ERROR:
            switch(getErrorType(error)) {
                case constants.ERROR_TYPE.UNSUPPORTED_BROWSER:
                    dispatchError(constants.ERROR_TYPE.UNSUPPORTED_BROWSER, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
                    break;
                case constants.ERROR_TYPE.MICROPHONE_NOT_SHARED:
                    dispatchError(constants.ERROR_TYPE.MICROPHONE_NOT_SHARED, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
                    break;
                default:
                    dispatchError(constants.ERROR_TYPE.GENERIC_ERROR, error, constants.EVENT_TYPE.SOFTPHONE_ERROR);
            }
            break;
        default:
            console.error('Unhandled error scenario with arguments ', arguments);
    }
}

/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published. 
 * @param {object} param
 * @param {("LOGIN_RESULT"|"LOGOUT_RESULT"|"CALL_STARTED"|"QUEUED_CALL_STARTED"|"CALL_CONNECTED"|"HANGUP"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_ADDED"|"PARTICIPANTS_SWAPPED"|"PARTICIPANTS_CONFERENCED"|"MESSAGE"|"MUTE_TOGGLE"|"HOLD_TOGGLE"|"RECORDING_TOGGLE")} param.eventType Event type to publish
 * @param {object} param.payload Payload for the event. Must to be an object of the payload class associated with the EVENT_TYPE else the event is NOT dispatched
 * @param {boolean} param.registerLog Boolean to opt out of registering logs for events
 * LOGIN_RESULT - GenericResult
 * LOGOUT_RESULT - LogoutResult
 * CALL_STARTED - CallResult
 * QUEUED_CALL_STARTED - CallResult
 * CALL_CONNECTED - CallResult
 * HANGUP - CallResult
 * PARTICIPANT_CONNECTED - ParticipantResult
 * PARTICIPANT_ADDED - ParticipantResult
 * PARTICIPANTS_SWAPPED - HoldToggleResult
 * PARTICIPANTS_CONFERENCED - HoldToggleResult
 * MESSAGE - object
 * MUTE_TOGGLE - MuteToggleResult
 * HOLD_TOGGLE - HoldToggleResult
 * RECORDING_TOGGLE - RecordingToggleResult
 */
export async function publishEvent({ eventType, payload, registerLog = true }) {
    switch(eventType) {
        case constants.EVENT_TYPE.LOGIN_RESULT: {
            if (validatePayload(payload, GenericResult, constants.ERROR_TYPE.CAN_NOT_LOG_IN, constants.EVENT_TYPE.LOGIN_RESULT)) {
                dispatchEvent(constants.EVENT_TYPE.LOGIN_RESULT, payload, registerLog);
                if (payload.success) {
                    setConnectorReady();
                }
            }
            break;
        }
        case constants.EVENT_TYPE.LOGOUT_RESULT:
            if (validatePayload(payload, LogoutResult, constants.ERROR_TYPE.CAN_NOT_LOG_OUT, constants.EVENT_TYPE.LOGOUT_RESULT)) {
                dispatchEvent(constants.EVENT_TYPE.LOGOUT_RESULT, {
                    success: payload.success,
                    loginFrameHeight: payload.loginFrameHeight
                }, registerLog);
            }
            break;
        case constants.EVENT_TYPE.CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.CALL_STARTED)) {
                dispatchEvent(constants.EVENT_TYPE.CALL_STARTED, payload.call, registerLog);
            }
            break;
        case constants.EVENT_TYPE.QUEUED_CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.QUEUED_CALL_STARTED)) {
                dispatchEvent(constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload.call, registerLog);
            }
            break;
        case constants.EVENT_TYPE.CALL_CONNECTED:
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.EVENT_TYPE.CALL_CONNECTED)) {
                initAudioStats();
                if (isSupervisorConnected) {
                    const hangupPayload = await vendorConnector.supervisorDisconnect();
                    Validator.validateClassObject(hangupPayload, SupervisorHangupResult);
                    isSupervisorConnected = false;
                    dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload, registerLog);
                    dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call, registerLog);
                    break;
                } 
                dispatchEvent(constants.EVENT_TYPE.CALL_CONNECTED, payload.call, registerLog);
            }
            break;
        case constants.EVENT_TYPE.HANGUP: {
            if (validatePayload(payload, HangupResult, constants.ERROR_TYPE.CAN_NOT_END_THE_CALL, constants.EVENT_TYPE.HANGUP)) {
                dispatchEvent(constants.EVENT_TYPE.HANGUP, payload.calls, registerLog);
            }
            break;
        }
        case constants.EVENT_TYPE.PARTICIPANT_ADDED: {
            if (validatePayload(payload, ParticipantResult, constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_ADDED)) {
                const { initialCallHasEnded, callInfo, phoneNumber, callId } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_ADDED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber,
                    callId
                }, registerLog);
            }
            break;
        }
        case constants.EVENT_TYPE.PARTICIPANT_CONNECTED: {
            if (validatePayload(payload, ParticipantResult, constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_CONNECTED)) {
                const { initialCallHasEnded, callInfo, phoneNumber, callId } = payload;
                dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_CONNECTED, {
                    initialCallHasEnded,
                    callInfo,
                    phoneNumber,
                    callId
                }, registerLog);
            }
            break;
        }
        case constants.EVENT_TYPE.PARTICIPANT_REMOVED: {
            // TODO: The logic here needs to be modified. Ideally firing CallResult with 
            // correct participantType should do the trick but we are firing PARTICIPANT_CONNECTED because of a bug W-8601645
            // Once the bug is fixed, this code needs to be updated
            if (validatePayload(payload, CallResult, constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, constants.EVENT_TYPE.PARTICIPANT_REMOVED)) { 
                const { call } = payload;
                const activeCallsResult = await vendorConnector.getActiveCalls();
                if (validatePayload(activeCallsResult, ActiveCallsResult)) {
                    // when no more active calls, fire HANGUP
                    const activeCalls = activeCallsResult.activeCalls;
                    if (activeCalls.length === 0) {
                        dispatchEvent(constants.EVENT_TYPE.HANGUP, call, registerLog);
                    } else if (call && call.callAttributes && call.callAttributes.participantType === constants.PARTICIPANT_TYPE.INITIAL_CALLER) {
                        // when there is still transfer call, based on the state of the transfer call, fire PARTICIPANT_ADDED or PARTICIPANT_CONNECTED
                        const transferCall = Object.values(activeCalls).filter((obj) => obj['callType'] === constants.CALL_TYPE.ADD_PARTICIPANT).pop();
                        const event = transferCall.state === constants.CALL_STATE.TRANSFERRING ? constants.EVENT_TYPE.PARTICIPANT_ADDED : constants.EVENT_TYPE.PARTICIPANT_CONNECTED;
                        dispatchEvent(event, {
                            initialCallHasEnded : true
                        })
                    } else {
                        dispatchEvent(constants.EVENT_TYPE.PARTICIPANT_REMOVED, {
                            reason: call? call.reason : null
                        }, registerLog);
                    }
                }
            }
            break;
        }
        case constants.EVENT_TYPE.MESSAGE:
            dispatchEvent(constants.EVENT_TYPE.MESSAGE, payload, registerLog);
            break;
        // TODO: Add validations for the ACW & Wrap up ended
        case constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED:
            dispatchEvent(constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload, registerLog);
            break;
        case constants.EVENT_TYPE.WRAP_UP_ENDED:
            dispatchEvent(constants.EVENT_TYPE.WRAP_UP_ENDED, payload, registerLog);
            break;
        /* This is only added to aid in connector development */
        case constants.EVENT_TYPE.REMOTE_CONTROLLER:
            channelMessageHandler(payload);
            break;
        case constants.EVENT_TYPE.MUTE_TOGGLE:
            if (validatePayload(payload, MuteToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, constants.EVENT_TYPE.MUTE_TOGGLE)) {
                dispatchEvent(constants.EVENT_TYPE.MUTE_TOGGLE, payload, registerLog);
            }
            break;
        case constants.EVENT_TYPE.HOLD_TOGGLE: {
            const { isThirdPartyOnHold, isCustomerOnHold, calls} = payload;
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, constants.EVENT_TYPE.HOLD_TOGGLE)) {
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                }, registerLog);
            }
            break;
        }
        case constants.EVENT_TYPE.RECORDING_TOGGLE: {
            const { isRecordingPaused,
                contactId,
                initialContactId,
                instanceId,
                region
            } = payload;
            if (validatePayload(payload, RecordingToggleResult, constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, constants.EVENT_TYPE.RECORDING_TOGGLE)) {
                dispatchEvent(constants.EVENT_TYPE.RECORDING_TOGGLE, {
                    isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                }, registerLog);
            }
        break;
        }
        case constants.EVENT_TYPE.PARTICIPANTS_SWAPPED: {
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, constants.EVENT_TYPE.PARTICIPANTS_SWAPPED)) {
                const { isThirdPartyOnHold, isCustomerOnHold, calls } = payload;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                }, registerLog);
            }
        }
        break;
        case constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED: {
            if (validatePayload(payload, HoldToggleResult, constants.ERROR_TYPE.CAN_NOT_CONFERENCE, constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED)) {
                const { isThirdPartyOnHold, isCustomerOnHold } = payload;
                dispatchEvent(constants.EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold
                }, registerLog);
            }
        break;
        }
        case constants.EVENT_TYPE.UPDATE_AUDIO_STATS: {
            if (validatePayload(payload, AudioStats)) {
                if (payload.stats) {
                    updateAudioStats(payload.stats);
                }
                if (payload.isAudioStatsCompleted && payload.callId) {
                    const callId = payload.callId;
                    const mos = getMOS();
                    dispatchEvent(constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, {callId, mos}, registerLog);
                }
            }
            break;
        }

        case constants.EVENT_TYPE.SUPERVISOR_BARGED_IN: {
            if (validatePayload(payload, SuperviseCallResult, constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, constants.EVENT_TYPE.SUPERVISOR_BARGED_IN)) {
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, payload.call, registerLog);
            }
            break;
        }

        case constants.EVENT_TYPE.CALL_BARGED_IN: {
            if (validatePayload(payload, SupervisedCallInfo,  constants.ERROR_TYPE.GENERIC_ERROR, constants.EVENT_TYPE.CALL_BARGED_IN)) {
                dispatchEvent(constants.EVENT_TYPE.CALL_BARGED_IN, payload, registerLog);
            }
            break;
        }

        case constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED: {
            if (validatePayload(payload, SuperviseCallResult,  constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED)) {
                isSupervisorConnected = true;
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload.call, registerLog);
            }
            break;
        }

        case constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED: {
            if (validatePayload(payload, SuperviseCallResult,  constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED)) {
                isSupervisorConnected = true;
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload.call, registerLog);
            }
            break;
        }

        case constants.EVENT_TYPE.SUPERVISOR_HANGUP: {
            if (validatePayload(payload, SupervisorHangupResult,  constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, constants.EVENT_TYPE.SUPERVISOR_HANGUP)) {
                isSupervisorConnected = false;
                dispatchEvent(constants.EVENT_TYPE.SUPERVISOR_HANGUP, payload.calls, registerLog);
            }
            break;
        }

        case constants.EVENT_TYPE.SET_AGENT_STATUS: {
            if (validatePayload(payload, AgentStatusInfo,  constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, constants.EVENT_TYPE.SET_AGENT_STATUS)) {
                const statusId = payload.statusId;
                dispatchEvent(constants.EVENT_TYPE.SET_AGENT_STATUS, { statusId }, registerLog);
            }
            break;
        }

        /**
         * NOTE: SALESFORCE INTERNAL USE ONLY
         */
        case constants.EVENT_TYPE.GET_AGENT_STATUS: {
            if (validatePayload(payload, AgentVendorStatusInfo, constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, constants.EVENT_TYPE.GET_AGENT_STATUS)) {
                dispatchEvent(constants.EVENT_TYPE.GET_AGENT_STATUS, payload);
            }
            break;
        }

        /**
         * NOTE: SALESFORCE INTERNAL USE ONLY
         */
        case constants.EVENT_TYPE.STATE_CHANGE: {
            if(validatePayload(payload, StateChangeResult, constants.ERROR_TYPE.INVALID_STATE_CHANGE_RESULT, constants.EVENT_TYPE.STATE_CHANGE)) {
                dispatchEvent(constants.EVENT_TYPE.STATE_CHANGE, payload);
            }
            break;
        }
    }
}
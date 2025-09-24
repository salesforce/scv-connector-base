/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */
import constants from './constants.js';
import { CONNECTOR_CONFIG_EXPOSED_FIELDS, CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH, CONNECTOR_CONFIG_EXCEPTION_FIELDS } from './constants.js';
import {
    Validator,
    GenericResult,
    InitResult,
    CallResult,
    HangupResult,
    HoldToggleResult,
    ContactsResult,
    PhoneContactsResult,
    MuteToggleResult,
    ParticipantResult,
    RecordingToggleResult,
    AgentConfigResult,
    ActiveCallsResult,
    SignedRecordingUrlResult,
    LogoutResult,
    VendorConnector,
    Contact,
    AudioStats,
    SuperviseCallResult,
    SupervisorHangupResult,
    AgentStatusInfo,
    SupervisedCallInfo,
    SharedCapabilitiesResult,
    VoiceCapabilitiesResult,
    AgentVendorStatusInfo,
    StateChangeResult,
    CustomError,
    DialOptions,
    ShowStorageAccessResult,
    AudioDevicesResult,
    ACWInfo,
    SetAgentConfigResult,
    SetAgentStateResult
} from './types';
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
                        property !== 'callAttributes' &&
                        property !== '/reqHvcc/reqTelephonyIntegrationCertificate') {
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
 * @param {String} eventType event type, i.e. constants.VOICE_EVENT_TYPE.CALL_STARTED
 * @param {Object} payload event payload
 * @param {Boolean} isError error scenario
 */
function dispatchEventLog(eventType, payload, isError) {
    const sanitizedPayload = sanitizePayload(payload);
    const logLevel = isError ? constants.LOG_LEVEL.ERROR : constants.LOG_LEVEL.INFO;
    log({eventType, payload}, logLevel, constants.LOG_SOURCE.SYSTEM);
    channelPort.postMessage({
        type: constants.SHARED_MESSAGE_TYPE.LOG,
        payload: { eventType, payload: sanitizedPayload, isError }
    });
}
/** 
 * Dispatch a telephony event to Salesforce
 * @param {String} eventType event type, i.e. constants.VOICE_EVENT_TYPE.CALL_STARTED
 * @param {Object} payload event payload
 * @param {Boolean} registerLog optional argument to not register the event
 */
function dispatchEvent(eventType, payload, registerLog = true) {
    channelPort.postMessage({
        type: constants.SHARED_MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
        payload: { telephonyEventType: eventType, telephonyEventPayload: payload }
    });
    if (registerLog) {
        dispatchEventLog(eventType, payload, false);
    }
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {constants.VOICE_ERROR_TYPE} errorType Error Type, ex: constants.VOICE_ERROR_TYPE.MICROPHONE_NOT_SHARED
 * @param {object} error Error object representing the error
 * @param {string} eventType The event that caused this error, ex: constants.VOICE_MESSAGE_TYPE.ACCEPT_CALL
 */
function dispatchError(errorType, error, eventType) {
    // eslint-disable-next-line no-console
    console.error(`SCV dispatched error ${errorType} for eventType ${eventType}`, error);
    dispatchEvent(constants.SHARED_EVENT_TYPE.ERROR, { message: errorType }, false);
    dispatchEventLog(eventType, { errorType, error }, true);
}

/**
 * Dispatch a telephony integration error to Salesforce
 * @param {CustomError} error Error object representing the custom error
 * @param {string} eventType The event that caused this error, ex: constants.SHARED_MESSAGE_TYPE.ACCEPT_CALL
 */
function dispatchCustomError(error, eventType) {
    // eslint-disable-next-line no-console
    const payload = {
        customError: {
            labelName: error.labelName,
            namespace: error.namespace,
            message: error.message
        }
    };
    console.error(`SCV dispatched custom error for eventType ${eventType}`, payload);
    dispatchEvent(constants.SHARED_EVENT_TYPE.ERROR, payload, false);
    dispatchEventLog(eventType, { errorType: constants.SHARED_ERROR_TYPE.CUSTOM_ERROR, error }, true);
}

function dispatchInfo(eventType, payload) {
    // eslint-disable-next-line no-console
    console.info(`SCV info message dispatched for eventType ${eventType} with payload ${JSON.stringify(payload)}`);
    dispatchEvent(constants.SHARED_EVENT_TYPE.INFO, { message: eventType }, false);
    dispatchEventLog(eventType, payload, false);
}

/** 
 * Notify Salesforce that the connector is ready
 */
async function setConnectorReady() {
    try {
        const telephonyConnector = await vendorConnector.getTelephonyConnector();
        const agentConfigResult = await telephonyConnector.getAgentConfig();
        const sharedCapabilitiesResult = await vendorConnector.getSharedCapabilities();
        const voiceCapabilitiesResult = await telephonyConnector.getVoiceCapabilities();
        Validator.validateClassObject(agentConfigResult, AgentConfigResult);
        Validator.validateClassObject(voiceCapabilitiesResult, VoiceCapabilitiesResult);
        if (voiceCapabilitiesResult.supportsMos) {
            enableMos();
        }
        const activeCallsResult = await telephonyConnector.getActiveCalls();
        Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
        const activeCalls = activeCallsResult.activeCalls;
        const type = constants.SHARED_MESSAGE_TYPE.CONNECTOR_READY;
        const payload = {
            agentConfig: {

                [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
                [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone
            },
            capabilities: {
                [constants.SHARED_CAPABILITIES_TYPE.DEBUG_ENABLED] : sharedCapabilitiesResult.debugEnabled,
                [constants.SHARED_CAPABILITIES_TYPE.CONTACT_SEARCH] : sharedCapabilitiesResult.hasContactSearch,
                [constants.SHARED_CAPABILITIES_TYPE.VENDOR_PROVIDED_AVAILABILITY] : sharedCapabilitiesResult.hasAgentAvailability,
                [constants.SHARED_CAPABILITIES_TYPE.VENDOR_PROVIDED_QUEUE_WAIT_TIME] : sharedCapabilitiesResult.hasQueueWaitTime,
                [constants.SHARED_CAPABILITIES_TYPE.TRANSFER_TO_OMNI_FLOW] : sharedCapabilitiesResult.hasTransferToOmniFlow,
                [constants.SHARED_CAPABILITIES_TYPE.PENDING_STATUS_CHANGE] : sharedCapabilitiesResult.hasPendingStatusChange,
                [constants.SHARED_CAPABILITIES_TYPE.SFDC_PENDING_STATE]: sharedCapabilitiesResult.hasSFDCPendingState,
                [constants.SHARED_CAPABILITIES_TYPE.AUTO_ACCEPT_ENABLED]: sharedCapabilitiesResult.hasAutoAcceptEnabled,
                [constants.VOICE_CAPABILITIES_TYPE.MUTE] : voiceCapabilitiesResult.hasMute,
                [constants.VOICE_CAPABILITIES_TYPE.RECORD] : voiceCapabilitiesResult.hasRecord,
                [constants.VOICE_CAPABILITIES_TYPE.MERGE] : voiceCapabilitiesResult.hasMerge,
                [constants.VOICE_CAPABILITIES_TYPE.SWAP] : voiceCapabilitiesResult.hasSwap,
                [constants.VOICE_CAPABILITIES_TYPE.BLIND_TRANSFER] : voiceCapabilitiesResult.hasBlindTransfer,
                [constants.VOICE_CAPABILITIES_TYPE.SIGNED_RECORDING_URL] : voiceCapabilitiesResult.hasSignedRecordingUrl,
                [constants.VOICE_CAPABILITIES_TYPE.SUPERVISOR_LISTEN_IN] : voiceCapabilitiesResult.hasSupervisorListenIn,
                [constants.VOICE_CAPABILITIES_TYPE.SUPERVISOR_BARGE_IN] : voiceCapabilitiesResult.hasSupervisorBargeIn,
                [constants.VOICE_CAPABILITIES_TYPE.MOS] : voiceCapabilitiesResult.supportsMos,
                [constants.VOICE_CAPABILITIES_TYPE.PHONEBOOK] : voiceCapabilitiesResult.hasPhoneBook,
                [constants.VOICE_CAPABILITIES_TYPE.HAS_GET_EXTERNAL_SPEAKER] : voiceCapabilitiesResult.hasGetExternalSpeakerDeviceSetting,
                [constants.VOICE_CAPABILITIES_TYPE.HAS_SET_EXTERNAL_SPEAKER] : voiceCapabilitiesResult.hasSetExternalSpeakerDeviceSetting,
                [constants.VOICE_CAPABILITIES_TYPE.HAS_GET_EXTERNAL_MICROPHONE] : voiceCapabilitiesResult.hasGetExternalMicrophoneDeviceSetting,
                [constants.VOICE_CAPABILITIES_TYPE.HAS_SET_EXTERNAL_MICROPHONE] : voiceCapabilitiesResult.hasSetExternalMicrophoneDeviceSetting,
                [constants.VOICE_CAPABILITIES_TYPE.CAN_CONSULT]: voiceCapabilitiesResult.canConsult,
                [constants.VOICE_CAPABILITIES_TYPE.DIAL_PAD]: voiceCapabilitiesResult.isDialPadDisabled,
                [constants.VOICE_CAPABILITIES_TYPE.HAS_HID_SUPPORT]: voiceCapabilitiesResult.isHidSupported,
                [constants.VOICE_CAPABILITIES_TYPE.PHONEBOOK_DISABLE]: voiceCapabilitiesResult.isPhoneBookDisabled
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
            type: constants.SHARED_MESSAGE_TYPE.CONNECTOR_READY,
            payload: {}
        });
        dispatchEventLog(constants.SHARED_MESSAGE_TYPE.CONNECTOR_READY, {}, false);
    }
}

//TODO: 230 we should convert call object to PhoneCall object
async function channelMessageHandler(message) { 
    const eventType = message.data.type;
    if (eventType !== constants.SHARED_MESSAGE_TYPE.LOG) {
        dispatchEventLog(eventType, message.data, false);
    }
    switch (eventType) {
        case constants.VOICE_MESSAGE_TYPE.ACCEPT_CALL:
            try {
                if (message.data.call && message.data.call.callType &&
                    (message.data.call.callType.toLowerCase() === constants.CALL_TYPE.OUTBOUND.toLowerCase() ||
                    message.data.call.callType.toLowerCase() === constants.CALL_TYPE.DIALED_CALLBACK.toLowerCase())) {
                    return;
                }
                initAudioStats();
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                if (isSupervisorConnected) {
                    const hangupPayload = await telephonyConnector.supervisorDisconnect();
                    Validator.validateClassObject(hangupPayload, SupervisorHangupResult);
                    isSupervisorConnected = false;
                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload.calls);
                }
                let payload = await telephonyConnector.acceptCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(call.callType.toLowerCase() === constants.CALL_TYPE.CALLBACK.toLowerCase() ?
                    constants.VOICE_EVENT_TYPE.CALL_STARTED : constants.VOICE_EVENT_TYPE.CALL_CONNECTED, call);
            } catch (e) {
                isSupervisorConnected = false;
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.ACCEPT_CALL);
                } else {
                    dispatchInfo(constants.INFO_TYPE.CAN_NOT_ACCEPT_THE_CALL, {messagetype: constants.VOICE_MESSAGE_TYPE.ACCEPT_CALL, additionalInfo: e});
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.DECLINE_CALL:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload =  await telephonyConnector.declineCall(message.data.call);
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                dispatchEvent(constants.VOICE_EVENT_TYPE.HANGUP, call);
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.DECLINE_CALL);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL, e, constants.VOICE_MESSAGE_TYPE.DECLINE_CALL);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.END_CALL:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.endCall(message.data.call, message.data.agentStatus);
                Validator.validateClassObject(payload, HangupResult);
                const activeCallsResult = await telephonyConnector.getActiveCalls();
                Validator.validateClassObject(activeCallsResult, ActiveCallsResult);
                const activeCalls = activeCallsResult.activeCalls;
                const { calls } = payload;
                // after end calls from vendor side, if no more active calls, fire HANGUP, otherwise, fire PARTICIPANT_REMOVED
                if (activeCalls.length === 0) {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.HANGUP, calls);
                } else {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, calls.length > 0 && calls[0]);
                }
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.END_CALL);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL, e, constants.VOICE_MESSAGE_TYPE.END_CALL);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.MUTE:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.mute(message.data.call);
                publishEvent({eventType: constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.MUTE);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_MUTE_CALL, e, constants.VOICE_MESSAGE_TYPE.MUTE);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.UNMUTE:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.unmute(message.data.call);
                publishEvent({eventType: constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload});
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.UNMUTE);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_UNMUTE_CALL, e, constants.VOICE_MESSAGE_TYPE.UNMUTE);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.HOLD:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.hold(message.data.call);
                publishEvent({eventType: constants.VOICE_EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.HOLD);
                } else {
                    switch(getErrorType(e)) {
                        case constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT:
                            dispatchError(constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.HOLD);
                            break;
                        default:
                            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_HOLD_CALL, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.HOLD);
                            break;
                    }
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.RESUME:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.resume(message.data.call);
                publishEvent({eventType: constants.VOICE_EVENT_TYPE.HOLD_TOGGLE, payload});
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.RESUME);
                } else {
                    switch(getErrorType(e)) {
                        case constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT:
                            dispatchError(constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.RESUME);
                            break;
                        default:
                            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_RESUME_CALL, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.RESUME);
                            break;
                    }
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS:
            try {
                const statusInfo = message.data.statusInfo || {};
                const enqueueNextState = message.data.enqueueNextState || false;
                const payload = await vendorConnector.setAgentStatus(message.data.agentStatus, statusInfo, enqueueNextState);
                Validator.validateClassObject(payload, GenericResult, SetAgentStateResult);
                const { success, isStatusSyncNeeded } = payload;
                dispatchEvent(constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS_RESULT, 
                    isStatusSyncNeeded !== undefined ? { success, isStatusSyncNeeded } : { success });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS);
                } else {
                    if (message.data.statusInfo) {
                        dispatchEvent(constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS_RESULT, { success: false });
                    }
                    switch(getErrorType(e)) {
                        case constants.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS:
                            dispatchError(constants.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS, getErrorMessage(e), constants.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS);
                            break;
                        default:
                            dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, getErrorMessage(e), constants.SHARED_MESSAGE_TYPE.SET_AGENT_STATUS);
                            break;
                    }
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS:
            try {
                const payload = await vendorConnector.getAgentStatus();
                Validator.validateClassObject(payload, AgentVendorStatusInfo);
                dispatchEvent(constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS_RESULT, payload);
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS);
                } else {
                    dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, getErrorMessage(e), constants.SHARED_MESSAGE_TYPE.GET_AGENT_STATUS);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.DIAL:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const isCallback = message.data.params && message.data.params.indexOf(constants.DIAL_OPTIONS.CALLBACK) >= 0;
                const isConsultCall = message.data.params && message.data.params.indexOf(constants.DIAL_OPTIONS.CONSULT) >= 0;
                const payload = await telephonyConnector.dial(new Contact(message.data.contact),
                                                              new DialOptions({ isCallback, isConsultCall }));
                Validator.validateClassObject(payload, CallResult);
                const { call } = payload;
                // If connectors wants this to be created as callback 
                if (constants.CALL_TYPE.DIALED_CALLBACK.toLowerCase() === call.callType.toLowerCase() && isCallback) {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED, call);
                } else { // continue treating this as outbound
                    dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_STARTED, call);
                }
            } catch (e) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_FAILED);
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.DIAL);
                } else {
                    switch(getErrorType(e)) {
                        case constants.VOICE_ERROR_TYPE.INVALID_DESTINATION:
                            dispatchError(constants.VOICE_ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.DIAL);
                            break;
                        case constants.SHARED_ERROR_TYPE.GENERIC_ERROR:
                            dispatchError(constants.SHARED_ERROR_TYPE.GENERIC_ERROR, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.DIAL);
                            break;
                        default:
                            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.DIAL);
                            break;
                    }
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.SEND_DIGITS:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                await telephonyConnector.sendDigits(message.data.digits);
            } catch (e) {
                dispatchEventLog(constants.VOICE_MESSAGE_TYPE.SEND_DIGITS, message.data.digits, true);
            }
            break;
        case constants.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS:
            try  {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.getPhoneContacts(message.data.filter);
                Validator.validateClassObject(payload, PhoneContactsResult);
                const contacts = payload.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        type: contact.type,
                        name: contact.name,
                        listType: contact.listType,
                        phoneNumber: contact.phoneNumber,
                        prefix: contact.prefix,
                        extension: contact.extension,
                        endpointARN: contact.endpointARN,
                        queue: contact.queue,
                        availability: contact.availability,
                        queueWaitTime: contact.queueWaitTime,
                        recordId: contact.recordId,
                        description: contact.description
                    };
                });
                dispatchEvent(constants.VOICE_EVENT_TYPE.PHONE_CONTACTS, {
                    contacts, contactTypes: payload.contactTypes
                });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS, e, constants.VOICE_MESSAGE_TYPE.GET_PHONE_CONTACTS);
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.GET_CONTACTS:
            try  {
                const payload = await vendorConnector.getContacts(message.data.filter, message.data.workItemId);
                Validator.validateClassObject(payload, ContactsResult);
                const contacts = payload.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        type: contact.type,
                        name: contact.name,
                        listType: contact.listType,
                        phoneNumber: contact.phoneNumber,
                        prefix: contact.prefix,
                        extension: contact.extension,
                        endpointARN: contact.endpointARN,
                        queue: contact.queue,
                        availability: contact.availability,
                        queueWaitTime: contact.queueWaitTime,
                        recordId: contact.recordId,
                        description: contact.description
                    };
                });
                dispatchEvent(constants.SHARED_EVENT_TYPE.GET_CONTACTS_RESULT, {
                    contacts, contactTypes: payload.contactTypes
                });
            } catch (e) {
                dispatchCustomError(e, constants.SHARED_MESSAGE_TYPE.GET_CONTACTS);
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS:
            try {
                // TODO: Create PhoneCall from call1.callId & call2.callId
                // TODO: rename to call1 and call2
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.swap(message.data.callToHold, message.data.callToResume);
                publishEvent({ eventType: constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED, payload });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, e, constants.VOICE_MESSAGE_TYPE.SWAP_PARTICIPANTS);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.CONFERENCE:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.conference(message.data.calls);
                publishEvent({ eventType: constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED, payload });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.CONFERENCE);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE, e, constants.VOICE_MESSAGE_TYPE.CONFERENCE);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.addParticipant(new Contact(message.data.contact), message.data.call, message.data.isBlindTransfer);
                publishEvent({ eventType: constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED, payload });
                if (message.data.isBlindTransfer) {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.HANGUP, message.data.call);
                }
            } catch (e) {
                // TODO: Can we avoid passing in reason field
                dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, {
                    reason: constants.SHARED_EVENT_TYPE.ERROR.toLowerCase()
                });
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT);
                } else {
                    switch(getErrorType(e)) {
                        case constants.VOICE_ERROR_TYPE.INVALID_DESTINATION:
                            dispatchError(constants.VOICE_ERROR_TYPE.INVALID_DESTINATION, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT);
                            break;
                        default:
                            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.ADD_PARTICIPANT);
                            break;
                    }
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.PAUSE_RECORDING:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.pauseRecording(message.data.call);
                publishEvent({ eventType: constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.PAUSE_RECORDING);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_PAUSE_RECORDING, e, constants.VOICE_MESSAGE_TYPE.PAUSE_RECORDING);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.RESUME_RECORDING:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const payload = await telephonyConnector.resumeRecording(message.data.call);
                publishEvent({ eventType: constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE, payload });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.RESUME_RECORDING);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_RESUME_RECORDING, e, constants.VOICE_MESSAGE_TYPE.RESUME_RECORDING);
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.LOGOUT:
            try {
                const payload = await vendorConnector.logout();
                Validator.validateClassObject(payload, LogoutResult);
                const { success, loginFrameHeight } = payload;
                dispatchEvent(constants.SHARED_EVENT_TYPE.LOGOUT_RESULT, { success, loginFrameHeight });
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.SHARED_MESSAGE_TYPE.LOGOUT);
                } else {
                    dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT, e, constants.SHARED_MESSAGE_TYPE.LOGOUT);
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.MESSAGE:
            // TODO: Define a return type for handling message
            vendorConnector.handleMessage(message.data.message);
        break;
        case constants.VOICE_MESSAGE_TYPE.WRAP_UP_CALL: {
            const telephonyConnector = await vendorConnector.getTelephonyConnector();
            telephonyConnector.wrapUpCall(message.data.call);
        }
        break;
        case constants.VOICE_MESSAGE_TYPE.AGENT_AVAILABLE: {
            if (message.data && message.data.isAvailable) {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const activeCallsResult = await telephonyConnector.getActiveCalls();
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
                                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, call);
                                    if (hasSupervisorBargedIn) {
                                        dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN, call);
                                    }
                                    break;
                                }
                                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_CONNECTED, call);
                                break;
                            case constants.CALL_STATE.RINGING:
                                if (isSupervisorCall) {
                                    isSupervisorConnected = true;
                                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED, call);
                                    break;
                                }
                                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_STARTED, call);
                                break;
                            case constants.CALL_STATE.TRANSFERRING:
                                dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED, {
                                    phoneNumber: call.contact.phoneNumber,
                                    contact:call.contact,
                                    callInfo: call.callInfo,
                                    callAttributes: call.callAttributes,
                                    initialCallHasEnded: call.callAttributes.initialCallHasEnded,
                                    callId: call.callId,
                                    connectionId: call.connectionId
                                });
                                break;
                            case constants.CALL_STATE.TRANSFERRED:
                                dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED, {
                                    phoneNumber: call.contact.phoneNumber,
                                    contact:call.contact,
                                    callInfo: call.callInfo,
                                    callAttributes: call.callAttributes,
                                    initialCallHasEnded: call.callAttributes.initialCallHasEnded,
                                    callId: call.callId,
                                    connectionId: call.connectionId
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
        case constants.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.setAgentConfig(message.data.config);
                Validator.validateClassObjects(result, GenericResult, SetAgentConfigResult);
                if (result instanceof SetAgentConfigResult) {
                    result.setIsSystemEvent(!!message.data.config.isSystemEvent);
                }
                dispatchEvent(constants.VOICE_EVENT_TYPE.AGENT_CONFIG_UPDATED, result);
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG);
                } else {
                    dispatchError(getErrorType(e) === constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER ? constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER : constants.VOICE_ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG , getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.SET_AGENT_CONFIG);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.GET_AUDIO_DEVICES:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.getAudioDevices();
                Validator.validateClassObject(result, AudioDevicesResult);
                dispatchEvent(constants.VOICE_EVENT_TYPE.GET_AUDIO_DEVICES, result);
            } catch (e) {
                dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_GET_AUDIO_DEVICES, getErrorMessage(e), constants.VOICE_MESSAGE_TYPE.GET_AUDIO_DEVICES);
            }
            break;
        case constants.VOICE_MESSAGE_TYPE.GET_SIGNED_RECORDING_URL:
            try {
                const { recordingUrl, vendorCallKey, callId } = message.data;
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.getSignedRecordingUrl(recordingUrl, vendorCallKey, callId);
                Validator.validateClassObject(result, SignedRecordingUrlResult);
                dispatchEvent(constants.VOICE_EVENT_TYPE.SIGNED_RECORDING_URL, result);
            } catch (e) {
                // In case of an error, we want to show an error message in the recording player
                const signedRecordingUrlResult = new SignedRecordingUrlResult({
                    success: false
                });
                dispatchEvent(constants.VOICE_EVENT_TYPE.SIGNED_RECORDING_URL, signedRecordingUrlResult, false);
                dispatchEventLog(constants.VOICE_MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, signedRecordingUrlResult, true);
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS:
            vendorConnector.downloadLogs(getLogs());
        break;
        case constants.SHARED_MESSAGE_TYPE.LOG: {
                const { logLevel, logMessage, payload } = message.data;
                vendorConnector.logMessageToVendor(logLevel, logMessage, payload);
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.SUPERVISE_CALL:
            try {
                isSupervisorConnected = true;
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.superviseCall(message.data.call);
                Validator.validateClassObject(result, SuperviseCallResult);
                const agentConfigResult = await telephonyConnector.getAgentConfig();
                if(agentConfigResult.selectedPhone.type === constants.PHONE_TYPE.SOFT_PHONE) {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, result.call);
                } else {
                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED, result.call);
                }
            } catch (e){
                isSupervisorConnected = false;
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.SUPERVISE_CALL);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, e, constants.VOICE_MESSAGE_TYPE.SUPERVISE_CALL);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.supervisorDisconnect(message.data.call);
                Validator.validateClassObject(result, SupervisorHangupResult);
                isSupervisorConnected = false;
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP, result.calls);
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, e, constants.VOICE_MESSAGE_TYPE.SUPERVISOR_DISCONNECT);
                }
            }
        break;
        case constants.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN:
            try {
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const result = await telephonyConnector.supervisorBargeIn(message.data.call);
                Validator.validateClassObject(result, SuperviseCallResult);
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN, result.call );
            } catch (e) {
                if (e instanceof CustomError) {
                    dispatchCustomError(e, constants.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN);
                } else {
                    dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, e, constants.VOICE_MESSAGE_TYPE.SUPERVISOR_BARGE_IN);
                }
            }
        break;
        case constants.SHARED_MESSAGE_TYPE.AGENT_WORK_EVENT: {
            let { workItemId, workId, workEvent } = message.data.agentWork;
            vendorConnector.onAgentWorkEvent({
                workItemId,
                workId,
                workEvent
            });
        }
        break;
        default:
            break;
    }
}


async function windowMessageHandler(message) {
    switch (message.data.type) {
        case constants.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR: {
            const sfDomain = /^https:\/\/[\w-.]+(lightning\.[\w]+\.soma\.force\.com|\.lightning\.force\.com|\.lightning\.pc-rnd\.force\.com|\.stm\.force\.com|\.vf\.force\.com|\.salesforce\.com|\.my\.salesforce-sites\.com|\.lightning\.localhost\.[\w]+\.force.com|\.lightning\.force-com\.[\w.-]+\.crm\.dev|\.[\w-]+\.(salesforce|crmforce)\.mil|\.lightning\.(salesforce|crmforce)\.mil|\.sandbox\.lightning\.(salesforce|crmforce)\.mil)$/;
            const originUrl = new URL(message.origin);
            const url = originUrl.protocol + '//' + originUrl.hostname;

            if (sfDomain.test(url)) {
                channelPort = message.ports[0];
                channelPort.onmessage = channelMessageHandler;
                dispatchEventLog(constants.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR, exposedConnectorConfig(message.data.connectorConfig), false);
                try {
                    const payload = await vendorConnector.init(message.data.connectorConfig);
                    Validator.validateClassObject(payload, InitResult);
                    if (payload.showStorageAccess) {
                        dispatchEvent(constants.SHARED_EVENT_TYPE.SHOW_STORAGE_ACCESS, {
                            success: true
                        });
                    } else if (payload.showLogin) {
                        dispatchEvent(constants.SHARED_EVENT_TYPE.SHOW_LOGIN, {
                            loginFrameHeight: payload.loginFrameHeight
                        });
                    } else if (payload.isSilentLogin) {
                        dispatchEvent(constants.SHARED_EVENT_TYPE.SHOW_LOGIN, {
                            isSilentLogin: payload.isSilentLogin
                        });
                    } else {
                        setConnectorReady();
                    }
                } catch (e) {
                    if (e instanceof CustomError) {
                        dispatchCustomError(e, constants.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR);
                    } else {
                        switch(getErrorType(e)) {
                            case constants.VOICE_ERROR_TYPE.INVALID_PARAMS:
                                dispatchError(constants.VOICE_ERROR_TYPE.INVALID_PARAMS, getErrorMessage(e), constants.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR);
                                break;
                            default:
                                dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN, getErrorMessage(e), constants.SHARED_MESSAGE_TYPE.SETUP_CONNECTOR);
                                break;
                        }
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
            if (key.startsWith(prop) && !CONNECTOR_CONFIG_EXCEPTION_FIELDS.includes(key)) {
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
    if (error instanceof CustomError) {
        dispatchCustomError(error, eventType);
        return;
    }

    switch(eventType) {
        case constants.SHARED_EVENT_TYPE.LOGIN_RESULT:
            dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN, error, constants.SHARED_EVENT_TYPE.LOGIN_RESULT);
            break;
        case constants.SHARED_EVENT_TYPE.LOGOUT_RESULT:
            dispatchError(constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT, error, constants.SHARED_EVENT_TYPE.LOGOUT_RESULT);
            break;
        case constants.VOICE_EVENT_TYPE.CALL_STARTED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.VOICE_EVENT_TYPE.CALL_STARTED);
            break;
        case constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED);
            break;
        case constants.VOICE_EVENT_TYPE.CALL_CONNECTED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, error, constants.VOICE_EVENT_TYPE.CALL_CONNECTED);
            break;
        case constants.VOICE_EVENT_TYPE.HANGUP: 
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL, error, constants.VOICE_EVENT_TYPE.HANGUP);
            break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED:
            dispatchError(getErrorType(error) === constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT ? constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT : constants.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, error, constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED);
            break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, error, constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED);
            break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, error, constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED); 
            break;
        case constants.VOICE_EVENT_TYPE.MUTE_TOGGLE:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, error, constants.VOICE_EVENT_TYPE.MUTE_TOGGLE);
            break;
        case constants.VOICE_EVENT_TYPE.HOLD_TOGGLE: 
            dispatchError(getErrorType(error) === constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT ? constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT : constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, error, constants.VOICE_EVENT_TYPE.HOLD_TOGGLE);
            break;
        case constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, error, constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE);
            break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED: 
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, error, constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED);
            break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE, error, constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED);
            break;
        case constants.VOICE_EVENT_TYPE.AGENT_ERROR:
            dispatchError(constants.VOICE_ERROR_TYPE.AGENT_ERROR, error, constants.VOICE_EVENT_TYPE.AGENT_ERROR);
            break;
        case constants.VOICE_EVENT_TYPE.SOFTPHONE_ERROR:
            switch(getErrorType(error)) {
                case constants.VOICE_ERROR_TYPE.UNSUPPORTED_BROWSER:
                case constants.VOICE_ERROR_TYPE.MICROPHONE_NOT_SHARED:
                case constants.VOICE_ERROR_TYPE.USER_BUSY_ERROR:
                case constants.VOICE_ERROR_TYPE.WEBRTC_ERROR:
                    dispatchError(getErrorType(error), error, constants.VOICE_EVENT_TYPE.SOFTPHONE_ERROR);
                    break;
                default:
                    dispatchError(constants.SHARED_ERROR_TYPE.GENERIC_ERROR, error, constants.VOICE_EVENT_TYPE.SOFTPHONE_ERROR);
            }
            break;
        case constants.VOICE_EVENT_TYPE.CALL_UPDATED:
            dispatchError(constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_CALL, error, constants.VOICE_EVENT_TYPE.CALL_UPDATED);
            break;
        default:
            console.error('Unhandled error scenario with arguments ', arguments);
    }
}

/**
 * Publish an event to Sfdc. The event payload will be verified to be the correct type before being published. 
 * @param {object} param
 * @param {("AFTER_CALL_WORK_STARTED"|"AFTER_CONVERSATION_WORK_ENDED"|"AFTER_CONVERSATION_WORK_STARTED"|"AGENT_CONFIG_UPDATED"|"AGENT_ERROR"|"AUDIO_STATS"|"CALL_BARGED_IN"|"CALL_CONNECTED"|"CALL_FAILED"|"CALL_STARTED"|"CALL_UPDATED"|"ERROR"|"GET_AGENT_STATUS_RESULT"|"GET_AGENT_STATUS"|"GET_AUDIO_DEVICES"|"GET_CONTACTS_RESULT"|"HANGUP"|"HOLD_TOGGLE"|"INFO"|"LOGIN_RESULT"|"LOGIN_STARTED"|"LOGOUT_RESULT"|"MESSAGE"|"MUTE_TOGGLE"|"PARTICIPANT_ADDED"|"PARTICIPANT_CONNECTED"|"PARTICIPANT_REMOVED"|"PARTICIPANT_REMOVED"|"PARTICIPANTS_CONFERENCED"|"PARTICIPANTS_SWAPPED"|"PHONE_CONTACTS"|"QUEUED_CALL_STARTED"|"RECORDING_TOGGLE"|"REMOTE_CONTROLLER"|"SET_AGENT_STATUS_RESULT"|"SET_AGENT_STATUS"|"SHOW_LOGIN"|"SHOW_STORAGE_ACCESS"|"SHOW_TRANSFER_VIEW"|"SIGNED_RECORDING_URL"|"SOFTPHONE_ERROR"|"STATE_CHANGE"|"STORAGE_ACCESS_RESULT"|"SUPERVISOR_BARGED_IN"|"SUPERVISOR_CALL_CONNECTED"|"SUPERVISOR_CALL_STARTED"|"SUPERVISOR_HANGUP"|"UPDATE_AUDIO_STATS_COMPLETED"|"UPDATE_AUDIO_STATS"|"WARNING"|"WRAP_UP_ENDED")} param.eventType Event type to publish
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
 * AUDIO_STATS - AudioStats
 */
export async function publishEvent({ eventType, payload, registerLog = true }) {
    switch(eventType) {
        case constants.SHARED_EVENT_TYPE.LOGIN_RESULT: {
            if (validatePayload(payload, GenericResult, constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_IN, constants.SHARED_EVENT_TYPE.LOGIN_RESULT)) {
                dispatchEvent(constants.SHARED_EVENT_TYPE.LOGIN_RESULT, payload, registerLog);
                if (payload.success) {
                    setConnectorReady();
                }
            }
            break;
        }
        case constants.SHARED_EVENT_TYPE.LOGOUT_RESULT:
            if (validatePayload(payload, LogoutResult, constants.SHARED_ERROR_TYPE.CAN_NOT_LOG_OUT, constants.SHARED_EVENT_TYPE.LOGOUT_RESULT)) {
                dispatchEvent(constants.SHARED_EVENT_TYPE.LOGOUT_RESULT, {
                    success: payload.success,
                    loginFrameHeight: payload.loginFrameHeight
                }, registerLog);
            }
            break;
        case constants.VOICE_EVENT_TYPE.CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.VOICE_EVENT_TYPE.CALL_STARTED)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_STARTED, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        case constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED:
            if (validatePayload(payload, CallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        case constants.VOICE_EVENT_TYPE.CALL_CONNECTED:
            if (validatePayload(payload, CallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_START_THE_CALL, constants.VOICE_EVENT_TYPE.CALL_CONNECTED)) {
                initAudioStats();
                if (isSupervisorConnected) {
                    const telephonyConnector = await vendorConnector.getTelephonyConnector();
                    const hangupPayload = await telephonyConnector.supervisorDisconnect();
                    Validator.validateClassObject(hangupPayload, SupervisorHangupResult);
                    isSupervisorConnected = false;
                    dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP, hangupPayload, true /* ignoring registerLog for critical event*/);
                    dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_CONNECTED, payload.call, true /* ignoring registerLog for critical event*/);
                    break;
                } 
                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_CONNECTED, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        case constants.VOICE_EVENT_TYPE.HANGUP: {
            if (validatePayload(payload, HangupResult, constants.VOICE_ERROR_TYPE.CAN_NOT_END_THE_CALL, constants.VOICE_EVENT_TYPE.HANGUP)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.HANGUP, payload.calls, true /* ignoring registerLog for critical event*/);
            }
            break;
        }
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED: {
            if (validatePayload(payload, ParticipantResult, constants.VOICE_ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT, constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED)) {
                const { contact, initialCallHasEnded, callInfo, callAttributes, phoneNumber, callId, connectionId } = payload;
                dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED, {
                    contact,
                    initialCallHasEnded,
                    callInfo,
                    callAttributes,
                    phoneNumber,
                    callId,
                    connectionId
                }, true /* ignoring registerLog for critical event*/);
            }
            break;
        }
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED: {
            if (validatePayload(payload, ParticipantResult, constants.VOICE_ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT, constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED)) {
                const { initialCallHasEnded, callInfo, callAttributes, phoneNumber, callId, contact, connectionId } = payload;
                dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED, {
                    initialCallHasEnded,
                    callInfo,
                    callAttributes,
                    phoneNumber,
                    callId,
                    contact,
                    connectionId
                }, true /* ignoring registerLog for critical event*/);
            }
            break;
        }
        case constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED: {
            // TODO: The logic here needs to be modified. Ideally firing CallResult with 
            // correct participantType should do the trick but we are firing PARTICIPANT_CONNECTED because of a bug W-8601645
            // Once the bug is fixed, this code needs to be updated
            if (validatePayload(payload, CallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT, constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED)) { 
                const { call } = payload;
                const telephonyConnector = await vendorConnector.getTelephonyConnector();
                const activeCallsResult = await telephonyConnector.getActiveCalls();
                if (validatePayload(activeCallsResult, ActiveCallsResult)) {
                    // when no more active calls, fire HANGUP
                    const activeCalls = activeCallsResult.activeCalls;
                    if (activeCalls.length === 0) {
                        dispatchEvent(constants.VOICE_EVENT_TYPE.HANGUP, call, true /* ignoring registerLog for critical event*/);
                    } else if (call &&
                        call.callAttributes &&
                        call.callType !== constants.CALL_TYPE.CONSULT &&
                        call.callAttributes.participantType === constants.PARTICIPANT_TYPE.INITIAL_CALLER) {
                        // when there is still transfer call, based on the state of the transfer call, fire PARTICIPANT_ADDED or PARTICIPANT_CONNECTED
                        const transferCall = Object.values(activeCalls).filter((obj) => obj['callType'] === constants.CALL_TYPE.ADD_PARTICIPANT).pop();
                        const event = transferCall.state === constants.CALL_STATE.TRANSFERRING ? constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED : constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED;
                        dispatchEvent(event, {
                            initialCallHasEnded : true
                        }, true /* ignoring registerLog for critical event*/)
                    } else {
                        dispatchEvent(constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED, {
                            callId:  call? call.callId : null,
                            connectionId:  call? call.connectionId : null,
                            reason: call? call.reason : null
                        }, true /* ignoring registerLog for critical event*/);
                    }
                }
            }
            break;
        }
        case constants.SHARED_EVENT_TYPE.MESSAGE:
            dispatchEvent(constants.SHARED_EVENT_TYPE.MESSAGE, payload, registerLog);
            break;
        // TODO: Add validations for the ACW & Wrap up ended
        case constants.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED:
            dispatchEvent(constants.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload, registerLog);
            break;
        case constants.VOICE_EVENT_TYPE.WRAP_UP_ENDED:
            dispatchEvent(constants.VOICE_EVENT_TYPE.WRAP_UP_ENDED, payload, registerLog);
            break;
        /* This is only added to aid in connector development */
        case constants.SHARED_EVENT_TYPE.REMOTE_CONTROLLER:
            channelMessageHandler(payload);
            break;
        case constants.VOICE_EVENT_TYPE.MUTE_TOGGLE:
            if (validatePayload(payload, MuteToggleResult, constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_MUTE, constants.VOICE_EVENT_TYPE.MUTE_TOGGLE)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.MUTE_TOGGLE, payload, registerLog);
            }
            break;
        case constants.VOICE_EVENT_TYPE.HOLD_TOGGLE: {
            const { isThirdPartyOnHold, isCustomerOnHold, calls, isCallMerged } = payload;
            if (validatePayload(payload, HoldToggleResult, constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_HOLD, constants.VOICE_EVENT_TYPE.HOLD_TOGGLE)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls,
                    isCallMerged
                }, registerLog);
            }
            break;
        }
        case constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE: {
            const { isRecordingPaused,
                contactId,
                initialContactId,
                instanceId,
                region
            } = payload;
            if (validatePayload(payload, RecordingToggleResult, constants.VOICE_ERROR_TYPE.CAN_NOT_TOGGLE_RECORD, constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE, {
                    isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                }, registerLog);
            }
        break;
        }
        case constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED: {
            if (validatePayload(payload, HoldToggleResult, constants.VOICE_ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS, constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED)) {
                const { isThirdPartyOnHold, isCustomerOnHold, calls } = payload;
                dispatchEvent(constants.VOICE_EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    calls
                }, true /* ignoring registerLog for critical event*/);
            }
        }
        break;
        case constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED: {
            if (validatePayload(payload, HoldToggleResult, constants.VOICE_ERROR_TYPE.CAN_NOT_CONFERENCE, constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED)) {
                const { isThirdPartyOnHold, isCustomerOnHold, calls , isCallMerged} = payload;
                dispatchEvent(constants.VOICE_EVENT_TYPE.HOLD_TOGGLE, {
                    isThirdPartyOnHold,
                    isCustomerOnHold,
                    isCallMerged,
                    calls
                }, true /* ignoring registerLog for critical event*/);
            }
        break;
        }

        case constants.VOICE_EVENT_TYPE.CALL_UPDATED: {
            if (validatePayload(payload, CallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_CALL, constants.VOICE_EVENT_TYPE.CALL_UPDATED)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_UPDATED, payload, registerLog);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS: {
            if (validatePayload(payload, AudioStats)) {
                if (payload.stats) {
                    updateAudioStats(payload.stats);
                    let audioStats;
                    if (payload.callId) {
                        audioStats = {stats: payload.stats, callId: payload.callId};
                    } else {
                        audioStats = {stats: payload.stats}
                    }
                    dispatchEvent(constants.VOICE_EVENT_TYPE.AUDIO_STATS, {audioStats}, registerLog);
                }
                if (payload.isAudioStatsCompleted && payload.callId) {
                    const callId = payload.callId;
                    const mos = getMOS();
                    dispatchEvent(constants.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, {callId, mos}, registerLog);
                }
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN: {
            if (validatePayload(payload, SuperviseCallResult, constants.VOICE_ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR, constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.CALL_BARGED_IN: {
            if (validatePayload(payload, SupervisedCallInfo,  constants.SHARED_ERROR_TYPE.GENERIC_ERROR, constants.VOICE_EVENT_TYPE.CALL_BARGED_IN)) {
                dispatchEvent(constants.VOICE_EVENT_TYPE.CALL_BARGED_IN, payload, true /* ignoring registerLog for critical event*/);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED: {
            if (validatePayload(payload, SuperviseCallResult,  constants.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED)) {
                isSupervisorConnected = true;
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED: {
            if (validatePayload(payload, SuperviseCallResult,  constants.VOICE_ERROR_TYPE.CAN_NOT_SUPERVISE_CALL, constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED)) {
                isSupervisorConnected = true;
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload.call, true /* ignoring registerLog for critical event*/);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP: {
            if (validatePayload(payload, SupervisorHangupResult,  constants.VOICE_ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR, constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP)) {
                isSupervisorConnected = false;
                dispatchEvent(constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP, payload.calls, true /* ignoring registerLog for critical event*/);
            }
            break;
        }

        case constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS: {
            if (validatePayload(payload, AgentStatusInfo,  constants.SHARED_ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS, constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS)) {
                const statusId = payload.statusId;
                dispatchEvent(constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS, { statusId }, registerLog);
            }
            break;
        }

        case constants.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW: {
            dispatchEvent(constants.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW, payload);
            break;
        }

        case constants.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT: {
            if(validatePayload(payload, ShowStorageAccessResult, constants.SHARED_ERROR_TYPE.INVALID_STORAGE_ACCESS_RESULT, constants.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT)) {
                dispatchEvent(constants.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT, payload);
                if(payload.success) {
                    if (payload.showLogin) {
                        dispatchEvent(constants.SHARED_EVENT_TYPE.SHOW_LOGIN, {
                            loginFrameHeight: payload.loginFrameHeight
                        }, registerLog);
                    } else {
                        setConnectorReady();
                    }   
                }
            }
            break;
        }
        case constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED: {
            if (validatePayload(payload, ACWInfo, constants.SHARED_ERROR_TYPE.INVALID_ACW_INFO, constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED)){
                dispatchEvent(constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED, payload, registerLog);
            }
            break;
        }
        case constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED: {
            if (validatePayload(payload, ACWInfo, constants.SHARED_ERROR_TYPE.INVALID_ACW_INFO, constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED)){
                dispatchEvent(constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED, payload, registerLog);
            }
            break;
        }

        /**
         * NOTE: SALESFORCE INTERNAL USE ONLY
         */
        case constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS: {
            if (validatePayload(payload, AgentVendorStatusInfo, constants.SHARED_ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS, constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS)) {
                dispatchEvent(constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS, payload, registerLog);
            }
            break;
        }

        /**
         * NOTE: SALESFORCE INTERNAL USE ONLY
         */
        case constants.SHARED_EVENT_TYPE.STATE_CHANGE: {
            if(validatePayload(payload, StateChangeResult, constants.SHARED_ERROR_TYPE.INVALID_STATE_CHANGE_RESULT, constants.SHARED_EVENT_TYPE.STATE_CHANGE)) {
                dispatchEvent(constants.SHARED_EVENT_TYPE.STATE_CHANGE, payload);
            }
            break;
        }
    }
}

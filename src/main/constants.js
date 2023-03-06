/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

export default {
    MESSAGE_TYPE: {
        // Framework Message Types
        SETUP_CONNECTOR: 'SETUP_CONNECTOR',
        CONNECTOR_READY: 'CONNECTOR_READY',

        // Telephony Message Types: sent from SFDC to Telephony Vendor
        LOG: 'LOG',
        TELEPHONY_EVENT_DISPATCHED: 'TELEPHONY_EVENT_DISPATCHED',
        ACCEPT_CALL: 'ACCEPT_CALL',
        DECLINE_CALL: 'DECLINE_CALL',
        END_CALL: 'END_CALL',
        MUTE: 'MUTE',
        UNMUTE: 'UNMUTE',
        HOLD: 'HOLD',
        RESUME: 'RESUME',
        SET_AGENT_STATUS: 'SET_AGENT_STATUS',
        GET_AGENT_STATUS: 'GET_AGENT_STATUS',
        DIAL: 'DIAL',
        SEND_DIGITS: 'SEND_DIGITS',
        GET_PHONE_CONTACTS: 'GET_PHONE_CONTACTS',
        SWAP_PARTICIPANTS: 'SWAP_PARTICIPANTS',
        ADD_PARTICIPANT: 'ADD_PARTICIPANT',
        CONFERENCE: 'CONFERENCE',
        PAUSE_RECORDING: 'PAUSE_RECORDING',
        RESUME_RECORDING: 'RESUME_RECORDING',
        LOGOUT: 'LOGOUT',
        MESSAGE: 'MESSAGE',
        WRAP_UP_CALL: 'WRAP_UP_CALL',
        AGENT_AVAILABLE: 'AGENT_AVAILABLE',
        SET_AGENT_CONFIG: 'SET_AGENT_CONFIG',
        GET_SIGNED_RECORDING_URL: 'GET_SIGNED_RECORDING_URL',
        DOWNLOAD_VENDOR_LOGS: 'DOWNLOAD_VENDOR_LOGS',
        SUPERVISE_CALL: 'SUPERVISE_CALL',
        SUPERVISOR_BARGE_IN : 'SUPERVISOR_BARGE_IN',
        SUPERVISOR_DISCONNECT: 'SUPERVISOR_DISCONNECT'
    },
    EVENT_TYPE: {
        QUEUED_CALL_STARTED: 'QUEUED_CALL_STARTED',
        CALL_STARTED: 'CALL_STARTED',
        CALL_CONNECTED: 'CALL_CONNECTED',
        CALL_FAILED: 'CALL_FAILED',
        MUTE_TOGGLE: 'MUTE_TOGGLE',
        HOLD_TOGGLE: 'HOLD_TOGGLE',
        HANGUP: 'HANGUP',
        ERROR: 'ERROR',
        WARNING: 'WARNING',
        INFO: 'INFO',
        PHONE_CONTACTS: 'PHONE_CONTACTS',
        PARTICIPANT_ADDED: 'PARTICIPANT_ADDED',
        PARTICIPANT_CONNECTED: 'PARTICIPANT_CONNECTED',
        PARTICIPANT_REMOVED: 'PARTICIPANT_REMOVED',
        LOGIN_STARTED: 'LOGIN_STARTED',
        LOGIN_RESULT: 'LOGIN_RESULT', // info about timeout, error, success etc
        LOGOUT_RESULT: 'LOGOUT_RESULT',
        RECORDING_TOGGLE: 'RECORDING_TOGGLE',
        PARTICIPANTS_SWAPPED: 'PARTICIPANTS_SWAPPED',
        PARTICIPANTS_CONFERENCED: 'PARTICIPANTS_CONFERENCED',
        SHOW_LOGIN: 'SHOW_LOGIN',
        SET_AGENT_STATUS_RESULT: 'SET_AGENT_STATUS_RESULT',
        GET_AGENT_STATUS_RESULT: 'GET_AGENT_STATUS_RESULT',
        WRAP_UP_ENDED: 'WRAP_UP_ENDED',
        MESSAGE: 'MESSAGE',
        AFTER_CALL_WORK_STARTED: 'AFTER_CALL_WORK_STARTED',
        AGENT_CONFIG_UPDATED: 'AGENT_CONFIG_UPDATED',
        AGENT_ERROR: 'AGENT_ERROR',
        SOFTPHONE_ERROR: 'SOFTPHONE_ERROR',
        SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL',
        UPDATE_AUDIO_STATS: 'UPDATE_AUDIO_STATS',
        UPDATE_AUDIO_STATS_COMPLETED: 'UPDATE_AUDIO_STATS_COMPLETED',
        SUPERVISOR_BARGED_IN: 'SUPERVISOR_BARGED_IN',
        SUPERVISOR_CALL_STARTED : 'SUPERVISOR_CALL_STARTED',
        SUPERVISOR_CALL_CONNECTED: 'SUPERVISOR_CALL_CONNECTED',
        SUPERVISOR_HANGUP : 'SUPERVISOR_HANGUP',
        CALL_BARGED_IN : 'CALL_BARGED_IN',
        SET_AGENT_STATUS: 'SET_AGENT_STATUS',
        GET_AGENT_STATUS: 'GET_AGENT_STATUS',
        STATE_CHANGE: 'STATE_CHANGE'
    },
    INFO_TYPE: {
        CAN_NOT_ACCEPT_THE_CALL: 'CAN_NOT_ACCEPT_THE_CALL'
    },
    ERROR_TYPE: {
        GENERIC_ERROR: 'GENERIC_ERROR',
        AGENT_ERROR: 'AGENT_ERROR',
        MICROPHONE_NOT_SHARED: 'MICROPHONE_NOT_SHARED',
        UNSUPPORTED_BROWSER: 'UNSUPPORTED_BROWSER',
        AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
        INVALID_AGENT_STATUS: 'INVALID_AGENT_STATUS',
        CAN_NOT_SET_AGENT_STATUS: 'CAN_NOT_SET_AGENT_STATUS',
        LOGIN_REQUIRED: 'LOGIN_REQUIRED',
        CAN_NOT_DECLINE_THE_CALL: 'CAN_NOT_DECLINE_THE_CALL',
        CAN_NOT_END_THE_CALL: 'CAN_NOT_END_THE_CALL',
        CAN_NOT_HOLD_CALL: 'CAN_NOT_HOLD_CALL',
        CAN_NOT_RESUME_CALL: 'CAN_NOT_RESUME_CALL',
        CAN_NOT_MUTE_CALL: 'CAN_NOT_MUTE_CALL',
        CAN_NOT_UNMUTE_CALL: 'CAN_NOT_UNMUTE_CALL',
        CAN_NOT_TOGGLE_MUTE: 'CAN_NOT_TOGGLE_MUTE',
        CAN_NOT_TOGGLE_HOLD: 'CAN_NOT_TOGGLE_HOLD',
        CAN_NOT_TOGGLE_RECORD: 'CAN_NOT_TOGGLE_RECORD',
        INVALID_PARTICIPANT: 'INVALID_PARTICIPANT',
        CAN_NOT_LOG_IN: 'CAN_NOT_LOG_IN',
        CAN_NOT_LOG_OUT: 'CAN_NOT_LOG_OUT',
        INVALID_PARAMS: 'INVALID_PARAMS',
        CAN_NOT_GET_PHONE_CONTACTS: 'CAN_NOT_GET_PHONE_CONTACTS',
        CAN_NOT_SWAP_PARTICIPANTS: 'CAN_NOT_SWAP_PARTICIPANTS',
        CAN_NOT_CONFERENCE: 'CAN_NOT_CONFERENCE',
        INVALID_DESTINATION: 'INVALID_DESTINATION',
        INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
        CAN_NOT_HANGUP_PARTICIPANT: 'CAN_NOT_HANGUP_PARTICIPANT',
        CAN_NOT_ADD_PARTICIPANT: 'CAN_NOT_ADD_PARTICIPANT',
        CAN_NOT_CONNECT_PARTICIPANT: 'CAN_NOT_CONNECT_PARTICIPANT',
        CAN_NOT_START_THE_CALL: 'CAN_NOT_START_THE_CALL',
        CAN_NOT_PAUSE_RECORDING: 'CAN_NOT_PAUSE_RECORDING',
        CAN_NOT_RESUME_RECORDING: 'CAN_NOT_RESUME_RECORDING',
        CAN_NOT_SET_AGENT_CONFIG: 'CAN_NOT_SET_AGENT_CONFIG',
        CAN_NOT_SET_CAPABILITIES: 'CAN_NOT_SET_CAPABILITIES',
        CAN_NOT_UPDATE_PHONE_NUMBER: 'CAN_NOT_UPDATE_PHONE_NUMBER',
        CAN_NOT_GET_SIGNED_RECORDING_URL: 'CAN_NOT_GET_SIGNED_RECORDING_URL',
        CAN_NOT_SUPERVISE_CALL : 'CAN_NOT_SUPERVISE_CALL',
        CAN_NOT_DISCONNECT_SUPERVISOR : 'CAN_NOT_DISCONNECT_SUPERVISOR',
        CAN_NOT_BARGE_IN_SUPERVISOR: 'CAN_NOT_BARGE_IN_SUPERVISOR',
        CAN_NOT_BARGE_IN_CALL: 'CAN_NOT_BARGE_IN_CALL',
        CAN_NOT_GET_AGENT_STATUS: 'CAN_NOT_GET_AGENT_STATUS',
        INVALID_STATE_CHANGE_RESULT: 'INVALID_STATE_CHANGE_RESULT'
    },
    AGENT_STATUS: {
        ONLINE: 'Online',
        OFFLINE: 'Offline',
        ACW : 'AfterCallWork',
        CALLBACK_MISSED_OR_REJECTED: 'CallbackMissedOrRejected' // Used only for Amazon; workaround for https://github.com/amazon-connect/amazon-connect-streams/issues/344
    },
    PARTICIPANT_TYPE: {
        AGENT: 'Agent',
        INITIAL_CALLER: 'Initial_Caller',
        THIRD_PARTY: 'Third_Party',
        SUPERVISOR: 'Supervisor'
    },
    CALL_TYPE: {
        INBOUND: 'Inbound',
        OUTBOUND: 'Outbound',
        CALLBACK: 'Callback',
        ADD_PARTICIPANT: 'AddParticipant',
        TRANSFER:'Transfer'
    },
    DIALER_TYPE: {
        OUTBOUND_PREVIEW: 'OutboundPreview',
        NONE: 'None'
    },
    CONTACT_TYPE: {
        PHONEBOOK: 'PhoneBook',
        QUEUE: 'Queue',
        PHONENUMBER: 'PhoneNumber',
        AGENT: 'Agent',
        FLOW: 'Flow'
    },
    AGENT_CONFIG_TYPE: {
        SHOW_AGENT_SETTINGS: 'SHOW_AGENT_SETTINGS',
        PHONES: 'PHONES',
        SELECTED_PHONE: 'SELECTED_PHONE'
    },
    CAPABILITIES_TYPE: {
        MUTE: 'MUTE',
        RECORD: 'RECORD',
        MERGE: 'MERGE',
        SWAP: 'SWAP',
        SIGNED_RECORDING_URL: 'SIGNED_RECORDING_URL',
        DEBUG_ENABLED: 'DEBUG_ENABLED',
        CONTACT_SEARCH: 'CONTACT_SEARCH',
        VENDOR_PROVIDED_AVAILABILITY: 'VENDOR_PROVIDED_AVAILABILITY',
        VENDOR_PROVIDED_QUEUE_WAIT_TIME: 'VENDOR_PROVIDED_QUEUE_WAIT_TIME',
        SUPERVISOR_LISTEN_IN: 'SUPERVISOR_LISTEN_IN',
        SUPERVISOR_BARGE_IN: 'SUPERVISOR_BARGE_IN',
        MOS: 'MOS',
        BLIND_TRANSFER: 'BLIND_TRANSFER',
        TRANSFER_TO_OMNI_FLOW: 'TRANSFER_TO_OMNI_FLOW',
        PENDING_STATUS_CHANGE: 'PENDING_STATUS_CHANGE'
    },
    CALL_STATE: {
        RINGING: 'ringing',
        CONNECTED: 'connected',
        TRANSFERRING: 'transferring',
        TRANSFERRED: 'transferred',
        ENDED: 'ended'
    },
    PHONE_TYPE: {
        DESK_PHONE: 'DESK_PHONE',
        SOFT_PHONE: 'SOFT_PHONE'
    },
    HANGUP_REASON: {
        PHONE_CALL_ERROR: "error",
        PHONE_CALL_ENDED: "ended"
    },
    AGENT_AVAILABILITY: {
        AVAILABLE: "AVAILABLE",
        BUSY: "BUSY",
        OFFLINE: "OFFLINE"
    },
    REMOVE_PARTICIPANT_VARIANT: {
        ALWAYS : 'ALWAYS',
        NEVER: 'NEVER',
        ALWAYS_EXCEPT_ON_HOLD: 'ALWAYS_EXCEPT_ON_HOLD'
    },
    LOG_LEVEL: {
        ERROR: "ERROR",
        INFO: "INFO"
    },
    LOG_SOURCE: {
        SYSTEM: "SYSTEM",
        PARTNER: "PARTNER"
    },
    CONTACTS_FILTER_TYPES: {
        "AGENT": "AGENT",
        "QUEUE": "QUEUE",
        "CONTACT": "CONTACT",
        "DIRECTORY": "DIRECTORY",
        "FLOW": "FLOW",
        "AVAILABLE": "AVAILABLE"
    }
};

/**
 * Fields in the connector configuration that are logged. 
 */
export const CONNECTOR_CONFIG_EXPOSED_FIELDS = [
    "/internalNameLabel",
    "/reqGeneralInfo/reqAdapterUrl",
    "/reqGeneralInfo/reqVendorInfoApiName",
    "isACWAllowed",
    "isHVSEnabled",
    "orgDomainName",
    "phoneServiceChannelId",
    "telephonySettingsComponentFqn"
];

/**
 * Fields that starts with string in the connector configuration that are logged. 
 */
export const CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH = [
    "/reqHvcc"
];

/**
 * Fields in the connector configuration that are NOT logged.
 */
export const CONNECTOR_CONFIG_EXCEPTION_FIELDS = [
    "/reqHvcc/reqTelephonyIntegrationCertificate"
];
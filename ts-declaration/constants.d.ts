declare namespace _default {
    namespace SHARED_MESSAGE_TYPE {
        const SETUP_CONNECTOR: string;
        const CONNECTOR_READY: string;
        const LOG: string;
        const TELEPHONY_EVENT_DISPATCHED: string;
        const SET_AGENT_STATUS: string;
        const GET_AGENT_STATUS: string;
        const LOGOUT: string;
        const MESSAGE: string;
        const DOWNLOAD_VENDOR_LOGS: string;
        const AGENT_WORK_EVENT: string;
        const GET_CONTACTS: string;
        const STATE_CHANGE: string;
        const REMOTE_CONTROLLER: string;
        const SHOW_STORAGE_ACCESS: string;
        const STORAGE_ACCESS_RESULT: string;
        const GET_CONTACTS_RESULT: string;
    }
    namespace VOICE_MESSAGE_TYPE {
        const ACCEPT_CALL: string;
        const DECLINE_CALL: string;
        const END_CALL: string;
        const MUTE: string;
        const UNMUTE: string;
        const HOLD: string;
        const RESUME: string;
        const DIAL: string;
        const SEND_DIGITS: string;
        const GET_PHONE_CONTACTS: string;
        const SWAP_PARTICIPANTS: string;
        const ADD_PARTICIPANT: string;
        const CONFERENCE: string;
        const PAUSE_RECORDING: string;
        const RESUME_RECORDING: string;
        const WRAP_UP_CALL: string;
        const AGENT_AVAILABLE: string;
        const SET_AGENT_CONFIG: string;
        const GET_SIGNED_RECORDING_URL: string;
        const SUPERVISE_CALL: string;
        const SUPERVISOR_BARGE_IN: string;
        const SUPERVISOR_DISCONNECT: string;
    }
    namespace SHARED_EVENT_TYPE {
        const ERROR: string;
        const WARNING: string;
        const INFO: string;
        const LOGIN_STARTED: string;
        const LOGIN_RESULT: string;
        const LOGOUT_RESULT: string;
        const SHOW_LOGIN: string;
        const SET_AGENT_STATUS_RESULT: string;
        const GET_AGENT_STATUS_RESULT: string;
        const MESSAGE: string;
        const SET_AGENT_STATUS: string;
        const GET_AGENT_STATUS: string;
        const STATE_CHANGE: string;
        const REMOTE_CONTROLLER: string;
        const SHOW_STORAGE_ACCESS: string;
        const STORAGE_ACCESS_RESULT: string;
        const GET_CONTACTS_RESULT: string;
    }
    namespace VOICE_EVENT_TYPE {
        const QUEUED_CALL_STARTED: string;
        const CALL_STARTED: string;
        const CALL_CONNECTED: string;
        const CALL_FAILED: string;
        const MUTE_TOGGLE: string;
        const HOLD_TOGGLE: string;
        const HANGUP: string;
        const PHONE_CONTACTS: string;
        const PARTICIPANT_ADDED: string;
        const PARTICIPANT_CONNECTED: string;
        const PARTICIPANT_REMOVED: string;
        const RECORDING_TOGGLE: string;
        const PARTICIPANTS_SWAPPED: string;
        const PARTICIPANTS_CONFERENCED: string;
        const WRAP_UP_ENDED: string;
        const AFTER_CALL_WORK_STARTED: string;
        const AGENT_CONFIG_UPDATED: string;
        const AGENT_ERROR: string;
        const SOFTPHONE_ERROR: string;
        const SIGNED_RECORDING_URL: string;
        const UPDATE_AUDIO_STATS: string;
        const UPDATE_AUDIO_STATS_COMPLETED: string;
        const SUPERVISOR_BARGED_IN: string;
        const SUPERVISOR_CALL_STARTED: string;
        const SUPERVISOR_CALL_CONNECTED: string;
        const SUPERVISOR_HANGUP: string;
        const CALL_BARGED_IN: string;
        const SHOW_TRANSFER_VIEW: string;
    }
    namespace INFO_TYPE {
        const CAN_NOT_ACCEPT_THE_CALL: string;
    }
    namespace SHARED_ERROR_TYPE {
        const CUSTOM_ERROR: string;
        const GENERIC_ERROR: string;
        const AUTHENTICATION_ERROR: string;
        const INVALID_AGENT_STATUS: string;
        const CAN_NOT_GET_AGENT_STATUS: string;
        const CAN_NOT_SET_AGENT_STATUS: string;
        const INVALID_STATE_CHANGE_RESULT: string;
        const LOGIN_REQUIRED: string;
        const CAN_NOT_LOG_IN: string;
        const CAN_NOT_LOG_OUT: string;
        const INVALID_STORAGE_ACCESS_RESULT: string;
    }
    namespace VOICE_ERROR_TYPE {
        const AGENT_ERROR: string;
        const MICROPHONE_NOT_SHARED: string;
        const UNSUPPORTED_BROWSER: string;
        const CAN_NOT_DECLINE_THE_CALL: string;
        const CAN_NOT_END_THE_CALL: string;
        const CAN_NOT_HOLD_CALL: string;
        const CAN_NOT_RESUME_CALL: string;
        const CAN_NOT_MUTE_CALL: string;
        const CAN_NOT_UNMUTE_CALL: string;
        const CAN_NOT_TOGGLE_MUTE: string;
        const CAN_NOT_TOGGLE_HOLD: string;
        const CAN_NOT_TOGGLE_RECORD: string;
        const INVALID_PARTICIPANT: string;
        const INVALID_PARAMS: string;
        const CAN_NOT_GET_PHONE_CONTACTS: string;
        const CAN_NOT_SWAP_PARTICIPANTS: string;
        const CAN_NOT_CONFERENCE: string;
        const INVALID_DESTINATION: string;
        const INVALID_PHONE_NUMBER: string;
        const CAN_NOT_HANGUP_PARTICIPANT: string;
        const CAN_NOT_ADD_PARTICIPANT: string;
        const CAN_NOT_CONNECT_PARTICIPANT: string;
        const CAN_NOT_START_THE_CALL: string;
        const CAN_NOT_PAUSE_RECORDING: string;
        const CAN_NOT_RESUME_RECORDING: string;
        const CAN_NOT_SET_AGENT_CONFIG: string;
        const CAN_NOT_SET_CAPABILITIES: string;
        const CAN_NOT_UPDATE_PHONE_NUMBER: string;
        const CAN_NOT_GET_SIGNED_RECORDING_URL: string;
        const CAN_NOT_SUPERVISE_CALL: string;
        const CAN_NOT_DISCONNECT_SUPERVISOR: string;
        const CAN_NOT_BARGE_IN_SUPERVISOR: string;
        const CAN_NOT_BARGE_IN_CALL: string;
    }
    namespace AGENT_STATUS {
        const ONLINE: string;
        const OFFLINE: string;
        const ACW: string;
        const CALLBACK_MISSED_OR_REJECTED: string;
    }
    namespace PARTICIPANT_TYPE {
        const AGENT: string;
        const INITIAL_CALLER: string;
        const THIRD_PARTY: string;
        const SUPERVISOR: string;
    }
    namespace CALL_TYPE {
        const INBOUND: string;
        const OUTBOUND: string;
        const CALLBACK: string;
        const ADD_PARTICIPANT: string;
        const TRANSFER: string;
        const INTERNAL_CALL: string;
    }
    namespace DIALER_TYPE {
        const OUTBOUND_PREVIEW: string;
        const NONE: string;
    }
    namespace CONTACT_TYPE {
        const PHONEBOOK: string;
        const QUEUE: string;
        const PHONENUMBER: string;
        const AGENT: string;
        const FLOW: string;
    }
    namespace AGENT_CONFIG_TYPE {
        const SHOW_AGENT_SETTINGS: string;
        const PHONES: string;
        const SELECTED_PHONE: string;
    }
    namespace CAPABILITIES_TYPE {
        const MUTE: string;
        const RECORD: string;
        const MERGE: string;
        const SWAP: string;
        const SIGNED_RECORDING_URL: string;
        const DEBUG_ENABLED: string;
        const CONTACT_SEARCH: string;
        const VENDOR_PROVIDED_AVAILABILITY: string;
        const VENDOR_PROVIDED_QUEUE_WAIT_TIME: string;
        const SUPERVISOR_LISTEN_IN: string;
        const SUPERVISOR_BARGE_IN: string;
        const MOS: string;
        const BLIND_TRANSFER: string;
        const TRANSFER_TO_OMNI_FLOW: string;
        const PENDING_STATUS_CHANGE: string;
        const PHONEBOOK: string;
        const SFDC_PENDING_STATE: string;
    }
    namespace CALL_STATE {
        const RINGING: string;
        const CONNECTED: string;
        const TRANSFERRING: string;
        const TRANSFERRED: string;
        const ENDED: string;
    }
    namespace PHONE_TYPE {
        const DESK_PHONE: string;
        const SOFT_PHONE: string;
    }
    namespace HANGUP_REASON {
        const PHONE_CALL_ERROR: string;
        const PHONE_CALL_ENDED: string;
    }
    namespace AGENT_AVAILABILITY {
        const AVAILABLE: string;
        const BUSY: string;
        const OFFLINE: string;
    }
    namespace REMOVE_PARTICIPANT_VARIANT {
        const ALWAYS: string;
        const NEVER: string;
        const ALWAYS_EXCEPT_ON_HOLD: string;
    }
    namespace LOG_LEVEL {
        const ERROR: string;
        const INFO: string;
    }
    namespace LOG_SOURCE {
        const SYSTEM: string;
        const PARTNER: string;
    }
    namespace CONTACTS_FILTER_TYPES {
        const AGENT: string;
        const QUEUE: string;
        const CONTACT: string;
        const DIRECTORY: string;
        const FLOW: string;
        const AVAILABLE: string;
    }
}
export default _default;

/**
 * Fields in the connector configuration that are logged.
 */
export const CONNECTOR_CONFIG_EXPOSED_FIELDS: string[];
/**
 * Fields that starts with string in the connector configuration that are logged.
 */
export const CONNECTOR_CONFIG_EXPOSED_FIELDS_STARTSWITH: string[];
/**
 * Fields in the connector configuration that are NOT logged.
 */
export const CONNECTOR_CONFIG_EXCEPTION_FIELDS: string[];

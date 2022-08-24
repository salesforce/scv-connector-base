declare namespace _default {
    namespace MESSAGE_TYPE {
        const SETUP_CONNECTOR: string;
        const CONNECTOR_READY: string;
        const LOG: string;
        const TELEPHONY_EVENT_DISPATCHED: string;
        const ACCEPT_CALL: string;
        const DECLINE_CALL: string;
        const END_CALL: string;
        const MUTE: string;
        const UNMUTE: string;
        const HOLD: string;
        const RESUME: string;
        const SET_AGENT_STATUS: string;
        const GET_AGENT_STATUS: string;
        const DIAL: string;
        const SEND_DIGITS: string;
        const GET_PHONE_CONTACTS: string;
        const SWAP_PARTICIPANTS: string;
        const ADD_PARTICIPANT: string;
        const CONFERENCE: string;
        const PAUSE_RECORDING: string;
        const RESUME_RECORDING: string;
        const LOGOUT: string;
        const MESSAGE: string;
        const WRAP_UP_CALL: string;
        const AGENT_AVAILABLE: string;
        const SET_AGENT_CONFIG: string;
        const GET_SIGNED_RECORDING_URL: string;
        const DOWNLOAD_VENDOR_LOGS: string;
        const SUPERVISE_CALL: string;
        const SUPERVISOR_BARGE_IN: string;
        const SUPERVISOR_DISCONNECT: string;
    }
    namespace EVENT_TYPE {
        export const QUEUED_CALL_STARTED: string;
        export const CALL_STARTED: string;
        export const CALL_CONNECTED: string;
        export const CALL_FAILED: string;
        export const MUTE_TOGGLE: string;
        export const HOLD_TOGGLE: string;
        export const HANGUP: string;
        export const ERROR: string;
        export const WARNING: string;
        export const INFO: string;
        export const PHONE_CONTACTS: string;
        export const PARTICIPANT_ADDED: string;
        export const PARTICIPANT_CONNECTED: string;
        export const PARTICIPANT_REMOVED: string;
        export const LOGIN_STARTED: string;
        export const LOGIN_RESULT: string;
        export const LOGOUT_RESULT: string;
        export const RECORDING_TOGGLE: string;
        export const PARTICIPANTS_SWAPPED: string;
        export const PARTICIPANTS_CONFERENCED: string;
        export const SHOW_LOGIN: string;
        export const SET_AGENT_STATUS_RESULT: string;
        export const GET_AGENT_STATUS_RESULT: string;
        export const WRAP_UP_ENDED: string;
        const MESSAGE_1: string;
        export { MESSAGE_1 as MESSAGE };
        export const AFTER_CALL_WORK_STARTED: string;
        export const AGENT_CONFIG_UPDATED: string;
        export const AGENT_ERROR: string;
        export const SOFTPHONE_ERROR: string;
        export const SIGNED_RECORDING_URL: string;
        export const UPDATE_AUDIO_STATS: string;
        export const UPDATE_AUDIO_STATS_COMPLETED: string;
        export const SUPERVISOR_BARGED_IN: string;
        export const SUPERVISOR_CALL_STARTED: string;
        export const SUPERVISOR_CALL_CONNECTED: string;
        export const SUPERVISOR_HANGUP: string;
        export const CALL_BARGED_IN: string;
        const SET_AGENT_STATUS_1: string;
        export { SET_AGENT_STATUS_1 as SET_AGENT_STATUS };
        const GET_AGENT_STATUS_1: string;
        export { GET_AGENT_STATUS_1 as GET_AGENT_STATUS };
        export const STATE_CHANGE: string;
    }
    namespace INFO_TYPE {
        const CAN_NOT_ACCEPT_THE_CALL: string;
    }
    namespace ERROR_TYPE {
        export const GENERIC_ERROR: string;
        const AGENT_ERROR_1: string;
        export { AGENT_ERROR_1 as AGENT_ERROR };
        export const MICROPHONE_NOT_SHARED: string;
        export const UNSUPPORTED_BROWSER: string;
        export const AUTHENTICATION_ERROR: string;
        export const INVALID_AGENT_STATUS: string;
        export const CAN_NOT_SET_AGENT_STATUS: string;
        export const LOGIN_REQUIRED: string;
        export const CAN_NOT_DECLINE_THE_CALL: string;
        export const CAN_NOT_END_THE_CALL: string;
        export const CAN_NOT_HOLD_CALL: string;
        export const CAN_NOT_RESUME_CALL: string;
        export const CAN_NOT_MUTE_CALL: string;
        export const CAN_NOT_UNMUTE_CALL: string;
        export const CAN_NOT_TOGGLE_MUTE: string;
        export const CAN_NOT_TOGGLE_HOLD: string;
        export const CAN_NOT_TOGGLE_RECORD: string;
        export const INVALID_PARTICIPANT: string;
        export const CAN_NOT_LOG_IN: string;
        export const CAN_NOT_LOG_OUT: string;
        export const INVALID_PARAMS: string;
        export const CAN_NOT_GET_PHONE_CONTACTS: string;
        export const CAN_NOT_SWAP_PARTICIPANTS: string;
        export const CAN_NOT_CONFERENCE: string;
        export const INVALID_DESTINATION: string;
        export const INVALID_PHONE_NUMBER: string;
        export const CAN_NOT_HANGUP_PARTICIPANT: string;
        export const CAN_NOT_ADD_PARTICIPANT: string;
        export const CAN_NOT_CONNECT_PARTICIPANT: string;
        export const CAN_NOT_START_THE_CALL: string;
        export const CAN_NOT_PAUSE_RECORDING: string;
        export const CAN_NOT_RESUME_RECORDING: string;
        export const CAN_NOT_SET_AGENT_CONFIG: string;
        export const CAN_NOT_SET_CAPABILITIES: string;
        export const CAN_NOT_UPDATE_PHONE_NUMBER: string;
        export const CAN_NOT_GET_SIGNED_RECORDING_URL: string;
        export const CAN_NOT_SUPERVISE_CALL: string;
        export const CAN_NOT_DISCONNECT_SUPERVISOR: string;
        export const CAN_NOT_BARGE_IN_SUPERVISOR: string;
        export const CAN_NOT_BARGE_IN_CALL: string;
        export const CAN_NOT_GET_AGENT_STATUS: string;
        export const INVALID_STATE_CHANGE_RESULT: string;
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
        export const INBOUND: string;
        export const OUTBOUND: string;
        export const CALLBACK: string;
        const ADD_PARTICIPANT_1: string;
        export { ADD_PARTICIPANT_1 as ADD_PARTICIPANT };
        export const TRANSFER: string;
    }
    namespace DIALER_TYPE {
        const OUTBOUND_PREVIEW: string;
        const NONE: string;
    }
    namespace CONTACT_TYPE {
        export const PHONEBOOK: string;
        export const QUEUE: string;
        export const PHONENUMBER: string;
        const AGENT_1: string;
        export { AGENT_1 as AGENT };
        export const FLOW: string;
    }
    namespace AGENT_CONFIG_TYPE {
        const SHOW_AGENT_SETTINGS: string;
        const PHONES: string;
        const SELECTED_PHONE: string;
    }
    namespace CAPABILITIES_TYPE {
        const MUTE_1: string;
        export { MUTE_1 as MUTE };
        export const RECORD: string;
        export const MERGE: string;
        export const SWAP: string;
        const SIGNED_RECORDING_URL_1: string;
        export { SIGNED_RECORDING_URL_1 as SIGNED_RECORDING_URL };
        export const DEBUG_ENABLED: string;
        export const CONTACT_SEARCH: string;
        export const VENDOR_PROVIDED_AVAILABILITY: string;
        export const SUPERVISOR_LISTEN_IN: string;
        const SUPERVISOR_BARGE_IN_1: string;
        export { SUPERVISOR_BARGE_IN_1 as SUPERVISOR_BARGE_IN };
        export const MOS: string;
        export const BLIND_TRANSFER: string;
        export const TRANSFER_TO_OMNI_FLOW: string;
        export const PENDING_STATUS_CHANGE: string;
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
        export const AVAILABLE: string;
        export const BUSY: string;
        const OFFLINE_1: string;
        export { OFFLINE_1 as OFFLINE };
    }
    namespace REMOVE_PARTICIPANT_VARIANT {
        const ALWAYS: string;
        const NEVER: string;
        const ALWAYS_EXCEPT_ON_HOLD: string;
    }
    namespace LOG_LEVEL {
        const ERROR_1: string;
        export { ERROR_1 as ERROR };
        const INFO_1: string;
        export { INFO_1 as INFO };
    }
    namespace LOG_SOURCE {
        const SYSTEM: string;
        const PARTNER: string;
    }
    namespace CONTACTS_FILTER_TYPES {
        const AGENT_2: string;
        export { AGENT_2 as AGENT };
        const QUEUE_1: string;
        export { QUEUE_1 as QUEUE };
        export const CONTACT: string;
        export const DIRECTORY: string;
        const FLOW_1: string;
        export { FLOW_1 as FLOW };
        const AVAILABLE_1: string;
        export { AVAILABLE_1 as AVAILABLE };
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

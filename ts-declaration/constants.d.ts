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
        const SUPERVISE_CALL: string;
        const SUPERVISOR_BARGE_IN: string;
        const SUPERVISOR_DISCONNECT: string;
        const SET_AGENT_CONFIG: string;
        const GET_SIGNED_RECORDING_URL: string;
        const WRAP_UP_CALL: string;
        const AGENT_AVAILABLE: string;
        const GET_AUDIO_DEVICES: string;
    }
    namespace SHARED_EVENT_TYPE {
        export const ERROR: string;
        export const WARNING: string;
        export const INFO: string;
        export const LOGIN_STARTED: string;
        export const LOGIN_RESULT: string;
        export const LOGOUT_RESULT: string;
        export const SHOW_LOGIN: string;
        export const SET_AGENT_STATUS_RESULT: string;
        export const GET_AGENT_STATUS_RESULT: string;
        const MESSAGE_1: string;
        export { MESSAGE_1 as MESSAGE };
        const SET_AGENT_STATUS_1: string;
        export { SET_AGENT_STATUS_1 as SET_AGENT_STATUS };
        const GET_AGENT_STATUS_1: string;
        export { GET_AGENT_STATUS_1 as GET_AGENT_STATUS };
        export const STATE_CHANGE: string;
        export const REMOTE_CONTROLLER: string;
        export const SHOW_STORAGE_ACCESS: string;
        export const STORAGE_ACCESS_RESULT: string;
        export const GET_CONTACTS_RESULT: string;
        export const AFTER_CONVERSATION_WORK_STARTED: string;
        export const AFTER_CONVERSATION_WORK_ENDED: string;
    }
    namespace VOICE_EVENT_TYPE {
        export const QUEUED_CALL_STARTED: string;
        export const CALL_STARTED: string;
        export const CALL_CONNECTED: string;
        export const CALL_FAILED: string;
        export const MUTE_TOGGLE: string;
        export const HOLD_TOGGLE: string;
        export const PHONE_CONTACTS: string;
        export const PARTICIPANT_ADDED: string;
        export const PARTICIPANT_CONNECTED: string;
        export const PARTICIPANT_REMOVED: string;
        export const RECORDING_TOGGLE: string;
        export const PARTICIPANTS_SWAPPED: string;
        export const PARTICIPANTS_CONFERENCED: string;
        export const SIGNED_RECORDING_URL: string;
        export const UPDATE_AUDIO_STATS: string;
        export const UPDATE_AUDIO_STATS_COMPLETED: string;
        export const SUPERVISOR_BARGED_IN: string;
        export const SUPERVISOR_CALL_STARTED: string;
        export const SUPERVISOR_CALL_CONNECTED: string;
        export const SUPERVISOR_HANGUP: string;
        export const CALL_BARGED_IN: string;
        export const WRAP_UP_ENDED: string;
        export const AFTER_CALL_WORK_STARTED: string;
        export const AGENT_CONFIG_UPDATED: string;
        export const AGENT_ERROR: string;
        export const HANGUP: string;
        export const SOFTPHONE_ERROR: string;
        export const SHOW_TRANSFER_VIEW: string;
        const GET_AUDIO_DEVICES_1: string;
        export { GET_AUDIO_DEVICES_1 as GET_AUDIO_DEVICES };
        export const AUDIO_STATS: string;
        export const CALL_UPDATED: string;
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
        const LOGIN_REQUIRED: string;
        const CAN_NOT_LOG_IN: string;
        const CAN_NOT_LOG_OUT: string;
        const INVALID_STATE_CHANGE_RESULT: string;
        const INVALID_STORAGE_ACCESS_RESULT: string;
        const INVALID_ACW_INFO: string;
    }
    namespace VOICE_ERROR_TYPE {
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
        const AGENT_ERROR_1: string;
        export { AGENT_ERROR_1 as AGENT_ERROR };
        export const MICROPHONE_NOT_SHARED: string;
        export const UNSUPPORTED_BROWSER: string;
        export const USER_BUSY_ERROR: string;
        export const WEBRTC_ERROR: string;
        export const CAN_NOT_GET_AUDIO_DEVICES: string;
        export const CAN_NOT_UPDATE_CALL: string;
    }
    namespace AGENT_STATUS {
        const ONLINE: string;
        const OFFLINE: string;
        const ACW: string;
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
        export const INTERNAL_CALL: string;
        export const DIALED_CALLBACK: string;
        export const CONSULT: string;
    }
    namespace CALL_SUBTYPE {
        const PSTN: string;
        const WEB_RTC: string;
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
    namespace CONTACT_LIST_TYPE {
        const TRANSFER_1: string;
        export { TRANSFER_1 as TRANSFER };
        const CONFERENCE_1: string;
        export { CONFERENCE_1 as CONFERENCE };
        export const ALL: string;
    }
    namespace AGENT_CONFIG_TYPE {
        const SHOW_AGENT_SETTINGS: string;
        const PHONES: string;
        const SELECTED_PHONE: string;
    }
    namespace SHARED_CAPABILITIES_TYPE {
        const DEBUG_ENABLED: string;
        const CONTACT_SEARCH: string;
        const VENDOR_PROVIDED_AVAILABILITY: string;
        const VENDOR_PROVIDED_QUEUE_WAIT_TIME: string;
        const TRANSFER_TO_OMNI_FLOW: string;
        const PENDING_STATUS_CHANGE: string;
        const SFDC_PENDING_STATE: string;
        const AUTO_ACCEPT_ENABLED: string;
    }
    namespace VOICE_CAPABILITIES_TYPE {
        const MUTE_1: string;
        export { MUTE_1 as MUTE };
        export const RECORD: string;
        export const MERGE: string;
        export const SWAP: string;
        export const BLIND_TRANSFER: string;
        const SIGNED_RECORDING_URL_1: string;
        export { SIGNED_RECORDING_URL_1 as SIGNED_RECORDING_URL };
        export const SUPERVISOR_LISTEN_IN: string;
        const SUPERVISOR_BARGE_IN_1: string;
        export { SUPERVISOR_BARGE_IN_1 as SUPERVISOR_BARGE_IN };
        export const MOS: string;
        const PHONEBOOK_1: string;
        export { PHONEBOOK_1 as PHONEBOOK };
        export const HAS_GET_EXTERNAL_SPEAKER: string;
        export const HAS_SET_EXTERNAL_SPEAKER: string;
        export const HAS_GET_EXTERNAL_MICROPHONE: string;
        export const HAS_SET_EXTERNAL_MICROPHONE: string;
        export const CAN_CONSULT: string;
        export const DIAL_PAD: string;
        export const HAS_HID_SUPPORT: string;
        export const PHONEBOOK_DISABLE: string;
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
    namespace WORK_EVENT {
        const ASSIGNED: string;
        const ACCEPTED: string;
        const DECLINED: string;
        const COMPLETED: string;
        const CLOSED: string;
        const PAUSED: string;
        const UNPAUSED: string;
    }
    namespace DIAL_OPTIONS {
        const CALLBACK_1: string;
        export { CALLBACK_1 as CALLBACK };
        const CONSULT_1: string;
        export { CONSULT_1 as CONSULT };
    }
    namespace HANGUP_STATUS {
        export const MISSED_AGENT: string;
        const DECLINED_1: string;
        export { DECLINED_1 as DECLINED };
        export const FAILED_CONNECT_AGENT: string;
        export const FAILED_CONNECT_CUSTOMER: string;
        export const CALLBACK_MISSED_OR_REJECTED: string;
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

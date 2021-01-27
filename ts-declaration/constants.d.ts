declare namespace _default {
    namespace MESSAGE_TYPE {
        const SETUP_CONNECTOR: string;
        const CONNECTOR_READY: string;
        const TELEPHONY_EVENT_DISPATCHED: string;
        const ACCEPT_CALL: string;
        const DECLINE_CALL: string;
        const END_CALL: string;
        const MUTE: string;
        const UNMUTE: string;
        const HOLD: string;
        const RESUME: string;
        const SET_AGENT_STATUS: string;
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
        const SELECT_PHONE: string;
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
        export const WRAP_UP_ENDED: string;
        const MESSAGE_1: string;
        export { MESSAGE_1 as MESSAGE };
        export const AFTER_CALL_WORK_STARTED: string;
        export const PHONE_SELECTED: string;
    }
    namespace ERROR_TYPE {
        const GENERIC_ERROR: string;
        const AGENT_ERROR: string;
        const MICROPHONE_NOT_SHARED: string;
        const UNSUPPORTED_BROWSER: string;
        const AUTHENTICATION_ERROR: string;
        const INVALID_AGENT_STATUS: string;
        const CAN_NOT_SET_AGENT_STATUS: string;
        const LOGIN_REQUIRED: string;
        const CAN_NOT_ACCEPT_THE_CALL: string;
        const CAN_NOT_DECLINE_THE_CALL: string;
        const CAN_NOT_END_THE_CALL: string;
        const CAN_NOT_HOLD_CALL: string;
        const CAN_NOT_RESUME_CALL: string;
        const CAN_NOT_MUTE_CALL: string;
        const CAN_NOT_UNMUTE_CALL: string;
        const INVALID_PARTICIPANT: string;
        const CAN_NOT_LOG_IN: string;
        const CAN_NOT_LOG_OUT: string;
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
        const CAN_NOT_SELECT_PHONE: string;
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
    }
    namespace CALL_TYPE {
        export const INBOUND: string;
        export const OUTBOUND: string;
        export const CALLBACK: string;
        const ADD_PARTICIPANT_1: string;
        export { ADD_PARTICIPANT_1 as ADD_PARTICIPANT };
    }
    namespace CONTACT_TYPE {
        export const PHONEBOOK: string;
        export const QUEUE: string;
        export const PHONENUMBER: string;
        const AGENT_1: string;
        export { AGENT_1 as AGENT };
    }
    namespace AGENT_CONFIG_TYPE {
        export const SHOW_AGENT_SETTINGS: string;
        const MUTE_1: string;
        export { MUTE_1 as MUTE };
        export const RECORD: string;
        export const MERGE: string;
        export const SWAP: string;
        export const PHONES: string;
        export const SELECTED_PHONE: string;
    }
    namespace CALL_STATE {
        const RINGING: string;
        const CONNECTED: string;
        const TRANSFERRING: string;
        const TRANSFERRED: string;
        const ENDED: string;
    }
    namespace PHONE_TYPE {
        const HARD_PHONE: string;
        const SOFT_PHONE: string;
    }
}
export default _default;

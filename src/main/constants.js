export default {
    MESSAGE_TYPE: {
        // Framework Message Types
        SETUP_CONNECTOR: 'SETUP_CONNECTOR',
        CONNECTOR_READY: 'CONNECTOR_READY',

        // Telephony Message Types: sent from SFDC to Telephony Vendor
        TELEPHONY_EVENT_DISPATCHED: 'TELEPHONY_EVENT_DISPATCHED',
        ACCEPT_CALL: 'ACCEPT_CALL',
        DECLINE_CALL: 'DECLINE_CALL',
        END_CALL: 'END_CALL',
        MUTE: 'MUTE',
        UNMUTE: 'UNMUTE',
        HOLD: 'HOLD',
        RESUME: 'RESUME',
        SET_AGENT_STATUS: 'SET_AGENT_STATUS',
        DIAL: 'DIAL',
        SEND_DIGITS: 'SEND_DIGITS',
        GET_PHONE_CONTACTS: 'GET_PHONE_CONTACTS',
        SWAP_PARTICIPANTS: 'SWAP_PARTICIPANTS',
        JOIN_PARTICIPANTS: 'JOIN_PARTICIPANTS',
        TRANSFER: 'TRANSFER',
        PAUSE_RECORDING: 'PAUSE_RECORDING',
        RESUME_RECORDING: 'RESUME_RECORDING',
        LOGOUT: 'LOGOUT'
    },
    EVENT_TYPE: {
        // Telephony Event Types are fired by the Telephony Vendor and handled by SFDC
        CALL_STARTED: 'CALL_STARTED',
        CALL_CONNECTED: 'CALL_CONNECTED',
        CALL_FAILED: 'CALL_FAILED',
        MUTE_TOGGLE: 'MUTE_TOGGLE',
        HOLD_TOGGLE: 'HOLD_TOGGLE',
        HANGUP: 'HANGUP',
        ERROR: 'ERROR',
        PHONE_CONTACTS: 'PHONE_CONTACTS',
        TRANSFER_CALL_STARTED: 'TRANSFER_CALL_STARTED',
        TRANSFER_CALL_CONNECTED: 'TRANSFER_CALL_CONNECTED',
        TRANSFER_CALL_CLOSED: 'TRANSFER_CALL_CLOSED',
        LOGIN_STARTED: 'LOGIN_STARTED',
        LOGIN_RESULT: 'LOGIN_RESULT', // info about timeout, error, success etc
        LOGOUT_RESULT: 'LOGOUT_RESULT',
        RECORDING_TOGGLE: 'RECORDING_TOGGLE'
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
        CAN_NOT_ACCEPT_THE_CALL: 'CAN_NOT_ACCEPT_THE_CALL',
        CAN_NOT_HOLD_CALL: 'CAN_NOT_HOLD_CALL',
        CAN_NOT_RESUME_CALL: 'CAN_NOT_RESUME_CALL',
        CAN_NOT_MUTE_CALL: 'CAN_NOT_MUTE_CALL',
        CAN_NOT_UNMUTE_CALL: 'CAN_NOT_UNMUTE_CALL',
        INVALID_PARTICIPANT: 'INVALID_PARTICIPANT',
        CAN_NOT_LOG_IN: 'CAN_NOT_LOG_IN',
        CAN_NOT_LOG_OUT: 'CAN_NOT_LOG_OUT',
        INVALID_PARAMS: 'INVALID_PARAMS',
        CAN_NOT_GET_PHONE_CONTACTS: 'CAN_NOT_GET_PHONE_CONTACTS',
        CAN_NOT_SWAP_PARTICIPANTS: 'CAN_NOT_SWAP_PARTICIPANTS',
        CAN_NOT_JOIN_PARTICIPANTS: 'CAN_NOT_JOIN_PARTICIPANTS',
        INVALID_DESTINATION: 'INVALID_DESTINATION',
        INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
        CAN_NOT_HANGUP_PARTICIPANT: 'CAN_NOT_HANGUP_PARTICIPANT',
        CAN_NOT_ADD_PARTICIPANT: 'CAN_NOT_ADD_PARTICIPANT',
        CAN_NOT_START_THE_CALL: 'CAN_NOT_START_THE_CALL',
        CAN_NOT_PAUSE_RECORDING: 'CAN_NOT_PAUSE_RECORDING',
        CAN_NOT_RESUME_RECORDING: 'CAN_NOT_RESUME_RECORDING'
    },
    AGENT_STATUS: {
        ONLINE: 'Online',
        OFFLINE: 'Offline',
        ACW : 'AfterCallWork'
    },
    PARTICIPANT_TYPE: {
        AGENT: 'Agent',
        INITIAL_CALLER: 'Initial_Caller',
        THIRD_PARTY: 'Third_Party'
    },
    CALL_TYPE: {
        INBOUND: 'Inbound',
        OUTBOUND: 'Outbound',
        TRANSFER: 'Transfer'
    },
    FAILURE_TYPE: {
        NETWORKING_ERROR: 'NetworkingError',
        BAD_ENDPOINT_EXCEPTION: 'BadEndpointException'
    },
    CONTACT_TYPE: {
        PHONEBOOK: "PhoneBook",
        QUEUE: 'Queue',
        PHONENUMBER: 'PhoneNumber'
    }
}

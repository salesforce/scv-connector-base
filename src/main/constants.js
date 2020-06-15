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
        GET_LOGIN_SETTINGS: 'GET_LOGIN_SETTINGS', // request isLoginRequired, branding, login params
        LOGIN: 'LOGIN' //telephony subsystem login using LOGIN_INFO
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
        TRANSFER_CALL_CONNECTED: 'TRANSFER_CALL_CONNECTED',
        TRANSFER_CALL_CLOSED: 'TRANSFER_CALL_CLOSED',
        LOGIN_SETTINGS: 'LOGIN_SETTINGS', //including isLoginRequired, branding, login params
        LOGIN_RESULT: 'LOGIN_RESULT' // info about timeout, error, success etc
    },
    ERROR_TYPE: {
        // TODO: move to core, so messages get translated. (currently we don't require localization)
        GENERIC_ERROR: 'We can’t communicate with the telephony system. Try refreshing your browser, or ask your Salesforce admin for help.',
        AGENT_ERROR: 'We can’t route incoming phone calls to you. Try refreshing your browser, or ask your Salesforce admin for help.',
        MICROPHONE_NOT_SHARED: 'Enable the microphone in your browser.',
        UNSUPPORTED_BROWSER: 'This browser isn’t supported. Please try again with another browser.',
        AUTHENTICATION_ERROR: 'We can’t log you in to telephony provider. Try refreshing your browser, or ask your Salesforce admin for help.',
        INVALID_AGENT_STATUS: 'We can’t update your status. Ask your salesforce admin for help.',
        CAN_NOT_SET_AGENT_STATUS: 'We can’t update your status. Try again later.',
        CAN_NOT_ACCEPT_THE_CALL: 'We can’t connect the incoming call. Try refreshing your browser, or ask your Salesforce admin for help.',
        CAN_NOT_HOLD_CALL: 'We can’t hold your call. Try again.',
        CAN_NOT_RESUME_CALL: 'We can’t resume your call. Try again.',
        INVALID_PARTICIPANT: 'Participant does not exist in the call.',
        CAN_NOT_LOG_IN: 'We can’t log you in. Try refreshing your browser, or ask your Salesforce admin for help.',
        INVALID_PARAMS: 'We can’t log you in. Tell your Salesforce admin to check the Instance URL, Relay State, and Identity URL parameters in the Call Center settings.',
        CAN_NOT_GET_PHONE_CONTACTS: 'We can’t get the phone contacts, please try later.',
        CAN_NOT_SWAP_PARTICIPANTS: 'We can’t swap the participants. Try refreshing your browser, or ask your Salesforce admin for help.',
        CAN_NOT_JOIN_PARTICIPANTS: 'We can’t join the participants. Try refreshing your browser, or ask your Salesforce admin for help.',
        INVALID_DESTINATION: 'We can’t transfer to the given address. Refresh your list of addresses and try again.',
        INVALID_PHONE_NUMBER: 'Problem transferring to the given phone number. Try again with a valid phone number.',
        CAN_NOT_HANGUP_PARTICIPANT: 'Invalid participant. We can’t end the call for the given participant.',
        CAN_NOT_ADD_PARTICIPANT: 'We can’t Transfer to the given destination. There was an error.',
        CAN_NOT_START_THE_CALL: 'We can’t complete the call. Check the phone number and try again.'
    },
    AGENT_STATUS: {
        ONLINE: 'Online',
        OFFLINE: 'Offline',
        ACW : 'AfterCallWork'
    },
    PARTICIPANT_TYPE: {
        AGENT: "Agent",
        INITIAL_CALLER: "Initial_Caller",
        THIRD_PARTY: "Third_Party"
    },
    CALL_TYPE: {
        INBOUND: "Inbound",
        OUTBOUND: "Outbound",
        TRANSFER: "Transfer"
    },
    FAILURE_TYPE: {
        NETWORKING_ERROR: "NetworkingError",
        BAD_ENDPOINT_EXCEPTION: "BadEndpointException"
    }
}

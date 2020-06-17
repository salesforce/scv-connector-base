import constants from '../main/constants';

export default {
    ...constants,
    MESSAGE_TYPE: {
        ...constants.MESSAGE_TYPE,
        DONT_SETUP_CONNECTOR: 'DONT_SETUP_CONNECTOR',
        CALL_IN_PROGRESS: 'CALL_IN_PROGRESS',
        INVALID_CALL: 'INVALID_CALL'
    },
    GENERIC_ERROR_KEY: 'GENERIC_ERROR',
    INVALID_ERROR_KEY: 'INVALID_ERROR',
    OPTIONAL_ERROR: 'OPTIONAL_ERROR',
    CONNECTOR_CONFIG: 'CONNECTOR_CONFIG'
};

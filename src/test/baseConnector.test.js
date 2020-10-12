import { initializeConnector, dispatchEvent, isConnectorReady, setConnectorReady, dispatchError } from '../main/index';
import Constants from '../main/constants';

const constants = {
    ...Constants,
    MESSAGE_TYPE: {
        ...Constants.MESSAGE_TYPE,
        DONT_SETUP_CONNECTOR: 'DONT_SETUP_CONNECTOR',
        CALLS_IN_PROGRESS: 'CALLS_IN_PROGRESS',
        INVALID_CALL: 'INVALID_CALL'
    },
    GENERIC_ERROR_KEY: 'GENERIC_ERROR',
    AGENT_ERROR_KEY: 'AGENT_ERROR',
    OPTIONAL_ERROR: 'OPTIONAL_ERROR',
    CONNECTOR_CONFIG: 'CONNECTOR_CONFIG',
    CONTAINER: 'CONTAINER'
}

describe('SCV Connector Base tests', () => {
    const adapter = {
        init: jest.fn(),
        acceptCall: jest.fn(),
        declineCall: jest.fn(),
        endCall: jest.fn(),
        mute: jest.fn(),
        unmute: jest.fn(),
        hold: jest.fn(),
        resume: jest.fn(),
        setAgentStatus: jest.fn(),
        dial: jest.fn(),
        sendDigits: jest.fn(),
        getPhoneContacts: jest.fn(),
        swap: jest.fn(),
        conference: jest.fn(),
        addParticipant: jest.fn(),
        getActiveCalls : jest.fn().mockReturnValueOnce(constants.MESSAGE_TYPE.CALLS_IN_PROGRESS),
        pauseRecording: jest.fn(),
        resumeRecording: jest.fn(),
        getCapabilities: jest.fn(),
        logout: jest.fn(),
        handleMessage:jest.fn()
    };
    const eventMap = {};
    const call = "call";
    const transferCall = "transfer";
    const calls = [call, call];
    const channelPort = {};
    const fireMessage = (type, args) => {
        channelPort.onmessage(args ? {
            data: {
                type,
                ...args
            }
        } : {data: {type}});
    };
    const message = {
        data: {
            type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
            connectorConfig: constants.CONNECTOR_CONFIG
        },
        ports: [channelPort]
    };
    const messagePayload = {text : "test"};
    beforeAll(() => {
        window.addEventListener = jest.fn((event, cb) => {
            eventMap[event] = cb;
        });
    });

    beforeEach(() => {
        initializeConnector(() => adapter);
    });

    describe('SCV Connector Base init tests', () => {
        it('Should NOT dispatch init to the vendor after wrong initialization', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.DONT_SETUP_CONNECTOR,
                    connectorConfig: constants.CONNECTOR_CONFIG
                },
                ports: [channelPort]
            };

            eventMap['message'](message);
            expect(adapter.init).not.toHaveBeenCalled();
        });

        it('Should dispatch init to the vendor after initialization', () => {
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
        });
    });

    describe('SCV Connector Base event tests', () => {
        beforeEach(() => {
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
        });

        it('Should NOT dispatch invalid call to the vendor', () => {
            expect(() => fireMessage(constants.MESSAGE_TYPE.INVALID_CALL)).not.toThrowError();
        });

        it('Should dispatch acceptCall to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
            expect(adapter.acceptCall).toHaveBeenCalled();
        });
    
        it('Should dispatch declineCall to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.DECLINE_CALL);
            expect(adapter.declineCall).toHaveBeenCalled();
        });
    
        it('Should dispatch endCall to the vendor', () => {
            const agentStatus = 'agentStatus';
            fireMessage(constants.MESSAGE_TYPE.END_CALL, { call, agentStatus });
            expect(adapter.endCall).toHaveBeenCalledWith(call, agentStatus);
        });
    
        it('Should dispatch mute to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.MUTE);
            expect(adapter.mute).toHaveBeenCalled();
        });
    
        it('Should dispatch unmute to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.UNMUTE);
            expect(adapter.unmute).toHaveBeenCalled();
        });
    
        it('Should dispatch hold to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.HOLD, { call });
            expect(adapter.hold).toHaveBeenCalledWith(call);
        });
    
        it('Should dispatch resume to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.RESUME, { call });
            expect(adapter.resume).toHaveBeenCalledWith(call);
        });
    
        it('Should dispatch setAgentStatus to the vendor', () => {
            const agentStatus = 'agentStatus';
            fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS, { agentStatus });
            expect(adapter.setAgentStatus).toHaveBeenCalledWith(agentStatus);
        });
    
        it('Should dispatch dial to the vendor', () => {
            const contact = 'contact';
            fireMessage(constants.MESSAGE_TYPE.DIAL, { contact });
            expect(adapter.dial).toHaveBeenCalledWith(contact);
        });
    
        it('Should dispatch sendDigits to the vendor', () => {
            const digits = 'digits';
            fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS, { digits });
            expect(adapter.sendDigits).toHaveBeenCalledWith(digits);
        });
    
        it('Should dispatch getPhoneContacts to the vendor', () => {
            const filter = 'filter';
            fireMessage(constants.MESSAGE_TYPE.GET_PHONE_CONTACTS, { filter });
            expect(adapter.getPhoneContacts).toHaveBeenCalledWith(filter);
        });
    
        it('Should dispatch swapCallParticipants to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS, {  callToHold: transferCall, callToResume:  call });
            expect(adapter.swap).toHaveBeenCalledWith(transferCall, call);
        });

        it('Should dispatch conference to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.CONFERENCE, { calls });
            expect(adapter.conference).toHaveBeenCalledWith(calls);
        });

        it('Should dispatch addParticipant to the vendor', () => {
            const contact = 'contact';
            fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact, call });
            expect(adapter.addParticipant).toHaveBeenCalledWith(contact, call);
        });
    
        it('Should dispatch pause recording to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING, { call });
            expect(adapter.pauseRecording).toHaveBeenCalledWith(call);
        });

        it('Should dispatch resume recording to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING, { call });
            expect(adapter.resumeRecording).toHaveBeenCalledWith(call);
        });

        it('Should dispatch get capabilities to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.GET_CAPABILITIES);
            expect(adapter.getCapabilities).toHaveBeenCalled();
        });

        it('Should dispatch logout to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.LOGOUT);
            expect(adapter.logout).toHaveBeenCalled();
        });

        it('Should set connectorReady & dispatch connectorReady to the vendor', () => {
            channelPort.postMessage = jest.fn().mockImplementationOnce(({ type, payload }) => {
                expect(type).toEqual(constants.MESSAGE_TYPE.CONNECTOR_READY);
                expect(payload).toEqual({ callInProgress: constants.MESSAGE_TYPE.CALLS_IN_PROGRESS });
            });
            setConnectorReady();
            expect(isConnectorReady()).toBe(true);
        });

        it('Should dispatch handle message to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.MESSAGE,{message : messagePayload});
            expect(adapter.handleMessage).toHaveBeenCalledWith(messagePayload);
        });
    });

    describe('Telephony event emitter tests', () => {
        it('Should dispatchError for all error messages', () => {
            Object.keys(constants.ERROR_TYPE).forEach((errorType) => {
                channelPort.postMessage = jest.fn().mockImplementationOnce(({ type, payload }) => {
                    expect(type).toEqual(constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED);
                    expect(payload).toEqual({ telephonyEventType: constants.EVENT_TYPE.ERROR, telephonyEventPayload: {
                        message: constants.ERROR_TYPE[errorType]
                    }});
                });
                dispatchError(errorType);
            });
        });
    
        it('Should throw optional error on dispatchError', () => {
            expect(() => {
                dispatchError(constants.GENERIC_ERROR_KEY, constants.OPTIONAL_ERROR)
            }).toThrowError(constants.OPTIONAL_ERROR);
        });
    
        it('Should throw generic error on any other type of error in dispatchError', () => {
            channelPort.postMessage = jest.fn().mockImplementationOnce(({ type, payload }) => {
                expect(type).toEqual(constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED);
                expect(payload).toEqual({ telephonyEventType: constants.EVENT_TYPE.ERROR, telephonyEventPayload: {
                    message: constants.ERROR_TYPE.GENERIC_ERROR
                }});
            });
            expect(() => {
                dispatchError('DUMMY_KEY')
            }).not.toThrowError(constants.OPTIONAL_ERROR);
        });
    
        it('Should fire event for all event types', ()  => {
            const samplePayload = { field1 : 'value1', field2 : 'value2' };
            Object.keys(constants.EVENT_TYPE).forEach((eventType) => {
                channelPort.postMessage = jest.fn().mockImplementationOnce(({ type, payload }) => {
                    expect(type).toEqual(constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED);
                    expect(payload).toEqual({ telephonyEventType: eventType, telephonyEventPayload: samplePayload });
                });
                expect(() => {
                    dispatchEvent(eventType, samplePayload);
                }).not.toThrowError();
            });
        });
    
        it('Should throw error on unsupported event', () => {
            expect(() => dispatchEvent(constants.MESSAGE_TYPE.INVALID_CALL)).toThrowError(`Unsupported event name: ${constants.MESSAGE_TYPE.INVALID_CALL}`);
        });
    });
});
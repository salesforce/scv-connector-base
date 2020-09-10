import { initializeConnector, dispatchEvent, isConnectorReady, setConnectorReady, getTelephonyEventEmitter, dispatchError } from '../main/index';
import constants from './testConstants';

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
        swapCallParticipants: jest.fn(),
        joinCallParticipants: jest.fn(),
        transfer: jest.fn(),
        getCallInProgress: jest.fn().mockReturnValueOnce(constants.MESSAGE_TYPE.CALL_IN_PROGRESS),
        pauseRecording: jest.fn(),
        resumeRecording: jest.fn(),
        getCapabilities: jest.fn(),
        logout: jest.fn()
    };
    const eventMap = {};
    const participant = "participant";
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

        it('Should dispatch hold to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.HOLD, { participant });
            expect(adapter.hold).toHaveBeenCalledWith(participant);
        });
    
        it('Should dispatch resume to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.RESUME, { participant });
            expect(adapter.resume).toHaveBeenCalledWith(participant);
        });
    
        it('Should dispatch setAgentStatus to the vendor', () => {
            const agentStatus = 'agentStatus';
            fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS, { agentStatus });
            expect(adapter.setAgentStatus).toHaveBeenCalledWith(agentStatus);
        });
    
        it('Should dispatch dial to the vendor', () => {
            const callee = 'callee';
            fireMessage(constants.MESSAGE_TYPE.DIAL, { callee });
            expect(adapter.dial).toHaveBeenCalledWith(callee);
        });
    
        it('Should dispatch sendDigits to the vendor', () => {
            const digits = 'digits';
            fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS, { digits });
            expect(adapter.sendDigits).toHaveBeenCalledWith(digits);
        });
    
        it('Should dispatch getPhoneContacts to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.GET_PHONE_CONTACTS);
            expect(adapter.getPhoneContacts).toHaveBeenCalled();
        });
    
        it('Should dispatch swapCallParticipants to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS, {  callToHold: transferCall, callToResume:  call });
            expect(adapter.swapCallParticipants).toHaveBeenCalledWith(transferCall, call);
        });
    
        it('Should dispatch joinCallParticipants to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.JOIN_PARTICIPANTS, { calls });
            expect(adapter.joinCallParticipants).toHaveBeenCalledWith(calls);
        });

        it('Should dispatch conference to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.CONFERENCE, { calls });
            expect(adapter.joinCallParticipants).toHaveBeenCalledWith(calls);
        });
    
        it('Should dispatch transfer to the vendor', () => {
            const destination = 'destination';
            fireMessage(constants.MESSAGE_TYPE.TRANSFER, { destination, call });
            expect(adapter.transfer).toHaveBeenCalledWith(destination, call);
        });

        it('Should dispatch addParticipant to the vendor', () => {
            const destination = 'destination';
            fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { destination, call });
            expect(adapter.transfer).toHaveBeenCalledWith(destination, call);
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
                expect(payload).toEqual({ callInProgress: constants.MESSAGE_TYPE.CALL_IN_PROGRESS });
            });
            setConnectorReady();
            expect(isConnectorReady()).toBe(true);
        });
    });
});

describe('Telephony Event emitter tests', () => {
    const errorMap = {};
    const listener = jest.fn();
    const payload = { field1 : 'value1', field2 : 'value2' };

    beforeAll(() => {
        expect(getTelephonyEventEmitter()).not.toBeNull();
        getTelephonyEventEmitter().on(constants.EVENT_TYPE.ERROR, (args) => {
            for (const [key, value] of Object.entries(constants.ERROR_TYPE)) {
                if (value === args.message) {
                    errorMap[key] = true;
                    break;
                }
            }
        });
    });

    it('Should dispatchError for all error messages', () => {
        for (const [key] of Object.entries(constants.ERROR_TYPE)) {
            dispatchError(key);
            expect(errorMap[key]).toBe(true);
        }

        // Throw Generic for any other error
        // Reset generic error
        errorMap[constants.GENERIC_ERROR_KEY] = false;
        errorMap[constants.INVALID_ERROR_KEY] = false;
        dispatchError(constants.INVALID_ERROR_KEY);
        expect(errorMap[constants.INVALID_ERROR_KEY]).toBe(false);
        expect(errorMap[constants.GENERIC_ERROR_KEY]).toBe(true);
    });

    it('Should throw optional error on dispatchError', () => {
        expect(() => {
            dispatchError(constants.GENERIC_ERROR_KEY, constants.OPTIONAL_ERROR)
        }).toThrowError(constants.OPTIONAL_ERROR);
        expect(errorMap[constants.GENERIC_ERROR_KEY]).toBe(true);
    });

    it('Should fire event for all whitelisted event types', ()  => {
        var fireCnt = 0;
        Object.values(constants.EVENT_TYPE).forEach((eventType) => {
            expect(() => {
                getTelephonyEventEmitter().on(eventType, listener);
                dispatchEvent(eventType, payload);
                fireCnt++;
            }).not.toThrowError();
            expect(listener).toBeCalledTimes(fireCnt);
            expect(listener).toBeCalledWith(payload);
            getTelephonyEventEmitter().removeListener(eventType, listener);
        });
    });

    it('Should throw error on unsupported event', () => {
        expect(() => dispatchEvent(constants.MESSAGE_TYPE.INVALID_CALL)).toThrowError(`Unsupported event name: ${constants.MESSAGE_TYPE.INVALID_CALL}`);
    });

});
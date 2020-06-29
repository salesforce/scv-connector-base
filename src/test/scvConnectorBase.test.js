import { initializeConnector, dispatchEvent, isConnectorReady, setConnectorReady, getTelephonyEventEmitter, dispatchError, CrossWindowTelephonyEventTypes } from '../main/index';
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
        getLoginSettings: jest.fn(),
        login: jest.fn(),
        getCallInProgress: jest.fn().mockReturnValueOnce(constants.MESSAGE_TYPE.CALL_IN_PROGRESS),
        pauseRecording: jest.fn(),
        resumeRecording: jest.fn()
    };
    const eventMap = {};
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
            const participant = 'participant';
            const agentStatus = 'agentStatus';
            fireMessage(constants.MESSAGE_TYPE.END_CALL, { participant, agentStatus });
            expect(adapter.endCall).toHaveBeenCalledWith(participant, agentStatus);
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
            const participant = 'participant';
            fireMessage(constants.MESSAGE_TYPE.HOLD, { participant });
            expect(adapter.hold).toHaveBeenCalledWith(participant);
        });
    
        it('Should dispatch resume to the vendor', () => {
            const participant = 'participant';
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
            fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
            expect(adapter.swapCallParticipants).toHaveBeenCalled();
        });
    
        it('Should dispatch joinCallParticipants to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.JOIN_PARTICIPANTS);
            expect(adapter.joinCallParticipants).toHaveBeenCalled();
        });
    
        it('Should dispatch transfer to the vendor', () => {
            const destination = 'destination';
            fireMessage(constants.MESSAGE_TYPE.TRANSFER, { destination });
            expect(adapter.transfer).toHaveBeenCalledWith(destination);
        });
    
        it('Should dispatch getLoginSettings to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.GET_LOGIN_SETTINGS);
            expect(adapter.getLoginSettings).toHaveBeenCalled();
        });
    
        it('Should dispatch login to the vendor', () => {
            const credentials = 'credentials';
            fireMessage(constants.MESSAGE_TYPE.LOGIN, { credentials });
            expect(adapter.login).toHaveBeenCalledWith(credentials);
        });
    
        it('Should dispatch pause recording to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
            expect(adapter.pauseRecording).toHaveBeenCalled();
        });

        it('Should dispatch resume recording to the vendor', () => {
            fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
            expect(adapter.resumeRecording).toHaveBeenCalled();
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
        CrossWindowTelephonyEventTypes.forEach((eventType) => {
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

});
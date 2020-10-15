import { initializeConnector, Constants, publishEvent } from '../main/index';
import { ActiveCallsResult, InitResult, CallResult, HoldToggleResult, GenericResult, PhoneContactsResult, MuteToggleResult,
    ConferenceResult, ParticipantResult, RecordingToggleResult, CapabilitiesResult, ParticipantRemovedResult,
    Contact, PhoneCall } from '../main/types';
import baseConstants from '../main/constants';

const constants = {
    ...baseConstants,
    MESSAGE_TYPE: {
        ...baseConstants.MESSAGE_TYPE,
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

const loginFrameHeight = 300;
const invalidResult = {};
const dummyPhoneCall = new PhoneCall({ callId: 'callId', callType: 'inbound', state: 'state', callAttributes: {}, phoneNumber: '100'});
const initResult_showLogin = new InitResult({ showLogin: true, loginFrameHeight });
const initResult_connectorReady = new InitResult({ showLogin: false, loginFrameHeight });
const activeCallsResult = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall ] });
const callResult = new CallResult({ call: dummyPhoneCall });
const muteToggleResult = new MuteToggleResult({ isMuted: true });
const unmuteToggleResult = new MuteToggleResult({ isMuted: false });
const calls = [dummyPhoneCall];
const isThirdPartyOnHold = false;
const isCustomerOnHold = true;
const holdToggleResult = new HoldToggleResult({ isThirdPartyOnHold, isCustomerOnHold, calls });
const success = true;
const genericResult = new GenericResult({ success });
const contacts = [ new Contact({}) ];
const phoneContactsResult = new PhoneContactsResult({ contacts });
const conferenceResult = new ConferenceResult({ isThirdPartyOnHold: false, isCustomerOnHold: false });
const dummyPhoneNumber = 'dummyPhoneNumber';
const participantResult = new ParticipantResult({ initialCallHasEnded: true, callInfo: null, phoneNumber: dummyPhoneNumber });
const isRecordingPaused = true;
const contactId = 'contactId';
const initialContactId = 'initialContactId';
const instanceId = 'instanceId';
const region = 'region';
const recordingToggleResult = new RecordingToggleResult({ isRecordingPaused, contactId, initialContactId, instanceId, region });
const hasMute = false;
const hasHold = true;
const hasRecord = false;
const hasMerge = true;
const capabilitiesResult = new CapabilitiesResult({ hasMute, hasHold, hasRecord, hasMerge });
const dummyReason = 'reason';
const participantRemovedResult = new ParticipantRemovedResult({ reason: dummyReason });

describe('SCVConnectorBase tests', () => {
    const adapter = {
        init: jest.fn().mockResolvedValue(initResult_connectorReady),
        acceptCall: jest.fn().mockResolvedValue(callResult),
        declineCall: jest.fn().mockResolvedValue(callResult),
        endCall: jest.fn().mockResolvedValue({}),
        mute: jest.fn().mockResolvedValue(muteToggleResult),
        unmute: jest.fn().mockResolvedValue(unmuteToggleResult),
        hold: jest.fn().mockResolvedValue(holdToggleResult),
        resume: jest.fn().mockResolvedValue(holdToggleResult),
        setAgentStatus: jest.fn().mockResolvedValue(genericResult),
        dial: jest.fn().mockResolvedValue(callResult),
        sendDigits: jest.fn().mockResolvedValue({}),
        getPhoneContacts: jest.fn().mockResolvedValue(phoneContactsResult),
        swap: jest.fn().mockResolvedValue(holdToggleResult),
        conference: jest.fn().mockResolvedValue(conferenceResult),
        addParticipant: jest.fn().mockResolvedValue(participantResult),
        getActiveCalls : jest.fn().mockResolvedValue(activeCallsResult),
        pauseRecording: jest.fn().mockResolvedValue(recordingToggleResult),
        resumeRecording: jest.fn().mockResolvedValue(recordingToggleResult),
        getCapabilities: jest.fn().mockResolvedValue(capabilitiesResult),
        logout: jest.fn().mockResolvedValue(genericResult),
        handleMessage: jest.fn()
    };
    const eventMap = {};
    const channelPort = {
        postMessage: jest.fn()
    };
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

    const assertChannelPortPayload = ({ eventType, payload }) => {
        expect(channelPort.postMessage).toHaveBeenCalledWith({
            type: constants.MESSAGE_TYPE.TELEPHONY_EVENT_DISPATCHED,
            payload: {
                telephonyEventType: eventType,
                telephonyEventPayload: payload
            }
        });
    }

    beforeAll(() => {
        window.addEventListener = (event, cb) => {
            eventMap[event] = cb;
        };
    });

    beforeEach(() => {
        initializeConnector(() => adapter);
    });

    describe('SCVConnectorBase initialization tests', () => {
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

        it('Should dispatch error after invalid initialization result', async () => {
            adapter.init = jest.fn().mockResolvedValue(invalidResult);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
            }});
        });

        it('Should dispatch SHOW_LOGIN after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_showLogin);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_showLogin);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SHOW_LOGIN, payload: {
                loginFrameHeight
            }});
        });

        it('Should dispatch CONNECTOR_READY after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    callInProgress: activeCallsResult.activeCalls
                }
            });
        });

        it('Should NOT dispatch invalid call to the vendor', () => {
            expect(() => fireMessage(constants.MESSAGE_TYPE.INVALID_CALL)).not.toThrowError();
            expect(channelPort.postMessage).not.toHaveBeenCalledWith();
        });
    });

    describe('SCVConnectorBase event tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    callInProgress: activeCallsResult.activeCalls
                }
            });
        });

        describe('acceptCall()', () => {
            it('Should dispatch CAN_NOT_ACCEPT_THE_CALL on a failed acceptCall() invocation', async () => {
                adapter.acceptCall = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
                await expect(adapter.acceptCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL
                }});
            });

            it('Should dispatch CALL_CONNECTED on a successful acceptCall() invocation', async () => {
                adapter.acceptCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
                await expect(adapter.acceptCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
            });
        });

        describe('declineCall()', () => {
            it('Should dispatch CAN_NOT_DECLINE_THE_CALL on a failed declineCall() invocation', async () => {
                adapter.declineCall = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.DECLINE_CALL);
                await expect(adapter.declineCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL
                }});
            });

            it('Should dispatch HANGUP on a successful declineCall() invocation', async () => {
                adapter.declineCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.DECLINE_CALL);
                await expect(adapter.declineCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HANGUP, payload: callResult.call });
            });
        });

        describe('endCall()', () => {
            it('Should NOT dispatch HANGUP on a failed endCall() invocation', async () => {
                const error = 'error';
                adapter.endCall = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).rejects.toBe(error);
            });

            it('Should dispatch HANGUP on a successful endCall() invocation', async () => {
                adapter.endCall = jest.fn().mockResolvedValue({});
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).resolves.not.toThrow();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HANGUP });
            });
        });

        describe('mute()', () => {
            it('Should dispatch CAN_NOT_MUTE_CALL on a failed mute() invocation', async () => {
                const error = 'error';
                adapter.mute = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.MUTE);
                await expect(adapter.mute()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_MUTE_CALL
                }});
            });

            it('Should dispatch MUTE_TOGGLE on a successful mute() invocation', async () => {
                adapter.mute = jest.fn().mockResolvedValue(muteToggleResult);
                fireMessage(constants.MESSAGE_TYPE.MUTE);
                const result = await adapter.mute();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload: {
                    isMuted: result.isMuted
                }});
            });
        });

        describe('unmute()', () => {
            it('Should dispatch CAN_NOT_UNMUTE_CALL on a failed unmute() invocation', async () => {
                const error = 'error';
                adapter.unmute = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.UNMUTE);
                await expect(adapter.unmute()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL
                }});
            });

            it('Should dispatch MUTE_TOGGLE on a successful unmute() invocation', async () => {
                adapter.unmute = jest.fn().mockResolvedValue(unmuteToggleResult);
                fireMessage(constants.MESSAGE_TYPE.UNMUTE);
                const result = await adapter.unmute();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload: {
                    isMuted: result.isMuted
                }});
            });
        });

        describe('hold()', () => {
            it('Should dispatch CAN_NOT_HOLD_CALL on a failed hold() invocation', async () => {
                adapter.hold = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HOLD_CALL
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful hold() invocation', async () => {
                adapter.hold = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).resolves.toBe(holdToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload: {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                } });
            });
        });

        describe('resume()', () => {
            it('Should dispatch CAN_NOT_RESUME_CALL on a failed hold() invocation', async () => {
                adapter.resume = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_RESUME_CALL
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful hold() invocation', async () => {
                adapter.resume = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).resolves.toBe(holdToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload: {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                } });
            });
        });

        describe('setAgentStatus()', () => {
            it('Should dispatch CAN_NOT_RESUME_CALL on a failed setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS
                }});
            });

            it('Should dispatch SET_AGENT_STATUS_RESULT on a successful setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, payload: {
                    success: genericResult.success
                }});
            });
        });

        describe('dial()', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on a failed dial() invocation', async () => {
                adapter.dial = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL);
                await expect(adapter.dial()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });

            it('Should dispatch CALL_STARTED on a successful dial() invocation', async () => {
                adapter.dial = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL);
                await expect(adapter.dial()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call});
            });
        });

        describe('getPhoneContacts()', () => {
            it('Should dispatch CAN_NOT_GET_PHONE_CONTACTS on a failed getPhoneContacts() invocation', async () => {
                adapter.getPhoneContacts = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.GET_PHONE_CONTACTS);
                await expect(adapter.getPhoneContacts()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS
                }});
            });

            it('Should dispatch PHONE_CONTACTS on a successful getPhoneContacts() invocation', async () => {
                adapter.getPhoneContacts = jest.fn().mockResolvedValue(phoneContactsResult);
                fireMessage(constants.MESSAGE_TYPE.GET_PHONE_CONTACTS);
                await expect(adapter.getPhoneContacts()).resolves.toBe(phoneContactsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PHONE_CONTACTS, payload: phoneContactsResult.contacts });
            });
        });

        describe('sendDigits()', () => {
            it('Should be able to invoke sendDigits()', async () => {
                fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS);
                await expect(adapter.sendDigits()).resolves.not.toThrow();
            });
        });

        describe('swap()', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed conference() invocation', async () => {
                adapter.swap = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful conference() invocation', async () => {
                adapter.swap = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).resolves.toBe(holdToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload: {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                }});
            });
        });

        describe('conference()', () => {
            it('Should dispatch CAN_NOT_CONFERENCE on a failed conference() invocation', async () => {
                adapter.conference = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful conference() invocation', async () => {
                adapter.conference = jest.fn().mockResolvedValue(conferenceResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).resolves.toBe(conferenceResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload: {
                    isThirdPartyOnHold: conferenceResult.isThirdPartyOnHold,
                    isCustomerOnHold: conferenceResult.isCustomerOnHold
                }});
            });
        });

        describe('addParticipant()', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on a failed addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT);
                await expect(adapter.addParticipant()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockResolvedValue(participantResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT);
                await expect(adapter.addParticipant()).resolves.toBe(participantResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber
                }});
            });
        });

        describe('pauseRecording()', () => {
            it('Should dispatch CAN_NOT_PAUSE_RECORDING on a failed pauseRecording() invocation', async () => {
                adapter.pauseRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful pauseRecording() invocation', async () => {
                adapter.pauseRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).resolves.toBe(recordingToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload: {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                }});
            });
        });

        describe('resumeRecording()', () => {
            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed resumeRecording() invocation', async () => {
                adapter.resumeRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING
                }});
            });

            it('Should dispatch RECORDING_TOGGLE on a successful resumeRecording() invocation', async () => {
                adapter.resumeRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).resolves.toBe(recordingToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload: {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                }});
            });
        });

        describe('getCapabilities()', () => {
            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed getCapabilities() invocation', async () => {
                adapter.getCapabilities = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.GET_CAPABILITIES);
                await expect(adapter.getCapabilities()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_GET_CAPABILITIES
                }});
            });

            it('Should dispatch CAPABILITIES on a successful getCapabilities() invocation', async () => {
                adapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
                fireMessage(constants.MESSAGE_TYPE.GET_CAPABILITIES);
                await expect(adapter.getCapabilities()).resolves.toBe(capabilitiesResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CAPABILITIES, payload: {
                    [constants.CAPABILITY_TYPE.MUTE] : capabilitiesResult.hasMute,
                    [constants.CAPABILITY_TYPE.HOLD] : capabilitiesResult.hasHold,
                    [constants.CAPABILITY_TYPE.RECORD] : capabilitiesResult.hasRecord,
                    [constants.CAPABILITY_TYPE.MERGE] : capabilitiesResult.hasMerge
                }});
            });
        });

        describe('logout()', () => {
            it('Should dispatch CAN_NOT_LOG_OUT on a failed logout() invocation', async () => {
                adapter.logout = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.LOGOUT);
                await expect(adapter.logout()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_OUT
                }});
            });

            it('Should dispatch LOGOUT_RESULT on a successful logout() invocation', async () => {
                adapter.logout = jest.fn().mockResolvedValue(genericResult);
                fireMessage(constants.MESSAGE_TYPE.LOGOUT);
                await expect(adapter.logout()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.LOGOUT_RESULT, payload: {
                    success: genericResult.success
                }});
            });
        });

        describe('handleMessage()', () => {
            it('Should dispatch message on handleMessage() invocation', async () => {
                const message = { message: 'message'};
                fireMessage(constants.MESSAGE_TYPE.MESSAGE, message);
                expect(adapter.handleMessage).toBeCalledWith('message');
            });
        });
    });

    describe('SCVConnectorBase publish event tests', () => {
        describe('LOGIN_RESULT event', () => {
            it('Should dispatch CAN_NOT_LOG_IN on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
                }});
            });
    
            it('Should dispatch LOGIN_RESULT on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: {
                    success: genericResult.success
                } });
            });
        });

        describe('LOGOUT event', () => {
            it('Should dispatch CAN_NOT_LOG_OUT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_OUT
                }});
            });
    
            it('Should dispatch LOGOUT_RESULT on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, payload: genericResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, payload: {
                    success: genericResult.success
                } });
            });
        });

        describe('CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
    
            it('Should dispatch CALL_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call });
            });
        });

        describe('CALL_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
    
            it('Should dispatch CALL_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
            });
        });

        describe('HANGUP event', () => {
            it('Should dispatch CAN_NOT_END_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.HANGUP, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL
                }});
            });
    
            it('Should dispatch HANGUP on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callResult.call });
            });
        });

        describe('PARTICIPANT_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_CONNECT_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT
                }});
            });
    
            it('Should dispatch PARTICIPANT_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: participantResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber
                } });
            });
        });

        describe('PARTICIPANT_REMOVED event', () => {
            it('Should dispatch CAN_NOT_HANGUP_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT
                }});
            });
    
            it('Should dispatch PARTICIPANT_REMOVED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: participantRemovedResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: {
                    reason: participantRemovedResult.reason
                }});
            });
        });

        describe('MESSAGE event', () => {
            it('Should dispatch MESSAGE on a payload', async () => {
                const message = { message: 'message' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.MESSAGE, payload: message });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.MESSAGE, payload: message });
            });
        });

        describe('REMOTE_CONTROLLER event', () => {
            it('Should call channelMessageHandler with payload', async () => {
                const message = { data: {
                    type: constants.MESSAGE_TYPE.ACCEPT_CALL
                }};
                adapter.acceptCall = jest.fn().mockResolvedValue(invalidResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.REMOTE_CONTROLLER, payload: message });
                await expect(adapter.acceptCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL
                }});
            });
        });
    });
});
import { initializeConnector, Constants, publishEvent, publishError, isAgentAvailable } from '../main/index';
import { ActiveCallsResult, InitResult, CallResult, HoldToggleResult, GenericResult, PhoneContactsResult, MuteToggleResult,
    ParticipantResult, RecordingToggleResult,
    Contact, PhoneCall, CallInfo, VendorConnector, ErrorResult, AgentConfigResult, Phone, HangupResult } from '../main/types';
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

global.console.error = jest.fn(); //do not print console.error from dispatchError
const loginFrameHeight = 300;
const invalidResult = {};
const dummyPhoneNumber = '123456789';
const dummyCallId = 'callId'
const dummyContact = new Contact({ phoneNumber: dummyPhoneNumber });
const dummyCallInfo = new CallInfo({ isOnHold: false });
const dummyPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100'});
const dummyRingingPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.RINGING, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyConnectedPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const thirdPartyRemovedResult = new CallResult({ call: new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.ADD_PARTICIPANT, reason: dummyReason, state: 'state', callAttributes: { participantType: constants.PARTICIPANT_TYPE.THIRD_PARTY }, phoneNumber: '100'}) }); 
const initialCallerRemovedResult = new CallResult({ call: new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.ADD_PARTICIPANT, reason: dummyReason, state: 'state', callAttributes: { participantType: constants.PARTICIPANT_TYPE.INITIAL_CALLER }, phoneNumber: '100'}) }); 
const dummyTransferringCall = new PhoneCall({ callId: 'callId', callType: constants.CALL_TYPE.ADD_PARTICIPANT, contact: dummyContact, state: constants.CALL_STATE.TRANSFERRING, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyTransferredCall = new PhoneCall({ callId: 'dummyCallId', callType: constants.CALL_TYPE.ADD_PARTICIPANT, contact: dummyContact, state: constants.CALL_STATE.TRANSFERRED, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyActiveTransferringCallResult = new ActiveCallsResult({ activeCalls: [dummyTransferringCall] });
const dummyTransferringPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.TRANSFERRING, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyTransferredPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.TRANSFERRED, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyReason = 'dummyReason';
const dummyCloseCallOnError = true;
const dummyIsOmniSoftphone = true;
const dummyCallType = constants.CALL_TYPE.OUTBOUND;
const dummyAgentStatus = 'dummyAgentStatus';
const initResult_showLogin = new InitResult({ showLogin: true, loginFrameHeight });
const initResult_connectorReady = new InitResult({ showLogin: false, loginFrameHeight });
const emptyActiveCallsResult = new ActiveCallsResult({ activeCalls: [] });
const activeCallsResult = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall ] });
const activeCallsResult1 = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall, dummyRingingPhoneCall, dummyConnectedPhoneCall, dummyTransferringPhoneCall, dummyTransferredPhoneCall ] });
const callResult = new CallResult({ call: dummyPhoneCall });
const callHangUpResult = new HangupResult({ calls: [new PhoneCall({ reason: dummyReason, callId: dummyCallId, closeCallOnError: dummyCloseCallOnError, callType: dummyCallType, agentStatus: dummyAgentStatus, isOmniSoftphone: dummyIsOmniSoftphone })]});
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
const participantResult = new ParticipantResult({ initialCallHasEnded: true, callInfo: dummyCallInfo, phoneNumber: dummyPhoneNumber, callId: dummyCallId });
const isRecordingPaused = true;
const contactId = 'contactId';
const initialContactId = 'initialContactId';
const instanceId = 'instanceId';
const region = 'region';
const recordingToggleResult = new RecordingToggleResult({ isRecordingPaused, contactId, initialContactId, instanceId, region });
const hasMute = false;
const hasRecord = false;
const hasMerge = true;
const hasSwap = true;
const phones = ["DESK_PHONE", "SOFT_PHONE"];
const selectedPhone = new Phone({type: "DESK_PHONE", number: "555 888 3345"});
const agentConfigResult = new AgentConfigResult({ hasMute, hasRecord, hasMerge, hasSwap, phones, selectedPhone});
const agentConfigPayload = {
    [constants.AGENT_CONFIG_TYPE.MUTE] : agentConfigResult.hasMute,
    [constants.AGENT_CONFIG_TYPE.RECORD] : agentConfigResult.hasRecord,
    [constants.AGENT_CONFIG_TYPE.MERGE] : agentConfigResult.hasMerge,
    [constants.AGENT_CONFIG_TYPE.SWAP] : agentConfigResult.hasSwap,
    [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
    [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone
}
const dummyActiveTransferredallResult = new ActiveCallsResult({ activeCalls: [dummyTransferredCall] });
const selectPhonePayload = {type: "DESK_PHONE", number: "555 888 3345"};
const dummyStatusInfo = {statusId: 'dummyStatusId', statusApiName: 'dummyStatusApiName', statusName: 'dummyStatusName'};

describe('SCVConnectorBase tests', () => {
    class DemoAdapter extends VendorConnector {}

    DemoAdapter.prototype.init = jest.fn().mockResolvedValue(initResult_connectorReady);
    DemoAdapter.prototype.acceptCall = jest.fn().mockResolvedValue(callResult);
    DemoAdapter.prototype.declineCall = jest.fn().mockResolvedValue(callResult);
    DemoAdapter.prototype.endCall = jest.fn().mockResolvedValue();
    DemoAdapter.prototype.mute = jest.fn().mockResolvedValue(muteToggleResult);
    DemoAdapter.prototype.unmute = jest.fn().mockResolvedValue(unmuteToggleResult);
    DemoAdapter.prototype.hold = jest.fn().mockResolvedValue(holdToggleResult);
    DemoAdapter.prototype.resume = jest.fn().mockResolvedValue(holdToggleResult);
    DemoAdapter.prototype.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
    DemoAdapter.prototype.dial = jest.fn().mockResolvedValue(callResult);
    DemoAdapter.prototype.sendDigits = jest.fn().mockResolvedValue({});
    DemoAdapter.prototype.getPhoneContacts = jest.fn().mockResolvedValue(phoneContactsResult);
    DemoAdapter.prototype.swap = jest.fn().mockResolvedValue(holdToggleResult);
    DemoAdapter.prototype.conference = jest.fn().mockResolvedValue(holdToggleResult);
    DemoAdapter.prototype.addParticipant = jest.fn().mockResolvedValue(participantResult);
    DemoAdapter.prototype.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
    DemoAdapter.prototype.pauseRecording = jest.fn().mockResolvedValue(recordingToggleResult);
    DemoAdapter.prototype.resumeRecording = jest.fn().mockResolvedValue(recordingToggleResult);
    DemoAdapter.prototype.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
    DemoAdapter.prototype.selectPhone = jest.fn().mockResolvedValue(genericResult);
    DemoAdapter.prototype.logout = jest.fn().mockResolvedValue(genericResult);
    DemoAdapter.prototype.handleMessage = jest.fn(),
    DemoAdapter.prototype.wrapUpCall = jest.fn();

    const adapter = new DemoAdapter();
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
        initializeConnector(adapter);
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

        it('Should dispatch default error after invalid initialization result', async () => {
            adapter.init = jest.fn().mockResolvedValue(invalidResult);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
            }});
        });

        it('Should dispatch typed error after invalid param result', async () => {
            const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARAMS });
            adapter.init = jest.fn().mockRejectedValue(errorResult);
            eventMap['message'](message);
            await expect(adapter.init()).rejects.toBe(errorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.INVALID_PARAMS
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
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload
                }
            });
        });

        it('Should dispatch CONNECTOR_READY on a failed getAgentConfig invocation', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(invalidResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(invalidResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {}
            });
        });

        it('Should NOT dispatch invalid call to the vendor', () => {
            expect(() => fireMessage(constants.MESSAGE_TYPE.INVALID_CALL)).not.toThrowError();
            expect(channelPort.postMessage).not.toHaveBeenCalledWith();
        });

        afterAll(() => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
        });
    });

    describe('Agent available', () => {
        it ('Should replay active calls on agent available', async () => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult1);
            expect(isAgentAvailable()).toBeTruthy();
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: {
                phoneNumber: dummyTransferredPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferredPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferredPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferredPhoneCall.callId
            }});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: {
                phoneNumber: dummyTransferringPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferringPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferringPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferringPhoneCall.callId
            } });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_STARTED, payload: dummyRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_CONNECTED, payload: dummyConnectedPhoneCall });
        });

        it ('Should NOT replay active calls on agent un-available', async () => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.AGENT_AVAILABLE, { isAvailable: false });
            expect(adapter.getActiveCalls).not.toHaveBeenCalled();
            expect(isAgentAvailable()).toBeFalsy();
        });
    });

    describe('SCVConnectorBase event tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload
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

            it ('Should NOT dispatch acceptCall on outbound call', async () => {
                adapter.acceptCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL, {
                    call: {
                        callType: constants.CALL_TYPE.OUTBOUND
                    }
                });
                expect(adapter.acceptCall).not.toHaveBeenCalled();
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
            it('Should NOT dispatch HANGUP on a failed endCall() invocation - invalid object', async () => {
                const error = 'error';
                adapter.endCall = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).rejects.toBe(error);
            });

            it('Should NOT dispatch HANGUP on a successful endCall() invocation with non empty active calls', async () => {
                adapter.endCall = jest.fn().mockResolvedValue();
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).resolves.toEqual();
            });

            it('Should dispatch HANGUP on a successful endCall() invocation with empty active calls', async () => {
                adapter.endCall = jest.fn().mockResolvedValue(callHangUpResult);
                adapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).resolves.toEqual(callHangUpResult);
                await expect(adapter.getActiveCalls()).resolves.toEqual(emptyActiveCallsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HANGUP, payload: callHangUpResult.calls });
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

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a rejected pauseRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL });
                adapter.unmute = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.UNMUTE);
                await expect(adapter.unmute()).rejects.toBe(errorResult);
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
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on default failed hold() invocation', async () => {
                adapter.hold = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected hold() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARTICIPANT });
                adapter.hold = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
            });

            it('Should dispatch CAN_NOT_HOLD_CALL on untyped rejected hold() invocation', async () => {
                adapter.hold = jest.fn().mockRejectedValue();
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).rejects.toBe();
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
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on default failed hold() invocation', async () => {
                adapter.resume = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected resume() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARTICIPANT });
                adapter.resume = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
            });

            it('Should dispatch CAN_NOT_RESUME_CALL on untyped rejected resume() invocation', async () => {
                adapter.resume = jest.fn().mockRejectedValue();
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).rejects.toBe();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_RESUME_CALL
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful resume() invocation', async () => {
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
            it('Should dispatch CAN_NOT_SET_AGENT_STATUS on a failed setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS
                }});
            });

            it('Should dispatch INVALID_AGENT_STATUS on typed rejected setAgentStatus() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.INVALID_AGENT_STATUS });
                adapter.setAgentStatus = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_AGENT_STATUS
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

            it('Should dispatch SET_AGENT_STATUS_RESULT on a successful setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS, { agentStatus: 'dummyAgentStatus', statusInfo: dummyStatusInfo });
                await expect(adapter.setAgentStatus()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, payload: {
                    success: genericResult.success
                }});
            });
        });

        describe('dial()', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on default failed dial() invocation', async () => {
                adapter.dial = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL);
                await expect(adapter.dial()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });

            it('Should dispatch GENERIC_ERROR on typed rejected dial() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.GENERIC_ERROR });
                adapter.dial = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
                await expect(adapter.dial()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.GENERIC_ERROR
                }});
            });

            it('Should dispatch INVALID_DESTINATION on typed rejected dial() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_DESTINATION });
                adapter.dial = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
                await expect(adapter.dial()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_DESTINATION
                }});
            });

            it('Should dispatch CAN_NOT_START_THE_CALL on untyped rejected dial() invocation', async () => {
                adapter.dial = jest.fn().mockRejectedValue();
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
                await expect(adapter.dial()).rejects.toBe();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });

            it('Should dispatch CALL_STARTED on a successful dial() invocation', async () => {
                adapter.dial = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
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
                const contacts = phoneContactsResult.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        endpointARN: contact.endpointARN,
                        phoneNumber: contact.phoneNumber,
                        name: contact.name,
                        type: contact.type
                    };
                });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PHONE_CONTACTS, payload: {
                    contacts
                }});
            });
        });

        describe('sendDigits()', () => {
            it('Should be able to invoke sendDigits()', async () => {
                fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS);
                await expect(adapter.sendDigits()).resolves.not.toThrow();
            });
        });

        describe('swap()', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a invalid swap() payload', async () => {
                adapter.swap = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed swap() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS });
                adapter.swap = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful swap() invocation', async () => {
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
            it('Should dispatch CAN_NOT_CONFERENCE on an invalid conference() payload', async () => {
                adapter.conference = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful conference() invocation', async () => {
                adapter.conference = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).resolves.toBe(holdToggleResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload: {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold
                }});
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed conference() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_CONFERENCE });
                adapter.conference = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
            });
        });

        describe('addParticipant()', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on default failed addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });

            it('Should dispatch INVALID_DESTINATION on typed rejected addParticipant() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_DESTINATION });
                adapter.addParticipant = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_DESTINATION
                }});
            });

            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on untyped rejected addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockRejectedValue();
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).rejects.toBe();
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });

            it('Should dispatch HOLD_TOGGLE on a successful addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockResolvedValue(participantResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).resolves.toBe(participantResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                }});
            });
        });

        describe('pauseRecording()', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on an invalid pauseRecording() payload', async () => {
                adapter.pauseRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed pauseRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING });
                adapter.pauseRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING
                }});
            });             

            it('Should dispatch RECORDING_TOGGLE on a successful pauseRecording() invocation', async () => {
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
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on a failed resumeRecording() payload', async () => {
                adapter.resumeRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed resumeRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING });
                adapter.resumeRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).rejects.toBe(errorResult);
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

        describe('selectPhone()', () => {
            it('Should call selectPhone', async () => {
                fireMessage(constants.MESSAGE_TYPE.SELECT_PHONE, {phone : selectPhonePayload});
                expect(adapter.selectPhone).toBeCalledWith(new Phone(selectPhonePayload));
                await expect(adapter.selectPhone()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PHONE_SELECTED, payload: genericResult});
            });
            it('Should dispatch CAN_NOT_SELECT_PHONE on a invalid response from selectPhone() invocation', async () => {
                adapter.selectPhone = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SELECT_PHONE, {phone : selectPhonePayload});
                expect(adapter.selectPhone).toBeCalledWith(new Phone(selectPhonePayload));
                await expect(adapter.selectPhone()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SELECT_PHONE
                }});
            });
            it('Should dispatch CAN_NOT_SELECT_PHONE on a rejected response from selectPhone() invocation', async () => {
                adapter.selectPhone = jest.fn().mockRejectedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SELECT_PHONE, {phone : selectPhonePayload});
                expect(adapter.selectPhone).toBeCalledWith(new Phone(selectPhonePayload));
                await expect(adapter.selectPhone()).rejects.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SELECT_PHONE
                }});
            });
            it('Should reject response from selectPhone() on phone validation error', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER });
                adapter.selectPhone = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SELECT_PHONE, {phone : selectPhonePayload});
                await expect(adapter.selectPhone()).rejects.toBe(errorResult);
            });
        });

        describe('wrapUpCall()', () => {
            it('Should invoke wrapUpCall()', () => {
                fireMessage(constants.MESSAGE_TYPE.WRAP_UP_CALL, { call: dummyPhoneCall });
                expect(adapter.wrapUpCall).toBeCalledWith(dummyPhoneCall);
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
                adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: {
                    success: genericResult.success
                }});
                await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload
                    }
                });
            });

            it('Should dispatch CONNECTOR_READY on a successful LOGIN_RESULT payload', async () => {
                adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload
                    }
                });
            });

            it('Should NOT dispatch CONNECTOR_READY on a successful LOGIN_RESULT payload', async () => {
                genericResult.success = false;
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                expect(channelPort.postMessage).not.toHaveBeenCalledWith();
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
    
            it('Should dispatch CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call });
            });
        });

        describe('QUEUED_CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
    
            it('Should dispatch QUEUED_CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: callResult.call });
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
                publishEvent({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callHangUpResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callHangUpResult.calls });
            });
        });

        describe('PARTICIPANT_ADDED event', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });
    
            it('Should dispatch PARTICIPANT_ADDED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: participantResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                }});
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
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                }});
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
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: thirdPartyRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: {
                    reason: thirdPartyRemovedResult.reason
                }});
            });

            it('Should not dispatch error when PARTICIPANT_REMOVED is sent but activeCalls payload is not valid', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(invalidResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: thirdPartyRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(invalidResult);
                expect(channelPort.postMessage).not.toHaveBeenCalledWith();
            }); 

            it('Should dispatch HangUp with removing initial caller and empty active calls', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(emptyActiveCallsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HANGUP, payload: initialCallerRemovedResult.call });
            });

            it('Should dispatch PARTICIPANT_ADDED with removing initial caller and transferring active calls', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferringCallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferringCallResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: {
                    initialCallHasEnded : true
                }});
            });

            it('Should dispatch PARTICIPANT_CONNECTED with removing initial caller and transferred active calls', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: {
                    initialCallHasEnded : true
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

        describe('AFTER_CALL_WORK_STARTED event', () => {
            it('Should dispatch AFTER_CALL_WORK_STARTED on a payload', async () => {
                const payload = { payload: 'payload' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload });
            });
        });

        describe('WRAP_UP_ENDED event', () => {
            it('Should dispatch WRAP_UP_ENDED on a payload', async () => {
                const payload = { payload: 'payload' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.WRAP_UP_ENDED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.WRAP_UP_ENDED, payload });
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

        describe('MUTE_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_MUTE on an invalid payload from deskphone', async () => {
                const payload = { isMuted : false };
                publishEvent({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE
                }});
            });
    
            it('Should dispatch MUTE_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload: muteToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload: muteToggleResult });
            });
        });

        describe('HOLD_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on an invalid payload from deskphone', async () => {
                const payload = { isCustomerOnHold : false };
                publishEvent({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
            });
        });

        describe('RECORDING_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on an invalid payload from deskphone', async () => {
                const payload = { isRecordingPaused : true };
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
            });
    
            it('Should dispatch MUTE_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload: recordingToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload: recordingToggleResult });
            });
        });

        describe('swap from deskphone', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
            });
        });

        describe('conference from deskphone', () => {
            it('Should dispatch CAN_NOT_CONFERENCE on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
            });
        });

        describe('addParticipant from deskphone', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });
        });

        describe('publishError event', () => {
            it('PARTICIPANTS_CONFERENCED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
            });
            it('PARTICIPANTS_SWAPPED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
            });
            it('RECORDING_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
            });
            it('HOLD_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
            });
            it('HOLD_TOGGLE, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
            });
            it('MUTE_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE
                }});
            });
            it('PARTICIPANT_REMOVED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT
                }});
            });
            it('PARTICIPANT_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT
                }});
            });
            it('PARTICIPANT_ADDED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
            });
            it('PARTICIPANT_ADDED, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
            });
            it('HANGUP', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.HANGUP, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL
                }});
            });
            it('CALL_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
            it('QUEUED_CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
            it('CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.CALL_STARTED, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
            });
            it('LOGOUT_RESULT', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_OUT
                }});
            });
            it('LOGIN_RESULT', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
                }});
            });
            it('GENERIC_FAILURE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.GENERIC_FAILURE, undefined });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.AGENT_ERROR
                }});
            });
            it('DEFAULT', async () => {
                publishError('Unknown error');
                expect(channelPort.postMessage).not.toHaveBeenCalled();
            });
        });
    });
});

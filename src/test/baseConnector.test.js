/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { initializeConnector, Constants, publishEvent, publishError, publishLog, AgentStatusInfo } from '../main/index';
import { ActiveCallsResult, InitResult, CallResult, HoldToggleResult, GenericResult, PhoneContactsResult, MuteToggleResult, 
    ParticipantResult, RecordingToggleResult, Contact, PhoneCall, CallInfo, VendorConnector, downloadData,
    AgentConfigResult, Phone, HangupResult, SignedRecordingUrlResult, LogoutResult, AudioStats, StatsInfo, AudioStatsElement, SuperviseCallResult, SupervisorHangupResult } from '../main/index';
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

//mock the download data method.
jest.mock('../main/downloadData');

const loginFrameHeight = 300;
const invalidResult = {};
const dummyPhoneNumber = '123456789';
const dummyCallId = 'callId'
const dummyContact = new Contact({ phoneNumber: dummyPhoneNumber });
const dummyCallInfo = new CallInfo({ isOnHold: false });
const dummyPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100'});
const dummyNonReplayablePhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100', callInfo: new CallInfo({ isReplayable: false })});
const dummyBargeAbleCall = new PhoneCall({ callId: dummyCallId,  callInfo: new CallInfo({ isBargeable: true })});
const dummyBargeAbleDeskPhoneCall = new PhoneCall({ callId: dummyCallId,  callInfo: new CallInfo({ isBargeable: true, isSoftphoneCall : false })});
const dummyCallback = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.CALLBACK, state: 'state', callAttributes: {}, phoneNumber: '100'});
const dummyRingingPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.RINGING, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyConnectedPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummySupervisorRingingPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.RINGING, callAttributes: { initialCallHasEnded: false, participantType: constants.PARTICIPANT_TYPE.SUPERVISOR }, phoneNumber: '100'});
const dummySupervisorConnectedPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false, participantType: constants.PARTICIPANT_TYPE.SUPERVISOR }, phoneNumber: '100'});
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
const activeCallsResult1 = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall, dummyRingingPhoneCall, dummyConnectedPhoneCall, dummyTransferringPhoneCall, dummyTransferredPhoneCall, dummySupervisorRingingPhoneCall, dummySupervisorConnectedPhoneCall ] });
const activeCallsResult2 = new ActiveCallsResult({ activeCalls: [ dummyNonReplayablePhoneCall ] });
const callResult = new CallResult({ call: dummyPhoneCall });
const agentStatusInfo = new AgentStatusInfo({ statusId: "statusId" });
const callbackResult = new CallResult({ call: dummyCallback });
const callHangUpResult = new HangupResult({ calls: [new PhoneCall({ reason: dummyReason, callId: dummyCallId, closeCallOnError: dummyCloseCallOnError, callType: dummyCallType, agentStatus: dummyAgentStatus, isOmniSoftphone: dummyIsOmniSoftphone })]});
const muteToggleResult = new MuteToggleResult({ isMuted: true });
const unmuteToggleResult = new MuteToggleResult({ isMuted: false });
const signedRecordingUrlResult = new SignedRecordingUrlResult({ success: true, url: 'recordingUrl', duration: 10, callId: 'callId' });
const calls = [dummyPhoneCall];
const isThirdPartyOnHold = false;
const isCustomerOnHold = true;
const holdToggleResult = new HoldToggleResult({ isThirdPartyOnHold, isCustomerOnHold, calls });
const success = true;
const genericResult = new GenericResult({ success });
const logoutResult = new LogoutResult({ success, loginFrameHeight });
const contacts = [ new Contact({}) ];
const phoneContactsResult = new PhoneContactsResult({ contacts });
const participantResult = new ParticipantResult({ initialCallHasEnded: true, callInfo: dummyCallInfo, phoneNumber: dummyPhoneNumber, callId: dummyCallId });
const isRecordingPaused = true;
const contactId = 'contactId';
const initialContactId = 'initialContactId';
const instanceId = 'instanceId';
const region = 'region';
const recordingToggleResult = new RecordingToggleResult({ isRecordingPaused, contactId, initialContactId, instanceId, region });
const superviseCallResult = new SuperviseCallResult({call:dummyBargeAbleCall});
const superviseDeskphoneCallResult = new SuperviseCallResult({call:dummyBargeAbleDeskPhoneCall});
const supervisorHangupResult = new SupervisorHangupResult({calls:dummyBargeAbleDeskPhoneCall});
const supervisorHangupMultipleCallsResult = new SupervisorHangupResult({calls: [dummyBargeAbleDeskPhoneCall]});
const hasMute = false;
const hasRecord = false;
const hasMerge = true;
const hasSwap = true;
const hasSignedRecordingUrl = true;
const phones = ["DESK_PHONE", "SOFT_PHONE"];
const selectedPhone = new Phone({type: "DESK_PHONE", number: "555 888 3345"});
const softphone = new Phone({type: "SOFT_PHONE"});
const supportsMos = true;
const agentConfigResult = new AgentConfigResult({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl, phones, selectedPhone });
const agentConfigResultWithSoftphone = new AgentConfigResult({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl, phones, selectedPhone :  softphone});
const agentConfigResultWithMos = new AgentConfigResult({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl, phones, selectedPhone, supportsMos });
const agentConfigPayload = {
    [constants.AGENT_CONFIG_TYPE.MUTE] : agentConfigResult.hasMute,
    [constants.AGENT_CONFIG_TYPE.RECORD] : agentConfigResult.hasRecord,
    [constants.AGENT_CONFIG_TYPE.MERGE] : agentConfigResult.hasMerge,
    [constants.AGENT_CONFIG_TYPE.SWAP] : agentConfigResult.hasSwap,
    [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
    [constants.AGENT_CONFIG_TYPE.SIGNED_RECORDING_URL] : agentConfigResult.hasSignedRecordingUrl,
    [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone,
    [constants.AGENT_CONFIG_TYPE.DEBUG_ENABLED] : agentConfigResult.debugEnabled,
    [constants.AGENT_CONFIG_TYPE.CONTACT_SEARCH] : agentConfigResult.hasContactSearch,
    [constants.AGENT_CONFIG_TYPE.VENDOR_PROVIDED_AVAILABILITY] : agentConfigResult.hasAgentAvailability,
    [constants.AGENT_CONFIG_TYPE.SUPERVISOR_LISTEN_IN] : agentConfigResult.hasSupervisorListenIn,
    [constants.AGENT_CONFIG_TYPE.SUPERVISOR_BARGE_IN] : agentConfigResult.hasSupervisorBargeIn
}
const dummyActiveTransferredallResult = new ActiveCallsResult({ activeCalls: [dummyTransferredCall] });
const config = { selectedPhone };
const dummyStatusInfo = {statusId: 'dummyStatusId', statusApiName: 'dummyStatusApiName', statusName: 'dummyStatusName'};
const error = 'error';
const sanitizePayload = (payload) => {
    if (payload && typeof(payload) === 'object') {
        const isArray = Array.isArray(payload);
        const sanitizedPayload = isArray ? [] : {};

        if (isArray) {
            payload.forEach(element => {
                sanitizedPayload.push(sanitizePayload(element));
            });
        } else {
            for (const property in payload) {
                // expect.Anything() doesn't serialize well so not sanitizing that
                if (property === 'error') {
                    sanitizedPayload[property] = payload[property];
                } else if (property !== 'phoneNumber' && property !== 'number' && property !== 'name' && property !== 'callAttributes') {
                    sanitizedPayload[property] = sanitizePayload(payload[property]);
                }
            }
        }
        return sanitizedPayload;
    }
    return payload;
}
const dummyAudioStatsElement = new AudioStatsElement({
    inputChannelStats: new StatsInfo({packetsCount: 10, packetsLost: 2, jitterBufferMillis: 10, roundTripTimeMillis: 30}),
    outputChannelStats: new StatsInfo({packetsCount: 20, packetsLost: 1, jitterBufferMillis: 20, roundTripTimeMillis: 40})
});
const dummyAudioStatsElementWithAudioOutput = new AudioStatsElement({
    outputChannelStats: new StatsInfo({packetsCount: 20, packetsLost: 1, jitterBufferMillis: 20, roundTripTimeMillis: 40})
});
const dummyAudioStatsElementWithAudioInput = new AudioStatsElement({
    inputChannelStats: new StatsInfo({packetsCount: 10, packetsLost: 2, jitterBufferMillis: 10, roundTripTimeMillis: 30})
});
class ErrorResult {
    constructor({ type, message }) {
        this.type = type;
        this.message = message;
    }
}

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
    DemoAdapter.prototype.setAgentConfig = jest.fn().mockResolvedValue(genericResult);
    DemoAdapter.prototype.getSignedRecordingUrl = jest.fn().mockResolvedValue(signedRecordingUrlResult);
    DemoAdapter.prototype.logout = jest.fn().mockResolvedValue(logoutResult);
    DemoAdapter.prototype.handleMessage = jest.fn(),
    DemoAdapter.prototype.wrapUpCall = jest.fn();
    DemoAdapter.prototype.downloadLogs = jest.fn();
    DemoAdapter.prototype.logMessageToVendor = jest.fn();

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
        ports: [channelPort],
        origin: 'https://validOrgDomain.lightning.force.com'
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

    const assertChannelPortPayloadEventLog = ({ eventType, payload, isError }) => {
        expect(channelPort.postMessage).toHaveBeenCalledWith({
            type: constants.MESSAGE_TYPE.LOG,
            payload: {
                eventType,
                payload: sanitizePayload(payload),
                isError
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

        it('Should NOT dispatch init to the vendor for a message from non Salesforce domain', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                    connectorConfig: constants.CONNECTOR_CONFIG
                },
                ports: [channelPort],
                origin: 'https://nonSfDomain.domain.com'
            };

            eventMap['message'](message);
            expect(adapter.init).not.toHaveBeenCalled();
        });

        it('Should dispatch init to the vendor for a message from a Salesforce domain with port', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                    connectorConfig: constants.CONNECTOR_CONFIG
                },
                ports: [channelPort],
                origin: 'https://validOrgDomain.lightning.force.com:8080'
            };

            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
        });

        it('Should dispatch default error after invalid initialization result', async () => {
            adapter.init = jest.fn().mockResolvedValue(invalidResult);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_LOG_IN,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch typed error after invalid param result', async () => {
            const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARAMS });
            adapter.init = jest.fn().mockRejectedValue(errorResult);
            eventMap['message'](message);
            await expect(adapter.init()).rejects.toBe(errorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.INVALID_PARAMS
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                payload: {
                    errorType: constants.ERROR_TYPE.INVALID_PARAMS,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch SHOW_LOGIN after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_showLogin);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_showLogin);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SHOW_LOGIN, payload: {
                loginFrameHeight
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SHOW_LOGIN,
                payload: {
                    loginFrameHeight
                },
                isError: false
            });
        });

        it('Should dispatch CONNECTOR_READY after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                },
                isError: false
            });
        });

        it('Should dispatch CONNECTOR_READY after initialization without any active calls', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            adapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(adapter.getActiveCalls()).resolves.toBe(emptyActiveCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: null
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: null
                },
                isError: false
            });
        });

        it('Should dispatch CONNECTOR_READY on a failed getAgentConfig invocation', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(invalidResult);
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(invalidResult);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {}
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {},
                isError: false
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
        it('Should replay active calls on agent available', async () => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult1);
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
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload: dummySupervisorRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload: dummySupervisorConnectedPhoneCall });
        });

        it ('Should NOT replay active calls on when is not replayable', async () => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult2);
            fireMessage(constants.MESSAGE_TYPE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult2);
            expect(channelPort.postMessage).toBeCalledTimes(1);
        });

        it ('Should NOT replay active calls on agent un-available', async () => {
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.AGENT_AVAILABLE, { isAvailable: false });
            expect(adapter.getActiveCalls).not.toHaveBeenCalled();
        });
    });

    describe('SCVConnectorBase event tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                },
                isError: false
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.ACCEPT_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ACCEPT_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CALL_CONNECTED on a successful acceptCall() invocation', async () => {
                adapter.acceptCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
                await expect(adapter.acceptCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                    payload: callResult.call,
                    isError: false
                });
            });

            it('Should dispatch CALL_STARTED on a successful acceptCall() invocation for callback', async () => {
                adapter.acceptCall = jest.fn().mockResolvedValue(callbackResult);
                fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
                await expect(adapter.acceptCall()).resolves.toBe(callbackResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_STARTED, payload: callbackResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: callbackResult.call,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.DECLINE_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_DECLINE_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HANGUP on a successful declineCall() invocation', async () => {
                adapter.declineCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.DECLINE_CALL);
                await expect(adapter.declineCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HANGUP, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('endCall()', () => {
            it('Should NOT dispatch HANGUP on a failed endCall() invocation - invalid object', async () => {
                const error = 'error';
                adapter.endCall = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.END_CALL);
                await expect(adapter.endCall()).rejects.toBe(error);
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.END_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: callHangUpResult.calls,
                    isError: false
                });
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
                const payload = { isMuted: result.isMuted };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.UNMUTE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_UNMUTE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch MUTE_TOGGLE on a successful unmute() invocation', async () => {
                adapter.unmute = jest.fn().mockResolvedValue(unmuteToggleResult);
                fireMessage(constants.MESSAGE_TYPE.UNMUTE);
                const result = await adapter.unmute();
                const payload = { isMuted: result.isMuted };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.MUTE_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected hold() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARTICIPANT });
                adapter.hold = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.HOLD,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_HOLD_CALL on untyped rejected hold() invocation', async () => {
                adapter.hold = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HOLD_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.HOLD,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_HOLD_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful hold() invocation', async () => {
                adapter.hold = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.HOLD);
                await expect(adapter.hold()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected resume() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_PARTICIPANT });
                adapter.resume = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.RESUME,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_CALL on untyped rejected resume() invocation', async () => {
                adapter.resume = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_RESUME_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.RESUME,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_RESUME_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful resume() invocation', async () => {
                adapter.resume = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME);
                await expect(adapter.resume()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_AGENT_STATUS on typed rejected setAgentStatus() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.INVALID_AGENT_STATUS });
                adapter.setAgentStatus = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_AGENT_STATUS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_AGENT_STATUS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch SET_AGENT_STATUS_RESULT on a successful setAgentStatus() invocation without a payload', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).resolves.toBe(genericResult);
                const payload = { success: genericResult.success };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch SET_AGENT_STATUS_RESULT on a successful setAgentStatus() invocation with a payload', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS, { agentStatus: 'dummyAgentStatus', statusInfo: dummyStatusInfo });
                await expect(adapter.setAgentStatus()).resolves.toBe(genericResult);
                const payload = { success: genericResult.success };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.GENERIC_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_DESTINATION,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_START_THE_CALL on untyped rejected dial() invocation', async () => {
                adapter.dial = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
                await expect(adapter.dial()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CALL_STARTED on a successful dial() invocation', async () => {
                adapter.dial = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.DIAL, { contact: dummyContact });
                await expect(adapter.dial()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.GET_PHONE_CONTACTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_GET_PHONE_CONTACTS,
                        error: expect.anything()
                    },
                    isError: true
                });
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
                        type: contact.type,
                        availability: contact.availability
                    };
                });
                const payload = { contacts };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PHONE_CONTACTS, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PHONE_CONTACTS,
                    payload,
                    isError: false
                });
            });
        });

        describe('sendDigits()', () => {
            it('Should be able to invoke sendDigits()', async () => {
                fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS);
                await expect(adapter.sendDigits()).resolves.not.toThrow();
            });

            it('Should should dispatch event log on failed sendDigits()', async () => {
                adapter.sendDigits = jest.fn().mockImplementationOnce(() => { throw new Error; });
                fireMessage(constants.MESSAGE_TYPE.SEND_DIGITS);
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SEND_DIGITS,
                    payload: undefined,
                    isError: true
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed swap() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS });
                adapter.swap = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SWAP_PARTICIPANTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful swap() invocation', async () => {
                adapter.swap = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.SWAP_PARTICIPANTS);
                await expect(adapter.swap()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful conference() invocation', async () => {
                adapter.conference = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed conference() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_CONFERENCE });
                adapter.conference = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.CONFERENCE);
                await expect(adapter.conference()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.CONFERENCE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_DESTINATION on typed rejected addParticipant() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.INVALID_DESTINATION });
                adapter.addParticipant = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_DESTINATION
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.ADD_PARTICIPANT,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_DESTINATION,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on untyped rejected addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: {
                    reason: constants.EVENT_TYPE.ERROR.toLowerCase()
                }});
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.ADD_PARTICIPANT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful addParticipant() invocation', async () => {
                adapter.addParticipant = jest.fn().mockResolvedValue(participantResult);
                fireMessage(constants.MESSAGE_TYPE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.addParticipant()).resolves.toBe(participantResult);
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed pauseRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING });
                adapter.pauseRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.PAUSE_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_PAUSE_RECORDING,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch RECORDING_TOGGLE on a successful pauseRecording() invocation', async () => {
                adapter.pauseRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.PAUSE_RECORDING);
                await expect(adapter.pauseRecording()).resolves.toBe(recordingToggleResult);
                const payload = {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed resumeRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING });
                adapter.resumeRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.RESUME_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_RESUME_RECORDING,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch RECORDING_TOGGLE on a successful resumeRecording() invocation', async () => {
                adapter.resumeRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.RESUME_RECORDING);
                await expect(adapter.resumeRecording()).resolves.toBe(recordingToggleResult);
                const payload = {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.LOGOUT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_LOG_OUT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch LOGOUT_RESULT on a successful logout() invocation', async () => {
                adapter.logout = jest.fn().mockResolvedValue(logoutResult);
                fireMessage(constants.MESSAGE_TYPE.LOGOUT);
                await expect(adapter.logout()).resolves.toBe(logoutResult);
                const payload = { success: logoutResult.success, loginFrameHeight: logoutResult.loginFrameHeight };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.LOGOUT_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGOUT_RESULT,
                    payload,
                    isError: false
                });
            });
        });

        describe('handleMessage()', () => {
            it('Should dispatch message on handleMessage() invocation', async () => {
                const message = { message: 'message'};
                fireMessage(constants.MESSAGE_TYPE.MESSAGE, message);
                expect(adapter.handleMessage).toBeCalledWith('message');
            });
        });

        describe('setAgentConfig()', () => {
            it('Should call setAgentConfig', async () => {
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_CONFIG, config);
                await expect(adapter.setAgentConfig()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.AGENT_CONFIG_UPDATED, payload: genericResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.AGENT_CONFIG_UPDATED,
                    payload: genericResult,
                    isError: false
                });
            });
            it('Should dispatch CAN_NOT_SET_AGENT_CONFIG on a invalid response from setAgentConfig() invocation', async () => {
                adapter.setAgentConfig = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_CONFIG, config);
                await expect(adapter.setAgentConfig()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SET_AGENT_CONFIG,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('Should dispatch CAN_NOT_SET_AGENT_CONFIG on a rejected response from setAgentConfig() invocation', async () => {
                adapter.setAgentConfig = jest.fn().mockRejectedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_CONFIG, config);
                await expect(adapter.setAgentConfig()).rejects.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SET_AGENT_CONFIG,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_CONFIG,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('Should reject response from setAgentConfig() on phone validation error', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER });
                adapter.setAgentConfig = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_CONFIG, config);
                await expect(adapter.setAgentConfig()).rejects.toBe(errorResult);
            });
        });

        describe('wrapUpCall()', () => {
            it('Should invoke wrapUpCall()', () => {
                fireMessage(constants.MESSAGE_TYPE.WRAP_UP_CALL, { call: dummyPhoneCall });
                expect(adapter.wrapUpCall).toBeCalledWith(dummyPhoneCall);
            });
        });

        describe('getSignedRecordingUrl()', () => {
            it('Should invoke getSignedRecordingUrl on a failed call', async () => {
                adapter.getSignedRecordingUrl = jest.fn().mockRejectedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, {
                    recordingUrl: 'recordingUrl',
                    vendorCallKey: 'vendorCallKey',
                    callId: 'callId'
                });
                await expect(adapter.getSignedRecordingUrl()).rejects.toBe(invalidResult);
                const signedRecordingUrlResult = new SignedRecordingUrlResult({ success: false });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult,
                    isError: true
                });
            });

            it('Should invoke getSignedRecordingUrl successfully', async () => {
                adapter.getSignedRecordingUrl = jest.fn().mockResolvedValue(signedRecordingUrlResult);
                fireMessage(constants.MESSAGE_TYPE.GET_SIGNED_RECORDING_URL, {
                    recordingUrl: 'recordingUrl',
                    vendorCallKey: 'vendorCallKey',
                    callId: 'callId'
                });
                await expect(adapter.getSignedRecordingUrl()).resolves.toBe(signedRecordingUrlResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult,
                    isError: false
                });
            });
        })

        describe('downloadLogs()', () => {
            it('Should invoke downloadLogs() when DOWNLOAD_VENDOR_LOGS is published', () => {
                fireMessage(constants.MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS);
                expect(downloadData).toBeCalledTimes(1);
            });
            it('Should invoke downloadLogs() when DOWNLOAD_RESELL_LOGS is published', () => {
                fireMessage(constants.MESSAGE_TYPE.DOWNLOAD_RESELL_LOGS);
                expect(adapter.downloadLogs).toBeCalledTimes(1);
            });
        });

        describe('logMessageToVendor()', () => {
            it('Should invoke logMessageToVendor() when MESSAGE_TYPE.LOG is published', () => {
                fireMessage(constants.MESSAGE_TYPE.LOG, {
                    logLevel: "INFO",
                    logMessage: "Some mesasge",
                    payload: {
                        a: "b",
                        c: "d"
                    }
                });
                expect(adapter.logMessageToVendor).toBeCalledWith("INFO", "Some mesasge", {
                        a: "b",
                        c: "d"
                    });
            });
        })
    });

    describe('SCVConnectorBase publish event tests', () => {
        describe('LOGIN_RESULT event', () => {
            it('Should dispatch CAN_NOT_LOG_IN on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGIN_RESULT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_LOG_IN,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CONNECTOR_READY on a valid payload', async () => {
                adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: {
                    success: genericResult.success
                }});
                await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        callInProgress: dummyPhoneCall
                    }
                });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        callInProgress: dummyPhoneCall
                    },
                    isError: false
                });
            });

            it('Should dispatch CONNECTOR_READY on a successful LOGIN_RESULT payload', async () => {
                adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGIN_RESULT,
                    payload: genericResult,
                    isError: false
                });
                await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        callInProgress: dummyPhoneCall
                    }
                });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        callInProgress: dummyPhoneCall
                    },
                    isError: false
                });
            });

            it('Should NOT dispatch CONNECTOR_READY on an unsuccessful LOGIN_RESULT payload', async () => {
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGOUT_RESULT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_LOG_OUT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch LOGOUT_RESULT on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, payload: logoutResult });
                const payload = { success: logoutResult.success, loginFrameHeight: logoutResult.loginFrameHeight };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGOUT_RESULT,
                    payload,
                    isError: false
                });
            });
        });

        describe('CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('SET_AGENT_STATUS event', () => {
            it('Should dispatch CAN_NOT_SET_AGENT_STATUS on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.SET_AGENT_STATUS, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch SET_AGENT_STATUS on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.SET_AGENT_STATUS, payload: agentStatusInfo });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.SET_AGENT_STATUS, payload: agentStatusInfo });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SET_AGENT_STATUS,
                    payload: agentStatusInfo,
                    isError: false
                });
            });
        });

        describe('QUEUED_CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch QUEUED_CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('PREVIEW_CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PREVIEW_CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PREVIEW_CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PREVIEW_CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('CALL_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CALL_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('HANGUP event', () => {
            it('Should dispatch CAN_NOT_END_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.HANGUP, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch HANGUP on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callHangUpResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.HANGUP, payload: callHangUpResult.calls });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: callHangUpResult.calls,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_ADDED event', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch PARTICIPANT_ADDED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: participantResult });
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_CONNECT_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch PARTICIPANT_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload: participantResult });
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
                    payload,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_REMOVED event', () => {
            it('Should dispatch CAN_NOT_HANGUP_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch PARTICIPANT_REMOVED on a valid payload', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: thirdPartyRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    reason: thirdPartyRemovedResult.reason
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_REMOVED on a empty payload', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: new CallResult({}) });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    reason: null
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
                    payload,
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: initialCallerRemovedResult.call,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_ADDED with removing initial caller and transferring active calls', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferringCallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferringCallResult);
                const payload = {
                    initialCallHasEnded : true
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_CONNECTED with removing initial caller and transferred active calls', async () => {
                adapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    initialCallHasEnded : true
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
                    payload,
                    isError: false
                });
            });
        });

        describe('MESSAGE event', () => {
            it('Should dispatch MESSAGE on a payload', async () => {
                const message = { message: 'message' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.MESSAGE, payload: message });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.MESSAGE, payload: message });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MESSAGE,
                    payload: message,
                    isError: false
                });
            });
        });

        describe('AFTER_CALL_WORK_STARTED event', () => {
            it('Should dispatch AFTER_CALL_WORK_STARTED on a payload', async () => {
                const payload = { payload: 'payload' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED,
                    payload,
                    isError: false
                });
            });
        });

        describe('WRAP_UP_ENDED event', () => {
            it('Should dispatch WRAP_UP_ENDED on a payload', async () => {
                const payload = { payload: 'payload' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.WRAP_UP_ENDED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.WRAP_UP_ENDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.WRAP_UP_ENDED,
                    payload,
                    isError: false
                });
            });
        });

        describe('REMOTE_CONTROLLER event', () => {
            it('Should call channelMessageHandler with payload', async () => {
                const message = { data: {
                    type: constants.MESSAGE_TYPE.ACCEPT_CALL
                }};
                adapter.acceptCall = jest.fn().mockResolvedValue(invalidResult);
                publishEvent({ eventType: constants.EVENT_TYPE.REMOTE_CONTROLLER, payload: message });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.ACCEPT_CALL,
                    payload: { type: constants.MESSAGE_TYPE.ACCEPT_CALL },
                    isError: false
                });
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
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch MUTE_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload: muteToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, payload: muteToggleResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
                    payload: muteToggleResult,
                    isError: false
                });
            });
        });

        describe('HOLD_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on an invalid payload from deskphone', async () => {
                const payload = { isCustomerOnHold : false };
                publishEvent({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('RECORDING_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on an invalid payload from deskphone', async () => {
                const payload = { isRecordingPaused : true };
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch RECORDING_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload: recordingToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, payload: recordingToggleResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload: recordingToggleResult,
                    isError: false
                });
            });
        });

        describe('swap from deskphone', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('conference from deskphone', () => {
            it('Should dispatch CAN_NOT_CONFERENCE on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('addParticipant from deskphone', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('publishError event', () => {
            it('PARTICIPANTS_CONFERENCED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANTS_SWAPPED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANTS_SWAPPED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('RECORDING_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.RECORDING_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HOLD_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HOLD_TOGGLE, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.HOLD_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('MUTE_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.MUTE_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.MUTE_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_TOGGLE_MUTE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_REMOVED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_REMOVED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_HANGUP_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_CONNECTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_CONNECT_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_ADDED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_ADDED, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.PARTICIPANT_ADDED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HANGUP', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.HANGUP, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.HANGUP,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('CALL_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('QUEUED_CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.QUEUED_CALL_STARTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.CALL_STARTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('LOGOUT_RESULT', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.LOGOUT_RESULT, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_OUT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGOUT_RESULT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_LOG_OUT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('LOGIN_RESULT', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_LOG_IN
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGIN_RESULT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_LOG_IN,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            
            it('AGENT_ERROR', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.AGENT_ERROR, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.AGENT_ERROR
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.AGENT_ERROR,
                    payload: {
                        errorType: constants.ERROR_TYPE.AGENT_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            describe('SOFTPHONE_ERROR', () => {
                it('should publish generic SOFTPHONE_ERROR for unknown error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.SOFTPHONE_ERROR, error });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.GENERIC_ERROR
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.GENERIC_ERROR,
                            error: expect.anything()
                        },
                        isError: true
                    });
                });

                it('should publish UNSUPPORTED_BROWSER SOFTPHONE_ERROR for microhone error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.SOFTPHONE_ERROR, error: constants.ERROR_TYPE.UNSUPPORTED_BROWSER });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.UNSUPPORTED_BROWSER
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.UNSUPPORTED_BROWSER,
                            error: expect.anything()
                        },
                        isError: true
                    });
                });

                it('should publish MICROPHONE_NOT_SHARED SOFTPHONE_ERROR for microhone error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.SOFTPHONE_ERROR, error: constants.ERROR_TYPE.MICROPHONE_NOT_SHARED });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.MICROPHONE_NOT_SHARED
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.MICROPHONE_NOT_SHARED,
                            error: expect.anything()
                        },
                        isError: true
                    });
                });
            });

            it('DEFAULT', async () => {
                publishError('Unknown error');
                expect(channelPort.postMessage).not.toHaveBeenCalled();
            });
        });

        describe('publishLog event', () => {
            it('Any event', async () => {
                const eventType = 'anyEvent';
                const payload = {
                    key: 'value'
                };
                const isError = true;
                publishLog({ eventType, payload, isError });
                assertChannelPortPayloadEventLog({
                    eventType,
                    payload,
                    isError
                });
            });
        });
    });

    describe('MOS tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResultWithMos);
            adapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResultWithMos);
            await expect(adapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    callInProgress: dummyPhoneCall
                },
                isError: false
            });
        });
        it('Should calculate MOS for only inputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElementWithAudioInput]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.3672791040000005} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.3672791040000005},
                isError: false
            });
        });
        it('Should calculate MOS for only ouputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElementWithAudioOutput]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, stats: [dummyAudioStatsElementWithAudioOutput], isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.358684488140626} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.358684488140626},
                isError: false
            });
        });
        it('Should calculate MOS for both inputChannel and ouputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({})});
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElement]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, stats: [dummyAudioStatsElementWithAudioOutput], isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.358684488140626} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.358684488140626},
                isError: false
            });
        });
        it('Should not throw error on invalid payload when update', async () => {
            expect(() => {
                publishEvent({ eventType: Constants.EVENT_TYPE.UPDATE_AUDIO_STATS, payload: callResult });
            }).not.toThrowError();
        });
    });

    describe('Supervisor tests', () => {

        beforeEach(async () => {
            eventMap['message'](message);
        });

        it('Should invoke supervise Call successfully', async () => {
            adapter.superviseCall = jest.fn().mockResolvedValue(superviseCallResult);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResultWithSoftphone);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.superviseCall()).resolves.toBe(superviseCallResult);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResultWithSoftphone);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should disconnect supervisor call before dispatching CALL_CONNECTED on a successful acceptCall() invocation', async () => {
            adapter.acceptCall = jest.fn().mockResolvedValue(callResult);
            adapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            adapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            fireMessage(constants.MESSAGE_TYPE.ACCEPT_CALL);
            await expect(adapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            await expect(adapter.acceptCall()).resolves.toBe(callResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                payload: callResult.call,
                isError: false
            });
        });

        it('Should disconnect supervisor call before dispatching CALL_CONNECTED on a valid payload', async () => {
            adapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            adapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            publishEvent({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult });
            await expect(adapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.CALL_CONNECTED, payload: callResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.CALL_CONNECTED,
                payload: callResult.call,
                isError: false
            });
        });

        it('Should invoke supervise Call successfully for Deskphone', async () => {
            adapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            adapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(adapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
                payload: superviseDeskphoneCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
                payload: superviseDeskphoneCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on a failed superviseCall() invocation', async () => {
            adapter.superviseCall = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISE_CALL);
            await expect(adapter.superviseCall()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SUPERVISE_CALL,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should disconnect Call successfully', async () => {
            adapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT, {
                call: {}
            });
            await expect(adapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls,
                isError: false
            });
        });

        it('Should disconnect Calls successfully', async () => {
            adapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupMultipleCallsResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT, {
                call: {}
            });
            await expect(adapter.supervisorDisconnect()).resolves.toBe(supervisorHangupMultipleCallsResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: supervisorHangupMultipleCallsResult.calls});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: supervisorHangupMultipleCallsResult.calls,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_DISCONNECT_SUPERVISOR on a failed supervisorDisconnect() invocation', async () => {
            adapter.supervisorDisconnect = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT);
            await expect(adapter.supervisorDisconnect()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SUPERVISOR_DISCONNECT,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should barge in  supervise  successfully', async () => {
            adapter.supervisorBargeIn = jest.fn().mockResolvedValue(superviseCallResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN, {
                call: {}
            });
            await expect(adapter.supervisorBargeIn()).resolves.toBe(superviseCallResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_BARGE_IN_SUPERVISOR on a failed supervisorBargeIn() invocation', async () => {
            adapter.supervisorBargeIn = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN);
            await expect(adapter.supervisorBargeIn()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SUPERVISOR_BARGE_IN,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });


        it('publish SUPERVISOR_BARGED_IN event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_BARGE_IN_SUPERVISOR on an invalid payload', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_BARGE_IN_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('publish SUPERVISOR_CALL_STARTED event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on an invalid payload', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });


        it('publish SUPERVISOR_CALL_CONNECTED event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on an invalid payload for SUPERVISOR_CALL_CONNECTED', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('publish SUPERVISOR_HANGUP event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP, payload: supervisorHangupResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP, payload:supervisorHangupResult.calls });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_DISCONNECT_SUPERVISOR on an invalid payload for SUPERVISOR_HANGUP', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SUPERVISOR_HANGUP,
                payload: {
                    errorType: constants.ERROR_TYPE.CAN_NOT_DISCONNECT_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });
    });
});
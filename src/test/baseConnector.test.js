/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { initializeConnector, Constants, publishEvent, publishError, publishLog, AgentStatusInfo, AgentVendorStatusInfo, StateChangeResult, CustomError } from '../main/index';
import { ActiveCallsResult, InitResult, CallResult, HoldToggleResult, GenericResult, ContactsResult, PhoneContactsResult, MuteToggleResult, 
    ParticipantResult, RecordingToggleResult, Contact, PhoneCall, CallInfo, VendorConnector, TelephonyConnector, CapabilitiesResult,
    AgentConfigResult, Phone, HangupResult, SignedRecordingUrlResult, LogoutResult, AudioStats, StatsInfo, AudioStatsElement, 
    SuperviseCallResult, SupervisorHangupResult, SupervisedCallInfo, ShowStorageAccessResult } from '../main/index';
import baseConstants from '../main/constants';

import { log } from '../main/logger';
jest.mock('../main/logger');

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
const dummyNonReplayablePhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100', callInfo: new CallInfo({ isReplayable: false })});
const dummyBargeAbleCall = new PhoneCall({ callId: dummyCallId,  callInfo: new CallInfo({ isBargeable: true })});
const dummyBargeAbleDeskPhoneCall = new PhoneCall({ callId: dummyCallId,  callInfo: new CallInfo({ isBargeable: true, isSoftphoneCall : false })});
const dummyCallback = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.CALLBACK, state: 'state', callAttributes: {}, phoneNumber: '100'});
const dummyDialedCallback = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.DIALED_CALLBACK, state: 'state', callAttributes: {}, phoneNumber: '100'});
const dummyRingingPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.RINGING, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummyConnectedPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false }, phoneNumber: '100'});
const dummySupervisorRingingPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.RINGING, callAttributes: { initialCallHasEnded: false, participantType: constants.PARTICIPANT_TYPE.SUPERVISOR, hasSupervisorBargedIn: false }, phoneNumber: '100'});
const dummySupervisorConnectedPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false, participantType: constants.PARTICIPANT_TYPE.SUPERVISOR, hasSupervisorBargedIn: false }, phoneNumber: '100'});
const dummySupervisorBargedInPhoneCall = new PhoneCall({ callId: dummyCallId, callType: constants.CALL_TYPE.INBOUND, contact: dummyContact, state: constants.CALL_STATE.CONNECTED, callAttributes: { initialCallHasEnded: false, participantType: constants.PARTICIPANT_TYPE.SUPERVISOR, hasSupervisorBargedIn: true }, phoneNumber: '100'});
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
const dummyLabelName = 'dummyLabelName';
const dummyNamespace = 'dummyNamespace';
const dummyMessage = 'dummyMessage';
const dummyCustomErrorPayload = {
    customError: {
        labelName: dummyLabelName,
        namespace: dummyNamespace,
        message: dummyMessage
    }
};
const initResult_showLogin = new InitResult({ showLogin: true, loginFrameHeight });
const initResult_connectorReady = new InitResult({ showLogin: false, loginFrameHeight });
const initResult_isSilentLogin = new InitResult({ isSilentLogin: true });
const initResult_showStorageAccessTrue = new InitResult({ showStorageAccess: true });
const initResult_showStorageAccessFalse = new InitResult({ showStorageAccess: false });
const emptyActiveCallsResult = new ActiveCallsResult({ activeCalls: [] });
const activeCallsResult = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall ] });
const activeCallsResult1 = new ActiveCallsResult({ activeCalls: [ dummyPhoneCall, dummyRingingPhoneCall, dummyConnectedPhoneCall, dummyTransferringPhoneCall, dummyTransferredPhoneCall, dummySupervisorRingingPhoneCall, dummySupervisorConnectedPhoneCall, dummySupervisorBargedInPhoneCall ] });
const activeCallsResult2 = new ActiveCallsResult({ activeCalls: [ dummyNonReplayablePhoneCall ] });
const callResult = new CallResult({ call: dummyPhoneCall });
const callbackResult = new CallResult({ call: dummyCallback });
const dialedCallbackResult = new CallResult( { call: dummyDialedCallback});
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
const customErrorResult = new CustomError({ labelName: dummyLabelName, namespace: dummyNamespace, message: dummyMessage });
const contacts = [ new Contact({}) ];
const contactTypes = [ Constants.CONTACT_TYPE.AGENT, Constants.CONTACT_TYPE.QUEUE ]
const phoneContactsResult = new PhoneContactsResult({ contacts, contactTypes });
const contactsResult = new ContactsResult({ contacts, contactTypes });
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
const showStorageAccessResultSuccess = new ShowStorageAccessResult({success:true});
const showStorageAccessResultShowLogin = new ShowStorageAccessResult({success:true, showLogin: true, loginFrameHeight});
const showStorageAccessResultShowLoginFail = new ShowStorageAccessResult({success:false, showLogin: true, loginFrameHeight});
const hasMute = false;
const hasRecord = false;
const hasMerge = true;
const hasSwap = true;
const hasSignedRecordingUrl = true;
const phones = ["DESK_PHONE", "SOFT_PHONE"];
const selectedPhone = new Phone({type: "DESK_PHONE", number: "555 888 3345"});
const softphone = new Phone({type: "SOFT_PHONE"});
const supportsMos = true;
const agentConfigResult = new AgentConfigResult({ phones, selectedPhone });
const agentConfigResultWithSoftphone = new AgentConfigResult({ phones, selectedPhone :  softphone});
const agentConfigPayload = {
    [constants.AGENT_CONFIG_TYPE.PHONES] : agentConfigResult.phones,
    [constants.AGENT_CONFIG_TYPE.SELECTED_PHONE] : agentConfigResult.selectedPhone
};
const capabilitiesResult = new CapabilitiesResult({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl });
const capabilitiesPayload = {
    [constants.CAPABILITIES_TYPE.MUTE] : capabilitiesResult.hasMute,
    [constants.CAPABILITIES_TYPE.RECORD] : capabilitiesResult.hasRecord,
    [constants.CAPABILITIES_TYPE.MERGE] : capabilitiesResult.hasMerge,
    [constants.CAPABILITIES_TYPE.SWAP] : capabilitiesResult.hasSwap,
    [constants.CAPABILITIES_TYPE.SIGNED_RECORDING_URL] : capabilitiesResult.hasSignedRecordingUrl,
    [constants.CAPABILITIES_TYPE.DEBUG_ENABLED] : capabilitiesResult.debugEnabled,
    [constants.CAPABILITIES_TYPE.CONTACT_SEARCH] : capabilitiesResult.hasContactSearch,
    [constants.CAPABILITIES_TYPE.VENDOR_PROVIDED_AVAILABILITY] : capabilitiesResult.hasAgentAvailability,
    [constants.CAPABILITIES_TYPE.VENDOR_PROVIDED_QUEUE_WAIT_TIME] : capabilitiesResult.hasQueueWaitTime,
    [constants.CAPABILITIES_TYPE.SUPERVISOR_LISTEN_IN] : capabilitiesResult.hasSupervisorListenIn,
    [constants.CAPABILITIES_TYPE.SUPERVISOR_BARGE_IN] : capabilitiesResult.hasSupervisorBargeIn,
    [constants.CAPABILITIES_TYPE.MOS] : capabilitiesResult.supportsMos,
    [constants.CAPABILITIES_TYPE.BLIND_TRANSFER] : capabilitiesResult.hasBlindTransfer,
    [constants.CAPABILITIES_TYPE.TRANSFER_TO_OMNI_FLOW] : capabilitiesResult.hasTransferToOmniFlow,
    [constants.CAPABILITIES_TYPE.PENDING_STATUS_CHANGE] : capabilitiesResult.hasPendingStatusChange,
    [constants.CAPABILITIES_TYPE.PHONEBOOK] : capabilitiesResult.hasPhoneBook,
    [constants.CAPABILITIES_TYPE.SFDC_PENDING_STATE]: capabilitiesResult.hasSFDCPendingState
};
const capabilitiesResultWithMos = new CapabilitiesResult({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl, supportsMos });
const capabilitiesPayloadWithMos = { ...capabilitiesPayload, [constants.CAPABILITIES_TYPE.MOS] : capabilitiesResultWithMos.supportsMos };

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
const supervisedCallInfo = new SupervisedCallInfo({ 
    callId: "callId", 
    voiceCallId: "voiceCallId", 
    callType: constants.CALL_TYPE.INBOUND, 
    from: "from",
    to: "to",
    supervisorName: "supervisorName",
    isBargedIn: true
});

describe('SCVConnectorBase tests', () => {
    class DemoAdapter extends VendorConnector {}
    class DemoTelephonyAdapter extends TelephonyConnector {}

    const adapter = new DemoAdapter();
    const telephonyAdapter = new DemoTelephonyAdapter();

    // VendorConnector overrides
    DemoAdapter.prototype.init = jest.fn().mockResolvedValue(initResult_connectorReady);
    DemoAdapter.prototype.getTelephonyConnector = jest.fn().mockResolvedValue(telephonyAdapter);
    DemoAdapter.prototype.setAgentStatus = jest.fn().mockResolvedValue(genericResult);
    DemoAdapter.prototype.logout = jest.fn().mockResolvedValue(logoutResult);
    DemoAdapter.prototype.handleMessage = jest.fn(),
    DemoAdapter.prototype.downloadLogs = jest.fn();
    DemoAdapter.prototype.logMessageToVendor = jest.fn();
    DemoAdapter.prototype.onAgentWorkEvent = jest.fn();
    DemoAdapter.prototype.getContacts = jest.fn().mockResolvedValue(contactsResult);
    // TelephonyConnector overrides
    DemoTelephonyAdapter.prototype.acceptCall = jest.fn().mockResolvedValue(callResult);
    DemoTelephonyAdapter.prototype.declineCall = jest.fn().mockResolvedValue(callResult);
    DemoTelephonyAdapter.prototype.endCall = jest.fn().mockResolvedValue();
    DemoTelephonyAdapter.prototype.mute = jest.fn().mockResolvedValue(muteToggleResult);
    DemoTelephonyAdapter.prototype.unmute = jest.fn().mockResolvedValue(unmuteToggleResult);
    DemoTelephonyAdapter.prototype.hold = jest.fn().mockResolvedValue(holdToggleResult);
    DemoTelephonyAdapter.prototype.resume = jest.fn().mockResolvedValue(holdToggleResult);
    DemoTelephonyAdapter.prototype.dial = jest.fn().mockResolvedValue(callResult);
    DemoTelephonyAdapter.prototype.sendDigits = jest.fn().mockResolvedValue({});
    DemoTelephonyAdapter.prototype.getPhoneContacts = jest.fn().mockResolvedValue(phoneContactsResult);
    DemoTelephonyAdapter.prototype.swap = jest.fn().mockResolvedValue(holdToggleResult);
    DemoTelephonyAdapter.prototype.conference = jest.fn().mockResolvedValue(holdToggleResult);
    DemoTelephonyAdapter.prototype.addParticipant = jest.fn().mockResolvedValue(participantResult);
    DemoTelephonyAdapter.prototype.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
    DemoTelephonyAdapter.prototype.pauseRecording = jest.fn().mockResolvedValue(recordingToggleResult);
    DemoTelephonyAdapter.prototype.resumeRecording = jest.fn().mockResolvedValue(recordingToggleResult);
    DemoTelephonyAdapter.prototype.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
    DemoTelephonyAdapter.prototype.getSignedRecordingUrl = jest.fn().mockResolvedValue(signedRecordingUrlResult);
    DemoTelephonyAdapter.prototype.wrapUpCall = jest.fn();
    DemoTelephonyAdapter.prototype.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
    DemoTelephonyAdapter.prototype.setAgentConfig = jest.fn().mockResolvedValue(genericResult);

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

        it('Should dispatch init to the vendor for a message from a Salesforce soma domain', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                    connectorConfig: constants.CONNECTOR_CONFIG
                },
                ports: [channelPort],
                origin: 'https://ise240.lightning.mist78.soma.force.com'
            };

            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
        });

        it('Should log the right fields when init is called', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                    connectorConfig: {
                        "/reqGeneralInfo/reqAdapterUrl": "abc",
                        "invalidKey": "unknown",
                        "/reqHvcc/1": "1",
                        "/reqHvcc/2": "2",
                        "/reqHvcc/reqTelephonyIntegrationCertificate" : "abc"
                    }
                },
                ports: [channelPort],
                origin: 'https://validOrgDomain.lightning.force.com:8080'
            };
            log.mockClear();
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(log).toBeCalledTimes(1);
            expect(log.mock.calls[0][0]).toEqual({
                 eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                 payload: {
                    "/reqGeneralInfo/reqAdapterUrl": "abc",
                    "/reqHvcc/1": "1",
                    "/reqHvcc/2": "2"
                 }
            });
        });

        it('Should log the right fields when init is called with an empty payload', () => {
            const message = {
                data: {
                    type: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                    connectorConfig: undefined
                },
                ports: [channelPort],
                origin: 'https://validOrgDomain.lightning.force.com:8080'
            };
            log.mockClear();
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(log).toBeCalledTimes(1);
            expect(log.mock.calls[0][0]).toEqual({
                 eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                 payload: {}
            });
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
            const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.VOICE.INVALID_PARAMS });
            adapter.init = jest.fn().mockRejectedValue(errorResult);
            eventMap['message'](message);
            await expect(adapter.init()).rejects.toBe(errorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.INVALID_PARAMS
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.INVALID_PARAMS,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch custom error after failing to setup connector', async () => {
            adapter.init = jest.fn().mockRejectedValue(customErrorResult);
            eventMap['message'](message);
            await expect(adapter.init()).rejects.toBe(customErrorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.SETUP_CONNECTOR,
                payload: {
                    errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch SHOW_LOGIN after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_showStorageAccessTrue);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_showStorageAccessTrue);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SHOW_STORAGE_ACCESS, payload: {
                success: true
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.SHOW_STORAGE_ACCESS,
                payload: {
                    success: true
                },
                isError: false
            });
        });

        it('Should dispatch SHOW_LOGIN (isSilentLogin) after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_isSilentLogin);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_isSilentLogin);
        });

        it('Should dispatch SHOW_LOGIN (initResult_showStorageAccess as True) after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_showStorageAccessTrue);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_showStorageAccessTrue);
        });

        it('Should dispatch SHOW_LOGIN (initResult_showStorageAccess as False) after initialization', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_showStorageAccessFalse);
            eventMap['message'](message);
            await expect(adapter.init()).resolves.toBe(initResult_showStorageAccessFalse);
        });

        it('Should dispatch SHOW_STORAGE_ACCESS after initialization', async () => {
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
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: dummyPhoneCall
                },
                isError: false
            });
        });

        it('Should dispatch CONNECTOR_READY after initialization without any active calls', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(emptyActiveCallsResult);
            //expect(channelPort.postMessage).toHaveBeenCalledTimes(3);
            expect(channelPort.postMessage).toHaveBeenNthCalledWith(1, {
                type: constants.MESSAGE_TYPE.LOG,
                payload: {
                    eventType: "SETUP_CONNECTOR",
                    isError: false,
                    payload: {}
                }
            });
            expect(channelPort.postMessage).toHaveBeenNthCalledWith(2, {
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: null
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: null
                },
                isError: false
            });
        });

        it('Should dispatch CONNECTOR_READY on a failed getAgentConfig invocation', async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(invalidResult);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(invalidResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
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
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
        });
    });

    describe('Agent available', () => {
        it('Should replay active calls on agent available', async () => {
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.VOICE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult1);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload: {
                phoneNumber: dummyTransferredPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferredPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferredPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferredPhoneCall.callId
            }});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload: {
                phoneNumber: dummyTransferringPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferringPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferringPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferringPhoneCall.callId
            } });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: dummyRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: dummyConnectedPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED, payload: dummySupervisorRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED, payload: dummySupervisorConnectedPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN, payload: dummySupervisorBargedInPhoneCall });
        });

        it('Should replay active calls on agent available with barge in', async () => {
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.VOICE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult1);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload: {
                phoneNumber: dummyTransferredPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferredPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferredPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferredPhoneCall.callId
            }});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload: {
                phoneNumber: dummyTransferringPhoneCall.contact.phoneNumber,
                callInfo: dummyTransferringPhoneCall.callInfo,
                initialCallHasEnded: dummyTransferringPhoneCall.callAttributes.initialCallHasEnded,
                callId: dummyTransferringPhoneCall.callId
            } });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: dummyRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: dummyConnectedPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED, payload: dummySupervisorRingingPhoneCall });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED, payload: dummySupervisorConnectedPhoneCall });
        });

        it ('Should NOT replay active calls on when is not replayable', async () => {
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult2);
            fireMessage(constants.MESSAGE_TYPE.VOICE.AGENT_AVAILABLE, { isAvailable: true });
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult2);
            expect(channelPort.postMessage).toBeCalledTimes(1);
        });

        it ('Should NOT replay active calls on agent un-available', async () => {
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult1);
            fireMessage(constants.MESSAGE_TYPE.VOICE.AGENT_AVAILABLE, { isAvailable: false });
            expect(telephonyAdapter.getActiveCalls).not.toHaveBeenCalled();
        });
    });

    describe('SCVConnectorBase event tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayload,
                    callInProgress: dummyPhoneCall
                },
                isError: false
            });
        });

        describe('acceptCall()', () => {
            it('Should dispatch CAN_NOT_ACCEPT_THE_CALL on a failed acceptCall() invocation', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.acceptCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.INFO, payload: {
                    message: constants.INFO_TYPE.VOICE.CAN_NOT_ACCEPT_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.INFO_TYPE.VOICE.CAN_NOT_ACCEPT_THE_CALL,
                    payload: { 
                        messagetype: constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL, 
                        additionalInfo: {}
                    },
                    isError: false
                });
            });

            it('Should dispatch CALL_CONNECTED on a successful acceptCall() invocation', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.acceptCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                    payload: callResult.call,
                    isError: false
                });
            });

            it('Should dispatch CALL_STARTED on a successful acceptCall() invocation for callback', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(callbackResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.acceptCall()).resolves.toBe(callbackResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: callbackResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED,
                    payload: callbackResult.call,
                    isError: false
                });
            });

            it ('Should NOT dispatch acceptCall on outbound call', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL, {
                    call: {
                        callType: constants.CALL_TYPE.OUTBOUND
                    }
                });
                expect(telephonyAdapter.acceptCall).not.toHaveBeenCalled();
            });

            it ('Should NOT dispatch acceptCall on dialed callback call', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(dialedCallbackResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL, {
                    call: {
                        callType: constants.CALL_TYPE.DIALED_CALLBACK
                    }
                });
                expect(telephonyAdapter.acceptCall).not.toHaveBeenCalled();
            });

            it('Should dispatch custom error on a rejected acceptCall() invocation', async () => {
                telephonyAdapter.acceptCall = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.acceptCall()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('declineCall()', () => {
            it('Should dispatch custom error on a rejected declineCall() invocation', async () => {
                telephonyAdapter.declineCall = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DECLINE_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.declineCall()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DECLINE_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_DECLINE_THE_CALL on a failed declineCall() invocation', async () => {
                telephonyAdapter.declineCall = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DECLINE_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.declineCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_DECLINE_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DECLINE_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_DECLINE_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HANGUP on a successful declineCall() invocation', async () => {
                telephonyAdapter.declineCall = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DECLINE_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.declineCall()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HANGUP, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('endCall()', () => {
            it('Should NOT dispatch HANGUP on a failed endCall() invocation - invalid object', async () => {
                const error = 'error';
                telephonyAdapter.endCall = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.END_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.endCall()).rejects.toBe(error);
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.END_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should NOT dispatch HANGUP on a failed endCall() invocation - custom error', async () => {
                telephonyAdapter.endCall = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.END_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.endCall()).rejects.toBe(customErrorResult);
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.END_CALL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should NOT dispatch HANGUP on a successful endCall() invocation with non empty active calls', async () => {
                telephonyAdapter.endCall = jest.fn().mockResolvedValue();
                fireMessage(constants.MESSAGE_TYPE.VOICE.END_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.endCall()).resolves.toEqual();
            });

            it('Should dispatch HANGUP on a successful endCall() invocation with empty active calls', async () => {
                telephonyAdapter.endCall = jest.fn().mockResolvedValue(callHangUpResult);
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.END_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.endCall()).resolves.toEqual(callHangUpResult);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(emptyActiveCallsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HANGUP, payload: callHangUpResult.calls });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: callHangUpResult.calls,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_REMOVED on a successful endCall() invocation with non empty active calls', async () => {
                telephonyAdapter.endCall = jest.fn().mockResolvedValue(callHangUpResult);
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.END_CALL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.endCall()).resolves.toEqual(callHangUpResult);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(activeCallsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: callHangUpResult.calls[0] });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED,
                    payload: callHangUpResult.calls[0],
                    isError: false
                });
            });
        });

        describe('mute()', () => {
            it('Should dispatch CAN_NOT_MUTE_CALL on a failed mute() invocation', async () => {
                const error = 'error';
                telephonyAdapter.mute = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.MUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.mute()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_MUTE_CALL
                }});
            });

            it('Should dispatch custom error on a failed mute() invocation', async () => {
                telephonyAdapter.mute = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.MUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.mute()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            });

            it('Should dispatch MUTE_TOGGLE on a successful mute() invocation', async () => {
                telephonyAdapter.mute = jest.fn().mockResolvedValue(muteToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.MUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                const result = await telephonyAdapter.mute();
                const payload = { isMuted: result.isMuted };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('unmute()', () => {
            it('Should dispatch CAN_NOT_UNMUTE_CALL on a failed unmute() invocation', async () => {
                const error = 'error';
                telephonyAdapter.unmute = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.UNMUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.unmute()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_UNMUTE_CALL
                }});
            });

            it('Should dispatch custom error on a rejected unmute() invocation', async () => {
                telephonyAdapter.unmute = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.UNMUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.unmute()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            });

            it('Should dispatch CAN_NOT_UNMUTE_CALL on a rejected unmute() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_UNMUTE_CALL });
                telephonyAdapter.unmute = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.UNMUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.unmute()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_UNMUTE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.UNMUTE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_UNMUTE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch MUTE_TOGGLE on a successful unmute() invocation', async () => {
                telephonyAdapter.unmute = jest.fn().mockResolvedValue(unmuteToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.UNMUTE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                const result = await telephonyAdapter.unmute();
                const payload = { isMuted: result.isMuted };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('hold()', () => {
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on default failed hold() invocation', async () => {
                telephonyAdapter.hold = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.HOLD);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.hold()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected hold() invocation', async () => {
                telephonyAdapter.hold = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.HOLD);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.hold()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.HOLD,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected hold() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT });
                telephonyAdapter.hold = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.HOLD);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.hold()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.HOLD,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_HOLD_CALL on untyped rejected hold() invocation', async () => {
                telephonyAdapter.hold = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.HOLD);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.hold()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_HOLD_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.HOLD,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_HOLD_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful hold() invocation', async () => {
                telephonyAdapter.hold = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.HOLD);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.hold()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('resume()', () => {
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on default failed resume() invocation', async () => {
                telephonyAdapter.resume = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resume()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected resume() invocation', async () => {
                telephonyAdapter.resume = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resume()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.RESUME,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_PARTICIPANT on typed rejected resume() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT });
                telephonyAdapter.resume = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resume()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.RESUME,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_CALL on untyped rejected resume() invocation', async () => {
                telephonyAdapter.resume = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resume()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_RESUME_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.RESUME,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_RESUME_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful resume() invocation', async () => {
                telephonyAdapter.resume = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resume()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
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

            it('Should dispatch custom error on a rejected setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS);
                await expect(adapter.setAgentStatus()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.SET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
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

            it('Should dispatch SET_AGENT_STATUS_RESULT with failure on a failed setAgentStatus() invocation', async () => {
                adapter.setAgentStatus = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.SET_AGENT_STATUS, { agentStatus: 'dummyAgentStatus', statusInfo: dummyStatusInfo });
                await expect(adapter.setAgentStatus(message.data.agentStatus, message.data.statusInfo)).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_SET_AGENT_STATUS
                }});
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SET_AGENT_STATUS_RESULT, payload: { success: false } });
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

        describe('getAgentStatus', () => {
            it('Should dispatch GET_AGENT_STATUS_RESULT on a successful getAgentStatus() invocation', async () => {
                const agentVendorStatusInfo = new AgentVendorStatusInfo({ statusId: "statusId", statusType: "statusType", statusName: "statusName" });
                adapter.getAgentStatus = jest.fn().mockResolvedValue(agentVendorStatusInfo);
                fireMessage(constants.MESSAGE_TYPE.GET_AGENT_STATUS);
                await expect(adapter.getAgentStatus()).resolves.toBe(agentVendorStatusInfo);
                const payload = { statusId: agentVendorStatusInfo.statusId, statusType: agentVendorStatusInfo.statusType, statusName: agentVendorStatusInfo.statusName };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.GET_AGENT_STATUS_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.GET_AGENT_STATUS_RESULT,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch custom error on a rejected getAgentStatus() invocation', async () => {
                adapter.getAgentStatus = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.GET_AGENT_STATUS);
                await expect(adapter.getAgentStatus()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.GET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_GET_AGENT_STATUS on a failed getAgentStatus() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS });
                adapter.getAgentStatus = jest.fn().mockResolvedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.GET_AGENT_STATUS);
                await expect(adapter.getAgentStatus()).resolves.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.GET_AGENT_STATUS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('dial()', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on default failed dial() invocation', async () => {
                telephonyAdapter.dial = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on typed rejected dial() invocation', async () => {
                telephonyAdapter.dial = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch GENERIC_ERROR on typed rejected dial() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.GENERIC_ERROR });
                telephonyAdapter.dial = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.GENERIC_ERROR
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.GENERIC_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_DESTINATION on typed rejected dial() invocation', async () => {
                const errorResult = new ErrorResult({ type: Constants.ERROR_TYPE.VOICE.INVALID_DESTINATION });
                telephonyAdapter.dial = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_DESTINATION
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_DESTINATION,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_START_THE_CALL on untyped rejected dial() invocation', async () => {
                telephonyAdapter.dial = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_FAILED });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.DIAL,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CALL_STARTED on a successful dial() invocation', async () => {
                telephonyAdapter.dial = jest.fn().mockResolvedValue(callResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).resolves.toBe(callResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
            });

            it('Should dispatch QUEUED_CALL_STARTED on a successful dial(contact, { iscallback } ) invocation', async () => {
                telephonyAdapter.dial = jest.fn().mockResolvedValue(dialedCallbackResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.DIAL, { contact: dummyContact , params: 'isCallback=true' });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.dial()).resolves.toBe(dialedCallbackResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED, payload: dialedCallbackResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED,
                    payload: dialedCallbackResult.call,
                    isError: false
                });
            });
        });

        describe('getPhoneContacts()', () => {
            it('Should dispatch custom error on a rejected getPhoneContacts() invocation', async () => {
                telephonyAdapter.getPhoneContacts = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.GET_PHONE_CONTACTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getPhoneContacts()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.GET_PHONE_CONTACTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_GET_PHONE_CONTACTS on a failed getPhoneContacts() invocation', async () => {
                telephonyAdapter.getPhoneContacts = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.GET_PHONE_CONTACTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getPhoneContacts()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_GET_PHONE_CONTACTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.GET_PHONE_CONTACTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_GET_PHONE_CONTACTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch PHONE_CONTACTS on a successful getPhoneContacts() invocation', async () => {
                telephonyAdapter.getPhoneContacts = jest.fn().mockResolvedValue(phoneContactsResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.GET_PHONE_CONTACTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getPhoneContacts()).resolves.toBe(phoneContactsResult);
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
                const payload = { contacts, contactTypes };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PHONE_CONTACTS, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PHONE_CONTACTS,
                    payload,
                    isError: false
                });
            });
        });

        describe('getContacts()', () => {
            it('Should dispatch custom error on a rejected getContacts() invocation', async () => {
                adapter.getContacts = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.GET_CONTACTS);
                await expect(adapter.getContacts()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.GET_CONTACTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch GET_CONTACTS_RESULT on a successful getContacts() invocation', async () => {
                adapter.getContacts = jest.fn().mockResolvedValue(contactsResult);
                fireMessage(constants.MESSAGE_TYPE.GET_CONTACTS);
                await expect(adapter.getContacts()).resolves.toBe(contactsResult);
                const contacts = contactsResult.contacts.map((contact) => {
                    return {
                        id: contact.id,
                        endpointARN: contact.endpointARN,
                        phoneNumber: contact.phoneNumber,
                        name: contact.name,
                        type: contact.type,
                        availability: contact.availability
                    };
                });
                const payload = { contacts, contactTypes };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.GET_CONTACTS_RESULT, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.GET_CONTACTS_RESULT,
                    payload,
                    isError: false
                });
            });
        });

        describe('sendDigits()', () => {
            it('Should be able to invoke sendDigits()', async () => {
                fireMessage(constants.MESSAGE_TYPE.VOICE.SEND_DIGITS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.sendDigits()).resolves.not.toThrow();
            });

            it('Should dispatch event log on failed sendDigits()', async () => {
                telephonyAdapter.sendDigits = jest.fn().mockImplementationOnce(() => { throw new Error; });
                fireMessage(constants.MESSAGE_TYPE.VOICE.SEND_DIGITS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SEND_DIGITS,
                    payload: undefined,
                    isError: true
                });
            });
        });

        describe('swap()', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a invalid swap() payload', async () => {
                telephonyAdapter.swap = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.swap()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected swap() invocation', async () => {
                telephonyAdapter.swap = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.swap()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed swap() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS });
                telephonyAdapter.swap = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.swap()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful swap() invocation', async () => {
                telephonyAdapter.swap = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SWAP_PARTICIPANTS);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.swap()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold,
                    calls: holdToggleResult.calls
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('conference()', () => {
            it('Should dispatch CAN_NOT_CONFERENCE on an invalid conference() payload', async () => {
                telephonyAdapter.conference = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.CONFERENCE);
                
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.conference()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch HOLD_TOGGLE on a successful conference() invocation', async () => {
                telephonyAdapter.conference = jest.fn().mockResolvedValue(holdToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.CONFERENCE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.conference()).resolves.toBe(holdToggleResult);
                const payload = {
                    isThirdPartyOnHold: holdToggleResult.isThirdPartyOnHold,
                    isCustomerOnHold: holdToggleResult.isCustomerOnHold
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch custom error on a rejected conference() invocation', async () => {
                telephonyAdapter.conference = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.CONFERENCE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.conference()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.CONFERENCE,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on a failed conference() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE });
                telephonyAdapter.conference = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.CONFERENCE);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.conference()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.CONFERENCE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('addParticipant()', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on default failed addParticipant() invocation', async () => {
                telephonyAdapter.addParticipant = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on typed rejected addParticipant() invocation', async () => {
                telephonyAdapter.addParticipant = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch INVALID_DESTINATION on typed rejected addParticipant() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.INVALID_DESTINATION });
                telephonyAdapter.addParticipant = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_DESTINATION
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_DESTINATION,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on untyped rejected addParticipant() invocation', async () => {
                telephonyAdapter.addParticipant = jest.fn().mockRejectedValue(error);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).rejects.toBe(error);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: {
                    reason: constants.EVENT_TYPE.ERROR.toLowerCase()
                }});
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch PARTICIPANT_ADDED on a successful addParticipant() invocation', async () => {
                telephonyAdapter.addParticipant = jest.fn().mockResolvedValue(participantResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { contact: dummyContact });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).resolves.toBe(participantResult);
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_ADDED on a successful addParticipant() invocation with blind transfer', async () => {
                telephonyAdapter.addParticipant = jest.fn().mockResolvedValue(participantResult);
                const isBlindTransfer = true;
                fireMessage(constants.MESSAGE_TYPE.VOICE.ADD_PARTICIPANT, { call: dummyPhoneCall, contact: dummyContact, isBlindTransfer });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.addParticipant()).resolves.toBe(participantResult);
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });
        });

        describe('pauseRecording()', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on an invalid pauseRecording() payload', async () => {
                telephonyAdapter.pauseRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.pauseRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected pauseRecording() invocation', async () => {
                telephonyAdapter.pauseRecording = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.pauseRecording()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a rejected pauseRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_PAUSE_RECORDING });
                telephonyAdapter.pauseRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.pauseRecording()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_PAUSE_RECORDING
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_PAUSE_RECORDING,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch RECORDING_TOGGLE on a successful pauseRecording() invocation', async () => {
                telephonyAdapter.pauseRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.PAUSE_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.pauseRecording()).resolves.toBe(recordingToggleResult);
                const payload = {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('resumeRecording()', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on a failed resumeRecording() payload', async () => {
                telephonyAdapter.resumeRecording = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resumeRecording()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected resumeRecording() invocation', async () => {
                telephonyAdapter.resumeRecording = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resumeRecording()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_RESUME_RECORDING on a failed resumeRecording() invocation', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_RESUME_RECORDING });
                telephonyAdapter.resumeRecording = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resumeRecording()).rejects.toBe(errorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_RESUME_RECORDING
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_RESUME_RECORDING,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch RECORDING_TOGGLE on a successful resumeRecording() invocation', async () => {
                telephonyAdapter.resumeRecording = jest.fn().mockResolvedValue(recordingToggleResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.RESUME_RECORDING);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.resumeRecording()).resolves.toBe(recordingToggleResult);
                const payload = {
                    isRecordingPaused: recordingToggleResult.isRecordingPaused,
                    contactId: recordingToggleResult.contactId,
                    initialContactId: recordingToggleResult.initialContactId,
                    instanceId: recordingToggleResult.instanceId,
                    region: recordingToggleResult.region
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload,
                    isError: false
                });
            });
        });

        describe('logout()', () => {
            it('Should dispatch custom error on a rejected logout() invocation', async () => {
                adapter.logout = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.LOGOUT);
                await expect(adapter.logout()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.LOGOUT,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

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
                fireMessage(constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG, config);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.setAgentConfig()).resolves.toBe(genericResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.AGENT_CONFIG_UPDATED, payload: genericResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.AGENT_CONFIG_UPDATED,
                    payload: genericResult,
                    isError: false
                });
            });
            it('Should dispatch CAN_NOT_SET_AGENT_CONFIG on a invalid response from setAgentConfig() invocation', async () => {
                telephonyAdapter.setAgentConfig = jest.fn().mockResolvedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG, config);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.setAgentConfig()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SET_AGENT_CONFIG
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SET_AGENT_CONFIG,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch custom error on a rejected setAgentConfig() invocation', async () => {
                telephonyAdapter.setAgentConfig = jest.fn().mockRejectedValue(customErrorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG, config);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.setAgentConfig()).rejects.toBe(customErrorResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch CAN_NOT_SET_AGENT_CONFIG on a rejected response from setAgentConfig() invocation', async () => {
                telephonyAdapter.setAgentConfig = jest.fn().mockRejectedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG, config);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.setAgentConfig()).rejects.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SET_AGENT_CONFIG
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SET_AGENT_CONFIG,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should reject response from setAgentConfig() on phone validation error', async () => {
                const errorResult = new ErrorResult({ type: constants.ERROR_TYPE.VOICE.CAN_NOT_UPDATE_PHONE_NUMBER });
                telephonyAdapter.setAgentConfig = jest.fn().mockRejectedValue(errorResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.SET_AGENT_CONFIG, config);
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.setAgentConfig()).rejects.toBe(errorResult);
            });
        });

        describe('wrapUpCall()', () => {
            it('Should invoke wrapUpCall()', async () => {
                fireMessage(constants.MESSAGE_TYPE.VOICE.WRAP_UP_CALL, { call: dummyPhoneCall });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                expect(telephonyAdapter.wrapUpCall).toBeCalledWith(dummyPhoneCall);
            });
        });

        describe('getSignedRecordingUrl()', () => {
            it('Should invoke getSignedRecordingUrl on a failed call', async () => {
                telephonyAdapter.getSignedRecordingUrl = jest.fn().mockRejectedValue(invalidResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.GET_SIGNED_RECORDING_URL, {
                    recordingUrl: 'recordingUrl',
                    vendorCallKey: 'vendorCallKey',
                    callId: 'callId'
                });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getSignedRecordingUrl()).rejects.toBe(invalidResult);
                const signedRecordingUrlResult = new SignedRecordingUrlResult({ success: false });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.GET_SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult,
                    isError: true
                });
            });

            it('Should invoke getSignedRecordingUrl successfully', async () => {
                telephonyAdapter.getSignedRecordingUrl = jest.fn().mockResolvedValue(signedRecordingUrlResult);
                fireMessage(constants.MESSAGE_TYPE.VOICE.GET_SIGNED_RECORDING_URL, {
                    recordingUrl: 'recordingUrl',
                    vendorCallKey: 'vendorCallKey',
                    callId: 'callId'
                });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getSignedRecordingUrl()).resolves.toBe(signedRecordingUrlResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.SIGNED_RECORDING_URL,
                    payload: signedRecordingUrlResult,
                    isError: false
                });
            });
        })

        describe('downloadLogs()', () => {
            it('Should invoke downloadLogs() when DOWNLOAD_VENDOR_LOGS is published', () => {
                fireMessage(constants.MESSAGE_TYPE.DOWNLOAD_VENDOR_LOGS);
                expect(adapter.downloadLogs).toBeCalledTimes(1);
            });
        });

        describe('logMessageToVendor()', () => {
            it('Should invoke logMessageToVendor() when MESSAGE_TYPE.LOG is published', () => {
                fireMessage(constants.MESSAGE_TYPE.LOG, {
                    logLevel: "INFO",
                    logMessage: "Some message",
                    payload: {
                        a: "b",
                        c: "d"
                    }
                });
                expect(adapter.logMessageToVendor).toBeCalledWith("INFO", "Some message", {
                        a: "b",
                        c: "d"
                    });
            });
        });

        describe('onAgentWorkEvent()', () => {
            it('Should invoke onAgentWorkEvent() when MESSAGE_TYPE.AGENT_WORK_EVENT is published', () => {
                const workItemId = 'workItemId';
                const workId = 'workId';
                const workEvent = 'ASSIGNED';
                fireMessage(constants.MESSAGE_TYPE.AGENT_WORK_EVENT, {
                    agentWork: {
                        workItemId,
                        workId,
                        workEvent
                }});
                expect(adapter.onAgentWorkEvent).toBeCalledWith({ workItemId, workId, workEvent });
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
                telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: {
                    success: genericResult.success
                }});
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        capabilities: capabilitiesPayload,
                        callInProgress: dummyPhoneCall
                    }
                });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        capabilities: capabilitiesPayload,
                        callInProgress: dummyPhoneCall
                    },
                    isError: false
                });
            });

            it('Should dispatch CONNECTOR_READY on a successful LOGIN_RESULT payload', async () => {
                telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
                telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.LOGIN_RESULT, payload: genericResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.LOGIN_RESULT,
                    payload: genericResult,
                    isError: false
                });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
                await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        capabilities: capabilitiesPayload,
                        callInProgress: dummyPhoneCall
                    }
                });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                    payload: {
                        agentConfig: agentConfigPayload,
                        capabilities: capabilitiesPayload,
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
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED,
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
                const agentStatusInfo = new AgentStatusInfo({ statusId: "statusId" });
                publishEvent({ eventType: Constants.EVENT_TYPE.SET_AGENT_STATUS, payload: agentStatusInfo });
                const payload = { statusId: agentStatusInfo.statusId };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.SET_AGENT_STATUS, payload: payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.SET_AGENT_STATUS,
                    payload: payload,
                    isError: false
                });
            });
        });

        describe('GET_AGENT_STATUS event', () => {
            it('Should dispatch GET_AGENT_STATUS', async () => {
                const agentVendorStatusInfo = new AgentVendorStatusInfo({ statusId: "statusId", statusType: "statusType", statusName: "statusName" });
                publishEvent({ eventType: Constants.EVENT_TYPE.GET_AGENT_STATUS, payload: agentVendorStatusInfo});
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.GET_AGENT_STATUS, payload: agentVendorStatusInfo });
                expect(channelPort.postMessage).toHaveBeenCalled();
            });

            it('Should dispatch CAN_NOT_GET_AGENT_STATUS', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.GET_AGENT_STATUS, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.CAN_NOT_GET_AGENT_STATUS
                }});
            });
        });

        describe('call barge in', () => {
            it('Should dispatch CALL_BARGED_IN', async () => {
                publishEvent({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: supervisedCallInfo });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: supervisedCallInfo });
                expect(channelPort.postMessage).toHaveBeenCalled();
            });

            it('Should dispatch GENERIC_ERROR', async () => {
                publishEvent({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.GENERIC_ERROR
                }});
            });
        });

        describe('QUEUED_CALL_STARTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch QUEUED_CALL_STARTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('CALL_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_START_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch CALL_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                    payload: callResult.call,
                    isError: false
                });
            });
        });

        describe('HANGUP event', () => {
            it('Should dispatch CAN_NOT_END_THE_CALL on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.HANGUP, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_END_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch HANGUP on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.HANGUP, payload: callHangUpResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.HANGUP, payload: callHangUpResult.calls });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: callHangUpResult.calls,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_ADDED event', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch PARTICIPANT_ADDED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload: participantResult });
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_CONNECTED event', () => {
            it('Should dispatch CAN_NOT_CONNECT_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONNECT_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONNECT_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch PARTICIPANT_CONNECTED on a valid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload: participantResult });
                const payload = {
                    initialCallHasEnded: participantResult.initialCallHasEnded,
                    callInfo: participantResult.callInfo,
                    phoneNumber: participantResult.phoneNumber,
                    callId: participantResult.callId
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED,
                    payload,
                    isError: false
                });
            });
        });

        describe('PARTICIPANT_REMOVED event', () => {
            it('Should dispatch CAN_NOT_HANGUP_PARTICIPANT on an invalid payload', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_HANGUP_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_HANGUP_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('Should dispatch PARTICIPANT_REMOVED on a valid payload', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: thirdPartyRemovedResult });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    reason: thirdPartyRemovedResult.reason
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_REMOVED on a empty payload', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: new CallResult({}) });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    reason: null
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED,
                    payload,
                    isError: false
                });
            });

            it('Should not dispatch error when PARTICIPANT_REMOVED is sent but activeCalls payload is not valid', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(invalidResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: thirdPartyRemovedResult });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(invalidResult);
                expect(channelPort.postMessage).not.toHaveBeenCalledWith();
            }); 

            it('Should dispatch HangUp with removing initial caller and empty active calls', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(emptyActiveCallsResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(emptyActiveCallsResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.HANGUP, payload: initialCallerRemovedResult.call });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: initialCallerRemovedResult.call,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_ADDED with removing initial caller and transferring active calls', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferringCallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferringCallResult);
                const payload = {
                    initialCallHasEnded : true
                };
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload,
                    isError: false
                });
            });

            it('Should dispatch PARTICIPANT_CONNECTED with removing initial caller and transferred active calls', async () => {
                telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(dummyActiveTransferredallResult);
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, payload: initialCallerRemovedResult });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.getActiveCalls()).resolves.toEqual(dummyActiveTransferredallResult);
                const payload = {
                    initialCallHasEnded : true
                };
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED,
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
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.AFTER_CALL_WORK_STARTED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.AFTER_CALL_WORK_STARTED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.AFTER_CALL_WORK_STARTED,
                    payload,
                    isError: false
                });
            });
        });

        describe('STATE_CHANGE event', () => {
            it('Should dispatch STATE_CHANGE on a payload', async () => {
                const newVendorStateInfo = new AgentVendorStatusInfo({ statusId: 'newStatusId', statusName: 'newStateName', statusType: 'newStateType' });
                const oldVendorStateInfo = new AgentVendorStatusInfo({ statusId: 'oldStatusId', statusName: 'oldStateName', statusType: 'oldStateType' });
                const stateChangeResult = new StateChangeResult({ newVendorStateInfo: newVendorStateInfo, oldVendorStateInfo: oldVendorStateInfo});
                publishEvent({ eventType: Constants.EVENT_TYPE.STATE_CHANGE, payload: stateChangeResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.STATE_CHANGE, payload: stateChangeResult });
                expect(channelPort.postMessage).toHaveBeenCalled();
            });

            it('Should dispatch STATE_CHANGE on a payload without valid non-required params', async () => {
                const newVendorStateInfo = new AgentVendorStatusInfo({statusName: 'newStateName'});
                const stateChangeResult = new StateChangeResult({newVendorStateInfo: newVendorStateInfo });
                publishEvent({ eventType: Constants.EVENT_TYPE.STATE_CHANGE, payload: stateChangeResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.STATE_CHANGE, payload: stateChangeResult });
                expect(channelPort.postMessage).toHaveBeenCalled();
            });

            it('Should dispatch INVALID_STATE_CHANGE_RESULT', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.STATE_CHANGE, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.INVALID_STATE_CHANGE_RESULT
                }});
            });
        });

        describe('WRAP_UP_ENDED event', () => {
            it('Should dispatch WRAP_UP_ENDED on a payload', async () => {
                const payload = { payload: 'payload' }; 
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.WRAP_UP_ENDED, payload });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.WRAP_UP_ENDED, payload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.WRAP_UP_ENDED,
                    payload,
                    isError: false
                });
            });
        });

        describe('REMOTE_CONTROLLER event', () => {
            it('Should call channelMessageHandler with payload', async () => {
                const message = { data: {
                    type: constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL
                }};
                telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(invalidResult);
                publishEvent({ eventType: constants.EVENT_TYPE.REMOTE_CONTROLLER, payload: message });
                assertChannelPortPayloadEventLog({
                    eventType: constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL,
                    payload: { type: constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL },
                    isError: false
                });
                await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
                await expect(telephonyAdapter.acceptCall()).resolves.toBe(invalidResult);
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.INFO, payload: {
                    message: constants.INFO_TYPE.VOICE.CAN_NOT_ACCEPT_THE_CALL
                }});
            });
        });

        describe('MUTE_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_MUTE on an invalid payload from deskphone', async () => {
                const payload = { isMuted : false };
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_MUTE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_MUTE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch MUTE_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, payload: muteToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, payload: muteToggleResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE,
                    payload: muteToggleResult,
                    isError: false
                });
            });
        });

        describe('HOLD_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_HOLD on an invalid payload from deskphone', async () => {
                const payload = { isCustomerOnHold : false };
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('RECORDING_TOGGLE event from deskphone', () => {
            it('Should dispatch CAN_NOT_TOGGLE_RECORD on an invalid payload from deskphone', async () => {
                const payload = { isRecordingPaused : true };
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, payload });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
    
            it('Should dispatch RECORDING_TOGGLE on a valid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, payload: recordingToggleResult });
                assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, payload: recordingToggleResult });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload: recordingToggleResult,
                    isError: false
                });
            });
        });

        describe('swap from deskphone', () => {
            it('Should dispatch CAN_NOT_SWAP_PARTICIPANTS on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANTS_SWAPPED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('conference from deskphone', () => {
            it('Should dispatch CAN_NOT_CONFERENCE on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('addParticipant from deskphone', () => {
            it('Should dispatch CAN_NOT_ADD_PARTICIPANT on an invalid payload from deskphone', async () => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, payload: invalidResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
        });

        describe('publishError event', () => {
            it('Custom Error', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED, error: customErrorResult });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            it('PARTICIPANTS_CONFERENCED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_CONFERENCED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONFERENCE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANTS_SWAPPED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANTS_SWAPPED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANTS_SWAPPED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SWAP_PARTICIPANTS,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('RECORDING_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.RECORDING_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_RECORD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HOLD_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_HOLD,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HOLD_TOGGLE, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.HOLD_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HOLD_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('MUTE_TOGGLE', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.MUTE_TOGGLE, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_MUTE
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.MUTE_TOGGLE,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_TOGGLE_MUTE,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_REMOVED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_HANGUP_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_REMOVED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_HANGUP_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_CONNECT_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_CONNECT_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_ADDED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_ADD_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('PARTICIPANT_ADDED, INVALID_PARTICIPANT', async () => {
                const error = { type: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT };
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.PARTICIPANT_ADDED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.INVALID_PARTICIPANT,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('HANGUP', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.HANGUP, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_END_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.HANGUP,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_END_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('CALL_CONNECTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('QUEUED_CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.QUEUED_CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
                        error: expect.anything()
                    },
                    isError: true
                });
            });
            it('CALL_STARTED', async () => {
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.CALL_STARTED, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.CALL_STARTED,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_START_THE_CALL,
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
                publishError({ eventType: Constants.EVENT_TYPE.VOICE.AGENT_ERROR, error });
                assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                    message: constants.ERROR_TYPE.VOICE.AGENT_ERROR
                }});
                assertChannelPortPayloadEventLog({
                    eventType: constants.EVENT_TYPE.VOICE.AGENT_ERROR,
                    payload: {
                        errorType: constants.ERROR_TYPE.VOICE.AGENT_ERROR,
                        error: expect.anything()
                    },
                    isError: true
                });
            });

            describe('SOFTPHONE_ERROR', () => {
                it('should publish generic SOFTPHONE_ERROR for unknown error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR, error });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.GENERIC_ERROR
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.GENERIC_ERROR,
                            error: expect.anything()
                        },
                        isError: true
                    });
                });

                it('should publish UNSUPPORTED_BROWSER SOFTPHONE_ERROR for microhone error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR, error: constants.ERROR_TYPE.VOICE.UNSUPPORTED_BROWSER });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.VOICE.UNSUPPORTED_BROWSER
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.VOICE.UNSUPPORTED_BROWSER,
                            error: expect.anything()
                        },
                        isError: true
                    });
                });

                it('should publish MICROPHONE_NOT_SHARED SOFTPHONE_ERROR for microphone error', async () => {
                    publishError({ eventType: Constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR, error: constants.ERROR_TYPE.VOICE.MICROPHONE_NOT_SHARED });
                    assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                        message: constants.ERROR_TYPE.VOICE.MICROPHONE_NOT_SHARED
                    }});
                    assertChannelPortPayloadEventLog({
                        eventType: constants.EVENT_TYPE.VOICE.SOFTPHONE_ERROR,
                        payload: {
                            errorType: constants.ERROR_TYPE.VOICE.MICROPHONE_NOT_SHARED,
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

            it('the event contains a function', async () => {
                const eventType = 'anyEvent';
                const payload = {
                    firstname: 'Jon',
                    key: (param) => {
                        return param
                    }
                };
                const expectedPayload = {
                    firstname: 'Jon'
                };
                const isError = true;
                publishLog({ eventType, payload, isError });
                expect(channelPort.postMessage).toHaveBeenCalledWith({
                    type: constants.MESSAGE_TYPE.LOG,
                    payload: {
                        eventType,
                        payload: expectedPayload,
                        isError
                    }
                });
            });
        });
    });

    describe('MOS tests', () => {
        beforeEach(async () => {
            adapter.init = jest.fn().mockResolvedValue(initResult_connectorReady);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResultWithMos);
            telephonyAdapter.getActiveCalls = jest.fn().mockResolvedValue(activeCallsResult);
            eventMap['message'](message);
            expect(adapter.init).toHaveBeenCalledWith(constants.CONNECTOR_CONFIG);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(adapter.init()).resolves.toBe(initResult_connectorReady);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResultWithMos);
            await expect(telephonyAdapter.getActiveCalls()).resolves.toBe(activeCallsResult);
            expect(channelPort.postMessage).toHaveBeenCalledWith({
                type: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayloadWithMos,
                    callInProgress: dummyPhoneCall
                }
            });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.CONNECTOR_READY,
                payload: {
                    agentConfig: agentConfigPayload,
                    capabilities: capabilitiesPayloadWithMos,
                    callInProgress: dummyPhoneCall
                },
                isError: false
            });
        });
        it('Should calculate MOS for only inputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElementWithAudioInput]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.3672791040000005} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.3672791040000005},
                isError: false
            });
        });
        it('Should calculate MOS for only ouputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElementWithAudioOutput]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, stats: [dummyAudioStatsElementWithAudioOutput], isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.358684488140626} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.358684488140626},
                isError: false
            });
        });
        it('Should calculate MOS for both inputChannel and ouputChannel', async () => {
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult });
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({})});
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({stats: [dummyAudioStatsElement]})});
            
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: new AudioStats({callId: dummyCallId, stats: [dummyAudioStatsElementWithAudioOutput], isAudioStatsCompleted: true}) });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED, payload: {callId: dummyCallId, mos: 4.358684488140626} });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS_COMPLETED,
                payload: {callId: dummyCallId, mos: 4.358684488140626},
                isError: false
            });
        });
        it('Should not throw error on invalid payload when update', async () => {
            expect(() => {
                publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.UPDATE_AUDIO_STATS, payload: callResult });
            }).not.toThrowError();
        });
    });

    describe('Supervisor tests', () => {

        beforeEach(async () => {
            eventMap['message'](message);
        });

        it('Should invoke supervise Call successfully', async () => {
            telephonyAdapter.superviseCall = jest.fn().mockResolvedValue(superviseCallResult);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResultWithSoftphone);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.superviseCall()).resolves.toBe(superviseCallResult);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResultWithSoftphone);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should disconnect supervisor call before dispatching CALL_CONNECTED on a successful acceptCall() invocation', async () => {
            telephonyAdapter.acceptCall = jest.fn().mockResolvedValue(callResult);
            telephonyAdapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            telephonyAdapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.ACCEPT_CALL);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            await expect(telephonyAdapter.acceptCall()).resolves.toBe(callResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                payload: callResult.call,
                isError: false
            });
        });

        it('Should disconnect supervisor call before dispatching CALL_CONNECTED on a valid payload', async () => {
            telephonyAdapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            telephonyAdapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            publishEvent({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            assertChannelPortPayload({ eventType: Constants.EVENT_TYPE.VOICE.CALL_CONNECTED, payload: callResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.CALL_CONNECTED,
                payload: callResult.call,
                isError: false
            });
        });

        it('Should invoke supervise Call successfully for Deskphone', async () => {
            telephonyAdapter.superviseCall = jest.fn().mockResolvedValue(superviseDeskphoneCallResult);
            telephonyAdapter.getAgentConfig = jest.fn().mockResolvedValue(agentConfigResult);
            telephonyAdapter.getCapabilities = jest.fn().mockResolvedValue(capabilitiesResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.superviseCall()).resolves.toBe(superviseDeskphoneCallResult);
            await expect(telephonyAdapter.getAgentConfig()).resolves.toBe(agentConfigResult);
            await expect(telephonyAdapter.getCapabilities()).resolves.toBe(capabilitiesResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED,
                payload: superviseDeskphoneCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED,
                payload: superviseDeskphoneCallResult.call,
                isError: false
            });
        });

        it('Should dispatch custom error on a rejected superviseCall() invocation', async () => {
            telephonyAdapter.superviseCall = jest.fn().mockRejectedValue(customErrorResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.superviseCall()).rejects.toBe(customErrorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL,
                payload: {
                    errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on a failed superviseCall() invocation', async () => {
            telephonyAdapter.superviseCall = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL);
            await expect(telephonyAdapter.superviseCall()).resolves.toBe(invalidResult);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISE_CALL,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should disconnect Call successfully', async () => {
            telephonyAdapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).resolves.toBe(supervisorHangupResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls,
                isError: false
            });
        });

        it('Should disconnect Calls successfully', async () => {
            telephonyAdapter.supervisorDisconnect = jest.fn().mockResolvedValue(supervisorHangupMultipleCallsResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).resolves.toBe(supervisorHangupMultipleCallsResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: supervisorHangupMultipleCallsResult.calls});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: supervisorHangupMultipleCallsResult.calls,
                isError: false
            });
        });

        it('Should dispatch custom error on a rejected supervisorDisconnect() invocation', async () => {
            telephonyAdapter.supervisorDisconnect = jest.fn().mockRejectedValue(customErrorResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).rejects.toBe(customErrorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT,
                payload: {
                    errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch CAN_NOT_DISCONNECT_SUPERVISOR on a failed supervisorDisconnect() invocation', async () => {
            telephonyAdapter.supervisorDisconnect = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorDisconnect()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_DISCONNECT_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISOR_DISCONNECT,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_DISCONNECT_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should barge in successfully', async () => {
            telephonyAdapter.supervisorBargeIn = jest.fn().mockResolvedValue(superviseCallResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_BARGE_IN, {
                call: {}
            });
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorBargeIn()).resolves.toBe(superviseCallResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch custom error on a rejected supervisorBargeIn() invocation', async () => {
            telephonyAdapter.supervisorBargeIn = jest.fn().mockRejectedValue(customErrorResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_BARGE_IN);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorBargeIn()).rejects.toBe(customErrorResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: dummyCustomErrorPayload });
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISOR_BARGE_IN,
                payload: {
                    errorType: constants.ERROR_TYPE.CUSTOM_ERROR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch CAN_NOT_BARGE_IN_SUPERVISOR on a failed supervisorBargeIn() invocation', async () => {
            telephonyAdapter.supervisorBargeIn = jest.fn().mockResolvedValue(invalidResult);
            fireMessage(constants.MESSAGE_TYPE.VOICE.SUPERVISOR_BARGE_IN);
            await expect(adapter.getTelephonyConnector()).resolves.toBe(telephonyAdapter);
            await expect(telephonyAdapter.supervisorBargeIn()).resolves.toBe(invalidResult);
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_BARGE_IN_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.MESSAGE_TYPE.VOICE.SUPERVISOR_BARGE_IN,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_BARGE_IN_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });


        it('publish SUPERVISOR_BARGED_IN event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_BARGE_IN_SUPERVISOR on an invalid payload', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_BARGE_IN_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_BARGED_IN,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_BARGE_IN_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('publish SUPERVISOR_CALL_STARTED event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on an invalid payload', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_STARTED,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });


        it('publish SUPERVISOR_CALL_CONNECTED event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED, payload: superviseCallResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED, payload:superviseCallResult.call });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED,
                payload: superviseCallResult.call,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_SUPERVISE_CALL on an invalid payload for SUPERVISOR_CALL_CONNECTED', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_CALL_CONNECTED,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_SUPERVISE_CALL,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('publish SUPERVISOR_HANGUP event', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP, payload: supervisorHangupResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP, payload:supervisorHangupResult.calls });
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: supervisorHangupResult.calls,
                isError: false
            });
        });

        it('Should dispatch CAN_NOT_DISCONNECT_SUPERVISOR on an invalid payload for SUPERVISOR_HANGUP', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.VOICE.CAN_NOT_DISCONNECT_SUPERVISOR
            }});
            assertChannelPortPayloadEventLog({
                eventType: constants.EVENT_TYPE.VOICE.SUPERVISOR_HANGUP,
                payload: {
                    errorType: constants.ERROR_TYPE.VOICE.CAN_NOT_DISCONNECT_SUPERVISOR,
                    error: expect.anything()
                },
                isError: true
            });
        });

        it('Should dispatch CALL_BARGED_IN', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: supervisedCallInfo });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: supervisedCallInfo });
            expect(channelPort.postMessage).toHaveBeenCalled();
        });

        it('Should dispatch GENERIC_ERROR', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.VOICE.CALL_BARGED_IN, payload: invalidResult });
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.GENERIC_ERROR
            }});
        });
    });

    describe('Show Storage Result', () => {
        it('should dispatch setConnectorReady', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.STORAGE_ACCESS_RESULT, payload: showStorageAccessResultSuccess});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.STORAGE_ACCESS_RESULT, payload: showStorageAccessResultSuccess });
            expect(channelPort.postMessage).toHaveBeenCalled();
        });
        it('should dispatch SHOW_LOGIN ', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.STORAGE_ACCESS_RESULT, payload: showStorageAccessResultShowLogin});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.SHOW_LOGIN, payload: {
                loginFrameHeight
            }});
            expect(channelPort.postMessage).toHaveBeenCalled();
        });
        it('should not dispatch SHOW_LOGIN ', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.STORAGE_ACCESS_RESULT, payload: showStorageAccessResultShowLoginFail });
            expect(channelPort.postMessage).toHaveBeenCalled();
        });
        it('should not dispatch STORAGE_ACCESS_RESULT', async () => {
            publishEvent({ eventType: constants.EVENT_TYPE.STORAGE_ACCESS_RESULT, payload: null});
            assertChannelPortPayload({ eventType: constants.EVENT_TYPE.ERROR, payload: {
                message: constants.ERROR_TYPE.INVALID_STORAGE_ACCESS_RESULT
            }});
        });
    });

    describe('Callback request tests', () => {
        it('Should dispatch SHOW_TRANSFER_VIEW', async () => {
            publishEvent({eventType: constants.EVENT_TYPE.VOICE.SHOW_TRANSFER_VIEW});
            assertChannelPortPayload({eventType: constants.EVENT_TYPE.VOICE.SHOW_TRANSFER_VIEW});
            expect(channelPort.postMessage).toHaveBeenCalled();
        });
    });
});
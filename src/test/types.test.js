/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {
    ActiveCallsResult,
    AgentConfigResult,
    SharedCapabilitiesResult,
    VoiceCapabilitiesResult,
    RecordingToggleResult,
    ParticipantResult,
    LogoutResult,
    ContactsResult,
    PhoneContactsResult,
    CallResult,
    HoldToggleResult,
    InitResult,
    GenericResult,
    MuteToggleResult,
    SignedRecordingUrlResult,
    Contact,
    PhoneCall,
    PhoneCallAttributes,
    CallInfo,
    VendorConnector,
    TelephonyConnector,
    Phone,
    AgentStatusInfo,
    HangupResult,
    AgentConfig,
    StatsInfo,
    AudioStats,
    AudioStatsElement,
    Constants,
    SupervisorHangupResult,
    SupervisedCallInfo,
    AgentVendorStatusInfo,
    StateChangeResult,
    CustomError,
    AgentWork,
    ShowStorageAccessResult,
    ContactsFilter,
    AudioDevicesResult,
    ACWInfo,
    SetAgentConfigResult,
    SetAgentStateResult,
    HidDevice
} from '../main/index';


import { downloadLogs } from '../main/logger';
jest.mock('../main/logger');

describe('Types validation tests', () => {
    const invalid_argument = /^Invalid argument/;
    const dummyPhoneCall = new PhoneCall({ callId: 'callId', callType: Constants.CALL_TYPE.INBOUND, callSubtype: Constants.CALL_SUBTYPE.PSTN, state: 'state', callAttributes: {}, phoneNumber: '100'});
    const dummyCallInfo = new CallInfo({ isOnHold: false, showMuteButton: true, showAddBlindTransferButton: true, showRecordButton: true, showAddCallerButton: true, showMergeButton: true, showSwapButton: true, additionalFields: "\"SourceType\": \"Service\"" });

    describe('CustomError tests', () => {
        const dummyLabelName = 'dummyLabelName';
        const dummyNamespace = 'dummyNamespace';
        const dummyMessage = 'dummyMessage';

        it('Should create CustomError object - default', () => {
            let customError;
            expect(() => {
                customError = new CustomError({ labelName: dummyLabelName, namespace: dummyNamespace });
            }).not.toThrowError();
            expect(customError.labelName).toEqual(dummyLabelName);
            expect(customError.namespace).toEqual(dummyNamespace);
        });

        it('Should create CustomError object with message', () => {
            let customError;
            expect(() => {
                customError = new CustomError({ labelName: dummyLabelName, namespace: dummyNamespace, message: dummyMessage });
            }).not.toThrowError();
            expect(customError.labelName).toEqual(dummyLabelName);
            expect(customError.namespace).toEqual(dummyNamespace);
            expect(customError.message).toEqual(dummyMessage);
        });
    });

    describe('ActiveCallsResult tests', () => {
        it('Should create ActiveCallsResult object - default', () => {
            let activeCallsResult;
            expect(() => {
                activeCallsResult = new ActiveCallsResult({});
            }).not.toThrowError();
            expect(activeCallsResult.activeCalls).toEqual([]);
        });

        it('Should create ActiveCallsResult object', () => {
            const activeCalls = [ dummyPhoneCall ];
            let activeCallsResult;
            expect(() => {
                activeCallsResult = new ActiveCallsResult({ activeCalls });
            }).not.toThrowError();
            expect(activeCallsResult.activeCalls).toEqual(activeCalls);
        });
    });

    describe('AudioDevicesResult tests', () => {
        it('Should create AudioDevicesResult object - default', () => {
            let audioDevicesResult;
            expect(() => {
                audioDevicesResult = new AudioDevicesResult({});
            }).not.toThrowError();
            expect(audioDevicesResult.audioDevices).toBeInstanceOf(Array);
        });

        it('Should create AudioDevicesResult object', () => {
            const audioDevices = [{
                "deviceId": "default",
                "kind": "audioinput",
                "label": "Default - MyHeadphones (Bluetooth)",
                "groupId": "080523bb442ecd8c19e9e70dc0fc0f9c9d808f4cb071c65cf81e8e790117aa28"
            }, {
                "deviceId": "437c20a0dg2d20b44c2af5e619d8f0eb85e0fa1a877e0e45665bca3da42a9673",
                "kind": "audioinput",
                "label": "MacBook Pro Microphone (Built-in)",
                "groupId": "16131a5ab07c4234be110a0b7dede980a1ef7239255785bbb91f99acdb82ee80"
            }];
            let audioDevicesResult;
            expect(() => {
                audioDevicesResult = new AudioDevicesResult({ audioDevices });
            }).not.toThrowError();
            expect(audioDevicesResult.audioDevices).toEqual(audioDevices);
        });
    });

    describe('AgentConfigResult tests', () => {
        it('Should create AgentConfigResult object - default', () => {
            let agentConfigResult;
            expect(() => {
                agentConfigResult = new AgentConfigResult({});
            }).not.toThrowError();
            expect(agentConfigResult.phones).toEqual([Constants.PHONE_TYPE.SOFT_PHONE]);
            expect(agentConfigResult.selectedPhone).toEqual(new Phone({type: Constants.PHONE_TYPE.SOFT_PHONE}));
            expect(agentConfigResult.speakerDeviceId).toEqual('');
            expect(agentConfigResult.microphoneDeviceId).toEqual('');
        });

        it('Should create AgentConfigResult object', () => {
            let agentConfigResult;
            const phones = ["DESK_PHONE", "SOFT_PHONE"];
            const selectedPhone = new Phone({type: "SOFT_PHONE"});
            const speakerDeviceId = 'testSpeakerDeviceId';
            const microphoneDeviceId = 'testMicrophoneDeviceId';
            expect(() => {
                agentConfigResult = new AgentConfigResult({
                    phones,
                    selectedPhone,
                    speakerDeviceId,
                    microphoneDeviceId
                });
            }).not.toThrowError();
            expect(agentConfigResult.phones).toEqual(phones);
            expect(agentConfigResult.selectedPhone).toEqual(selectedPhone);
            expect(agentConfigResult.speakerDeviceId).toEqual(speakerDeviceId);
            expect(agentConfigResult.microphoneDeviceId).toEqual(microphoneDeviceId);
        });
    });

    describe('AgentConfig tests', () => {
        it('Should create AgentConfig object - default', () => {
            let agentConfig;
            const selectedPhone = new Phone({ type: Constants.PHONE_TYPE.SOFT_PHONE });
            expect(() => {
                agentConfig = new AgentConfig({ selectedPhone: selectedPhone });
            }).not.toThrowError();
            expect(agentConfig.selectedPhone).toEqual(selectedPhone);
            expect(agentConfig.hidDeviceInfo).toEqual(undefined);
        });

        it('Should create AgentConfig object', () => {
            let agentConfig;
            const selectedPhone = new Phone({ type: Constants.PHONE_TYPE.SOFT_PHONE });
            const hidDeviceInfo = new HidDevice({productId: 1234, vendorId: 567});
            expect(() => {
                agentConfig = new AgentConfig({ selectedPhone: selectedPhone, hidDeviceInfo: hidDeviceInfo });
            }).not.toThrowError();
            expect(agentConfig.selectedPhone).toEqual(selectedPhone);
            expect(agentConfig.hidDeviceInfo).toEqual(hidDeviceInfo);
        });
    });

    describe('SetAgentConfigResult tests', () => {
        it('Should create SetAgentConfigResult object', () => {
            const success = false;
            let setAgentConfigResult;
            expect(() => {
                setAgentConfigResult = new SetAgentConfigResult({ success });
            }).not.toThrowError();
            expect(setAgentConfigResult.success).toEqual(success);
            expect(setAgentConfigResult.isSystemEvent).toEqual(false);
        });
        
        it('Should create SetAgentConfigResult object with isSystemEvent true', () => {
            const success = true;
            const isSystemEvent = true;
            let setAgentConfigResult;
            expect(() => {
                setAgentConfigResult = new SetAgentConfigResult({ success, isSystemEvent });
            }).not.toThrowError();
            expect(setAgentConfigResult.success).toEqual(success);
            expect(setAgentConfigResult.isSystemEvent).toEqual(isSystemEvent);
        });
    });

    describe('SetAgentStateResult tests', () => {
        it('Should create SetAgentStateResult object', () => {
            const success = false;
            let setAgentStateResult;
            expect(() => {
                setAgentStateResult = new SetAgentStateResult({ success });
            }).not.toThrowError();
            expect(setAgentStateResult.success).toEqual(success);
            expect(setAgentStateResult.isStatusSyncNeeded).toEqual(true);
        });

        it('Should create SetAgentStateResult object with isStatusSyncNeeded false', () => {
            const success = true;
            const isStatusSyncNeeded = false;
            let setAgentStateResult;
            expect(() => {
                setAgentStateResult = new SetAgentStateResult({ success, isStatusSyncNeeded });
            }).not.toThrowError();
            expect(setAgentStateResult.success).toEqual(success);
            expect(setAgentStateResult.isStatusSyncNeeded).toEqual(isStatusSyncNeeded);
        });
    });

    describe('CapabilitiesResult tests', () => {
        it('Should create SharedCapabilitiesResult object - default', () => {
            let capabilitiesResult;
            expect(() => {
                capabilitiesResult = new SharedCapabilitiesResult({});
            }).not.toThrowError();
            expect(capabilitiesResult.debugEnabled).toEqual(true);
            expect(capabilitiesResult.hasContactSearch).toEqual(false);
            expect(capabilitiesResult.hasAgentAvailability).toEqual(false);
            expect(capabilitiesResult.hasQueueWaitTime).toEqual(false);
            expect(capabilitiesResult.hasTransferToOmniFlow).toEqual(false);
            expect(capabilitiesResult.hasPendingStatusChange).toEqual(false);
            expect(capabilitiesResult.hasSFDCPendingState).toEqual(false);
            expect(capabilitiesResult.hasAutoAcceptEnabled).toEqual(false);
        });

        it('Should create VoiceCapabilitiesResult object - default', () => {
            let capabilitiesResult;
            expect(() => {
                capabilitiesResult = new VoiceCapabilitiesResult({});
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(true);
            expect(capabilitiesResult.hasRecord).toEqual(true);
            expect(capabilitiesResult.hasMerge).toEqual(true);
            expect(capabilitiesResult.hasSwap).toEqual(true);
            expect(capabilitiesResult.hasBlindTransfer).toEqual(false);
            expect(capabilitiesResult.hasSignedRecordingUrl).toEqual(false);
            expect(capabilitiesResult.supportsMos).toEqual(false);
            expect(capabilitiesResult.hasSupervisorListenIn).toEqual(false);
            expect(capabilitiesResult.hasSupervisorBargeIn).toEqual(false);
            expect(capabilitiesResult.hasPhoneBook).toEqual(false);
            expect(capabilitiesResult.hasGetExternalSpeakerDeviceSetting).toEqual(false);
            expect(capabilitiesResult.hasSetExternalSpeakerDeviceSetting).toEqual(false);
            expect(capabilitiesResult.hasGetExternalMicrophoneDeviceSetting).toEqual(false);
            expect(capabilitiesResult.hasSetExternalMicrophoneDeviceSetting).toEqual(false);
            expect(capabilitiesResult.canConsult).toEqual(false);
            expect(capabilitiesResult.isDialPadDisabled).toEqual(false);
            expect(capabilitiesResult.isHidSupported).toEqual(false);
        });

        it('Should create SharedCapabilitiesResult object', () => {
            let capabilitiesResult;
            const debugEnabled = false;
            const hasContactSearch = true;
            const hasAgentAvailability = false;
            const hasQueueWaitTime = false;
            const hasTransferToOmniFlow = true;
            const hasPendingStatusChange = true;
            const hasSFDCPendingState = true;
            const hasAutoAcceptEnabled = true;
            expect(() => {
                capabilitiesResult = new SharedCapabilitiesResult({
                    debugEnabled,
                    hasContactSearch,
                    hasAgentAvailability,
                    hasQueueWaitTime,
                    hasTransferToOmniFlow,
                    hasPendingStatusChange,
                    hasSFDCPendingState,
                    hasAutoAcceptEnabled
                });
            }).not.toThrowError();
            expect(capabilitiesResult.debugEnabled).toEqual(debugEnabled);
            expect(capabilitiesResult.hasContactSearch).toEqual(hasContactSearch);
            expect(capabilitiesResult.hasAgentAvailability).toEqual(hasAgentAvailability);
            expect(capabilitiesResult.hasQueueWaitTime).toEqual(hasQueueWaitTime);
            expect(capabilitiesResult.hasTransferToOmniFlow).toEqual(hasTransferToOmniFlow);
            expect(capabilitiesResult.hasPendingStatusChange).toEqual(hasPendingStatusChange);
            expect(capabilitiesResult.hasSFDCPendingState).toEqual(hasSFDCPendingState);
            expect(capabilitiesResult.hasAutoAcceptEnabled).toEqual(hasAutoAcceptEnabled);
        });

        it('Should create VoiceCapabilitiesResult object', () => {
            let capabilitiesResult;
            const hasMute = false;
            const hasRecord = false;
            const hasMerge = false;
            const hasSwap = false;
            const hasBlindTransfer = true;
            const hasSignedRecordingUrl = true;
            const supportsMos = true;
            const hasSupervisorListenIn = true;
            const hasSupervisorBargeIn = true;
            const hasPhoneBook = true;
            const hasGetExternalSpeakerDeviceSetting = true;
            const hasSetExternalSpeakerDeviceSetting = true;
            const hasGetExternalMicrophoneDeviceSetting = true;
            const hasSetExternalMicrophoneDeviceSetting = true;
            const canConsult = true;
            const isDialPadDisabled = true;
            const isHidSupported = true;
            expect(() => {
                capabilitiesResult = new VoiceCapabilitiesResult({
                    hasMute,
                    hasRecord,
                    hasMerge,
                    hasSwap,
                    hasBlindTransfer,
                    hasSignedRecordingUrl,
                    supportsMos,
                    hasSupervisorListenIn,
                    hasSupervisorBargeIn,
                    hasPhoneBook,
                    hasGetExternalSpeakerDeviceSetting,
                    hasSetExternalSpeakerDeviceSetting,
                    hasGetExternalMicrophoneDeviceSetting,
                    hasSetExternalMicrophoneDeviceSetting,
                    canConsult,
                    isDialPadDisabled,
                    isHidSupported
                });
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(hasMute);
            expect(capabilitiesResult.hasRecord).toEqual(hasRecord);
            expect(capabilitiesResult.hasMerge).toEqual(hasMerge);
            expect(capabilitiesResult.hasSwap).toEqual(hasSwap);
            expect(capabilitiesResult.hasBlindTransfer).toEqual(hasBlindTransfer);
            expect(capabilitiesResult.hasSignedRecordingUrl).toEqual(hasSignedRecordingUrl);
            expect(capabilitiesResult.supportsMos).toEqual(supportsMos);
            expect(capabilitiesResult.hasSupervisorListenIn).toEqual(hasSupervisorListenIn);
            expect(capabilitiesResult.hasSupervisorBargeIn).toEqual(hasSupervisorBargeIn);
            expect(capabilitiesResult.hasPhoneBook).toEqual(hasPhoneBook);
            expect(capabilitiesResult.hasGetExternalSpeakerDeviceSetting).toEqual(hasGetExternalSpeakerDeviceSetting);
            expect(capabilitiesResult.hasSetExternalSpeakerDeviceSetting).toEqual(hasSetExternalSpeakerDeviceSetting);
            expect(capabilitiesResult.hasGetExternalMicrophoneDeviceSetting).toEqual(hasGetExternalMicrophoneDeviceSetting);
            expect(capabilitiesResult.hasSetExternalMicrophoneDeviceSetting).toEqual(hasSetExternalMicrophoneDeviceSetting);
            expect(capabilitiesResult.canConsult).toEqual(canConsult);
            expect(capabilitiesResult.isDialPadDisabled).toEqual(isDialPadDisabled);
            expect(capabilitiesResult.isHidSupported).toEqual(isHidSupported);
        });
    });

    describe('RecordingToggleResult tests', () => {
        it('Should create RecordingToggleResult object - default', () => {
            const isRecordingPaused = true;
            let recordingToggleResult;
            expect(() => {
                recordingToggleResult = new RecordingToggleResult({ isRecordingPaused });
            }).not.toThrowError();
            expect(recordingToggleResult.isRecordingPaused).toEqual(isRecordingPaused);
            expect(recordingToggleResult.contactId).toEqual(null);
            expect(recordingToggleResult.initialContactId).toEqual(null);
            expect(recordingToggleResult.instanceId).toEqual(null);
            expect(recordingToggleResult.region).toEqual(null);
        });

        it('Should create RecordingToggleResult object', () => {
            const isRecordingPaused = true;
            const contactId = 'contactId';
            const initialContactId = 'initialContactId';
            const instanceId = 'instanceId';
            const region = 'region';
            let recordingToggleResult;
            expect(() => {
                recordingToggleResult = new RecordingToggleResult({ isRecordingPaused,
                    contactId,
                    initialContactId,
                    instanceId,
                    region
                });
            }).not.toThrowError();
            expect(recordingToggleResult.isRecordingPaused).toEqual(isRecordingPaused);
            expect(recordingToggleResult.contactId).toEqual(contactId);
            expect(recordingToggleResult.initialContactId).toEqual(initialContactId);
            expect(recordingToggleResult.instanceId).toEqual(instanceId);
            expect(recordingToggleResult.region).toEqual(region);
        });
    });

    describe('SignedRecordingUrlResult', () => {
        it('Should create SignedRecordingUrlResult object - default', () => {
            const success = false;
            let signedRecordingUrlResult;
            expect(() => {
                signedRecordingUrlResult = new SignedRecordingUrlResult({ success });
            }).not.toThrowError();
            expect(signedRecordingUrlResult.success).toEqual(success);
            expect(signedRecordingUrlResult.url).toBeUndefined();
            expect(signedRecordingUrlResult.duration).toBeUndefined();
            expect(signedRecordingUrlResult.callId).toBeUndefined();
            expect(signedRecordingUrlResult.connectionId).toBeUndefined();
        });

        it('Should create SignedRecordingUrlResult object', () => {
            const success = true;
            const url = 'url';
            const duration = 10;
            const callId = 'callId';
            let signedRecordingUrlResult;
            expect(() => {
                signedRecordingUrlResult = new SignedRecordingUrlResult({ success, url, duration, callId });
            }).not.toThrowError();
            expect(signedRecordingUrlResult.success).toEqual(success);
            expect(signedRecordingUrlResult.url).toEqual(url);
            expect(signedRecordingUrlResult.callId).toEqual(callId);
            expect(signedRecordingUrlResult.duration).toEqual(duration);
        });

        it('Should create SignedRecordingUrlResult object without duration', () => {
            const success = true;
            const url = 'url';
            const callId = 'callId';
            let signedRecordingUrlResult;
            expect(() => {
                signedRecordingUrlResult = new SignedRecordingUrlResult({ success, url, callId });
            }).not.toThrowError();
            expect(signedRecordingUrlResult.success).toEqual(success);
            expect(signedRecordingUrlResult.url).toEqual(url);
            expect(signedRecordingUrlResult.callId).toEqual(callId);
            expect(signedRecordingUrlResult.duration).toEqual(undefined);
        });

        it('Should create NOT SignedRecordingUrlResult object for non string url', () => {
            const success = true;
            const url = 100;
            const callId = 'callId';
            const duration = 10;
            expect(() => {
                new SignedRecordingUrlResult({ success, url, duration, callId });
            }).toThrowError();
        });

        it('Should create NOT SignedRecordingUrlResult object for non string callId', () => {
            const success = true;
            const url = 'url';
            const duration = 10;
            const callId = {};
            expect(() => {
                new SignedRecordingUrlResult({ success, url, duration, callId });
            }).toThrowError();
        });

        it('Should create NOT SignedRecordingUrlResult object for non number duration', () => {
            const success = true;
            const url = 'url';
            const callId = 'callId';
            const duration = 'duration';
            expect(() => {
                new SignedRecordingUrlResult({ success, url, duration, callId });
            }).toThrowError();
        });
    });

    describe('ParticipantResult tests', () => {
        it('Should create ParticipantResult object', () => {
            const dummyPhoneNumber = 'phoneNumber';
            const callId = 'callid';
            const callAttributes = { isConsultCall: false };
            let participantResult;
            expect(() => {
                participantResult = new ParticipantResult({ initialCallHasEnded: true, 
                    callAttributes,
                    callInfo: dummyCallInfo,
                    phoneNumber: dummyPhoneNumber,
                    callId });
            }).not.toThrowError();
            expect(participantResult.initialCallHasEnded).toEqual(true);
            expect(participantResult.callInfo).toEqual(dummyCallInfo);
            expect(participantResult.callAttributes).toEqual(callAttributes);
            expect(participantResult.phoneNumber).toEqual(dummyPhoneNumber);
            expect(participantResult.callId).toEqual(callId);
            expect(participantResult.connectionId).toEqual(callId);
        });

        it('Should create ParticipantResult object with connectionId', () => {
            const dummyPhoneNumber = 'phoneNumber';
            const callId = 'callid';
            const connectionId = 'connectionId';
            const callAttributes = { isConsultCall: false };
            let participantResult;
            expect(() => {
                participantResult = new ParticipantResult({
                    initialCallHasEnded: true,
                    callAttributes,
                    callInfo: dummyCallInfo,
                    phoneNumber: dummyPhoneNumber,
                    callId,
                    connectionId
                });
            }).not.toThrowError();
            expect(participantResult.initialCallHasEnded).toEqual(true);
            expect(participantResult.callInfo).toEqual(dummyCallInfo);
            expect(participantResult.callAttributes).toEqual(callAttributes);
            expect(participantResult.phoneNumber).toEqual(dummyPhoneNumber);
            expect(participantResult.callId).toEqual(callId);
            expect(participantResult.connectionId).toEqual(connectionId);
        });
    });

    describe('PhoneContactsResult tests', () => {
        it('Should create PhoneContactsResult object - default', () => {
            let phoneContactsResult;
            expect(() => {
                phoneContactsResult = new PhoneContactsResult({ });
            }).not.toThrowError();
            expect(phoneContactsResult.contacts).toEqual([]);
            expect(phoneContactsResult.contactTypes).toEqual([]);
        });

        it('Should create PhoneContactsResult object', () => {
            const contacts = [
                new Contact({})
            ];
            const contactTypes = [];
            let phoneContactsResult;
            expect(() => {
                phoneContactsResult = new PhoneContactsResult({ contacts, contactTypes });
            }).not.toThrowError();
            expect(phoneContactsResult.contacts).toEqual(contacts);
            expect(phoneContactsResult.contactTypes).toEqual(contactTypes);
        });
    });

    describe('ContactsResult tests', () => {
        it('Should create ContactsResult object - default', () => {
            let contactsResult;
            expect(() => {
                contactsResult = new ContactsResult({ });
            }).not.toThrowError();
            expect(contactsResult.contacts).toEqual([]);
            expect(contactsResult.contactTypes).toEqual([]);
        });

        it('Should create ContactsResult object', () => {
            const contacts = [
                new Contact({})
            ];
            const contactTypes = [];
            let contactsResult;
            expect(() => {
                contactsResult = new ContactsResult({ contacts, contactTypes });
            }).not.toThrowError();
            expect(contactsResult.contacts).toEqual(contacts);
            expect(contactsResult.contactTypes).toEqual(contactTypes);
        });
    });

    describe('CallResult tests', () => {
        it('Should create CallResult object', () => {
            const call = dummyPhoneCall;
            let callResult;
            expect(() => {
                callResult = new CallResult({ call });
            }).not.toThrowError();
            expect(callResult.call).toEqual(call);
        });

        it('Should create CallResult object from empty call', () => {
            let callResult;
            expect(() => {
                callResult = new CallResult({});
            }).not.toThrowError();
            expect(callResult.call).toEqual(undefined);
        });

        it('Should create CallResult object with hangup values', () => {
            const reason = 'reason';
            const closeCallOnError = true;
            const callType = Constants.CALL_TYPE.OUTBOUND;
            const callSubtype = Constants.CALL_SUBTYPE.PSTN;
            const callId = 'callid';
            const agentStatus = 'agentStatus';
            const agentARN = 'agentARN';
            let callHangupResult;

            expect(() => {
                callHangupResult = new CallResult({ call: new PhoneCall({ reason, closeCallOnError, callType, callSubtype, callId, agentStatus, agentARN })});
            }).not.toThrowError();
            expect(callHangupResult.call.reason).toEqual(reason);
            expect(callHangupResult.call.closeCallOnError).toEqual(closeCallOnError);
            expect(callHangupResult.call.callType).toEqual(callType);
            expect(callHangupResult.call.callSubtype).toEqual(callSubtype);
            expect(callHangupResult.call.callId).toEqual(callId);
            expect(callHangupResult.call.agentStatus).toEqual(agentStatus);
            expect(callHangupResult.call.agentARN).toEqual(agentARN);
        });
    });

    describe('HangupResults tests', () => {
        it('Should create HangupResult object', () => {
            const call = dummyPhoneCall;
            let hangupResult;
            expect(() => {
                hangupResult = new HangupResult({ calls: [call] });
            }).not.toThrowError();
            expect(hangupResult.calls).toEqual([call]);
        });

        it('Should create HangupResult for multiple calls', () => {
            const call = dummyPhoneCall;
            const call2 = dummyPhoneCall;
            let hangupResult;
            expect(() => {
                hangupResult = new HangupResult({ calls: [call, call2] });
            }).not.toThrowError();
            expect(hangupResult.calls).toEqual([call, call2]);
        });

        it('Should create HangupResult object from call', () => {
            const call = dummyPhoneCall;
            let hangupResult;
            expect(() => {
                hangupResult = new HangupResult({ calls: call });
            }).not.toThrowError();
            expect(hangupResult.calls).toEqual([call]);
        });

        it('Should create HangupResult object with hangup values', () => {
            const reason = 'reason';
            const closeCallOnError = true;
            const callType = Constants.CALL_TYPE.OUTBOUND;
            const callSubtype = Constants.CALL_SUBTYPE.PSTN;
            const callId = 'callid';
            const agentStatus = 'agentStatus';
            const agentARN = 'agentARN';
            let callHangupResult;

            expect(() => {
                callHangupResult = new HangupResult({ calls: [new PhoneCall({ reason, closeCallOnError, callType, callSubtype, callId, agentStatus, agentARN })]});
            }).not.toThrowError();
            const hangupResultCall = callHangupResult.calls.pop()
            expect(hangupResultCall.reason).toEqual(reason);
            expect(hangupResultCall.closeCallOnError).toEqual(closeCallOnError);
            expect(hangupResultCall.callType).toEqual(callType);
            expect(hangupResultCall.callSubtype).toEqual(callSubtype);
            expect(hangupResultCall.callId).toEqual(callId);
            expect(hangupResultCall.agentStatus).toEqual(agentStatus);
            expect(hangupResultCall.agentARN).toEqual(agentARN);
        });
    });

    describe('HoldToggleResult tests', () => {
        it('Should create HoldToggleResult object', () => {
            const calls = { callId: dummyPhoneCall };
            const isThirdPartyOnHold = false;
            const isCustomerOnHold = true;
            let holdToggleResult;
            expect(() => {
                holdToggleResult = new HoldToggleResult({ isThirdPartyOnHold, isCustomerOnHold, calls });
            }).not.toThrowError();
            expect(holdToggleResult.isThirdPartyOnHold).toEqual(isThirdPartyOnHold);
            expect(holdToggleResult.isCustomerOnHold).toEqual(isCustomerOnHold);
            expect(holdToggleResult.calls).toEqual(calls);
        });

        it('Should create HoldToggleResult object without calls', () => {
            const isThirdPartyOnHold = false;
            const isCustomerOnHold = true;
            let holdToggleResult;
            expect(() => {
                holdToggleResult = new HoldToggleResult({ isThirdPartyOnHold, isCustomerOnHold });
            }).not.toThrowError();
            expect(holdToggleResult.isThirdPartyOnHold).toEqual(isThirdPartyOnHold);
            expect(holdToggleResult.isCustomerOnHold).toEqual(isCustomerOnHold);
            expect(holdToggleResult.calls).toEqual(undefined);
        });
    });

    describe('MuteToggleResult tests', () => {
        it('Should create MuteToggleResult object', () => {
            let muteToggleResult;
            const isMuted = false;
            expect(() => {
                muteToggleResult = new MuteToggleResult({ isMuted });
            }).not.toThrowError();
            expect(muteToggleResult.isMuted).toEqual(isMuted);
        });
    });

    describe('InitResult tests', () => {
        it('Should create InitResult object - default', () => {
            let initResult;
            expect(() => {
                initResult = new InitResult({});
            }).not.toThrowError();
            expect(initResult.showLogin).toEqual(false);
            expect(initResult.loginFrameHeight).toEqual(350);
        });

        it('Should create InitResult object - isSilentLogin true ', () => {
            const showLogin = false;
            const loginFrameHeight = 450;
            const isSilentLogin = true;
            let initResult;
            expect(() => {
                initResult = new InitResult({ showLogin, loginFrameHeight, isSilentLogin });
            }).not.toThrowError();
            expect(initResult.showLogin).toEqual(showLogin);
            expect(initResult.loginFrameHeight).toEqual(loginFrameHeight);
            expect(initResult.isSilentLogin).toEqual(true);
        });

        it('Should create InitResult object - showLogin true & isSilentLogin false ', () => {
            const showLogin = true;
            const loginFrameHeight = 450;
            const isSilentLogin = true;
            let initResult;
            expect(() => {
                initResult = new InitResult({ showLogin, loginFrameHeight, isSilentLogin });
            }).not.toThrowError();
            expect(initResult.showLogin).toEqual(showLogin);
            expect(initResult.loginFrameHeight).toEqual(loginFrameHeight);
            expect(initResult.isSilentLogin).toEqual(false);
        });

        it('Should create InitResult object - showStorageAccess true ', () => {
            const showLogin = false;
            const loginFrameHeight = 450;
            const isSilentLogin = false;
            const showStorageAccess = true;
            let initResult;
            expect(() => {
                initResult = new InitResult({ showLogin, loginFrameHeight, isSilentLogin, showStorageAccess });
            }).not.toThrowError();
            expect(initResult.showLogin).toEqual(showLogin);
            expect(initResult.loginFrameHeight).toEqual(loginFrameHeight);
            expect(initResult.isSilentLogin).toEqual(false);
            expect(initResult.showStorageAccess).toEqual(true);
        });
    });

    describe('LogoutResult tests', () => {
        it('Should create LogoutResult object - default', () => {
            let logoutResult;
            expect(() => {
                logoutResult = new LogoutResult({ success: true });
            }).not.toThrowError();
            expect(logoutResult.success).toEqual(true);
            expect(logoutResult.loginFrameHeight).toEqual(350);
        });

        it('Should create LogoutResult object', () => {
            const success = false;
            const loginFrameHeight = 450;
            let logoutResult;
            expect(() => {
                logoutResult = new LogoutResult({ success, loginFrameHeight });
            }).not.toThrowError();
            expect(logoutResult.success).toEqual(success);
            expect(logoutResult.loginFrameHeight).toEqual(loginFrameHeight);
        });
    });

    describe('GenericResult tests', () => {
        it('Should create GenericResult object', () => {
            const success = false;
            let genericResult;
            expect(() => {
                genericResult = new GenericResult({ success });
            }).not.toThrowError();
            expect(genericResult.success).toEqual(success);
        });
    });

    describe('AgentWork tests', () => {
        const workItemId = 'dummyWorkItemId';
        const workId = 'dummyWorkId';
        it('Should create AgentWork object with valid work lifecycle event', () => {
            let agentWork;
            expect(() => {
                agentWork = new AgentWork({ workItemId, workId, workEvent: Constants.WORK_EVENT.ACCEPTED})
            }).not.toThrowError();
            expect(agentWork).not.toBeNull();
        });
    });

    describe('CallInfo tests', () => {
        it('Should create CallInfo object - default', () => {
            const isOnHold = false;
            const initialCallId = 'initialCallId';
            const isExternalTransfer = false;
            const showMuteButton = true;
            const showAddCallerButton = true;
            const showRecordButton = true;
            const showAddBlindTransferButton = true;
            const showMergeButton = true;
            const showSwapButton = true;
            const isMultiParty = true;
            const isHIDCall = true;
            const endCallDisabled = false;
            const renderContactId = 'renderContactId';
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ isOnHold, initialCallId, isExternalTransfer, showMuteButton, showAddCallerButton, showRecordButton, showAddBlindTransferButton, showMergeButton, showSwapButton, isMultiParty, isHIDCall, endCallDisabled, renderContactId });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toBeNull();
            expect(callInfo.isOnHold).toEqual(isOnHold);
            expect(callInfo.initialCallId).toEqual(initialCallId);
            expect(callInfo.isMuted).toEqual(false);
            expect(callInfo.isExternalTransfer).toEqual(isExternalTransfer);
            expect(callInfo.isRecordingPaused).toEqual(false);
            expect(callInfo.showAddBlindTransferButton).toEqual(true);
            expect(callInfo.showMuteButton).toEqual(true);
            expect(callInfo.showRecordButton).toEqual(true);
            expect(callInfo.showAddCallerButton).toEqual(true);
            expect(callInfo.showMergeButton).toEqual(true);
            expect(callInfo.queueName).toEqual(null);
            expect(callInfo.queueId).toEqual(null);
            expect(callInfo.queueTimestamp).toEqual(null);
            expect(callInfo.isMultiParty).toEqual(true);
            expect(callInfo.isHIDCall).toEqual(true);
            expect(callInfo.endCallDisabled).toEqual(false);
            expect(callInfo.renderContactId).toEqual(renderContactId);
        });

        it('Should create CallInfo object', () => {
            const callStateTimestamp = new Date();
            const queueName = "queueName";
            const queueId = "queueId";
            const queueTimestamp = new Date();
            const isOnHold = false;
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ callStateTimestamp, isOnHold, queueName, queueId, queueTimestamp });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toEqual(callStateTimestamp);
            expect(callInfo.isOnHold).toEqual(isOnHold);
            expect(callInfo.queueName).toEqual(queueName);
            expect(callInfo.queueId).toEqual(queueId);
            expect(callInfo.queueTimestamp).toEqual(queueTimestamp);
        });

        it('Should throw on invalid callStateTimestamp', () => {
            const callStateTimestamp = 'Invalid date';
            const isOnHold = false;
            expect(() => {
                new CallInfo({ callStateTimestamp, isOnHold });
            }).toThrowError();
        });
    });

    describe('Contact tests', () => {
        const phoneNumber = '1231231234';
        const type = Constants.CONTACT_TYPE.AGENT;
        const id = 'id';
        const name = 'name';
        const listType = Constants.CONTACT_LIST_TYPE.ALL;
        const prefix = '+1';
        const extension = '123';
        const endpointARN = 'endpointARN';
        const queue = 'queue';
        const availability = "BUSY";
        const queueWaitTime = "15";
        const recordId = "00DXXX";
        const description = "description";

        describe('Contact success tests', () => {
            it('Should create a Contact object without error', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, name, listType, prefix, extension, endpointARN, queue, availability, queueWaitTime, recordId, description});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.listType).toEqual(listType);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
                expect(contact.endpointARN).toEqual(endpointARN);
                expect(contact.queue).toEqual(queue);
                expect(contact.availability).toEqual(availability);
                expect(contact.queueWaitTime).toEqual(queueWaitTime);
                expect(contact.recordId).toEqual(recordId);
                expect(contact.description).toEqual(description);
            });

            it('Should create a Contact object without phoneNumber', () => {
                let contact;

                expect(() => {
                    contact = new Contact({id, type, name, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toBeUndefined();
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without type', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, name, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toBeUndefined();
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without id', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, type, name, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toBeUndefined();
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without label', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.label).toBeUndefined();
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without prefix', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, name, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toBeUndefined();
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without extension', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, name, prefix});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toBeUndefined();
            });
        });

        describe('Contact failure tests', () => {
            it('Should not create a Contact object for invalid phone number', () => {
                const invalidPhoneNumber = 5555555555;
                expect(() => new Contact({phoneNumber: invalidPhoneNumber, id, type, name, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid type', () => {
                const invalidType = 'INVALID_TYPE';
                expect(() => new Contact({phoneNumber, id, type: invalidType, name, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid id number', () => {
                const invalidId = 123;
                expect(() => new Contact({phoneNumber, id: invalidId, type, name, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid name', () => {
                const invalidName = [];
                expect(() => new Contact({phoneNumber, id, type, name: invalidName, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid prefix', () => {
                const invalidPrefix = [];
                expect(() => new Contact({phoneNumber, id, type, name, prefix: invalidPrefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid extension', () => {
                const invalidExtension = 123;
                expect(() => new Contact({phoneNumber, id, type, name, prefix, extension: invalidExtension}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('PhoneCall tests', () => {
        const callId = 'callId';
        const callType = Constants.CALL_TYPE.INBOUND;
        const callSubtype = Constants.CALL_SUBTYPE.WEB_RTC;
        const contact = new Contact({});
        const fromContact = new Contact({});
        const toContact = new Contact({});
        const state = 'state';
        const callAttributes = {};
        const phoneNumber = '5555555555';
        const callInfo = new CallInfo({ isOnHold: false });
        const connectionId = 'connectionId';

        describe('PhoneCall success tests', () => {
            it('Should create a PhoneCall object without error', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, callSubtype, callInfo, contact, state, callAttributes, phoneNumber, fromContact, toContact, connectionId });
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.callSubtype).toEqual(callSubtype);
                expect(phoneCall.callInfo).toEqual(callInfo);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
                expect(phoneCall.phoneNumber).toEqual(phoneNumber);
                expect(phoneCall.fromContact).toEqual(fromContact);
                expect(phoneCall.toContact).toEqual(toContact);
                expect(phoneCall.connectionId).toEqual(connectionId);
            });

            it('Should create a PhoneCall object without phone number', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, callSubtype, contact, state, callAttributes });
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.callSubtype).toEqual(callSubtype);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
                expect(phoneCall.connectionId).toEqual(callId);
            });

            it('Should create a PhoneCall object without callId & callType & callSubtype', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({ contact, state, callAttributes });
                }).not.toThrowError();
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
            });

            it('Should create a PhoneCall object with toContact without using contact object', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({ contact, state, callAttributes });
                }).not.toThrowError();
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.toContact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
            });
        });

        describe('PhoneCall failure tests', () => {
            it('Should not create a PhoneCall object for invalid call id', () => {
                const invalidCallId = 5555555555;
                expect(() => new PhoneCall({callId: invalidCallId, callType, callSubtype, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call type', () => {
                const invalidCallType = 'INVALID_TYPE';
                expect(() => new PhoneCall({callId, callType: invalidCallType, callSubtype, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid phone number', () => {
                const invalidPhoneNumber = {};
                expect(() => new PhoneCall({callId, callType, callSubtype, contact, state, callAttributes, phoneNumber: invalidPhoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call subtype', () => {
                const invalidCallSubtype = 'INVALID_CALL_SUBTYPE';
                expect(() => new PhoneCall({callId, callType, callSubtype: invalidCallSubtype, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('PhoneCallAttributes tests', () => {
        const voiceCallId = 'voiceCallId';
        const participantType = Constants.PARTICIPANT_TYPE.AGENT;
        const parentId = 'parentId';
        const isOnHold = true;
        const dialerType = Constants.DIALER_TYPE.NONE;
        const hasSupervisorBargedIn = true;
        const isAutoMergeOn = true;
        const isConsultCall = true;

        describe('PhoneCallAttributes success tests', () => {
            it('Should create a PhoneCallAttributes object without error', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId, isOnHold, hasSupervisorBargedIn, isAutoMergeOn, isConsultCall });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
                expect(phoneCallAttributes.hasSupervisorBargedIn).toEqual(hasSupervisorBargedIn);
                expect(phoneCallAttributes.isAutoMergeOn).toEqual(isAutoMergeOn);
                expect(phoneCallAttributes.isConsultCall).toEqual(isConsultCall);
            });

            it('Should create a PhoneCallAttributes object without voiceCallId', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ participantType, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toBeUndefined();
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
            });

            it('Should create a PhoneCallAttributes object without participantType', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toBeUndefined();
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
            });

            it('Should create a PhoneCallAttributes object without parentId', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toBeUndefined();
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
            });

            it('Should create a PhoneCallAttributes object without isOnHold', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toBeUndefined();
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
            });

            it('Should create a PhoneCallAttributes object without hasSupervisorBargedIn', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toBeUndefined();
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
                expect(phoneCallAttributes.hasSupervisorBargedIn).toEqual(false);
            });

            it('Should create a PhoneCallAttributes object with a dialer type', () => {
                let phoneCallAttributes;
                const outboundDialerType = Constants.DIALER_TYPE.OUTBOUND_PREVIEW;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId, dialerType: outboundDialerType });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toBeUndefined();
                expect(phoneCallAttributes.dialerType).toEqual(outboundDialerType);
            });
        });

        describe('PhoneCallAttributes failure tests', () => {
            it('Should not create a PhoneCallAttributes object for invalid voice call id', () => {
                const invalidvoiceCallId = 5555555555;
                expect(() => new PhoneCallAttributes({ voiceCallId: invalidvoiceCallId, participantType, parentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid participant type', () => {
                const invalidParticipantType = 'INVALID_PARTICIPANT_TYPE';
                expect(() => new PhoneCallAttributes({ voiceCallId, participantType: invalidParticipantType, parentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid parent id', () => {
                const invalidParentId = { parentId: 123 };
                expect(() => new PhoneCallAttributes({ voiceCallId, participantType, parentId: invalidParentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid isOnHold', () => {
                const invalidIsOnHold = 'false';
                expect(() => new PhoneCallAttributes({ voiceCallId, participantType, parentId, isOnHold: invalidIsOnHold }))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('Vendor connector tests', () => {
        let vendorConnector;
        beforeAll(() => {
            vendorConnector = new VendorConnector();
        });

        it('Should implement init', () => {
            expect(() => vendorConnector.init()).toThrowError('Not implemented');
        });

        it('Should implement getTelephonyConnector', () => {
            expect(() => vendorConnector.getTelephonyConnector()).toThrowError('Not implemented');
        });

        it('Should implement onAgentWorkEvent', () => {
            expect(() => vendorConnector.onAgentWorkEvent()).toThrowError('Not implemented');
        });

        it('Should implement setAgentStatus', () => {
            expect(() => vendorConnector.setAgentStatus()).toThrowError('Not implemented');
        });

        it('Should implement getAgentStatus', () => {
            expect(vendorConnector.getAgentStatus()).toBeUndefined();
        });
        it('Should implement logout', () => {
            expect(() => vendorConnector.logout()).toThrowError('Not implemented');
        });

        it('Should implement handleMessage', () => {
            expect(() => vendorConnector.handleMessage()).toThrowError('Not implemented');
        });

        it('Should implement downloadLogs', () => {
            vendorConnector.downloadLogs();
            expect(downloadLogs).toBeCalledTimes(1);
        });

        it('Can implement logMessageToVendor', () => {
            expect(() => vendorConnector.logMessageToVendor()).not.toThrowError('Not implemented');
        });

        it('Should implement getContacts', () => {
            expect(() => vendorConnector.getContacts()).toThrowError('Not implemented');
        });

        it('Should implement getAudioDevices', () => {
            expect(() => vendorConnector.getAudioDevices()).toThrowError('Not implemented');
        });

        it('Should implement getSharedCapabilities', () => {
            expect(() => vendorConnector.getSharedCapabilities()).toThrowError('Not implemented');
        });
    });

    describe('Telephony connector tests', () => {
        let telephonyConnector;
        beforeAll(() => {
            telephonyConnector = new TelephonyConnector();
        });

        it('Should implement getActiveCalls', () => {
            expect(() => telephonyConnector.getActiveCalls()).toThrowError('Not implemented');
        });

        it('Should implement superviseCall', () => {
            expect(() => telephonyConnector.superviseCall()).toThrowError('Not implemented');
        });

        it('Should implement wrapUpCall', () => {
            expect(() => telephonyConnector.wrapUpCall()).toThrowError('Not implemented');
        });

        it('Should implement getSignedRecordingUrl', () => {
            expect(() => telephonyConnector.getSignedRecordingUrl()).toThrowError('Not implemented');
        });

        it('Should implement supervisorDisconnect', () => {
            expect(() => telephonyConnector.supervisorDisconnect()).toThrowError('Not implemented');
        });

        it('Should implement supervisorBargeIn', () => {
            expect(() => telephonyConnector.supervisorBargeIn()).toThrowError('Not implemented');
        });

        it('Should implement acceptCall', () => {
            expect(() => telephonyConnector.acceptCall()).toThrowError('Not implemented');
        });

        it('Should implement declineCall', () => {
            expect(() => telephonyConnector.declineCall()).toThrowError('Not implemented');
        });

        it('Should implement endCall', () => {
            expect(() => telephonyConnector.endCall()).toThrowError('Not implemented');
        });

        it('Should implement mute', () => {
            expect(() => telephonyConnector.mute()).toThrowError('Not implemented');
        });

        it('Should implement unmute', () => {
            expect(() => telephonyConnector.unmute()).toThrowError('Not implemented');
        });

        it('Should implement hold', () => {
            expect(() => telephonyConnector.hold()).toThrowError('Not implemented');
        });

        it('Should implement resume', () => {
            expect(() => telephonyConnector.resume()).toThrowError('Not implemented');
        });
        it('Should implement dial', () => {
            expect(() => telephonyConnector.dial()).toThrowError('Not implemented');
        });

        it('Should implement sendDigits', () => {
            expect(() => telephonyConnector.sendDigits()).toThrowError('Not implemented');
        });

        it('Should implement getPhoneContacts', () => {
            expect(() => telephonyConnector.getPhoneContacts()).toThrowError('Not implemented');
        });

        it('Should implement swap', () => {
            expect(() => telephonyConnector.swap()).toThrowError('Not implemented');
        });

        it('Should implement conference', () => {
            expect(() => telephonyConnector.conference()).toThrowError('Not implemented');
        });

        it('Should implement addParticipant', () => {
            expect(() => telephonyConnector.addParticipant()).toThrowError('Not implemented');
        });

        it('Should implement pauseRecording', () => {
            expect(() => telephonyConnector.pauseRecording()).toThrowError('Not implemented');
        });

        it('Should implement resumeRecording', () => {
            expect(() => telephonyConnector.resumeRecording()).toThrowError('Not implemented');
        });

        it('Should implement getAgentConfig', () => {
            expect(() => telephonyConnector.getAgentConfig()).toThrowError('Not implemented');
        });
        it('Should implement setAgentConfig', () => {
            expect(() => telephonyConnector.setAgentConfig()).toThrowError('Not implemented');
        });
        it('Should implement getCapabilities', () => {
            expect(() => telephonyConnector.getVoiceCapabilities()).toThrowError('Not implemented');
        });
    });

    describe('Agent Status Info test', () => {
        describe('AgentStatusInfo success tests', () => {
            it('Should create a AgentStatusInfo object without error', () => {
                let statusInfo;
                const statusId = 'dummyStatusId';
                const statusApiName = 'dummyStatusApiName';
                const statusName = 'dummyStatusName';

                expect(() => {
                    statusInfo = new AgentStatusInfo({statusId, statusApiName, statusName});
                }).not.toThrowError();
                expect(statusInfo.statusId).toEqual(statusId);
                expect(statusInfo.statusApiName).toEqual(statusApiName);
                expect(statusInfo.statusName).toEqual(statusName);
            });
        });
        describe('AgentStatusInfo failure tests', () => {
            it('Should failed to create a AgentStatusInfo object if invalid statusId', () => {
                const statusId = undefined;
                const statusApiName = 'dummyStatusApiName';
                const statusName = 'dummyStatusName';

                expect(() => new AgentStatusInfo({statusId, statusApiName, statusName}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('State Change Result test', () => {
        describe('StateChangeResult success tests', () => {
            it('Should create a StateChangeResult object', () => {
                let stateChangeResult;
                const newVendorStateInfo = new AgentVendorStatusInfo({ statusId: 'newStatusId', statusName: 'newStateName', statusType: 'newStateType' });
                const oldVendorStateInfo = new AgentVendorStatusInfo({ statusId: 'oldStatusId', statusName: 'oldStateName', statusType: 'oldStateType' });
                expect(() => {
                    stateChangeResult = new StateChangeResult({newVendorStateInfo, oldVendorStateInfo});
                }).not.toThrowError();
                expect(stateChangeResult.newVendorStateInfo).toEqual(newVendorStateInfo);
                expect(stateChangeResult.oldVendorStateInfo).toEqual(oldVendorStateInfo);
            });
        });
        describe('StateChangeResult failure tests', () => {
            it('Should failed to create a StateChangeResult object if invalid statusName', () => {
                const newVendorStateInfo = new AgentVendorStatusInfo({ statusId: 'newStatusId' })
                expect(() => new StateChangeResult({newVendorStateInfo}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('AudioStats test', () => {
        describe('AudioStats success tests', () => {
            let stats = [];
            const inputPacketsCount = 100;
            const inputPacketsLost = 0;
            const inputJitterBufferMillis = 500;
            const inputRoundTripTimeMillis = 350;
            const outputPacketsCount = 120;
            const outputPacketsLost = 10;
            const outputJitterBufferMillis = 600;
            const outputRoundTripTimeMillis = 450;
            const inputChannelStats = new StatsInfo({packetsCount: inputPacketsCount, packetsLost: inputPacketsLost, jitterBufferMillis: inputJitterBufferMillis, roundTripTimeMillis: inputRoundTripTimeMillis});
            const outputChannelStats = new StatsInfo({packetsCount: outputPacketsCount, packetsLost: outputPacketsLost, jitterBufferMillis: outputJitterBufferMillis, roundTripTimeMillis: outputRoundTripTimeMillis});
            stats.push(new AudioStatsElement({inputChannelStats, outputChannelStats}));

            expect(() => {
                new AudioStats({ stats });
            }).not.toThrowError();
        });
    });

    describe('AudioStatsElement test', () => {
        describe('AudioStatsElement success tests', () => {
            it('should create a AudioStatsElement successfully with both StatsInfo', () => {
                let audioStatus;
                const inputPacketsCount = 100;
                const inputPacketsLost = 0;
                const inputJitterBufferMillis = 500;
                const inputRoundTripTimeMillis = 350;
                const outputPacketsCount = 120;
                const outputPacketsLost = 10;
                const outputJitterBufferMillis = 600;
                const outputRoundTripTimeMillis = 450;
                const inputChannelStats = new StatsInfo({packetsCount: inputPacketsCount, packetsLost: inputPacketsLost, jitterBufferMillis: inputJitterBufferMillis, roundTripTimeMillis: inputRoundTripTimeMillis});
                const outputChannelStats = new StatsInfo({packetsCount: outputPacketsCount, packetsLost: outputPacketsLost, jitterBufferMillis: outputJitterBufferMillis, roundTripTimeMillis: outputRoundTripTimeMillis});

                expect(() => {
                    audioStatus = new AudioStatsElement({inputChannelStats, outputChannelStats});
                }).not.toThrowError();
                expect(audioStatus.inputChannelStats.packetsCount).toEqual(inputPacketsCount);
                expect(audioStatus.inputChannelStats.packetsLost).toEqual(inputPacketsLost);
                expect(audioStatus.inputChannelStats.jitterBufferMillis).toEqual(inputJitterBufferMillis);
                expect(audioStatus.inputChannelStats.roundTripTimeMillis).toEqual(inputRoundTripTimeMillis);
                expect(audioStatus.outputChannelStats.packetsCount).toEqual(outputPacketsCount);
                expect(audioStatus.outputChannelStats.packetsLost).toEqual(outputPacketsLost);
                expect(audioStatus.outputChannelStats.jitterBufferMillis).toEqual(outputJitterBufferMillis);
                expect(audioStatus.outputChannelStats.roundTripTimeMillis).toEqual(outputRoundTripTimeMillis);
            });
            it('should create a AudioStatsElement successfully with only inputChannel StatsInfo', () => {
                let audioStatus;
                const inputPacketsCount = 100;
                const inputPacketsLost = 0;
                const inputJitterBufferMillis = 500;
                const inputRoundTripTimeMillis = 350;
                const inputChannelStats = new StatsInfo({packetsCount: inputPacketsCount, packetsLost: inputPacketsLost, jitterBufferMillis: inputJitterBufferMillis, roundTripTimeMillis: inputRoundTripTimeMillis});

                expect(() => {
                    audioStatus = new AudioStatsElement({inputChannelStats, undefined});
                }).not.toThrowError();
                expect(audioStatus.inputChannelStats.packetsCount).toEqual(inputPacketsCount);
                expect(audioStatus.inputChannelStats.packetsLost).toEqual(inputPacketsLost);
                expect(audioStatus.inputChannelStats.jitterBufferMillis).toEqual(inputJitterBufferMillis);
                expect(audioStatus.inputChannelStats.roundTripTimeMillis).toEqual(inputRoundTripTimeMillis);
            });
            it('should create a AudioStatsElement successfully with only ouputChannel StatsInfo', () => {
                let audioStatus;
                const outputPacketsCount = 120;
                const outputPacketsLost = 10;
                const outputJitterBufferMillis = 600;
                const outputRoundTripTimeMillis = 450;
                const outputChannelStats = new StatsInfo({packetsCount: outputPacketsCount, packetsLost: outputPacketsLost, jitterBufferMillis: outputJitterBufferMillis, roundTripTimeMillis: outputRoundTripTimeMillis});

                expect(() => {
                    audioStatus = new AudioStatsElement({undefined, outputChannelStats});
                }).not.toThrowError();
                expect(audioStatus.outputChannelStats.packetsCount).toEqual(outputPacketsCount);
                expect(audioStatus.outputChannelStats.packetsLost).toEqual(outputPacketsLost);
                expect(audioStatus.outputChannelStats.jitterBufferMillis).toEqual(outputJitterBufferMillis);
                expect(audioStatus.outputChannelStats.roundTripTimeMillis).toEqual(outputRoundTripTimeMillis);
            });
        });
    });

    describe('StatsInfo test', () => {
        describe('StatsInfo success tests', () => {
            it('Should create a StatsInfo object successfully', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = 0;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.packetsCount).toEqual(packetsCount);
                expect(streamStats.packetsLost).toEqual(packetsLost);
                expect(streamStats.jitterBufferMillis).toEqual(jitterBufferMillis);
                expect(streamStats.roundTripTimeMillis).toEqual(roundTripTimeMillis);
            });
            it('Should create a StatsInfo object successfully with null packetsCount', () => {
                let streamStats;
                const packetsCount = null;
                const packetsLost = 0;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.packetsCount).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with null packetsLost', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = null;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.packetsLost).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with null jitterBufferMillis', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = 0;
                const jitterBufferMillis = null;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.jitterBufferMillis).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with null roundTripTimeMillis', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = 0;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = null;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.roundTripTimeMillis).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with negative packetsCount', () => {
                let streamStats;
                const packetsCount = -1;
                const packetsLost = 0;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.packetsCount).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with negative packetsLost', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = -1;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.packetsLost).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with negative jitterBufferMillis', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = 0;
                const jitterBufferMillis = -500;
                const roundTripTimeMillis = 350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.jitterBufferMillis).toEqual(0);
            });
            it('Should create a StatsInfo object successfully with negative roundTripTimeMillis', () => {
                let streamStats;
                const packetsCount = 100;
                const packetsLost = 0;
                const jitterBufferMillis = 500;
                const roundTripTimeMillis = -350;

                expect(() => {
                    streamStats = new StatsInfo({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis});
                }).not.toThrowError();
                expect(streamStats.roundTripTimeMillis).toEqual(0);
            });
        });
    });

    describe('Supervisor tests', () => {
        it('Should create a SupervisorHangupResult object successfully', () => {
            const phoneCall = new PhoneCall({ callId: "dummyCallId",  callInfo: new CallInfo({ isBargeable: true, isSoftphoneCall : false })});
            let supervisorHangupResult;
            expect(() => {
                supervisorHangupResult = new SupervisorHangupResult({calls:phoneCall});
            }).not.toThrowError();
            expect(supervisorHangupResult.calls).toEqual([phoneCall]);
        });
        it('Should create a SupervisorHangupResult object successfully', () => {
            const parentCall = {
                callId: "callId",
                voiceCallId: "voiceCallId",
                callType: "callType",
                callSubtype: "callSubtype",
                from: "from",
                to: "to",
                supervisorName: "name",
                isBargedIn: true
            };
            let supervisedCallInfo
            expect(() => {
                supervisedCallInfo = new SupervisedCallInfo(parentCall);
            }).not.toThrowError();
            expect(supervisedCallInfo.callId).toEqual("callId");
            expect(supervisedCallInfo.connectionId).toEqual("callId");
        });

        it('Should create a SupervisorHangupResult object successfully with connectionId', () => {
            const parentCall = {
                callId: "callId",
                connectionId: "connectionId",
                voiceCallId: "voiceCallId",
                callType: "callType",
                callSubtype: "callSubtype",
                from: "from",
                to: "to",
                supervisorName: "name",
                isBargedIn: true
            };
            let supervisedCallInfo
            expect(() => {
                supervisedCallInfo = new SupervisedCallInfo(parentCall);
            }).not.toThrowError();
            expect(supervisedCallInfo.callId).toEqual("callId");
            expect(supervisedCallInfo.connectionId).toEqual("connectionId");
        });
    });

    describe('ShowStorageAccessResult tests', () => {
        it('Should create a ShowStorageAccessResult object successfully', () => {
            let storageAccessResult;
            expect(() => {
                storageAccessResult = new ShowStorageAccessResult({});
            }).not.toThrowError();
            expect(storageAccessResult.showLogin).toEqual(false);
            expect(storageAccessResult.loginFrameHeight).toEqual(350);
        });
        it('Should create a StorageAccessResult object successfully', () => {
            let storageAccessResult;
            const showLogin = true;
            const loginFrameHeight = 450;
            expect(() => {
                storageAccessResult = new ShowStorageAccessResult({showLogin, loginFrameHeight});
            }).not.toThrowError();
            expect(storageAccessResult.showLogin).toEqual(true);
            expect(storageAccessResult.loginFrameHeight).toEqual(450);
        });
    });

    describe('ContactsFilter tests', () => {
        it('should create a ContactsFilter object', () => {
            const contains = 'filterText';
            const limit = 10;
            const offset = 20;
            const types = [Constants.CONTACTS_FILTER_TYPES.AGENT, Constants.CONTACTS_FILTER_TYPES.QUEUE];
            let contactsFilter;
            expect(() => {
                contactsFilter = new ContactsFilter({contains, limit, offset, types});
            }).not.toThrowError();
            expect(contactsFilter.contains).toEqual(contains);
            expect(contactsFilter.limit).toEqual(limit);
            expect(contactsFilter.offset).toEqual(offset);
            expect(contactsFilter.types).toEqual(types);
        });
        it('should create a ContactsFilter object with null input', () => {
            expect(() => {
                new ContactsFilter();
            }).not.toThrowError();
        });
        it('should create a ContactsFilter object with empty object input', () => {
            expect(() => {
                new ContactsFilter({});
            }).not.toThrowError();
        });
    });
    describe('ACWInfo tests', () => {
        it('should create an ACWInfo with valid input', () => {
            expect(() => {
                new ACWInfo({agentWorkId: 'mockAgentWorkId', workItemId: 'mockWorkItemId'});
            }).not.toThrowError();
        });
        it('should not create an ACWInfo with invalid input', () => {
            expect(() => {
                new ACWInfo({});
            }).toThrowError();
        });
    });

    describe('HidDevice Tests', () => {
        it('Should create a HidDevice object', () => {
            const productId = 1234;
            const vendorId = 4567;

            let hidDeviceInfo;
            expect(() => {
                hidDeviceInfo = new HidDevice({productId, vendorId});
            }).not.toThrowError();

            expect(hidDeviceInfo.productId).toEqual(productId);
            expect(hidDeviceInfo.vendorId).toEqual(vendorId);
        });

        it('Should throw error in creating HidDevice object', () => {
            const productId = 123;
            const vendorId = "567";

            let hidDeviceInfo;
            expect(() => {
                hidDeviceInfo = new HidDevice({productId, vendorId});
            }).toThrowError();

            expect(hidDeviceInfo).toBeUndefined();
        });

        it('Should create a HidDevice object without any values', () => {

            let hidDeviceInfo;
            expect(() => {
                hidDeviceInfo = new HidDevice({});
            }).not.toThrowError();

            expect(hidDeviceInfo.productId).toEqual(undefined);
            expect(hidDeviceInfo.vendorId).toEqual(undefined);
        });
    });
});
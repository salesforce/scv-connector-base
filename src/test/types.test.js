/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { ActiveCallsResult, AgentConfigResult, CapabilitiesResult, RecordingToggleResult, ParticipantResult, LogoutResult,
    PhoneContactsResult, CallResult, HoldToggleResult, InitResult, GenericResult, MuteToggleResult, SignedRecordingUrlResult,
    Contact, PhoneCall, PhoneCallAttributes, CallInfo, VendorConnector, Phone, AgentStatusInfo, HangupResult, AgentConfig, 
    StatsInfo, AudioStats, AudioStatsElement, Constants, SupervisorHangupResult, SupervisedCallInfo, AgentVendorStatusInfo, StateChangeResult } from '../main/index';


import { downloadLogs } from '../main/logger';
jest.mock('../main/logger');

describe('Types validation tests', () => {
    const invalid_argument = /^Invalid argument/;
    const dummyPhoneCall = new PhoneCall({ callId: 'callId', callType: Constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100'});
    const dummyCallInfo = new CallInfo({ isOnHold: false });

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

    describe('AgentConfigResult tests', () => {
        it('Should create AgentConfigResult object - default', () => {
            let agentConfigResult;
            expect(() => {
                agentConfigResult = new AgentConfigResult({});
            }).not.toThrowError();
            expect(agentConfigResult.phones).toEqual([Constants.PHONE_TYPE.SOFT_PHONE]);
            expect(agentConfigResult.selectedPhone).toEqual(new Phone({type: Constants.PHONE_TYPE.SOFT_PHONE}));
        });

        it('Should create AgentConfigResult object', () => {
            let agentConfigResult;
            const phones = ["DESK_PHONE", "SOFT_PHONE"];
            const selectedPhone = new Phone({type: "SOFT_PHONE"});
            expect(() => {
                agentConfigResult = new AgentConfigResult({
                    phones,
                    selectedPhone
                });
            }).not.toThrowError();
            expect(agentConfigResult.phones).toEqual(phones);
            expect(agentConfigResult.selectedPhone).toEqual(selectedPhone);
        });
    });

    describe('AgentConfig tests', () => {
        it('Should create AgentConfig object - default', () => {
            let agentConfig;
            const selectedPhone = new Phone({ type: Constants.PHONE_TYPE.SOFT_PHONE });
            expect(() => {
                agentConfig = new AgentConfig({ selectedPhone });
            }).not.toThrowError();
            expect(agentConfig.selectedPhone).toEqual(selectedPhone);
        });
    });

    describe('CapabilitiesResult tests', () => {
        it('Should create CapabilitiesResult object - default', () => {
            let capabilitiesResult;
            expect(() => {
                capabilitiesResult = new CapabilitiesResult({});
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(true);
            expect(capabilitiesResult.hasRecord).toEqual(true);
            expect(capabilitiesResult.hasMerge).toEqual(true);
            expect(capabilitiesResult.hasSwap).toEqual(true);
            expect(capabilitiesResult.hasSignedRecordingUrl).toEqual(false);
            expect(capabilitiesResult.debugEnabled).toEqual(true);
            expect(capabilitiesResult.hasAgentAvailability).toEqual(false);
            expect(capabilitiesResult.supportsMos).toEqual(false);
        });

        it('Should create CapabilitiesResult object', () => {
            let capabilitiesResult;
            const hasMute = false;
            const hasRecord = false;
            const hasMerge = true;
            const hasSwap = true;
            const hasSignedRecordingUrl = true;
            const debugEnabled = false;
            const supportsMos = true;
            expect(() => {
                capabilitiesResult = new CapabilitiesResult({
                    hasMute,
                    hasRecord,
                    hasMerge,
                    hasSwap,
                    hasSignedRecordingUrl,
                    debugEnabled,
                    supportsMos
                });
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(hasMute);
            expect(capabilitiesResult.hasRecord).toEqual(hasRecord);
            expect(capabilitiesResult.hasMerge).toEqual(hasMerge);
            expect(capabilitiesResult.hasSwap).toEqual(hasSwap);
            expect(capabilitiesResult.hasSignedRecordingUrl).toEqual(hasSignedRecordingUrl);
            expect(capabilitiesResult.debugEnabled).toEqual(false);
            expect(capabilitiesResult.supportsMos).toEqual(true);
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
            let participantResult;
            expect(() => {
                participantResult = new ParticipantResult({ initialCallHasEnded: true,
                    callInfo: dummyCallInfo,
                    phoneNumber: dummyPhoneNumber,
                    callId });
            }).not.toThrowError();
            expect(participantResult.initialCallHasEnded).toEqual(true);
            expect(participantResult.callInfo).toEqual(dummyCallInfo);
            expect(participantResult.phoneNumber).toEqual(dummyPhoneNumber);
            expect(participantResult.callId).toEqual(callId);
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
            const callId = 'callid';
            const agentStatus = 'agentStatus';
            let callHangupResult;

            expect(() => {
                callHangupResult = new CallResult({ call: new PhoneCall({ reason, closeCallOnError, callType, callId, agentStatus })});
            }).not.toThrowError();
            expect(callHangupResult.call.reason).toEqual(reason);
            expect(callHangupResult.call.closeCallOnError).toEqual(closeCallOnError);
            expect(callHangupResult.call.callType).toEqual(callType);
            expect(callHangupResult.call.callId).toEqual(callId);
            expect(callHangupResult.call.agentStatus).toEqual(agentStatus);
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
            const callId = 'callid';
            const agentStatus = 'agentStatus';
            let callHangupResult;

            expect(() => {
                callHangupResult = new HangupResult({ calls: [new PhoneCall({ reason, closeCallOnError, callType, callId, agentStatus })]});
            }).not.toThrowError();
            const hangupResultCall = callHangupResult.calls.pop()
            expect(hangupResultCall.reason).toEqual(reason);
            expect(hangupResultCall.closeCallOnError).toEqual(closeCallOnError);
            expect(hangupResultCall.callType).toEqual(callType);
            expect(hangupResultCall.callId).toEqual(callId);
            expect(hangupResultCall.agentStatus).toEqual(agentStatus);
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

        it('Should create InitResult object', () => {
            const showLogin = false;
            const loginFrameHeight = 450;
            let initResult;
            expect(() => {
                initResult = new InitResult({ showLogin, loginFrameHeight });
            }).not.toThrowError();
            expect(initResult.showLogin).toEqual(showLogin);
            expect(initResult.loginFrameHeight).toEqual(loginFrameHeight);
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

    describe('CallInfo tests', () => {
        it('Should create CallInfo object - default', () => {
            const isOnHold = false;
            const initialCallId = 'initialCallId';
            const isExternalTransfer = false;
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ isOnHold, initialCallId, isExternalTransfer });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toBeNull();
            expect(callInfo.isOnHold).toEqual(isOnHold);
            expect(callInfo.initialCallId).toEqual(initialCallId);
            expect(callInfo.isMuted).toEqual(false);
            expect(callInfo.isExternalTransfer).toEqual(isExternalTransfer);
            expect(callInfo.isRecordingPaused).toEqual(false);
        });

        it('Should create CallInfo object', () => {
            const callStateTimestamp = new Date();
            const isOnHold = false;
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ callStateTimestamp, isOnHold });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toEqual(callStateTimestamp);
            expect(callInfo.isOnHold).toEqual(isOnHold);
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
        const prefix = '+1';
        const extension = '123';
        const endpointARN = 'endpointARN';
        const queue = 'queue';
        const availability = "BUSY";
        const recordId = "00DXXX";
        const description = "description";

        describe('Contact success tests', () => {
            it('Should create a Contact object without error', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, name, prefix, extension, endpointARN, queue, availability, recordId, description});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
                expect(contact.endpointARN).toEqual(endpointARN);
                expect(contact.queue).toEqual(queue);
                expect(contact.availability).toEqual(availability);
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
        const contact = new Contact({});
        const state = 'state';
        const callAttributes = {};
        const phoneNumber = '5555555555';
        const callInfo = new CallInfo({ isOnHold: false });

        describe('PhoneCall success tests', () => {
            it('Should create a PhoneCall object without error', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, callInfo, contact, state, callAttributes, phoneNumber });
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.callInfo).toEqual(callInfo);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
                expect(phoneCall.phoneNumber).toEqual(phoneNumber);
            });

            it('Should create a PhoneCall object without phone number', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, contact, state, callAttributes });
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
            });

            it('Should create a PhoneCall object without callId & callType', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({ contact, state, callAttributes });
                }).not.toThrowError();
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
            });
        });

        describe('PhoneCall failure tests', () => {
            it('Should not create a PhoneCall object for invalid call id', () => {
                const invalidCallId = 5555555555;
                expect(() => new PhoneCall({callId: invalidCallId, callType, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call type', () => {
                const invalidCallType = 'INVALID_TYPE';
                expect(() => new PhoneCall({callId, callType: invalidCallType, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid phone number', () => {
                const invalidPhoneNumber = {};
                expect(() => new PhoneCall({callId, callType, contact, state, callAttributes, phoneNumber: invalidPhoneNumber}))
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

        describe('PhoneCallAttributes success tests', () => {
            it('Should create a PhoneCallAttributes object without error', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId, isOnHold, hasSupervisorBargedIn });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
                expect(phoneCallAttributes.dialerType).toEqual(dialerType);
                expect(phoneCallAttributes.hasSupervisorBargedIn).toEqual(hasSupervisorBargedIn);
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

        it('Should implement getActiveCalls', () => {
            expect(() => vendorConnector.getActiveCalls()).toThrowError('Not implemented');
        });

        it('Should implement acceptCall', () => {
            expect(() => vendorConnector.acceptCall()).toThrowError('Not implemented');
        });

        it('Should implement declineCall', () => {
            expect(() => vendorConnector.declineCall()).toThrowError('Not implemented');
        });

        it('Should implement endCall', () => {
            expect(() => vendorConnector.endCall()).toThrowError('Not implemented');
        });

        it('Should implement mute', () => {
            expect(() => vendorConnector.mute()).toThrowError('Not implemented');
        });

        it('Should implement unmute', () => {
            expect(() => vendorConnector.unmute()).toThrowError('Not implemented');
        });

        it('Should implement hold', () => {
            expect(() => vendorConnector.hold()).toThrowError('Not implemented');
        });

        it('Should implement resume', () => {
            expect(() => vendorConnector.resume()).toThrowError('Not implemented');
        });

        it('Should implement setAgentStatus', () => {
            expect(() => vendorConnector.setAgentStatus()).toThrowError('Not implemented');
        });

        it('Should implement getAgentStatus', () => {
            expect(vendorConnector.getAgentStatus()).toBeUndefined();
        });

        it('Should implement dial', () => {
            expect(() => vendorConnector.dial()).toThrowError('Not implemented');
        });

        it('Should implement sendDigits', () => {
            expect(() => vendorConnector.sendDigits()).toThrowError('Not implemented');
        });

        it('Should implement getPhoneContacts', () => {
            expect(() => vendorConnector.getPhoneContacts()).toThrowError('Not implemented');
        });

        it('Should implement swap', () => {
            expect(() => vendorConnector.swap()).toThrowError('Not implemented');
        });

        it('Should implement conference', () => {
            expect(() => vendorConnector.conference()).toThrowError('Not implemented');
        });

        it('Should implement addParticipant', () => {
            expect(() => vendorConnector.addParticipant()).toThrowError('Not implemented');
        });

        it('Should implement pauseRecording', () => {
            expect(() => vendorConnector.pauseRecording()).toThrowError('Not implemented');
        });

        it('Should implement resumeRecording', () => {
            expect(() => vendorConnector.resumeRecording()).toThrowError('Not implemented');
        });

        it('Should implement getAgentConfig', () => {
            expect(() => vendorConnector.getAgentConfig()).toThrowError('Not implemented');
        });
        it('Should implement setAgentConfig', () => {
            expect(() => vendorConnector.setAgentConfig()).toThrowError('Not implemented');
        });
        it('Should implement getCapabilities', () => {
            expect(() => vendorConnector.getCapabilities()).toThrowError('Not implemented');
        });
        it('Should implement logout', () => {
            expect(() => vendorConnector.logout()).toThrowError('Not implemented');
        });

        it('Should implement handleMessage', () => {
            expect(() => vendorConnector.handleMessage()).toThrowError('Not implemented');
        });

        it('Should implement wrapUpCall', () => {
            expect(() => vendorConnector.wrapUpCall()).toThrowError('Not implemented');
        });

        it('Should implement getSignedRecordingUrl', () => {
            expect(() => vendorConnector.getSignedRecordingUrl()).toThrowError('Not implemented');
        });

        it('Should implement downloadLogs', () => {
            vendorConnector.downloadLogs();
            expect(downloadLogs).toBeCalledTimes(1);
        });
        
        it('Can implement logMessageToVendor', () => {
            expect(() => vendorConnector.logMessageToVendor()).not.toThrowError('Not implemented');
        });

        it('Should implement superviseCall', () => {
            expect(() => vendorConnector.superviseCall()).toThrowError('Not implemented');
        });

        it('Should implement supervisorDisconnect', () => {
            expect(() => vendorConnector.supervisorDisconnect()).toThrowError('Not implemented');
        });

        it('Should implement supervisorBargeIn', () => {
            expect(() => vendorConnector.supervisorBargeIn()).toThrowError('Not implemented');
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
            const parentCall = {callId: "callId", voiceCallId: "voiceCallId", callType: "callType" ,from: "from", to: "to", supervisorName: "name", isBargedIn: true};
            let supervisedCallInfo
            expect(() => {
                supervisedCallInfo = new SupervisedCallInfo(parentCall);
            }).not.toThrowError();
            expect(supervisedCallInfo.callId).toEqual("callId");
        });
    });
});

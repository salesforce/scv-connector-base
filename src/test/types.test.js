import { ActiveCallsResult, CapabilitiesResult, RecordingToggleResult, ParticipantResult, HangUpResult,
    PhoneContactsResult, CallResult, HoldToggleResult, InitResult, GenericResult, ErrorResult, MuteToggleResult,
    Contact, PhoneCall, PhoneCallAttributes, CallInfo, VendorConnector } from '../main/types';
import constants from '../main/constants';

describe('Types validation tests', () => {
    const invalid_argument = /^Invalid argument/;
    const dummyPhoneCall = new PhoneCall({ callId: 'callId', callType: constants.CALL_TYPE.INBOUND, state: 'state', callAttributes: {}, phoneNumber: '100'});
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
        });

        it('Should create CapabilitiesResult object', () => {
            let capabilitiesResult;
            const hasMute = false;
            const hasRecord = false;
            const hasMerge = true;
            const hasSwap = true;
            expect(() => {
                capabilitiesResult = new CapabilitiesResult({
                    hasMute,
                    hasRecord,
                    hasMerge,
                    hasSwap
                });
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(hasMute);
            expect(capabilitiesResult.hasRecord).toEqual(hasRecord);
            expect(capabilitiesResult.hasMerge).toEqual(hasMerge);
            expect(capabilitiesResult.hasSwap).toEqual(hasSwap);
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
        });

        it('Should create PhoneContactsResult object', () => {
            const contacts = [
                new Contact({})
            ];
            let phoneContactsResult;
            expect(() => {
                phoneContactsResult = new PhoneContactsResult({ contacts });
            }).not.toThrowError();
            expect(phoneContactsResult.contacts).toEqual(contacts);
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
    });

    describe('HangUpResult tests', () => {
        const reason = 'reason';
        const closeCallOnError = true;
        const callType = constants.CALL_TYPE.OUTBOUND;
        const callId = 'callid';
        const agentStatus = 'agentStatus';
        it('Should create HangUpResult object with all values', () => {
            let hangupResult;
            expect(() => {
                hangupResult = new HangUpResult({ reason, closeCallOnError, callType, callId, agentStatus });
            }).not.toThrowError();
            expect(hangupResult.reason).toEqual(reason);
            expect(hangupResult.closeCallOnError).toEqual(closeCallOnError);
            expect(hangupResult.callType).toEqual(callType);
            expect(hangupResult.callId).toEqual(callId);
            expect(hangupResult.agentStatus).toEqual(agentStatus);
        });

        it('Should create HangUpResult object without values', () => {
            let hangupResult;
            expect(() => {
                hangupResult = new HangUpResult({});
            }).not.toThrowError();
            expect(hangupResult.reason).toEqual(undefined);
            expect(hangupResult.closeCallOnError).toEqual(undefined);
            expect(hangupResult.callType).toEqual(undefined);
            expect(hangupResult.callId).toEqual(undefined);
            expect(hangupResult.agentStatus).toEqual(undefined);
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

    describe('ErrorResult tests', () => {
        it('Should create ErrorResult object', () => {
            const type = 'type';
            const message = 'message';
            let errorResult;
            expect(() => {
                errorResult = new ErrorResult({ type, message });
            }).not.toThrowError();
            expect(errorResult.type).toEqual(type);
            expect(errorResult.message).toEqual(message);
        });
    });

    describe('CallInfo tests', () => {
        it('Should create CallInfo object - default', () => {
            const isOnHold = false;
            const initialCallId = 'initialCallId';
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ isOnHold, initialCallId });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toBeNull();
            expect(callInfo.isOnHold).toEqual(isOnHold);
            expect(callInfo.initialCallId).toEqual(initialCallId);
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
        const type = constants.CONTACT_TYPE.PHONEBOOK;
        const id = 'id';
        const name = 'name';
        const prefix = '+1';
        const extension = '123';

        describe('Contact success tests', () => {
            it('Should create a Contact object without error', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, name, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.name).toEqual(name);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
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
        const callType = constants.CALL_TYPE.INBOUND;
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
        const hangupReason = 'hangupReason';
        const participantType = constants.PARTICIPANT_TYPE.AGENT;
        const parentId = 'parentId';
        const isOnHold = true;

        describe('PhoneCallAttributes success tests', () => {
            it('Should create a PhoneCallAttributes object without error', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, hangupReason, participantType, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.hangupReason).toEqual(hangupReason);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
            });

            it('Should create a PhoneCallAttributes object without voiceCallId', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ hangupReason, participantType, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toBeUndefined();
                expect(phoneCallAttributes.hangupReason).toEqual(hangupReason);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
            });

            it('Should create a PhoneCallAttributes object without hangupReason', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, participantType, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.hangupReason).toBeUndefined();
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
            });

            it('Should create a PhoneCallAttributes object without participantType', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, hangupReason, parentId, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.hangupReason).toEqual(hangupReason);
                expect(phoneCallAttributes.participantType).toBeUndefined();
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
            });

            it('Should create a PhoneCallAttributes object without parentId', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, hangupReason, participantType, isOnHold });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.hangupReason).toEqual(hangupReason);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toBeUndefined();
                expect(phoneCallAttributes.isOnHold).toEqual(isOnHold);
            });

            it('Should create a PhoneCallAttributes object without isOnHold', () => {
                let phoneCallAttributes;

                expect(() => {
                    phoneCallAttributes = new PhoneCallAttributes({ voiceCallId, hangupReason, participantType, parentId });
                }).not.toThrowError();
                expect(phoneCallAttributes.voiceCallId).toEqual(voiceCallId);
                expect(phoneCallAttributes.hangupReason).toEqual(hangupReason);
                expect(phoneCallAttributes.participantType).toEqual(participantType);
                expect(phoneCallAttributes.parentId).toEqual(parentId);
                expect(phoneCallAttributes.isOnHold).toBeUndefined();
            });
        });

        describe('PhoneCallAttributes failure tests', () => {
            it('Should not create a PhoneCallAttributes object for invalid voice call id', () => {
                const invalidvoiceCallId = 5555555555;
                expect(() => new PhoneCallAttributes({ voiceCallId: invalidvoiceCallId, hangupReason, participantType, parentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid hang up reason', () => {
                const invalidHangupReason = {};
                expect(() => new PhoneCallAttributes({ voiceCallId, hangupReason: invalidHangupReason, participantType, parentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid participant type', () => {
                const invalidParticipantType = 'INVALID_PARTICIPANT_TYPE';
                expect(() => new PhoneCallAttributes({ voiceCallId, hangupReason, participantType: invalidParticipantType, parentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid parent id', () => {
                const invalidParentId = { parentId: 123 };
                expect(() => new PhoneCallAttributes({ voiceCallId, hangupReason, participantType, parentId: invalidParentId, isOnHold }))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCallAttributes object for invalid isOnHold', () => {
                const invalidIsOnHold = 'false';
                expect(() => new PhoneCallAttributes({ voiceCallId, hangupReason, participantType, parentId, isOnHold: invalidIsOnHold }))
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
    });
});

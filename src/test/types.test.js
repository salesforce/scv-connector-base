import { ActiveCallsResult, CapabilitiesResult, RecordingToggleResult, ParticipantRemovedResult, ParticipantResult,
    ConferenceResult, PhoneContactsResult, CallResult, HoldToggleResult, InitResult, GenericResult, 
    Contact, PhoneCall, PhoneCallAttributes, CallInfo } from '../main/types';
import constants from '../main/constants';

describe('Types validation tests', () => {
    const invalid_argument = /^Invalid argument/;
    const dummyPhoneCall = new PhoneCall({ callId: 'callId', callType: 'inbound', state: 'state', callAttributes: {}, phoneNumber: '100'});

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
            expect(capabilitiesResult.hasHold).toEqual(true);
            expect(capabilitiesResult.hasRecord).toEqual(true);
            expect(capabilitiesResult.hasMerge).toEqual(true);
        });

        it('Should create CapabilitiesResult object', () => {
            let capabilitiesResult;
            const hasMute = false;
            const hasHold = true;
            const hasRecord = false;
            const hasMerge = true;
            expect(() => {
                capabilitiesResult = new CapabilitiesResult({
                    hasMute,
                    hasHold,
                    hasRecord,
                    hasMerge
                });
            }).not.toThrowError();
            expect(capabilitiesResult.hasMute).toEqual(hasMute);
            expect(capabilitiesResult.hasHold).toEqual(hasHold);
            expect(capabilitiesResult.hasRecord).toEqual(hasRecord);
            expect(capabilitiesResult.hasMerge).toEqual(hasMerge);
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

    describe('ParticipantRemovedResult tests', () => {
        it('Should create ParticipantRemovedResult object', () => {
            const dummyReason = 'reason';
            let participantRemovedResult;
            expect(() => {
                participantRemovedResult = new ParticipantRemovedResult({ reason: dummyReason });
            }).not.toThrowError();
            expect(participantRemovedResult.reason).toEqual(dummyReason);
        });
    });

    describe('ParticipantResult tests', () => {
        it('Should create ParticipantResult object', () => {
            const dummyPhoneNumber = 'phoneNumber';
            let participantResult;
            expect(() => {
                participantResult = new ParticipantResult({ initialCallHasEnded: true,
                    callInfo: null,
                    phoneNumber: dummyPhoneNumber });
            }).not.toThrowError();
            expect(participantResult.initialCallHasEnded).toEqual(true);
            expect(participantResult.callInfo).toEqual(null);
            expect(participantResult.phoneNumber).toEqual(dummyPhoneNumber);
        });
    });

    describe('ConferenceResult tests', () => {
        it('Should create ConferenceResult object', () => {
            let conferenceResult;
            expect(() => {
                conferenceResult = new ConferenceResult({ isThirdPartyOnHold: false,
                    isCustomerOnHold: false
                });
            }).not.toThrowError();
            expect(conferenceResult.isThirdPartyOnHold).toEqual(false);
            expect(conferenceResult.isCustomerOnHold).toEqual(false);
        });
    });

    describe('PhoneContactsResult tests', () => {
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

    describe('HoldToggleResult tests', () => {
        it('Should create HoldToggleResult object', () => {
            const calls = [dummyPhoneCall];
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

    describe('CallInfo tests', () => {
        it('Should create CallResult object', () => {
            const callStateTimestamp = Date.now();
            const isOnHold = false;
            let callInfo;
            expect(() => {
                callInfo = new CallInfo({ callStateTimestamp, isOnHold });
            }).not.toThrowError();
            expect(callInfo.callStateTimestamp).toEqual(callStateTimestamp);
            expect(callInfo.isOnHold).toEqual(isOnHold);
        });
    });

    describe('Contact tests', () => {
        const phoneNumber = '1231231234';
        const type = constants.CONTACT_TYPE.PHONEBOOK;
        const id = 'id';
        const label = 'label';
        const prefix = '+1';
        const extension = '123';

        describe('Contact success tests', () => {
            it('Should create a Contact object without error', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, label, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.label).toEqual(label);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without phoneNumber', () => {
                let contact;

                expect(() => {
                    contact = new Contact({id, type, label, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toBeUndefined();
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.label).toEqual(label);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without type', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, label, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toBeUndefined();
                expect(contact.id).toEqual(id);
                expect(contact.label).toEqual(label);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without id', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, type, label, prefix, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toBeUndefined();
                expect(contact.label).toEqual(label);
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
                    contact = new Contact({phoneNumber, id, type, label, extension});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.label).toEqual(label);
                expect(contact.prefix).toBeUndefined();
                expect(contact.extension).toEqual(extension);
            });

            it('Should create a Contact object without extension', () => {
                let contact;

                expect(() => {
                    contact = new Contact({phoneNumber, id, type, label, prefix});
                }).not.toThrowError();
                expect(contact.phoneNumber).toEqual(phoneNumber);
                expect(contact.type).toEqual(type);
                expect(contact.id).toEqual(id);
                expect(contact.label).toEqual(label);
                expect(contact.prefix).toEqual(prefix);
                expect(contact.extension).toBeUndefined();
            });
        });

        describe('Contact failure tests', () => {
            it('Should not create a Contact object for invalid phone number', () => {
                const invalidPhoneNumber = 5555555555;
                expect(() => new Contact({phoneNumber: invalidPhoneNumber, id, type, label, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid type', () => {
                const invalidType = 'INVALID_TYPE';
                expect(() => new Contact({phoneNumber, id, type: invalidType, label, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid id number', () => {
                const invalidId = 123;
                expect(() => new Contact({phoneNumber, id: invalidId, type, label, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid label', () => {
                const invalidLabel = [];
                expect(() => new Contact({phoneNumber, id, type, label: invalidLabel, prefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid prefix', () => {
                const invalidPrefix = [];
                expect(() => new Contact({phoneNumber, id, type, label, prefix: invalidPrefix, extension}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a Contact object for invalid extension', () => {
                const invalidExtension = 123;
                expect(() => new Contact({phoneNumber, id, type, label, prefix, extension: invalidExtension}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('PhoneCall tests', () => {
        const callId = 'callId';
        const callType = constants.CALL_TYPE.INBOUND;
        const contact = {};
        const state = 'state';
        const callAttributes = {};
        const phoneNumber = '5555555555';

        describe('PhoneCall success tests', () => {
            it('Should create a PhoneCall object without error', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, contact, state, callAttributes, phoneNumber});
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.state).toEqual(state);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
                expect(phoneCall.phoneNumber).toEqual(phoneNumber);
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

            it('Should not create a PhoneCall object for empty call type', () => {
                const invalidCallType = '';
                expect(() => new PhoneCall({callId, callType: invalidCallType, contact, state, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call state', () => {
                const invalidState = {};
                expect(() => new PhoneCall({callId, callType, contact, state: invalidState, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call attributes', () => {
                const invalidCallAttributes = 'invalid_call_attributes';
                expect(() => new PhoneCall({callId, callType, contact, state, callAttributes: invalidCallAttributes, phoneNumber}))
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
});
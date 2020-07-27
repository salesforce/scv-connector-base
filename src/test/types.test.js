import { Contact, PhoneCall, PhoneCallAttributes } from '../main/types';
import constants from '../main/constants';

describe('Types validation tests', () => {
    const invalid_argument = /^Invalid argument/;

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
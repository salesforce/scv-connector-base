import { Contact, PhoneCall, TelephonySystemInfo, LoginSettings, LoginField } from '../main/types';
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
        const callState = 'callState';
        const callAttributes = {};
        const phoneNumber = '5555555555';

        describe('PhoneCall success tests', () => {
            it('Should create a PhoneCall object without error', () => {
                let phoneCall;

                expect(() => {
                    phoneCall = new PhoneCall({callId, callType, contact, callState, callAttributes, phoneNumber});
                }).not.toThrowError();
                expect(phoneCall.callId).toEqual(callId);
                expect(phoneCall.callType).toEqual(callType);
                expect(phoneCall.contact).toEqual(contact);
                expect(phoneCall.callState).toEqual(callState);
                expect(phoneCall.callAttributes).toEqual(callAttributes);
                expect(phoneCall.phoneNumber).toEqual(phoneNumber);
            });
        });

        describe('PhoneCall failure tests', () => {
            it('Should not create a PhoneCall object for invalid call id', () => {
                const invalidCallId = 5555555555;
                expect(() => new PhoneCall({callId: invalidCallId, callType, contact, callState, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call type', () => {
                const invalidCallType = 'INVALID_TYPE';
                expect(() => new PhoneCall({callId, callType: invalidCallType, contact, callState, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call state', () => {
                const invalidCallState = {};
                expect(() => new PhoneCall({callId, callType, contact, callState: invalidCallState, callAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid call attributes', () => {
                const invalidCallAttributes = 'invalid_call_attributes';
                expect(() => new PhoneCall({callId, callType, contact, callState, callAttributes: invalidCallAttributes, phoneNumber}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a PhoneCall object for invalid phone number', () => {
                const invalidPhoneNumber = {};
                expect(() => new PhoneCall({callId, callType, contact, callState, callAttributes, phoneNumber: invalidPhoneNumber}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('TelephonySystemInfo tests', () => {
        const companyName = 'companyName';
        const productName = 'productName';
        const brandingAsset = 'brandingAsset';

        describe('TelephonySystemInfo success tests', () => {
            it('Should create a TelephonySystemInfo object without error', () => {
                let telephonySystemInfo;

                expect(() => {
                    telephonySystemInfo = new TelephonySystemInfo({companyName, productName, brandingAsset});
                }).not.toThrowError();
                expect(telephonySystemInfo.companyName).toEqual(companyName);
                expect(telephonySystemInfo.productName).toEqual(productName);
                expect(telephonySystemInfo.brandingAsset).toEqual(brandingAsset);
            });
        });

        describe('TelephonySystemInfo failure tests', () => {
            it('Should not create a TelephonySystemInfo object for invalid company name', () => {
                const invalidCompanyName = {invalidName: 'invalidName'};
                expect(() => new TelephonySystemInfo({companyName: invalidCompanyName, productName, brandingAsset}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a TelephonySystemInfo object for invalid product name', () => {
                const invalidProductName = {};
                expect(() => new TelephonySystemInfo({companyName, productName: invalidProductName, brandingAsset}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a TelephonySystemInfo object for invalid branding asset', () => {
                const invalidBrandingAsset = {};
                expect(() => new TelephonySystemInfo({companyName, productName, brandingAsset: invalidBrandingAsset}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('LoginSettings tests', () => {
        const loginRequired = true;
        const telephonySystemInfo = new TelephonySystemInfo({
            companyName: 'company_name',
            productName: 'product_name',
            brandingAsset: 'branding_asset'
        });
        const loginFields = ['login_field_1', 'login_field_2'];

        describe('LoginSettings success tests', () => {
            it('Should create a LoginSettings object without error', () => {
                let loginSettings;

                expect(() => {
                    loginSettings = new LoginSettings({loginRequired, telephonySystemInfo, loginFields});
                }).not.toThrowError();
                expect(loginSettings.loginRequired).toEqual(loginRequired);
                expect(loginSettings.telephonySystemInfo).toEqual(telephonySystemInfo);
                expect(loginSettings.loginFields).toEqual(loginFields);
            });

            it('Should create a LoginSettings object without error for default login fields', () => {
                let loginSettings;

                expect(() => {
                    loginSettings = new LoginSettings({loginRequired, telephonySystemInfo});
                }).not.toThrowError();
                expect(loginSettings.loginRequired).toEqual(loginRequired);
                expect(loginSettings.telephonySystemInfo).toEqual(telephonySystemInfo);
                expect(loginSettings.loginFields).toEqual([]);
            });
        });

        describe('LoginSettings failure tests', () => {
            it('Should not create a LoginSettings object for invalid loginRequired', () => {
                const invalidLoginRequired = [];
                expect(() => new LoginSettings({loginRequired: invalidLoginRequired, telephonySystemInfo, loginFields}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a LoginSettings object for invalid telephony systems info', () => {
                const invalidTelephonySystemInfo = [];
                expect(() => new LoginSettings({loginRequired, telephonySystemInfo: invalidTelephonySystemInfo, loginFields}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a LoginSettings object for invalid login fields', () => {
                const invalidLoginFields = 'invalid_login_fields';
                expect(() => new LoginSettings({loginRequired, telephonySystemInfo, loginFields: invalidLoginFields}))
                    .toThrowError(invalid_argument);
            });
        });
    });

    describe('LoginField tests', () => {
        const fieldId = 'field_id';
        const fieldLabel = 'field_label';
        const fieldType = 'field_type';
        const fieldValues = {};

        describe('LoginField success tests', () => {
            it('Should create a LoginField object without error', () => {
                let loginField;

                expect(() => {
                    loginField = new LoginField({fieldId, fieldLabel, fieldType, fieldValues});
                }).not.toThrowError();
                expect(loginField.fieldId).toEqual(fieldId);
                expect(loginField.fieldLabel).toEqual(fieldLabel);
                expect(loginField.fieldType).toEqual(fieldType);
                expect(loginField.fieldValues).toEqual(fieldValues);
            });
        });

        describe('LoginField failure tests', () => {
            it('Should not create a LoginField object for invalid fieldId', () => {
                const invalidFieldId = [];
                expect(() => new LoginField({fieldId: invalidFieldId, fieldLabel, fieldType, fieldValues}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a LoginField object for invalid fieldLabel', () => {
                const invalidFieldLabel = [];
                expect(() => new LoginField({fieldId, fieldLabel: invalidFieldLabel, fieldType, fieldValues}))
                    .toThrowError(invalid_argument);
            });

            it('Should not create a LoginField object for invalid fieldType', () => {
                const invalidFieldType = {invalid_field_type: 'invalid_field_type'};
                expect(() => new LoginField({fieldId, fieldLabel, fieldType: invalidFieldType, fieldValues}))
                    .toThrowError(invalid_argument);
            });
        });
    });
});
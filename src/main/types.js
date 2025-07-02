/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

/* eslint-disable no-unused-vars */
import constants from './constants.js';
import { downloadLogs } from './logger.js';

export const Constants = {
    /**
    * @enum {string}
    */
    SHARED_EVENT_TYPE: {
        LOGIN_RESULT: constants.SHARED_EVENT_TYPE.LOGIN_RESULT,
        LOGOUT_RESULT: constants.SHARED_EVENT_TYPE.LOGOUT_RESULT,
        MESSAGE: constants.SHARED_EVENT_TYPE.MESSAGE,
        SET_AGENT_STATUS: constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS,
        GET_AGENT_STATUS: constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS,
        STATE_CHANGE: constants.SHARED_EVENT_TYPE.STATE_CHANGE,
        STORAGE_ACCESS_RESULT: constants.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT,
        GET_CONTACTS_RESULT: constants.SHARED_EVENT_TYPE.GET_CONTACTS_RESULT,
        AFTER_CONVERSATION_WORK_STARTED: constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_STARTED,
        AFTER_CONVERSATION_WORK_ENDED: constants.SHARED_EVENT_TYPE.AFTER_CONVERSATION_WORK_ENDED
    },
    /**
    * @enum {string}
    */
    VOICE_EVENT_TYPE: {
        CALL_STARTED: constants.VOICE_EVENT_TYPE.CALL_STARTED,
        QUEUED_CALL_STARTED: constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED,
        CALL_CONNECTED: constants.VOICE_EVENT_TYPE.CALL_CONNECTED,
        HANGUP: constants.VOICE_EVENT_TYPE.HANGUP,
        MUTE_TOGGLE: constants.VOICE_EVENT_TYPE.MUTE_TOGGLE,
        HOLD_TOGGLE: constants.VOICE_EVENT_TYPE.HOLD_TOGGLE,
        RECORDING_TOGGLE: constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE,
        PARTICIPANTS_SWAPPED: constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED,
        PARTICIPANTS_CONFERENCED: constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED,
        PARTICIPANT_ADDED: constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED, 
        PARTICIPANT_CONNECTED: constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED: constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,
        AFTER_CALL_WORK_STARTED: constants.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED,
        WRAP_UP_ENDED: constants.VOICE_EVENT_TYPE.WRAP_UP_ENDED,
        AGENT_ERROR: constants.VOICE_EVENT_TYPE.AGENT_ERROR,
        SOFTPHONE_ERROR: constants.VOICE_EVENT_TYPE.SOFTPHONE_ERROR,
        UPDATE_AUDIO_STATS: constants.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS,
        CALL_BARGED_IN: constants.VOICE_EVENT_TYPE.CALL_BARGED_IN,
        SUPERVISOR_BARGED_IN: constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,
        SUPERVISOR_CALL_STARTED : constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,
        SUPERVISOR_CALL_CONNECTED: constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
        SUPERVISOR_HANGUP : constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,
        SHOW_TRANSFER_VIEW: constants.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW,
        AUDIO_STATS: constants.VOICE_EVENT_TYPE.AUDIO_STATS,
        CALL_UPDATED: constants.VOICE_EVENT_TYPE.CALL_UPDATED
    },
    /**
    * @enum {string}
    */
    SHARED_ERROR_TYPE: {
        GENERIC_ERROR: constants.SHARED_ERROR_TYPE.GENERIC_ERROR,
        INVALID_AGENT_STATUS: constants.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS
    },
    /**
    * @enum {string}
    */
    VOICE_ERROR_TYPE: {
        INVALID_PARTICIPANT: constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT,
        INVALID_DESTINATION: constants.VOICE_ERROR_TYPE.INVALID_DESTINATION,
        CAN_NOT_UPDATE_PHONE_NUMBER: constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER,
        INVALID_PARAMS: constants.VOICE_ERROR_TYPE.INVALID_PARAMS
    },
    /**
    * @enum {string}
    */
    AGENT_STATUS: { ...constants.AGENT_STATUS },
    /**
    * @enum {string}
    */
    PARTICIPANT_TYPE: { ...constants.PARTICIPANT_TYPE },
    /**
    * @enum {string}
    */
    CALL_TYPE: { ...constants.CALL_TYPE },
    /**
     * @enum {string}
     */
    CALL_SUBTYPE: { ...constants.CALL_SUBTYPE },
    /**
     * @enum {string}
     */
    DIALER_TYPE: { ...constants.DIALER_TYPE },
    /**
    * @enum {string}
    */
    CONTACT_TYPE: { ...constants.CONTACT_TYPE },
    /**
    * @enum {string}
    */
    CONTACT_LIST_TYPE: { ...constants.CONTACT_LIST_TYPE },
    /**
    * @enum {string}
    */
    CALL_STATE: { ...constants.CALL_STATE },
    /**
    * @enum {string}
    */
    HANGUP_REASON: { ...constants.HANGUP_REASON },
    /**
    * @enum {string}
    */
    PHONE_TYPE: { ...constants.PHONE_TYPE },
    /**
     * @enum {String}
     */
    AGENT_AVAILABILITY: { ...constants.AGENT_AVAILABILITY },
    /**
     * @enum (String)
     */
    REMOVE_PARTICIPANT_VARIANT: { ...constants.REMOVE_PARTICIPANT_VARIANT },
    /**
     * @enum {String}
     */
    LOG_LEVEL: { ...constants.LOG_LEVEL },
    /**
     * @enum {String}
     */
    CONTACTS_FILTER_TYPES: { ...constants.CONTACTS_FILTER_TYPES },
    /**
     * @enum {String}
     */
    WORK_EVENT: { ...constants.WORK_EVENT },
    /**
     * @enum {String}
     */
    HANGUP_STATUS: { ...constants.HANGUP_STATUS }
};

/**
 * Class representing a Custom Error
 */
export class CustomError extends Error {
    /**
     * Custom error
     * @param {object} param
     * @param {String} param.labelName
     * @param {String} param.namespace
     * @param {String} [param.message]
     */
    constructor({ labelName, namespace, message }) {
        super(message);

        Validator.validateString(labelName);
        Validator.validateString(namespace);
        if (message) {
            Validator.validateString(message);
        }
        this.labelName = labelName;
        this.namespace = namespace;
        this.message = message;
    }
}

/**
 * Class representing a Phone type
 */
 export class Phone {
    /**
     * Create Phone
     * @param {object} param
     * @param {PHONE_TYPE} param.type
     * @param {string} [param.number]
     */
    constructor({ type, number}) {
        Validator.validateEnum(type, Object.values(constants.PHONE_TYPE));
        if(number) {
            Validator.validateString(number);
        }
        this.type = type;
        this.number = number;
    }
}

/**
 * Class representing an AudioDevice type
 */
export class AudioDevice {
    /**
     * Create AudioDevice
     * @param {object} param
     * @param {string} [param.deviceId]
     * @param {string} [param.kind]
     * @param {string} [param.label]
     * @param {string} [param.groupId]
     */
    constructor({ deviceId, kind, label, groupId }) {
        this.deviceId = deviceId
        this.kind = kind
        this.label = label
        this.groupId = groupId
    }
}

/**
 * Class representing a Hid Device
 */
export class HidDevice {
    /**
     * Create Hid Device
     * @param productId
     * @param vendorId
     */
     constructor({ productId, vendorId }) {
         if (productId) {
             Validator.validateNumber(productId);
         }
         if (vendorId) {
             Validator.validateNumber(vendorId);
         }

         this.productId = productId;
         this.vendorId = vendorId;
     }
}

/**
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create MuteToggleResult
     * @param {object} param
     * @param {boolean} param.isMuted
     * @param {PhoneCall} param.call
     * @param {boolean} param.isGlobal
     */
    constructor({ isMuted, call, isGlobal }) {
        this.isMuted = isMuted;
        this.call = call;
        this.isGlobal = isGlobal;
    }
}

/**
 * Class representing result type for getActiveCalls()
 */
export class ActiveCallsResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {PhoneCall[]} [param.activeCalls]
     */
    constructor({ activeCalls = [] }) {
        if (activeCalls.length > 0) {
            activeCalls.forEach(activeCall => {
                Validator.validateClassObject(activeCall, PhoneCall);
            });
        }
        this.activeCalls = activeCalls;
    }
}

/**
 * Class representing result type for getAudioDevices()
 */
export class AudioDevicesResult {
    /**
     * Create AudioDevicesResult
     * @param {object} param
     * @param {AudioDevice[]} param.audioDevices
     */
    constructor({ audioDevices = [] }) {
        this.audioDevices = audioDevices;
    }
}

/**
 * Class representing result type for getSharedCapabilities()
 */
export class SharedCapabilitiesResult {
    /**
     * Create SharedCapabilitiesResult
     * @param {object} param
     * @param {boolean} [param.debugEnabled]
     * @param {boolean} [param.hasContactSearch] True if getPhoneContacts uses the 'contain' filter
     * @param {boolean} [param.hasAgentAvailability] True if getPhoneContacts also provides agent availability, false if Salesforce provides it.
     * @param {boolean} [param.hasQueueWaitTime] True if getPhoneContacts also provides estimated queue wait time, false if Salesforce provides it.
     * @param {boolean} [param.hasTransferToOmniFlow] True if vendor supports transfer to omni flows
     * @param {boolean} [param.hasPendingStatusChange] True if vendor supports Pending Status Change
     * @param {boolean} [param.hasSFDCPendingState] True if amazon connect has sfdc_pending state
     * @param {boolean} [param.hasAutoAcceptEnabled] True if agent has enabled auto accept
     */
    constructor({
        debugEnabled = true,
        hasContactSearch = false,
        hasAgentAvailability = false,
        hasQueueWaitTime = false,
        hasTransferToOmniFlow = false,
        hasPendingStatusChange = false,
        hasSFDCPendingState = false,
        hasAutoAcceptEnabled = false
    }){
        Validator.validateBoolean(debugEnabled);
        Validator.validateBoolean(hasContactSearch);
        Validator.validateBoolean(hasAgentAvailability);
        Validator.validateBoolean(hasQueueWaitTime);
        Validator.validateBoolean(hasTransferToOmniFlow);
        Validator.validateBoolean(hasPendingStatusChange);
        Validator.validateBoolean(hasSFDCPendingState);
        Validator.validateBoolean(hasAutoAcceptEnabled);

        this.debugEnabled = debugEnabled;
        this.hasContactSearch = hasContactSearch;
        this.hasAgentAvailability = hasAgentAvailability;
        this.hasQueueWaitTime = hasQueueWaitTime;
        this.hasTransferToOmniFlow = hasTransferToOmniFlow;
        this.hasPendingStatusChange = hasPendingStatusChange;
        this.hasSFDCPendingState = hasSFDCPendingState;
        this.hasAutoAcceptEnabled = hasAutoAcceptEnabled;
    }
}

/**
 * Class representing result type for getVoiceCapabilities()
 */
export class VoiceCapabilitiesResult {
    /**
     * Create VoiceCapabilitiesResult
     * @param {object} param
     * @param {boolean} [param.hasMute]
     * @param {boolean} [param.hasRecord]
     * @param {boolean} [param.hasMerge]
     * @param {boolean} [param.hasSwap]
     * @param {boolean} [param.hasBlindTransfer] True if vendor supports blind transfers
     * @param {boolean} [param.hasSignedRecordingUrl]
     * @param {boolean} [param.supportsMos] True if vendor support MOS
     * @param {boolean} [param.hasSupervisorListenIn] True if vendor supports supervisor listening  to a ongoing call
     * @param {boolean} [param.hasSupervisorBargeIn] True if vendor supports Supervisor  barging into a ongoing call
     * @param {boolean} [param.hasPhoneBook] True if vendor supports the phoneBook UI
     * @param {boolean} [param.hasGetExternalSpeakerDeviceSetting] True if vendor supports retrieving the speaker device ID
     * @param {boolean} [param.hasSetExternalSpeakerDeviceSetting] True if vendor supports setting the speaker device ID
     * @param {boolean} [param.hasGetExternalMicrophoneDeviceSetting] True if vendor supports retrieving the microphone device ID
     * @param {boolean} [param.hasSetExternalMicrophoneDeviceSetting] True if vendor supports setting the microphone device ID
     * @param {boolean} [param.canConsult] True if can consult
     * @param {boolean} [param.isDialPadDisabled] True if dial pad is disabled
     * @param {boolean} [param.isHidSupported] True if vendor supports hid or headset controllers
     * @param {boolean} [param.isPhoneBookDisabled] True if phone book is disabled
     */
    constructor({
        hasMute = true,
        hasRecord = true,
        hasMerge = true,
        hasSwap = true,
        hasBlindTransfer = false,
        hasSignedRecordingUrl = false,
        supportsMos = false,
        hasSupervisorListenIn = false,
        hasSupervisorBargeIn = false,
        hasPhoneBook = false,
        hasGetExternalSpeakerDeviceSetting = false,
        hasSetExternalSpeakerDeviceSetting = false,
        hasGetExternalMicrophoneDeviceSetting = false,
        hasSetExternalMicrophoneDeviceSetting = false,
        canConsult= false,
        isDialPadDisabled = false,
        isHidSupported = false,
        isPhoneBookDisabled = false
    }) {
        Validator.validateBoolean(hasMute);
        Validator.validateBoolean(hasRecord);
        Validator.validateBoolean(hasMerge);
        Validator.validateBoolean(hasSwap);
        Validator.validateBoolean(hasBlindTransfer);
        Validator.validateBoolean(hasSignedRecordingUrl);
        Validator.validateBoolean(supportsMos);
        Validator.validateBoolean(hasSupervisorListenIn);
        Validator.validateBoolean(hasSupervisorBargeIn);
        Validator.validateBoolean(hasPhoneBook);
        Validator.validateBoolean(hasGetExternalSpeakerDeviceSetting);
        Validator.validateBoolean(hasSetExternalSpeakerDeviceSetting);
        Validator.validateBoolean(hasGetExternalMicrophoneDeviceSetting);
        Validator.validateBoolean(hasSetExternalMicrophoneDeviceSetting);
        Validator.validateBoolean(canConsult);
        Validator.validateBoolean(isDialPadDisabled);
        Validator.validateBoolean(isHidSupported);
        Validator.validateBoolean(isPhoneBookDisabled);

        this.hasMute = hasMute;
        this.hasRecord = hasRecord;
        this.hasMerge = hasMerge;
        this.hasSwap = hasSwap;
        this.hasBlindTransfer = hasBlindTransfer;
        this.hasSignedRecordingUrl = hasSignedRecordingUrl;
        this.supportsMos = supportsMos;
        this.hasSupervisorListenIn = hasSupervisorListenIn;
        this.hasSupervisorBargeIn = hasSupervisorBargeIn;
        this.hasPhoneBook = hasPhoneBook;
        this.hasGetExternalSpeakerDeviceSetting = hasGetExternalSpeakerDeviceSetting;
        this.hasSetExternalSpeakerDeviceSetting = hasSetExternalSpeakerDeviceSetting;
        this.hasGetExternalMicrophoneDeviceSetting = hasGetExternalMicrophoneDeviceSetting;
        this.hasSetExternalMicrophoneDeviceSetting = hasSetExternalMicrophoneDeviceSetting;
        this.canConsult = canConsult;
        this.isDialPadDisabled = isDialPadDisabled;
        this.isHidSupported = isHidSupported;
        this.isPhoneBookDisabled = isPhoneBookDisabled;
    }
}

/**
 * Class representing result type for getAgentConfig()
 */
export class AgentConfigResult {
    /**
     * Create AgentConfigResult
     * @param {object} param
     * @param {Phone[]} param.phones
     * @param {Phone} param.selectedPhone
     * @param {string} param.speakerDeviceId
     * @param {string} param.microphoneDeviceId
     */
    constructor({ phones = [constants.PHONE_TYPE.SOFT_PHONE], selectedPhone = new Phone({type: constants.PHONE_TYPE.SOFT_PHONE}),
                    speakerDeviceId = '', microphoneDeviceId = ''}) {
        Validator.validateClassObject(phones, Array);
        Validator.validateClassObject(selectedPhone, Phone);
        Validator.validateString(speakerDeviceId);
        Validator.validateString(microphoneDeviceId);

        this.phones = phones;
        this.selectedPhone = selectedPhone;
        this.speakerDeviceId = speakerDeviceId;
        this.microphoneDeviceId = microphoneDeviceId;
    }
}

/**
 * Class representing AgentConfig type for setAgentConfig()
 */
export class AgentConfig {
    /**
     * Create AgentConfig
     * @param {object} param
     * @param {Phone} param.selectedPhone
     * @param {string} param.speakerDeviceId
     * @param {string} param.microphoneDeviceId
     * @param {HidDevice} param.hidDeviceInfo
     */
    constructor({ selectedPhone,speakerDeviceId, microphoneDeviceId, hidDeviceInfo }) {
        Validator.validateClassObject(selectedPhone, Phone);
        //Hid device info is optional
        if (hidDeviceInfo !== undefined) {
            Validator.validateClassObject(hidDeviceInfo, HidDevice);
        }
        this.selectedPhone = selectedPhone;
        this.speakerDeviceId = speakerDeviceId;
        this.microphoneDeviceId = microphoneDeviceId;
        this.hidDeviceInfo = hidDeviceInfo;
    }
}

/**
 * Class representing result type for pauseRecording() & resumeRecording
 */
export class RecordingToggleResult {
    /**
     * Create RecordingToggleResult
     * @param {object} param
     * @param {boolean} param.isRecordingPaused
     * @param {string} [param.contactId]
     * @param {string} [param.initialContactId]
     * @param {string} [param.instanceId]
     * @param {string} [param.region]
     */
    constructor({ isRecordingPaused, contactId = null, initialContactId = null, instanceId = null, region = null }) {
        this.isRecordingPaused = isRecordingPaused;
        this.contactId = contactId;
        this.initialContactId = initialContactId;
        this.instanceId = instanceId;
        this.region = region;
    }
}

/**
 * Class representing result type for addParticipant()
 */
export class ParticipantResult {
    /**
     * Create ParticipantResult
     * @param {object} param
     * @param {boolean} param.initialCallHasEnded
     * @param {CallInfo} param.callInfo
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} param.phoneNumber
     * @param {string} param.callId
     * @param {Contact} param.contact
     */
    constructor({ initialCallHasEnded, callInfo, callAttributes, phoneNumber, callId, contact = null }) {
        Validator.validateClassObject(callInfo, CallInfo);
        this.initialCallHasEnded = initialCallHasEnded;
        this.callInfo = callInfo;
        this.callAttributes = callAttributes;
        this.phoneNumber = phoneNumber;
        this.callId = callId;
        this.contact = contact
    }
}

/**
 * Class representing result type for getContacts()
 */
export class ContactsResult {
     /**
     * Create ContactsResult
     * @param {object} param
     * @param {Contact[]} [param.contacts]
     * @param {Array} [param.contactTypes]
     */
    constructor({ contacts = [], contactTypes = [] }) {
        if (contacts.length > 0) {
            contacts.forEach(contact => {
                Validator.validateClassObject(contact, Contact);
            });
        }
        if (contactTypes.length > 0) {
            contactTypes.forEach(filterType => {
                Validator.validateEnum(filterType, Object.values(constants.CONTACT_TYPE));
            });
        }
        this.contacts = contacts;
        this.contactTypes = contactTypes;
    }
}

/**
 * Class representing result type for getPhoneContacts()
 * NOTE: TO BE DEPRECATED, Use ContactsResult instead
 */
export class PhoneContactsResult extends ContactsResult {
    /**
     * Create PhoneContactsResult
     * @param {object} param
     * @param {Contact[]} [param.contacts]
     * @param {Array} [param.contactTypes]
     */
    constructor({ contacts = [], contactTypes = [] }) {
        super({ contacts, contactTypes });
    }
}



/**
 * Class representing result type for accept(), decline(), dial()
 */
export class CallResult {
    /**
     * Create CallResult
     * @param {object} param
     * @param {PhoneCall} [param.call]
     */
    constructor({ call }) {
        if (call !== undefined) {
            Validator.validateClassObject(call, PhoneCall);
        }
        this.call = call;
    }
}

/**
 * Class representing result type for endCall(), hangup()
 */
export class HangupResult {
    /**
     * Create CallResult
     * @param {object} param
     * @param {PhoneCall[]|PhoneCall} param.calls - one or more calls (can be multiple calls in case of agent endcall/hangup)
     */
    constructor({ calls }) {
        if (calls instanceof Array) {
            calls.forEach(call => Validator.validateClassObject(call, PhoneCall));
            this.calls = calls;
        } else {
            Validator.validateClassObject(calls, PhoneCall);
            this.calls = [calls];
        }
    }
}

/**
 * Class representing result type for hold() & resume()
 */
export class HoldToggleResult {
    /**
     * Create HoldToggleResult
     * @param {object} param
     * @param {boolean} param.isThirdPartyOnHold
     * @param {boolean} param.isCustomerOnHold
     * @param {PhoneCall[]} [param.calls]
     * @param {boolean} param.isCallMerged
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls , isCallMerged}) {
        if (calls) {
            Object.values(calls).forEach(call => {
                Validator.validateClassObject(call, PhoneCall);
            });
            this.calls = calls;
        }
        this.isThirdPartyOnHold = isThirdPartyOnHold;
        this.isCustomerOnHold = isCustomerOnHold;
        this.isCallMerged = isCallMerged;
    }
}

/**
 * Class representing result type for getRecordingUrl
 */
 export class SignedRecordingUrlResult {
    /**
     * Create SignedRecordingUrlResult
     * @param {object} param
     * @param {boolean} param.success
     * @param {string} [param.url]
     * @param {number} [param.duration] in seconds
     * @param {string} [param.callId] Salesforce callId of the voice call
     */
    constructor({ success, url, duration, callId }) {
        if (success) {
            // For a successfull result, url is required
            Validator.validateString(url);
            Validator.validateString(callId);
            if (duration) {
                Validator.validateNumber(duration);
            }
        }
        this.success = success;
        this.url = url;
        this.duration = duration;
        this.callId = callId;
    }
}

/**
 * Class representing result type for init()
 */
export class InitResult {
    /**
     * Create InitResult
     * @param {object} param
     * @param {boolean} [param.showLogin]
     * @param {number} [param.loginFrameHeight]
     * @param {boolean} [param.isSilentLogin]
     * @param {boolean} [param.showStorageAccess]
     */
    constructor({ showLogin = false, loginFrameHeight = 350, isSilentLogin = false, showStorageAccess = false }) {
        this.showLogin = showLogin;
        this.loginFrameHeight = loginFrameHeight;
        this.isSilentLogin = this.showLogin ? false : isSilentLogin;
        this.showStorageAccess = showStorageAccess;
    }
}

/**
 * Class representing dial options for outbound dialing 
 */
export class DialOptions {
    /**
     * Create DialOptions
     * @param {boolean} [param.isCallback]
     * @param {boolean} [param.isConsultCall]
     */
    constructor({ isCallback = false, isConsultCall = false }) {
        this.isCallback = isCallback;
        this.isConsultCall = isConsultCall;
    }
}

/**
 * Class representing generic result type
 */
export class GenericResult {
    /**
     * Create GenericResult
     * @param {object} param
     * @param {boolean} param.success
     */
    constructor({ success }) {
        this.success = success;
    }
}

/**
 * Class representing result type for setAgentConfig()
 */
export class SetAgentConfigResult extends GenericResult {
    /**
     * Create AgentConfig
     * @param {object} param
     */
    constructor({ success, isSystemEvent = false }) {
        super({ success });
        this.isSystemEvent = isSystemEvent;
    }
    
    setIsSystemEvent(isSystemEvent) {
        this.isSystemEvent = isSystemEvent;
    }
}

/**
 * Class representing logout result type
 */
 export class LogoutResult {
    /**
     * Create LogoutResult
     * @param {object} param
     * @param {boolean} param.success
     * @param {number} [param.loginFrameHeight]
     */
    constructor({ success, loginFrameHeight = 350 }) {
        this.success = success;
        this.loginFrameHeight = loginFrameHeight;
    }
}

/**
 * Class representing callInfo class (call metadata)
 */
export class CallInfo {
    /**
     * Create CallInfo
     * @param {object} param
     * @param {boolean} param.isOnHold
     * @param {boolean} param.isRecordingPaused
     * @param {boolean} param.isMuted
     * @param {string} [param.initialCallId]
     * @param {Date} [param.callStateTimestamp]
     * @param {string} [param.queueName]
     * @param {string} [param.queueId]
     * @param {Date} [param.queueTimestamp]
     * @param {boolean} [param.isSoftphoneCall] - is it a softphone call 
     * @param {boolean} [param.acceptEnabled]
     * @param {boolean} [param.declineEnabled]
     * @param {boolean} [param.muteEnabled]
     * @param {boolean} [param.swapEnabled]
     * @param {boolean} [param.conferenceEnabled]
     * @param {boolean} [param.holdEnabled]
     * @param {boolean} [param.recordEnabled]
     * @param {boolean} [param.addCallerEnabled]
     * @param {boolean} [param.extensionEnabled]
     * @param {boolean} [param.isReplayable]
     * @param {boolean} [param.isBargeable]
     * @param {boolean} [param.isExternalTransfer]
     * @param {boolean} [param.showMuteButton]
     * @param {boolean} [param.showRecordButton]
     * @param {boolean} [param.showAddCallerButton]
     * @param {boolean} [param.showAddBlindTransferButton]
     * @param {boolean} [param.showMergeButton]
     * @param {boolean} [param.showSwapButton]
     * @param {("ALWAYS"|"NEVER"|"ALWAYS_EXCEPT_ON_HOLD")} [param.removeParticipantVariant] - The type of remove participant variant when in a transfer call.
     * @param {String} [param.additionalFields] - Represents additional standard and custom fields in the voice call record, where each key-value pair value corresponds to a standard or custom field and its values.
     * @param {boolean} [param.isMultiParty]
     * @param {boolean} [param.isHIDCall]
     * @param {boolean} [param.endCallDisabled]
     * @param {string} [param.renderContactId]
     */
    constructor({ callStateTimestamp = null, isOnHold, isMuted = false, isRecordingPaused = false, initialCallId, queueId = null, queueName = null, queueTimestamp = null, isSoftphoneCall = true, 
        acceptEnabled = true, declineEnabled = true, muteEnabled = true, swapEnabled = true, conferenceEnabled = true, holdEnabled = true,
        recordEnabled = true, addCallerEnabled = true, extensionEnabled = true, isReplayable = true, isBargeable = false, isExternalTransfer, 
        showMuteButton = true, showRecordButton = true, showAddCallerButton = true, showAddBlindTransferButton = true, showMergeButton = true,

        showSwapButton = true, removeParticipantVariant = Constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS, additionalFields = null, isMultiParty = false, isHIDCall = false, endCallDisabled = false, renderContactId = null }) {

        if (callStateTimestamp) {
            Validator.validateDate(callStateTimestamp);
        }
        if (queueTimestamp) {
            Validator.validateDate(queueTimestamp);
        }
        if (queueId) {
            Validator.validateString(queueId);
        }
        if (queueName) {
            Validator.validateString(queueName);
        }
        Validator.validateBoolean(isRecordingPaused);
        Validator.validateBoolean(isMuted);
        Validator.validateBoolean(isSoftphoneCall);
        Validator.validateBoolean(acceptEnabled);
        Validator.validateBoolean(declineEnabled);
        Validator.validateBoolean(muteEnabled);
        Validator.validateBoolean(swapEnabled);
        Validator.validateBoolean(conferenceEnabled);
        Validator.validateBoolean(holdEnabled);
        Validator.validateBoolean(recordEnabled);
        Validator.validateBoolean(addCallerEnabled);
        Validator.validateBoolean(extensionEnabled);
        Validator.validateBoolean(isBargeable);
        Validator.validateBoolean(showMuteButton);
        Validator.validateBoolean(showRecordButton);
        Validator.validateBoolean(showAddCallerButton);
        Validator.validateBoolean(showAddBlindTransferButton);
        Validator.validateBoolean(showMergeButton);
        Validator.validateBoolean(showSwapButton);
        Validator.validateBoolean(isHIDCall);
        Validator.validateBoolean(endCallDisabled);
        if (isExternalTransfer !== undefined) {
            Validator.validateBoolean(isExternalTransfer);
        }
        Validator.validateEnum(removeParticipantVariant, Object.values(constants.REMOVE_PARTICIPANT_VARIANT));
        if (additionalFields) {
            Validator.validateString(additionalFields);
        }
        Validator.validateBoolean(isMultiParty);
        if (renderContactId) {
            Validator.validateString(renderContactId);
        }
        this.callStateTimestamp = callStateTimestamp;
        this.isRecordingPaused = isRecordingPaused;
        this.isMuted = isMuted;
        this.isOnHold = isOnHold;
        this.initialCallId = initialCallId;
        this.queueName = queueName;
        this.queueId = queueId;
        this.queueTimestamp = queueTimestamp;
        this.isSoftphoneCall = isSoftphoneCall;
        this.acceptEnabled = acceptEnabled;
        this.declineEnabled = declineEnabled;
        this.muteEnabled = muteEnabled;
        this.swapEnabled = swapEnabled;
        this.conferenceEnabled = conferenceEnabled;
        this.holdEnabled = holdEnabled;
        this.recordEnabled = recordEnabled;
        this.addCallerEnabled = addCallerEnabled;
        this.extensionEnabled = extensionEnabled;
        this.isReplayable = isReplayable;
        this.isBargeable = isBargeable;
        this.isExternalTransfer = isExternalTransfer;
        this.removeParticipantVariant = removeParticipantVariant;
        this.showMuteButton = showMuteButton;
        this.showRecordButton = showRecordButton;
        this.showAddCallerButton = showAddCallerButton;
        this.showAddBlindTransferButton = showAddBlindTransferButton;
        this.showMergeButton = showMergeButton;
        this.showSwapButton = showSwapButton;
        this.additionalFields = additionalFields;
        this.isMultiParty = isMultiParty;
        this.isHIDCall = isHIDCall;
        this.endCallDisabled = endCallDisabled;
        this.renderContactId = renderContactId;
    }
}

/** 
 * Class representing a Contact. This object is used to represent 
 * phone system contact or any call target
 */

export class Contact {
    /**
     * Create a Contact.
     * @param {object} param
     * @param {string} [param.id] - The unique contactId
     * @param {("PhoneBook"|"Queue"|"PhoneNumber"|"Agent")} [param.type] - The type of the contact, one of the CONTACT_TYPE values
     * @param {string} [param.name] - The label for this contact to be displayed in the UI
     * @param {("Transfer"|"Conference"|"All")} [param.listType] - The type of contact List, one of the CONTACT_LIST_TYPE values. Messaging Only
     * @param {string} [param.phoneNumber] - The phone number associcated with this contact
     * @param {string} [param.prefix] - Any prefix to be dialed before dialing the number (i.e. +1)
     * @param {string} [param.extension] - Any extension to be dialed after dialing the number
     * @param {string} [param.endpointARN]
     * @param {string} [param.queue]
     * @param {string} [param.availability]
     * @param {string} [param.recordId] - Salesforce RecordId
     * @param {string} [param.description] - Contact Description
     * @param {string} [param.queueWaitTime] - Estimated Queue Wait Time
     */
    constructor({phoneNumber, id, type, name, listType, prefix, extension, endpointARN, queue, availability, recordId, description, queueWaitTime}) {
        if (phoneNumber) {
            Validator.validateString(phoneNumber);
        }
        if (type) {
            Validator.validateEnum(type, Object.values(constants.CONTACT_TYPE));
        }
        if (id) {
            Validator.validateString(id);
        }
        if (name) {
            Validator.validateString(name);
        }
        if (listType) {
            Validator.validateEnum(listType, Object.values(Constants.CONTACT_LIST_TYPE));
        }
        if (prefix) {
            Validator.validateString(prefix);
        }
        if (extension) {
            Validator.validateString(extension);
        }
        if (availability) {
            Validator.validateEnum(availability, Object.values(constants.AGENT_AVAILABILITY));
        }
        if (recordId) {
            Validator.validateString(recordId);
        }
        if (description) {
            Validator.validateString(description);
        }
        if (queueWaitTime) {
            Validator.validateString(queueWaitTime);
        }

        this.phoneNumber = phoneNumber;
        this.id = id;
        this.type = type;
        this.name = name;
        this.listType = listType;
        this.prefix = prefix;
        this.extension = extension;
        this.endpointARN = endpointARN;
        this.queue = queue;
        if (constants.CONTACT_TYPE.AGENT === this.type) {
            this.availability = availability;
        } else {
            this.availability = null;
        }
        this.queueWaitTime = queueWaitTime;
        this.recordId = recordId;
        this.description = description;
    }
}

/** 
* Class representing PhoneCallAttributes
*/

export class PhoneCallAttributes {
    /**
     * Create PhoneCallAttributes.
     * @param {object} param
     * @param {string} [param.voiceCallId] - The voice call id
     * @param {PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
     * @param {DIALER_TYPE} [param.dialerType] - The dialer type of the call
     * @param {string} [param.parentId] - The parent call id of the call
     * @param {boolean} [param.isOnHold]
     * @param {boolean} [param.hasSupervisorBargedIn]
     * @param {boolean} [param.isAutoMergeOn] - for multiparty conference, the call cannot be put on hold, and is being auto-merged
     * @param {boolean} [param.isConsultCall] - true if the call is a Consult call
     */
    constructor({ voiceCallId, participantType, dialerType = Constants.DIALER_TYPE.NONE, parentId, isOnHold, hasSupervisorBargedIn = false, isAutoMergeOn = false, isConsultCall = false }) {
        if (voiceCallId) {
            Validator.validateString(voiceCallId);
        }
        if (participantType) {
            Validator.validateEnum(participantType, Object.values(constants.PARTICIPANT_TYPE));
        }
        if (parentId) {
            Validator.validateString(parentId);
        }
        if (isOnHold !== undefined) {
            Validator.validateBoolean(isOnHold);
        }

        Validator.validateBoolean(hasSupervisorBargedIn);
        Validator.validateEnum(dialerType, Object.values(constants.DIALER_TYPE));
        Validator.validateBoolean(isAutoMergeOn);
        Validator.validateBoolean(isConsultCall);
        
        this.voiceCallId = voiceCallId;
        this.participantType = participantType;
        this.parentId = parentId;
        this.isOnHold = isOnHold;
        this.dialerType = dialerType;
        this.hasSupervisorBargedIn = hasSupervisorBargedIn;
        this.isAutoMergeOn = isAutoMergeOn;
        this.isConsultCall = isConsultCall;
    }
}

/** 
* Class representing a PhoneCall (PSTN or WebRTC).
*/

export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {object} param
     * @param {string} [param.callId] - The unique callId. This is a required parameter
     * @param {CALL_TYPE} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {CALL_SUBTYPE} [param.callSubtype] - The subtype of the call, one of the CALL_SUBTYPE values
     * @param {Contact} [param.contact] - The Call Target / Contact 
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed 
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {string} [param.agentStatus]
     * @param {string} [param.agentARN]
     */
    constructor({callId, callType, callSubtype, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus, agentARN }) {
        // TODO: Revisit the required fields
        if (callId) {
            Validator.validateString(callId);
            this.callId = callId;
        }
        if (callType) {
            Validator.validateEnum(callType, Object.values(constants.CALL_TYPE));
            this.callType = callType;
        }
        if (callSubtype) {
            Validator.validateEnum(callSubtype, Object.values(constants.CALL_SUBTYPE));
            this.callSubtype = callSubtype;
        }
        if (phoneNumber) {
            Validator.validateString(phoneNumber);
            this.phoneNumber = phoneNumber;
        }
        if (callInfo) {
            Validator.validateClassObject(callInfo, CallInfo);
            this.callInfo = callInfo;
        }
        if (contact) {
            Validator.validateClassObject(contact, Contact);
            this.contact = contact;
        }
        if (reason) {
            this.reason = reason;
        }
        if (closeCallOnError) {
            this.closeCallOnError = closeCallOnError;
        }
        if (agentStatus) {
            this.agentStatus = agentStatus;
        }
        if (agentARN) {
            this.agentARN = agentARN;
        }
        this.state = state;
        this.callAttributes = callAttributes;
    }
}

/** 
* Class representing a TelephonyConnector
*/
export class TelephonyConnector {
    /**
     * Get the currently active calls
     * @returns {Promise<ActiveCallsResult>} 
     * 
     */
    getActiveCalls() {
        throw new Error('Not implemented');
    }

    /**
     * Accept call
     * @param {PhoneCall} call - The call to be accepted
     * @returns {Promise<CallResult>} 
     * 
     */
    acceptCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * Decline call
     * @param {PhoneCall} call - The call to be declined
     * @returns {Promise<CallResult>} 
     * 
     */
    declineCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * End call
     * @param {PhoneCall} call - The call to be ended
     * @param {AGENT_STATUS} agentStatus
     * @returns {Promise<HangupResult>} 
     * 
     */
    endCall(call, agentStatus) {
        throw new Error('Not implemented');
    }

    /**
     * Mute call
     * @param {PhoneCall} call (an optional participant call to mute)
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    mute(call) {
        throw new Error('Not implemented');
    }

    /**
     * Unmute call
     * @param {PhoneCall} call (an optional participant call to unmute)
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    unmute(call) {
        throw new Error('Not implemented');
    }

    /**
     * Hold call
     * @param {PhoneCall} call - The call to be held
     * @returns {Promise<HoldToggleResult>} 
     * 
     */
    hold(call) {
        throw new Error('Not implemented');
    }

    /**
     * Resume call
     * @param {PhoneCall} call - The call to be resumed
     * @returns {Promise<HoldToggleResult>} 
     * 
     */
    resume(call) {
        throw new Error('Not implemented');
    }

    /**
     * Dial out Number
     * @param {Contact} contact
     * @param {DialOptions} dialOptions
     * @returns {Promise<CallResult>} 
     * 
     */
    dial(contact, dialOptions) {
        throw new Error('Not implemented');
    }

    /**
     * Send digits
     * @param {string} digits
     */
    sendDigits(digits) {
        throw new Error('Not implemented');
    }

    /**
     * Get phone contacts
     * @param {ContactsFilter} filterType
     * @returns {Promise<PhoneContactsResult>} 
     */
    getPhoneContacts(filter) {
        throw new Error('Not implemented');
    }

    /**
     * Swap calls
     * @param {PhoneCall} call1
     * @param {PhoneCall} call2
     * @returns {Promise<HoldToggleResult>} 
     */
    swap(call1, call2) {
        throw new Error('Not implemented');
    }

    /**
     * Conference calls
     * @param {PhoneCall[]} calls
     * @returns {Promise<HoldToggleResult>} 
     */
    conference(calls) {
        throw new Error('Not implemented');
    }

    /**
     * Add participant to call
     * @param {Contact} contact: The transfer target
     * @param {PhoneCall} parentCall: The call to which a participant will be added
     * @param {Boolean} isBlindTransfer: True if blind transfering a call and hanging up upon transfer
     * @returns {Promise<ParticipantResult>} 
     */
    addParticipant(contact, parentCall, isBlindTransfer) {
        throw new Error('Not implemented');
    }

    /**
     * Pause recording
     * @returns {Promise<RecordingToggleResult>} 
     */
    pauseRecording() {
        throw new Error('Not implemented');
    }

    /**
     * Resume recording
     * @returns {Promise<RecordingToggleResult>} 
     */
    resumeRecording() {
        throw new Error('Not implemented');
    }

    /**
     * Get agentConfig
     * @returns {Promise<AgentConfigResult>}
     */
    getAgentConfig() {
        throw new Error('Not implemented');
    }

    /**
     * Set Agent Config
     * @param {AgentConfig} config
     * @returns {Promise<GenericResult>}
     */
    setAgentConfig(config) {
        throw new Error('Not implemented');
    }

    /**
     * Get voice capabilities
     * @returns {Promise<VoiceCapabilitiesResult>}
     */
    getVoiceCapabilities() {
        throw new Error('Not implemented');
    }

    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall(call) {
        throw new Error('Not implemented');
    }

    /**
    * Get the signed recording url
    * @param {String} recordingUrl
    * @param {String} vendorCallKey
    * @param {String} callId
    * @returns {Promise<SignedRecordingUrlResult>} 
    */
    getSignedRecordingUrl(recordingUrl, vendorCallKey, callId) {
        throw new Error('Not implemented');
    }

    /**
     * Supervise a call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the call to be supervised
     * @returns {Promise <SuperviseCallResult>}
     */
    superviseCall(supervisedCallInfo) {
        throw new Error('Not implemented');
    }

    /**
     * Supervisor disconnects from a call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the supervised call to be disconnected
     * @returns {Promise <SupervisorHangupResult>}
     */
    supervisorDisconnect(supervisedCallInfo) {
        throw new Error('Not implemented');
    }

    /**
     * Supervisor Barges into a ongoing call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the supervised call which supervisor barges in
     * @returns {Promise <SuperviseCallResult>}
     */
    supervisorBargeIn(supervisedCallInfo) {
        throw new Error('Not implemented');
    }
}

/** 
* Class representing a VendorConnector
*/
export class VendorConnector {
    /**
     * Initialize the connector
     * @param {object} connectorConfig
     * @returns {Promise<InitResult>} 
     * 
     */
    init(config) {
        throw new Error('Not implemented');
    }

    /**
     * Gets the telephonyConnector
     * @returns {Promise<TelephonyConnector>} 
     * 
     */
    getTelephonyConnector() {
        throw new Error('Not implemented');
    }

    /**
     * Sends non-voice agent work events to vendor such as work accepted, declined, etc
     * @param {AgentWork} agentWork
     * 
     */
    onAgentWorkEvent(agentWork) {
        throw new Error('Not implemented');
    }

    /**
     * Set agent status
     * @param {string} agentStatus
     * @param {AgentStatusInfo} statusInfo
     * @param {Boolean} enqueueNextState - flag to determine if this status change request should be enqueued if neccessary
     * @returns {Promise<GenericResult>} 
     * 
     */
    setAgentStatus(agentStatus, statusInfo, enqueueNextState) {
        throw new Error('Not implemented');
    }

    /**
     * Get agent status
     * @returns {Promise<AgentStatusInfo>} 
     * 
     */
     getAgentStatus() {
        this.logMessageToVendor(constants.LOG_LEVEL.INFO, 'getAgentStatus API is NOT Implemented' );
    }

    /**
     * Logout from Omni
     * @returns {Promise<LogoutResult>} 
     */
    logout() {
        throw new Error('Not implemented');
    }

    /**
     * Handle message from LWC/Aura component
     * @param {object} message
     */
    handleMessage(message) {
        throw new Error('Not implemented');
    }

    /**
     * Triggers a browser download for Vendor Logs
     * @param {String[]} logs Array of log messages.
     */
    downloadLogs(logs) {
        downloadLogs();
    }

    /**
     * Sends the logs with a logLevel and payload to the vendor connector.
     * Does a no-op, if not implemented.
     * @param {String} logLevel Log Level (INFO, WARN, ERROR)
     * @param {String} message Message to be logged
     * @param {Object} payload An optional payload to be logged
     */
    logMessageToVendor(logLevel, message, payload) {}

    /**
     * To get the Contacts for this workItem's transfer/other channel operation
     * @param {ContactsFilter} filter It has fields like the search term  and contact Type
     * @param {String} workItemId
     * @returns {Promise<PhoneContactsResult>} 
     */
    getContacts(filter, workItemId) {
        throw new Error('Not implemented');
    }

    /**
     * Returns a list of valid device IDs that can be used for the speaker and microphone devices.
     */
    getAudioDevices() {
        throw new Error('Not implemented');
    }

    /**
     * Get shared capabilities
     * @returns {Promise<SharedCapabilitiesResult>}
     */
    getSharedCapabilities() {
        throw new Error('Not implemented');
    }
}

export class Validator {
    static validateString(value) {
        if (typeof value !== 'string') {
            throw new Error(`Invalid argument. Expecting a string but got ${typeof value}`);
        }
        return this;
    }

    static validateNumber(value) {
        if (typeof value !== 'number') {
            throw new Error(`Invalid argument. Expecting a number but got ${typeof value}`);
        }
        return this;
    }

    static validateBoolean(value) {
        if (typeof value !== 'boolean') {
            throw new Error(`Invalid argument. Expecting a boolean but got ${typeof value}`);
        }
        return this;
    }

    static validateEnum(value, enumValues) {
        const regex = new RegExp(enumValues.join( "|" ), "i");
        if (!regex.test(value)) {
            throw new Error(`Invalid argument. Expecting a value from ${JSON.stringify(enumValues)} but got ${value}`);
        }
        return this;
    }

    static validateDate(value) {
        if (!(value instanceof Date)) {
            throw new Error(`Invalid argument. Expecting a Date object but got ${typeof value}`);
        }
        return this;
    }

    static validateClassObject(object, className) {
        if (!(object instanceof className)) {
            throw new Error(`Invalid className. Expecting object of class ${className} but got ${typeof object}`);
        }
        return this;
    }
    
    static validateClassObjects(object, ...classNames) {
        let isValid = false;
        for (let i = 0; i < classNames.length; i++) {
            try {
                this.validateClassObject(object, classNames[i]);
                isValid = true;
                break;
            } catch(e) {
                // continue on
            }
        }
        if (!isValid) {
            throw new Error(`Invalid className. Expecting object matching a class name in ${classNames} but got ${typeof object}`);
        }
        return this;
    }
}

/** 
* Class representing an AgentWork
*/
export class AgentWork {
    /**
     * Create an AgentWork.
     * @param {object} param
     * @param {string} [param.workItemId] - Salesforce agent work item Id
     * @param {string} [param.workId] - Salesforce work Id
     * @param {WORK_EVENT} [param.workEvent] - The work lifecycle event
     */
    constructor({ workItemId, workId, workEvent }) {
        Validator.validateEnum(workEvent, Object.values(constants.WORK_EVENT));
        this.workEvent = workEvent;
        this.workItemId = workItemId;
        this.workId = workId;
    }
 }

/** 
 * Class representing an Agent status information. This object is used to represent 
 * agent status information
 */

export class AgentStatusInfo {
    /**
     * Create a AgentStatusInfo.
     * @param {object} param
     * @param {string} [param.statusId] - The unique statusId (required)
     * @param {string} [param.statusApiName] - The status API name
     * @param {string} [param.statusName] - The label for this status to be displayed in the UI
     */
    constructor({statusId, statusApiName, statusName}) {
        Validator.validateString(statusId);
        if (statusApiName) {
            Validator.validateString(statusApiName);
        }
        if (statusName) {
            Validator.validateString(statusName);
        }
        this.statusId = statusId;
        this.statusApiName = statusApiName;
        this.statusName = statusName;
    }
}

/** 
 * Class representing an Agent Vendor status information. This object is used to represent 
 * agent vendor side status information
 */
export class AgentVendorStatusInfo {
    /**
     * Create a AgentVendorStatusInfo.
     * @param {object} param
     * @param {string} [param.statusId] - The unique statusId (e.g agentStateARN)
     * @param {string} [param.statusType] - The agent's current availability state type
     * @param {string} [param.statusName] - The name of the agent's current availability state
     */
    constructor({statusId, statusType, statusName}) {
        if (statusId) {
            Validator.validateString(statusId);
        }
        if (statusType) {
            Validator.validateString(statusType);
        }
        if (statusName) {
            Validator.validateString(statusName);
        }
        this.statusId = statusId;
        this.statusType = statusType;
        this.statusName = statusName;
    }
}

/** 
 * NOTE: SALESFORCE INTERNAL USE ONLY
 * Class representing an State Change Result information. This object is used to represent 
 * Agent State Change Infomation
 */
 export class StateChangeResult {
    /**
     * Create a StateChangeResult.
     * @param {object} param
     * @param {AgentVendorStatusInfo} [param.newVendorStateInfo] - newStateName (e.g 'Available') (required), newStateType (e.g 'routable')
     * @param {AgentVendorStatusInfo} [param.oldVendorStateInfo] - oldStateName (e.g 'offline'), oldStateType (e.g 'Offline')
     */
    constructor({newVendorStateInfo, oldVendorStateInfo}) {
        Validator.validateClassObject(newVendorStateInfo, AgentVendorStatusInfo);
        Validator.validateString(newVendorStateInfo.statusName);
        if (oldVendorStateInfo) {
            Validator.validateClassObject(oldVendorStateInfo, AgentVendorStatusInfo);
        }
        this.newVendorStateInfo = newVendorStateInfo;
        this.oldVendorStateInfo = oldVendorStateInfo;
    }
}

/** 
 * Class representing a Supervised Call Info. This object is used to represent 
 * information about a call that is being supervised by a supervisor.
 */
export class SupervisedCallInfo {
    /**
     * Create a AgentStatusInfo.
     * @param {object} param
     * @param {string} [param.callId] - The unique supervised vendor call ID (required)
     * @param {string} [param.voiceCallId] - The supervised salesforce voice call ID
     * @param {string} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {string} [param.from] - From phone number (for Inbound calls)
     * @param {string} [param.to] - To phone number (for Outbound calls)
     * @param {string} [param.supervisorName] - The supervisor name (shown to the supervised agent on barge in)
     * @param {boolean} [param.isBargedIn] - True if the Supervisor has barged in, False if the supervisor is listening in.
     */

    constructor({callId, voiceCallId, callType, from, to, supervisorName, isBargedIn}) {
        Validator.validateString(callId);
        this.callId = callId;
        this.voiceCallId = voiceCallId;
        this.callType = callType;
        this.from = from;
        this.to = to;
        this.supervisorName = supervisorName;
        this.isBargedIn = isBargedIn;
    }
}

/**
 * Class representing a Audio Stats, which contains array of AudioStats. This object is used to calculate the MOS Score
 */

export class AudioStats {
    /**
     * Create a AudioStats
     * @param {object} param
     * @param {string} [param.callId] - The unique callId.
     * @param {AudioStatsElement[]} param.stats - array of AudioStatsElement
     * @param {boolean} [param.isAudioStatsCompleted] - True if the audio stats is completed, will calculate MOS and update VoiceCall record
     */
    constructor({ callId, stats, isAudioStatsCompleted }) {
        if (callId) {
            Validator.validateString(callId);
            this.callId = callId;
        }

        if (stats) {
            Validator.validateClassObject(stats, Array);
            stats.forEach(audioStatsElement => Validator.validateClassObject(audioStatsElement, AudioStatsElement));
            this.stats = stats;
        }

        if (isAudioStatsCompleted) {
            Validator.validateBoolean(isAudioStatsCompleted);
            this.isAudioStatsCompleted = isAudioStatsCompleted;
        }
    }
}

/**
 * Class representing a Audio Stats Element. This object is used to calculate the MOS Score
 */

export class AudioStatsElement {
    /**
     * Create a AudioStatsElement
     * @param {object} param
     * @param {StatsInfo} [param.inputChannelStats] - the inputChannel stream stats
     * @param {StatsInfo} [param.outputChannelStats] - the ouputChannel stream stats
     */
    constructor({inputChannelStats, outputChannelStats}) {
        if (inputChannelStats) {
            Validator.validateClassObject(inputChannelStats, StatsInfo);
        }
        if (outputChannelStats) {
            Validator.validateClassObject(outputChannelStats, StatsInfo);
        }
        
        this.inputChannelStats = inputChannelStats;
        this.outputChannelStats = outputChannelStats;
    }
}

/**
 * Class representing a Stream Stats. This object is used to calculate the MOS Score
 */

export class StatsInfo {
    /**
     * Create a StatsInfo
     * @param {object} param
     * @param {number} [param.packetsCount] - the packets count
     * @param {number} [param.packetsLost] - packets lost count
     * @param {number} [param.jitterBufferMillis] - jitter buffer in milliseconds
     * @param {number} [param.roundTripTimeMillis] - round trip time in milliseconds
     */
    constructor({packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis}) {
        packetsCount = (packetsCount == null || packetsCount < 0) ? 0 : packetsCount;
        packetsLost = (packetsLost == null || packetsLost < 0) ? 0 : packetsLost;
        jitterBufferMillis = (jitterBufferMillis == null || jitterBufferMillis < 0) ? 0 : jitterBufferMillis;
        roundTripTimeMillis = (roundTripTimeMillis == null || roundTripTimeMillis < 0) ? 0 : roundTripTimeMillis;

        this.statsCount = 0;
        this.packetsCount = packetsCount;
        this.packetsLost = packetsLost;
        this.jitterBufferMillis = jitterBufferMillis;
        this.roundTripTimeMillis = roundTripTimeMillis;
    }
}

/**
 * Class representing supervise call result
 */
 export class SuperviseCallResult {
    /**
     * Create a SuperviseCallResult
     * @param {object} param
     * @param {PhoneCall} param.call
     */
    constructor({call}) {
        Validator.validateClassObject(call, PhoneCall);
        this.call = call;
    }
}

/**
 * Class representing result type for supervisorDisconnected()
 */
 export class SupervisorHangupResult extends HangupResult {
     /**
     * Create SupervisorHangupResult
     * @param {object} param
     * @param {PhoneCall[]|PhoneCall} param.calls - one or more calls when supervisor hangsup
     */
    constructor({ calls }) {
        super({ calls });
    }
 }

/** 
 * Class representing result type for STORAGE_ACCESS_RESULT
 * @param {object} param
 * @param {boolean} [param.success]
 * @param {boolean} [param.showLogin] 
 * @param {number} [param.loginFrameHeight]
 */
export class ShowStorageAccessResult {
    constructor({success= false, showLogin = false, loginFrameHeight = 350 }) {
        this.success = success;
        this.showLogin = showLogin;
        this.loginFrameHeight = loginFrameHeight;
    }
}

/**
 * Class used to filter contacts. Passed as a parameter to TelephonyConnector.getPhoneContacts
 * @param {object} param
 * @param {string} param.contains
 * @param {number} param.limit
 * @param {number} param.offset
 * @param {CONTACTS_FILTER_TYPES[]} param.types 
 */ 
export class ContactsFilter {
    constructor(param) {
        if (param) {
            const {contains = null, limit = 50, offset = 0, types = []} = param;
            if (contains) {
                Validator.validateString(contains);
            }
            Validator.validateNumber(limit);
            Validator.validateNumber(offset);
            for (const type of types){
                Validator.validateEnum(types, Object.values(constants.CONTACTS_FILTER_TYPES));
            }
            this.contains = contains;
            this.limit = limit;
            this.offset = offset;
            this.types = types;
        }
    }
}

/**
 * Class used as a parameter to AFTER_CONVERSATION_WORK_STARTED and AFTER_CONVERSATION_WORK_ENDED
 */
export class ACWInfo {
    /**
     * @param {object} param
     * @param {string} param.agentWorkId the id of the AgentWork
     * @param {string} param.workItemId the id of the work item (voice call or messaging session)
     */
    constructor({agentWorkId, workItemId}) {
        if (agentWorkId) {
            Validator.validateString(agentWorkId);
            this.agentWorkId = agentWorkId;
        }
        if (workItemId) {
            Validator.validateString(workItemId);
            this.workItemId = workItemId;
        }
        if (!agentWorkId && !workItemId) {
            throw new Error('You must pass at least one of agent work id or work item (voice call or messaging session) id');
        }
    }
}

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
    EVENT_TYPE: {
        LOGIN_RESULT: constants.EVENT_TYPE.LOGIN_RESULT,
        LOGOUT_RESULT: constants.EVENT_TYPE.LOGOUT_RESULT,
        CALL_STARTED: constants.EVENT_TYPE.CALL_STARTED,
        QUEUED_CALL_STARTED: constants.EVENT_TYPE.QUEUED_CALL_STARTED,
        CALL_CONNECTED: constants.EVENT_TYPE.CALL_CONNECTED,
        HANGUP: constants.EVENT_TYPE.HANGUP,
        MUTE_TOGGLE: constants.EVENT_TYPE.MUTE_TOGGLE,
        HOLD_TOGGLE: constants.EVENT_TYPE.HOLD_TOGGLE,
        RECORDING_TOGGLE: constants.EVENT_TYPE.RECORDING_TOGGLE,
        PARTICIPANTS_SWAPPED: constants.EVENT_TYPE.PARTICIPANTS_SWAPPED,
        PARTICIPANTS_CONFERENCED: constants.EVENT_TYPE.PARTICIPANTS_CONFERENCED,
        PARTICIPANT_ADDED: constants.EVENT_TYPE.PARTICIPANT_ADDED, 
        PARTICIPANT_CONNECTED: constants.EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED: constants.EVENT_TYPE.PARTICIPANT_REMOVED,
        MESSAGE: constants.EVENT_TYPE.MESSAGE,
        AFTER_CALL_WORK_STARTED: constants.EVENT_TYPE.AFTER_CALL_WORK_STARTED,
        WRAP_UP_ENDED: constants.EVENT_TYPE.WRAP_UP_ENDED,
        AGENT_ERROR: constants.EVENT_TYPE.AGENT_ERROR,
        SOFTPHONE_ERROR: constants.EVENT_TYPE.SOFTPHONE_ERROR,
        UPDATE_AUDIO_STATS: constants.EVENT_TYPE.UPDATE_AUDIO_STATS,
        SUPERVISOR_BARGED_IN: constants.EVENT_TYPE.SUPERVISOR_BARGED_IN,
        SUPERVISOR_CALL_STARTED : constants.EVENT_TYPE.SUPERVISOR_CALL_STARTED,
        SUPERVISOR_CALL_CONNECTED: constants.EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
        SUPERVISOR_HANGUP : constants.EVENT_TYPE.SUPERVISOR_HANGUP,
        SET_AGENT_STATUS: constants.EVENT_TYPE.SET_AGENT_STATUS,
        GET_AGENT_STATUS: constants.EVENT_TYPE.GET_AGENT_STATUS,
        STATE_CHANGE: constants.EVENT_TYPE.STATE_CHANGE
    },
    /**
    * @enum {string}
    */
    ERROR_TYPE: {
        GENERIC_ERROR: constants.ERROR_TYPE.GENERIC_ERROR,
        INVALID_PARTICIPANT: constants.ERROR_TYPE.INVALID_PARTICIPANT,
        INVALID_DESTINATION: constants.ERROR_TYPE.INVALID_DESTINATION,
        INVALID_PARAMS: constants.ERROR_TYPE.INVALID_PARAMS,
        INVALID_AGENT_STATUS: constants.ERROR_TYPE.INVALID_AGENT_STATUS,
        CAN_NOT_UPDATE_PHONE_NUMBER: constants.ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER
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
    DIALER_TYPE: { ...constants.DIALER_TYPE },
    /**
    * @enum {string}
    */
    CONTACT_TYPE: { ...constants.CONTACT_TYPE },
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
    CONTACTS_FILTER_TYPES: { ...constants.CONTACTS_FILTER_TYPES }
};

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
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {boolean} param.isMuted
     */
    constructor({ isMuted }) {
        this.isMuted = isMuted;
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
 * Class representing result type for getCapabilities()
 */
export class CapabilitiesResult {
    /**
     * Create CapabilitiesResult
     * @param {object} param
     * @param {boolean} [param.hasMute]
     * @param {boolean} [param.hasRecord]
     * @param {boolean} [param.hasMerge]
     * @param {boolean} [param.hasSwap]
     * @param {boolean} [param.hasSignedRecordingUrl]
     * @param {boolean} [param.debugEnabled]
     * @param {boolean} [param.hasContactSearch] True if getPhoneContacts uses the 'contain' filter
     * @param {boolean} [param.hasAgentAvailability] True if getPhoneContacts also provides agent availability
     * @param {boolean} [param.supportsMos] True if vendor support MOS
     * @param {boolean} [param.hasSupervisorListenIn] True if vendor supports supervisor listening  to a ongoing call
     * @param {boolean} [param.hasSupervisorBargeIn] True if vendor supports Supervisor  barging into a ongoing call
     * @param {boolean} [param.hasBlindTransfer] True if vendor supports blind transfers
     * @param {boolean} [param.hasBlindTransfer] True if vendor supports transfer to omni flows
     * @param {boolean} [param.hasPendingStatusChange] True if vendor supports Pending Status Change
     */
     constructor({ hasMute = true, hasRecord = true, hasMerge = true, hasSwap = true, hasSignedRecordingUrl = false, debugEnabled = true, hasContactSearch = false, hasAgentAvailability = false, supportsMos = false, hasSupervisorListenIn = false, hasSupervisorBargeIn = false, hasBlindTransfer = false, hasTransferToOmniFlow = false, hasPendingStatusChange=false }) {
        Validator.validateBoolean(hasMute);
        Validator.validateBoolean(hasRecord);
        Validator.validateBoolean(hasMerge);
        Validator.validateBoolean(hasSwap);
        Validator.validateBoolean(hasSignedRecordingUrl);
        Validator.validateBoolean(debugEnabled);
        Validator.validateBoolean(hasContactSearch);
        Validator.validateBoolean(hasAgentAvailability);
        Validator.validateBoolean(supportsMos);
        Validator.validateBoolean(hasSupervisorListenIn);
        Validator.validateBoolean(hasSupervisorBargeIn);
        Validator.validateBoolean(hasBlindTransfer);
        Validator.validateBoolean(hasTransferToOmniFlow);
        Validator.validateBoolean(hasPendingStatusChange);

        this.hasMute = hasMute;
        this.hasRecord = hasRecord;
        this.hasMerge = hasMerge;
        this.hasSwap = hasSwap;
        this.hasSignedRecordingUrl = hasSignedRecordingUrl;
        this.debugEnabled = debugEnabled;
        this.hasContactSearch = hasContactSearch;
        this.hasAgentAvailability = hasAgentAvailability;
        this.supportsMos = supportsMos;
        this.hasSupervisorListenIn = hasSupervisorListenIn;
        this.hasSupervisorBargeIn = hasSupervisorBargeIn;
        this.hasBlindTransfer = hasBlindTransfer;
        this.hasTransferToOmniFlow = hasTransferToOmniFlow;
        this.hasPendingStatusChange = hasPendingStatusChange;
    }
}

/**
 * Class representing result type for getAgentConfig()
 */
export class AgentConfigResult {
    /**
     * Create AgentConfigResult
     * @param {object} param
     * @param {Phone[]} [param.phones]
     * @param {Phone} [param.selectedPhone]
     */
    constructor({ phones = [constants.PHONE_TYPE.SOFT_PHONE], selectedPhone = new Phone({type: constants.PHONE_TYPE.SOFT_PHONE}) }) {
        Validator.validateClassObject(phones, Array);
        Validator.validateClassObject(selectedPhone, Phone);

        this.phones = phones;
        this.selectedPhone = selectedPhone;
    }
}

/**
 * Class representing AgentConfig type for setAgentConfig()
 */
export class AgentConfig {
    /**
     * Create AgentConfig
     * @param {object} param
     * @param {Phone} [param.selectedPhone]
     */
    constructor({ selectedPhone }) {
        Validator.validateClassObject(selectedPhone, Phone);
        this.selectedPhone = selectedPhone;
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
     * @param {string} param.phoneNumber
     * @param {string} param.callId
     */
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId }) {
        Validator.validateClassObject(callInfo, CallInfo);
        this.initialCallHasEnded = initialCallHasEnded;
        this.callInfo = callInfo;
        this.phoneNumber = phoneNumber;
        this.callId = callId;
    }
}

/**
 * Class representing result type for getPhoneContacts()
 */
export class PhoneContactsResult {
    /**
     * Create PhoneContactsResult
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
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }) {
        if (calls) {
            Object.values(calls).forEach(call => {
                Validator.validateClassObject(call, PhoneCall);
            });
            this.calls = calls;
        }
        this.isThirdPartyOnHold = isThirdPartyOnHold;
        this.isCustomerOnHold = isCustomerOnHold;
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
     */
    constructor({ showLogin = false, loginFrameHeight = 350 }) {
        this.showLogin = showLogin;
        this.loginFrameHeight = loginFrameHeight;
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
     * @param {("ALWAYS"|"NEVER"|"ALWAYS_EXCEPT_ON_HOLD")} [param.removeParticipantVariant] - The type of remove participant variant when in a transfer call. 
     */
    constructor({ callStateTimestamp = null, isOnHold, isMuted = false, isRecordingPaused = false, initialCallId, isSoftphoneCall = true, 
        acceptEnabled = true, declineEnabled = true, muteEnabled = true, swapEnabled = true, conferenceEnabled = true, holdEnabled = true,
        recordEnabled = true, addCallerEnabled = true, extensionEnabled = true, isReplayable = true, isBargeable = false, isExternalTransfer, 
        removeParticipantVariant = Constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS }) {
        if (callStateTimestamp) {
            Validator.validateDate(callStateTimestamp);
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
        if (isExternalTransfer !== undefined) {
            Validator.validateBoolean(isExternalTransfer);
        }
        Validator.validateEnum(removeParticipantVariant, Object.values(constants.REMOVE_PARTICIPANT_VARIANT));
        this.callStateTimestamp = callStateTimestamp;
        this.isRecordingPaused = isRecordingPaused;
        this.isMuted = isMuted;
        this.isOnHold = isOnHold;
        this.initialCallId = initialCallId;
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
     * @param {string} [param.phoneNumber] - The phone number associcated with this contact
     * @param {string} [param.prefix] - Any prefix to be dialed before dialing the number (i.e. +1)
     * @param {string} [param.extension] - Any extension to be dialed after dialing the number
     * @param {string} [param.endpointARN]
     * @param {string} [param.queue]
     * @param {string} [param.availability]
     * @param {string} [param.recordId] - Salesforce RecordId
     * @param {string} [param.description] - Contact Description 
     */
    constructor({phoneNumber, id, type, name, prefix, extension, endpointARN, queue, availability, recordId, description}) {
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

        this.phoneNumber = phoneNumber;
        this.id = id;
        this.type = type;
        this.name = name;
        this.prefix = prefix;
        this.extension = extension;
        this.endpointARN = endpointARN;
        this.queue = queue;
        if (constants.CONTACT_TYPE.AGENT === this.type) {
            this.availability = availability;
        } else {
            this.availability = null;
        }
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
     */
    constructor({ voiceCallId, participantType, dialerType = Constants.DIALER_TYPE.NONE, parentId, isOnHold, hasSupervisorBargedIn = false }) {
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

        this.voiceCallId = voiceCallId;
        this.participantType = participantType;
        this.parentId = parentId;
        this.isOnHold = isOnHold;
        this.dialerType = dialerType;
        this.hasSupervisorBargedIn = hasSupervisorBargedIn;
    }
}

/** 
* Class representing a PhoneCall. 
*/

export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {object} param
     * @param {string} [param.callId] - The unique callId. This is a required parameter
     * @param {CALL_TYPE} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {Contact} [param.contact] - The Call Target / Contact 
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed 
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {string} [param.agentStatus]
     */
    constructor({callId, callType, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus }) {
        // TODO: Revisit the required fields
        if (callId) {
            Validator.validateString(callId);
            this.callId = callId;
        }
        if (callType) {
            Validator.validateEnum(callType, Object.values(constants.CALL_TYPE));
            this.callType = callType;
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
        this.state = state;
        this.callAttributes = callAttributes;
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
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    mute() {
        throw new Error('Not implemented');
    }

    /**
     * Unmute call
     * @returns {Promise<MuteToggleResult>} 
     * 
     */
    unmute() {
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
     * Set agent status
     * @param {string} agentStatus
     * @param {StatusInfo} statusInfo
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
     * Dial out Number
     * @param {Contact} contact
     * @returns {Promise<CallResult>} 
     * 
     */
    dial(contact) {
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
     * @returns {Promise<PhoneContactsResult>} 
     */
    getPhoneContacts() {
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
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @returns {Promise<ParticipantResult>} 
     */
    addParticipant(contact, call) {
        throw new Error('Not implemented');
    }

    /**
     * Pause recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */
    pauseRecording(call) {
        throw new Error('Not implemented');
    }

    /**
     * Resume recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>} 
     */
    resumeRecording(call) {
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
     * Get Capabilities
     * @returns {Promise<CapabilitiesResult>}
     */
    getCapabilities() {
        throw new Error('Not implemented');
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
     * Supervise a call
     * @param {PhoneCall} call Call to be supervised
     */
     superviseCall(call) {
        throw new Error('Not implemented');
    }

    /**
     * Supervisor disconnects from a call
     * @param {PhoneCall} call Call to be disconnected
     */
    supervisorDisconnect(call) {
        throw new Error('Not implemented');
    }

    /**
     * Supervisor Barges into a ongoing call
     * @param {PhoneCall} call Call which supervisor barges in
     */
    supervisorBargeIn(call) {
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
 export class  SuperviseCallResult {
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
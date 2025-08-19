export namespace Constants {
    namespace SHARED_EVENT_TYPE {
        const LOGIN_RESULT: string;
        const LOGOUT_RESULT: string;
        const MESSAGE: string;
        const SET_AGENT_STATUS: string;
        const GET_AGENT_STATUS: string;
        const STATE_CHANGE: string;
        const STORAGE_ACCESS_RESULT: string;
        const GET_CONTACTS_RESULT: string;
        const AFTER_CONVERSATION_WORK_STARTED: string;
        const AFTER_CONVERSATION_WORK_ENDED: string;
    }
    namespace VOICE_EVENT_TYPE {
        const CALL_STARTED: string;
        const QUEUED_CALL_STARTED: string;
        const CALL_CONNECTED: string;
        const HANGUP: string;
        const MUTE_TOGGLE: string;
        const HOLD_TOGGLE: string;
        const RECORDING_TOGGLE: string;
        const PARTICIPANTS_SWAPPED: string;
        const PARTICIPANTS_CONFERENCED: string;
        const PARTICIPANT_ADDED: string;
        const PARTICIPANT_CONNECTED: string;
        const PARTICIPANT_REMOVED: string;
        const AFTER_CALL_WORK_STARTED: string;
        const WRAP_UP_ENDED: string;
        const AGENT_ERROR: string;
        const SOFTPHONE_ERROR: string;
        const UPDATE_AUDIO_STATS: string;
        const CALL_BARGED_IN: string;
        const SUPERVISOR_BARGED_IN: string;
        const SUPERVISOR_CALL_STARTED: string;
        const SUPERVISOR_CALL_CONNECTED: string;
        const SUPERVISOR_HANGUP: string;
        const SHOW_TRANSFER_VIEW: string;
        const AUDIO_STATS: string;
        const CALL_UPDATED: string;
    }
    namespace SHARED_ERROR_TYPE {
        const GENERIC_ERROR: string;
        const INVALID_AGENT_STATUS: string;
    }
    namespace VOICE_ERROR_TYPE {
        const INVALID_PARTICIPANT: string;
        const INVALID_DESTINATION: string;
        const CAN_NOT_UPDATE_PHONE_NUMBER: string;
        const INVALID_PARAMS: string;
    }
    const AGENT_STATUS: {
        ONLINE: string;
        OFFLINE: string;
        ACW: string;
    };
    const PARTICIPANT_TYPE: {
        AGENT: string;
        INITIAL_CALLER: string;
        THIRD_PARTY: string;
        SUPERVISOR: string;
    };
    const CALL_TYPE: {
        INBOUND: string;
        OUTBOUND: string;
        CALLBACK: string;
        ADD_PARTICIPANT: string;
        TRANSFER: string;
        INTERNAL_CALL: string;
        DIALED_CALLBACK: string;
        CONSULT: string;
    };
    const CALL_SUBTYPE: {
        PSTN: string;
        WEB_RTC: string;
    };
    const DIALER_TYPE: {
        OUTBOUND_PREVIEW: string;
        NONE: string;
    };
    const CONTACT_TYPE: {
        PHONEBOOK: string;
        QUEUE: string;
        PHONENUMBER: string;
        AGENT: string;
        FLOW: string;
    };
    const CONTACT_LIST_TYPE: {
        TRANSFER: string;
        CONFERENCE: string;
        ALL: string;
    };
    const CALL_STATE: {
        RINGING: string;
        CONNECTED: string;
        TRANSFERRING: string;
        TRANSFERRED: string;
        ENDED: string;
    };
    const HANGUP_REASON: {
        PHONE_CALL_ERROR: string;
        PHONE_CALL_ENDED: string;
    };
    const PHONE_TYPE: {
        DESK_PHONE: string;
        SOFT_PHONE: string;
    };
    const AGENT_AVAILABILITY: {
        AVAILABLE: string;
        BUSY: string;
        OFFLINE: string;
    };
    const REMOVE_PARTICIPANT_VARIANT: {
        ALWAYS: string;
        NEVER: string;
        ALWAYS_EXCEPT_ON_HOLD: string;
    };
    const LOG_LEVEL: {
        ERROR: string;
        INFO: string;
    };
    const CONTACTS_FILTER_TYPES: {
        AGENT: string;
        QUEUE: string;
        CONTACT: string;
        DIRECTORY: string;
        FLOW: string;
        AVAILABLE: string;
    };
    const WORK_EVENT: {
        ASSIGNED: string;
        ACCEPTED: string;
        DECLINED: string;
        COMPLETED: string;
        CLOSED: string;
        PAUSED: string;
        UNPAUSED: string;
    };
    const HANGUP_STATUS: {
        MISSED_AGENT: string;
        DECLINED: string;
        FAILED_CONNECT_AGENT: string;
        FAILED_CONNECT_CUSTOMER: string;
        CALLBACK_MISSED_OR_REJECTED: string;
    };
}
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
    constructor({ labelName, namespace, message }: {
        labelName: string;
        namespace: string;
        message?: string;
    });
    labelName: string;
    namespace: string;
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
    constructor({ type, number }: {
        type: string;
        number?: string;
    });
    type: string;
    number: string;
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
    constructor({ productId, vendorId }: {
        productId: any;
        vendorId: any;
    });
    productId: any;
    vendorId: any;
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
    constructor({ isMuted, call, isGlobal }: {
        isMuted: boolean;
        call: PhoneCall;
        isGlobal: boolean;
    });
    isMuted: boolean;
    call: PhoneCall;
    isGlobal: boolean;
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
    constructor({ activeCalls }: {
        activeCalls?: PhoneCall[];
    });
    activeCalls: PhoneCall[];
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
    constructor({ audioDevices }: {
        audioDevices: AudioDevice[];
    });
    audioDevices: AudioDevice[];
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
    constructor({ debugEnabled, hasContactSearch, hasAgentAvailability, hasQueueWaitTime, hasTransferToOmniFlow, hasPendingStatusChange, hasSFDCPendingState, hasAutoAcceptEnabled }: {
        debugEnabled?: boolean;
        hasContactSearch?: boolean;
        hasAgentAvailability?: boolean;
        hasQueueWaitTime?: boolean;
        hasTransferToOmniFlow?: boolean;
        hasPendingStatusChange?: boolean;
        hasSFDCPendingState?: boolean;
        hasAutoAcceptEnabled?: boolean;
    });
    debugEnabled: boolean;
    hasContactSearch: boolean;
    hasAgentAvailability: boolean;
    hasQueueWaitTime: boolean;
    hasTransferToOmniFlow: boolean;
    hasPendingStatusChange: boolean;
    hasSFDCPendingState: boolean;
    hasAutoAcceptEnabled: boolean;
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
    constructor({ hasMute, hasRecord, hasMerge, hasSwap, hasBlindTransfer, hasSignedRecordingUrl, supportsMos, hasSupervisorListenIn, hasSupervisorBargeIn, hasPhoneBook, hasGetExternalSpeakerDeviceSetting, hasSetExternalSpeakerDeviceSetting, hasGetExternalMicrophoneDeviceSetting, hasSetExternalMicrophoneDeviceSetting, canConsult, isDialPadDisabled, isHidSupported, isPhoneBookDisabled }: {
        hasMute?: boolean;
        hasRecord?: boolean;
        hasMerge?: boolean;
        hasSwap?: boolean;
        hasBlindTransfer?: boolean;
        hasSignedRecordingUrl?: boolean;
        supportsMos?: boolean;
        hasSupervisorListenIn?: boolean;
        hasSupervisorBargeIn?: boolean;
        hasPhoneBook?: boolean;
        hasGetExternalSpeakerDeviceSetting?: boolean;
        hasSetExternalSpeakerDeviceSetting?: boolean;
        hasGetExternalMicrophoneDeviceSetting?: boolean;
        hasSetExternalMicrophoneDeviceSetting?: boolean;
        canConsult?: boolean;
        isDialPadDisabled?: boolean;
        isHidSupported?: boolean;
        isPhoneBookDisabled?: boolean;
    });
    hasMute: boolean;
    hasRecord: boolean;
    hasMerge: boolean;
    hasSwap: boolean;
    hasBlindTransfer: boolean;
    hasSignedRecordingUrl: boolean;
    supportsMos: boolean;
    hasSupervisorListenIn: boolean;
    hasSupervisorBargeIn: boolean;
    hasPhoneBook: boolean;
    hasGetExternalSpeakerDeviceSetting: boolean;
    hasSetExternalSpeakerDeviceSetting: boolean;
    hasGetExternalMicrophoneDeviceSetting: boolean;
    hasSetExternalMicrophoneDeviceSetting: boolean;
    canConsult: boolean;
    isDialPadDisabled: boolean;
    isHidSupported: boolean;
    isPhoneBookDisabled: boolean;
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
    constructor({ phones, selectedPhone, speakerDeviceId, microphoneDeviceId }: {
        phones: Phone[];
        selectedPhone: Phone;
        speakerDeviceId: string;
        microphoneDeviceId: string;
    });
    phones: Phone[];
    selectedPhone: Phone;
    speakerDeviceId: string;
    microphoneDeviceId: string;
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
    constructor({ selectedPhone, speakerDeviceId, microphoneDeviceId, hidDeviceInfo }: {
        selectedPhone: Phone;
        speakerDeviceId: string;
        microphoneDeviceId: string;
        hidDeviceInfo: HidDevice;
    });
    selectedPhone: Phone;
    speakerDeviceId: string;
    microphoneDeviceId: string;
    hidDeviceInfo: HidDevice;
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
    constructor({ isRecordingPaused, contactId, initialContactId, instanceId, region }: {
        isRecordingPaused: boolean;
        contactId?: string;
        initialContactId?: string;
        instanceId?: string;
        region?: string;
    });
    isRecordingPaused: boolean;
    contactId: string;
    initialContactId: string;
    instanceId: string;
    region: string;
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
    constructor({ initialCallHasEnded, callInfo, callAttributes, phoneNumber, callId, contact }: {
        initialCallHasEnded: boolean;
        callInfo: CallInfo;
        callAttributes?: PhoneCallAttributes;
        phoneNumber: string;
        callId: string;
        contact: Contact;
    });
    initialCallHasEnded: boolean;
    callInfo: CallInfo;
    callAttributes: PhoneCallAttributes;
    phoneNumber: string;
    callId: string;
    contact: Contact;
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
    constructor({ contacts, contactTypes }: {
        contacts?: Contact[];
        contactTypes?: any[];
    });
    contacts: Contact[];
    contactTypes: any[];
}
/**
 * Class representing result type for getPhoneContacts()
 * NOTE: TO BE DEPRECATED, Use ContactsResult instead
 */
export class PhoneContactsResult extends ContactsResult {
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
    constructor({ call }: {
        call?: PhoneCall;
    });
    call: PhoneCall;
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
    constructor({ calls }: {
        calls: PhoneCall[] | PhoneCall;
    });
    calls: PhoneCall[];
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
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls, isCallMerged }: {
        isThirdPartyOnHold: boolean;
        isCustomerOnHold: boolean;
        calls?: PhoneCall[];
        isCallMerged: boolean;
    });
    calls: PhoneCall[];
    isThirdPartyOnHold: boolean;
    isCustomerOnHold: boolean;
    isCallMerged: boolean;
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
    constructor({ success, url, duration, callId }: {
        success: boolean;
        url?: string;
        duration?: number;
        callId?: string;
    });
    success: boolean;
    url: string;
    duration: number;
    callId: string;
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
    constructor({ showLogin, loginFrameHeight, isSilentLogin, showStorageAccess }: {
        showLogin?: boolean;
        loginFrameHeight?: number;
        isSilentLogin?: boolean;
        showStorageAccess?: boolean;
    });
    showLogin: boolean;
    loginFrameHeight: number;
    isSilentLogin: boolean;
    showStorageAccess: boolean;
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
    constructor({ isCallback, isConsultCall }?: boolean);
    isCallback: any;
    isConsultCall: any;
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
    constructor({ success }: {
        success: boolean;
    });
    success: boolean;
}
/**
 * Class representing result type for setAgentStatus()
 */
export class SetAgentStateResult extends GenericResult {
    /**
     * Create AgentState
     * @param {object} param
     */
    constructor({ success, isStatusSyncNeeded }: object);
    isStatusSyncNeeded: any;
}
/**
 * Class representing result type for setAgentConfig()
 */
export class SetAgentConfigResult extends GenericResult {
    /**
     * Create AgentConfig
     * @param {object} param
     */
    constructor({ success, isSystemEvent }: object);
    isSystemEvent: any;
    setIsSystemEvent(isSystemEvent: any): void;
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
    constructor({ success, loginFrameHeight }: {
        success: boolean;
        loginFrameHeight?: number;
    });
    success: boolean;
    loginFrameHeight: number;
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
    constructor({ callStateTimestamp, isOnHold, isMuted, isRecordingPaused, initialCallId, queueId, queueName, queueTimestamp, isSoftphoneCall, acceptEnabled, declineEnabled, muteEnabled, swapEnabled, conferenceEnabled, holdEnabled, recordEnabled, addCallerEnabled, extensionEnabled, isReplayable, isBargeable, isExternalTransfer, showMuteButton, showRecordButton, showAddCallerButton, showAddBlindTransferButton, showMergeButton, showSwapButton, removeParticipantVariant, additionalFields, isMultiParty, isHIDCall, endCallDisabled, renderContactId }: {
        isOnHold: boolean;
        isRecordingPaused: boolean;
        isMuted: boolean;
        initialCallId?: string;
        callStateTimestamp?: Date;
        queueName?: string;
        queueId?: string;
        queueTimestamp?: Date;
        isSoftphoneCall?: boolean;
        acceptEnabled?: boolean;
        declineEnabled?: boolean;
        muteEnabled?: boolean;
        swapEnabled?: boolean;
        conferenceEnabled?: boolean;
        holdEnabled?: boolean;
        recordEnabled?: boolean;
        addCallerEnabled?: boolean;
        extensionEnabled?: boolean;
        isReplayable?: boolean;
        isBargeable?: boolean;
        isExternalTransfer?: boolean;
        showMuteButton?: boolean;
        showRecordButton?: boolean;
        showAddCallerButton?: boolean;
        showAddBlindTransferButton?: boolean;
        showMergeButton?: boolean;
        showSwapButton?: boolean;
        removeParticipantVariant?: ("ALWAYS" | "NEVER" | "ALWAYS_EXCEPT_ON_HOLD");
        additionalFields?: string;
        isMultiParty?: boolean;
        isHIDCall?: boolean;
        endCallDisabled?: boolean;
        renderContactId?: string;
    });
    callStateTimestamp: Date;
    isRecordingPaused: boolean;
    isMuted: boolean;
    isOnHold: boolean;
    initialCallId: string;
    queueName: string;
    queueId: string;
    queueTimestamp: Date;
    isSoftphoneCall: boolean;
    acceptEnabled: boolean;
    declineEnabled: boolean;
    muteEnabled: boolean;
    swapEnabled: boolean;
    conferenceEnabled: boolean;
    holdEnabled: boolean;
    recordEnabled: boolean;
    addCallerEnabled: boolean;
    extensionEnabled: boolean;
    isReplayable: boolean;
    isBargeable: boolean;
    isExternalTransfer: boolean;
    removeParticipantVariant: "ALWAYS" | "NEVER" | "ALWAYS_EXCEPT_ON_HOLD";
    showMuteButton: boolean;
    showRecordButton: boolean;
    showAddCallerButton: boolean;
    showAddBlindTransferButton: boolean;
    showMergeButton: boolean;
    showSwapButton: boolean;
    additionalFields: string;
    isMultiParty: boolean;
    isHIDCall: boolean;
    endCallDisabled: boolean;
    renderContactId: string;
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
    constructor({ phoneNumber, id, type, name, listType, prefix, extension, endpointARN, queue, availability, recordId, description, queueWaitTime }: {
        id?: string;
        type?: ("PhoneBook" | "Queue" | "PhoneNumber" | "Agent");
        name?: string;
        listType?: ("Transfer" | "Conference" | "All");
        phoneNumber?: string;
        prefix?: string;
        extension?: string;
        endpointARN?: string;
        queue?: string;
        availability?: string;
        recordId?: string;
        description?: string;
        queueWaitTime?: string;
    });
    phoneNumber: string;
    id: string;
    type: "Agent" | "PhoneBook" | "Queue" | "PhoneNumber";
    name: string;
    listType: "Transfer" | "Conference" | "All";
    prefix: string;
    extension: string;
    endpointARN: string;
    queue: string;
    availability: string;
    queueWaitTime: string;
    recordId: string;
    description: string;
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
    constructor({ voiceCallId, participantType, dialerType, parentId, isOnHold, hasSupervisorBargedIn, isAutoMergeOn, isConsultCall }: {
        voiceCallId?: string;
        participantType?: string;
        dialerType?: string;
        parentId?: string;
        isOnHold?: boolean;
        hasSupervisorBargedIn?: boolean;
        isAutoMergeOn?: boolean;
        isConsultCall?: boolean;
    });
    voiceCallId: string;
    participantType: string;
    parentId: string;
    isOnHold: boolean;
    dialerType: string;
    hasSupervisorBargedIn: boolean;
    isAutoMergeOn: boolean;
    isConsultCall: boolean;
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
     * @param {Contact} [param.contact] - The Call Target / Contact . TODO: to be deprecated, replace with toContact
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {string} [param.agentStatus]
     * @param {string} [param.agentARN]
     * @param {Contact} [param.fromContact] - This is optional, and being populated when dialing/consulting a contact or adding a participant
     * @param {Contact} [param.toContact] - This is currently the same as param.contact (just rename)
     */
    constructor({ callId, callType, callSubtype, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus, agentARN, fromContact, toContact }: {
        callId?: string;
        callType?: string;
        callSubtype?: string;
        contact?: Contact;
        state?: string;
        callAttributes?: PhoneCallAttributes;
        phoneNumber?: string;
        callInfo?: CallInfo;
        reason?: string;
        closeCallOnError?: boolean;
        agentStatus?: string;
        agentARN?: string;
        fromContact?: Contact;
        toContact?: Contact;
    });
    callId: string;
    callType: string;
    callSubtype: string;
    phoneNumber: string;
    callInfo: CallInfo;
    contact: Contact;
    fromContact: Contact;
    toContact: Contact;
    reason: string;
    closeCallOnError: true;
    agentStatus: string;
    agentARN: string;
    state: string;
    callAttributes: PhoneCallAttributes;
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
    getActiveCalls(): Promise<ActiveCallsResult>;
    /**
     * Accept call
     * @param {PhoneCall} call - The call to be accepted
     * @returns {Promise<CallResult>}
     *
     */
    acceptCall(call: PhoneCall): Promise<CallResult>;
    /**
     * Decline call
     * @param {PhoneCall} call - The call to be declined
     * @returns {Promise<CallResult>}
     *
     */
    declineCall(call: PhoneCall): Promise<CallResult>;
    /**
     * End call
     * @param {PhoneCall} call - The call to be ended
     * @param {AGENT_STATUS} agentStatus
     * @returns {Promise<HangupResult>}
     *
     */
    endCall(call: PhoneCall, agentStatus: string): Promise<HangupResult>;
    /**
     * Mute call
     * @param {PhoneCall} call (an optional participant call to mute)
     * @returns {Promise<MuteToggleResult>}
     *
     */
    mute(call: PhoneCall): Promise<MuteToggleResult>;
    /**
     * Unmute call
     * @param {PhoneCall} call (an optional participant call to unmute)
     * @returns {Promise<MuteToggleResult>}
     *
     */
    unmute(call: PhoneCall): Promise<MuteToggleResult>;
    /**
     * Hold call
     * @param {PhoneCall} call - The call to be held
     * @returns {Promise<HoldToggleResult>}
     *
     */
    hold(call: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Resume call
     * @param {PhoneCall} call - The call to be resumed
     * @returns {Promise<HoldToggleResult>}
     *
     */
    resume(call: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Dial out Number
     * @param {Contact} contact
     * @param {DialOptions} dialOptions
     * @returns {Promise<CallResult>}
     *
     */
    dial(contact: Contact, dialOptions: DialOptions): Promise<CallResult>;
    /**
     * Send digits
     * @param {string} digits
     */
    sendDigits(digits: string): void;
    /**
     * Get phone contacts
     * @param {ContactsFilter} filterType
     * @returns {Promise<PhoneContactsResult>}
     */
    getPhoneContacts(filter: any): Promise<PhoneContactsResult>;
    /**
     * Swap calls
     * @param {PhoneCall} call1
     * @param {PhoneCall} call2
     * @returns {Promise<HoldToggleResult>}
     */
    swap(call1: PhoneCall, call2: PhoneCall): Promise<HoldToggleResult>;
    /**
     * Conference calls
     * @param {PhoneCall[]} calls
     * @returns {Promise<HoldToggleResult>}
     */
    conference(calls: PhoneCall[]): Promise<HoldToggleResult>;
    /**
     * Add participant to call
     * @param {Contact} contact: The transfer target
     * @param {PhoneCall} parentCall: The call to which a participant will be added
     * @param {Boolean} isBlindTransfer: True if blind transfering a call and hanging up upon transfer
     * @returns {Promise<ParticipantResult>}
     */
    addParticipant(contact: Contact, parentCall: PhoneCall, isBlindTransfer: boolean): Promise<ParticipantResult>;
    /**
     * Pause recording
     * @returns {Promise<RecordingToggleResult>}
     */
    pauseRecording(): Promise<RecordingToggleResult>;
    /**
     * Resume recording
     * @returns {Promise<RecordingToggleResult>}
     */
    resumeRecording(): Promise<RecordingToggleResult>;
    /**
     * Get agentConfig
     * @returns {Promise<AgentConfigResult>}
     */
    getAgentConfig(): Promise<AgentConfigResult>;
    /**
     * Set Agent Config
     * @param {AgentConfig} config
     * @returns {Promise<GenericResult>}
     */
    setAgentConfig(config: AgentConfig): Promise<GenericResult>;
    /**
     * Get voice capabilities
     * @returns {Promise<VoiceCapabilitiesResult>}
     */
    getVoiceCapabilities(): Promise<VoiceCapabilitiesResult>;
    /**
     * Wrap up call
     * @param {PhoneCall} call
     */
    wrapUpCall(call: PhoneCall): void;
    /**
    * Get the signed recording url
    * @param {String} recordingUrl
    * @param {String} vendorCallKey
    * @param {String} callId
    * @returns {Promise<SignedRecordingUrlResult>}
    */
    getSignedRecordingUrl(recordingUrl: string, vendorCallKey: string, callId: string): Promise<SignedRecordingUrlResult>;
    /**
     * Supervise a call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the call to be supervised
     * @returns {Promise <SuperviseCallResult>}
     */
    superviseCall(supervisedCallInfo: SupervisedCallInfo): Promise<SuperviseCallResult>;
    /**
     * Supervisor disconnects from a call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the supervised call to be disconnected
     * @returns {Promise <SupervisorHangupResult>}
     */
    supervisorDisconnect(supervisedCallInfo: SupervisedCallInfo): Promise<SupervisorHangupResult>;
    /**
     * Supervisor Barges into a ongoing call
     * @param {SupervisedCallInfo} supervisedCallInfo CallInfo of the supervised call which supervisor barges in
     * @returns {Promise <SuperviseCallResult>}
     */
    supervisorBargeIn(supervisedCallInfo: SupervisedCallInfo): Promise<SuperviseCallResult>;
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
    init(config: any): Promise<InitResult>;
    /**
     * Gets the telephonyConnector
     * @returns {Promise<TelephonyConnector>}
     *
     */
    getTelephonyConnector(): Promise<TelephonyConnector>;
    /**
     * Sends non-voice agent work events to vendor such as work accepted, declined, etc
     * @param {AgentWork} agentWork
     *
     */
    onAgentWorkEvent(agentWork: AgentWork): void;
    /**
     * Set agent status
     * @param {Constants.AGENT_STATUS} agentStatus
     * @param {StatusInfo} statusInfo
     * @param {Boolean} enqueueNextState - flag to determine if this status change request should be enqueued if neccessary
     * @returns {Promise<GenericResult>}
     *
     */
    setAgentStatus(agentStatus: Constants.AGENT_STATUS, statusInfo: StatusInfo, enqueueNextState: boolean): Promise<GenericResult>;
    /**
     * Get agent status
     * @returns {Promise<AgentStatusInfo>}
     *
     */
    getAgentStatus(): Promise<AgentStatusInfo>;
    /**
     * Logout from Omni
     * @returns {Promise<LogoutResult>}
     */
    logout(): Promise<LogoutResult>;
    /**
     * Handle message from LWC/Aura component
     * @param {object} message
     */
    handleMessage(message: object): void;
    /**
     * Triggers a browser download for Vendor Logs
     * @param {String[]} logs Array of log messages.
     */
    downloadLogs(logs: string[]): void;
    /**
     * Sends the logs with a logLevel and payload to the vendor connector.
     * Does a no-op, if not implemented.
     * @param {String} logLevel Log Level (INFO, WARN, ERROR)
     * @param {String} message Message to be logged
     * @param {Object} payload An optional payload to be logged
     */
    logMessageToVendor(logLevel: string, message: string, payload: any): void;
    /**
     * To get the Contacts for this workItem's transfer/other channel operation
     * @param {ContactsFilter} filter It has fields like the search term  and contact Type
     * @param {String} workItemId
     * @returns {Promise<PhoneContactsResult>}
     */
    getContacts(filter: ContactsFilter, workItemId: string): Promise<PhoneContactsResult>;
    /**
     * Returns a list of valid device IDs that can be used for the speaker and microphone devices.
     */
    getAudioDevices(): void;
    /**
     * Get shared capabilities
     * @returns {Promise<SharedCapabilitiesResult>}
     */
    getSharedCapabilities(): Promise<SharedCapabilitiesResult>;
}
export class Validator {
    static validateString(value: any): typeof Validator;
    static validateNumber(value: any): typeof Validator;
    static validateBoolean(value: any): typeof Validator;
    static validateEnum(value: any, enumValues: any): typeof Validator;
    static validateDate(value: any): typeof Validator;
    static validateClassObject(object: any, className: any): typeof Validator;
    static validateClassObjects(object: any, ...classNames: any[]): typeof Validator;
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
    constructor({ workItemId, workId, workEvent }: {
        workItemId?: string;
        workId?: string;
        workEvent?: string;
    });
    workEvent: string;
    workItemId: string;
    workId: string;
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
    constructor({ statusId, statusApiName, statusName }: {
        statusId?: string;
        statusApiName?: string;
        statusName?: string;
    });
    statusId: string;
    statusApiName: string;
    statusName: string;
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
    constructor({ statusId, statusType, statusName }: {
        statusId?: string;
        statusType?: string;
        statusName?: string;
    });
    statusId: string;
    statusType: string;
    statusName: string;
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
    constructor({ newVendorStateInfo, oldVendorStateInfo }: {
        newVendorStateInfo?: AgentVendorStatusInfo;
        oldVendorStateInfo?: AgentVendorStatusInfo;
    });
    newVendorStateInfo: AgentVendorStatusInfo;
    oldVendorStateInfo: AgentVendorStatusInfo;
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
    constructor({ callId, voiceCallId, callType, from, to, supervisorName, isBargedIn }: {
        callId?: string;
        voiceCallId?: string;
        callType?: string;
        from?: string;
        to?: string;
        supervisorName?: string;
        isBargedIn?: boolean;
    });
    callId: string;
    voiceCallId: string;
    callType: string;
    from: string;
    to: string;
    supervisorName: string;
    isBargedIn: boolean;
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
    constructor({ callId, stats, isAudioStatsCompleted }: {
        callId?: string;
        stats: AudioStatsElement[];
        isAudioStatsCompleted?: boolean;
    });
    callId: string;
    stats: AudioStatsElement[];
    isAudioStatsCompleted: true;
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
    constructor({ inputChannelStats, outputChannelStats }: {
        inputChannelStats?: StatsInfo;
        outputChannelStats?: StatsInfo;
    });
    inputChannelStats: StatsInfo;
    outputChannelStats: StatsInfo;
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
    constructor({ packetsCount, packetsLost, jitterBufferMillis, roundTripTimeMillis }: {
        packetsCount?: number;
        packetsLost?: number;
        jitterBufferMillis?: number;
        roundTripTimeMillis?: number;
    });
    statsCount: number;
    packetsCount: number;
    packetsLost: number;
    jitterBufferMillis: number;
    roundTripTimeMillis: number;
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
    constructor({ call }: {
        call: PhoneCall;
    });
    call: PhoneCall;
}
/**
 * Class representing result type for supervisorDisconnected()
 */
export class SupervisorHangupResult extends HangupResult {
}
/**
 * Class representing result type for STORAGE_ACCESS_RESULT
 * @param {object} param
 * @param {boolean} [param.success]
 * @param {boolean} [param.showLogin]
 * @param {number} [param.loginFrameHeight]
 */
export class ShowStorageAccessResult {
    constructor({ success, showLogin, loginFrameHeight }: {
        success?: boolean;
        showLogin?: boolean;
        loginFrameHeight?: number;
    });
    success: boolean;
    showLogin: boolean;
    loginFrameHeight: number;
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
    constructor(param: any);
    contains: any;
    limit: any;
    offset: any;
    types: any;
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
    constructor({ agentWorkId, workItemId }: {
        agentWorkId: string;
        workItemId: string;
    });
    agentWorkId: string;
    workItemId: string;
}

import constants from '../src/main/constants.js';
export namespace Constants {
    enum SHARED_EVENT_TYPE {
        LOGIN_RESULT = constants.SHARED_EVENT_TYPE.LOGIN_RESULT,
        LOGOUT_RESULT = constants.SHARED_EVENT_TYPE.LOGOUT_RESULT,
        MESSAGE = constants.SHARED_EVENT_TYPE.MESSAGE,
        SET_AGENT_STATUS = constants.SHARED_EVENT_TYPE.SET_AGENT_STATUS,
        GET_AGENT_STATUS = constants.SHARED_EVENT_TYPE.GET_AGENT_STATUS,
        STATE_CHANGE = constants.SHARED_EVENT_TYPE.STATE_CHANGE,
        STORAGE_ACCESS_RESULT = constants.SHARED_EVENT_TYPE.STORAGE_ACCESS_RESULT,
        GET_CONTACTS_RESULT = constants.SHARED_EVENT_TYPE.GET_CONTACTS_RESULT,
        ERROR = constants.SHARED_EVENT_TYPE.ERROR
    }
    enum VOICE_EVENT_TYPE {
        CALL_STARTED = constants.VOICE_EVENT_TYPE.CALL_STARTED,
        QUEUED_CALL_STARTED = constants.VOICE_EVENT_TYPE.QUEUED_CALL_STARTED,
        CALL_CONNECTED = constants.VOICE_EVENT_TYPE.CALL_CONNECTED,
        HANGUP = constants.VOICE_EVENT_TYPE.HANGUP,
        MUTE_TOGGLE = constants.VOICE_EVENT_TYPE.MUTE_TOGGLE,
        HOLD_TOGGLE = constants.VOICE_EVENT_TYPE.HOLD_TOGGLE,
        RECORDING_TOGGLE = constants.VOICE_EVENT_TYPE.RECORDING_TOGGLE,
        PARTICIPANTS_SWAPPED = constants.VOICE_EVENT_TYPE.PARTICIPANTS_SWAPPED,
        PARTICIPANTS_CONFERENCED = constants.VOICE_EVENT_TYPE.PARTICIPANTS_CONFERENCED,
        PARTICIPANT_ADDED = constants.VOICE_EVENT_TYPE.PARTICIPANT_ADDED,
        PARTICIPANT_CONNECTED = constants.VOICE_EVENT_TYPE.PARTICIPANT_CONNECTED,
        PARTICIPANT_REMOVED = constants.VOICE_EVENT_TYPE.PARTICIPANT_REMOVED,
        AFTER_CALL_WORK_STARTED = constants.VOICE_EVENT_TYPE.AFTER_CALL_WORK_STARTED,
        WRAP_UP_ENDED = constants.VOICE_EVENT_TYPE.WRAP_UP_ENDED,
        AGENT_ERROR = constants.VOICE_EVENT_TYPE.AGENT_ERROR,
        SOFTPHONE_ERROR = constants.VOICE_EVENT_TYPE.SOFTPHONE_ERROR,
        UPDATE_AUDIO_STATS = constants.VOICE_EVENT_TYPE.UPDATE_AUDIO_STATS,
        CALL_BARGED_IN = constants.VOICE_EVENT_TYPE.CALL_BARGED_IN,
        SUPERVISOR_BARGED_IN = constants.VOICE_EVENT_TYPE.SUPERVISOR_BARGED_IN,
        SUPERVISOR_CALL_STARTED = constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_STARTED,
        SUPERVISOR_CALL_CONNECTED = constants.VOICE_EVENT_TYPE.SUPERVISOR_CALL_CONNECTED,
        SUPERVISOR_HANGUP = constants.VOICE_EVENT_TYPE.SUPERVISOR_HANGUP,
        SHOW_TRANSFER_VIEW = constants.VOICE_EVENT_TYPE.SHOW_TRANSFER_VIEW,
        AUDIO_STATS = constants.VOICE_EVENT_TYPE.AUDIO_STATS,
        CALL_UPDATED = constants.VOICE_EVENT_TYPE.CALL_UPDATED
    }
    type EVENT_TYPE = SHARED_EVENT_TYPE | VOICE_EVENT_TYPE;
    enum SHARED_ERROR_TYPE {
        GENERIC_ERROR = constants.SHARED_ERROR_TYPE.GENERIC_ERROR,
        INVALID_AGENT_STATUS = constants.SHARED_ERROR_TYPE.INVALID_AGENT_STATUS,
    }
    enum VOICE_ERROR_TYPE{
        INVALID_PARTICIPANT = constants.VOICE_ERROR_TYPE.INVALID_PARTICIPANT,
        INVALID_DESTINATION = constants.VOICE_ERROR_TYPE.INVALID_DESTINATION,
        INVALID_PARAMS = constants.VOICE_ERROR_TYPE.INVALID_PARAMS,
        CAN_NOT_UPDATE_PHONE_NUMBER = constants.VOICE_ERROR_TYPE.CAN_NOT_UPDATE_PHONE_NUMBER,
    }
    type ERROR_TYPE = SHARED_ERROR_TYPE | VOICE_ERROR_TYPE
    enum AGENT_STATUS {
        ONLINE = constants.AGENT_STATUS.ONLINE,
        OFFLINE = constants.AGENT_STATUS.OFFLINE,
        ACW = constants.AGENT_STATUS.ACW,
    }
    enum PARTICIPANT_TYPE {
        AGENT = constants.PARTICIPANT_TYPE.AGENT,
        INITIAL_CALLER = constants.PARTICIPANT_TYPE.INITIAL_CALLER,
        THIRD_PARTY = constants.PARTICIPANT_TYPE.THIRD_PARTY,
        SUPERVISOR = constants.PARTICIPANT_TYPE.SUPERVISOR,
    }
    enum CALL_TYPE {
        INBOUND = constants.CALL_TYPE.INBOUND,
        OUTBOUND = constants.CALL_TYPE.OUTBOUND,
        CALLBACK = constants.CALL_TYPE.CALLBACK,
        ADD_PARTICIPANT = constants.CALL_TYPE.ADD_PARTICIPANT,
        TRANSFER = constants.CALL_TYPE.TRANSFER,
        INTERNAL_CALL = constants.CALL_TYPE.INTERNAL_CALL,
        DIALED_CALLBACK = constants.CALL_TYPE.DIALED_CALLBACK,
        CONSULT = constants.CALL_TYPE.CONSULT
    }
    enum CALL_SUBTYPE {
        PSTN = constants.CALL_SUBTYPE.PSTN,
        WEB_RTC = constants.CALL_SUBTYPE.WEB_RTC,
    }
    enum DIALER_TYPE {
        OUTBOUND_PREVIEW = constants.DIALER_TYPE.OUTBOUND_PREVIEW,
        NONE = constants.DIALER_TYPE.NONE,
    }
    enum CONTACT_TYPE {
        PHONEBOOK = constants.CONTACT_TYPE.PHONEBOOK,
        QUEUE = constants.CONTACT_TYPE.QUEUE,
        PHONENUMBER = constants.CONTACT_TYPE.PHONENUMBER,
        AGENT = constants.CONTACT_TYPE.AGENT,
        FLOW = constants.CONTACT_TYPE.FLOW,
    }
    enum CALL_STATE {
        RINGING = constants.CALL_STATE.RINGING,
        CONNECTED = constants.CALL_STATE.CONNECTED,
        TRANSFERRING = constants.CALL_STATE.TRANSFERRING,
        TRANSFERRED = constants.CALL_STATE.TRANSFERRED,
        ENDED = constants.CALL_STATE.ENDED,
    }
    enum HANGUP_REASON {
        PHONE_CALL_ERROR = constants.HANGUP_REASON.PHONE_CALL_ERROR,
        PHONE_CALL_ENDED = constants.HANGUP_REASON.PHONE_CALL_ENDED,
    }
    enum PHONE_TYPE {
        DESK_PHONE = constants.PHONE_TYPE.DESK_PHONE,
        SOFT_PHONE = constants.PHONE_TYPE.SOFT_PHONE,
    }
    enum AGENT_AVAILABILITY {
        AVAILABLE = constants.AGENT_AVAILABILITY.AVAILABLE,
        BUSY = constants.AGENT_AVAILABILITY.BUSY,
        OFFLINE = constants.AGENT_AVAILABILITY.OFFLINE,
    }
    enum REMOVE_PARTICIPANT_VARIANT {
        ALWAYS = constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS,
        NEVER = constants.REMOVE_PARTICIPANT_VARIANT.NEVER,
        ALWAYS_EXCEPT_ON_HOLD = constants.REMOVE_PARTICIPANT_VARIANT.ALWAYS_EXCEPT_ON_HOLD,
    }
    enum LOG_LEVEL {
        ERROR = constants.LOG_LEVEL.ERROR,
        INFO = constants.LOG_LEVEL.INFO,
    }
    enum CONTACTS_FILTER_TYPES {
        AGENT = constants.CONTACTS_FILTER_TYPES.AGENT,
        QUEUE = constants.CONTACTS_FILTER_TYPES.QUEUE,
        CONTACT = constants.CONTACTS_FILTER_TYPES.CONTACT,
        DIRECTORY = constants.CONTACTS_FILTER_TYPES.DIRECTORY,
        FLOW = constants.CONTACTS_FILTER_TYPES.FLOW,
        AVAILABLE = constants.CONTACTS_FILTER_TYPES.AVAILABLE,
    }
    enum WORK_EVENT {
        ASSIGNED = constants.WORK_EVENT.ASSIGNED,
        ACCEPTED = constants.WORK_EVENT.ACCEPTED,
        DECLINED = constants.WORK_EVENT.DECLINED,
        COMPLETED = constants.WORK_EVENT.COMPLETED,
        CLOSED = constants.WORK_EVENT.CLOSED,
        PAUSED = constants.WORK_EVENT.PAUSED,
        UNPAUSED = constants.WORK_EVENT.UNPAUSED,
    }
    enum HANGUP_STATUS {
        MISSED_AGENT = constants.HANGUP_STATUS.MISSED_AGENT,
        DECLINED = constants.HANGUP_STATUS.DECLINED,
        FAILED_CONNECT_AGENT = constants.HANGUP_STATUS.FAILED_CONNECT_AGENT,
        FAILED_CONNECT_CUSTOMER = constants.HANGUP_STATUS.FAILED_CONNECT_CUSTOMER,
        CALLBACK_MISSED_OR_REJECTED = constants.AGENT_STATUS.CALLBACK_MISSED_OR_REJECTED,
    }
}

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
    message: string;
}
/**
 * Class representing a Phone type
 */
export class Phone {
    /**
     * Create Phone
     * @param {object} param
     * @param {Constants.PHONE_TYPE} param.type
     * @param {string} [param.number]
     */
    constructor({ type, number }: {
        type: Constants.PHONE_TYPE;
        number?: string;
    });
    type: Constants.PHONE_TYPE;
    number: string;
}
/**
 * Class representing an AudioDevice type
 */
export class AudioDevice {
    /**
     * Create AudioDevice
     */
    constructor({ deviceId, kind, label, groupId }: {
        deviceId: string;
        kind: string;
        label?: string;
        groupId?: string;
    });
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
}

/**
 * Class representing a HID Device
 */
export class HidDevice {
    /**
     * Create a HID Device object
     * @param productId
     * @param vendorId
     */
    constructor({productId, vendorId}: {
        productId: number,
        vendorId: number
    });
    productId: number;
    vendorId: number;
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
     * @param {AudioDevice[]} [param.audioDevices]
     */
    constructor({ audioDevices }: {
        audioDevices?: AudioDevice[];
    });
    audioDevices: AudioDevice[];
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
        phones?: Phone[];
        selectedPhone?: Phone;
        speakerDeviceId?: string;
        microphoneDeviceId?: string;
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
     * @param {string} [param.speakerDeviceId]
     * @param {string} [param.microphoneDeviceId]
     * @param {HidDevice} [param.hidDeviceInfo]
     */
    constructor({ selectedPhone, speakerDeviceId, microphoneDeviceId, hidDeviceInfo }: {
        selectedPhone?: Phone;
        speakerDeviceId?: string;
        microphoneDeviceId?: string;
        hidDeviceInfo?: HidDevice;
    });
    selectedPhone: Phone;
    speakerDeviceId: string;
    microphoneDeviceId: string;
    hidDeviceInfo: HidDevice;
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
        debugEnabled,
        hasContactSearch,
        hasAgentAvailability,
        hasQueueWaitTime,
        hasTransferToOmniFlow,
        hasPendingStatusChange,
        hasSFDCPendingState,
        hasAutoAcceptEnabled
    }: {
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
     * @param {boolean} [param.hasContactSearch] True if getPhoneContacts uses the 'contain' filter
     * @param {boolean} [param.hasAgentAvailability] True if getPhoneContacts also provides agent availability
     * @param {boolean} [param.supportsMos] True if vendor support MOS
     * @param {boolean} [param.hasSupervisorListenIn] True if vendor supports supervisor listening  to a ongoing call
     * @param {boolean} [param.hasSupervisorBargeIn] True if vendor supports Supervisor  barging into a ongoing call
     * @param {String} [param.signedRecordingUrl]
     * @param {boolean} [param.hasPendingStatusChange] True if vendor supports Pending Status Change
     * @param {boolean} [param.hasSFDCPendingState] True if amazon connect has sfdc_pending state
     * @param {boolean} [param.hasAutoAcceptEnabled] True if agent has enabled auto accept
     * @param {boolean} [param.isDialPadDisabled] True if dial pad is disabled
     * @param {boolean} [param.isHidSupported] True if hid or headset controllers are supported by vendor
     * @param {boolean} [param.isPhoneBookDisabled] True if phone book is disabled
     */
    constructor({
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
        isHidSupported,
        isPhoneBookDisabled
    }: {
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
     * @param {string} param.phoneNumber
     * @param {string} param.callId
     * @param {Contact} param.contact
     */
    constructor({ contact, initialCallHasEnded, callInfo, phoneNumber, callId }: {
        contact?: Contact;
        initialCallHasEnded: boolean;
        callInfo: CallInfo;
        phoneNumber: string;
        callId: string;
    });
    contact: Contact;
    initialCallHasEnded: boolean;
    callInfo: CallInfo;
    phoneNumber: string;
    callId: string;
}
/**
 * Class representing result type for getContacts()
 */
export class ContactsResult {
    /**
     * Create ContactsResult
     * @param {object} param
     * @param {Contact[]} [param.contacts]
     * @param {Constants.CONTACT_TYPE[]} [param.contactTypes]
     */
    constructor({ contacts, contactTypes }: {
        contacts?: Contact[];
        contactTypes?: string[];
    });
    contacts: Contact[];
    contactTypes: Constants.CONTACT_TYPE[];
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
     */
    constructor({ isThirdPartyOnHold, isCustomerOnHold, calls }: {
        isThirdPartyOnHold: boolean;
        isCustomerOnHold: boolean;
        calls?: PhoneCall[];
    });
    calls: PhoneCall[];
    isThirdPartyOnHold: boolean;
    isCustomerOnHold: boolean;
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
     */
    constructor({ isCallback }: {
        isCallback: boolean;
    });
    isCallback: boolean;
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
 * Class representing setAgentConfig result type
 */
export class SetAgentConfigResult {
    /**
     * Create SetAgentConfigResult
     * @param {object} param
     * @param {boolean} param.success
     * @param {boolean} param.isSystemEvent
     */
    constructor({ success, isSystemEvent }: {
        success: boolean;
        isSystemEvent: boolean;
    });
    success: boolean;
    isSystemEvent: boolean;
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
     * @param {Constants.REMOVE_PARTICIPANT_VARIANT} [param.removeParticipantVariant] - The type of remove participant variant when in a transfer call.
     * @param {String} [param.additionalFields] - Represents additional standard and custom fields in the voice call record, where each key-value pair value corresponds to a standard or custom field and its values.
     * @param {boolean} [param.isMultiParty]
     * @param {boolean} [param.endCallDisabled]
     * @param {string} [params.renderContactId]
     */

    constructor({ callStateTimestamp, isOnHold, isMuted, isRecordingPaused, initialCallId, isSoftphoneCall, acceptEnabled, declineEnabled, muteEnabled, swapEnabled, conferenceEnabled, holdEnabled, recordEnabled, addCallerEnabled, extensionEnabled, isReplayable, isBargeable, isExternalTransfer, removeParticipantVariant, queueName, queueId, queueTimestamp, showMuteButton, showRecordButton, showAddCallerButton, showAddBlindTransferButton, showMergeButton, showSwapButton, additionalFields, isMultiParty, isHIDCall, endCallDisabled, renderContactId }: {
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
        removeParticipantVariant?: Constants.REMOVE_PARTICIPANT_VARIANT;
        additionalFields?: string;
        isMultiParty?: boolean;
        isHIDCall?: boolean;
        endCallDisabled?: boolean;
        renderContactId?: string;
    });
        isOnHold: boolean;
        isRecordingPaused: boolean;
        isMuted: boolean;
        initialCallId: string;
        callStateTimestamp: Date;
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
        showMuteButton: boolean;
        showRecordButton: boolean;
        showAddCallerButton: boolean;
        showAddBlindTransferButton: boolean;
        showMergeButton: boolean;
        showSwapButton: boolean;
        removeParticipantVariant: Constants.REMOVE_PARTICIPANT_VARIANT;
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
     * @param {Constants.CONTACT_TYPE} [param.type] - The type of the contact, one of the CONTACT_TYPE values
     * @param {string} [param.name] - The label for this contact to be displayed in the UI
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
    constructor({ phoneNumber, id, type, name, prefix, extension, endpointARN, queue, availability, recordId, description, queueWaitTime }: {
        id?: string;
        type?: Constants.CONTACT_TYPE;
        name?: string;
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
    type: Constants.CONTACT_TYPE;
    name: string;
    prefix: string;
    extension: string;
    endpointARN: string;
    queue: string;
    availability: string;
    recordId: string;
    description: string;
    queueWaitTime: string;
}
/**
* Class representing PhoneCallAttributes
*/
export class PhoneCallAttributes {
    /**
     * Create PhoneCallAttributes.
     * @param {object} param
     * @param {string} [param.voiceCallId] - The voice call id
     * @param {Constants.PARTICIPANT_TYPE} [param.participantType] - The participant type of the call
     * @param {Constants.DIALER_TYPE} [param.dialerType] - The dialer type of the call
     * @param {string} [param.parentId] - The parent call id of the call
     * @param {boolean} [param.isOnHold]
     * @param {boolean} [param.hasSupervisorBargedIn]
     * @param {boolean} [param.isAutoMergeOn]
     * @param {boolean} [param.isConsultCall]
     */
    constructor({ voiceCallId, participantType, dialerType, parentId, isOnHold, hasSupervisorBargedIn, isAutoMergeOn, isConsultCall }: {
        voiceCallId?: string;
        participantType?: Constants.PARTICIPANT_TYPE;
        dialerType?: Constants.DIALER_TYPE;
        parentId?: string;
        isOnHold?: boolean;
        hasSupervisorBargedIn?: boolean;
        isAutoMergeOn?: boolean;
        isConsultCall?: boolean;
    });
    voiceCallId: string;
    participantType: Constants.PARTICIPANT_TYPE;
    dialerType: Constants.DIALER_TYPE;
    parentId: string;
    isOnHold: boolean;
    hasSupervisorBargedIn: boolean;
    isAutoMergeOn: boolean;
    isConsultCall? boolean;
}
/**
* Class representing a PhoneCall.
*/
export class PhoneCall {
    /**
     * Create a PhoneCall.
     * @param {object} param
     * @param {string} [param.callId] - The unique callId. This is a required parameter
     * @param {Constants.CALL_TYPE} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {Contact} [param.contact] - The Call Target / Contact
     * @param {string} [param.state] - The state of the call, i.e. ringing, connected, declined, failed
     * @param {PhoneCallAttributes} [param.callAttributes] - Any additional call attributes
     * @param {string} [param.phoneNumber] - The phone number associated with this call (usually external number)
     * @param {CallInfo} [param.callInfo]
     * @param {string} [param.reason]
     * @param {boolean} [param.closeCallOnError]
     * @param {Constants.AGENT_STATUS | Constants.HANGUP_STATUS} [param.agentStatus]
     * @param {string} [param.agentARN]
     */
    constructor({ callId, callType, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus, agentARN }: {
        callId?: string;
        callType?: Constants.CALL_TYPE;
        contact?: Contact;
        state?: Constants.CALL_STATE;
        callAttributes?: PhoneCallAttributes;
        phoneNumber?: string;
        callInfo?: CallInfo;
        reason?: Constants.HANGUP_REASON;
        closeCallOnError?: boolean;
        agentStatus?: Constants.AGENT_STATUS | Constants.HANGUP_STATUS;
        agentARN?: string;
    });
    callId: string;
    callType: Constants.CALL_TYPE;
    phoneNumber: string;
    callInfo: CallInfo;
    contact: Contact;
    reason: Constants.HANGUP_REASON;
    closeCallOnError: true;
    agentStatus: Constants.AGENT_STATUS | Constants.HANGUP_STATUS;
    state: Constants.CALL_STATE;
    callAttributes: PhoneCallAttributes;
    agentARN: string;
}

/** 
* Class representing a vendor connector
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
     * @param {boolean} enqueueNextState
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
     * * @param {String[]} logs Array of log messages
     */
    downloadLogs(logs): void;
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
     * Get shared capabilities
     * @returns {Promise<SharedCapabilitiesResult>}
     */
    getSharedCapabilities(): Promise<SharedCapabilitiesResult>;
}
/**
* Class representing a telephony connector
*/
export class TelephonyConnector {
    /**
     * Get the currently active calls
     * @returns {Promise<ActiveCallsResult>}
     *
     */
    getActiveCalls(): Promise<ActiveCallsResult>;
    /**
     * Get the currently valid devices that can be used to set the speaker and microphone.
     * @returns {Promise<AudioDevicesResult>}
     *
     */
    getAudioDevices(): Promise<AudioDevicesResult>;
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
     * @param {Constants.AGENT_STATUS} agentStatus
     * @returns {Promise<HangupResult>}
     *
     */
    endCall(call: PhoneCall, agentStatus: Constants.AGENT_STATUS): Promise<HangupResult>;
    /**
     * Mute call
     * @returns {Promise<MuteToggleResult>}
     *
     */
    mute(): Promise<MuteToggleResult>;
    /**
     * Unmute call
     * @returns {Promise<MuteToggleResult>}
     *
     */
    unmute(): Promise<MuteToggleResult>;
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
     * @returns {Promise<CallResult>}
     *
     */
    dial(contact: Contact): Promise<CallResult>;
    /**
     * Send digits
     * @param {string} digits
     */
    sendDigits(digits: string): void;
    /**
     * Get phone contacts
     * @param {ContactsFilter} filter
     * @returns {Promise<PhoneContactsResult>}
     */
    getPhoneContacts(filter: ContactsFilter): Promise<PhoneContactsResult>;
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
     * @param {Contact} contact
     * @param {PhoneCall} call
     * @param {Boolean} isBlindTransfer: True if blind transfering a call and hanging up upon transfer
     * @returns {Promise<ParticipantResult>}
     */
    addParticipant(contact: Contact, call: PhoneCall, isBlindTransfer: boolean): Promise<ParticipantResult>;
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
     */
    superviseCall(supervisedCallInfo: SupervisedCallInfo): Promise<SuperviseCallResult>;
    /**
     * Supervisor disconnects from a call
     * @param {SupervisedCallInfo} call CallInfo of the supervised call to be disconnected
     */
    supervisorDisconnect(supervisedCallInfo: SupervisedCallInfo): Promise<SupervisorHangupResult>;
    /**
     * Supervisor Barges into a ongoing call
     * @param {SupervisedCallInfo} call CallInfo of the supervised call which supervisor barges in
     */
    supervisorBargeIn(supervisedCallInfo: SupervisedCallInfo): Promise<SuperviseCallResult>;
}
export class Validator {
    static validateString(value: any): typeof Validator;
    static validateNumber(value: any): typeof Validator;
    static validateBoolean(value: any): typeof Validator;
    static validateEnum(value: any, enumValues: any): typeof Validator;
    static validateDate(value: any): typeof Validator;
    static validateClassObject(object: any, className: any): typeof Validator;
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
     * @param {Constants.WORK_EVENT} [param.workEvent] - The work lifecycle event
     */
    constructor({ workItemId, workId, workEvent }: {
        workItemId: string;
        workId: string;
        workEvent: Constants.WORK_EVENT;
    });
    workItemId: string;
    workId: string;
    workEvent: Constants.WORK_EVENT;
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
     * @param {Constants.AGENT_STATUS} [param.statusType] - The agent's current availability state type
     * @param {string} [param.statusName] - The name of the agent's current availability state
     */
    constructor({ statusId, statusType, statusName }: {
        statusId?: string;
        statusType?: Constants.AGENT_STATUS;
        statusName?: string;
    });
    statusId: string;
    statusType: Constants.AGENT_STATUS;
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
     * @param {Constants.CALL_TYPE} [param.callType] - The type of the call, one of the CALL_TYPE values
     * @param {string} [param.from] - From phone number (for Inbound calls)
     * @param {string} [param.to] - To phone number (for Outbound calls)
     * @param {string} [param.supervisorName] - The supervisor name (shown to the supervised agent on barge in)
     * @param {boolean} [param.isBargedIn] - True if the Supervisor has barged in, False if the supervisor is listening in.
     */
    constructor({ callId, voiceCallId, callType, from, to, supervisorName, isBargedIn }: {
        callId?: string;
        voiceCallId?: string;
        callType?: Constants.CALL_TYPE;
        from?: string;
        to?: string;
        supervisorName?: string;
        isBargedIn?: boolean;
    });
    callId: string;
    voiceCallId: string;
    callType: Constants.CALL_TYPE;
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
    constructor({success, showLogin, loginFrameHeight}: {
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
 * @param {Constants.CONTACTS_FILTER_TYPES[]} param.types 
 */ 
export class ContactsFilter {
    constructor({contains, limit, offset, types}: {
        contains?: string;
        limit?: number;
        offset?: number;
        types?: Constants.CONTACTS_FILTER_TYPES[];
    }); 
    contains: string;
    limit: number;
    offset: number;
    types: Constants.CONTACTS_FILTER_TYPES[];
}

export class PhoneContactsResult extends ContactsResult {}

/**
 * Class used as a parameter to AFTER_CONVERSATION_WORK_STARTED and AFTER_CONVERSATION_WORK_ENDED
 */
export class ACWInfo {
    constructor({agentWorkId, workItemId}:{
        agentWorkId?: string;
        workItemId?: string;
    });
    agentWorkId: string;
    workItemId: string;
}
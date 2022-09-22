export namespace Constants {
    namespace EVENT_TYPE {
        const LOGIN_RESULT: string;
        const LOGOUT_RESULT: string;
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
        const MESSAGE: string;
        const AFTER_CALL_WORK_STARTED: string;
        const WRAP_UP_ENDED: string;
        const AGENT_ERROR: string;
        const SOFTPHONE_ERROR: string;
        const UPDATE_AUDIO_STATS: string;
        const SUPERVISOR_BARGED_IN: string;
        const SUPERVISOR_CALL_STARTED: string;
        const SUPERVISOR_CALL_CONNECTED: string;
        const SUPERVISOR_HANGUP: string;
        const SET_AGENT_STATUS: string;
        const GET_AGENT_STATUS: string;
        const STATE_CHANGE: string;
    }
    namespace ERROR_TYPE {
        const GENERIC_ERROR: string;
        const INVALID_PARTICIPANT: string;
        const INVALID_DESTINATION: string;
        const INVALID_PARAMS: string;
        const INVALID_AGENT_STATUS: string;
        const CAN_NOT_UPDATE_PHONE_NUMBER: string;
    }
    const AGENT_STATUS: {
        ONLINE: string;
        OFFLINE: string;
        ACW: string;
        CALLBACK_MISSED_OR_REJECTED: string;
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
        BUSY: string; /**
         * Create AgentConfigResult
         * @param {object} param
         * @param {Phone[]} [param.phones]
         * @param {Phone} [param.selectedPhone]
         */
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
 * Class representing result type for mute() & unmute()
 */
export class MuteToggleResult {
    /**
     * Create ActiveCallsResult
     * @param {object} param
     * @param {boolean} param.isMuted
     */
    constructor({ isMuted }: {
        isMuted: boolean;
    });
    isMuted: boolean;
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
    constructor({ hasMute, hasRecord, hasMerge, hasSwap, hasSignedRecordingUrl, debugEnabled, hasContactSearch, hasAgentAvailability, supportsMos, hasSupervisorListenIn, hasSupervisorBargeIn, hasBlindTransfer, hasTransferToOmniFlow, hasPendingStatusChange }: {
        hasMute?: boolean;
        hasRecord?: boolean;
        hasMerge?: boolean;
        hasSwap?: boolean;
        hasSignedRecordingUrl?: boolean;
        debugEnabled?: boolean;
        hasContactSearch?: boolean;
        hasAgentAvailability?: boolean;
        supportsMos?: boolean;
        hasSupervisorListenIn?: boolean;
        hasSupervisorBargeIn?: boolean;
        hasBlindTransfer?: boolean;
        hasBlindTransfer?: boolean;
        hasPendingStatusChange?: boolean;
    });
    hasMute: boolean;
    hasRecord: boolean;
    hasMerge: boolean;
    hasSwap: boolean;
    hasSignedRecordingUrl: boolean;
    debugEnabled: boolean;
    hasContactSearch: boolean;
    hasAgentAvailability: boolean;
    supportsMos: boolean;
    hasSupervisorListenIn: boolean;
    hasSupervisorBargeIn: boolean;
    hasBlindTransfer: boolean;
    hasTransferToOmniFlow: any;
    hasPendingStatusChange: boolean;
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
    constructor({ phones, selectedPhone }: {
        phones?: Phone[];
        selectedPhone?: Phone;
    });
    phones: Phone[];
    selectedPhone: Phone;
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
    constructor({ selectedPhone }: {
        selectedPhone?: Phone;
    });
    selectedPhone: Phone;
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
     */
    constructor({ initialCallHasEnded, callInfo, phoneNumber, callId }: {
        initialCallHasEnded: boolean;
        callInfo: CallInfo;
        phoneNumber: string;
        callId: string;
    });
    initialCallHasEnded: boolean;
    callInfo: CallInfo;
    phoneNumber: string;
    callId: string;
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
    constructor({ contacts, contactTypes }: {
        contacts?: Contact[];
        contactTypes?: any[];
    });
    contacts: Contact[];
    contactTypes: any[];
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
     */
    constructor({ showLogin, loginFrameHeight }: {
        showLogin?: boolean;
        loginFrameHeight?: number;
    });
    showLogin: boolean;
    loginFrameHeight: number;
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
    constructor({ callStateTimestamp, isOnHold, isMuted, isRecordingPaused, initialCallId, isSoftphoneCall, acceptEnabled, declineEnabled, muteEnabled, swapEnabled, conferenceEnabled, holdEnabled, recordEnabled, addCallerEnabled, extensionEnabled, isReplayable, isBargeable, isExternalTransfer, removeParticipantVariant }: {
        isOnHold: boolean;
        isRecordingPaused: boolean;
        isMuted: boolean;
        initialCallId?: string;
        callStateTimestamp?: Date;
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
        removeParticipantVariant?: ("ALWAYS" | "NEVER" | "ALWAYS_EXCEPT_ON_HOLD");
    });
    callStateTimestamp: Date;
    isRecordingPaused: boolean;
    isMuted: boolean;
    isOnHold: boolean;
    initialCallId: string;
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
    constructor({ phoneNumber, id, type, name, prefix, extension, endpointARN, queue, availability, recordId, description }: {
        id?: string;
        type?: ("PhoneBook" | "Queue" | "PhoneNumber" | "Agent");
        name?: string;
        phoneNumber?: string;
        prefix?: string;
        extension?: string;
        endpointARN?: string;
        queue?: string;
        availability?: string;
        recordId?: string;
        description?: string;
    });
    phoneNumber: string;
    id: string;
    type: "Agent" | "PhoneBook" | "Queue" | "PhoneNumber";
    name: string;
    prefix: string;
    extension: string;
    endpointARN: string;
    queue: string;
    availability: string;
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
     */
    constructor({ voiceCallId, participantType, dialerType, parentId, isOnHold, hasSupervisorBargedIn }: {
        voiceCallId?: string;
        participantType?: string;
        dialerType?: string;
        parentId?: string;
        isOnHold?: boolean;
        hasSupervisorBargedIn?: boolean;
    });
    voiceCallId: string;
    participantType: string;
    parentId: string;
    isOnHold: boolean;
    dialerType: string;
    hasSupervisorBargedIn: boolean;
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
    constructor({ callId, callType, contact, state, callAttributes, phoneNumber, callInfo, reason, closeCallOnError, agentStatus }: {
        callId?: string;
        callType?: string;
        contact?: Contact;
        state?: string;
        callAttributes?: PhoneCallAttributes;
        phoneNumber?: string;
        callInfo?: CallInfo;
        reason?: string;
        closeCallOnError?: boolean;
        agentStatus?: string;
    });
    callId: string;
    callType: string;
    phoneNumber: string;
    callInfo: CallInfo;
    contact: Contact;
    reason: string;
    closeCallOnError: true;
    agentStatus: string;
    state: string;
    callAttributes: PhoneCallAttributes;
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
     * Set agent status
     * @param {string} agentStatus
     * @param {StatusInfo} statusInfo
     * @param {Boolean} enqueueNextState - flag to determine if this status change request should be enqueued if neccessary
     * @returns {Promise<GenericResult>}
     *
     */
    setAgentStatus(agentStatus: string, statusInfo: StatusInfo, enqueueNextState: boolean): Promise<GenericResult>;
    /**
     * Get agent status
     * @returns {Promise<AgentStatusInfo>}
     *
     */
    getAgentStatus(): Promise<AgentStatusInfo>;
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
     * @returns {Promise<PhoneContactsResult>}
     */
    getPhoneContacts(): Promise<PhoneContactsResult>;
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
     * @returns {Promise<ParticipantResult>}
     */
    addParticipant(contact: Contact, call: PhoneCall, isBlindTransfer: any): Promise<ParticipantResult>;
    /**
     * Pause recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>}
     */
    pauseRecording(call: PhoneCall): Promise<RecordingToggleResult>;
    /**
     * Resume recording
     * @param {PhoneCall} call
     * @returns {Promise<RecordingToggleResult>}
     */
    resumeRecording(call: PhoneCall): Promise<RecordingToggleResult>;
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
     * Get Capabilities
     * @returns {Promise<CapabilitiesResult>}
     */
    getCapabilities(): Promise<CapabilitiesResult>;
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
     * Supervise a call
     * @param {SupervisedCallInfo} call Call to be supervised
     */
    superviseCall(supervisedCallInfo: SupervisedCallInfo): void;
    /**
     * Supervisor disconnects from a call
     * @param {PhoneCall} call Call to be disconnected
     */
    supervisorDisconnect(call: PhoneCall): void;
    /**
     * Supervisor Barges into a ongoing call
     * @param {PhoneCall} call Call which supervisor barges in
     */
    supervisorBargeIn(call: PhoneCall): void;
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

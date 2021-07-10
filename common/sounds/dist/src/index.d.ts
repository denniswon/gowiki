export declare type Sound = 'user_receives_call' | 'user_accepts_call' | 'initiate_call_click' | 'user_connect' | 'teammate_accepts' | 'teammate_joins_1' | 'teammate_joins_2' | 'user_unmute' | 'user_mute' | 'start_video' | 'stop_video' | 'start_screenshare' | 'stop_screenshare' | 'jump_context' | 'teamamte_leaves' | 'user_leave' | 'user_disconnects' | 'teammate_disconnects' | 'poor_quality_detected' | 'good' | 'not_good' | 'other_join_room' | 'receive_chat' | 'clap' | 'media_toggle' | 'join_room';
declare class SoundService {
    sounds: {
        [src: string]: HTMLAudioElement;
    };
    disabled: boolean;
    getSound: (sound: Sound) => "user_accepts_call" | "initiate_call_click" | "user_connect" | "teammate_accepts" | "teammate_joins_1" | "teammate_joins_2" | "user_unmute" | "jump_context" | "teamamte_leaves" | "user_leave" | "user_disconnects" | "teammate_disconnects" | "poor_quality_detected" | "good" | "not_good" | "receive_chat" | "clap" | "media_toggle" | "join_room";
    play: (filename: Sound, volume?: number) => void;
    playSound: (filename: Sound) => void;
    setSoundsDisabled: (setting: boolean) => void;
    playUserReceivesCall: () => void;
    playUserAcceptsCall: () => void;
    playInitateCallClick: () => void;
    playUserConnects: () => void;
    playTeammateAccepts: () => void;
    playTeammateJoins: () => void;
    playTeammateJoins2: () => void;
    playUserUnMutes: () => void;
    playUserMute: () => void;
    playStartVideo: () => void;
    playStopVideo: () => void;
    playStartScreenshare: () => void;
    playStopScreenshare: () => void;
    playJumpContext: () => void;
    playTeammateLeaves: () => void;
    playUserLeave: () => void;
    playUserDisconnects: () => void;
    playTeammateDisconnects: () => void;
    playPoorQualityDetected: () => void;
    playGood: () => void;
    playNotGood: () => void;
    playOtherJoinRoom: () => void;
    playReceiveChat: () => void;
    playClap: () => void;
    testSound: string;
}
declare const _default: SoundService;
export default _default;

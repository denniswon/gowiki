"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SoundService {
    sounds = {};
    disabled = false;
    getSound = (sound) => {
        switch (sound) {
            case 'user_receives_call':
                return 'user_unmute';
            case 'user_mute':
            case 'start_video':
            case 'stop_video':
            case 'start_screenshare':
            case 'stop_screenshare':
                return 'media_toggle';
            case 'other_join_room':
                return 'join_room';
            default:
                return sound;
        }
    };
    play = (filename, volume) => {
        if (this.disabled)
            return;
        this.playSound(filename);
    };
    // override this method for custom sound logic
    playSound = (filename) => {
        if (IS_TEST)
            return;
        const url = `/sounds/${this.getSound(filename)}.m4a`;
        if (!this.sounds[filename])
            this.sounds[filename] = new Audio(url);
        this.sounds[filename].play();
    };
    setSoundsDisabled = (setting) => {
        this.disabled = setting;
    };
    // Call Receiving Sounds
    playUserReceivesCall = () => this.play('user_unmute');
    playUserAcceptsCall = () => this.play('user_accepts_call');
    // Initiation Call Sounds
    playInitateCallClick = () => this.play('initiate_call_click');
    playUserConnects = () => this.play('user_connect');
    playTeammateAccepts = () => this.play('teammate_accepts');
    // Teammate joining Sounds
    playTeammateJoins = () => this.play('teammate_joins_1');
    playTeammateJoins2 = () => this.play('teammate_joins_2');
    // Media control sounds
    playUserUnMutes = () => this.play('user_unmute');
    playUserMute = () => this.play('media_toggle');
    playStartVideo = () => this.play('media_toggle');
    playStopVideo = () => this.play('media_toggle');
    playStartScreenshare = () => this.play('media_toggle');
    playStopScreenshare = () => this.play('media_toggle');
    playJumpContext = () => this.play('jump_context');
    // Leave Sounds
    playTeammateLeaves = () => this.play('teamamte_leaves');
    playUserLeave = () => this.play('user_leave');
    // Error Sounds
    playUserDisconnects = () => this.play('user_disconnects');
    playTeammateDisconnects = () => this.play('teammate_disconnects');
    playPoorQualityDetected = () => this.play('poor_quality_detected');
    // Misc
    playGood = () => this.play('good');
    playNotGood = () => this.play('not_good');
    playOtherJoinRoom = () => this.play('join_room');
    playReceiveChat = () => this.play('receive_chat');
    playClap = () => this.play('clap');
    testSound = `/sounds/jump_context.m4a`;
}
exports.default = new SoundService();
//# sourceMappingURL=index.js.map
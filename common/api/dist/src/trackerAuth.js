"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackerAuth = void 0;
const tracker_1 = require("./tracker");
/**
 * Authentication tracking
 */
class TrackerAuth {
    // --- auth
    /**
     * Forgot password email was triggered
     * @param {string} value1 email
     */
    forgotPassword(email) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authForgotPassword', email);
    }
    /**
     * Password reset successful
     * @param {string} value1 email
     */
    passwordReset(u) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authPasswordReset', u.email);
    }
    /** undocumented */
    editProfile(updates) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authEditProfile', JSON.stringify(updates));
    }
    /** undocumented */
    createUserAndTeam(u, teamname) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authCreateUserAndTeam', u.email, teamname);
    }
    /** undocumented */
    signOut() {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authSignOut');
    }
    /** undocumented */
    onTwoFactorAction(action) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authTwoFactorAction', action);
    }
    // --- oauth
    /** undocumented */
    oauthStart(provider, mode) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'authOAuth-' + provider, mode);
    }
    /** undocumented */
    googOAuthStart(type) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthStart', type);
    }
    /** undocumented */
    googOAuthSuccess(type) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthSuccess', type);
    }
    /** undocumented */
    googOAuthForce(type) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthForce', type);
    }
    /** undocumented */
    googOAuthError(message) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthError', message);
    }
    /** undocumented */
    googOAuthSignupWithCalendar() {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthSignupWithCalendar');
    }
    /** undocumented */
    googOAuthSignupWithoutCalendar() {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthSignupWithoutCalendar');
    }
    /** undocumented */
    googOAuthAddCalendar() {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'googOAuthAddCalendar');
    }
    // --- Team Creation
    /** undocumented */
    createTeam(team, domain) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'createTeam', team, domain);
    }
    /** undocumented */
    createTeamError(message) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'createTeamError', message);
    }
    /** undocumented */
    appCreateTeam(name) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'appCreateTeam', name);
    }
    // --- Teams Management
    /** undocumented */
    teamSwitch(name) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'teamSwitch', name);
    }
    teamUpdate(team, updates) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'teamUpdate', JSON.stringify(updates), team.id);
    }
    /** undocumented */
    teamLeave(name) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'teamLeave', name);
    }
    /** undocumented */
    teamMemberRemove(team, member) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'teamRemoveMember', null, null, null, null, null, member.id, member.name);
    }
    /** undocumented */
    teamMemberAssignRole(team, member, role) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'teamMemberAssignRole', role, null, null, null, null, member.id, member.name);
    }
    /** undocumented */
    privacySettingUpdate(team, setting) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'privacySettingUpdate', setting, team.name);
    }
    // --- Session management
    /** undocumented */
    sessionStart() {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'sessionStart');
    }
    /** undocumented */
    sessionEnd(durationSecs) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'sessionEnd', durationSecs + ' sec', null, durationSecs);
    }
    /** undocumented */
    sessionDisconnected(source) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'sessionDisconnected', source, null, null, null, null, null, null, true);
    }
    /** undocumented */
    sessionReconnected(source) {
        tracker_1.tracker.event(tracker_1.EventType.ACTION, 'sessionReconnected', source, null, null, null, null, null, null, true);
    }
}
exports.trackerAuth = new TrackerAuth();
//# sourceMappingURL=trackerAuth.js.map
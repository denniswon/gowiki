import { Member, Role, Team, User } from '@gowiki/core';
/**
 * Authentication tracking
 */
declare class TrackerAuth {
    /**
     * Forgot password email was triggered
     * @param {string} value1 email
     */
    forgotPassword(email: string): void;
    /**
     * Password reset successful
     * @param {string} value1 email
     */
    passwordReset(u: User): void;
    /** undocumented */
    editProfile(updates: User): void;
    /** undocumented */
    createUserAndTeam(u: User, teamname: string): void;
    /** undocumented */
    signOut(): void;
    /** undocumented */
    onTwoFactorAction(action: string): void;
    /** undocumented */
    oauthStart(provider: string, mode: string): void;
    /** undocumented */
    googOAuthStart(type: string): void;
    /** undocumented */
    googOAuthSuccess(type: string): void;
    /** undocumented */
    googOAuthForce(type: string): void;
    /** undocumented */
    googOAuthError(message: string): void;
    /** undocumented */
    googOAuthSignupWithCalendar(): void;
    /** undocumented */
    googOAuthSignupWithoutCalendar(): void;
    /** undocumented */
    googOAuthAddCalendar(): void;
    /** undocumented */
    createTeam(team: string, domain: string): void;
    /** undocumented */
    createTeamError(message: string): void;
    /** undocumented */
    appCreateTeam(name: string): void;
    /** undocumented */
    teamSwitch(name: string): void;
    teamUpdate(team: Team, updates: any): void;
    /** undocumented */
    teamLeave(name: string): void;
    /** undocumented */
    teamMemberRemove(team: Team, member: Member): void;
    /** undocumented */
    teamMemberAssignRole(team: Team, member: Member, role: Role): void;
    /** undocumented */
    privacySettingUpdate(team: Team, setting: string): void;
    /** undocumented */
    sessionStart(): void;
    /** undocumented */
    sessionEnd(durationSecs: number): void;
    /** undocumented */
    sessionDisconnected(source: string): void;
    /** undocumented */
    sessionReconnected(source: string): void;
}
export declare const trackerAuth: TrackerAuth;
export {};

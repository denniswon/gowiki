"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = exports.UserTeamMeta = exports.TeamMeta = void 0;
// for user-team metadata
class TeamMeta {
    /** invites locked */
    locked;
    /** external members blocked? */
    noext;
    /** chat off */
    nochat;
    /** crosstalk mode enabled */
    crosstalk;
    /** default to hear-before-accept */
    hba;
    /** Allow SSO only */
    sso;
    /** Disallow autojoin for org members */
    private;
    /** Hide Meeting Titles: Only meeting participants can see meeting titles */
    hmt;
}
exports.TeamMeta = TeamMeta;
class UserTeamMeta {
    roomNotifications = {};
}
exports.UserTeamMeta = UserTeamMeta;
class Team {
    id;
    name;
    members;
    placeholder;
    last_doc;
    meta;
    referrer;
    async;
    role;
    user_team_meta;
    // whether user is a guest (not a member) of this workspace
    guest;
    static fromJSON(obj) {
        let item = Object.assign(new Team(), obj);
        item.user_team_meta = Object.assign(new UserTeamMeta(), obj.user_team_meta);
        return item;
    }
    static meta(team) {
        return team ? team.meta || {} : {};
    }
}
exports.Team = Team;
//# sourceMappingURL=team.js.map
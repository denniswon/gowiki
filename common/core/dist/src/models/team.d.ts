import { Role } from '../config';
import { Member } from './member';
export declare class TeamMeta {
    /** invites locked */
    locked?: boolean;
    /** external members blocked? */
    noext?: boolean;
    /** chat off */
    nochat?: boolean;
    /** crosstalk mode enabled */
    crosstalk?: boolean;
    /** default to hear-before-accept */
    hba?: boolean;
    /** Allow SSO only */
    sso?: boolean;
    /** Disallow autojoin for org members */
    private?: boolean;
    /** Hide Meeting Titles: Only meeting participants can see meeting titles */
    hmt?: boolean;
}
export declare class UserTeamMeta {
    roomNotifications: {
        [id: string]: boolean;
    };
}
export declare class Team {
    id: string;
    name: string;
    members?: Member[];
    placeholder?: boolean;
    last_doc?: string;
    meta?: TeamMeta;
    referrer?: string;
    async?: string;
    role?: Role;
    user_team_meta?: UserTeamMeta;
    guest?: boolean;
    static fromJSON(obj: any): Team;
    static meta(team: Team): TeamMeta;
}

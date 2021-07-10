import { Role } from '../config';
import { Team } from './team';
export declare class Member {
    id: string;
    name: string;
    nickname?: string;
    profile_img?: string;
    role?: Role;
    timezone?: string;
    email?: string;
    mobile?: number;
    static fromJSON(obj: Object): Member & Object;
}
export declare type MemberMap = {
    [id: string]: Member;
};
export declare const makeMemberMap: (team: Team) => MemberMap;

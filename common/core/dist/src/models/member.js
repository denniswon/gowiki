"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeMemberMap = exports.Member = void 0;
class Member {
    id;
    name;
    nickname;
    profile_img;
    role;
    timezone;
    email;
    mobile;
    static fromJSON(obj) {
        let item = Object.assign(new Member(), obj);
        return item;
    }
}
exports.Member = Member;
const makeMemberMap = (team) => team.members.reduce((r, v) => {
    r[v.id] = v;
    return r;
}, {});
exports.makeMemberMap = makeMemberMap;
//# sourceMappingURL=member.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserMeta = void 0;
class UserMeta {
    /** has app? */
    ha;
    /** app version */
    av;
    /** last team id */
    lt;
    /** last status */
    st;
    /** chrome extension version */
    ce;
    /** tandem onboarded */
    to;
    /** sounds disabled */
    sdis;
    /** doc titles hidden */
    dthd;
    /** offline team hidden */
    hdof;
    /** on click member action */
    ocm;
}
exports.UserMeta = UserMeta;
class User {
    id;
    name;
    nickname;
    password;
    email;
    domain;
    profile_img;
    timezone;
    // user meta
    meta;
    // whether user is an anonymous (pre-auth) user
    anonymous;
    static fromJSON(obj) {
        let item = Object.assign(new User(), obj);
        if (!item.meta)
            item.meta = {};
        return item;
    }
    static meta(user) {
        return user ? user.meta || {} : {};
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map
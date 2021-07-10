"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthToken = void 0;
class OAuthToken {
    name;
    access;
    refresh;
    expires_at;
    meta;
    team;
    static fromJSON(obj) {
        let item = Object.assign(new OAuthToken(), obj);
        if (obj.expires_at)
            item.expires_at = new Date(obj.expires_at);
        if (!item.meta)
            item.meta = {};
        return item;
    }
}
exports.OAuthToken = OAuthToken;
//# sourceMappingURL=oauth_token.js.map
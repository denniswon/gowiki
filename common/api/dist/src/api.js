"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = exports.UploadedLogResponse = exports.UploadedLog = exports.UploadedLogListResponse = exports.UploadedLogListing = exports.AnalyticsResponse = exports.TokenResponse = exports.GoogleContactsApiResponse = exports.GooglePeopleApiResponse = exports.APIEvent = void 0;
const axios_1 = __importDefault(require("axios"));
const core_1 = require("@gowiki/core");
class APIEvent {
    time;
    userId;
    username;
    teamId;
    teamname;
    targetUserId;
    targetUsername;
    session;
    type;
    name;
    source;
    value1;
    value2;
    value3;
    meta;
    os;
    appver;
    githash;
    useragent;
    env;
    ip;
    constructor(time, userId, username, teamId, teamname, targetUserId, targetUsername, session, type, name, source, value1, value2, value3, meta, os, appver, githash, useragent, env, ip) {
        this.time = time;
        this.userId = userId;
        this.username = username;
        this.teamId = teamId;
        this.teamname = teamname;
        this.targetUserId = targetUserId;
        this.targetUsername = targetUsername;
        this.session = session;
        this.type = type;
        this.name = name;
        this.source = source;
        this.value1 = value1;
        this.value2 = value2;
        this.value3 = value3;
        this.meta = meta;
        this.os = os;
        this.appver = appver;
        this.githash = githash;
        this.useragent = useragent;
        this.env = env;
        this.ip = ip;
    }
}
exports.APIEvent = APIEvent;
class GooglePeopleApiResponse {
    connections;
}
exports.GooglePeopleApiResponse = GooglePeopleApiResponse;
class GoogleContactsApiResponse {
    feed;
}
exports.GoogleContactsApiResponse = GoogleContactsApiResponse;
class TokenResponse {
    token;
}
exports.TokenResponse = TokenResponse;
class AnalyticsResponse {
    value;
    data;
    multi;
}
exports.AnalyticsResponse = AnalyticsResponse;
class UploadedLogListing {
    key;
    time;
    team;
    logs;
}
exports.UploadedLogListing = UploadedLogListing;
class UploadedLogListResponse {
    logs;
}
exports.UploadedLogListResponse = UploadedLogListResponse;
class UploadedLog {
    path;
    reason;
    team;
    user;
    url;
}
exports.UploadedLog = UploadedLog;
class UploadedLogResponse {
    logs;
}
exports.UploadedLogResponse = UploadedLogResponse;
class APIService {
    endpoint = core_1.config.apiHost + core_1.config.apiUrl;
    axios = axios_1.default;
    token;
    // users
    setAuthToken(token) {
        this.token = token;
        this.axios = axios_1.default.create({
            headers: {
                common: {
                    'Authorization': 'Bearer ' + token
                },
            },
        });
    }
    async logInElseSignUpOAuth(provider, token, user, team, invite, allowSignUp = true) {
        let response = await this.axios.post(`${this.endpoint}/log_in_else_sign_up_oauth`, {
            provider,
            token,
            user,
            team,
            invite,
            allow_sign_up: allowSignUp
        });
        return response.data;
    }
    async forgotPassword(email) {
        let response = await this.axios.post(`${this.endpoint}/forgot_password`, { email });
        return response.data;
    }
    async resetPassword(token, password, code) {
        let response = await this.axios.post(`${this.endpoint}/reset_password`, { token, password, code });
        return response.data;
    }
    async loginSuccess(code) {
        let response = await this.axios.post(`${this.endpoint}/login_success`, { code });
        return response.data;
    }
    // google oauth
    // returns 'Contacts' only, including photo links
    async getGoogleContactsViaPeopleApi(accessToken) {
        let response = await this.axios.get('https://people.googleapis.com/v1/people/me/connections?personFields=names,nicknames,emailAddresses,photos', { headers: { Authorization: `Bearer ${accessToken}` } });
        return response.data;
    }
    // returns 'Contacts', 'Other contacts', 'Frequently contacted', etc, but doesn't include photo links.
    // note: returns 401 if permissions not granted.
    async getGoogleContactsViaContactsApi(accessToken, email) {
        // go through our server to avoid cross-origin issue
        let response = await this.axios.get(`${this.endpoint}/google_contacts_api?access_token=${accessToken}&email=${email}`);
        return response.data;
    }
    // user management
    async updateUser(updates) {
        let response = await this.axios.put(`${this.endpoint}/user`, updates);
        return response.data;
    }
    async getUser() {
        let response = await this.axios.get(`${this.endpoint}/user`);
        return response.data;
    }
    async verifyEmail(code) {
        let response = await this.axios.post(`${this.endpoint}/verify_email`, { code });
        return response.data;
    }
    async listTeams(includeIntegrations = false) {
        let response = await this.axios.get(`${this.endpoint}/teams${includeIntegrations ? "?include_integrations=true" : ""}`);
        return response.data;
    }
    async getTeam(team, includeIntegrations = false) {
        let response = await this.axios.get(`${this.endpoint}/teams/${team.id}${includeIntegrations ? "?include_integrations=true" : ""}`);
        return response.data;
    }
    async joinTeam(team) {
        let response = await this.axios.post(`${this.endpoint}/teams/${team.id}/join`);
        return response.data;
    }
    async leaveTeam(team) {
        let response = await this.axios.post(`${this.endpoint}/teams/${team.id}/leave`);
        return response.data;
    }
    // team creation and updating
    async createTeam(team, source) {
        let response = await this.axios.post(`${this.endpoint}/teams/create`, { ...team, source });
        return response.data;
    }
    async renameTeam(team, name) {
        let response = await this.axios.put(`${this.endpoint}/teams/${team.id}`, { name });
        return response.data;
    }
    async updateTeam(team, updates) {
        let response = await this.axios.put(`${this.endpoint}/teams/${team.id}`, updates);
        return response.data;
    }
    async updateTeamSettings(team, updates) {
        let response = await this.axios.put(`${this.endpoint}/teams/${team.id}/settings`, updates);
        return response.data;
    }
    async removeMember(team, member) {
        const response = await this.axios.delete(`${this.endpoint}/teams/${team.id}/members/${member.id}`);
        return response.data;
    }
    async updateMember(team, member, updates) {
        let response = await this.axios.put(`${this.endpoint}/teams/${team.id}/members/${member.id}`, updates);
        return response.data;
    }
    // images
    async uploadProfilePicture(file) {
        const formData = new FormData();
        formData.append('upload', file);
        const response = await this.axios.post(`${this.endpoint}/images/profile_picture`, formData, {
            headers: { 'Content-Type': `multipart/form-data` }
        });
        return response.data;
    }
    async uploadAttachment(blob, filename) {
        const file = new File([blob], filename);
        const formData = new FormData();
        formData.append('upload', file);
        formData.append('token', this.token);
        const response = await this.axios.post(`${exports.API.endpoint}/chat/attachment`, formData, {
            headers: { 'Content-Type': `multipart/form-data` }
        });
        return response.data;
    }
    async sendFiles(userId, teamId, channelId, description) {
        let response = await this.axios.post(`${this.endpoint}/files/send`, {
            user_id: userId,
            team_id: teamId,
            channel_id: channelId,
            description
        });
        return response.data;
    }
    // configuration
    async appVersion() {
        let response = await this.axios.get(`${this.endpoint}/app_version`);
        return response.data;
    }
    async time() {
        let response = await this.axios.get(`${this.endpoint}/time`);
        return response.data;
    }
    async productUpdates() {
        let response = await this.axios.get(`${this.endpoint}/product_updates`);
        return response.data;
    }
    // logging
    async logEvents(events) {
        let response = await this.axios.post(`${this.endpoint}/log_events`, { events });
        return response.data;
    }
    async logError(error) {
        let response = await this.axios.post(`${this.endpoint}/log_error`, error);
        return response.data;
    }
    async logFeedback(message, context) {
        let response = await this.axios.post(`${this.endpoint}/log_feedback`, { message, context });
        return response.data;
    }
    async postUserLog() {
        let response = await this.axios.post(`${this.endpoint}/logs/upload_user`, {});
        return response.data;
    }
    async logUploaded(team, path, type, reason, key, notes) {
        let response = await this.axios.post(`${this.endpoint}/logs/uploaded`, { team_id: team.id,
            path, type, reason, key, notes });
        return response.data;
    }
    async analyticsCheck() {
        let response = await this.axios.get(`${this.endpoint}/analysis/can_view`);
        return response.data;
    }
    async analyticsData(source) {
        let response = await this.axios.get(`${this.endpoint}/analysis/query?source=${source}`);
        return response.data;
    }
    async uploadedLogs(filters) {
        const queryString = Object.keys(filters).filter(key => filters[key]).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(filters[key])).join('&');
        let response = await this.axios.get(`${this.endpoint}/logs/list?${queryString}`);
        return response.data;
    }
    async updateFeedback(id, updates) {
        const response = await this.axios.put(`${this.endpoint}/logs/feedback/${id}`, updates);
        return response.data;
    }
    async uploadedLog(type, key) {
        let response = await this.axios.get(`${this.endpoint}/logs/view?type=${type}&key=${key}`);
        return response.data;
    }
    async okrs() {
        let response = await this.axios.get(`${this.endpoint}/analysis/okrs`);
        return response.data;
    }
    // oauth
    async oauthToken(service, team) {
        let url = `${this.endpoint}/oauth/token?service=${service}`;
        if (team)
            url += `&team=${team.id}`;
        let response = await this.axios.get(url);
        return response.data;
    }
    async updateOAuthToken(service, updates) {
        let response = await this.axios.put(`${this.endpoint}/oauth/token?service=${service}`, updates);
        return response.data;
    }
    async deleteOAuthToken(service, team) {
        let url = `${this.endpoint}/oauth/token?service=${service}`;
        if (team)
            url += `&team=${team.id}`;
        const response = await this.axios.delete(url);
        return response.data;
    }
    async completeOAuthWithCode(redirect_uri, code, team, service) {
        let response = await this.axios.post(`${this.endpoint}/oauth/connect`, { service, code, team, redirect_uri });
        return response.data;
    }
    async completeExistingOAuthWithCode(access_token, refresh_token, expires_in, team, service) {
        let response = await this.axios.put(`${this.endpoint}/oauth/token`, { service, team, access_token, refresh_token, expires_in });
        return response.data;
    }
    async refreshOAuthToken(service) {
        let response = await this.axios.post(`${this.endpoint}/oauth/refresh`, { service });
        return response.data;
    }
    // general functions
    logOut() {
        this.axios.defaults.headers.common['Authorization'] = null;
    }
    // Return a number representing the skew between client time and server time. It should be
    // subtracted from client time to give server time.
    async getClockSkew() {
        const start = core_1.performanceNow();
        const response = await this.time();
        const rtt = core_1.performanceNow() - start;
        // factor in round-trip time as part of "clock"
        return Date.now() - response.time - (rtt / 2);
    }
    // user data
    async getUserData(key, teamId) {
        const teamParam = teamId ? `team=${teamId}&` : '';
        const response = await this.axios.get(`${this.endpoint}/users/data?${teamParam}key=${encodeURIComponent(key)}`);
        return response.data.data;
    }
    async setUserData(key, data, teamId) {
        const teamParam = teamId ? `team=${teamId}&` : '';
        const response = await this.axios.post(`${this.endpoint}/users/data?${teamParam}key=${encodeURIComponent(key)}`, { data });
        return response.data;
    }
    // mobile
    async registerPushToken(type, token, device_id, name) {
        const response = await this.axios.post(`${this.endpoint}/mobile/register_token`, { type, token, device_id, name });
        return response.data;
    }
    async unregisterPushToken(type, token) {
        const response = await this.axios.post(`${this.endpoint}/mobile/unregister_token`, { type, token });
        return response.data;
    }
    async activeTokens() {
        const response = await this.axios.get(`${this.endpoint}/mobile/active_tokens`);
        return response.data;
    }
}
exports.API = new APIService();
//# sourceMappingURL=api.js.map
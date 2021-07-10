"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.showDevActions = exports.userById = exports.authActions = exports.authApi = exports.useAuthStore = exports.AuthActions = exports.LS_TOKEN = void 0;
const lodash_1 = require("lodash");
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const zustand_1 = __importDefault(require("zustand"));
const core_1 = require("@gowiki/core");
const v4_1 = __importDefault(require("uuid/v4"));
const api_1 = require("./api");
const tracker_1 = require("./tracker");
const trackerAuth_1 = require("./trackerAuth");
exports.LS_TOKEN = 'token';
class AuthActions {
    set;
    get;
    constructor(set, get) {
        this.set = set;
        this.get = get;
    }
    saveToken = (token) => {
        core_1.logger.info('AUTH —— saving token', token);
        localStorage.setItem(exports.LS_TOKEN, token);
        window.authToken = token;
    };
    // --- initialization
    init = (onLogin) => {
        if (this.get().initialized)
            return;
        const token = (core_1.config.dev && localStorage.getItem(exports.LS_TOKEN)) || window.authToken;
        core_1.logger.info(`AUTH —— init`, token);
        if (token) {
            this.loginHelper(token, token != window.authToken, onLogin);
        }
        else {
            this.set(_ => ({ initialized: true }));
        }
    };
    // note: mobile only. used for switch server dev option
    reinit = (onLogin) => {
        const token = window.authToken;
        if (!token)
            return;
        core_1.logger.info(`AUTH —— reinit`, token);
        this.set(() => ({ initialized: false }));
        return this.loginHelper(token, token != window.authToken, onLogin);
    };
    // Use when you want to ensure you're running in an initialized state
    withInit = (func) => {
        const { initialized, user, team, token } = this.get();
        if (initialized) {
            func(user, team, token);
        }
        else {
            this.init(func);
        }
    };
    initMainWindow = () => {
        const appVer = `${window.appVersion}-${core_1.getOS()}`;
        if (core_1.User.meta(this.get().user).av != appVer) {
            this.updateUser({ meta: { av: appVer } });
        }
    };
    // --- login
    loginHelper = async (token, saveToken, onLogin, rethrowError) => {
        try {
            api_1.API.setAuthToken(token);
            const response = await api_1.API.listTeams();
            if (!response.primary_team) {
                return this.switchTeamOrLogout([]);
            }
            const primaryTeam = core_1.Team.fromJSON(response.primary_team || { name: 'Team', members: [] });
            const user = core_1.User.fromJSON(response.user);
            const members = core_1.makeMemberMap(primaryTeam);
            tracker_1.tracker.onChangeUser(response.user);
            tracker_1.tracker.onChangeTeam(primaryTeam);
            if (response.token) {
                token = response.token;
                saveToken = true;
            }
            this.set(_ => ({
                token,
                user,
                userId: response.user.id,
                team: primaryTeam,
                teams: response.teams.map(t => core_1.Team.fromJSON(t)),
                members: members,
                error: false,
                initialized: true
            }));
            if (onLogin)
                onLogin(user, primaryTeam, token);
            if (saveToken) {
                this.saveToken(token);
            }
            if (core_1.config.dev) {
                core_1.logger.saveDefaultLogLevel('debug');
                window['authStore'] = this;
            }
            return { user, team: primaryTeam, token };
        }
        catch (e) {
            core_1.logger.error(e);
            if (rethrowError)
                throw e;
            this.set(_ => ({ initialized: true }));
            return null;
        }
    };
    logInElseSignUpOAuth = async (provider, token, invite, allowSignUp = true, email, team, onLogin) => {
        core_1.logger.info(`AUTH —— logInElseSignUpOAuth`, provider, token, invite);
        trackerAuth_1.trackerAuth.oauthStart(provider, 'login-else-signin');
        let user = new core_1.User();
        user.timezone = core_1.currentTimezone();
        user.email = email;
        const response = await api_1.API.logInElseSignUpOAuth(provider, token, user, team, invite, allowSignUp);
        core_1.logger.info("logInElseSignUpOAuth response", response);
        if (response.user) {
            await this.loginHelper(response.token, true, onLogin, true);
        }
        return response;
    };
    logout = (set = true) => {
        core_1.logger.info(`AUTH —— logout`);
        localStorage.clear();
        if (set)
            this.set(_ => ({ clientId: v4_1.default(), token: null, user: null, team: null }));
    };
    updateMembers = (members) => {
        core_1.logger.info(`AUTH - update members`, members);
        const team = Object.assign({}, this.get().team);
        team.members = members;
        const memberMap = core_1.makeMemberMap(team);
        this.set(_ => ({ team, members: memberMap }));
    };
    // --- team management
    refreshTeam = async () => {
        core_1.logger.info(`AUTH —— refreshTeam`);
        let { team, teams } = this.get();
        const otherTeams = teams.filter(t => t.id != team.id);
        let response;
        try {
            response = await api_1.API.getTeam(team);
        }
        catch (e) {
            if (e.response?.status === 404) {
                return this.switchTeamOrLogout(otherTeams);
            }
            else {
                throw (e);
            }
        }
        team = core_1.Team.fromJSON(response.team);
        const members = core_1.makeMemberMap(team);
        this.set(_ => ({ team, members, teams: otherTeams.concat([team]) }));
        pubsub_js_1.default.publish(core_1.PubSubAction.UPDATE_TEAM, team);
    };
    refreshTeams = async (includeIntegrations = false) => {
        core_1.logger.info(`AUTH —— refreshTeams`);
        const response = await api_1.API.listTeams(includeIntegrations);
        this.set(_ => ({
            teams: response.teams.map(t => core_1.Team.fromJSON(t))
        }));
        const { id } = this.get().team;
        if (!(id && response.teams.find(t => t.id == id))) {
            this.switchTeamOrLogout(response.teams);
        }
        else if (includeIntegrations) {
            this.refreshTeam();
        }
    };
    switchTeamOrLogout(teams) {
        if (teams.length === 0) {
            this.logout(false);
            window.location.reload();
        }
        else {
            this.switchTeam(teams[0].id, false);
        }
    }
    createOrJoinTeam = async (team, source) => {
        if (team.id != null) {
            await api_1.API.joinTeam({ id: team.id, name: team.name });
            return team;
        }
        else {
            const newteam = new core_1.Team();
            newteam.name = team.name;
            newteam.meta = {};
            const realTeam = await this.createTeam(newteam, source);
            this.set(_ => ({ team: realTeam }));
            return realTeam;
        }
    };
    createTeam = async (team, source) => {
        const response = await api_1.API.createTeam(team, source);
        const newTeam = core_1.Team.fromJSON(response.team);
        this.set(state => ({ teams: state.teams.concat([newTeam]) }));
        trackerAuth_1.trackerAuth.appCreateTeam(team.name);
        return newTeam;
    };
    switchTeam = async (id, refresh, skipPublish) => {
        if (id == this.get().team?.id)
            return;
        if (refresh) {
            // do a page refresh
            await api_1.API.updateUser({ meta: { lt: id } });
            location.reload();
        }
        else {
            const response = await api_1.API.getTeam({ id });
            const team = core_1.Team.fromJSON(response.team);
            const members = core_1.makeMemberMap(team);
            api_1.API.updateUser({ meta: { lt: id } });
            trackerAuth_1.trackerAuth.teamSwitch(team.name);
            this.set(_ => ({
                team: team,
                members: members
            }));
            if (!skipPublish)
                pubsub_js_1.default.publish(core_1.PubSubAction.SWITCH_TEAM, team);
            return team;
        }
    };
    setDefaultTeam = async (team) => {
        this.updateUser({ meta: { lt: team.id } });
    };
    updateUser = async (updates) => {
        core_1.logger.info(`AUTH —— Update User`, updates);
        const { user } = await api_1.API.updateUser(updates);
        this.set(_ => ({ user }));
        pubsub_js_1.default.publish(core_1.PubSubAction.UPDATE_USER, user);
    };
    updateUserProfilePicture = async (file) => {
        core_1.logger.info(`AUTH —— Upload User profile picture`);
        const { user } = await api_1.API.uploadProfilePicture(file);
        pubsub_js_1.default.publish(core_1.PubSubAction.UPDATE_USER, user);
    };
    updateLocalUser = async (user) => {
        core_1.logger.info(`AUTH —— Set User`, user);
        this.set(state => ({ user: core_1.User.fromJSON(user), members: { ...state.members, [user.id]: user } }));
    };
    updateTeam = async (team, updates, optimistic = false) => {
        core_1.logger.info(`AUTH —— Update Team`, updates);
        if (optimistic)
            this.updateLocalTeam(lodash_1.merge(new core_1.Team(), team, updates));
        let response = await api_1.API.updateTeam(team, updates);
        const updatedTeam = core_1.Team.fromJSON(response.team);
        this.updateLocalTeam(updatedTeam);
        trackerAuth_1.trackerAuth.teamUpdate(updatedTeam, updates);
        pubsub_js_1.default.publish(core_1.PubSubAction.UPDATE_TEAM, updatedTeam);
    };
    updateLocalTeam = (updatedTeam) => {
        core_1.logger.info(`AUTH —— Set Team`, updatedTeam);
        this.set(state => ({
            team: state.team?.id == updatedTeam.id ? updatedTeam : state.team,
            members: state.team?.id == updatedTeam.id && updatedTeam.members ? core_1.makeMemberMap(updatedTeam) : state.members,
            teams: state.teams.map(t => t.id == updatedTeam.id ? updatedTeam : t)
        }));
    };
    rememberShowDevActions;
    showDevActions = () => {
        if (this.rememberShowDevActions !== undefined)
            return this.rememberShowDevActions;
        this.rememberShowDevActions = true;
        return this.rememberShowDevActions;
    };
}
exports.AuthActions = AuthActions;
_a = zustand_1.default((set, get) => ({
    initialized: false,
    clientId: window.clientId || v4_1.default(),
    members: {},
    actions: new AuthActions(set, get)
})), exports.useAuthStore = _a[0], exports.authApi = _a[1];
exports.authActions = exports.authApi.getState().actions;
// NOTE!! don't use these functions in react components, as they don't respond to store changes.
const userById = (userId) => {
    const members = exports.authApi.getState().members;
    return members[userId];
};
exports.userById = userById;
const showDevActions = () => {
    return core_1.config.env == 'dev' || exports.authActions.showDevActions();
};
exports.showDevActions = showDevActions;
//# sourceMappingURL=authStore.js.map
import { GetState, SetState } from 'zustand';
import { Member, MemberMap, OAuthProvider, Team, User } from '@gowiki/core';
import { OAuthSignInResponse } from './api';
export declare const LS_TOKEN = "token";
export declare type AuthStore = {
    initialized: boolean;
    clientId: string;
    userId?: string;
    token?: string;
    user?: User;
    team?: Team;
    teams?: Team[];
    members?: MemberMap;
    livePreview?: boolean;
    actions: AuthActions;
};
export declare class AuthActions {
    set: SetState<AuthStore>;
    get: GetState<AuthStore>;
    constructor(set: SetState<AuthStore>, get: GetState<AuthStore>);
    saveToken: (token: string) => void;
    init: (onLogin?: (user: User, team: Team, token: string) => void) => void;
    reinit: (onLogin?: (user: User, team: Team, token: string) => void) => Promise<void | {
        user: User;
        team: Team;
        token: string;
    }>;
    withInit: (func: (user: User, team: Team, token: string) => void) => void;
    initMainWindow: () => void;
    loginHelper: (token: string, saveToken?: boolean, onLogin?: (user: User, team: Team, token: string) => void, rethrowError?: boolean) => Promise<void | {
        user: User;
        team: Team;
        token: string;
    }>;
    logInElseSignUpOAuth: (provider: OAuthProvider, token: string, invite: string, allowSignUp?: boolean, email?: string, team?: {
        id?: string;
        name?: string;
        domain?: string;
    }, onLogin?: (user: User, team: Team, token: string) => void) => Promise<OAuthSignInResponse>;
    logout: (set?: boolean) => void;
    updateMembers: (members: Member[]) => void;
    refreshTeam: () => Promise<void>;
    refreshTeams: (includeIntegrations?: boolean) => Promise<void>;
    private switchTeamOrLogout;
    createOrJoinTeam: (team: Partial<Team>, source: string) => Promise<Team>;
    createTeam: (team: Team, source: string) => Promise<Team>;
    switchTeam: (id: string, refresh: boolean, skipPublish?: boolean) => Promise<Team>;
    setDefaultTeam: (team: Team) => Promise<void>;
    updateUser: (updates: Partial<User>) => Promise<void>;
    updateUserProfilePicture: (file: File) => Promise<void>;
    updateLocalUser: (user: User) => Promise<void>;
    updateTeam: (team: Team, updates: Partial<Team>, optimistic?: boolean) => Promise<void>;
    updateLocalTeam: (updatedTeam: Team) => void;
    rememberShowDevActions: boolean;
    showDevActions: () => boolean;
}
export declare const useAuthStore: import("zustand").UseStore<AuthStore>, authApi: import("zustand").StoreApi<AuthStore>;
export declare const authActions: AuthActions;
export declare const userById: (userId: string) => Member;
export declare const showDevActions: () => boolean;

import { AxiosInstance } from 'axios';
import { Member, OAuthProvider, OAuthToken, Role, Team, User, UserTeamMeta } from '@gowiki/core';
export declare type SuccessResponse = {
    success: boolean;
};
export declare type SuccessCountResponse = SuccessResponse & {
    count: number;
};
export declare type SignInResponse = SuccessResponse & {
    existing?: string;
    user?: User;
    team?: Team;
    token?: string;
    no_team?: boolean;
};
export declare type OAuthSignInResponse = SignInResponse & {
    profile: any;
};
export declare type UserResponse = {
    user: User;
};
export declare type TeamsResponse = {
    user: User;
    teams: Team[];
    primary_team: Team;
    token?: string;
    time: number;
};
export declare type TeamResponse = {
    team: Team;
};
export declare class APIEvent {
    time: number;
    userId: string;
    username: string;
    teamId: string;
    teamname: string;
    targetUserId: string;
    targetUsername: string;
    session: string;
    type: string;
    name: string;
    source?: string;
    value1?: string;
    value2?: string;
    value3?: number;
    meta?: any;
    os?: string;
    appver?: string;
    githash?: string;
    useragent?: string;
    env?: string;
    ip?: string;
    constructor(time: number, userId: string, username: string, teamId: string, teamname: string, targetUserId: string, targetUsername: string, session: string, type: string, name: string, source?: string, value1?: string, value2?: string, value3?: number, meta?: any, os?: string, appver?: string, githash?: string, useragent?: string, env?: string, ip?: string);
}
export declare class GooglePeopleApiResponse {
    connections: {
        names: {
            metadata: {
                primary?: boolean;
            };
            displayName: string;
            familyName: string;
            givenName: string;
            displayNameLastFirst: string;
        }[];
        photos: {
            metadata: {
                primary?: boolean;
            };
            url: string;
            default: boolean;
        }[];
        emailAddresses: {
            metadata: {
                primary?: boolean;
                verified?: true;
            };
            value: string;
        }[];
    }[];
}
export declare class GoogleContactsApiResponse {
    feed: {
        entry: {
            title: {
                $t: string;
            };
            gd$email: {
                address: string;
                primary: boolean;
            }[];
        }[];
    };
}
export declare class TokenResponse {
    token: OAuthToken<any>;
}
export declare class AnalyticsResponse {
    value: number;
    data?: {
        [date: string]: number;
    };
    multi?: {
        label: string;
        data: {
            [date: string]: number;
        };
    }[];
}
export declare class UploadedLogListing {
    key: string;
    time: string;
    team: string;
    logs: {
        id: number;
        inserted_at: string;
        key: string;
        path: string;
        reason: string;
        team: string;
        user: string;
        notes: string;
    }[];
}
export declare class UploadedLogListResponse {
    logs: UploadedLogListing[];
}
export declare class UploadedLog {
    path: string;
    reason?: string;
    team: string;
    user: string;
    url: string;
}
export declare class UploadedLogResponse {
    logs: UploadedLog[];
}
export declare type PushTokenType = 'apn' | 'apn-voip' | 'fcm';
declare class APIService {
    endpoint: string;
    axios: AxiosInstance;
    token: string;
    setAuthToken(token: string): void;
    logInElseSignUpOAuth(provider: OAuthProvider, token: string, user: Partial<User>, team: Partial<Team>, invite?: string, allowSignUp?: boolean): Promise<OAuthSignInResponse>;
    forgotPassword(email: string): Promise<SuccessResponse>;
    resetPassword(token: string, password: string, code?: string): Promise<SignInResponse>;
    loginSuccess(code: string): Promise<SuccessResponse>;
    getGoogleContactsViaPeopleApi(accessToken: string): Promise<GooglePeopleApiResponse>;
    getGoogleContactsViaContactsApi(accessToken: string, email: string): Promise<GoogleContactsApiResponse>;
    updateUser(updates: Partial<User>): Promise<UserResponse>;
    getUser(): Promise<UserResponse>;
    verifyEmail(code?: string): Promise<SuccessResponse>;
    listTeams(includeIntegrations?: boolean): Promise<TeamsResponse>;
    getTeam(team: {
        id: string;
    }, includeIntegrations?: boolean): Promise<TeamResponse>;
    joinTeam(team: Partial<Team>): Promise<SuccessResponse>;
    leaveTeam(team: Team): Promise<SuccessResponse>;
    createTeam(team: Team, source: string): Promise<TeamResponse>;
    renameTeam(team: Team, name: string): Promise<TeamResponse>;
    updateTeam(team: Team, updates: Partial<Team>): Promise<TeamResponse>;
    updateTeamSettings(team: Team, updates: {
        presence?: number;
        user_team_meta?: UserTeamMeta;
    }): Promise<SuccessResponse>;
    removeMember(team: Team, member: Member): Promise<SuccessResponse>;
    updateMember(team: Team, member: Member, updates: {
        role: Role;
    }): Promise<SuccessResponse>;
    uploadProfilePicture(file: File): Promise<UserResponse>;
    uploadAttachment(blob: Blob, filename: string): Promise<{
        url: string;
    }>;
    sendFiles(userId: string, teamId: string, channelId: string, description: string): Promise<SuccessResponse>;
    appVersion(): Promise<{
        version: string;
    }>;
    time(): Promise<{
        time: number;
    }>;
    productUpdates(): Promise<{
        posts: any[];
    }>;
    logEvents(events: APIEvent[]): Promise<SuccessResponse>;
    logError(error: any): Promise<SuccessResponse>;
    logFeedback(message: string, context: any): Promise<SuccessResponse>;
    postUserLog(): Promise<{
        url: string;
        path: string;
    }>;
    logUploaded(team: Team, path: string, type: 'call' | 'user', reason: string, key: string, notes: string): Promise<SuccessResponse>;
    analyticsCheck(): Promise<SuccessResponse>;
    analyticsData(source: string): Promise<AnalyticsResponse>;
    uploadedLogs(filters: {
        type: 'call' | 'user';
        user_uuid: string;
        team_uuid: string;
        reason: string;
    }): Promise<UploadedLogListResponse>;
    updateFeedback(id: number, updates: any): Promise<SuccessResponse>;
    uploadedLog(type: 'call' | 'user', key: string): Promise<UploadedLogResponse>;
    okrs(): Promise<string>;
    oauthToken(service: string, team?: Team): Promise<TokenResponse>;
    updateOAuthToken(service: string, updates: Partial<OAuthToken<any>>): Promise<TokenResponse>;
    deleteOAuthToken(service: string, team?: Team): Promise<SuccessResponse>;
    completeOAuthWithCode(redirect_uri: string, code: string, team: string, service: string): Promise<TokenResponse>;
    completeExistingOAuthWithCode(access_token: string, refresh_token: string, expires_in: number, team: string, service: string): Promise<TokenResponse>;
    refreshOAuthToken(service: string): Promise<TokenResponse>;
    logOut(): void;
    getClockSkew(): Promise<number>;
    getUserData(key: string, teamId?: string): Promise<any>;
    setUserData(key: string, data: any, teamId?: string): Promise<SuccessResponse>;
    registerPushToken(type: PushTokenType, token: string, device_id: string, name: string): Promise<SuccessResponse>;
    unregisterPushToken(type: PushTokenType, token: string): Promise<SuccessResponse>;
    activeTokens(): Promise<{
        tokens: {
            name: string;
            type: string;
            inserted_at: string;
        }[];
    }>;
}
export declare const API: APIService;
export {};

export declare class OAuthToken<MetaType> {
    name: string;
    access: string;
    refresh?: string;
    expires_at?: Date;
    meta?: MetaType;
    team?: string;
    static fromJSON<MetaType>(obj: any): OAuthToken<MetaType>;
}

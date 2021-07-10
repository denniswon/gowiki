export declare const environments: readonly ["dev", "staging", "dogfood", "prod"];
export declare type ENV = typeof environments[number];
export declare const getProtocol: (environment: any, is_dev: any, os?: any) => string;
export declare const overrideOrigin: (host: string) => void;
export declare let config: {
    apiUrl: string;
    apiHost: string;
    assetHost: string;
    wsUrl: string;
    dev: boolean;
    hash: string;
    env: "dev" | "staging" | "dogfood" | "prod";
    protocol: string;
    appVersion: string;
    twitterUrl: string;
    readonly isStaging: boolean;
    forcedUpgradeMinAppVersion: any;
};

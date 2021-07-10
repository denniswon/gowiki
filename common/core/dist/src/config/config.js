"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.overrideOrigin = exports.getProtocol = exports.environments = void 0;
// https://microsoft.github.io/TypeScript-New-Handbook/everything/#indexed-access-types
exports.environments = ['dev', 'staging', 'dogfood', 'prod'];
const isReactNative = typeof navigator != 'undefined' && navigator.product == 'ReactNative';
let originUrl = typeof (ORIGIN_HOST) != 'undefined' ? ORIGIN_HOST || location.origin :
    isReactNative ? process.env['ORIGIN_HOST'] :
        typeof (location) != 'undefined' ? location.origin : '';
let isDev = typeof (IS_DEV) !== 'undefined' ? IS_DEV : process.env.NODE_ENV == 'development';
const isTest = typeof (IS_TEST) !== 'undefined' ? IS_TEST : false;
const hash = typeof (HASH) !== 'undefined' ? HASH : '';
const isNode = typeof window === 'undefined';
const getEnv = () => {
    return isDev ? 'dev' :
        originUrl.indexOf('//staging') > -1 ? 'staging' :
            originUrl.indexOf('//dogfood') > -1 ? 'dogfood' :
                'prod';
};
let env = getEnv();
const getProtocol = (environment, is_dev, os) => {
    if (os == 'ios' || os == 'android') {
        return is_dev ? `chat.tandem-dev.${os}` :
            environment == 'dogfood' ? `chat.tandem-dogfood.${os}` : `chat.tandem.${os}`;
    }
    return is_dev ? 'tandemdev' : environment == 'dogfood' ? 'tandemstaging' : 'tandem';
};
exports.getProtocol = getProtocol;
const overrideOrigin = (host) => {
    originUrl = host;
    isDev = (host.lastIndexOf(':') > 5);
    env = getEnv();
    exports.config = get(originUrl, env, isDev);
};
exports.overrideOrigin = overrideOrigin;
const get = (origin_url, environment, is_dev) => {
    return {
        // our API endpoint
        apiUrl: '/api/v1',
        // our API host - leave blank to use current server
        apiHost: origin_url,
        assetHost: origin_url.replace('5000', '9000'),
        // web socket URL
        wsUrl: origin_url.replace('http', 'ws') + '/socket',
        dev: is_dev,
        hash: hash?.substr(0, 10),
        env: environment,
        protocol: exports.getProtocol(env, isDev),
        appVersion: isReactNative ? process.version : (isNode ? null : window.appVersion),
        twitterUrl: 'https://twitter.com/Tandem',
        get isStaging() {
            return this.env == 'staging';
        },
        forcedUpgradeMinAppVersion: undefined
    };
};
exports.config = get(originUrl, env, isDev);
//# sourceMappingURL=config.js.map
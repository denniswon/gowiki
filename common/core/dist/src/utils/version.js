"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minAppVersion = void 0;
const config_1 = require("../config");
/** From '16.0.13' to -> [16, 0, 13] */
/** From '1.0.0 (126)' to -> [1, 0, 0, 126] */
const parseVersion = (version) => version.split(/[\s\(\)\.]+/).map(n => parseInt(n, 10)).filter(x => !Number.isNaN(x));
const configVersion = config_1.config.appVersion && parseVersion(config_1.config.appVersion);
const minAppVersion = (target) => {
    if (!configVersion)
        return true;
    const targetVersion = parseVersion(target);
    const versionDelta = targetVersion.map((tv, i) => configVersion[i] - tv);
    for (let i = 0; i < versionDelta.length; i++) {
        if (versionDelta[i] < 0)
            return false;
        if (versionDelta[i] > 0)
            return true;
    }
    return true;
};
exports.minAppVersion = minAppVersion;
//# sourceMappingURL=version.js.map
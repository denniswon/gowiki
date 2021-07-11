"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appService = exports.AppService = void 0;
const pubsub_js_1 = __importDefault(require("pubsub-js"));
const core_1 = require("@gowiki/core");
class AppService {
    impl;
    setAppInterface(impl) {
        if (!this.impl) {
            pubsub_js_1.default.subscribe(core_1.PubSubAction.UPDATE_USER, (_, user) => this.updateSettings({ user }));
            pubsub_js_1.default.subscribe(core_1.PubSubAction.UPDATE_TEAM, (_, team) => this.updateSettings({ team }));
        }
        this.impl = impl;
    }
    // --- interface methods
    // --- os interface
    playSound = (sound) => this.impl.playSound(sound);
    showNotification(title, body, onClick, sound, options) {
        return this.impl.showNotification(title, body, onClick, sound, options);
    }
    openUrl = (...args) => this.impl.openUrl.apply(this.impl, args);
    setBadge = (...args) => this.impl.setBadge.apply(this.impl, args);
    // --- app logic
    isOnboarding = (...args) => this.impl.isOnboarding.apply(this.impl, args);
    onboardingAction(action) { return this.impl.onboardingAction.apply(this.impl, arguments); }
    setWindowFlags = (flags) => this.impl.setWindowFlags(flags);
    // --- cross-window communication
    showPopover(message, dismissAfter, onClick, buttons) {
        return this.impl.showPopover(message, dismissAfter, onClick, buttons);
    }
    clearPopover() {
        return this.impl.clearPopover();
    }
    showTooltip(element, tooltip, toggle, offsetY) { return this.impl.showTooltip(element, tooltip, toggle, offsetY); }
    hideTooltip(force) { return this.impl.hideTooltip(force); }
    updateSettings(updates) { return this.impl.updateSettings(updates); }
    showSettings(page, source) { return this.impl.showSettings(page, source); }
}
exports.AppService = AppService;
exports.appService = new AppService();
//# sourceMappingURL=appService.js.map
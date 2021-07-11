"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StubAppService = void 0;
// stub service - extends for testing
class StubAppService {
    constructor(overrides) {
        Object.assign(this, overrides);
    }
    // --- os interface
    playSound(sound) { }
    showNotification(title, body, onClick, sound, options) { }
    openUrl(url, source) { }
    setBadge(count, bounce) { }
    // --- app logic
    isOnboarding() { return false; }
    onboardingAction(action) { }
    setWindowFlags(flags) { }
    // --- cross-window communication
    showPopover(message, dismissAfter, onClick, buttons) { }
    clearPopover() { }
    showTooltip(element, tooltip, toggle, offsetY) { }
    hideTooltip(force) { }
    updateSettings(updates) { }
    showSettings(page, source) { }
}
exports.StubAppService = StubAppService;
//# sourceMappingURL=stubAppService.js.map
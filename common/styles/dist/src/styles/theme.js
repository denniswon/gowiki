"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPropColor = exports.modifyColor = exports.colorVariablesScale = exports.themeArrayToObject = exports.makeTheme = void 0;
const polished_1 = require("polished");
const core_1 = require("@gowiki/core");
function makeTheme(name, themeColors) {
    const { background, detailsBackground, ink, detailsInk, highlight, highlightText } = themeColors;
    // background luminanceFactor
    const blf = polished_1.getLuminance(background) > 0.5 ? -1 : 1; // -1 light, 1 dark
    const dblf = polished_1.getLuminance(detailsBackground) > 0.5 ? -1 : 1;
    // Main App Colors
    const themedColors = {
        isDark: blf == 1,
        background: background,
        detailsBackground: detailsBackground,
        ...colorVariablesScale(ink, 'ink'),
        tooltipBackground: polished_1.setLightness(0.2, background),
        popoverBackground: modifyColor(background, { l: 8 }),
        // TODO if background is light or white, darken it with the hue of ink or highlight
        bgIdle: themeColors.bgIdle || modifyColor(background, { s: 4, l: 6 * blf }),
        bgHover: themeColors.bgHover || modifyColor(background, { s: 2, l: 9 * blf }),
        bgPressing: themeColors.bgPressing || modifyColor(background, { l: 23 * blf }),
        highlight: highlight,
        highlightHover: modifyColor(highlight, { l: 5 }),
        highlightPressing: modifyColor(highlight, { l: 10 }),
        highlightText: polished_1.readableColor(highlight, polished_1.setLightness(0.05, background), polished_1.setLightness(0.95, background), false),
    };
    // Details Pane
    const detailsThemedColors = {
        ...themedColors,
        background: detailsBackground,
        ...colorVariablesScale(detailsInk, 'ink'),
        bgIdle: modifyColor(detailsBackground, { s: 4, l: 6 * dblf }),
        bgHover: modifyColor(detailsBackground, { s: 2, l: 9 * dblf }),
        bgPressing: modifyColor(detailsBackground, { l: 23 * dblf }),
        highlightHover: modifyColor(highlight, { l: 5 }),
        highlightPressing: modifyColor(highlight, { l: 10 }),
    };
    return {
        name: name,
        ...themedColors,
        colors: themedColors,
        detailsTheme: {
            ...detailsThemedColors,
            colors: detailsThemedColors
        }
    };
}
exports.makeTheme = makeTheme;
function themeArrayToObject(arr) {
    return {
        background: arr[0],
        detailsBackground: arr[1],
        ink: arr[2],
        detailsInk: arr[3],
        highlight: arr[4],
        highlightText: arr[5],
    };
}
exports.themeArrayToObject = themeArrayToObject;
function colorVariablesScale(color, name, increment = 5) {
    const colors = {};
    colors[name] = color;
    for (let step = 95; step > 0; step = Math.round(step - increment)) {
        const label = step < 10 ? '0' + step : step;
        const opacity = step / 100;
        const colorValue = polished_1.rgba(color, opacity);
        colors[`${name}${label}`] = colorValue;
    }
    return colors;
}
exports.colorVariablesScale = colorVariablesScale;
function modifyColor(base, extra) {
    const { h, s, l } = extra;
    let { hue, saturation, lightness } = polished_1.parseToHsl(base);
    hue = core_1.clamp(hue + (h || 0), 0, 255);
    saturation = core_1.clamp(saturation + (s / 100 || 0), 0, 1);
    lightness = core_1.clamp(lightness + (l / 100 || 0), 0, 1);
    return polished_1.hslToColorString({ hue, saturation, lightness });
}
exports.modifyColor = modifyColor;
function getPropColor(key, props) {
    const color = props[key];
    return typeof color === 'string' ? props?.theme?.colors?.[color] || props[key] : color;
}
exports.getPropColor = getPropColor;
//# sourceMappingURL=theme.js.map
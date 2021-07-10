"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseURLsFromText = void 0;
// from https://daringfireball.net/2010/07/improved_regex_for_matching_urls
const urlRegex = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gm;
function parseURLsFromText(text) {
    let urls = [];
    let results;
    while ((results = urlRegex.exec(text)) !== null) {
        const url = results[0];
        if (!url) {
            continue;
        }
        urls.push(url);
    }
    return urls;
}
exports.parseURLsFromText = parseURLsFromText;
//# sourceMappingURL=urls.js.map
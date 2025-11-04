"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = void 0;
function delay(duration) {
    return new Promise(function (resolve) { return setTimeout(resolve, duration); });
}
exports.delay = delay;
//# sourceMappingURL=utils.js.map
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AidaPOV = void 0;
var commands_1 = require("./commands");
var requestToken_1 = require("./requestToken");
var AidaPOV = /** @class */ (function () {
    function AidaPOV(ip, username, password) {
        var _this = this;
        this.ip = ip;
        this.ready = false;
        this._onError = null;
        this.ip = ip;
        (0, requestToken_1.requestToken)(ip, username, password).then(function (_a) {
            var valid = _a.valid, login = _a.login;
            if (!valid)
                _this.throwError(new Error('Invalid login credentials'));
            _this.token = login;
            _this.ready = true;
        });
    }
    AidaPOV.prototype.setExposureMode = function (mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { exposure_mode: mode },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.exposure_mode) === mode];
                }
            });
        });
    };
    AidaPOV.prototype.getExposureMode = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { exposure_mode: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.exposure_mode];
                }
            });
        });
    };
    AidaPOV.prototype.setShutter = function (shutter) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { shutter: commands_1.SHUTTER[shutter] },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.shutter) === commands_1.SHUTTER[shutter]];
                }
            });
        });
    };
    AidaPOV.prototype.getShutter = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { shutter: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        if (isNaN((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.shutter))
                            return [2 /*return*/, null];
                        return [2 /*return*/, Object.keys(commands_1.SHUTTER).find(function (key) {
                                return commands_1.SHUTTER[key] === response.image.shutter;
                            })];
                }
            });
        });
    };
    AidaPOV.prototype.setExposureGain = function (gain) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { gain: commands_1.GAIN[gain] },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.gain) === commands_1.GAIN[gain]];
                }
            });
        });
    };
    AidaPOV.prototype.getExposureGain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { gain: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        if (isNaN((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.gain))
                            return [2 /*return*/, null];
                        return [2 /*return*/, Object.keys(commands_1.GAIN).find(function (key) { return commands_1.GAIN[key] === response.image.gain; })];
                }
            });
        });
    };
    AidaPOV.prototype.setAntiFlicker = function (frequency) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { anti_flicker: commands_1.ANTIFLICKER[frequency] },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.anti_flicker) === commands_1.ANTIFLICKER[frequency]];
                }
            });
        });
    };
    AidaPOV.prototype.getAntiFlicker = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { anti_flicker: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        if (isNaN((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.anti_flicker))
                            return [2 /*return*/, null];
                        return [2 /*return*/, Object.keys(commands_1.ANTIFLICKER).find(function (key) {
                                return commands_1.ANTIFLICKER[key] ===
                                    response.image.anti_flicker;
                            })];
                }
            });
        });
    };
    AidaPOV.prototype.setWhiteBalanceMode = function (mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { WB_mode: mode },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.WB_mode) === mode];
                }
            });
        });
    };
    AidaPOV.prototype.getWhiteBalanceMode = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { WB_mode: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.WB_mode];
                }
            });
        });
    };
    AidaPOV.prototype.setRedGain = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { R_gain: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.R_gain) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getRedGain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { R_gain: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.R_gain];
                }
            });
        });
    };
    AidaPOV.prototype.setBlueGain = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { B_gain: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.B_gain) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getBlueGain = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { B_gain: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.B_gain];
                }
            });
        });
    };
    AidaPOV.prototype.setColorTemperature = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (value < 1800 || value > 10000) {
                            this.throwError(new Error('Color temperature must be between 1800 and 10000'));
                        }
                        body = {
                            image: { color_temperature: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.color_temperature) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getColorTemperature = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { color_temperature: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.color_temperature];
                }
            });
        });
    };
    AidaPOV.prototype.setMirror = function (enabled) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { mirror: enabled ? 1 : 0 },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.mirror) === (enabled ? 1 : 0)];
                }
            });
        });
    };
    AidaPOV.prototype.getMirror = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { mirror: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.mirror) === 1];
                }
            });
        });
    };
    AidaPOV.prototype.setFlip = function (enabled) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { flip: enabled ? 1 : 0 },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.flip) === (enabled ? 1 : 0)];
                }
            });
        });
    };
    AidaPOV.prototype.getFlip = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { flip: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.flip) === 1];
                }
            });
        });
    };
    AidaPOV.prototype.setBacklightCompensation = function (enabled) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { backlight_compensation: enabled ? 1 : 0 },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.backlight_compensation) === (enabled ? 1 : 0)];
                }
            });
        });
    };
    AidaPOV.prototype.getBacklightCompensation = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { backlight_compensation: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.backlight_compensation) === 1];
                }
            });
        });
    };
    AidaPOV.prototype.setGamma = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { gamma: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.gamma) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getGamma = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { gamma: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.gamma];
                }
            });
        });
    };
    AidaPOV.prototype.setWideDynamicRange = function (mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: mode == 'Off'
                                ? { WDR_enable: 0, WDR_level: 1 }
                                : { WDR_enable: 1, WDR_level: mode },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.WDR_mode) === mode];
                }
            });
        });
    };
    AidaPOV.prototype.getWideDynamicRange = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            image: { WDR_enable: true, WDR_level: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _c.sent();
                        if (((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.WDR_enable) === 0)
                            return [2 /*return*/, 'Off'];
                        return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.image) === null || _b === void 0 ? void 0 : _b.WDR_level];
                }
            });
        });
    };
    AidaPOV.prototype.setBrightness = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { brightness: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.brightness) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getBrightness = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { brightness: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.brightness];
                }
            });
        });
    };
    AidaPOV.prototype.setSharpness = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { sharpness: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.sharpness) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getSharpness = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { sharpness: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.sharpness];
                }
            });
        });
    };
    AidaPOV.prototype.setContrast = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { contrast: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.contrast) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getContrast = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { contrast: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.contrast];
                }
            });
        });
    };
    AidaPOV.prototype.setSaturation = function (value) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { saturation: value },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.saturation) === value];
                }
            });
        });
    };
    AidaPOV.prototype.getSaturation = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { saturation: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.saturation];
                }
            });
        });
    };
    AidaPOV.prototype.set2dNoiseReduction = function (enabled) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { noise_reduction_2D: enabled ? 1 : 0 },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.noise_reduction_2D) === (enabled ? 1 : 0)];
                }
            });
        });
    };
    AidaPOV.prototype.get2dNoiseReduction = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { noise_reduction_2D: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, ((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.noise_reduction_2D) === 1];
                }
            });
        });
    };
    AidaPOV.prototype.set3dNoiseReduction = function (mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { noise_reduction_3D: commands_1.NOISEREDUCTION3D_MODE[mode] },
                        };
                        return [4 /*yield*/, this.request('set', body)];
                    case 1:
                        response = _b.sent();
                        return [2 /*return*/, (((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.noise_reduction_3D) === commands_1.NOISEREDUCTION3D_MODE[mode])];
                }
            });
        });
    };
    AidaPOV.prototype.get3dNoiseReduction = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = {
                            image: { noise_reduction_3D: true },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _b.sent();
                        if (isNaN((_a = response === null || response === void 0 ? void 0 : response.image) === null || _a === void 0 ? void 0 : _a.noise_reduction_3D))
                            return [2 /*return*/, null];
                        return [2 /*return*/, Object.keys(commands_1.NOISEREDUCTION3D_MODE).find(function (key) {
                                return commands_1.NOISEREDUCTION3D_MODE[key] === response.image.noise_reduction_3D;
                            })];
                }
            });
        });
    };
    AidaPOV.prototype.getRTSPUrl = function (type) {
        var _a, _b;
        if (type === void 0) { type = 'main'; }
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            venc: { main: type === 'main', sub: type === 'sub' },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, (_b = (_a = response === null || response === void 0 ? void 0 : response.venc) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.rtspUrl];
                }
            });
        });
    };
    AidaPOV.prototype.getRTMPUrl = function (type) {
        var _a, _b;
        if (type === void 0) { type = 'main'; }
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            venc: { main: type === 'main', sub: type === 'sub' },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, (_b = (_a = response === null || response === void 0 ? void 0 : response.venc) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.rtmpUrl];
                }
            });
        });
    };
    AidaPOV.prototype.getFLVUrl = function (type) {
        var _a, _b;
        if (type === void 0) { type = 'main'; }
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            venc: { main: type === 'main', sub: type === 'sub' },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, (_b = (_a = response === null || response === void 0 ? void 0 : response.venc) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.httpFlvUrl];
                }
            });
        });
    };
    AidaPOV.prototype.getWebRTCUrl = function (type) {
        var _a, _b;
        if (type === void 0) { type = 'main'; }
        return __awaiter(this, void 0, void 0, function () {
            var body, response;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        body = {
                            venc: { main: type === 'main', sub: type === 'sub' },
                        };
                        return [4 /*yield*/, this.request('get', body)];
                    case 1:
                        response = _c.sent();
                        return [2 /*return*/, (_b = (_a = response === null || response === void 0 ? void 0 : response.venc) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.webRtcUrl];
                }
            });
        });
    };
    AidaPOV.prototype.throwError = function (error) {
        if (typeof this._onError === 'function')
            return this._onError(error);
        throw error;
    };
    AidaPOV.prototype.onError = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._onError = callback;
                return [2 /*return*/];
            });
        });
    };
    AidaPOV.prototype.whenReady = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this.ready)
                    return [2 /*return*/];
                return [2 /*return*/, new Promise(function (resolve) {
                        var interval = setInterval(function () {
                            if (!_this.ready)
                                return;
                            clearInterval(interval);
                            resolve();
                        }, 100);
                    })];
            });
        });
    };
    AidaPOV.prototype.request = function (func, bodyData) {
        return __awaiter(this, void 0, void 0, function () {
            var endPoint, body, request, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        endPoint = "http://".concat(this.ip, "/cgi-bin/web.fcgi?func=").concat(func);
                        body = __assign({ key: this.token }, bodyData);
                        return [4 /*yield*/, fetch(endPoint, {
                                method: 'POST',
                                body: JSON.stringify(body),
                            })];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, request.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3:
                        error_1 = _a.sent();
                        this.throwError(error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AidaPOV;
}());
exports.AidaPOV = AidaPOV;
//# sourceMappingURL=AidaPOV.js.map
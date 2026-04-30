"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerEnum = exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum[GenderEnum["male"] = 0] = "male";
    GenderEnum[GenderEnum["female"] = 1] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var providerEnum;
(function (providerEnum) {
    providerEnum["system"] = "system";
    providerEnum["google"] = "google";
})(providerEnum || (exports.providerEnum = providerEnum = {}));

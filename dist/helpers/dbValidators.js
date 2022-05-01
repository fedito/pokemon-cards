"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hpIsValid = void 0;
const hpIsValid = (hp) => {
    if ((Number(hp) % 10) != 0) {
        throw new Error(`Hp : ${hp} must be multiple of 10`);
    }
};
exports.hpIsValid = hpIsValid;
//# sourceMappingURL=dbValidators.js.map
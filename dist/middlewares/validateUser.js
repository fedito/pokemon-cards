"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNotAuthenticated = exports.checkAuthenticated = void 0;
const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ msg: `User is not authenticated, redirect to login` });
};
exports.checkAuthenticated = checkAuthenticated;
const checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return res
            .status(401)
            .json({ msg: `User: ${req.user.username} is already authenticated, redirect to home` });
    }
    next();
};
exports.checkNotAuthenticated = checkNotAuthenticated;
//# sourceMappingURL=validateUser.js.map
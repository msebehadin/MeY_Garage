"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredRole = void 0;
const requiredRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'unauthorized' });
        }
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                message: 'forbidden:insufficient role'
            });
        }
        next();
    };
};
exports.requiredRole = requiredRole;

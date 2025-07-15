"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
const apiKeyAuth = (req, res, next) => {
    const clientKey = req.headers['x-api-key'];
    if (!clientKey || clientKey !== process.env.PAIR_PLAY_USER_ENGAGEMENT_SERVICES_API_KEY) {
        return res.status(403).json({ message: 'Forbidden: Invalid API key' });
    }
    next();
};
exports.apiKeyAuth = apiKeyAuth;

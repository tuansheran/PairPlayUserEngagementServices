"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userFeed_1 = __importDefault(require("./route/userFeed"));
const uploadProfilePhoto_1 = __importDefault(require("./route/uploadProfilePhoto"));
const apiKeyAuth_1 = require("./middleware/apiKeyAuth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.set('trust proxy', true);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/', apiKeyAuth_1.apiKeyAuth, userFeed_1.default);
app.use('/', apiKeyAuth_1.apiKeyAuth, uploadProfilePhoto_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

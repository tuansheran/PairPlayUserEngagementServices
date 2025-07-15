"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middleware/multer"));
const cloudinary_1 = __importDefault(require("../services/cloudinary/cloudinary"));
const router = express_1.default.Router();
router.post('/upload', multer_1.default.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const buffer = (_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer;
        if (!buffer)
            return res.status(400).send('No file uploaded');
        const base64Image = buffer.toString('base64');
        const dataURI = `data:${(_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype};base64,${base64Image}`;
        const result = yield cloudinary_1.default.uploader.upload(dataURI, {
            folder: 'my_uploads'
        });
        res.json({ imageUrl: result.secure_url });
    }
    catch (error) {
        console.error('Upload failed', error);
        res.status(500).send('Upload error');
    }
}));
exports.default = router;

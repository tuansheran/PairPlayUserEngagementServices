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
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamoClient_1 = require("../services/aws/dynamoClient");
const lodash_1 = __importDefault(require("lodash"));
const router = express_1.default.Router();
const TABLE_NAME = 'DateIdeas';
router.get('/userFeed', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const command = new lib_dynamodb_1.ScanCommand({
            TableName: TABLE_NAME,
        });
        const result = yield dynamoClient_1.ddb.send(command);
        const allItems = result.Items || [];
        const randomItems = lodash_1.default.sampleSize(allItems, 50);
        res.status(200).json({
            ideas: randomItems,
        });
    }
    catch (error) {
        console.error("Error fetching ideas from DynamoDB", error);
        res.status(500).json({ error: 'Failed to fetch ideas' });
    }
}));
exports.default = router;

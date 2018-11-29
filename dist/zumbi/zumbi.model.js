"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const zumbiSchema = new mongoose_1.default.Schema({
    weapon: {
        type: String,
        required: true
    },
    armor: {
        type: String,
        required: true
    }
});
exports.Zumbi = mongoose_1.default.model('Zumbi', zumbiSchema);

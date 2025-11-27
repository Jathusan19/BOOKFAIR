"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stall_controller_1 = require("../controllers/stall.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.get('/', auth_middleware_1.protect, stall_controller_1.getStalls);
router.get('/map', auth_middleware_1.protect, stall_controller_1.getStallsMap);
exports.default = router;

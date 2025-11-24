"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = express_1.default.Router();
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.get('/me', auth_middleware_1.protect, auth_controller_1.getMe);
router.put('/users/me/genres', auth_middleware_1.protect, auth_controller_1.updateGenres); // Placing it here as requested in 2.5, though URL structure is slightly different in request. 
// Request said PUT /api/users/me/genres. I'll map it in app.ts or here.
// Let's keep it simple and maybe add a separate user route file if needed, but for now auth routes can handle user profile stuff.
exports.default = router;

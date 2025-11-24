"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const stall_routes_1 = __importDefault(require("./routes/stall.routes"));
const reservation_routes_1 = __importDefault(require("./routes/reservation.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [env_1.config.clientVendorUrl, env_1.config.clientEmployeeUrl],
    credentials: true
}));
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/stalls', stall_routes_1.default);
app.use('/api/reservations', reservation_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.get('/', (req, res) => {
    res.send('API is running...');
});
exports.default = app;

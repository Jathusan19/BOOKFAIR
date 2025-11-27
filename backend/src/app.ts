import express from 'express';
import cors from 'cors';
import { config } from './config/env';
import authRoutes from './routes/auth.routes';
import stallRoutes from './routes/stall.routes';
import reservationRoutes from './routes/reservation.routes';
import adminRoutes from './routes/admin.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: [config.clientVendorUrl, config.clientEmployeeUrl],
    credentials: true
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stalls', stallRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

export default app;

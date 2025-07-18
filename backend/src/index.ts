import express from 'express';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profile';
import missionRoutes from './routes/missions';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);
app.use('/missions', missionRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

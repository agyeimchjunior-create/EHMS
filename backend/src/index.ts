import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock DB Models
const mockedHospitals = [
  { id: '1', name: 'General Hospital, Ikeja', lat: 6.5244, lng: 3.3792, availableBeds: 45, icu: 12 },
  { id: '2', name: 'St. Nicholas Hospital', lat: 6.4449, lng: 3.4111, availableBeds: 12, icu: 2 },
];

const mockedAmbulances = [
  { id: '1', license_plate: 'EPE-123-AA', lat: 6.5100, lng: 3.3800, status: 'idle' },
  { id: '2', license_plate: 'LSD-456-BB', lat: 6.4500, lng: 3.4000, status: 'en_route' },
];

// Routes

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'EHMS Core API is running gracefully', uptime: process.uptime() });
});

app.get('/api/hospitals/nearest', (req: Request, res: Response) => {
  const { lat, lng, radius } = req.query;
  // TODO: PostGIS algorithm. Right now we return all for MVP.
  res.json({ data: mockedHospitals, msg: 'Fetched nearest hospitals' });
});

app.get('/api/ambulances/nearest', (req: Request, res: Response) => {
  const { lat, lng } = req.query;
  res.json({ data: mockedAmbulances.filter(a => a.status === 'idle'), msg: 'Available ambulances' });
});

app.post('/api/emergencies', (req: Request, res: Response) => {
  const { userId, lat, lng, severity } = req.body;
  // Basic Dispatch Logic:
  const assignedAmbulance = mockedAmbulances.find(a => a.status === 'idle');
  const targetHospital = mockedHospitals[0]; // Nearest heuristic

  if (assignedAmbulance) assignedAmbulance.status = 'assigned';

  res.json({
    data: {
      emergencyId: (Math.random() * 1000).toString(),
      status: 'assigned',
      assignedAmbulance,
      targetHospital,
      eta: '6 mins'
    },
    msg: 'Emergency dispatched successfully'
  });
});

app.post('/api/partners/capacity', (req: Request, res: Response) => {
  // Update hospital capacity from partner dashboard
  const { hospitalId, beds, icu } = req.body;
  const hp = mockedHospitals.find(h => h.id === hospitalId);
  if (hp) {
    hp.availableBeds = beds;
    hp.icu = icu;
    return res.json({ data: hp, msg: 'Capacity synced globally' });
  }
  res.status(404).json({ error: 'Hospital not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 EHMS Core API listening securely on port ${PORT}`);
});

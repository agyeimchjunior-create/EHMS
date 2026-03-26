-- EHMS Core Database Schema (Supabase/PostgreSQL)

-- ENUMS
CREATE TYPE role_type AS ENUM ('citizen', 'admin', 'hospital_partner', 'pharmacy_partner', 'ambulance_partner');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled', 'past_due');
CREATE TYPE emergency_status AS ENUM ('pending', 'assigned', 'en_route', 'arrived', 'resolved', 'cancelled');
CREATE TYPE payment_gateway AS ENUM ('square', 'paystack', 'stripe');

-- USERS TABLE
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role role_type DEFAULT 'citizen',
  blood_group VARCHAR(5),
  medical_history TEXT,
  allergies TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SUBSCRIPTIONS
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status subscription_status DEFAULT 'inactive',
  plan_name VARCHAR(100) NOT NULL,
  payment_gateway payment_gateway,
  gateway_subscription_id VARCHAR(255),
  current_period_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HOSPITALS
CREATE TABLE hospitals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- HOSPITAL CAPACITY
CREATE TABLE hospital_capacity (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hospital_id UUID REFERENCES hospitals(id) ON DELETE CASCADE UNIQUE,
  total_beds INT DEFAULT 0,
  available_beds INT DEFAULT 0,
  total_icu INT DEFAULT 0,
  available_icu INT DEFAULT 0,
  doctors_on_duty INT DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AMBULANCES
CREATE TABLE ambulances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES users(id),
  license_plate VARCHAR(50) UNIQUE NOT NULL,
  vehicle_type VARCHAR(100), -- Basic Life Support, Advanced Life Support
  is_active BOOLEAN DEFAULT FALSE,
  current_status VARCHAR(50) DEFAULT 'offline' -- offline, idle, assigned, en_route
);

-- AMBULANCE LOCATIONS (Real-time tracking)
CREATE TABLE ambulance_locations (
  ambulance_id UUID REFERENCES ambulances(id) PRIMARY KEY,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  heading INT DEFAULT 0,
  speed DOUBLE PRECISION DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- EMERGENCY REQUESTS
CREATE TABLE emergency_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  patient_lat DOUBLE PRECISION NOT NULL,
  patient_lng DOUBLE PRECISION NOT NULL,
  status emergency_status DEFAULT 'pending',
  assigned_ambulance_id UUID REFERENCES ambulances(id),
  target_hospital_id UUID REFERENCES hospitals(id),
  severity VARCHAR(50) DEFAULT 'critical',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- PHARMACIES
CREATE TABLE pharmacies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  partner_id UUID REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);

-- PHARMACY INVENTORY
CREATE TABLE pharmacy_inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pharmacy_id UUID REFERENCES pharmacies(id) ON DELETE CASCADE,
  medicine_name VARCHAR(255) NOT NULL,
  quantity_in_stock INT DEFAULT 0,
  price DECIMAL(10, 2),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PARTNER APPLICATIONS
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  type VARCHAR(50) NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- PARTNERS
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  secret_id VARCHAR(50) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES for geolocation queries (PostGIS is recommended, but using B-Tree for simple numeric bounding box queries if not available)
CREATE INDEX idx_hospital_location ON hospitals(latitude, longitude);
CREATE INDEX idx_ambulance_location ON ambulance_locations(latitude, longitude);
CREATE INDEX idx_pharmacy_location ON pharmacies(latitude, longitude);

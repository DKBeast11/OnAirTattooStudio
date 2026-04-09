CREATE TABLE IF NOT EXISTS artists (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT,
  specialties TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('tattoo', 'piercing')),
  duration_min INTEGER NOT NULL DEFAULT 60,
  price_from NUMERIC(8,2),
  active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  artist_id INTEGER REFERENCES artists(id),
  service_id INTEGER REFERENCES services(id),
  style TEXT,
  message TEXT,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_min INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS blocked_slots (
  id SERIAL PRIMARY KEY,
  artist_id INTEGER REFERENCES artists(id),
  blocked_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  reason TEXT,
  all_day BOOLEAN DEFAULT false
);

CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_artist ON appointments(artist_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_blocked_slots_date ON blocked_slots(blocked_date, artist_id);

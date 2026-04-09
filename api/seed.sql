-- Artists
INSERT INTO artists (name, handle, specialties) VALUES
  ('El Chicano', '@elchicano_ink', ARRAY['Blackwork', 'Fine Line', 'Botanico', 'Geometrico']),
  ('Nyx Line', '@nyxline_ink', ARRAY['Realismo', 'Retrato', 'Claroscuro', 'Wildlife']),
  ('Tati Tattoo', '@tatitattoo.inkk', ARRAY['Neo-Trad', 'Japones', 'Color', 'Mangas']);

-- Services
INSERT INTO services (name, category, duration_min, price_from) VALUES
  ('Tatuaje pequeño', 'tattoo', 60, 80),
  ('Tatuaje mediano', 'tattoo', 120, 150),
  ('Tatuaje grande', 'tattoo', 180, 300),
  ('Sesión manga/espalda', 'tattoo', 240, 400),
  ('Piercing lóbulo', 'piercing', 30, 25),
  ('Piercing cartílago', 'piercing', 30, 35),
  ('Piercing nariz/septum', 'piercing', 30, 40);

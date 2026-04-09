import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { query } from './db.js';

const app = new Hono();

// ─── MIDDLEWARE ───
app.use('*', cors());

// Simple admin auth middleware
const adminAuth = async (c, next) => {
  const pw = c.req.header('X-Admin-Password');
  if (pw !== (process.env.ADMIN_PASSWORD || 'onair2024')) {
    return c.json({ error: 'No autorizado' }, 401);
  }
  await next();
};

// ─── HEALTH ───
app.get('/api/health', (c) => c.json({ status: 'ok' }));

// ─── ARTISTS (public) ───
app.get('/api/artists', async (c) => {
  const { rows } = await query('SELECT id, name, handle, specialties FROM artists WHERE active = true ORDER BY id');
  return c.json(rows);
});

// ─── SERVICES (public) ───
app.get('/api/services', async (c) => {
  const { rows } = await query('SELECT id, name, category, duration_min, price_from FROM services WHERE active = true ORDER BY category, id');
  return c.json(rows);
});

// ─── AVAILABLE SLOTS (public) ───
// GET /api/slots?date=2026-04-15&artist_id=1
app.get('/api/slots', async (c) => {
  const date = c.req.query('date');
  const artistId = c.req.query('artist_id');

  if (!date) return c.json({ error: 'date es obligatorio' }, 400);

  // Studio hours: 10:00 - 20:00, slots every 60 min
  const allSlots = [];
  for (let h = 10; h < 20; h++) {
    allSlots.push(`${String(h).padStart(2, '0')}:00`);
  }

  // Check day of week (0=Sun, 6=Sat) — closed Sunday & Monday
  const dow = new Date(date + 'T12:00:00').getDay();
  if (dow === 0 || dow === 1) {
    return c.json({ date, slots: [] });
  }

  // Get booked slots
  let bookedQuery = `
    SELECT appointment_time::text as time FROM appointments
    WHERE appointment_date = $1 AND status IN ('pending', 'confirmed')`;
  const params = [date];

  if (artistId) {
    bookedQuery += ` AND artist_id = $2`;
    params.push(artistId);
  }

  const booked = await query(bookedQuery, params);
  const bookedTimes = new Set(booked.rows.map(r => r.time.slice(0, 5)));

  // Get blocked slots
  let blockedQuery = `
    SELECT start_time::text as start, end_time::text as end, all_day
    FROM blocked_slots WHERE blocked_date = $1`;
  const blockedParams = [date];

  if (artistId) {
    blockedQuery += ` AND artist_id = $2`;
    blockedParams.push(artistId);
  }

  const blocked = await query(blockedQuery, blockedParams);
  const blockedAllDay = blocked.rows.some(r => r.all_day);

  if (blockedAllDay) {
    return c.json({ date, slots: [] });
  }

  const blockedTimes = new Set();
  blocked.rows.forEach(r => {
    if (r.start && r.end) {
      const startH = parseInt(r.start.slice(0, 2));
      const endH = parseInt(r.end.slice(0, 2));
      for (let h = startH; h < endH; h++) {
        blockedTimes.add(`${String(h).padStart(2, '0')}:00`);
      }
    }
  });

  const available = allSlots.filter(s => !bookedTimes.has(s) && !blockedTimes.has(s));
  return c.json({ date, slots: available });
});

// ─── CREATE APPOINTMENT (public — client booking) ───
app.post('/api/appointments', async (c) => {
  const body = await c.req.json();
  const { client_name, client_email, client_phone, artist_id, service_id, style, message, appointment_date, appointment_time } = body;

  if (!client_name || !client_email || !appointment_date || !appointment_time) {
    return c.json({ error: 'Faltan campos obligatorios (nombre, email, fecha, hora)' }, 400);
  }

  // Check slot is available
  const conflict = await query(
    `SELECT id FROM appointments
     WHERE appointment_date = $1 AND appointment_time = $2 AND artist_id = $3
     AND status IN ('pending', 'confirmed')`,
    [appointment_date, appointment_time, artist_id || null]
  );

  if (conflict.rows.length > 0) {
    return c.json({ error: 'Ese horario ya no está disponible' }, 409);
  }

  const { rows } = await query(
    `INSERT INTO appointments (client_name, client_email, client_phone, artist_id, service_id, style, message, appointment_date, appointment_time)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, status, created_at`,
    [client_name, client_email, client_phone || null, artist_id || null, service_id || null, style || null, message || null, appointment_date, appointment_time]
  );

  return c.json({ ok: true, appointment: rows[0] }, 201);
});

// ─── ADMIN: LIST APPOINTMENTS ───
// GET /api/admin/appointments?date=2026-04-15&status=pending
app.get('/api/admin/appointments', adminAuth, async (c) => {
  const date = c.req.query('date');
  const status = c.req.query('status');
  const from = c.req.query('from');
  const to = c.req.query('to');

  let sql = `
    SELECT a.*, ar.name as artist_name, s.name as service_name
    FROM appointments a
    LEFT JOIN artists ar ON a.artist_id = ar.id
    LEFT JOIN services s ON a.service_id = s.id
    WHERE 1=1`;
  const params = [];

  if (date) {
    params.push(date);
    sql += ` AND a.appointment_date = $${params.length}`;
  }
  if (from && to) {
    params.push(from, to);
    sql += ` AND a.appointment_date BETWEEN $${params.length - 1} AND $${params.length}`;
  }
  if (status) {
    params.push(status);
    sql += ` AND a.status = $${params.length}`;
  }

  sql += ' ORDER BY a.appointment_date, a.appointment_time';

  const { rows } = await query(sql, params);
  return c.json(rows);
});

// ─── ADMIN: UPDATE APPOINTMENT STATUS ───
app.patch('/api/admin/appointments/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const { status, admin_notes } = body;

  const fields = [];
  const params = [];

  if (status) {
    params.push(status);
    fields.push(`status = $${params.length}`);
  }
  if (admin_notes !== undefined) {
    params.push(admin_notes);
    fields.push(`admin_notes = $${params.length}`);
  }

  if (fields.length === 0) return c.json({ error: 'Nada que actualizar' }, 400);

  fields.push('updated_at = now()');
  params.push(id);

  const { rows } = await query(
    `UPDATE appointments SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`,
    params
  );

  if (rows.length === 0) return c.json({ error: 'Cita no encontrada' }, 404);
  return c.json(rows[0]);
});

// ─── ADMIN: DELETE APPOINTMENT ───
app.delete('/api/admin/appointments/:id', adminAuth, async (c) => {
  const id = c.req.param('id');
  const { rowCount } = await query('DELETE FROM appointments WHERE id = $1', [id]);
  if (rowCount === 0) return c.json({ error: 'Cita no encontrada' }, 404);
  return c.json({ ok: true });
});

// ─── ADMIN: BLOCK SLOTS ───
app.post('/api/admin/blocked-slots', adminAuth, async (c) => {
  const { artist_id, blocked_date, start_time, end_time, reason, all_day } = await c.req.json();
  if (!artist_id || !blocked_date) return c.json({ error: 'artist_id y blocked_date obligatorios' }, 400);

  const { rows } = await query(
    `INSERT INTO blocked_slots (artist_id, blocked_date, start_time, end_time, reason, all_day)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [artist_id, blocked_date, start_time || null, end_time || null, reason || null, all_day || false]
  );
  return c.json(rows[0], 201);
});

app.get('/api/admin/blocked-slots', adminAuth, async (c) => {
  const from = c.req.query('from');
  const to = c.req.query('to');
  let sql = 'SELECT bs.*, a.name as artist_name FROM blocked_slots bs JOIN artists a ON bs.artist_id = a.id';
  const params = [];
  if (from && to) {
    params.push(from, to);
    sql += ` WHERE bs.blocked_date BETWEEN $1 AND $2`;
  }
  sql += ' ORDER BY bs.blocked_date';
  const { rows } = await query(sql, params);
  return c.json(rows);
});

app.delete('/api/admin/blocked-slots/:id', adminAuth, async (c) => {
  const { rowCount } = await query('DELETE FROM blocked_slots WHERE id = $1', [c.req.param('id')]);
  if (rowCount === 0) return c.json({ error: 'No encontrado' }, 404);
  return c.json({ ok: true });
});

// ─── ADMIN: MANAGE ARTISTS ───
app.post('/api/admin/artists', adminAuth, async (c) => {
  const { name, handle, specialties } = await c.req.json();
  const { rows } = await query(
    'INSERT INTO artists (name, handle, specialties) VALUES ($1, $2, $3) RETURNING *',
    [name, handle || null, specialties || []]
  );
  return c.json(rows[0], 201);
});

app.patch('/api/admin/artists/:id', adminAuth, async (c) => {
  const { name, handle, specialties, active } = await c.req.json();
  const fields = [];
  const params = [];
  if (name) { params.push(name); fields.push(`name = $${params.length}`); }
  if (handle !== undefined) { params.push(handle); fields.push(`handle = $${params.length}`); }
  if (specialties) { params.push(specialties); fields.push(`specialties = $${params.length}`); }
  if (active !== undefined) { params.push(active); fields.push(`active = $${params.length}`); }
  if (fields.length === 0) return c.json({ error: 'Nada que actualizar' }, 400);
  params.push(c.req.param('id'));
  const { rows } = await query(`UPDATE artists SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`, params);
  if (rows.length === 0) return c.json({ error: 'Artista no encontrado' }, 404);
  return c.json(rows[0]);
});

// ─── START ───
const port = parseInt(process.env.PORT || '3001');
console.log(`🔴 OnAir API running on :${port}`);
serve({ fetch: app.fetch, port });

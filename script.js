// ─── CURSOR ───
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  }, 80);
});
document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%,-50%) scale(1.8)');
document.addEventListener('mouseup',   () => cursor.style.transform = 'translate(-50%,-50%) scale(1)');

// ─── GALLERY DATA ───
const galleryItems = [
  { style:'blackwork', artist:'Mara Solano', title:'Serpiente lunar', h:320, hue:'#1a1a18' },
  { style:'fineline',  artist:'Mara Solano', title:'Rosa geométrica', h:240, hue:'#181818' },
  { style:'realism',   artist:'Dani Roca',   title:'Retrato femenino', h:400, hue:'#1c1a18' },
  { style:'neo-trad',  artist:'Iker Valls',  title:'Koi tradicional', h:280, hue:'#1a1c18' },
  { style:'geometric', artist:'Mara Solano', title:'Mandala oscuro', h:260, hue:'#19191a' },
  { style:'japanese',  artist:'Iker Valls',  title:'Dragón clásico', h:360, hue:'#181c1a' },
  { style:'blackwork', artist:'Dani Roca',   title:'Bosque abstracto', h:200, hue:'#1a1818' },
  { style:'fineline',  artist:'Mara Solano', title:'Constellation', h:300, hue:'#18181c' },
  { style:'realism',   artist:'Dani Roca',   title:'Lobo nocturno', h:380, hue:'#1c1818' },
  { style:'neo-trad',  artist:'Iker Valls',  title:'Pantera art', h:260, hue:'#1a1a1c' },
  { style:'geometric', artist:'Mara Solano', title:'Sacred geometry', h:320, hue:'#181a18' },
  { style:'japanese',  artist:'Iker Valls',  title:'Hannya mask', h:350, hue:'#1c1a1c' },
];

// SVG patterns for gallery placeholder art
const patterns = [
  (c, w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${c}"/>
    <circle cx="${w/2}" cy="${h/2}" r="${Math.min(w,h)*0.3}" fill="none" stroke="#333" stroke-width="1.5"/>
    <circle cx="${w/2}" cy="${h/2}" r="${Math.min(w,h)*0.18}" fill="none" stroke="#2a2a2a" stroke-width="1"/>
    <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#2a2a2a" stroke-width="0.5"/>
    <line x1="${w/2}" y1="0" x2="${w/2}" y2="${h}" stroke="#2a2a2a" stroke-width="0.5"/>
    <text x="${w/2}" y="${h-16}" text-anchor="middle" fill="#3a3a38" font-size="9" font-family="monospace" letter-spacing="3">ON AIR</text>
  </svg>`,
  (c, w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${c}"/>
    ${Array.from({length:8},(_,i)=>`<line x1="${w/2}" y1="${h/2}" x2="${w/2+Math.cos(i*Math.PI/4)*Math.min(w,h)*0.4}" y2="${h/2+Math.sin(i*Math.PI/4)*Math.min(w,h)*0.4}" stroke="#333" stroke-width="1"/>`).join('')}
    <circle cx="${w/2}" cy="${h/2}" r="6" fill="#c0392b"/>
    <text x="${w/2}" y="${h-16}" text-anchor="middle" fill="#3a3a38" font-size="9" font-family="monospace" letter-spacing="3">ON AIR</text>
  </svg>`,
  (c, w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${w}" height="${h}" fill="${c}"/>
    <rect x="${w*0.2}" y="${h*0.2}" width="${w*0.6}" height="${h*0.6}" fill="none" stroke="#2e2e2a" stroke-width="1"/>
    <rect x="${w*0.3}" y="${h*0.3}" width="${w*0.4}" height="${h*0.4}" fill="none" stroke="#3a3a36" stroke-width="1"/>
    <rect x="${w*0.4}" y="${h*0.4}" width="${w*0.2}" height="${h*0.2}" fill="#2a2a28"/>
    <text x="${w/2}" y="${h-16}" text-anchor="middle" fill="#3a3a38" font-size="9" font-family="monospace" letter-spacing="3">ON AIR</text>
  </svg>`,
];

const grid = document.getElementById('galleryGrid');
galleryItems.forEach((item, i) => {
  const cell = document.createElement('div');
  cell.className = 'gallery-item';
  cell.dataset.style = item.style;
  const pat = patterns[i % patterns.length];
  cell.innerHTML = `
    <div class="gallery-img-mock">${pat(item.hue, 300, item.h)}</div>
    <div class="gallery-overlay">
      <div class="gallery-overlay-title">${item.title}</div>
      <div class="gallery-overlay-meta">${item.artist} · ${item.style}</div>
    </div>`;
  grid.appendChild(cell);
});

// Filter buttons
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.style === filter) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── ARTISTS DATA ───
const artists = [
  {
    initials: 'MS',
    name: 'Mara Solano',
    style: 'Blackwork · Fine Line',
    bio: 'Formada en Barcelona y Berlín. Especializada en blackwork orgánico y fine line botánico. Sus diseños combinan precisión quirúrgica con sensibilidad poética.',
    tags: ['Blackwork', 'Fine Line', 'Botánico', 'Geométrico'],
    works: ['Serpiente lunar', 'Rosa geométrica', 'Mandala oscuro'],
    color: '#1e1e1c',
  },
  {
    initials: 'DR',
    name: 'Dani Roca',
    style: 'Realismo · Retrato',
    bio: 'Autodidacta durante 12 años. Maestro del claroscuro y el retrato hiperrealista. Ha trabajado en estudios de Londres y Nueva York antes de unirse a OnAir.',
    tags: ['Realismo', 'Retrato', 'Claroscuro', 'Wildlife'],
    works: ['Retrato femenino', 'Lobo nocturno', 'Bosque abstracto'],
    color: '#1c1e1c',
  },
  {
    initials: 'IV',
    name: 'Iker Valls',
    style: 'Neo-tradicional · Japonés',
    bio: 'Con raíces en el tatuaje tradicional americano y japonés, Iker reinterpreta los clásicos con una paleta contemporánea y líneas de fuerza excepcional.',
    tags: ['Neo-trad', 'Japonés', 'Color', 'Mangas'],
    works: ['Koi tradicional', 'Dragón clásico', 'Hannya mask'],
    color: '#1c1c1e',
  },
];

const artistsGrid = document.getElementById('artistsGrid');
artists.forEach(a => {
  const card = document.createElement('div');
  card.className = 'artist-card';
  card.innerHTML = `
    <div class="artist-portrait" style="background:${a.color};">
      <div class="artist-initials">${a.initials}</div>
    </div>
    <div class="artist-strip">
      <div class="artist-name">${a.name}</div>
      <div class="artist-style">${a.style}</div>
      <div class="artist-bio">${a.bio}</div>
      <div class="artist-tags">${a.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </div>
    <div class="artist-recent-work">
      <div class="artist-work-title">Últimos trabajos</div>
      <div class="artist-work-grid">
        ${a.works.map(w => `
          <div class="work-thumb">
            <div class="work-thumb-inner">${w.substring(0,6)}…</div>
          </div>`).join('')}
      </div>
    </div>`;
  artistsGrid.appendChild(card);
});

// ─── CALENDAR ───
const calendarEl = document.getElementById('calendar');
let currentMonth = new Date().getMonth();
let currentYear  = new Date().getFullYear();
let selectedDate = null;
let selectedTime = null;
const bookedDays = [3, 8, 14, 21];
const DAYS = ['L','M','X','J','V','S','D'];
const MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

function renderCalendar() {
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // Mon start
  const today = new Date();

  let html = `<div class="cal-header">
    <button class="cal-nav" onclick="prevMonth()">‹</button>
    <span class="cal-month">${MONTHS[currentMonth]} ${currentYear}</span>
    <button class="cal-nav" onclick="nextMonth()">›</button>
  </div>
  <div class="cal-days-header">${DAYS.map(d=>`<div class="cal-day-name">${d}</div>`).join('')}</div>
  <div class="cal-days-grid">`;

  for (let i = 0; i < offset; i++) html += `<div class="cal-day empty"></div>`;

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday  = d === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
    const isBooked = bookedDays.includes(d);
    const isPast   = new Date(currentYear, currentMonth, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const isSel    = selectedDate && selectedDate.d === d && selectedDate.m === currentMonth && selectedDate.y === currentYear;
    let cls = 'cal-day';
    if (isBooked || isPast) cls += ' booked';
    else cls += ' available';
    if (isToday) cls += ' today';
    if (isSel)   cls += ' selected';
    html += `<div class="${cls}" onclick="selectDay(${d})">${d}</div>`;
  }
  html += `</div>`;
  calendarEl.innerHTML = html;
}

function prevMonth() {
  currentMonth--; if (currentMonth < 0) { currentMonth = 11; currentYear--; }
  renderCalendar();
}
function nextMonth() {
  currentMonth++; if (currentMonth > 11) { currentMonth = 0; currentYear++; }
  renderCalendar();
}

function selectDay(d) {
  const isPast   = new Date(currentYear, currentMonth, d) < new Date();
  if (bookedDays.includes(d) || isPast) return;
  selectedDate = { d, m: currentMonth, y: currentYear };
  renderCalendar();
  renderTimeSlots();
}

const allTimes = ['10:00','10:30','11:00','11:30','12:00','12:30','16:00','16:30','17:00','17:30','18:00','18:30'];
const bookedTimes = ['10:30', '12:00', '17:00'];

function renderTimeSlots() {
  const sec = document.getElementById('timeSlotsSection');
  const el  = document.getElementById('timeSlots');
  sec.style.display = '';
  el.innerHTML = allTimes.map(t => {
    const isBooked = bookedTimes.includes(t);
    const isSel    = selectedTime === t;
    let cls = 'time-slot';
    if (isBooked) cls += ' booked';
    else cls += ' available';
    if (isSel) cls += ' selected';
    return `<div class="${cls}" onclick="selectTime('${t}')">${t}</div>`;
  }).join('');
}

function selectTime(t) {
  if (bookedTimes.includes(t)) return;
  selectedTime = t;
  renderTimeSlots();
}

renderCalendar();

// ─── BOOKING TYPE ───
function selectType(el) {
  document.querySelectorAll('.booking-type').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

// ─── SUBMIT ───
function submitBooking() {
  const type = document.querySelector('.booking-type.selected')?.querySelector('.type-name')?.textContent;
  if (!selectedDate || !selectedTime) {
    showNotification('⚠ Selecciona una fecha y hora para continuar.');
    return;
  }
  const dateStr = `${selectedDate.d} ${MONTHS[selectedDate.m]} ${selectedDate.y}`;
  showNotification(`✓ Reserva recibida\n${type} · ${dateStr} · ${selectedTime}\nRecibirás confirmación en tu email.`);
}

function showNotification(msg) {
  const n = document.getElementById('notification');
  n.textContent = msg;
  n.style.transform = 'translateY(0)';
  n.style.opacity   = '1';
  setTimeout(() => { n.style.transform = 'translateY(100px)'; n.style.opacity = '0'; }, 4500);
}

function scrollToBooking() {
  document.getElementById('reservas').scrollIntoView({ behavior: 'smooth' });
}

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }});
}, { threshold: 0.08 });
revealEls.forEach(el => io.observe(el));

// ─── HERO MOSAIC SVG ───
const mosaicData = [
  { el:'mc1', color:'#1a1a18', shape:'spiral' },
  { el:'mc2', color:'#1c1818', shape:'grid' },
  { el:'mc3', color:'#181c18', shape:'diamond' },
  { el:'mc4', color:'#18181c', shape:'wave' },
  { el:'mc5', color:'#1a181a', shape:'cross' },
];
mosaicData.forEach(({ el, color, shape }) => {
  const cell = document.getElementById(el);
  const w = 300, h = 400;
  let inner = '';
  if (shape === 'spiral') {
    inner = Array.from({length:6},(_,i)=>`<circle cx="150" cy="200" r="${30+i*25}" fill="none" stroke="#2e2e2a" stroke-width="0.8"/>`).join('');
  } else if (shape === 'grid') {
    for (let x=0;x<w;x+=30) inner+=`<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#2a2a28" stroke-width="0.5"/>`;
    for (let y=0;y<h;y+=30) inner+=`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#2a2a28" stroke-width="0.5"/>`;
  } else if (shape === 'diamond') {
    inner = `<polygon points="${w/2},40 ${w-40},${h/2} ${w/2},${h-40} 40,${h/2}" fill="none" stroke="#333330" stroke-width="1"/>
             <polygon points="${w/2},80 ${w-80},${h/2} ${w/2},${h-80} 80,${h/2}" fill="none" stroke="#2e2e2c" stroke-width="0.8"/>`;
  } else if (shape === 'wave') {
    for (let y=0;y<h;y+=20) inner+=`<path d="M0,${y} Q${w/4},${y-15} ${w/2},${y} T${w},${y}" fill="none" stroke="#2a2a28" stroke-width="0.5"/>`;
  } else {
    inner = `<line x1="${w/2}" y1="0" x2="${w/2}" y2="${h}" stroke="#333330" stroke-width="1"/>
             <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="#333330" stroke-width="1"/>
             <circle cx="${w/2}" cy="${h/2}" r="8" fill="#c0392b" opacity="0.6"/>`;
  }
  cell.innerHTML = `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;object-fit:cover;opacity:.55;">
    <rect width="${w}" height="${h}" fill="${color}"/>
    ${inner}
    <text x="${w/2}" y="${h-12}" text-anchor="middle" fill="#2e2e2c" font-size="8" font-family="monospace" letter-spacing="4">ON AIR</text>
  </svg>`;
});
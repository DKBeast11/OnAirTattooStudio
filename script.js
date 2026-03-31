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
  { style:'blackwork', artist:'El Chicano',  title:'Serpiente lunar', img:'https://images.pexels.com/photos/2226010/pexels-photo-2226010.jpeg?w=600&h=800&fit=crop', h:320 },
  { style:'fineline',  artist:'El Chicano',  title:'Rosa geométrica', img:'https://images.pexels.com/photos/29251827/pexels-photo-29251827.jpeg?w=600&h=600&fit=crop', h:240 },
  { style:'realism',   artist:'Nyx Line',    title:'Retrato femenino', img:'https://images.pexels.com/photos/2186982/pexels-photo-2186982.jpeg?w=600&h=800&fit=crop', h:400 },
  { style:'neo-trad',  artist:'Tati Tattoo', title:'Koi tradicional', img:'https://images.pexels.com/photos/2134085/pexels-photo-2134085.jpeg?w=600&h=700&fit=crop', h:280 },
  { style:'geometric', artist:'El Chicano',  title:'Mandala oscuro', img:'https://images.pexels.com/photos/35554899/pexels-photo-35554899.jpeg?w=600&h=700&fit=crop', h:260 },
  { style:'japanese',  artist:'Tati Tattoo', title:'Dragón clásico', img:'https://images.pexels.com/photos/29212049/pexels-photo-29212049.jpeg?w=600&h=800&fit=crop', h:360 },
  { style:'blackwork', artist:'Nyx Line',    title:'Bosque abstracto', img:'https://images.pexels.com/photos/2126124/pexels-photo-2126124.jpeg?w=600&h=500&fit=crop', h:200 },
  { style:'fineline',  artist:'El Chicano',  title:'Constellation', img:'https://images.pexels.com/photos/29251828/pexels-photo-29251828.jpeg?w=600&h=700&fit=crop', h:300 },
  { style:'realism',   artist:'Nyx Line',    title:'Lobo nocturno', img:'https://images.pexels.com/photos/35658331/pexels-photo-35658331.jpeg?w=600&h=800&fit=crop', h:380 },
  { style:'neo-trad',  artist:'Tati Tattoo', title:'Pantera art', img:'https://images.pexels.com/photos/2192557/pexels-photo-2192557.jpeg?w=600&h=700&fit=crop', h:260 },
  { style:'geometric', artist:'El Chicano',  title:'Sacred geometry', img:'https://images.pexels.com/photos/3295586/pexels-photo-3295586.jpeg?w=600&h=750&fit=crop', h:320 },
  { style:'japanese',  artist:'Tati Tattoo', title:'Hannya mask', img:'https://images.pexels.com/photos/5191123/pexels-photo-5191123.jpeg?w=600&h=800&fit=crop', h:350 },
];

// ─── GALLERY RENDER + FILTER ───
const grid = document.getElementById('galleryGrid');

function renderGallery(filter = 'all') {
  const items = filter === 'all' ? galleryItems : galleryItems.filter(i => i.style === filter);
  grid.innerHTML = '';
  items.forEach(item => {
    const cell = document.createElement('div');
    cell.className = 'gallery-item';
    cell.dataset.style = item.style;
    cell.style.height = item.h + 'px';
    cell.innerHTML = `
      <div class="gallery-img-mock" style="background-image:url('${item.img}');background-size:cover;background-position:center;height:100%;"></div>
      <div class="gallery-overlay">
        <div class="gallery-overlay-title">${item.title}</div>
        <div class="gallery-overlay-meta">${item.artist} · ${item.style}</div>
      </div>`;
    grid.appendChild(cell);
  });
}

renderGallery();

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

// Load more
document.querySelector('.gallery-load-more a').addEventListener('click', e => {
  e.preventDefault();
  showNotification('Ya has visto todos nuestros últimos trabajos.\n¡Síguenos en @onair.studio para más!');
});

// ─── ARTISTS DATA ───
const artists = [
  {
    initials: 'EC',
    name: 'El Chicano',
    style: 'Blackwork · Fine Line',
    bio: '@elchicano_ink - Especializado en blackwork orgánico y fine line. Sus diseños combinan precisión quirúrgica con sensibilidad poética. Tatuador residente de OnAir.',
    tags: ['Blackwork', 'Fine Line', 'Botánico', 'Geométrico'],
    works: ['Serpiente lunar', 'Rosa geométrica', 'Mandala oscuro'],
    workImgs: [
      'https://images.pexels.com/photos/2226010/pexels-photo-2226010.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/29251827/pexels-photo-29251827.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/35554899/pexels-photo-35554899.jpeg?w=200&h=200&fit=crop',
    ],
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=400&h=400&fit=crop',
    color: '#1e1e1c',
  },
  {
    initials: 'NL',
    name: 'Nyx Line',
    style: 'Realismo · Retrato',
    bio: '@nyxline_ink - Maestra del claroscuro y el retrato hiperrealista. Ha trabajado en estudios de Londres y Nueva York antes de unirse a OnAir. Tatuadora residente.',
    tags: ['Realismo', 'Retrato', 'Claroscuro', 'Wildlife'],
    works: ['Retrato femenino', 'Lobo nocturno', 'Bosque abstracto'],
    workImgs: [
      'https://images.pexels.com/photos/2186982/pexels-photo-2186982.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/35658331/pexels-photo-35658331.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/2126124/pexels-photo-2126124.jpeg?w=200&h=200&fit=crop',
    ],
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=400&h=400&fit=crop',
    color: '#1c1e1c',
  },
  {
    initials: 'TT',
    name: 'Tati Tattoo',
    style: 'Neo-tradicional · Japonés',
    bio: '@tatitattoo.inkk - Con raíces en el tatuaje tradicional americano y japonés. Reinterpreta los clásicos con una paleta contemporánea y líneas de fuerza excepcional.',
    tags: ['Neo-trad', 'Japonés', 'Color', 'Mangas'],
    works: ['Koi tradicional', 'Dragón clásico', 'Hannya mask'],
    workImgs: [
      'https://images.pexels.com/photos/2134085/pexels-photo-2134085.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/29212049/pexels-photo-29212049.jpeg?w=200&h=200&fit=crop',
      'https://images.pexels.com/photos/5191123/pexels-photo-5191123.jpeg?w=200&h=200&fit=crop',
    ],
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=400&h=400&fit=crop',
    color: '#1c1c1e',
  },
];

const artistsGrid = document.getElementById('artistsGrid');
artists.forEach(a => {
  const card = document.createElement('div');
  card.className = 'artist-card';
  card.innerHTML = `
    <div class="artist-portrait" style="background-image: url('${a.image}'); background-size: cover; background-position: center;">
      <div class="artist-initials"></div>
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
        ${a.workImgs.map((img, idx) => `
          <div class="work-thumb" title="${a.works[idx]}">
            <div class="work-thumb-inner" style="background-image:url('${img}');background-size:cover;background-position:center;"></div>
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
    if (isPast) cls += ' past';
    else if (isBooked) cls += ' booked';
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
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const isPast = new Date(currentYear, currentMonth, d) < todayStart;
  if (isPast || bookedDays.includes(d)) return;
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
  n.innerHTML = msg.replace(/\n/g, '<br>');
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

// ─── MOBILE NAV ───
function toggleMobileNav() {
  const links = document.querySelector('.nav-links');
  const btn   = document.getElementById('navHamburger');
  links.classList.toggle('open');
  btn.classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
    document.getElementById('navHamburger').classList.remove('open');
  });
});

// ─── ACTIVE NAV ON SCROLL ───
const navSections = ['galeria', 'artistas', 'reservas', 'contacto']
  .map(id => document.getElementById(id)).filter(Boolean);
const navAnchors = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const id = e.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.classList.toggle('active-nav', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-20% 0px -70% 0px' });
navSections.forEach(s => activeObserver.observe(s));

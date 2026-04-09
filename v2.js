// ─── CUSTOM CURSOR ───
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

// Cursor enhancements on gallery items and buttons
document.addEventListener('mouseover', function(e) {
  var galleryItem = e.target.closest('.gallery-item');
  var btn = e.target.closest('a, button');
  if (galleryItem) {
    ring.classList.add('cursor-gallery');
  } else if (btn) {
    ring.classList.add('cursor-btn');
  }
});
document.addEventListener('mouseout', function(e) {
  var galleryItem = e.target.closest('.gallery-item');
  var btn = e.target.closest('a, button');
  if (galleryItem) {
    ring.classList.remove('cursor-gallery');
  } else if (btn) {
    ring.classList.remove('cursor-btn');
  }
});

// ─── NEON FLICKER ───
const logoAirEls = document.querySelectorAll('.logo-air');
setInterval(() => {
  const r = Math.random();
  if (r < 0.08) {
    logoAirEls.forEach(el => {
      el.style.opacity = (0.7 + Math.random() * 0.2).toFixed(2);
      setTimeout(() => { el.style.opacity = '1'; }, 60 + Math.random() * 80);
    });
  }
}, 200);

// ─── GALLERY DATA ───
const galleryItems = [
  { style:'blackwork', artist:'El Chicano',  title:'Proyectazo espalda',  img:'.scrape/filtered/001_DOF4jxRDGZ1_10.jpg', h: 380 },
  { style:'fineline',  artist:'El Chicano',  title:'Sesion completa',     img:'.scrape/filtered/006_DNy6mGjWHcF_11.jpg', h: 280 },
  { style:'realism',   artist:'Nyx Line',    title:'Trabajo fino',        img:'.scrape/filtered/031_DLZtni1I3QJ_2.jpg',  h: 420 },
  { style:'neo-trad',  artist:'Tati Tattoo', title:'Trabajo color',       img:'.scrape/filtered/013_DMsHd75Irtr_2.jpg',  h: 340 },
  { style:'geometric', artist:'El Chicano',  title:'Diseno colaborativo', img:'.scrape/filtered/004_DN6pJbvCKrs_2.jpg',  h: 300 },
  { style:'japanese',  artist:'Tati Tattoo', title:'Estilo oriental',     img:'.scrape/filtered/025_DMIELGrohZU_3.jpg',  h: 400 },
  { style:'blackwork', artist:'Nyx Line',    title:'Linea oscura',        img:'.scrape/filtered/032_DLZtkzxoZU7_3.jpg',  h: 260 },
  { style:'fineline',  artist:'El Chicano',  title:'Detalle fino',        img:'.scrape/filtered/029_DL2B6p9oYce_2.jpg',  h: 340 },
  { style:'realism',   artist:'Nyx Line',    title:'Retrato realista',    img:'.scrape/filtered/030_DLZtp8ToQEc_2.jpg',  h: 400 },
  { style:'neo-trad',  artist:'Tati Tattoo', title:'Color intenso',       img:'.scrape/filtered/016_DMsHMxtIq2O_2.jpg',  h: 320 },
  { style:'geometric', artist:'El Chicano',  title:'Geometria pura',      img:'.scrape/filtered/028_DL2B86LoWOE_2.jpg',  h: 360 },
  { style:'japanese',  artist:'Tati Tattoo', title:'Arte japones',        img:'.scrape/filtered/022_DMPxOaqNdAs_2.jpg',  h: 380 },
];

// ─── GALLERY RENDER ───
const galleryGrid = document.getElementById('galleryGrid');

function renderGallery(filter, animate) {
  filter = filter || 'all';
  var items = filter === 'all' ? galleryItems : galleryItems.filter(function(i) { return i.style === filter; });

  if (animate) {
    // Fade out existing items
    var existing = galleryGrid.querySelectorAll('.gallery-item');
    existing.forEach(function(el) { el.classList.add('fade-out'); });
    setTimeout(function() {
      galleryGrid.innerHTML = '';
      items.forEach(function(item, idx) {
        var el = createGalleryItem(item);
        el.classList.add('fade-in');
        el.style.animationDelay = (idx * 40) + 'ms';
        galleryGrid.appendChild(el);
      });
    }, 200);
  } else {
    galleryGrid.innerHTML = '';
    items.forEach(function(item) {
      galleryGrid.appendChild(createGalleryItem(item));
    });
  }
}

function createGalleryItem(item) {
  var el = document.createElement('div');
  el.className = 'gallery-item';
  el.style.height = item.h + 'px';
  el.innerHTML =
    '<img class="gallery-img" src="' + item.img + '" alt="' + item.title + '" loading="lazy" />' +
    '<div class="gallery-overlay">' +
      '<div class="gallery-overlay-title">' + item.title + '</div>' +
      '<div class="gallery-overlay-meta">' + item.artist + ' · ' + item.style + '</div>' +
    '</div>';
  return el;
}

renderGallery();

// ─── GALLERY FILTERS ───
document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    renderGallery(btn.dataset.filter, true);
  });
});

// ─── ARTISTS DATA ───
const artists = [
  {
    name: 'El Chicano',
    handle: '@elchicano_ink',
    bio: 'Blackwork y fine line. Lleva tatuando desde antes de que abriéramos. Si quieres líneas limpias y negro que no se apaga, es tu tío.',
    tags: ['Blackwork', 'Fine Line', 'Botanico', 'Geometrico'],
    image: '.scrape/filtered/027_DL2CAuaongN_9.jpg',
    works: [
      '.scrape/filtered/001_DOF4jxRDGZ1_10.jpg',
      '.scrape/filtered/006_DNy6mGjWHcF_13.jpg',
      '.scrape/filtered/029_DL2B6p9oYce_2.jpg',
    ],
  },
  {
    name: 'Nyx Line',
    handle: '@nyxline_ink',
    bio: 'Realismo y retrato. Pasó por Londres y Nueva York antes de caer por Las Palmas. Piezas grandes, detalles que no se ven hasta la segunda mirada.',
    tags: ['Realismo', 'Retrato', 'Claroscuro', 'Wildlife'],
    image: '.scrape/filtered/030_DLZtp8ToQEc_9.jpg',
    works: [
      '.scrape/filtered/031_DLZtni1I3QJ_2.jpg',
      '.scrape/filtered/032_DLZtkzxoZU7_3.jpg',
      '.scrape/filtered/030_DLZtp8ToQEc_2.jpg',
    ],
  },
  {
    name: 'Tati Tattoo',
    handle: '@tatitattoo.inkk',
    bio: 'Neo-tradicional y japonés. Color que pega fuerte y línea gruesa que no pide perdón. Si quieres old school con ganas, habla con ella.',
    tags: ['Neo-Trad', 'Japones', 'Color', 'Mangas'],
    image: '.scrape/filtered/020_DMPybm3tWbr_9.jpg',
    works: [
      '.scrape/filtered/022_DMPxOaqNdAs_2.jpg',
      '.scrape/filtered/025_DMIELGrohZU_3.jpg',
      '.scrape/filtered/013_DMsHd75Irtr_2.jpg',
    ],
  },
];

// ─── ARTISTS RENDER ───
const artistBands = document.getElementById('artistBands');
artists.forEach(a => {
  const band = document.createElement('div');
  band.className = 'artist-band reveal';
  band.innerHTML =
    '<div class="artist-band-photo">' +
      '<img src="' + a.image + '" alt="' + a.name + '" loading="lazy" />' +
    '</div>' +
    '<div class="artist-band-info">' +
      '<h3 class="artist-band-name">' + a.name + '</h3>' +
      '<div class="artist-band-handle">' + a.handle + '</div>' +
      '<p class="artist-band-bio">' + a.bio + '</p>' +
      '<div class="artist-band-tags">' +
        a.tags.map(t => '<span class="artist-tag">' + t + '</span>').join('') +
      '</div>' +
      '<div class="artist-band-works">' +
        a.works.map(w => '<div class="artist-work-thumb"><img src="' + w + '" alt="Trabajo reciente" loading="lazy" /></div>').join('') +
      '</div>' +
    '</div>';
  artistBands.appendChild(band);
});

// ─── BOOKING ───

// Static artists for the select
(function() {
  var sel = document.getElementById('bookArtist');
  var artistOptions = [
    { name: 'El Chicano', styles: 'Blackwork · Fine Line' },
    { name: 'Nyx Line', styles: 'Realismo · Retrato' },
    { name: 'Tati Tattoo', styles: 'Neo-Trad · Japonés' }
  ];
  artistOptions.forEach(function(a) {
    var opt = document.createElement('option');
    opt.value = a.name;
    opt.textContent = a.name + ' — ' + a.styles;
    sel.appendChild(opt);
  });
})();

// Set min date to today
(function() {
  var dateInput = document.getElementById('bookDate');
  if (dateInput) dateInput.min = new Date().toISOString().slice(0, 10);
})();

// Static time slots — Lunes a Sábado, 11:00-20:00, 1h slots
function loadSlots() {
  var date = document.getElementById('bookDate').value;
  var timeSel = document.getElementById('bookTime');

  if (!date) {
    timeSel.innerHTML = '<option value="">Elige fecha primero</option>';
    return;
  }

  var day = new Date(date).getDay();
  if (day === 0) {
    timeSel.innerHTML = '<option value="">Domingos cerrado</option>';
    return;
  }

  var slots = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  timeSel.innerHTML = '<option value="">Elige una hora</option>';
  slots.forEach(function(slot) {
    var opt = document.createElement('option');
    opt.value = slot;
    opt.textContent = slot;
    timeSel.appendChild(opt);
  });
}

document.getElementById('bookDate').addEventListener('change', loadSlots);

// Submit booking — show confirmation (no backend yet)
document.getElementById('bookingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name  = document.getElementById('bookName').value.trim();
  var email = document.getElementById('bookEmail').value.trim();
  var date  = document.getElementById('bookDate').value;
  var time  = document.getElementById('bookTime').value;

  if (!name || !email || !date || !time) {
    showNotification('Completa nombre, email, fecha y hora.');
    return;
  }

  showNotification('Recibido. Te escribimos pronto para confirmar.');
  this.reset();
  document.getElementById('bookTime').innerHTML = '<option value="">Elige fecha primero</option>';
});

function showNotification(msg) {
  var n = document.getElementById('notification');
  n.textContent = msg;
  n.style.transform = 'translateY(0)';
  n.style.opacity   = '1';
  setTimeout(function() {
    n.style.transform = 'translateY(100px)';
    n.style.opacity   = '0';
  }, 4000);
}

// ─── SCROLL REVEAL ───
var revealEls = document.querySelectorAll('.reveal');
var io = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
revealEls.forEach(function(el) { io.observe(el); });

// ─── MOBILE NAV ───
var hamburger = document.getElementById('navHamburger');
var overlay   = document.getElementById('mobileNavOverlay');

hamburger.addEventListener('click', function() {
  var isOpen = overlay.classList.toggle('open');
  hamburger.classList.toggle('open');
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.mobile-nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    overlay.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── NAV SCROLL BEHAVIOR ───
var navEl = document.querySelector('nav');
var heroSection = document.getElementById('hero');
var heroBg = document.querySelector('.hero-bg');

function onScroll() {
  var sy = window.scrollY || window.pageYOffset;

  // Nav: add scrolled class past 100px
  if (sy > 100) {
    navEl.classList.add('nav-scrolled');
  } else {
    navEl.classList.remove('nav-scrolled');
  }

  // Hero parallax: background moves at 60% speed
  if (heroBg && sy < window.innerHeight) {
    heroBg.style.transform = 'translateY(' + (sy * 0.4) + 'px)';
  }
}

var rafTicking = false;
window.addEventListener('scroll', function() {
  if (!rafTicking) {
    requestAnimationFrame(function() {
      onScroll();
      rafTicking = false;
    });
    rafTicking = true;
  }
}, { passive: true });

// ─── NEON LOGO POWER-ON ANIMATION ───
var neonLogo = document.getElementById('neonLogoImg');
if (neonLogo) {
  var neonObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        neonLogo.classList.add('neon-power-on');
        neonObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  neonObserver.observe(neonLogo);
}


const firebaseConfig = {
  apiKey: "AIzaSyDlVnGdlIXCr1zRV1X4reaREfx3Lykw5bg",
  authDomain: "roomnest-9d0c0.firebaseapp.com",
  databaseURL: "https://roomnest-9d0c0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roomnest-9d0c0",
  storageBucket: "roomnest-9d0c0.firebasestorage.app",
  messagingSenderId: "306125888520",
  appId: "1:306125888520:web:653cc18b485cd0c23845bd"
};

// ── FIREBASE connection  ──
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();


const sampleRooms = [
  { id:'s1', title:"Spacious Single Room", area:"Shastri Nagar", rent:4500, type:"single", furnished:"Furnished", tags:["WiFi","AC","Attached Bath"], owner:"Ramesh Ji", phone:"9876543210", emoji:"🏠", near:"Near MIET College", available:true },
  { id:'s2', title:"Double Sharing Room", area:"Begumpul", rent:2800, type:"sharing", furnished:"Semi-Furnished", tags:["WiFi","Cooler","2 Students"], owner:"Sharma Ji", phone:"9812345678", emoji:"🛏️", near:"Near Shobhit University", available:true },
  { id:'s3', title:"Budget Single Room", area:"Garh Road", rent:2200, type:"single", furnished:"Unfurnished", tags:["Parking","24hr Water"], owner:"Gupta Ji", phone:"9898765432", emoji:"🪟", near:"Near IIMT College", available:true },
  { id:'s4', title:"Premium 1BHK Flat", area:"Civil Lines", rent:7500, type:"single", furnished:"Furnished", tags:["WiFi","AC","Kitchen","TV"], owner:"Verma Ji", phone:"9756341290", emoji:"🏢", near:"Near Meerut College", available:true },
  { id:'s5', title:"Triple Sharing Room", area:"Medical Road", rent:1800, type:"sharing", furnished:"Furnished", tags:["Mess Available","WiFi","3 Students"], owner:"Singh Ji", phone:"9845612378", emoji:"🏨", near:"Near Subharti University", available:true },
  { id:'s6', title:"Cozy Room with Balcony", area:"Shastri Nagar", rent:3800, type:"single", furnished:"Semi-Furnished", tags:["Balcony","Geyser","Quiet Area"], owner:"Mishra Ji", phone:"9732145689", emoji:"🌅", near:"Near MIET College", available:true },
];


let allRooms = [];
let activeTab = 'all';
let currentUser = null;
let firebaseReady = false;


const cardBgs = [
  'linear-gradient(135deg,#1a1f2e,#2d1f3d)',
  'linear-gradient(135deg,#1f2a1a,#1a3322)',
  'linear-gradient(135deg,#2a1a1a,#3d2020)',
  'linear-gradient(135deg,#1a252a,#1a2d35)',
  'linear-gradient(135deg,#252a1a,#35341a)',
  'linear-gradient(135deg,#1f1a2a,#2d1f3d)',
];

window.addEventListener('DOMContentLoaded', () => {
  initFirebase();
  animateCounters();
  initScrollNav();
  initIntersectionObserver();
});

function initFirebase() {
  try {
    db.collection('rooms')
      .where('approved', '==', true)
      .orderBy('createdAt', 'desc')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
        
          allRooms = sampleRooms;
        } else {
          allRooms = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        firebaseReady = true;
        renderRooms(allRooms);
      })
      .catch(() => {
     
        allRooms = sampleRooms;
        renderRooms(allRooms);
      });

    auth.onAuthStateChanged(user => {
      currentUser = user;
      updateNavForUser(user);
    });

  } catch (e) {
   
    allRooms = sampleRooms;
    renderRooms(allRooms);
  }
}


//  RENDER ROOMS logic comes here

function renderRooms(list) {
  const grid = document.getElementById('roomsGrid');

  if (!list || list.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <span>😕</span>
        No rooms found. Try a different search!
      </div>`;
    return;
  }

  grid.innerHTML = list.map((r, i) => `
    <div class="room-card" style="animation-delay:${i * 0.07}s" onclick="openRoomModal('${r.id}')">
      <div class="room-img-placeholder" style="background:${cardBgs[i % cardBgs.length]}">
        <span>${r.emoji || '🏠'}</span>
        ${r.available ? '<div class="room-badge">Available</div>' : ''}
      </div>
      <div class="room-body">
        <div class="room-price">₹${Number(r.rent).toLocaleString()}<span>/month</span></div>
        <div class="room-title">${r.title}</div>
        <div class="room-location">📍 ${r.area}${r.near ? ' · ' + r.near : ''}</div>
        <div class="room-tags">
          ${(r.tags || []).slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
        <div class="room-footer">
          <div class="owner-info">
            <div class="owner-avatar">${(r.owner || 'O')[0].toUpperCase()}</div>
            ${r.owner}
          </div>
          <a class="wa-btn"
            href="${buildWaLink(r)}"
            target="_blank"
            onclick="event.stopPropagation(); trackWaClick('${r.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function buildWaLink(r) {
  const msg = `Hi ${r.owner}, I saw your listing on RoomNest for "${r.title}" in ${r.area} at ₹${r.rent}/month. Is it still available?`;
  return `https://wa.me/91${r.phone}?text=${encodeURIComponent(msg)}`;
}

//  SEARCH & FILTER logic for evertthing come her
function filterRooms() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  const budget = parseInt(document.getElementById('budgetFilter').value) || Infinity;

  const filtered = allRooms.filter(r => {
    const matchQ = !q ||
      (r.title && r.title.toLowerCase().includes(q)) ||
      (r.area && r.area.toLowerCase().includes(q)) ||
      (r.near && r.near.toLowerCase().includes(q));
    const matchB = Number(r.rent) <= budget;
    const matchTab =
      activeTab === 'all' ||
      r.type === activeTab ||
      (activeTab === 'furnished' && r.furnished === 'Furnished');
    return matchQ && matchB && matchTab;
  });

  renderRooms(filtered);
}

function setTab(el, tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  activeTab = tab;
  filterRooms();
}


function openRoomModal(id) {
  const r = allRooms.find(x => String(x.id) === String(id));
  if (!r) return;

  document.getElementById('modalContent').innerHTML = `
    <div style="font-size:3.5rem;margin-bottom:14px">${r.emoji || '🏠'}</div>
    <h3>${r.title}</h3>
    <div style="color:var(--muted);font-size:0.85rem;margin-top:4px">
      📍 ${r.area}${r.near ? ' · ' + r.near : ''}
    </div>
    <div class="modal-price">
      ₹${Number(r.rent).toLocaleString()}
      <span style="font-size:0.9rem;color:var(--muted);font-family:'DM Sans',sans-serif;font-weight:400"> /month</span>
    </div>
    <div class="modal-details">
      <div class="modal-detail">
        <div class="modal-detail-label">Room Type</div>
        <div class="modal-detail-val">${r.type === 'single' ? 'Single Room' : 'Sharing'}</div>
      </div>
      <div class="modal-detail">
        <div class="modal-detail-label">Furnishing</div>
        <div class="modal-detail-val">${r.furnished || 'N/A'}</div>
      </div>
      <div class="modal-detail">
        <div class="modal-detail-label">Owner</div>
        <div class="modal-detail-val">${r.owner}</div>
      </div>
      <div class="modal-detail">
        <div class="modal-detail-label">Status</div>
        <div class="modal-detail-val" style="color:var(--green)">✅ Available</div>
      </div>
    </div>
    ${r.tags && r.tags.length ? `<div class="modal-tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>` : ''}
    ${r.description ? `<p style="color:var(--muted);font-size:0.9rem;margin-top:12px;font-weight:300">${r.description}</p>` : ''}
    <div class="modal-footer">
      <a class="btn btn-primary" href="${buildWaLink(r)}" target="_blank" onclick="trackWaClick('${r.id}')">
        💬 WhatsApp Owner
      </a>
      <button class="btn btn-outline" onclick="closeModal()">Close</button>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}



function openAuthModal(mode) {
  renderAuthForm(mode);
  document.getElementById('authOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeAuth() {
  document.getElementById('authOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function closeAuthOutside(e) {
  if (e.target === document.getElementById('authOverlay')) closeAuth();
}

function renderAuthForm(mode) {
  const isLogin = mode === 'login';
  document.getElementById('authContent').innerHTML = `
    <div class="auth-title">${isLogin ? 'Welcome Back 👋' : 'Join RoomNest 🏠'}</div>
    <div class="auth-sub">${isLogin ? 'Login to your account' : 'Create a free account'}</div>
    <div class="auth-error" id="authError"></div>
    <div class="auth-form">
      ${!isLogin ? `<input type="text" id="authName" placeholder="Full Name"/>` : ''}
      <input type="email" id="authEmail" placeholder="Email Address"/>
      <input type="password" id="authPassword" placeholder="Password (min 6 chars)"/>
      <button class="btn btn-primary" onclick="${isLogin ? 'doLogin()' : 'doSignup()'}" id="authSubmitBtn">
        ${isLogin ? '🔑 Login' : '🚀 Create Account'}
      </button>
    </div>
    <div class="auth-switch">
      ${isLogin
        ? `Don't have an account? <a onclick="renderAuthForm('signup')">Sign Up</a>`
        : `Already have an account? <a onclick="renderAuthForm('login')">Login</a>`
      }
    </div>
  `;
}

function doLogin() {
  const email = document.getElementById('authEmail').value.trim();
  const pass = document.getElementById('authPassword').value;
  const btn = document.getElementById('authSubmitBtn');

  if (!email || !pass) { showAuthError('Please fill all fields.'); return; }

  btn.textContent = 'Logging in...';
  btn.disabled = true;

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      closeAuth();
      showToast('✅ Logged in successfully!', 'success');
    })
    .catch(err => {
      btn.textContent = '🔑 Login';
      btn.disabled = false;
      showAuthError(getFriendlyError(err.code));
    });
}

function doSignup() {
  const name = document.getElementById('authName')?.value.trim();
  const email = document.getElementById('authEmail').value.trim();
  const pass = document.getElementById('authPassword').value;
  const btn = document.getElementById('authSubmitBtn');

  if (!name || !email || !pass) { showAuthError('Please fill all fields.'); return; }
  if (pass.length < 6) { showAuthError('Password must be at least 6 characters.'); return; }

  btn.textContent = 'Creating account...';
  btn.disabled = true;

  auth.createUserWithEmailAndPassword(email, pass)
    .then(cred => cred.user.updateProfile({ displayName: name }))
    .then(() => {
      closeAuth();
      showToast('🎉 Account created! Welcome to RoomNest!', 'success');
    })
    .catch(err => {
      btn.textContent = '🚀 Create Account';
      btn.disabled = false;
      showAuthError(getFriendlyError(err.code));
    });
}

function doLogout() {
  auth.signOut().then(() => showToast('👋 Logged out!', 'success'));
}

function showAuthError(msg) {
  const el = document.getElementById('authError');
  if (el) { el.style.display = 'block'; el.textContent = msg; }
}

function getFriendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Try again.',
    'auth/email-already-in-use': 'This email is already registered.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/weak-password': 'Password is too weak.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

function updateNavForUser(user) {
  const loginBtn = document.getElementById('loginBtn');
  if (!loginBtn) return;
  if (user) {
    loginBtn.textContent = `👤 ${user.displayName || user.email.split('@')[0]}`;
    loginBtn.onclick = doLogout;
  } else {
    loginBtn.textContent = 'Login';
    loginBtn.onclick = () => openAuthModal('login');
  }
}




function submitListing() {
  const fields = {
    name: document.getElementById('ownerName').value.trim(),
    phone: document.getElementById('ownerPhone').value.trim(),
    title: document.getElementById('roomTitle').value.trim(),
    area: document.getElementById('ownerArea').value.trim(),
    near: document.getElementById('ownerNear').value.trim(),
    rent: document.getElementById('ownerRent').value.trim(),
    type: document.getElementById('ownerType').value,
    furnished: document.getElementById('ownerFurnish').value,
    tagsRaw: document.getElementById('ownerTags').value.trim(),
    desc: document.getElementById('ownerDesc').value.trim(),
  };


  if (!fields.name || !fields.phone || !fields.title || !fields.area || !fields.rent || !fields.type) {
    showFormError('Please fill all required fields marked with *');
    highlightEmptyFields(['ownerName','ownerPhone','roomTitle','ownerArea','ownerRent','ownerType']);
    return;
  }
  if (!/^\d{10}$/.test(fields.phone)) {
    showFormError('Please enter a valid 10-digit WhatsApp number.');
    return;
  }
  if (isNaN(fields.rent) || Number(fields.rent) <= 0) {
    showFormError('Please enter a valid rent amount.');
    return;
  }

  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.textContent = '⏳ Submitting...';
  submitBtn.disabled = true;

  const listing = {
    owner: fields.name,
    phone: fields.phone,
    title: fields.title,
    area: fields.area,
    near: fields.near,
    rent: Number(fields.rent),
    type: fields.type,
    furnished: fields.furnished,
    tags: fields.tagsRaw ? fields.tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [],
    description: fields.desc,
    emoji: getRandomEmoji(),
    available: true,
    approved: false, 
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    userId: currentUser ? currentUser.uid : null,
  };

  db.collection('rooms').add(listing)
    .then(() => {
      showFormSuccess();
      clearListingForm();
      submitBtn.textContent = '🏠 Submit Listing';
      submitBtn.disabled = false;
      showToast('🏠 Listing submitted for review!', 'success');
    })
    .catch((err) => {
  console.error("Firebase error:", err);
  showFormError("Error: " + err.message);
  submitBtn.textContent = '🏠 Submit Listing';
  submitBtn.disabled = false;
});
}

function highlightEmptyFields(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) {
      el.classList.add('error');
      el.addEventListener('input', () => el.classList.remove('error'), { once: true });
    }
  });
}

function showFormSuccess() {
  const s = document.getElementById('successMsg');
  const e = document.getElementById('errorMsg');
  s.style.display = 'block';
  e.style.display = 'none';
  setTimeout(() => s.style.display = 'none', 6000);
}

function showFormError(msg) {
  const s = document.getElementById('successMsg');
  const e = document.getElementById('errorMsg');
  s.style.display = 'none';
  e.style.display = 'block';
  e.textContent = '❌ ' + msg;
  setTimeout(() => e.style.display = 'none', 5000);
}

function clearListingForm() {
  ['ownerName','ownerPhone','roomTitle','ownerArea','ownerNear','ownerRent','ownerTags','ownerDesc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['ownerType','ownerFurnish'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

function getRandomEmoji() {
  const emojis = ['🏠','🛏️','🏢','🏡','🪟','🌅','🏨','🏗️'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}


function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}


document.addEventListener('click', e => {
  const menu = document.getElementById('mobileMenu');
  const hamburger = document.getElementById('hamburger');
  if (menu.classList.contains('open') && !menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove('open');
  }
});


function initScrollNav() {
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });
}


function animateCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const step = Math.ceil(target / 50);
        const interval = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(interval); }
          el.textContent = current + '+';
        }, 30);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  nums.forEach(el => observer.observe(el));
}


function initIntersectionObserver() {
  const cards = document.querySelectorAll('.step-card, .why-card');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeUp 0.5s ease ${i * 0.08}s both`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(card => observer.observe(card));
}


function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show ' + type;
  setTimeout(() => toast.className = 'toast', 3000);
}


function trackWaClick(roomId) {
  try {
    db.collection('analytics').add({
      event: 'whatsapp_click',
      roomId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  } catch (_) {}
}


document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeAuth();
  }
});
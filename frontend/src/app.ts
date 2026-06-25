 import './css/style.css';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// --- Types ---
type Store = {
  storeid: string;
  address: string;
  location: { coordinates: [number, number] };
};

// --- State Management ---
let accessToken: string | null = null;
let map: L.Map;

// --- DOM Selectors ---
const loginSec = document.getElementById('login-section')!;
const dashSec = document.getElementById('dashboard-section')!;
const regSec = document.getElementById('register-section')!;
const loginForm = document.getElementById('login-form') as HTMLFormElement;
const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
const regForm = document.getElementById('register-form') as HTMLFormElement;
const navToReg = document.getElementById('nav-register');
const navToLogin = document.getElementById('nav-login');
// --- 1. Initialize Map ---
function initMap() {
  if (map) return; 
  map = L.map('map').setView([26.9124, 75.7873], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  const DefaultIcon = L.icon({ iconUrl, shadowUrl });
  L.Marker.prototype.options.icon = DefaultIcon;
}

// --- 2. Auth Logic ---
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = (document.getElementById('login-email') as HTMLInputElement).value;
  const password = (document.getElementById('login-password') as HTMLInputElement).value;

  try {
    const res = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      accessToken = data.accessToken;
      showDashboard();
    } else {
      alert(data.message || "Login Failed");
    }
  } catch (err) {
    console.error("Login error", err);
  }
});

async function showDashboard() {
  loginSec.classList.add('hidden');
  regSec.classList.add('hidden');
  dashSec.classList.remove('hidden');
  
  initMap();
  // Leaflet needs a nudge to render correctly when unhidden
  setTimeout(() => map.invalidateSize(), 200);
  await loadStores();
}

// --- 3. Store Logic (Protected) ---
async function loadStores() {
  try {
    const res = await fetch("/api/v1/stores/", {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    const json = await res.json();
    renderMarkers(json.data);
  } catch (err) {
    console.error("Fetch error", err);
  }
}

function renderMarkers(stores: Store[]) {
  const bounds: L.LatLngExpression[] = [];
  stores.forEach((store) => {
    const [lng, lat] = store.location.coordinates;
    const coords: L.LatLngExpression = [lat, lng];
    bounds.push(coords);
    L.marker(coords).addTo(map).bindPopup(`<b>${store.storeid}</b>`);
  });
  if (bounds.length) map.fitBounds(bounds);
}

addBtn.addEventListener('click', async () => {
  const storeid = (document.getElementById('storeid') as HTMLInputElement).value;
  const address = (document.getElementById('address') as HTMLInputElement).value;

  const res = await fetch("/api/v1/stores/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({ storeid, address }),
  });

  if (res.ok) {
    await loadStores();
    (document.getElementById('storeid') as HTMLInputElement).value = "";
    (document.getElementById('address') as HTMLInputElement).value = "";
  }
});

// --- 4. Persistent Session (Auto-Login) ---
async function checkSession() {
  try {
    const res = await fetch('/api/v1/auth/refresh', { method: 'POST' });
    if (res.ok) {
      const data = await res.json();
      accessToken = data.accessToken;
      showDashboard();
    }
  } catch (e) {
    // No valid refresh token, stay on login page
  }
}

// --- 5. Registration Logic ---
regForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get values from your registration inputs
  const name = (document.getElementById('reg-name') as HTMLInputElement).value;
  const email = (document.getElementById('reg-email') as HTMLInputElement).value;
  const password = (document.getElementById('reg-password') as HTMLInputElement).value;

  try {
    const res = await fetch('/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registration successful! Please check your email to verify your account.");
      regForm.reset();
      
      // Automatically switch UI to login section
      regSec.classList.add('hidden');
      loginSec.classList.remove('hidden');
    } else {
      // Show error from backend (like "Email already in use")
      alert(data.message || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
    alert("Network error. Please try again.");
  }
});

// --- Helper for Navigation (If using your nav buttons) ---
navToReg?.addEventListener('click', () => {
  loginSec.classList.add('hidden');
  regSec.classList.remove('hidden');
});

navToLogin?.addEventListener('click', () => {
  regSec.classList.add('hidden');
  loginSec.classList.remove('hidden');
});

checkSession();
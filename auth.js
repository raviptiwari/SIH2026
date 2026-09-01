/* auth.js — Authentication and login management */

const AUTH_KEY = 'sih26032_auth';
const FARMER_DB_KEY = 'sih26032_farmers_db';

// Default credentials (for demo purposes - in production, use a backend)
const VALID_CREDENTIALS = {
  'procurement': {
    password: 'procurement123',
    role: 'procurement'
  },
  'admin': {
    password: 'admin123',
    role: 'admin'
  }
};

function getFarmerDB() {
  const raw = localStorage.getItem(FARMER_DB_KEY);
  return raw ? JSON.parse(raw) : {};
}

function saveFarmerDB(db) {
  localStorage.setItem(FARMER_DB_KEY, JSON.stringify(db));
}

function registerFarmer(mobile, password, farmerDetails) {
  if (!/^\d{10}$/.test(mobile)) {
    return { success: false, error: t('error-mobile') };
  }
  if (!password || password.length < 4) {
    return { success: false, error: t('password-short') };
  }
  
  const db = getFarmerDB();
  if (db[mobile]) {
    return { success: false, error: t('mobile-registered') };
  }
  
  db[mobile] = { 
    password: password,
    farmerDetails: farmerDetails,
    createdAt: Date.now() 
  };
  saveFarmerDB(db);
  return { success: true };
}

function loginFarmer(mobile, password) {
  const db = getFarmerDB();
  const farmer = db[mobile];
  
  if (!farmer || farmer.password !== password) {
    return { success: false, error: t('login-error-invalid') };
  }
  
  // Session valid for 8 hours
  const auth = {
    mobile: mobile,
    role: 'farmer',
    timestamp: Date.now() + (8 * 60 * 60 * 1000)
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  return { success: true };
}

function isLoggedIn(role) {
  const auth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  return auth && auth.role === role && auth.timestamp > Date.now();
}

function getCurrentUser() {
  const auth = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  if (auth && auth.timestamp > Date.now()) {
    return auth;
  }
  return null;
}

function login(username, password, role) {
  const cred = VALID_CREDENTIALS[username];
  if (!cred || cred.password !== password || cred.role !== role) {
    return { success: false, error: t('login-error-invalid') };
  }
  
  // Session valid for 8 hours
  const auth = {
    username: username,
    role: role,
    timestamp: Date.now() + (8 * 60 * 60 * 1000)
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  return { success: true };
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
}

function redirectToLogin(role) {
  if (!isLoggedIn(role)) {
    window.location.href = role === 'procurement' ? 'procurement.html' : 'admin.html';
  }
}

// Check login status on page load
document.addEventListener('DOMContentLoaded', () => {
  const pageRole = document.body.getAttribute('data-auth-role');
  if (pageRole && !isLoggedIn(pageRole)) {
    // Hide main content and show login screen
    const authScreen = document.getElementById('screen-auth');
    const loginScreen = document.getElementById('screen-login');
    const mainContent = document.getElementById('main-content');
    
    if (authScreen && mainContent) {
      authScreen.classList.remove('hidden');
      mainContent.classList.add('hidden');
    } else if (loginScreen && mainContent) {
      loginScreen.classList.remove('hidden');
      mainContent.classList.add('hidden');
    }
  }
});

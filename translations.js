/* translations.js — Language translations for MandiSathi */

const translations = {
  en: {
    // Topbar
    'brand': 'MandiSathi',
    'sihtag': 'SIH26032 · Smart India Hackathon 2026',
    'nav-home': 'Home',
    'nav-about': 'About',
    'nav-farmer': 'Farmer ▾',
    'nav-farmer-login': 'Farmer Login',
    'nav-status': 'Status Tracking',
    'nav-process': 'Process Flow',
    'nav-procurement': 'Procurement Centre Login',
    'nav-contact': 'Contact',
    'nav-helpline': 'Helpline',
    
    // Index page
    'hero-title': 'No more standing in line all day to sell your crop.',
    'hero-desc': 'Book a slot, get a token, and watch your turn come closer from home. Reach the mandi only when it\'s nearly your time.',
    
    'role-farmer': 'Farmer',
    'role-farmer-desc': 'Register, book a slot, track your queue live, and check your payment status.',
    'role-procurement': 'Procurement Centre',
    'role-procurement-desc': 'Check farmers in, call the next token, and mark procurement complete.',
    'role-admin': 'Admin',
    'role-admin-desc': 'See today\'s numbers across every centre and spot overcrowding early.',
    
    'how-it-works': 'How it works',
    'process-eyebrow': 'FROM FIELD TO PAYMENT',
    'process-desc': 'A clear six-step journey keeps every visit predictable.',
    'about-eyebrow': 'A BETTER MANDI DAY',
    'about-title': 'Your time matters.',
    'about-desc': 'MandiSathi connects farmers and procurement centres with one shared queue, helping farmers arrive at the right time and centres serve people more smoothly.',
    'contact-eyebrow': 'NEED A HAND?',
    'contact-title': 'We are here to help.',
    'contact-desc': 'For booking help, status updates, or centre support, reach our team.',
    'call-helpline': 'Call 1800 123 4567',
    'step1-title': 'Register',
    'step1-desc': 'Name, mobile number, farmer ID and crop details.',
    'step2-title': 'Book a slot',
    'step2-desc': 'Pick a procurement centre, date and time.',
    'step3-title': 'Get a token',
    'step3-desc': 'A queue number and a QR code for check-in.',
    'step4-title': 'Track the queue live',
    'step4-desc': 'See how many farmers are ahead and the expected wait.',
    'step5-title': 'Sell your crop',
    'step5-desc': 'Reach the centre when your turn is close, then complete procurement.',
    'step6-title': 'Get paid',
    'step6-desc': 'Track payment status until it\'s credited.',
    
    // Farmer portal
    'farmer-title': 'Farmer Portal — Mandi Queue',
    'farmer-role': '👨‍🌾 Farmer',
    'welcome-farmer': 'Welcome, farmer',
    'start-desc': 'Start a new booking, or track a booking you already made.',
    'book-slot': '📅 Book a new slot',
    'track-booking': '🔍 Track my booking',
    
    'find-booking': 'Find your booking',
    'find-desc': 'Enter the mobile number you used to register.',
    'mobile-label': 'Mobile number',
    'mobile-placeholder': '10-digit mobile number',
    'find-btn': 'Find bookings',
    'back': '← Back',
    
    'your-details': 'Your details',
    'name-label': 'Full name',
    'name-placeholder': 'e.g. Ramesh Yadav',
    'farmerid-label': 'Farmer ID',
    'farmerid-placeholder': 'e.g. FID-2031',
    'village-label': 'Village',
    'village-placeholder': 'e.g. Rajapur',
    'crop-label': 'Crop',
    'crop-select': 'Select crop',
    'qty-label': 'Quantity (quintals)',
    'qty-placeholder': 'e.g. 40',
    'centre-label': 'Procurement centre',
    'continue-btn': 'Continue to slot booking →',
    
    'choose-slot': 'Choose a slot',
    'slot-booked': '✅ Slot booked',
    'qr-hint': 'Show this at check-in — the centre can scan it or type your booking ID.',
    'track-queue': '📱 Track my queue →',
    
    'error-fill-fields': 'Please fill in every field before continuing.',
    'error-mobile': 'Mobile number should be 10 digits.',
    'error-qty': 'Quantity should be at least 1 quintal.',
    
    'live-queue': 'Your live queue position',
    'ahead': 'farmers ahead of you',
    'wait-time': 'Expected wait time',
    'centre-name': 'Centre',
    'your-slot': 'Your slot',
    'status': 'Status',
    'status-booked': 'Booked',
    'status-checkedin': 'Checked in',
    'status-completed': 'Completed',
    'refreshing': 'Refreshing...',
    
    // Procurement portal
    'procurement-title': 'Procurement Centre Portal — Mandi Queue',
    'procurement-role': '🏪 Procurement Centre',
    'welcome-centre': 'Welcome, Procurement Centre',
    'centre-desc': 'Check in farmers, call tokens, and mark procurements complete.',
    'view-today': '📋 View today\'s queue',
    'manage-tokens': '🎫 Manage tokens',
    
    'today-queue': 'Today\'s queue',
    'token': 'Token',
    'farmer-name': 'Farmer name',
    'checkin-btn': 'Check in',
    'call-token': '📢 Call next token',
    'mark-complete': '✓ Mark complete',
    'farmer-not-checked': 'Farmer not checked in yet',
    
    'manage-queue': 'Manage tokens',
    'next-token': 'Next token to call',
    'no-bookings': 'No bookings for today yet.',
    'call-btn': '📢 Call next',
    
    // Admin portal
    'admin-title': 'Admin Dashboard — Mandi Queue',
    'admin-role': '📊 Admin',
    'admin-dashboard': 'Dashboard',
    'admin-desc': 'Overview of all procurement centres.',
    
    'centre-stats': 'Centre statistics',
    'total-booked': 'Total booked',
    'checked-in': 'Checked in',
    'completed': 'Completed',
    'queue-size': 'Queue size',
    'crowding-alert': 'Crowding Alert: High queue size',
    
    // Login
    'login-title': 'Login',
    'login-username': 'Username',
    'login-password': 'Password',
    'login-btn': 'Login',
    'login-error-invalid': 'Invalid username or password',
    'logout-btn': 'Logout',
    'logged-in-as': 'Logged in as',
    'register-title': 'Register',
    'register-desc': 'Create an account to book slots and track your bookings',
    'register-mobile': 'Mobile number',
    'register-password': 'Password',
    'register-confirm-password': 'Confirm password',
    'register-btn': 'Register',
    'login-link': 'Already have an account? Login',
    'register-link': 'Don\'t have an account? Register',
    'password-mismatch': 'Passwords do not match',
    'password-short': 'Password must be at least 4 characters',
    'mobile-registered': 'Mobile number already registered',
    
    // Farmer registration details
    'register-farmer-name': 'Full name',
    'register-farmer-name-placeholder': 'e.g. Rajesh Kumar',
    'register-farmer-id': 'Farmer ID (optional)',
    'register-farmer-id-placeholder': 'e.g. FID-2031',
    'register-village': 'Village name',
    'register-village-placeholder': 'e.g. Rajapur',
    'register-state': 'State',
    'register-state-placeholder': 'e.g. Uttar Pradesh',
    'register-district': 'District',
    'register-district-placeholder': 'e.g. Meerut',
    'register-pincode': 'Pincode',
    'register-pincode-placeholder': '6-digit pincode',
    'register-land-size': 'Land size (in acres)',
    'register-land-size-placeholder': 'e.g. 5.5',
    'register-land-type': 'Type of land',
    'register-land-type-placeholder': 'e.g. Agricultural',
    'register-primary-crop': 'Primary crop',
    'register-primary-crop-placeholder': 'e.g. Wheat',
  },
  
  hi: {
    // Topbar
    'brand': 'MandiSathi',
    'sihtag': 'SIH26032 · स्मार्ट इंडिया हैकाथॉन 2026',
    'nav-home': 'होम',
    'nav-about': 'हमारे बारे में',
    'nav-farmer': 'किसान ▾',
    'nav-farmer-login': 'किसान लॉगिन',
    'nav-status': 'स्थिति ट्रैक करें',
    'nav-process': 'प्रक्रिया',
    'nav-procurement': 'खरीद केंद्र लॉगिन',
    'nav-contact': 'संपर्क',
    'nav-helpline': 'हेल्पलाइन',
    
    // Index page
    'hero-title': 'अब पूरे दिन खड़े होकर अपनी फसल बेचने की परेशानी नहीं।',
    'hero-desc': 'स्लॉट बुक करें, टोकन प्राप्त करें, और अपने घर से ही अपनी बारी का इंतजार करें। मंडी में तभी आएं जब आपकी बारी करीब हो।',
    
    'role-farmer': 'किसान',
    'role-farmer-desc': 'पंजीकरण करें, स्लॉट बुक करें, अपनी कतार को लाइव ट्रैक करें, और भुगतान की स्थिति देखें।',
    'role-procurement': 'खरीद केंद्र',
    'role-procurement-desc': 'किसानों को चेक इन करें, अगला टोकन कॉल करें, और खरीद पूरी करें।',
    'role-admin': 'प्रशासक',
    'role-admin-desc': 'हर केंद्र पर आज की संख्या देखें और भीड़ की समस्या जल्दी पकड़ें।',
    
    'how-it-works': 'यह कैसे काम करता है',
    'process-eyebrow': 'खेत से भुगतान तक',
    'process-desc': 'छह आसान चरण आपकी हर यात्रा को सरल बनाते हैं।',
    'about-eyebrow': 'बेहतर मंडी दिवस',
    'about-title': 'आपका समय महत्वपूर्ण है।',
    'about-desc': 'मंडी साथी किसानों और खरीद केंद्रों को एक साझा कतार से जोड़ता है, ताकि किसान सही समय पर पहुंचें और केंद्र बेहतर सेवा दे सकें।',
    'contact-eyebrow': 'मदद चाहिए?',
    'contact-title': 'हम आपकी सहायता के लिए हैं।',
    'contact-desc': 'बुकिंग, स्थिति अपडेट या केंद्र सहायता के लिए हमारी टीम से संपर्क करें।',
    'call-helpline': '1800 123 4567 पर कॉल करें',
    'step1-title': 'पंजीकरण',
    'step1-desc': 'नाम, मोबाइल नंबर, किसान ID और फसल की जानकारी।',
    'step2-title': 'स्लॉट बुक करें',
    'step2-desc': 'खरीद केंद्र, तारीख और समय चुनें।',
    'step3-title': 'टोकन प्राप्त करें',
    'step3-desc': 'एक कतार संख्या और चेक-इन के लिए QR कोड।',
    'step4-title': 'कतार को लाइव ट्रैक करें',
    'step4-desc': 'देखें कि आपसे कितने किसान आगे हैं और प्रतीक्षा का समय।',
    'step5-title': 'अपनी फसल बेचें',
    'step5-desc': 'जब आपकी बारी करीब हो तब केंद्र पर पहुंचें, फिर खरीद पूरी करें।',
    'step6-title': 'भुगतान प्राप्त करें',
    'step6-desc': 'भुगतान की स्थिति तब तक ट्रैक करें जब तक यह जमा न हो जाए।',
    
    // Farmer portal
    'farmer-title': 'किसान पोर्टल — मंडी कतार',
    'farmer-role': '👨‍🌾 किसान',
    'welcome-farmer': 'स्वागत है, किसान',
    'start-desc': 'नई बुकिंग शुरू करें, या पहले से की गई बुकिंग को ट्रैक करें।',
    'book-slot': '📅 नया स्लॉट बुक करें',
    'track-booking': '🔍 अपनी बुकिंग ट्रैक करें',
    
    'find-booking': 'अपनी बुकिंग खोजें',
    'find-desc': 'वह मोबाइल नंबर दर्ज करें जिससे आपने पंजीकरण किया था।',
    'mobile-label': 'मोबाइल नंबर',
    'mobile-placeholder': '10 अंकों का मोबाइल नंबर',
    'find-btn': 'बुकिंग खोजें',
    'back': '← वापस',
    
    'your-details': 'आपकी जानकारी',
    'name-label': 'पूरा नाम',
    'name-placeholder': 'उदा. रमेश यादव',
    'farmerid-label': 'किसान ID',
    'farmerid-placeholder': 'उदा. FID-2031',
    'village-label': 'गांव',
    'village-placeholder': 'उदा. राजापुर',
    'crop-label': 'फसल',
    'crop-select': 'फसल चुनें',
    'qty-label': 'मात्रा (क्विंटल)',
    'qty-placeholder': 'उदा. 40',
    'centre-label': 'खरीद केंद्र',
    'continue-btn': 'स्लॉट बुकिंग जारी रखें →',
    
    'choose-slot': 'स्लॉट चुनें',
    'slot-booked': '✅ स्लॉट बुक हो गया',
    'qr-hint': 'चेक-इन पर यह दिखाएं — केंद्र इसे स्कैन कर सकता है या आपकी बुकिंग ID टाइप कर सकता है।',
    'track-queue': '📱 अपनी कतार ट्रैक करें →',
    
    'error-fill-fields': 'जारी रखने से पहले कृपया सभी फील्ड भरें।',
    'error-mobile': 'मोबाइल नंबर 10 अंकों का होना चाहिए।',
    'error-qty': 'मात्रा कम से कम 1 क्विंटल होनी चाहिए।',
    
    'live-queue': 'आपकी कतार में स्थिति',
    'ahead': 'किसान आपसे आगे हैं',
    'wait-time': 'अनुमानित प्रतीक्षा समय',
    'centre-name': 'केंद्र',
    'your-slot': 'आपका स्लॉट',
    'status': 'स्थिति',
    'status-booked': 'बुक किया गया',
    'status-checkedin': 'चेक इन किया गया',
    'status-completed': 'पूर्ण',
    'refreshing': 'अपडेट हो रहा है...',
    
    // Procurement portal
    'procurement-title': 'खरीद केंद्र पोर्टल — मंडी कतार',
    'procurement-role': '🏪 खरीद केंद्र',
    'welcome-centre': 'स्वागत है, खरीद केंद्र',
    'centre-desc': 'किसानों को चेक इन करें, टोकन कॉल करें, और खरीद पूरी करें।',
    'view-today': '📋 आज की कतार देखें',
    'manage-tokens': '🎫 टोकन प्रबंधित करें',
    
    'today-queue': 'आज की कतार',
    'token': 'टोकन',
    'farmer-name': 'किसान का नाम',
    'checkin-btn': 'चेक इन',
    'call-token': '📢 अगला टोकन कॉल करें',
    'mark-complete': '✓ पूरा चिह्नित करें',
    'farmer-not-checked': 'किसान अभी तक चेक इन नहीं किया गया',
    
    'manage-queue': 'टोकन प्रबंधित करें',
    'next-token': 'कॉल करने के लिए अगला टोकन',
    'no-bookings': 'आज के लिए अभी कोई बुकिंग नहीं।',
    'call-btn': '📢 कॉल करें',
    
    // Admin portal
    'admin-title': 'प्रशासकीय डैशबोर्ड — मंडी कतार',
    'admin-role': '📊 प्रशासक',
    'admin-dashboard': 'डैशबोर्ड',
    'admin-desc': 'सभी खरीद केंद्रों का अवलोकन।',
    
    'centre-stats': 'केंद्र आँकड़े',
    'total-booked': 'कुल बुक किए गए',
    'checked-in': 'चेक इन किए गए',
    'completed': 'पूर्ण',
    'queue-size': 'कतार आकार',
    'crowding-alert': 'भीड़ की चेतावनी: कतार का आकार अधिक है',
    
    // Login
    'login-title': 'लॉगिन',
    'login-username': 'उपयोगकर्ता नाम',
    'login-password': 'पासवर्ड',
    'login-btn': 'लॉगिन करें',
    'login-error-invalid': 'अमान्य उपयोगकर्ता नाम या पासवर्ड',
    'logout-btn': 'लॉगआउट',
    'logged-in-as': 'इस रूप में लॉगिन किया गया',
    'register-title': 'पंजीकरण',
    'register-desc': 'स्लॉट बुक करने और अपनी बुकिंग को ट्रैक करने के लिए एक खाता बनाएं',
    'register-mobile': 'मोबाइल नंबर',
    'register-password': 'पासवर्ड',
    'register-confirm-password': 'पासवर्ड की पुष्टि करें',
    'register-btn': 'पंजीकरण करें',
    'login-link': 'पहले से खाता है? लॉगिन करें',
    'register-link': 'खाता नहीं है? पंजीकरण करें',
    'password-mismatch': 'पासवर्ड मेल नहीं खाते',
    'password-short': 'पासवर्ड कम से कम 4 वर्ण होना चाहिए',
    'mobile-registered': 'मोबाइल नंबर पहले से पंजीकृत है',
    
    // Farmer registration details
    'register-farmer-name': 'पूरा नाम',
    'register-farmer-name-placeholder': 'उदा. राजेश कुमार',
    'register-farmer-id': 'किसान ID (वैकल्पिक)',
    'register-farmer-id-placeholder': 'उदा. FID-2031',
    'register-village': 'गांव का नाम',
    'register-village-placeholder': 'उदा. राजापुर',
    'register-state': 'राज्य',
    'register-state-placeholder': 'उदा. उत्तर प्रदेश',
    'register-district': 'जिला',
    'register-district-placeholder': 'उदा. मेरठ',
    'register-pincode': 'पिनकोड',
    'register-pincode-placeholder': '6 अंकों का पिनकोड',
    'register-land-size': 'भूमि का आकार (एकड़ में)',
    'register-land-size-placeholder': 'उदा. 5.5',
    'register-land-type': 'भूमि का प्रकार',
    'register-land-type-placeholder': 'उदा. कृषि',
    'register-primary-crop': 'प्राथमिक फसल',
    'register-primary-crop-placeholder': 'उदा. गेहूं',
  }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function t(key) {
  return translations[currentLanguage]?.[key] || translations['en'][key] || key;
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('language', lang);
  updatePageLanguage();
}

function getCurrentLanguage() {
  return currentLanguage;
}

function updatePageLanguage() {
  // Update all elements with data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (el.tagName === 'INPUT' && el.type === 'text') {
      el.placeholder = t(key);
    } else if (el.tagName === 'INPUT' && el.type === 'tel') {
      el.placeholder = t(key);
    } else if (el.tagName === 'OPTION') {
      el.textContent = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  
  // Update html lang attribute
  document.documentElement.lang = currentLanguage;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updatePageLanguage();
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) {
    langSelector.value = currentLanguage;
    langSelector.addEventListener('change', (e) => setLanguage(e.target.value));
  }
});

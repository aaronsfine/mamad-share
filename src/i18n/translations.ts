export type Lang = 'en' | 'he';

const translations = {
  // Common
  'app.name': { en: 'Mamad Directory', he: 'מדריך ממ"ד' },
  'app.tagline': { en: 'A community project helping families find safe shelter.', he: 'פרויקט קהילתי שעוזר למשפחות למצוא מקלט בטוח.' },

  // Nav / Header
  'nav.listApartment': { en: 'List Your Apartment', he: 'פרסם דירה' },
  'nav.feed': { en: 'Feed', he: 'רשימה' },
  'nav.signOut': { en: 'Sign Out', he: 'התנתק' },

  // Hero
  'hero.title': { en: 'Find a Safe Place to Sleep Tonight', he: 'מצא מקום בטוח ללון הלילה' },
  'hero.subtitle': { en: 'Families across Israel are opening their homes to help others stay safe during sirens. Find a nearby apartment with a secure room (mamad) and contact the host directly.', he: 'משפחות ברחבי ישראל פותחות את בתיהן כדי לעזור לאחרים להישאר בטוחים בזמן אזעקות. מצא דירה קרובה עם ממ"ד ופנה למארח ישירות.' },
  'hero.subtext': { en: 'Simple. Fast. Community-driven and free to use.', he: 'פשוט. מהיר. מונע קהילתית וחינמי.' },

  // Filters
  'filters.browse': { en: 'Browse available safe rooms', he: 'חפש חדרים בטוחים זמינים' },
  'filters.city': { en: 'City', he: 'עיר' },
  'filters.neighborhood': { en: 'Neighborhood', he: 'שכונה' },
  'filters.allCities': { en: 'All Cities', he: 'כל הערים' },
  'filters.allNeighborhoods': { en: 'All Neighborhoods', he: 'כל השכונות' },
  'filters.sortBy': { en: 'Sort By', he: 'מיין לפי' },
  'filters.priceLow': { en: 'Price: Low → High', he: 'מחיר: נמוך → גבוה' },
  'filters.priceHigh': { en: 'Price: High → Low', he: 'מחיר: גבוה → נמוך' },
  'filters.nearest': { en: 'Nearest First', he: 'הקרוב ביותר' },
  'filters.more': { en: 'More Filters', he: 'סינון נוסף' },
  'filters.pets': { en: 'Pets', he: 'חיות מחמד' },
  'filters.any': { en: 'Any', he: 'הכל' },
  'filters.petsOk': { en: 'Pets OK', he: 'מותר חיות' },
  'filters.noPets': { en: 'No Pets', he: 'ללא חיות' },
  'filters.smoking': { en: 'Smoking', he: 'עישון' },
  'filters.smokingOk': { en: 'Smoking OK', he: 'מותר עישון' },
  'filters.noSmoking': { en: 'No Smoking', he: 'ללא עישון' },
  'filters.price': { en: 'Price', he: 'מחיר' },
  'filters.anyPrice': { en: 'Any Price', he: 'כל מחיר' },
  'filters.freeOnly': { en: 'Free Only', he: 'חינם בלבד' },
  'filters.minBeds': { en: 'Min Beds', he: 'מיטות מינימום' },
  'filters.minBedrooms': { en: 'Min Bedrooms', he: 'חדרים מינימום' },
  'filters.maxPrice': { en: 'Max Price', he: 'מחיר מקסימלי' },
  'filters.free': { en: 'Free', he: 'חינם' },
  'filters.nearby': { en: 'Nearby', he: 'בקרבת מקום' },

  // Results
  'results.title': { en: 'Available shelters', he: 'מקלטים זמינים' },
  'results.none.title': { en: 'No shelters listed here yet', he: 'עדיין אין מקלטים כאן' },
  'results.none.text': { en: 'Be the first to help. List your mamad and protect a family tonight.', he: 'היה הראשון לעזור. פרסם את הממ"ד שלך והגן על משפחה הלילה.' },
  'results.none.cta': { en: 'List your mamad now', he: 'פרסם את הממ"ד שלך עכשיו' },
  'results.found': { en: 'shelters available', he: 'מקלטים זמינים' },
  'results.few': { en: 'we need more — list yours to help', he: 'אנחנו צריכים עוד — פרסם את שלך כדי לעזור' },
  'results.in': { en: 'in', he: 'ב' },

  // Listing Card
  'card.hostedBy': { en: 'Hosted by', he: 'מאורח על ידי' },
  'card.bedroom': { en: 'bedroom', he: 'חדר שינה' },
  'card.bedrooms': { en: 'bedrooms', he: 'חדרי שינה' },
  'card.bed': { en: 'bed', he: 'מיטה' },
  'card.beds': { en: 'beds', he: 'מיטות' },
  'card.petsWelcome': { en: 'Pets Welcome', he: 'מותר חיות מחמד' },
  'card.noPets': { en: 'No Pets', he: 'ללא חיות מחמד' },
  'card.smokingOk': { en: 'Smoking OK', he: 'מותר עישון' },
  'card.noSmoking': { en: 'No Smoking', he: 'ללא עישון' },
  'card.free': { en: 'Free', he: 'חינם' },
  'card.perNight': { en: '/night', he: '/לילה' },
  'card.viewDetails': { en: 'View details', he: 'פרטים נוספים' },
  'card.contactWhatsApp': { en: 'Contact via WhatsApp', he: 'צור קשר בוואטסאפ' },
  'card.whatsappHint': { en: "You'll be taken to WhatsApp to message the host directly.", he: 'תועבר לוואטסאפ כדי לשלוח הודעה ישירות למארח.' },
  'card.photos': { en: 'photos', he: 'תמונות' },
  'card.sleepingArrangements': { en: 'Sleeping arrangements', he: 'סידורי שינה' },
  'card.shelterNotes': { en: 'Shelter notes', he: 'הערות מקלט' },

  // Footer
  'footer.about': { en: 'About', he: 'אודות' },
  'footer.howItWorks': { en: 'How It Works', he: 'איך זה עובד' },
  'footer.contact': { en: 'Contact', he: 'צור קשר' },

  // Login
  'login.title': { en: 'Welcome Back', he: 'ברוך שובך' },
  'login.subtitle': { en: 'Sign in to manage your shelter listing.', he: 'התחבר כדי לנהל את רישום המקלט שלך.' },
  'login.google': { en: 'Continue with Google', he: 'המשך עם Google' },
  'login.googleConnecting': { en: 'Connecting...', he: 'מתחבר...' },
  'login.or': { en: 'Or', he: 'או' },
  'login.email': { en: 'Email', he: 'אימייל' },
  'login.password': { en: 'Password', he: 'סיסמה' },
  'login.submit': { en: 'Sign In', he: 'התחבר' },
  'login.submitting': { en: 'Signing in...', he: 'מתחבר...' },
  'login.noAccount': { en: "Don't have an account?", he: 'אין לך חשבון?' },
  'login.signUp': { en: 'Sign up', he: 'הרשמה' },
  'login.failed': { en: 'Login failed', he: 'ההתחברות נכשלה' },
  'login.googleFailed': { en: 'Google login failed', he: 'ההתחברות עם Google נכשלה' },

  // Signup
  'signup.title': { en: 'Create Your Account', he: 'צור חשבון' },
  'signup.subtitle': { en: 'Sign up to list your shelter and help families.', he: 'הירשם כדי לפרסם את המקלט שלך ולעזור למשפחות.' },
  'signup.checkEmail': { en: 'Check your email', he: 'בדוק את האימייל שלך' },
  'signup.confirmSent': { en: 'We sent a confirmation link to', he: 'שלחנו קישור אימות ל' },
  'signup.confirmAction': { en: 'Click the link to activate your account.', he: 'לחץ על הקישור כדי להפעיל את חשבונך.' },
  'signup.submit': { en: 'Create Account', he: 'צור חשבון' },
  'signup.submitting': { en: 'Creating account...', he: 'יוצר חשבון...' },
  'signup.hasAccount': { en: 'Already have an account?', he: 'כבר יש לך חשבון?' },
  'signup.signIn': { en: 'Sign in', he: 'התחבר' },
  'signup.failed': { en: 'Signup failed', he: 'ההרשמה נכשלה' },

  // Welcome / Onboarding
  'welcome.title': { en: 'Welcome to Mamad Directory', he: 'ברוכים הבאים למדריך ממ"ד' },
  'welcome.subtitle': { en: 'Before you create your listing, we need a few details.', he: 'לפני שתיצור את הרישום, אנחנו צריכים כמה פרטים.' },
  'welcome.fullName': { en: 'Full Name', he: 'שם מלא' },
  'welcome.fullNamePlaceholder': { en: 'Your full name', he: 'השם המלא שלך' },
  'welcome.whatsapp': { en: 'WhatsApp Number', he: 'מספר וואטסאפ' },
  'welcome.whatsappHint': { en: 'Include your country code, no spaces or dashes.', he: 'כלול קידומת מדינה, ללא רווחים או מקפים.' },
  'welcome.submit': { en: 'Continue to Dashboard', he: 'המשך ללוח הבקרה' },
  'welcome.saving': { en: 'Saving...', he: 'שומר...' },

  // Dashboard
  'dash.title': { en: 'Host Dashboard', he: 'לוח בקרה למארח' },
  'dash.yourListing': { en: 'Your Listing', he: 'הרישום שלך' },
  'dash.live': { en: 'Live — visible to families', he: 'פעיל — גלוי למשפחות' },
  'dash.hidden': { en: 'Hidden from public feed', he: 'מוסתר מהרשימה הציבורית' },
  'dash.edit': { en: 'Edit', he: 'ערוך' },
  'dash.editTitle': { en: 'Edit Your Listing', he: 'ערוך את הרישום שלך' },
  'dash.createTitle': { en: 'Create Your Listing', he: 'צור את הרישום שלך' },
  'dash.editSubtitle': { en: 'Update your shelter information below.', he: 'עדכן את פרטי המקלט שלך למטה.' },
  'dash.createSubtitle': { en: 'Fill out the form to list your shelter.', he: 'מלא את הטופס כדי לפרסם את המקלט שלך.' },
  'dash.cancel': { en: 'Cancel', he: 'ביטול' },
  'dash.status': { en: 'Listing Status', he: 'סטטוס רישום' },
  'dash.statusActive': { en: 'Your listing is visible to families.', he: 'הרישום שלך גלוי למשפחות.' },
  'dash.statusHidden': { en: 'Your listing is hidden from the public feed.', he: 'הרישום שלך מוסתר מהרשימה הציבורית.' },
  'dash.yourName': { en: 'Your Name', he: 'השם שלך' },
  'dash.phone': { en: 'Phone (with country code)', he: 'טלפון (עם קידומת מדינה)' },
  'dash.address': { en: 'Approximate Address', he: 'כתובת משוערת' },
  'dash.addressHint': { en: 'Private — not shown publicly. Used only for the approximate map.', he: 'פרטי — לא מוצג לציבור. משמש רק למפה המשוערת.' },
  'dash.bedrooms': { en: 'Bedrooms', he: 'חדרי שינה' },
  'dash.totalBeds': { en: 'Total Beds', he: 'מספר מיטות' },
  'dash.petsWelcome': { en: 'Pets Welcome', he: 'מותר חיות מחמד' },
  'dash.smokingOk': { en: 'Smoking OK', he: 'מותר עישון' },
  'dash.pricing': { en: 'Pricing', he: 'תמחור' },
  'dash.pricingHint': { en: '🇮🇱 This is part of the national effort. We encourage offering your space for free or at a symbolic cost. Every family you shelter is a victory for the home front.', he: '🇮🇱 זה חלק מהמאמץ הלאומי. אנחנו מעודדים להציע את המקום שלך בחינם או בעלות סמלית. כל משפחה שאתה מגן עליה היא ניצחון של העורף.' },
  'dash.free': { en: 'Free (חסד)', he: 'חינם (חסד)' },
  'dash.subsidized': { en: 'Subsidized', he: 'מסובסד' },
  'dash.pricePerNight': { en: 'Price per night (₪)', he: 'מחיר ללילה (₪)' },
  'dash.priceHint': { en: "Please keep costs minimal — just enough to cover utilities or supplies. Families are counting on your generosity. 💙", he: 'אנא שמור על עלויות מינימליות — רק מספיק לכיסוי הוצאות. משפחות סומכות על הנדיבות שלך. 💙' },
  'dash.sleepingNotes': { en: 'Sleeping Notes (optional)', he: 'הערות שינה (אופציונלי)' },
  'dash.mamadNotes': { en: 'Mamad Notes (optional)', he: 'הערות ממ"ד (אופציונלי)' },
  'dash.photos': { en: 'Photos (optional)', he: 'תמונות (אופציונלי)' },
  'dash.photosHint': { en: 'Add photos of your space to help families feel comfortable. Max 5 photos.', he: 'הוסף תמונות של המקום שלך כדי לעזור למשפחות להרגיש בנוח. מקסימום 5 תמונות.' },
  'dash.addPhotos': { en: 'Add Photos', he: 'הוסף תמונות' },
  'dash.saving': { en: 'Saving...', he: 'שומר...' },
  'dash.updateListing': { en: 'Update Listing', he: 'עדכן רישום' },
  'dash.createListing': { en: 'Create Listing', he: 'צור רישום' },
  'dash.noListing.title': { en: "Your mamad can save lives", he: 'הממ"ד שלך יכול להציל חיים' },
  'dash.noListing.text': { en: 'Families across Israel need shelter tonight. Add your mamad to the directory and become part of the home front defense.', he: 'משפחות ברחבי ישראל צריכות מקלט הלילה. הוסף את הממ"ד שלך למדריך והפוך לחלק מהגנת העורף.' },
  'dash.privateAddress': { en: 'Private address', he: 'כתובת פרטית' },
  'dash.freeKindness': { en: 'Free — חסד (act of kindness)', he: 'חינם — חסד' },

  // About
  'about.title': { en: 'About Mamad Directory', he: 'אודות מדריך ממ"ד' },
  'about.intro': { en: 'Mamad Directory is Israel\'s civilian shelter network — connecting families who need a safe room with patriots who have one to share. While the IDF defends our skies, we defend our neighbors.', he: 'מדריך ממ"ד הוא רשת המקלטים האזרחית של ישראל — מחברת משפחות שצריכות חדר בטוח עם פטריוטים שיש להם אחד לשתף. בזמן שצה"ל מגן על השמיים שלנו, אנחנו מגנים על השכנים שלנו.' },
  'about.community': { en: 'Home Front Defense', he: 'הגנת העורף' },
  'about.communityDesc': { en: 'Every mamad listed strengthens our national resilience. You don\'t need a uniform to serve.', he: 'כל ממ"ד שמפורסם מחזק את החוסן הלאומי שלנו. לא צריך מדים כדי לשרת.' },
  'about.people': { en: 'Am Yisrael Chai', he: 'עם ישראל חי' },
  'about.peopleDesc': { en: 'Real families opening their doors because that\'s what we do — we protect each other.', he: 'משפחות אמיתיות פותחות את דלתותיהן כי ככה אנחנו — אנחנו מגנים אחד על השני.' },
  'about.shelter': { en: 'Every Room Counts', he: 'כל חדר חשוב' },
  'about.shelterDesc': { en: 'Every listing is a reinforced safe room (mamad) that could save a family\'s life tonight.', he: 'כל רישום הוא חדר מוגן (ממ"ד) שיכול להציל חיי משפחה הלילה.' },
  'about.believe': { en: 'Our soldiers fight on the front. Our pilots defend the skies. And we — the civilians — defend each other. This platform makes it simple: share your safe room, save a family. Together, we are unbreakable.', he: 'החיילים שלנו נלחמים בחזית. הטייסים שלנו מגנים על השמיים. ואנחנו — האזרחים — מגנים אחד על השני. הפלטפורמה הזו מפשטת את זה: שתף את החדר הבטוח שלך, הצל משפחה. ביחד, אנחנו בלתי שבירים.' },
  'about.free': { en: 'Mamad Directory is free, open to all, and built with love for Israel. 🇮🇱', he: 'מדריך ממ"ד הוא חינמי, פתוח לכולם, ונבנה באהבה לישראל. 🇮🇱' },

  // How It Works
  'how.title': { en: 'How It Works', he: 'איך זה עובד' },
  'how.subtitle': { en: 'Finding a safe place or sharing yours takes just a few steps.', he: 'למצוא מקום בטוח או לשתף את שלך לוקח רק כמה צעדים.' },
  'how.guestTitle': { en: 'Looking for shelter?', he: 'מחפש מקלט?' },
  'how.guest1.title': { en: 'Browse listings', he: 'עיין ברישומים' },
  'how.guest1.desc': { en: 'Use the city and neighborhood filters to find available mamads near you. If you allow location access, listings will be sorted by distance.', he: 'השתמש בסינון עיר ושכונה כדי למצוא ממ"דים זמינים בקרבתך. אם תאפשר גישה למיקום, הרישומים ימוינו לפי מרחק.' },
  'how.guest2.title': { en: 'Contact the host', he: 'צור קשר עם המארח' },
  'how.guest2.desc': { en: "Found a good match? Tap the WhatsApp button to message the host directly. Introduce yourself and coordinate your stay.", he: 'מצאת התאמה טובה? לחץ על כפתור הוואטסאפ כדי לשלוח הודעה ישירות למארח. הצג את עצמך ותאם את השהייה.' },
  'how.guest3.title': { en: 'Stay safe', he: 'הישאר בטוח' },
  'how.guest3.desc': { en: "The host will share their address and any details you need. Bring your essentials and stay as long as needed.", he: 'המארח ישתף את הכתובת וכל פרט שתצטרך. הבא את הדברים החיוניים והישאר כמה שצריך.' },
  'how.hostTitle': { en: 'Ready to serve?', he: 'מוכן לשרת?' },
  'how.host1.title': { en: 'Create an account', he: 'צור חשבון' },
  'how.host1.desc': { en: 'Sign up with your email. Quick onboarding — name and WhatsApp number. Takes 60 seconds.', he: 'הירשם עם האימייל שלך. הרשמה מהירה — שם ומספר וואטסאפ. לוקח 60 שניות.' },
  'how.host2.title': { en: 'List your mamad', he: 'פרסם את הממ"ד' },
  'how.host2.desc': { en: 'Share your apartment details — beds, bedrooms, city. Your exact address stays private and secure.', he: 'שתף את פרטי הדירה — מיטות, חדרים, עיר. הכתובת המדויקת נשארת פרטית ומאובטחת.' },
  'how.host3.title': { en: 'Protect a family', he: 'הגן על משפחה' },
  'how.host3.desc': { en: "Families will reach out via WhatsApp. You choose who to host and when. Every night you host is a night a family sleeps safe.", he: 'משפחות יפנו אליך בוואטסאפ. אתה בוחר את מי לארח ומתי. כל לילה שאתה מארח הוא לילה שמשפחה ישנה בטוח.' },
  'how.cta': { en: 'Browse Listings', he: 'עיין ברישומים' },

  // Contact
  'contact.title': { en: 'Contact Us', he: 'צור קשר' },
  'contact.subtitle': { en: "Have questions, feedback, or want to help? We'd love to hear from you.", he: 'שאלות, משוב, או רוצה לעזור? נשמח לשמוע ממך.' },
  'contact.email': { en: 'Email', he: 'אימייל' },
  'contact.emailDesc': { en: 'For general inquiries, partnerships, or support.', he: 'לפניות כלליות, שיתופי פעולה, או תמיכה.' },
  'contact.volunteer': { en: 'Want to volunteer?', he: 'רוצה להתנדב?' },
  'contact.volunteerDesc': { en: "Mamad Directory is a community project. If you're a developer, designer, translator, or community organizer who wants to help — reach out. We're especially looking for help with Hebrew translation and outreach to host families.", he: 'מדריך ממ"ד הוא פרויקט קהילתי. אם אתה מפתח, מעצב, מתרגם, או מארגן קהילתי שרוצה לעזור — פנה אלינו.' },
  'contact.report': { en: 'Report an issue', he: 'דווח על בעיה' },
  'contact.reportDesc': { en: 'If you encounter a problem with a listing or have safety concerns, please email us immediately and we\'ll look into it.', he: 'אם נתקלת בבעיה ברישום או שיש לך חששות בטיחותיים, אנא שלח לנו אימייל מיד ונבדוק את זה.' },

  // 404
  '404.title': { en: '404', he: '404' },
  '404.text': { en: 'Oops! Page not found', he: 'אופס! הדף לא נמצא' },
  '404.link': { en: 'Return to Home', he: 'חזור לדף הבית' },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): string {
  return translations[key]?.[lang] ?? translations[key]?.en ?? key;
}

export default translations;

export type Lang = 'en' | 'he';

const translations = {
  // Common
  'app.name': { en: 'Mamad Directory', he: 'מדריך ממ"ד' },
  'app.tagline': { en: 'The home front needs you. Open your door, protect a family.', he: 'העורף צריך אותך. פתח את הדלת, הגן על משפחה.' },

  // Nav / Header
  'nav.listApartment': { en: 'Join the Effort', he: 'הצטרף למאמץ' },
  'nav.feed': { en: 'Feed', he: 'רשימה' },
  'nav.signOut': { en: 'Sign Out', he: 'התנתק' },

  // Hero
  'hero.title': { en: 'The Home Front Needs You', he: 'העורף צריך אותך' },
  'hero.subtitle': { en: 'While our soldiers fight on the front lines, you can protect families on the home front. Open your mamad — give a family safety tonight.', he: 'בזמן שהחיילים שלנו נלחמים בחזית, אתה יכול להגן על משפחות בעורף. פתח את הממ"ד שלך — תן למשפחה ביטחון הלילה.' },
  'hero.subtext': { en: 'Every apartment listed is another family protected. 🇮🇱', he: 'כל דירה שמפורסמת היא עוד משפחה מוגנת. 🇮🇱' },

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
  'results.title': { en: 'Safe rooms available', he: 'חדרים בטוחים זמינים' },
  'results.none.title': { en: 'No safe rooms here yet', he: 'עדיין אין חדרים בטוחים כאן' },
  'results.none.text': { en: 'Try another city or neighborhood, or check back soon as more families open their homes.', he: 'נסה עיר או שכונה אחרת, או חזור בקרוב כשמשפחות נוספות פותחות את בתיהן.' },
  'results.none.cta': { en: 'List your apartment', he: 'פרסם את הדירה שלך' },
  'results.found': { en: 'places found', he: 'מקומות נמצאו' },
  'results.few': { en: 'only a few rooms available right now', he: 'רק מעט חדרים זמינים כרגע' },
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
  'dash.pricingHint': { en: '🕊️ This platform is built on חסד — kindness. We encourage offering your space for free or at a symbolic cost to cover expenses. This is about helping families in need.', he: '🕊️ הפלטפורמה נבנתה על חסד. אנחנו מעודדים להציע את המקום שלך בחינם או בעלות סמלית לכיסוי הוצאות. מדובר בעזרה למשפחות נזקקות.' },
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
  'dash.noListing.title': { en: "You haven't added a shelter yet", he: 'עדיין לא הוספת מקלט' },
  'dash.noListing.text': { en: 'Add your mamad to help families in need. Your listing will appear in the public directory once published.', he: 'הוסף את הממ"ד שלך כדי לעזור למשפחות נזקקות. הרישום שלך יופיע במדריך הציבורי לאחר הפרסום.' },
  'dash.privateAddress': { en: 'Private address', he: 'כתובת פרטית' },
  'dash.freeKindness': { en: 'Free — חסד (act of kindness)', he: 'חינם — חסד' },

  // About
  'about.title': { en: 'About Mamad Directory', he: 'אודות מדריך ממ"ד' },
  'about.intro': { en: 'Mamad Directory is a community-driven platform connecting families who need a safe place to sleep during rocket sirens with generous hosts who have a secure room (mamad) in their apartment.', he: 'מדריך ממ"ד הוא פלטפורמה קהילתית המחברת משפחות הזקוקות למקום בטוח ללון בזמן אזעקות עם מארחים נדיבים שיש להם ממ"ד בדירתם.' },
  'about.community': { en: 'Community First', he: 'קהילה קודמת' },
  'about.communityDesc': { en: 'Built by people who care, for people in need. No fees, no middlemen.', he: 'נבנה על ידי אנשים שאכפת להם, עבור אנשים נזקקים. ללא עמלות, ללא מתווכים.' },
  'about.people': { en: 'People Helping People', he: 'אנשים עוזרים לאנשים' },
  'about.peopleDesc': { en: 'Real families opening their homes to help others stay safe.', he: 'משפחות אמיתיות פותחות את בתיהן כדי לעזור לאחרים להישאר בטוחים.' },
  'about.shelter': { en: 'Safe Shelter', he: 'מקלט בטוח' },
  'about.shelterDesc': { en: 'Every listing includes a mamad — a reinforced safe room for protection.', he: 'כל רישום כולל ממ"ד — חדר מוגן מחוזק להגנה.' },
  'about.believe': { en: 'We believe that in times of crisis, the strongest thing a community can do is come together. This platform makes it easy for hosts to share their space and for families to find safety — all through a simple, direct WhatsApp connection.', he: 'אנחנו מאמינים שבזמני משבר, הדבר החזק ביותר שקהילה יכולה לעשות הוא להתאחד. הפלטפורמה הזו מקלה על מארחים לשתף את המקום שלהם ועל משפחות למצוא בטיחות — הכל דרך חיבור פשוט וישיר בוואטסאפ.' },
  'about.free': { en: 'Mamad Directory is free to use, open to everyone, and built with love for Israel.', he: 'מדריך ממ"ד הוא חינמי, פתוח לכולם, ונבנה באהבה לישראל.' },

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
  'how.hostTitle': { en: 'Want to help?', he: 'רוצה לעזור?' },
  'how.host1.title': { en: 'Create an account', he: 'צור חשבון' },
  'how.host1.desc': { en: 'Sign up with your email. Complete a quick onboarding with your name and WhatsApp number.', he: 'הירשם עם האימייל שלך. השלם הרשמה מהירה עם השם ומספר הוואטסאפ שלך.' },
  'how.host2.title': { en: 'Add your listing', he: 'הוסף את הרישום שלך' },
  'how.host2.desc': { en: 'Share details about your apartment — number of beds, bedrooms, and your city. Your exact address stays private.', he: 'שתף פרטים על הדירה — מספר מיטות, חדרי שינה, והעיר שלך. הכתובת המדויקת נשארת פרטית.' },
  'how.host3.title': { en: 'Get contacted', he: 'קבל פניות' },
  'how.host3.desc': { en: "Families in need will reach out via WhatsApp. You're in full control of who you host and when.", he: 'משפחות נזקקות יפנו אליך בוואטסאפ. אתה שולט לחלוטין במי שאתה מארח ומתי.' },
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

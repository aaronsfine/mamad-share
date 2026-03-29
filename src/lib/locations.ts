/**
 * Static list of major Israeli cities and their neighborhoods.
 * Used for consistent, searchable city/neighborhood selection.
 */

export interface CityData {
  city: string;
  neighborhoods: string[];
}

export const ISRAEL_LOCATIONS: CityData[] = [
  {
    city: 'Jerusalem',
    neighborhoods: [
      'Arnona', 'Baka', 'Bayit Vegan', 'Beit Hakerem', 'City Center',
      'Ein Kerem', 'French Hill', 'German Colony', 'Gilo', 'Givat Masua',
      'Givat Shaul', 'Har Nof', 'Katamon', 'Kiryat Hayovel', 'Kiryat Moshe',
      'Malha', 'Mekor Baruch', 'Musrara', 'Nachlaot', 'Neve Yaakov',
      'Old City', 'Pisgat Zeev', 'Ramot', 'Ramat Eshkol', 'Rehavia',
      'San Simon', 'Talpiot', 'Talpiot Mizrach',
    ],
  },
  {
    city: 'Tel Aviv',
    neighborhoods: [
      'Florentin', 'Jaffa', 'Kerem Hateimanim', 'Lev Ha\'ir',
      'Neve Sha\'anan', 'Neve Tzedek', 'North Tel Aviv', 'Old North',
      'Ramat Aviv', 'Sarona', 'Shapira', 'South Tel Aviv',
      'Yad Eliyahu', 'Yarkon',
    ],
  },
  {
    city: 'Haifa',
    neighborhoods: [
      'Ahuza', 'Bat Galim', 'Carmel Center', 'Denia', 'German Colony',
      'Hadar', 'Kiryat Eliezer', 'Kiryat Shmuel', 'Neve Sha\'anan',
      'Ramat Almogi', 'Romema', 'Wadi Nisnas',
    ],
  },
  {
    city: 'Beer Sheva',
    neighborhoods: [
      'Dalet', 'Gimmel', 'Neve Noy', 'Neve Ze\'ev', 'Old City',
      'Ramot', 'Tet',
    ],
  },
  {
    city: 'Netanya',
    neighborhoods: [
      'City Center', 'Ir Yamim', 'Kiryat Hasharon', 'Kiryat Nordau',
      'Neve Oz', 'Poleg', 'South Netanya',
    ],
  },
  {
    city: 'Rishon LeZion',
    neighborhoods: [
      'East Rishon', 'HaSharon', 'Kiryat Rishon', 'Maarav',
      'Nachalat Yehuda', 'Neve Dekalim', 'West Rishon',
    ],
  },
  {
    city: 'Petah Tikva',
    neighborhoods: [
      'Em Hamoshavot', 'Hadar Ganim', 'Kfar Ganim', 'Kfar Avraham',
      'Kiryat Arye', 'Neve Oz', 'Ramat Sigalov',
    ],
  },
  {
    city: 'Ashdod',
    neighborhoods: [
      'Alef', 'Bet', 'Gimmel', 'Dalet', 'Hey', 'Vav', 'Zayin',
      'Chet', 'Tet', 'Yud', 'Marina',
    ],
  },
  {
    city: 'Ashkelon',
    neighborhoods: [
      'Afridar', 'Barnea', 'City Center', 'Neve Dekalim',
      'Shimshon', 'South Beach',
    ],
  },
  {
    city: 'Herzliya',
    neighborhoods: [
      'City Center', 'Herzliya Pituach', 'Neve Amal', 'Neve Yisrael',
      'Nof Yam',
    ],
  },
  {
    city: 'Ramat Gan',
    neighborhoods: [
      'City Center', 'Diamond Exchange', 'Kiryat Bialik',
      'Neve Yehoshua', 'Ramat Chen', 'Ramat Efal',
    ],
  },
  {
    city: 'Givatayim',
    neighborhoods: [
      'Borochov', 'City Center', 'Neve Golan', 'Ramat Givatayim',
    ],
  },
  {
    city: 'Bat Yam',
    neighborhoods: [
      'City Center', 'North Bat Yam', 'Pardes Hanna', 'South Bat Yam',
    ],
  },
  {
    city: 'Holon',
    neighborhoods: [
      'City Center', 'Jesse Cohen', 'Kiryat Sharet', 'Neve Rabin',
      'Wolfson',
    ],
  },
  {
    city: 'Kfar Saba',
    neighborhoods: [
      'City Center', 'Green Kfar Saba', 'Neve Yerek', 'Ramat Efal',
    ],
  },
  {
    city: 'Ra\'anana',
    neighborhoods: [
      'City Center', 'Neve Zemer', 'North Ra\'anana', 'South Ra\'anana',
    ],
  },
  {
    city: 'Modiin',
    neighborhoods: [
      'Buchman', 'Moriah', 'Nave Modiin', 'Yishai',
    ],
  },
  {
    city: 'Rehovot',
    neighborhoods: [
      'City Center', 'Kiryat Weizmann', 'Neve Noy', 'North Rehovot',
    ],
  },
  {
    city: 'Tiberias',
    neighborhoods: [
      'City Center', 'Kiryat Shmuel', 'North Tiberias', 'South Tiberias',
    ],
  },
  {
    city: 'Sderot',
    neighborhoods: [
      'City Center', 'North Sderot', 'South Sderot',
    ],
  },
];

/** Hebrew translations for city names (key = English name stored in DB) */
export const CITY_HEBREW: Record<string, string> = {
  'Jerusalem': 'ירושלים',
  'Tel Aviv': 'תל אביב',
  'Haifa': 'חיפה',
  'Beer Sheva': 'באר שבע',
  'Netanya': 'נתניה',
  'Rishon LeZion': 'ראשון לציון',
  'Petah Tikva': 'פתח תקווה',
  'Ashdod': 'אשדוד',
  'Ashkelon': 'אשקלון',
  'Herzliya': 'הרצליה',
  'Ramat Gan': 'רמת גן',
  'Givatayim': 'גבעתיים',
  'Bat Yam': 'בת ים',
  'Holon': 'חולון',
  'Kfar Saba': 'כפר סבא',
  "Ra'anana": 'רעננה',
  'Modiin': 'מודיעין',
  'Rehovot': 'רחובות',
  'Tiberias': 'טבריה',
  'Sderot': 'שדרות',
};

/** Hebrew translations for neighborhood names */
export const NEIGHBORHOOD_HEBREW: Record<string, Record<string, string>> = {
  'Jerusalem': {
    'Arnona': 'ארנונה', 'Baka': 'בקעה', 'Bayit Vegan': 'בית וגן', 'Beit Hakerem': 'בית הכרם',
    'City Center': 'מרכז העיר', 'Ein Kerem': 'עין כרם', 'French Hill': 'גבעה הצרפתית',
    'German Colony': 'המושבה הגרמנית', 'Gilo': 'גילה', 'Givat Masua': 'גבעת מסואה',
    'Givat Shaul': 'גבעת שאול', 'Har Nof': 'הר נוף', 'Katamon': 'קטמון',
    'Kiryat Hayovel': 'קריית היובל', 'Kiryat Moshe': 'קריית משה', 'Malha': 'מלחה',
    'Mekor Baruch': 'מקור ברוך', 'Musrara': 'מוסררה', 'Nachlaot': 'נחלאות',
    'Neve Yaakov': 'נווה יעקב', 'Old City': 'העיר העתיקה', 'Pisgat Zeev': 'פסגת זאב',
    'Ramot': 'רמות', 'Ramat Eshkol': 'רמת אשכול', 'Rehavia': 'רחביה',
    'San Simon': 'סן סימון', 'Talpiot': 'תלפיות', 'Talpiot Mizrach': 'תלפיות מזרח',
  },
  'Tel Aviv': {
    'Florentin': 'פלורנטין', 'Jaffa': 'יפו', 'Kerem Hateimanim': 'כרם התימנים',
    "Lev Ha'ir": 'לב העיר', "Neve Sha'anan": 'נווה שאנן', 'Neve Tzedek': 'נווה צדק',
    'North Tel Aviv': 'צפון תל אביב', 'Old North': 'הצפון הישן', 'Ramat Aviv': 'רמת אביב',
    'Sarona': 'שרונה', 'Shapira': 'שפירא', 'South Tel Aviv': 'דרום תל אביב',
    'Yad Eliyahu': 'יד אליהו', 'Yarkon': 'ירקון',
  },
  'Haifa': {
    'Ahuza': 'אחוזה', 'Bat Galim': 'בת גלים', 'Carmel Center': 'מרכז הכרמל',
    'Denia': 'דניה', 'German Colony': 'המושבה הגרמנית', 'Hadar': 'הדר',
    'Kiryat Eliezer': 'קריית אליעזר', 'Kiryat Shmuel': 'קריית שמואל',
    "Neve Sha'anan": 'נווה שאנן', 'Ramat Almogi': 'רמת אלמוגי', 'Romema': 'רוממה',
    'Wadi Nisnas': 'ואדי ניסנאס',
  },
  'Beer Sheva': {
    'Dalet': 'ד׳', 'Gimmel': 'ג׳', 'Neve Noy': 'נווה נוי', "Neve Ze'ev": 'נווה זאב',
    'Old City': 'העיר העתיקה', 'Ramot': 'רמות', 'Tet': 'ט׳',
  },
  'Netanya': {
    'City Center': 'מרכז העיר', 'Ir Yamim': 'עיר ימים', 'Kiryat Hasharon': 'קריית השרון',
    'Kiryat Nordau': 'קריית נורדאו', 'Neve Oz': 'נווה עוז', 'Poleg': 'פולג',
    'South Netanya': 'דרום נתניה',
  },
  'Rishon LeZion': {
    'East Rishon': 'מזרח ראשון', 'HaSharon': 'השרון', 'Kiryat Rishon': 'קריית ראשון',
    'Maarav': 'מערב', 'Nachalat Yehuda': 'נחלת יהודה', 'Neve Dekalim': 'נווה דקלים',
    'West Rishon': 'מערב ראשון',
  },
  'Petah Tikva': {
    'Em Hamoshavot': 'אם המושבות', 'Hadar Ganim': 'הדר גנים', 'Kfar Ganim': 'כפר גנים',
    'Kfar Avraham': 'כפר אברהם', 'Kiryat Arye': 'קריית אריה', 'Neve Oz': 'נווה עוז',
    'Ramat Sigalov': 'רמת סיגלוב',
  },
  'Ashdod': {
    'Alef': 'א׳', 'Bet': 'ב׳', 'Gimmel': 'ג׳', 'Dalet': 'ד׳', 'Hey': 'ה׳',
    'Vav': 'ו׳', 'Zayin': 'ז׳', 'Chet': 'ח׳', 'Tet': 'ט׳', 'Yud': 'י׳', 'Marina': 'מרינה',
  },
  'Ashkelon': {
    'Afridar': 'אפרידר', 'Barnea': 'ברנע', 'City Center': 'מרכז העיר',
    'Neve Dekalim': 'נווה דקלים', 'Shimshon': 'שמשון', 'South Beach': 'חוף דרומי',
  },
  'Herzliya': {
    'City Center': 'מרכז העיר', 'Herzliya Pituach': 'הרצליה פיתוח',
    'Neve Amal': 'נווה עמל', 'Neve Yisrael': 'נווה ישראל', 'Nof Yam': 'נוף ים',
  },
  'Ramat Gan': {
    'City Center': 'מרכז העיר', 'Diamond Exchange': 'בורסת היהלומים',
    'Kiryat Bialik': 'קריית ביאליק', 'Neve Yehoshua': 'נווה יהושע',
    'Ramat Chen': 'רמת חן', 'Ramat Efal': 'רמת אפעל',
  },
  'Givatayim': {
    'Borochov': 'בורוכוב', 'City Center': 'מרכז העיר', 'Neve Golan': 'נווה גולן',
    'Ramat Givatayim': 'רמת גבעתיים',
  },
  'Bat Yam': {
    'City Center': 'מרכז העיר', 'North Bat Yam': 'צפון בת ים',
    'Pardes Hanna': 'פרדס חנה', 'South Bat Yam': 'דרום בת ים',
  },
  'Holon': {
    'City Center': 'מרכז העיר', 'Jesse Cohen': 'ג׳סי כהן', 'Kiryat Sharet': 'קריית שרת',
    'Neve Rabin': 'נווה רבין', 'Wolfson': 'וולפסון',
  },
  'Kfar Saba': {
    'City Center': 'מרכז העיר', 'Green Kfar Saba': 'כפר סבא הירוקה',
    'Neve Yerek': 'נווה ירק', 'Ramat Efal': 'רמת אפעל',
  },
  "Ra'anana": {
    'City Center': 'מרכז העיר', 'Neve Zemer': 'נווה זמר',
    "North Ra'anana": 'צפון רעננה', "South Ra'anana": 'דרום רעננה',
  },
  'Modiin': {
    'Buchman': 'בוכמן', 'Moriah': 'מוריה', 'Nave Modiin': 'נווה מודיעין', 'Yishai': 'ישי',
  },
  'Rehovot': {
    'City Center': 'מרכז העיר', 'Kiryat Weizmann': 'קריית ויצמן',
    'Neve Noy': 'נווה נוי', 'North Rehovot': 'צפון רחובות',
  },
  'Tiberias': {
    'City Center': 'מרכז העיר', 'Kiryat Shmuel': 'קריית שמואל',
    'North Tiberias': 'צפון טבריה', 'South Tiberias': 'דרום טבריה',
  },
  'Sderot': {
    'City Center': 'מרכז העיר', 'North Sderot': 'צפון שדרות', 'South Sderot': 'דרום שדרות',
  },
};

/** Get display name for a city based on language */
export function getCityDisplayName(city: string, lang: 'en' | 'he'): string {
  if (lang === 'he') return CITY_HEBREW[city] ?? city;
  return city;
}

/** Get display name for a neighborhood based on language */
export function getNeighborhoodDisplayName(neighborhood: string, city: string, lang: 'en' | 'he'): string {
  if (lang === 'he') return NEIGHBORHOOD_HEBREW[city]?.[neighborhood] ?? neighborhood;
  return neighborhood;
}

/** Sorted list of all city names */
export const ALL_CITIES = ISRAEL_LOCATIONS.map((l) => l.city).sort();

/** Get neighborhoods for a given city */
export function getNeighborhoods(city: string): string[] {
  const found = ISRAEL_LOCATIONS.find((l) => l.city === city);
  return found ? found.neighborhoods : [];
}

/** Approximate city center coordinates for auto-geocoding */
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  'Jerusalem': { lat: 31.7683, lng: 35.2137 },
  'Tel Aviv': { lat: 32.0853, lng: 34.7818 },
  'Haifa': { lat: 32.7940, lng: 34.9896 },
  'Beer Sheva': { lat: 31.2530, lng: 34.7915 },
  'Rishon LeZion': { lat: 31.9730, lng: 34.7925 },
  'Petah Tikva': { lat: 32.0868, lng: 34.8874 },
  'Ashdod': { lat: 31.8014, lng: 34.6435 },
  'Netanya': { lat: 32.3215, lng: 34.8532 },
  'Holon': { lat: 32.0158, lng: 34.7796 },
  'Bnei Brak': { lat: 32.0834, lng: 34.8331 },
  'Ramat Gan': { lat: 32.0680, lng: 34.8248 },
  'Ashkelon': { lat: 31.6688, lng: 34.5743 },
  'Rehovot': { lat: 31.8928, lng: 34.8113 },
  'Bat Yam': { lat: 32.0236, lng: 34.7501 },
  'Herzliya': { lat: 32.1629, lng: 34.8441 },
  'Kfar Saba': { lat: 32.1780, lng: 34.9066 },
  'Modiin': { lat: 31.8969, lng: 35.0104 },
  'Nazareth': { lat: 32.6996, lng: 35.3035 },
  'Tiberias': { lat: 32.7922, lng: 35.5312 },
  'Sderot': { lat: 31.5268, lng: 34.5955 },
};

/** Get approximate coordinates for a city (for auto-geocoding listings) */
export function getCityCoords(city: string): { lat: number; lng: number } | null {
  return CITY_COORDS[city] ?? null;
}

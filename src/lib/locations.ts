/**
 * Static list of major Israeli cities and their neighborhoods.
 * Used for consistent, searchable city/neighborhood selection
 * (avoids transliteration inconsistencies).
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

/** Sorted list of all city names */
export const ALL_CITIES = ISRAEL_LOCATIONS.map((l) => l.city).sort();

/** Get neighborhoods for a given city */
export function getNeighborhoods(city: string): string[] {
  const found = ISRAEL_LOCATIONS.find((l) => l.city === city);
  return found ? found.neighborhoods : [];
}

export const CardName = {
  Airmail: "Airmail",
  HappyClovers: "Happy-Clovers",
  BlueSky: "Blue-Sky",
  BirthdayCake: "Birthday-Cake",
  Balloons: "Balloons",
  Star: "Star",
  Bandage: "Bandage",
  FantasyStars: "Fantasy-Stars",
  BabyGoods: "Baby-Goods",
  Ribbon: "Ribbon",
  FlowerBouquet: "Flower-Bouquet",
  Gem: "Gem",
  CoolCool: "Cool-Cool",
  LovelyHearts: "Lovely Hearts",
  Shapes: "Shapes",
  Goldfish: "Goldfish",
  Graffiti: "Graffiti",
  Fanciful: "Fanciful",
  Common: "Common",
  Decorative: "Decorative",
  Graduation: "Graduation",
  RedDragonflies: "Red-Dragonflies",
  Camo: "Camo",
  Zen: "Zen",
  Wedding: "Wedding",
  ElegantRoses: "Elegant-Roses",
  Torn: "Torn",
  SoManyHearts: "So-Many-Hearts",
  ShootingStars: "Shooting-Stars",
  StationaryGoods: "Stationary-Goods",
  Velvety: "Velvety",
  Gears: "Gears",
  DawningYear: "Dawning-Year",
  Fireworks: "Fireworks",
  // Seasonal
  BunnyDay: "Bunny-Day",
  CherryBlossoms: "Cherry-Blossoms",
  Dandelion: "Dandelion",
  FathersDay: "Father's Day",
  FullBloom: "Full Bloom",
  Hibiscus: "Hibiscus",
  MothersDay: "Mother's Day",
  FluffyClouds: "Fluffy-Clouds",
  Beach: "Beach",
  TurkeyDay: "Turkey-Day",
  Pumpkin: "Pumpkin",
  Halloween: "Halloween",
  Mushroom: "Mushroom",
  CarpetOfLeaves: "Carpet-Of-Leaves",
  Acorn: "Acorn",
} as const;

export type CardName = typeof CardName[keyof typeof CardName];

export const DEFAULT_STATIONARY = [
  CardName.Airmail,
  CardName.HappyClovers,
  CardName.BlueSky,
  CardName.BirthdayCake,
  CardName.Balloons,
  CardName.Star,
  CardName.Bandage,
  CardName.FantasyStars,
  CardName.BabyGoods,
  CardName.Ribbon,
  CardName.FlowerBouquet,
  CardName.Gem,
  CardName.CoolCool,
  CardName.LovelyHearts,
  CardName.Shapes,
  CardName.Goldfish,
  CardName.Graffiti,
  CardName.Fanciful,
  CardName.Common,
  CardName.Decorative,
  CardName.Graduation,
  CardName.RedDragonflies,
  CardName.Camo,
  CardName.Zen,
  CardName.Wedding,
  CardName.ElegantRoses,
  CardName.Torn,
  CardName.SoManyHearts,
  CardName.ShootingStars,
  CardName.StationaryGoods,
  CardName.Velvety,
  CardName.Gears,
  CardName.DawningYear,
  CardName.Fireworks
];

export const HOLIDAYS = {
  ValentinesDay: {
    name: "Valentine's Day",
    start: { month: 1, day: 16 },
    end: { month: 2, day: 14 },
    cards: []
  },
  BunnyDay: {
    name: "Bunny Day",
    start: { month: 3, day: 15 },
    end: { month: 5, day: 10 },
    cards: []
  },
  MothersDay: {
    name: "Mother's Day",
    start: { month: 5, day: 1 },
    end: { month: 5, day: 31 },
    cards: []
  },
  FathersDay: {
    name: "Father's Day",
    start: { month: 6, day: 1 },
    end: { month: 6, day: 30 },
    cards: []
  },
  Thanksgiving: {
    name: "Thanksgiving",
    start: { month: 9, day: 16 },
    end: { month: 11, day: 30 },
    cards: [CardName.TurkeyDay]
  },
  Halloween: {
    name: "Halloween",
    start: { month: 10, day: 1 },
    end: { month: 10, day: 31 },
    cards: [CardName.Halloween, CardName.Pumpkin]
  },
  Christmas: {
    name: "Christmas",
    start: { month: 11, day: 20 },
    end: { month: 1, day: 10 },
    cards: []
  },
  Spring: {
    name: "Spring",
    start: { month: 2, day: 25 },
    end: { month: 5, day: 31 },
    cards: []
  },
  Summer: {
    name: "Summer",
    start: { month: 5, day: 1 },
    end: { month: 8, day: 31 },
    cards: [CardName.FluffyClouds, CardName.Beach, CardName.Hibiscus]
  },
  Fall: {
    name: "Fall",
    start: { month: 9, day: 1 },
    end: { month: 11, day: 25 },
    cards: [CardName.Acorn, CardName.Mushroom, CardName.CarpetOfLeaves]
  },
  Winter: {
    name: "Winter",
    start: { month: 11, day: 26 },
    end: { month: 2, day: 24 },
    cards: []
  }
}

export type Holidays = typeof HOLIDAYS[keyof typeof HOLIDAYS];
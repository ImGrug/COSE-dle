const CHARACTERS = [
  {
    name: "Alec",
    height: 70,
    origin: "Missouri",
    cortisol: 8,
    yapper: "Yes",
    competitiveGamer: "Yes",
    vice: ["Mary Jane", "ARAM", "Food", "MMO's", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Bsim",
    height: 67,
    origin: "New York",
    cortisol: 8,
    yapper: "Yes",
    competitiveGamer: "yes",
    vice: ["Dat Vape", "Ball and Chain", "Alcohol"],
    comboBreaker: "yes"
  },
  {
    name: "Karper",
    height: 72,
    origin: "Arizona",
    cortisol: 4,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Nerd Games", "Reddit", "DnD", "MOBA's", "Fighting Games"],
    comboBreaker: "no"
  },
  {
    name: "Joe",
    height: 68,
    origin: "Missouri",
    cortisol: 9,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["Dat Vape", "X The Everything App", "Next Character My Main", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Max",
    height: 64,
    origin: "Arkansaw",
    cortisol: 9,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Ifunny", "ARAM", "DnD", "Youtube", "MOBA's", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kirby",
    height: 69,
    origin: "Missouri",
    cortisol: 2,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["DnD", "Teriyaki Chicken"],
    comboBreaker: "no"
  },
  {
    name: "Aidan",
    height: 50,
    origin: "Illinois",
    cortisol: 10,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: [
      "MOBA's",
      "Alcohol",
      "Red Meat",
      "Child",
      "Ball and Chain",
      "Mary Jane",
      "Old-head Takes",
      "X The Everything App",
      "Fighting Games"
    ],
    comboBreaker: "no"
  },
  {
    name: "Jimmy",
    height: 67,
    origin: "Missouri",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Oldhead Takes", "Mai", "Mary Jane", "Fighting Games", "Dat Vape"],
    comboBreaker: "yes"
  },
  {
    name: "Sohl",
    height: 67,
    origin: "California",
    cortisol: 8,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Oldhead Takes", "Mai", "Coaching", "Ego", "MOBA's", "MMO's", "Fighting Games"],
    comboBreaker: "no"
  },
  {
    name: "Evelyn",
    height: 67,
    origin: "California",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Rent", "Music", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Cobb",
    height: 68,
    origin: "Missouri",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Nerd Games", "The Pursuit of Knowledge", "MOBA's", "DnD", "Baseball"],
    comboBreaker: "yes"
  },
  {
    name: "Anthony",
    height: 67,
    origin: "Missouri",
    cortisol: 4,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Dat Vape", "X The Everything App", "The Pursuit of Knowledge", "MMO's"],
    comboBreaker: "yes"
  },
  {
    name: "Kalob",
    height: 67,
    origin: "Indiana",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Cats", "Ball and Chain", "Next Character My Main", "MMO's", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kenny",
    height: 74,
    origin: "Florida",
    cortisol: 6,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["Kissing and Telling", "ARAM", "Motorcycle"],
    comboBreaker: "yes"
  },
  {
    name: "Alyssa Sidebottom",
    height: 63,
    origin: "Missouri",
    cortisol: 7,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Nails", "Rent", "Hair", "Begging"],
    comboBreaker: "no"
  },
  {
    name: "DualDustPanMan",
    height: 72,
    origin: "Arizona",
    cortisol: 4,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Nerd Games", "Reddit", "Karper", "Alcohol"],
    comboBreaker: "no"
  },
  {
    name: "Owen",
    height: 64,
    origin: "Missouri",
    cortisol: 8,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Cats", "Ball and Chain", "The Pursuit of Knowledge"],
    comboBreaker: "no"
  },
  {
    name: "Alek",
    height: 75,
    origin: "Florida",
    cortisol: 6,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Food", "MMO's"],
    comboBreaker: "yes"
  },
  {
    name: "Charles",
    height: 67,
    origin: "Illinois",
    cortisol: 6,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["2k", "Youtube", "Mary Jane"],
    comboBreaker: "no"
  },
  {
    name: "Va",
    height: 30,
    origin: "Florida",
    cortisol: 5,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["MMO's", "Insomnia", "Die of Betes"],
    comboBreaker: "no"
  },
  {
    name: "Daniel Judd",
    height: 10,
    origin: "Missouri",
    cortisol: 10,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Food", "Music", "Begging", "MOBA's"],
    comboBreaker: "no"
  },
  {
    name: "Naia",
    height: 70,
    origin: "Missouri",
    cortisol: 7,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Mary Jane", "Cuttingboard Assault", "DnD"],
    comboBreaker: "no"
  },
  {
    name: "Thuy",
    height: 30,
    origin: "Florida",
    cortisol: 4,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Food", "MOBA's", "Dropshipping", "Scalping", "Yuumi"],
    comboBreaker: "no"
  },
  {
    name: "AlienRobot42",
    height: 60,
    origin: "California",
    cortisol: 7,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["MMO's", "MOBA's", "Reddit"],
    comboBreaker: "no"
  },
  {
    name: "Nate",
    height: 70,
    origin: "Missouri",
    cortisol: 4,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Dying For Our Country", "MOBA's", "Fighting Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kevin",
    height: 62,
    origin: "Illinois",
    cortisol: 3,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Baseball", "Fighting Games", "Fiending for Ball and Chain BAD"],
    comboBreaker: "yes"
  },
  {
    name: "Vincent",
    height: 64,
    origin: "Missouri",
    cortisol: 2,
    yapper: "no",
    competitiveGamer: "yes",
    vice: ["Food", "Alcohol", "Fighting Games", "Dat Vape", "Mary Jane"],
    comboBreaker: "yes"
  }
];

if (typeof window !== "undefined") {
  window.CHARACTERS = CHARACTERS;
}

if (typeof module !== "undefined") {
  module.exports = CHARACTERS;
}

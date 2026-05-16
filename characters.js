const CHARACTERS = [
  {
    name: "Alec",
    height: 75,
    origin: "Missouri",
    cortisol: 8,
    yapper: "Yes",
    competitiveGamer: "Yes",
    vice: ["Mary Jane", "ARAM", "Food", "MMO's", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Bsim",
    height: 73,
    origin: "New York",
    cortisol: 8,
    yapper: "Yes",
    competitiveGamer: "yes",
    vice: ["Dat Vape", "Ball and Chain", "Alcohol", "Music"],
    comboBreaker: "yes"
  },
  {
    name: "Karper",
    height: 72,
    origin: "Arizona",
    cortisol: 4,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Nerd-Games", "Reddit", "DnD", "MOBA's", "Fighting-Games"],
    comboBreaker: "no"
  },
  {
    name: "Joe",
    height: 74,
    origin: "Missouri",
    cortisol: 9,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["Dat Vape", "X The Everything App", "Next Character My Main", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Max",
    height: 65,
    origin: "Michigan",
    cortisol: 9,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Ifunny", "ARAM", "DnD", "Youtube", "MOBA's", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kirby",
    height: 70,
    origin: "Missouri",
    cortisol: 2,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["DnD", "Teriyaki Chicken"],
    comboBreaker: "no"
  },
  {
    name: "Aidan",
    height: 65,
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
      "Fighting-Games"
    ],
    comboBreaker: "no"
  },
  {
    name: "Jimmy",
    height: 74,
    origin: "Missouri",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Oldhead Takes", "Mai", "Mary Jane", "Fighting-Games", "Dat Vape"],
    comboBreaker: "yes"
  },
  {
    name: "Sohl",
    height: 74,
    origin: "California",
    cortisol: 8,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["Oldhead Takes", "Mai", "Coaching", "Ego", "MOBA's", "MMO's", "Fighting-Games"],
    comboBreaker: "no"
  },
  {
    name: "Evelyn",
    height: 71,
    origin: "California",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Rent", "Music", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Cobb",
    height: 68,
    origin: "Missouri",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Nerd-Games", "The-Pursuit-of-Knowledge", "MOBA's", "DnD", "Baseball"],
    comboBreaker: "yes"
  },
  {
    name: "Anthony",
    height: 67,
    origin: "Missouri",
    cortisol: 4,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Dat Vape", "X The-Everything App", "The-Pursuit of Knowledge", "MMO's"],
    comboBreaker: "yes"
  },
  {
    name: "Kalob",
    height: 74,
    origin: "Indiana",
    cortisol: 6,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Cats", "Ball and Chain", "Next Character My Main", "MMO's", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kenny",
    height: 74,
    origin: "Florida",
    cortisol: 6,
    yapper: "yes",
    competitiveGamer: "yes",
    vice: ["Kiss-N-Telling", "ARAM", "Motorcycle"],
    comboBreaker: "yes"
  },
  {
    name: "Alyssa Sidebottom",
    height: 63,
    origin: "Missouri",
    cortisol: 7,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Nails", "Rent", "Hair", "Begging", "Kissing-N-Telling"],
    comboBreaker: "no"
  },
  {
    name: "DualDustPanMan",
    height: 68,
    origin: "Arizona",
    cortisol: 4,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Nerd-Games", "Reddit", "Karper", "Alcohol"],
    comboBreaker: "no"
  },
  {
    name: "Owen",
    height: 68,
    origin: "Missouri",
    cortisol: 8,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Cats", "Ball and Chain", "The-Pursuit of Knowledge"],
    comboBreaker: "no"
  },
  {
    name: "Alek",
    height: 76,
    origin: "Florida",
    cortisol: 6,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Food", "MMO's"],
    comboBreaker: "yes"
  },
  {
    name: "Charles",
    height: 72,
    origin: "Illinois",
    cortisol: 6,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["2k", "Youtube", "Mary Jane"],
    comboBreaker: "no"
  },
  {
    name: "Vasilios Voyatzoglou",
    height: 69,
    origin: "Florida",
    cortisol: 7,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["MMO's", "Insomnia", "Die-of-Betes"],
    comboBreaker: "no"
  },
  {
    name: "Daniel Judd",
    height: 53,
    origin: "Missouri",
    cortisol: 10,
    yapper: "sometimes",
    competitiveGamer: "yes",
    vice: ["Food", "Music", "Begging", "MOBA's"],
    comboBreaker: "no"
  },
  {
    name: "Naia",
    height: 69,
    origin: "Missouri",
    cortisol: 8,
    yapper: "yes",
    competitiveGamer: "no",
    vice: ["Mary Jane", "Cuttingboard Assault", "DnD"],
    comboBreaker: "no"
  },
  {
    name: "Thuy",
    height: 52,
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
    vice: ["MMO's", "MOBA's", "Reddit","Nerd-Games"],
    comboBreaker: "no"
  },
  {
    name: "Nate",
    height: 72,
    origin: "Missouri",
    cortisol: 4,
    yapper: "no",
    competitiveGamer: "no",
    vice: ["Dying-For-Our-Country", "MOBA's", "Fighting-Games"],
    comboBreaker: "yes"
  },
  {
    name: "Kevin",
    height: 66,
    origin: "Illinois",
    cortisol: 3,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["Baseball", "Fighting-Games", "Fiending-for-Ball-and-Chain-BAD"],
    comboBreaker: "yes"
  },
  {
    name: "Vincent",
    height: 67,
    origin: "Missouri",
    cortisol: 2,
    yapper: "no",
    competitiveGamer: "yes",
    vice: ["Food", "Alcohol", "Fighting-Games", "Dat Vape"],
    comboBreaker: "yes"
  },
  {
    name: "Tyler Sexton",
    height: 72,
    origin: "Missouri",
    cortisol: 5,
    yapper: "sometimes",
    competitiveGamer: "no",
    vice: ["MMO's", "Microphone", "Ball and Chain", "Nerd-Games"],
    comboBreaker: "no"
  }
];

if (typeof window !== "undefined") {
  window.CHARACTERS = CHARACTERS;
}

if (typeof module !== "undefined") {
  module.exports = CHARACTERS;
}

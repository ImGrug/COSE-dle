/*
  COSEdley's Mystery Friend Game
  https://cosedley.com/mystery-friend/
  '

  This file contains:
  - Game state
  - API target loading
  - Guess validation
  - Fuzzy matching logic
  - Rendering logic
*/

// Main game state.
let targetCharacter = null;
let guessedNames = new Set();
let gameOver = false;
let targetLoaded = false;

// DOM elements.
const guessInput = document.getElementById("guessInput");
const guessButton = document.getElementById("guessButton");
const playAgainButton = document.getElementById("playAgainButton");
const resultsElement = document.getElementById("results");
const messageElement = document.getElementById("message");
const suggestionsElement = document.getElementById("suggestions");
document.getElementById("shareButton").addEventListener("click", shareResults);


/**
 * Loads the standardized target character from the backend API.
 */
async function loadTargetCharacter() {
  setLoadingState(true);
  showMessage("Loading today's mystery friend...", "");

  try {
    const response = await fetch("/api/current-target", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Target API returned ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.targetCharacter || !data.targetCharacter.name) {
      throw new Error("Target API returned invalid data.");
    }

    targetCharacter = data.targetCharacter;
    targetLoaded = true;

    startGame();
  } catch (error) {
    console.error("Failed to load target character:", error);

    targetCharacter = null;
    targetLoaded = false;
    gameOver = true;

    resultsElement.innerHTML = "";
    suggestionsElement.innerHTML = "";
    showMessage("Could not load the mystery friend. Please refresh and try again.", "error");

    guessInput.disabled = true;
    guessButton.disabled = true;
    document.getElementById("shareButton").classList.add("hidden");
    playAgainButton.classList.add("hidden");
  } finally {
    setLoadingState(false);
  }
}

/**
 * Starts or restarts the player's local game board.
 * This does NOT choose a new target locally.
 */
function startGame() {
  if (!targetLoaded || !targetCharacter) {
    return;
  }

  guessedNames = new Set();
  gameOver = false;

  resultsElement.innerHTML = "";
  suggestionsElement.innerHTML = "";
  messageElement.textContent = "";
  messageElement.className = "message";

  guessInput.value = "";
  guessInput.disabled = false;
  guessButton.disabled = false;
  playAgainButton.classList.add("hidden");


  guessInput.focus();

  // For testing only. Remove this line if you do not want to see the answer.
  console.log("Target character:", targetCharacter.name);
}

/**
 * Controls loading UI state.
 */
function setLoadingState(isLoading) {
  guessInput.disabled = isLoading;
  guessButton.disabled = isLoading;
}

/**
 * Handles the user submitting a guess.
 */
function handleGuess() {
  if (gameOver) {
    return;
  }

  if (!targetLoaded || !targetCharacter) {
    showMessage("The mystery friend is still loading. Try again in a second.", "error");
    return;
  }

  const rawGuess = guessInput.value.trim();

  if (!rawGuess) {
    showMessage("Enter a name first.", "error");
    return;
  }

  const guessedCharacter = findCharacterByName(rawGuess);

  if (!guessedCharacter) {
    showMessage("That name is not in the character list.", "error");
    updateSuggestions(rawGuess);
    return;
  }

  const normalizedName = normalizeString(guessedCharacter.name);

  if (guessedNames.has(normalizedName)) {
    showMessage("You already guessed that person.", "error");
    guessInput.value = "";
    return;
  }

  guessedNames.add(normalizedName);
  renderGuessRow(guessedCharacter);

  if (normalizeString(guessedCharacter.name) === normalizeString(targetCharacter.name)) {
    winGame();
  } else {
    showMessage("Not quite. Try another friend.", "");
  }

  guessInput.value = "";
  suggestionsElement.innerHTML = "";
  guessInput.focus();
}

/**
 * Finds a character by exact case-insensitive name.
 */
function findCharacterByName(name) {
  const normalizedGuess = normalizeString(name);

  return CHARACTERS.find((character) => {
    return normalizeString(character.name) === normalizedGuess;
  });
}

/**
 * Displays clickable suggestions while typing.
 */
function updateSuggestions(searchText) {
  const normalizedSearch = normalizeString(searchText);
  suggestionsElement.innerHTML = "";

  if (!normalizedSearch) {
    return;
  }

  // Only match characters whose names START with the same first letter
  const firstLetter = normalizedSearch[0];

  const matches = CHARACTERS
      .filter((character) => {
        const name = normalizeString(character.name);
        return name.startsWith(firstLetter);
      })
      .sort((a, b) => {
        // Optional: sort alphabetically
        return a.name.localeCompare(b.name);
      });

  matches.forEach((character) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "suggestion-chip";
    chip.textContent = character.name;

    chip.addEventListener("click", () => {
      guessInput.value = character.name;
      suggestionsElement.innerHTML = "";
      guessInput.focus();
    });

    suggestionsElement.appendChild(chip);
  });
}


/**
 * Renders one row of comparison tiles for a guess.
 */
function renderGuessRow(guessedCharacter) {
  const row = document.createElement("div");
  row.className = "guess-row";

  row.appendChild(createTile("Name", guessedCharacter.name, "name-tile"));
  row.appendChild(createTile("Height", formatHeight(guessedCharacter.height), compareHeight(guessedCharacter.height, targetCharacter.height)));
  row.appendChild(createTile("Origin", guessedCharacter.origin, compareOrigin(guessedCharacter.origin, targetCharacter.origin)));
  row.appendChild(createTile("Cortisol", guessedCharacter.cortisol, compareCortisol(guessedCharacter.cortisol, targetCharacter.cortisol)));
  row.appendChild(createTile("Yapper", guessedCharacter.yapper, compareExactOnly(guessedCharacter.yapper, targetCharacter.yapper)));
  row.appendChild(createTile("Competitive", guessedCharacter.competitiveGamer, compareExactOnly(guessedCharacter.competitiveGamer, targetCharacter.competitiveGamer)));
  row.appendChild(createTile("Vice", formatVice(guessedCharacter.vice), compareVice(guessedCharacter.vice, targetCharacter.vice)));
  row.appendChild(createTile("Combo Breaker", guessedCharacter.comboBreaker, compareExactOnly(guessedCharacter.comboBreaker, targetCharacter.comboBreaker)));

  resultsElement.prepend(row);
}

/**
 * Creates a single visual tile.
 */
function createTile(label, value, matchClass) {
  const tile = document.createElement("div");
  tile.className = `tile ${matchClass}`;

  const labelElement = document.createElement("div");
  labelElement.className = "tile-label";
  labelElement.textContent = label;

  const valueElement = document.createElement("div");
  valueElement.className = "tile-value";
  valueElement.textContent = value;

  tile.appendChild(labelElement);
  tile.appendChild(valueElement);

  return tile;
}

/**
 * Height fuzzy match:
 * - exact: same numeric height
 * - partial: within 2 inches
 * - none: anything else
 */
function compareHeight(guessHeight, targetHeight) {
  const guess = Number(guessHeight);
  const target = Number(targetHeight);

  if (Number.isNaN(guess) || Number.isNaN(target)) {
    return compareTextSimilarity(String(guessHeight), String(targetHeight));
  }

  if (guess === target) {
    return "exact";
  }

  if (Math.abs(guess - target) <= 1) {
    return "partial";
  }

  return "none";
}

/**
 * Origin fuzzy match:
 * - exact: same normalized origin text
 * - partial: same broad US region or similar text
 * - none: anything else
 */
function compareOrigin(guessOrigin, targetOrigin) {
  const guess = normalizeString(guessOrigin);
  const target = normalizeString(targetOrigin);

  if (guess === target) {
    return "exact";
  }

  if (getRegion(guessOrigin) && getRegion(guessOrigin) === getRegion(targetOrigin)) {
    return "partial";
  }

  if (stringsAreSimilar(guess, target)) {
    return "partial";
  }

  return "none";
}

/**
 * Cortisol fuzzy match:
 * - exact: same number
 * - partial: within 1
 * - none: anything else
 */
function compareCortisol(guessCortisol, targetCortisol) {
  const guess = Number(guessCortisol);
  const target = Number(targetCortisol);

  if (guess === target) {
    return "exact";
  }

  if (Math.abs(guess - target) <= 1) {
    return "partial";
  }

  return "none";
}

/**
 * Yapper, Competitive Gamer, and Combo Breaker:
 * - exact: same yes/no/sometimes value
 * - none: different value
 */
function compareExactOnly(guessValue, targetValue) {
  if (normalizeString(guessValue) === normalizeString(targetValue)) {
    return "exact";
  }

  return "none";
}

/**
 * Vice fuzzy match:
 * - exact: same vice list
 * - partial: shares at least one vice or useful keyword
 * - none: anything else
 */
function compareVice(guessVice, targetVice) {
  const guessList = normalizeViceList(guessVice);
  const targetList = normalizeViceList(targetVice);

  if (guessList.join("|") === targetList.join("|")) {
    return "exact";
  }

  const hasSharedVice = guessList.some((vice) => targetList.includes(vice));

  if (hasSharedVice) {
    return "partial";
  }

  const guessText = guessList.join(" ");
  const targetText = targetList.join(" ");

  if (hasSharedKeyword(guessText, targetText)) {
    return "partial";
  }

  if (stringsAreSimilar(guessText, targetText)) {
    return "partial";
  }

  return "none";
}

/**
 * Formats a vice array for display.
 */
function formatVice(vice) {
  if (Array.isArray(vice)) {
    return vice.join(", ");
  }

  return String(vice);
}

/**
 * Normalizes vice data into a clean array of lowercase strings.
 */
function normalizeViceList(vice) {
  if (Array.isArray(vice)) {
    return vice
        .flatMap((item) => String(item).split(","))
        .map((item) => normalizeString(item))
        .filter(Boolean);
  }

  return String(vice)
      .split(",")
      .map((item) => normalizeString(item))
      .filter(Boolean);
}

/**
 * Returns true if two strings share a useful non-filler word.
 */
function hasSharedKeyword(firstText, secondText) {
  const fillerWords = new Set([
    "the",
    "a",
    "an",
    "and",
    "or",
    "of",
    "to",
    "with",
    "late",
    "night"
  ]);

  const firstWords = firstText
      .split(/\s+/)
      .filter((word) => word.length >= 4 && !fillerWords.has(word));

  const secondWords = secondText
      .split(/\s+/)
      .filter((word) => word.length >= 4 && !fillerWords.has(word));

  return firstWords.some((word) => secondWords.includes(word));
}

/**
 * Basic string similarity checker.
 */
function stringsAreSimilar(firstText, secondText) {
  if (!firstText || !secondText) {
    return false;
  }

  if (firstText.includes(secondText) || secondText.includes(firstText)) {
    return true;
  }

  const distance = levenshteinDistance(firstText, secondText);
  const longestLength = Math.max(firstText.length, secondText.length);

  if (longestLength === 0) {
    return false;
  }

  const similarity = 1 - distance / longestLength;

  return similarity >= 0.72;
}

/**
 * Alias kept for safety if text-based comparisons call it.
 */
function compareTextSimilarity(firstText, secondText) {
  if (normalizeString(firstText) === normalizeString(secondText)) {
    return "exact";
  }

  if (stringsAreSimilar(normalizeString(firstText), normalizeString(secondText))) {
    return "partial";
  }

  return "none";
}

/**
 * Levenshtein distance measures how many single-character edits it takes
 * to turn one string into another.
 */
function levenshteinDistance(firstText, secondText) {
  const matrix = [];

  for (let row = 0; row <= secondText.length; row++) {
    matrix[row] = [row];
  }

  for (let column = 0; column <= firstText.length; column++) {
    matrix[0][column] = column;
  }

  for (let row = 1; row <= secondText.length; row++) {
    for (let column = 1; column <= firstText.length; column++) {
      if (secondText.charAt(row - 1) === firstText.charAt(column - 1)) {
        matrix[row][column] = matrix[row - 1][column - 1];
      } else {
        matrix[row][column] = Math.min(
            matrix[row - 1][column - 1] + 1,
            matrix[row][column - 1] + 1,
            matrix[row - 1][column] + 1
        );
      }
    }
  }

  return matrix[secondText.length][firstText.length];
}

/**
 * Broad region helper for origin fuzzy matching.
 */
function getRegion(origin) {
  const normalizedOrigin = normalizeString(origin);

  const regions = {
    west: [
      "california",
      "oregon",
      "washington",
      "nevada",
      "arizona",
      "colorado",
      "utah"
    ],
    south: [
      "texas",
      "florida",
      "georgia",
      "alabama",
      "louisiana",
      "tennessee",
      "north carolina",
      "south carolina"
    ],
    midwest: [
      "illinois",
      "ohio",
      "michigan",
      "indiana",
      "wisconsin",
      "minnesota",
      "missouri"
    ],
    northeast: [
      "new york",
      "new jersey",
      "pennsylvania",
      "massachusetts",
      "connecticut",
      "maine",
      "vermont"
    ]
  };

  for (const regionName in regions) {
    if (regions[regionName].includes(normalizedOrigin)) {
      return regionName;
    }
  }

  return null;
}

/**
 * Formats numeric height as feet and inches.
 */
function formatHeight(height) {
  const numericHeight = Number(height);

  if (Number.isNaN(numericHeight)) {
    return height;
  }

  const feet = Math.floor(numericHeight / 12);
  const inches = numericHeight % 12;

  return `${feet}'${inches}"`;
}

/**
 * Normalizes text for case-insensitive comparisons.
 */
function normalizeString(value) {
  return String(value)
      .trim()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ");
}

/**
 * Shows a status message.
 */
function showMessage(text, type) {
  messageElement.textContent = text;
  messageElement.className = type ? `message ${type}` : "message";
}

/**
 * Ends the game after a correct guess.
 */
function winGame() {
  gameOver = true;
  showMessage(`Correct! The mystery friend was ${targetCharacter.name}.`, "win");

  guessInput.disabled = true;
  guessButton.disabled = true;
  playAgainButton.classList.add("hidden");
  document.getElementById("shareButton").classList.remove("hidden");

}

/**
 * Event listeners.
 */
guessButton.addEventListener("click", handleGuess);

guessInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleGuess();
  }
});

function shareResults() {
  const rows = document.querySelectorAll(".guess-row");
  let shareText = "COSE-dle Results\n\n";

  rows.forEach(row => {
    const tiles = row.querySelectorAll(".tile");
    let line = "";

    tiles.forEach(tile => {
      if (tile.classList.contains("exact")) line += "🟩";
      else if (tile.classList.contains("partial")) line += "🟥";
      else if (tile.classList.contains("none")) line += "⬛";
      else if (tile.classList.contains("name-tile")) line += "🟦";
      else line += "⬜"; // fallback
    });

    shareText += line + "\n";
  });

  navigator.clipboard.writeText(shareText).then(() => {
    alert("Copied to clipboard!");
  });
}


guessInput.addEventListener("input", () => {
  updateSuggestions(guessInput.value);
});

playAgainButton.addEventListener("click", startGame);

/**
 * Initialize the game once the page loads.
 */
loadTargetCharacter();
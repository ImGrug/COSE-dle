const CHARACTERS = require("../characters.js");

const CST_TIME_ZONE = "America/Chicago";
const TWELVE_HOURS_IN_MS = 12 * 60 * 60 * 1000;

let targetState = {
    currentTargetIndex: null,
    lastRotationTimestamp: null
};

module.exports = async function handler(request, response) {
    try {
        rotateTargetIfNeeded();

        const targetCharacter = CHARACTERS[targetState.currentTargetIndex];

        response.setHeader("Content-Type", "application/json");
        response.setHeader("Cache-Control", "no-store");

        return response.status(200).json({
            targetCharacter,
            currentTargetIndex: targetState.currentTargetIndex,
            lastRotationTimestamp: targetState.lastRotationTimestamp,
            timeZone: CST_TIME_ZONE
        });

    } catch (error) {
        console.error("Failed to get current target:", error);

        return response.status(500).json({
            error: "Failed to get current target."
        });
    }
};

function rotateTargetIfNeeded() {
    const nowUTC = new Date();

    // Convert to CST
    const nowCST = new Date(
        nowUTC.toLocaleString("en-US", { timeZone: CST_TIME_ZONE })
    );

    const hour = nowCST.getHours();

    // Determine which 12-hour window we are in
    const windowIndex = hour < 12 ? 0 : 1;

    // Build a unique seed for this window
    const day = nowCST.getDate();
    const month = nowCST.getMonth();
    const year = nowCST.getFullYear();

    const seed = year * 10000 + month * 100 + day * 2 + windowIndex;

    // Deterministic index
    const newIndex = seed % CHARACTERS.length;

    // Only update if different
    if (newIndex !== targetState.currentTargetIndex) {
        targetState.currentTargetIndex = newIndex;
        targetState.lastRotationTimestamp = nowUTC.toISOString();
    }
}


function getRandomCharacterIndex(previousIndex = null) {
    if (CHARACTERS.length === 0) {
        throw new Error("Character list is empty.");
    }

    if (CHARACTERS.length === 1) {
        return 0;
    }

    let nextIndex = Math.floor(Math.random() * CHARACTERS.length);

    while (nextIndex === previousIndex) {
        nextIndex = Math.floor(Math.random() * CHARACTERS.length);
    }

    return nextIndex;
}

function getCurrentRotationWindowStart(date) {
    const cstParts = getCstDateParts(date);

    const rotationHour = cstParts.hour >= 12 ? 12 : 0;

    return makeUtcDateFromCstParts({
        year: cstParts.year,
        month: cstParts.month,
        day: cstParts.day,
        hour: rotationHour,
        minute: 0,
        second: 0
    });
}

function getNextRotationTimestamp(date) {
    const cstParts = getCstDateParts(date);

    if (cstParts.hour < 12) {
        return makeUtcDateFromCstParts({
            year: cstParts.year,
            month: cstParts.month,
            day: cstParts.day,
            hour: 12,
            minute: 0,
            second: 0
        });
    }

    const tomorrowAtMidnight = new Date(
        makeUtcDateFromCstParts({
            year: cstParts.year,
            month: cstParts.month,
            day: cstParts.day,
            hour: 0,
            minute: 0,
            second: 0
        }).getTime() + 24 * 60 * 60 * 1000
    );

    return tomorrowAtMidnight;
}

function getCstDateParts(date) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: CST_TIME_ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(date);
    const values = {};

    parts.forEach((part) => {
        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }
    });

    if (values.hour === 24) {
        values.hour = 0;
    }

    return {
        year: values.year,
        month: values.month,
        day: values.day,
        hour: values.hour,
        minute: values.minute,
        second: values.second
    };
}

function makeUtcDateFromCstParts(cstParts) {
    const approximateUtcDate = new Date(Date.UTC(
        cstParts.year,
        cstParts.month - 1,
        cstParts.day,
        cstParts.hour,
        cstParts.minute,
        cstParts.second
    ));

    const offsetInMs = getTimeZoneOffsetInMs(approximateUtcDate, CST_TIME_ZONE);

    return new Date(approximateUtcDate.getTime() - offsetInMs);
}

function getTimeZoneOffsetInMs(date, timeZone) {
    const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const parts = formatter.formatToParts(date);
    const values = {};

    parts.forEach((part) => {
        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }
    });

    if (values.hour === 24) {
        values.hour = 0;
    }

    const asUtc = Date.UTC(
        values.year,
        values.month - 1,
        values.day,
        values.hour,
        values.minute,
        values.second
    );

    return asUtc - date.getTime();
}
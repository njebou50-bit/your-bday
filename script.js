// Personalize these three values for her.
const recipientName = "my favorite person";
const birthdayMonth = 11; // December
const birthdayDay = 6;

const welcome = document.querySelector("#welcome");
const countdownCard = document.querySelector("#countdown-card");
const dateLabel = document.querySelector("#birthday-date");
const caption = document.querySelector("#countdown-caption");
const noteMessage = document.querySelector("#note-message");
const messages = [
    "You make life softer, brighter, and so much more beautiful just by being you.",
    "I hope your birthday brings you as much happiness as you bring to everyone around you.",
    "Of all the lovely things in this world, getting to know you is one of my favorites.",
    "You deserve all the magic, laughter, and love your heart can hold."
];
let messageIndex = 0;

document.querySelector("#recipient-name").textContent = recipientName;
document.title = `A Little Birthday Surprise for ${recipientName}`;

function getNextBirthday(now) {
    let year = now.getFullYear();
    let target = new Date(year, birthdayMonth, birthdayDay);

    if (target < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        year += 1;
        target = new Date(year, birthdayMonth, birthdayDay);
    }

    return target;
}

const dateForLabel = new Date(2000, birthdayMonth, birthdayDay);
dateLabel.textContent = `Counting down to ${dateForLabel.toLocaleDateString(undefined, { month: "long", day: "numeric" })}`;

function updateCountdown() {
    const now = new Date();
    const birthdayToday = now.getMonth() === birthdayMonth && now.getDate() === birthdayDay;

    if (birthdayToday) {
        document.querySelector("#days").textContent = "000";
        document.querySelector("#hours").textContent = "00";
        document.querySelector("#minutes").textContent = "00";
        document.querySelector("#seconds").textContent = "00";
        caption.textContent = "It's your day! I hope it is as wonderful as you are. Happy birthday! ♡";
        return;
    }

    const remaining = Math.max(0, getNextBirthday(now).getTime() - now.getTime());
    const seconds = Math.floor(remaining / 1000);
    const values = {
        days: Math.floor(seconds / 86400),
        hours: Math.floor((seconds % 86400) / 3600),
        minutes: Math.floor((seconds % 3600) / 60),
        seconds: seconds % 60
    };

    for (const [unit, value] of Object.entries(values)) {
        document.querySelector(`#${unit}`).textContent = String(value).padStart(unit === "days" ? 3 : 2, "0");
    }
    caption.textContent = "Every second brings your lovely day closer.";
}

document.querySelector("#open-surprise").addEventListener("click", () => {
    welcome.hidden = true;
    countdownCard.hidden = false;
    updateCountdown();
    document.querySelector("#countdown-title").focus();
});

document.querySelector("#back-button").addEventListener("click", () => {
    countdownCard.hidden = true;
    welcome.hidden = false;
    document.querySelector("#open-surprise").focus();
});

document.querySelector("#note-button").addEventListener("click", () => {
    messageIndex = (messageIndex + 1) % messages.length;
    noteMessage.textContent = messages[messageIndex];
});

updateCountdown();
window.setInterval(updateCountdown, 1000);

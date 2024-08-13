
//==================
// Assets
//==================
// reads from './wallpapers'
const wallpapers = [
    "night_sky_blue.jpg"
];

const quotes = [
    "Tempus fugit — time flees."
];

//==================
// Event Loop
//==================

// Datetime string examples:
//   - "Jan 1, 2070"
//   - "Jan 1, 2070, 00:00:00"
var until = "Jan 1, 2070";
const untilValue = document.getElementById("until");
untilValue.innerHTML = until;

var deadline = dateTimeTZ(new Date(until), "Greenwich").getTime();

const MS_PER_DAY  = 86400000
const MS_PER_HOUR = 3600000
const MS_PER_MIN  = 60000
const MS_PER_SEC  = 1000

const daysValue = document.getElementById("daysValue");
const hrsValue  = document.getElementById("hrsValue");
const minsValue = document.getElementById("minsValue");
const secsValue = document.getElementById("secsValue");

var ticker = setInterval(function() {
    var delta = deadline - (new Date().getTime());

    daysValue.innerHTML = Math.floor(delta / MS_PER_DAY);
    hrsValue.innerHTML  = padLeftZeroes(Math.floor((delta % MS_PER_DAY) / MS_PER_HOUR), 2);
    minsValue.innerHTML = padLeftZeroes(Math.floor((delta % MS_PER_HOUR) / MS_PER_MIN), 2);
    secsValue.innerHTML = padLeftZeroes(Math.floor((delta % MS_PER_MIN) / MS_PER_SEC), 2);

    if (delta < 0) {
        clearInterval(ticker);
    }
}, 1000); // Tick every 1 second.

// dateTimeTZ allows the creation of a Date object fixed to a specific timezone.
// A comprehensive list of tzinfos can be found here:
//   https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
function dateTimeTZ(date, ianatz) {
    var invDate = new Date(date.toLocaleString("en-US", {timeZone: ianatz}));
    var diff = date.getTime() - invDate.getTime();

    return new Date(date.getTime() - diff);
}

function padLeftZeroes(val ,padLength) {
    var pad = new Array(1 + padLength).join("0");
    return (pad + val).slice(-pad.length);
}

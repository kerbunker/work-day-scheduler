var currentDayEl = $("#currentDay");
var currentMoment = moment();
currentDayEl.text(currentMoment.format('MMMM Do YYYY'));
//console.log(currentDayEl);

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
var sevenOClock = moment().hour(10);
console.log(sevenOClock);

for (var i = 0; i < 9; i++) {
    var setHour = moment().hour(18 + i);
    var timeDifference = setHour.diff(currentMoment, 'hours', true);
    if (timeDifference < 0) {
        $("#hour-" + i).addClass('past');
    } else if (timeDifference > 0.1) {
        $("#hour-" + i).addClass('future');
    } else {
        $("#hour-" + i).addClass('present');
    }
}
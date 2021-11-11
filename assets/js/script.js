var currentDayEl = $("#currentDay");
var currentMoment = moment();
currentDayEl.text(currentMoment.format('MMMM Do YYYY'));
//console.log(currentDayEl);

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
var sevenOClock = moment().hour(10);
console.log(sevenOClock);

var setBackground = function() {
    for (var i = 0; i < 9; i++) {
        var setHour = moment().hour(9 + i);
        var timeDifference = setHour.diff(currentMoment, 'hours', true);
        if (timeDifference < 0) {
            $("#hour-" + i).addClass('past');
        } else if (timeDifference > 0.1) {
            $("#hour-" + i).addClass('future');
        } else {
            $("#hour-" + i).addClass('present');
        }
    }
};


$(".time-block").on("click", ".text-block", function() {
    console.log("clicked");
    var text = $(this).text().trim();
    var divID = $(this).attr("id");
    console.log(divID);

    var textInput = $("<textarea>").addClass("col-10 text-form").attr("id", divID).val(text);
    if ($(this).hasClass("past")) {
        textInput.addClass("past");
    } else if($(this).hasClass("present")) {
        textInput.addClass("present");
    } else {
        textInput.addClass("future");
    }
    $(this).replaceWith(textInput);
    setBackground();

    textInput.trigger("focus");
});

$(".time-block").on("click", ".saveBtn", function() {
    var text = $(this).prev().val();
    var textID = $(this).prev().attr("id");
    console.log(text);

    var descP = $("<div>").addClass("col-10 text-block").attr("id", textID).text(text);
    if ($(this).prev().hasClass("past")) {
        descP.addClass("past");
    } else if($(this).prev().hasClass("present")) {
        descP.addClass("present");
    } else {
        descP.addClass("future");
    }
    $(this).prev().replaceWith(descP);
    setBackground()
});

setBackground();
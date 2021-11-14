

// stores the save data when hour event text has been added
var eventData = [];

// goes through each hour block and sets the background based on when it is in the day
var setBackground = function() {
    // variable to store the current day element
    var currentDayEl = $("#currentDay");
    // variable to store the current moment
    var currentMoment = moment();
    //sets the current day element to the current day in day month year format
    currentDayEl.text(currentMoment.format('MMMM Do YYYY'));
    
    for (var i = 0; i < 9; i++) {
        // sets the hour to 9 - 5 depending on what i is
        var setHour = moment().hour(9 + i);
        // gets the time difference between the hour in setHour and the current time
        var timeDifference = setHour.diff(currentMoment, 'hours', true);
        // checks the time difference and sets the background color based on the time difference given
        if (timeDifference < 0) {
            $("#hour-" + i).addClass('past');
        } else if (timeDifference > 0.1) {
            $("#hour-" + i).addClass('future');
        } else {
            $("#hour-" + i).addClass('present');
        }
    }
};

// when a time block is clicked the div turns into a text area
$(".time-block").on("click", ".text-block", function() {
    // gets the current text
    var text = $(this).text().trim();
    // saves the ID for the div
    var divID = $(this).attr("id");

    // creates the text area adding the classes and the ID from the div
    var textInput = $("<textarea>").addClass("col-10 text-form").attr("id", divID).val(text);
    // adds the class for what background color it should have
    if ($(this).hasClass("past")) {
        textInput.addClass("past");
    } else if($(this).hasClass("present")) {
        textInput.addClass("present");
    } else {
        textInput.addClass("future");
    }
    //replaces the div with the input form
    $(this).replaceWith(textInput);
    setBackground();

    textInput.trigger("focus");
});

// Reverts the input form to a div when the save button is clicked
$(".time-block").on("click", ".saveBtn", function() {
    // checks if the div to save was a text form to change text, otherwise, nothing needs to be changed
    if (!$(this).prev().hasClass("text-form")) {
        return;
    }
    // gets the text and ID from the input form
    var text = $(this).prev().val();
    var textID = $(this).prev().attr("id");

    // creates the div with the classes ID and text from the input form
    var descP = $("<div>").addClass("col-10 text-block").attr("id", textID).text(text);
    if ($(this).prev().hasClass("past")) {
        descP.addClass("past");
    } else if($(this).prev().hasClass("present")) {
        descP.addClass("present");
    } else {
        descP.addClass("future");
    }
    // replaces the input form with the created div
    $(this).prev().replaceWith(descP);
    setBackground();

    // saves the data in the eventData array
    var index = $(this).prev().attr("id");
    index = index.substr(index.length-1, 1);
    index = parseInt(index);
    if (eventData[index]) {
        eventData[index].text = text;
    } else {
        eventData[index] = {
            hour: index + 9,
            text: text
        };
    }
    saveData();
});

// saves the Data in local storage as a string
var saveData = function() {
    localStorage.setItem("data", JSON.stringify(eventData))
};

// loads the data from local storage and creates an array of objects and loads them onto the page
var loadData = function() {
    eventData = JSON.parse(localStorage.getItem("data"));
    if (!eventData) {
        eventData = [];
    }
    for (var i = 0; i < 8; i++) {
        if (eventData[i]) {
            $("#hour-" + i).text(eventData[i].text);
        }
    }
}

// set interval to refresh hour background periodically throughout the day even if the page is not reloaded
setInterval(setBackground, 600000);
// sets the day and background colors on page load
setBackground();
// loads the data from local storage on page load
loadData();
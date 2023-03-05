

$(document).ready(function() {
    //Today's date
    const currentDateEl = $("header #currentDay");

    let calEvents = {};

    let hourRendered = moment();

    function renderCalender(today, calEvents) {

        let rowHr = moment(today).hour(9);
        const calender = $("div.container");
        calender.empty();


        //make rows for hours 9 to 5
        for(let i = 1; i < 10; i++) {

            const row = $("<div>").addClass("row");

            let classOfHour = "";
            if(today.isBefore(rowHr, "hour")) {
            classOfHour = "future"
            } else if (today.isAfter(rowHr, "hour")) {
                classOfHour = "past"
            } else {
                classOfHour = "present"
            };


            calender.append(row);
            row.append($("<div>").addClass("col-2 hour").text(rowHr.format("h A")));

            //add event column to row
            let timeBlock = rowHr.format("hA");
            row.append($("<textarea>").addClass(`col-8 ${classOfHour}`).text(calEvents[timeBlock]));
            row.append($("<button>").addClass("col-2 saveBtn").html("<i class= 'fas fa-save'></li>").attr("aria-label", "Save").attr("id", rowHr.format("hA")));


            //hour increment
            rowHr.add(1,"hour");

            //render
            hourRendered = moment();
        };
    };
    
    function initCalender () {
        const today = moment();
        currentDateEl.text(today.format('LL'));
        renderCalender(today, calEvents);
    };

    function loadCal() {
        const storedCall = JSON.parse(localStorage.getItem("calEvents"));
        if(storedCall) {
            calEvents = storedCall;
        };
    };
    
    loadCal();
    initCalender();
    hourTrack();


    function hourTrack() {
        const checkHourInterval = setInterval(function () {
            if(moment().isAfter(hourRendered, "minute")) {
                initCalender();
            }
        }, 60000);

    };

    function storeCall() {
        localStorage.setItem("calEvents", JSON.stringify(calEvents));
    };


    function clearCalender() {
        calEvents = {};
        storeCall();
        initCalender();
    };

    $("button#remove").on("click", clearCalender);

    $(document).on("click", "button.saveBtn", function (event) {
        let calDesc = event.currentTarget.parentElement.children[1].value;
        calEvents[event.currentTarget.id] =calDesc;
    });   
});
var themeButtonEl = $('#theme-btn');
var isDark = true;
// Click event causes alert light theme toggle
themeButtonEl.on('click', function () {
    if (isDark) {
      $('body').css({ 'background-color': '#d9e9e8', color: '#1a1a1a' });
      isDark = !isDark;
    } else {
      $('body').css({ 'background-color': '#1a1a1a', color: '#d9e9e8' });
      isDark = !isDark;
    }
});
'use strict';
(function() {
    const calendars = document.querySelectorAll('.calendar'),
          buttons = [];
    for (let i = 0; i < calendars.length; i ++){
        buttons[i] = calendars[i].querySelectorAll('.pe-icon--btn');
    }

    let startDate,
        displayDate,
        i,
        firstDay,
        endDay,
        monthRange,
        weeks,
        calendar,
        firstWeekDay,
        lastWeekDay,
        weekRange,
        year,
        month,
        GetCalendar = {},
        dayList = [],
        renderDays = [];

    GetCalendar = {
        build: (year, month) => {
            startDate = moment([year, month]);
            firstDay = moment(startDate).startOf('month');
            endDay = moment(startDate).endOf('month');
            monthRange = moment.range(firstDay, endDay);
            weeks = [];
            monthRange.by('days', function (moment) {
                let ref;
                if (ref = moment.week(), [].indexOf.call(weeks, ref) < 0) {
                    return weeks.push(moment.week());
                }
            });

            calendar = [];

            weeks.forEach(week => {
                if (i > 0 && week < weeks[i - 1]) {

                    // We have switched to the next year
                    firstWeekDay = moment([year, month]).add(1, "year").week(week).day(1);
                    lastWeekDay = moment([year, month]).add(1, "year").week(week).day(7);
                }
                else {
                    firstWeekDay = moment([year, month]).week(week).day(1);
                    lastWeekDay = moment([year, month]).week(week).day(7);
                }
                weekRange = moment.range(firstWeekDay, lastWeekDay);
                calendar.push(weekRange);
            });

            return calendar;
        },

        setState: (buttonClicked) => {
            if (buttonClicked === "none") {
                displayDate = moment([moment().year(), moment().month()]);
            } else {
                if (buttonClicked === "next") {
                    displayDate = moment(displayDate).add(1, 'months'); 

                } else if (buttonClicked === "prev") {
                    displayDate = moment(displayDate).subtract(1, 'months');
                } 
            };
            month = moment(displayDate).month();
            year = moment(displayDate).year(); 
        }, 

        getState: () => {
            return {
                month: moment(displayDate).month(),
                monthName: moment.months()[moment(displayDate).month()],
                year: moment(displayDate).year(),
                calendar: GetCalendar.build(moment(displayDate).year(), moment(displayDate).month())
            }  
        },

        render: () => {
            let weekCount = 0,
                isCurrentMonth,
                isToday,
                isSelected,
                dayClasses,
                disabled,
                elements = "";

                dayList = [];
                CalendarState.calendar.map(date => {
                    weekCount++;
                    date.by('days', function(day){
                        dayList.push(day)
                    });
                });

               return dayList.map(day => {
                    isCurrentMonth = day.month() === CalendarState.month;
                    isToday = day.format('DD-MM-YYYY') === moment().format('DD-MM-YYYY');
                    isSelected = day.format('DD-MM-YYYY') === CalendarState.selected;
                    dayClasses = 'pe-link--btn pe-label neutral-two';
                    disabled = "";

                    if (!isCurrentMonth){
                        dayClasses += " muted";
                        disabled += " disabled";
                    }

                    if (isSelected){
                        dayClasses += " selected";
                    }

                   if (isToday){
                       dayClasses += " today";
                   }
                    return elements = '<button type="button" class="'+ dayClasses + '"'+disabled+'>'+day.format('D')+'</button>'
               });
            }
        };

    // calendar object that will render all the data
    let CalendarState = {};
    let renderCalendar = (buttonClicked, calendarNumber) => {
        GetCalendar.setState(buttonClicked);
        CalendarState = {
            year: GetCalendar.getState().year,
            month: GetCalendar.getState().month,
            monthName: GetCalendar.getState().monthName,
            calendar: GetCalendar.getState().calendar,
            selected: moment().format('DD-MM-YYYY')
        };
    
        renderDays = GetCalendar.render();
    
        const monthHTML = calendars[calendarNumber].querySelector('.month'),
                yearHTML = calendars[calendarNumber].querySelector('.year'),
                daysHTML = calendars[calendarNumber].querySelector('.days'),
                weekArr = [];
        
        daysHTML.innerHTML = "";
        monthHTML.innerHTML = CalendarState.monthName;
        yearHTML.innerHTML = CalendarState.year;

        // group the days into items of 7
        for(let i = 0; i < renderDays.length; i+=7) {
            weekArr.push(renderDays.slice(i, i+7));
        }
        
        // wrap each item of 7 with a div and render
        weekArr.forEach(days => {
            daysHTML.innerHTML += '<div class="weeks">'+ days.join('')+'</div>';
        });

        // add event handlers to the buttons
        const dayBtns = calendars[calendarNumber].querySelectorAll('.weeks button');
        dayBtns.forEach((button => {
            button.addEventListener('click', event => {
                dayBtns.forEach((button) => {
                    button.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
            })
        }));
        weekArr.length = 0;
    };

    for (let i = 0; i < calendars.length; i ++){
        renderCalendar("none", i);
    }

    for (let i = 0; i < buttons.length; i ++){
        buttons[i][0].addEventListener('click', event => {
            renderCalendar("prev", i);
        });
        buttons[i][1].addEventListener('click', event => {
            renderCalendar("next", i);
        });
    }
})();

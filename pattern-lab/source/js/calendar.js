'use strict';
(function() {
    const calendars = document.querySelectorAll('.calendar');

    let startDate,
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
        dayList = [];

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

        getInitialState: () => {
            month = moment().month();
            year = moment().year();

            return {
                month: month,
                monthName: moment.months()[month],
                year: year,
                calendar: GetCalendar.build(year, month)
            }
        },
        render: () => {
            let weekCount = 0,
                days,
                isCurrentMonth,
                isToday,
                isSelected,
                dayClasses,
                disabled;

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

                    if (isSelected || isToday){
                        dayClasses += " selected";

                    }
                    return '<button type="button" class="'+ dayClasses + '"'+disabled+'>'+day.format('D')+'</button>'
                });



        }
    };

    // calendar object that will render all the data
    let CalendarState = {
        year: GetCalendar.getInitialState().year,
        month: GetCalendar.getInitialState().month,
        monthName: GetCalendar.getInitialState().monthName,
        calendar: GetCalendar.getInitialState().calendar,
        selected: moment().format('DD-MM-YYYY')
    };


    calendars.forEach((calendar)=> {
        const monthHTML = calendar.querySelector('.month'),
              yearHTML = calendar.querySelector('.year'),
              weekHTML = calendar.querySelector('.days-of-week'),
              daysHTML = calendar.querySelector('.days'),
              weeks = ['S','M','T','W','T','F','S'],
              renderDays = GetCalendar.render(),
              dayArr = [],
              weekArr = [];

        monthHTML.innerHTML = CalendarState.monthName;
        yearHTML.innerHTML = CalendarState.year;

        //render days of week
        weeks.forEach(week => {
            weekHTML.innerHTML += '<span class="pe-label pe-label--small neutral-three">'+ week +'</span>'
        });


        // group the days into items of 7
        for(let i = 0; i < renderDays.length; i+=7) {
            weekArr.push(renderDays.slice(i, i+7));
        }

        // wrap each item of 7 with a div and render
        weekArr.forEach(days => {
            daysHTML.innerHTML += '<div class="weeks">'+ days.join('')+'</div>';
        });

        // add event handlers to the buttons
        const dayBtns = calendar.querySelectorAll('.weeks button');
        dayBtns.forEach((button => {
            button.addEventListener('click', event => {
                dayBtns.forEach((button) => {
                    button.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
            })
        }))
    });
})();

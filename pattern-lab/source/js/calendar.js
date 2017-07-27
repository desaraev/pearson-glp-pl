'use strict';
(function() {
    const calendars = document.querySelectorAll('.calendar');
    calendars.forEach((calendar)=> {
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

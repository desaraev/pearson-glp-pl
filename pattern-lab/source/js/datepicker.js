'use strict';
(function() {
    const datepicker = document.querySelectorAll('.datepicker-container');
    datepicker.forEach(picker => {
        const input = picker.querySelector('input'),
              calendar = picker.querySelector('.calendar'),
              dayBtns = calendar.querySelectorAll('.weeks button');
        calendar.classList.add('hidden');
        dayBtns.forEach((button => {
            button.addEventListener('click', event => {
                dayBtns.forEach((button) => {
                    button.classList.remove('selected');
                });
                event.currentTarget.classList.add('selected');
                input.value = "10/"+ event.currentTarget.innerHTML + "/2016";
                calendar.classList.add('hidden');
            })
        }));

        input.addEventListener('focus', () => {
            calendar.classList.remove('hidden');
        });
    })
})();

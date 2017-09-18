'use strict';

(function () {
    const coachmarks = document.querySelectorAll('.coachmark');
    coachmarks.forEach(coachmark => {
        const eventArea = coachmark.querySelector('.content');
        eventArea.addEventListener('click', event=> {
            if (event.target && event.target.matches('a.coach-link') ||
                event.target && event.target.matches('button') ||
                event.target.matches('svg') ||
                event.target.matches('use')) {
                event.currentTarget.parentNode.classList.add('hidden');
            }
        })
    })
})();

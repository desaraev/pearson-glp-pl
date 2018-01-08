'use strict';

(function () {
    const coachmarks = document.querySelectorAll('.coachmark');
    const infoTrigger = document.querySelector('.pe-icon--info-fill-18');
    const infoCoachmark = document.querySelector('.info-coachmark');
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
    infoTrigger.addEventListener('mouseenter', event => {
        infoCoachmark.classList.remove('hidden');
    })
})();
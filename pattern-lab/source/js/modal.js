'use strict';

(function(){
    const modalButtons = document.querySelectorAll("button[data-modal-id]");
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.modal button');

    modalButtons.forEach(button => {
        button.addEventListener('click', event => {
            const modalId = event.currentTarget.getAttribute('data-modal-id');
            const modalToOpen = document.querySelector('.modal[data-modal-open='+modalId+']');
            overlay.classList.remove('hidden');
            modalToOpen.classList.remove('hidden');
            modalToOpen.setAttribute('aria-hidden', 'false');
        });
    })

    closeButtons.forEach(button => {
        button.addEventListener('click', event => {
            overlay.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.setAttribute('aria-hidden', 'true');
            console.log(event.currentTarget.parentNode.parentNode);
        })
    })
})();
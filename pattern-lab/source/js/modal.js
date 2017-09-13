'use strict';

(function(){
    const modalButtons = document.querySelectorAll("button[data-modal-id]"),
          overlay = document.querySelector('.overlay'),
          closeButtons = document.querySelectorAll('.modal button');

    modalButtons.forEach(button => {
        button.addEventListener('click', event => {
            const modalId = event.currentTarget.getAttribute('data-modal-id'),
                  modalToOpen = document.querySelector('.modal[data-modal-open='+modalId+']');
            overlay.classList.remove('hidden');
            modalToOpen.classList.remove('hidden');
            modalToOpen.setAttribute('aria-hidden', 'false');
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', event => {
            overlay.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.setAttribute('aria-hidden', 'true');
        })
    })
})();
'use strict';

(function() {
    const modalButtons = document.querySelectorAll("button[data-modal-id]"),
          overlay = document.querySelector('.overlay'),
          actionButtons = document.querySelectorAll('.actions button'),
          closeButtons = document.querySelectorAll('.close button');

    modalButtons.forEach(button => {
        button.addEventListener('click', event => {
            const modalId = event.currentTarget.getAttribute('data-modal-id'),
                modalToOpen = document.querySelector('.modal[data-modal-open=' + modalId + ']');
            overlay.classList.remove('hidden');
            modalToOpen.classList.remove('hidden');
            modalToOpen.setAttribute('aria-hidden', 'false');
        })
    })

    actionButtons.forEach(button => {
        closeModal(button);
    })

    closeButtons.forEach(button => {
        closeModal(button);
        // if (overlay.nextElementSibling.contains(button)){
        //     overlay.addEventListener('click', event => {
        //         button.parentNode.parentNode.classList.add('hidden');
        //         button.parentNode.parentNode.setAttribute('aria-hidden', 'true');
        //         overlay.classList.add('hidden');
        //     })
        // } 
        // TODO assign id to each overlay
    })

    function closeModal(button) {
        button.addEventListener('click', event => {
            overlay.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.classList.add('hidden');
            event.currentTarget.parentNode.parentNode.setAttribute('aria-hidden', 'true');
        })
    }

})();
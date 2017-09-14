'use strict';

(function() {
    const drawerButtons = document.querySelectorAll("button[data-drawer-id]"),
          drawers = document.querySelectorAll('.drawer');

    drawerButtons.forEach(button => {
        button.addEventListener('click', event => {
            const drawerId = event.currentTarget.getAttribute('data-drawer-id'),
                drawerToOpen = document.querySelector('.drawer[data-drawer-open='+drawerId+']');
            drawerToOpen.classList.toggle('open');
            drawerToOpen.setAttribute('aria-hidden', 'false');
        });
    });

    drawers.forEach(drawer => {
        const button = drawer.querySelector('.title button');
        button.addEventListener('click', event => {
            event.currentTarget.parentNode.parentNode.classList.toggle('open');
        })
    })
})();

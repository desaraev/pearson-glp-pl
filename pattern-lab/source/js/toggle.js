'use strict';
(function() {
    const toggle = document.querySelectorAll('toggle');
    toggle.forEach(item => {
        const label = item.querySelector('label'),
              input = item.querySelector('input');
        label.onkeydown = (event) => {
            if (event.keyCode ===  32) {
                if (input.checked === false) {
                    input.checked = true;
                } else {
                    input.checked = false;
                }
            }
        }
    })
})();

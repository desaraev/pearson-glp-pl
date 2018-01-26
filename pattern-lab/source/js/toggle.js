'use strict';
(function() {
    const toggle = document.querySelectorAll('.toggle');

    function toggleAriaChecked(checked, target) {
        if (checked === 'false')
            target.setAttribute('aria-checked', 'true');
        else
            target.setAttribute('aria-checked', 'false');
    }

    toggle.forEach(item => {
        const label = item.querySelector('label'),
            input = item.querySelector('input');

        input.onkeydown = event => {
            const target = event.currentTarget,
                isChecked = target.getAttribute('aria-checked');

            if (event.keyCode === 32) {
                toggleAriaChecked(isChecked, target)
            }
        };

        label.onclick = event => {
            const target = event.currentTarget.previousSibling.previousSibling,
                isChecked = target.getAttribute('aria-checked');

            toggleAriaChecked(isChecked, target)
        };

    })
})();
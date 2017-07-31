'use strict';
(function() {
    const toggle = document.querySelectorAll('.toggle');
    toggle.forEach(item => {
        const label = item.querySelector('label'),
              input = item.querySelector('input'),
              isChecked = input.getAttribute('aria-checked');

        label.onclick = event => {
            const target = event.currentTarget.previousSibling.previousSibling,
                  isChecked = target.getAttribute('aria-checked');
            if (isChecked === 'false')
                target.setAttribute('aria-checked', 'true');
            else
                target.setAttribute('aria-checked', 'false');
        }
    })
})();

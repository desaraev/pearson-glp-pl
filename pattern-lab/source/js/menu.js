'use strict';
(function() {
    const dropdown = document.querySelectorAll('.dropdown button'),
        menu = document.querySelectorAll('.menu li');

    dropdown.forEach(button => {
        button.addEventListener('click', event => {
            const target = event.currentTarget,
                menu = target.nextSibling.nextSibling,
                _this = button,
                isExpanded = _this.getAttribute('aria-expanded');

            if (isExpanded === 'true')
                _this.setAttribute('aria-expanded', 'false');
            else
                _this.setAttribute('aria-expanded', 'true');

            menu.classList.toggle('hidden');
            event.stopPropagation();
        })
    });

    menu.forEach(item => {
        item.addEventListener('click', event => {
            const target = event.currentTarget,
                isChecked = target.getAttribute('aria-checked');

            if (isChecked === 'true' )
                target.setAttribute('aria-checked', 'false');
            else
                target.setAttribute('aria-checked', 'true');

            event.stopPropagation();
        })
    });
})();
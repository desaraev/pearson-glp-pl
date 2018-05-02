'use strict';

(function() {
    const modalButton = document.getElementById('trigger-modal'),
          overlay = document.getElementById('modalOverlay'),
          modal = document.getElementById('modal'),
          main = document.getElementById('main'),
          firstButton = document.getElementById('firstButton'),
          lastButton = document.getElementById('lastButton');

          modalButton.addEventListener('click', event => {
              const thisButton = event.currentTarget,
              buttonDisabled = thisButton.getAttribute('disabled');

              if (buttonDisabled === null) {
                  thisButton.setAttribute('disabled', true);
                  main.setAttribute('aria-hidden', 'true');
                overlay.removeAttribute('disabled')
              }

              overlay.classList.remove('hidden');
              modal.classList.remove('hidden');
              firstButton.focus();
          });

          lastButton.addEventListener('blur', () => {
            overlay.focus();
          });

          overlay.addEventListener('blur', ()=> {
            firstButton.focus();
          });

          overlay.addEventListener('click', () => {
            modalButton.removeAttribute('disabled');
            main.setAttribute('aria-hidden', 'false');
            overlay.classList.add('hidden');
            modal.classList.add('hidden');
            overlay.setAttribute('disabled', 'true')
          });

          lastButton.addEventListener('click', () => {
              modalButton.removeAttribute('disabled');
              main.setAttribute('aria-hidden', 'false');
              overlay.classList.add('hidden');
              modal.classList.add('hidden');
              overlay.setAttribute('disabled', 'true')
          });

          document.addEventListener('keyup', e => {
            if(e.keyCode == '27'){
              if (main.getAttribute('aria-hidden') === 'true') {
                modalButton.removeAttribute('disabled');
                main.setAttribute('aria-hidden', 'false');
                overlay.classList.add('hidden');
                modal.classList.add('hidden');
              }
          };
          });

})();


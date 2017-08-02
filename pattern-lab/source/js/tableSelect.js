'use strict';
(function(){
    const selectableTable = document.querySelectorAll('table.selectable');
    selectableTable.forEach(table => {
       const tableRow = table.querySelectorAll('tbody tr'),
             checkAll = table.querySelector('thead th:first-child');

       function toggleCheck (checkbox) {
           if (!checkbox.checked)
               checkbox.checked = true;
           else
               checkbox.checked = false
       }

       tableRow.forEach(row => {
          row.addEventListener('click', event => {
              const row = [];

              function isSelected (element) {
                 return element === 'selected'
              }

              event.currentTarget.classList.toggle('selected');
              const checkbox = event.currentTarget.querySelector('input'),
                    checkAllInput = checkAll.querySelector('input');

              toggleCheck(checkbox);

              tableRow.forEach(rowItem => {
                row.push(rowItem.classList.value)
              });


              if (row.every(isSelected))
                  checkAllInput.checked = true;
              else
                  checkAllInput.checked = false

          });

       });

        checkAll.addEventListener('click', event => {
            const checkbox = event.currentTarget.querySelector('input'),
                  allCheck = table.querySelectorAll('input');


            toggleCheck(checkbox);

            if (checkbox.checked) {
                allCheck.forEach(checkbox => {
                    checkbox.checked = true
                });
                tableRow.forEach(row => {
                    row.classList.add('selected');
                })
            } else {
                allCheck.forEach(checkbox => {
                    checkbox.checked = false
                });
                tableRow.forEach(row => {
                    row.classList.remove('selected');
                })
            }


        });

    })

})();


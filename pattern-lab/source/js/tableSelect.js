'use strict';
(function(){
    // TODO This code really needs to be refactored way too much duplication
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
              const rowArr = [];

              function isSelected (element) {
                  return element === 'selected'
              }
              event.currentTarget.classList.toggle('selected');
              const checkbox = event.currentTarget.querySelector('input'),
                    checkAllInput = checkAll.querySelector('input');

              toggleCheck(checkbox);

              tableRow.forEach(rowItem => {
                rowArr.push(rowItem.classList.value)
              });


              if (rowArr.every(isSelected))
                  checkAllInput.checked = true;
              else
                  checkAllInput.checked = false

          });

           row.addEventListener('keydown', function(event){
               if (event.keyCode ===  32) {
                   row.click();
               }
           })

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

        checkAll.addEventListener('keydown', function(event){
            if (event.keyCode ===  32) {
                checkAll.click();
            }
            event.stopImmediatePropagation();
        })

    })

})();


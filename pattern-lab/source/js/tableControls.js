'use strict';

(function(){
    const tablesWithControls = document.querySelectorAll('.table-with-controls'),
          searchObj = {};
    searchObj.searchByCollection = [];
    tablesWithControls.forEach(table => {
        const searchByValues = table.querySelectorAll('th'),
              tableCellValues = table.querySelectorAll('tr'),
              selectValues = table.querySelectorAll('select option');

        selectValues.forEach(option => {
           option.value = option.value.split(' ').join('_');
        });

        searchByValues.forEach(value => {
            if (value.getAttribute('data-value') !== null) {
                searchObj.searchByCollection.push(value.innerHTML.split(' ').join('_'));
            }
        });

        tableCellValues.forEach(value => {
            const tdValue = value.querySelectorAll('td');
            let counter = 0;
            if (tdValue.length > 0) {
                tdValue.forEach((td) => {
                    if (!td.getAttribute('scope') && counter <= selectValues.length) {
                        td.setAttribute('data-col', searchObj.searchByCollection[counter]);
                        counter++;
                    }
                });
            }
        });
    });
})();
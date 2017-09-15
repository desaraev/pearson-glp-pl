'use strict';
(function(){
    const sortableTable = document.querySelectorAll('table.sortable');

    sortableTable.forEach(table => {
        const sortBtns = table.querySelectorAll('th.sort');

        function sortTable(n) {
            let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
            switching = true;
            dir = "asc";
            while (switching) {
                switching = false;
                rows = table.getElementsByTagName("TR");
                for (i = 1; i < (rows.length - 1); i++) {
                    shouldSwitch = false;
                    x = rows[i].getElementsByTagName("TD")[n];
                    y = rows[i + 1].getElementsByTagName("TD")[n];
                    if (dir === "asc") {
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            shouldSwitch= true;
                            break;
                        }
                    } else if (dir === "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch= true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount ++;
                } else {
                    if (switchcount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }
        }

        sortBtns.forEach((btn, index) => {
            btn.addEventListener('click', event => {
                const ariaSort = btn.getAttribute('aria-sort');

                sortBtns.forEach(btn => {
                    btn.setAttribute('aria-sort', 'none');
                });
                if (ariaSort === 'none')
                    btn.setAttribute('aria-sort', 'ascending');
                else if (ariaSort === 'ascending')
                    btn.setAttribute('aria-sort', 'descending');
                else
                    btn.setAttribute('aria-sort', 'ascending');

                if (btn.classList.contains('selected') === false) {
                    sortBtns.forEach(btn => {
                        btn.classList.remove('selected');
                    });
                }
                if (btn.classList.contains('selected'))
                    btn.classList.remove('selected');
                else
                    btn.classList.add('selected');

                sortTable(index);
            });

            btn.addEventListener('keydown', function(event){
                if (event.keyCode ===  32) {
                    btn.click();
                }
            })
        })


    })
})();

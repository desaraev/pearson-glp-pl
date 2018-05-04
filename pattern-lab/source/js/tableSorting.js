'use strict';
(function() {
    const sortableTable = document.querySelectorAll('table.sortable');

    sortableTable.forEach(table => {
        const sortBtns = table.querySelectorAll('th.sort button');

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
                            shouldSwitch = true;
                            break;
                        }
                    } else if (dir === "desc") {
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            shouldSwitch = true;
                            break;
                        }
                    }
                }
                if (shouldSwitch) {
                    rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                    switching = true;
                    switchcount++;
                } else {
                    if (switchcount === 0 && dir === "asc") {
                        dir = "desc";
                        switching = true;
                    }
                }
            }

            //set other columns to unsorted
            sortBtns.forEach((btn, index) => {
                if (index != n) {
                    btn.parentElement.setAttribute('aria-sort', 'none');
                    btn.setAttribute('title', 'Unsorted');
                    const upicon = btn.querySelector('.up');
                    const downicon = btn.querySelector('.down');
                    const sorticon = btn.querySelector('.none');
                    sorticon.style.display = "inline";
                    upicon.style.display = "none";
                    downicon.style.display = "none";
                }
            })
        }

        sortBtns.forEach((btn, index) => {
            btn.addEventListener('click', event => {
                const ariaSort = btn.parentElement.getAttribute('aria-sort');
                const upicon = btn.querySelector('.up');
                const downicon = btn.querySelector('.down');
                const sorticon = btn.querySelector('.none');
                sorticon.style.display = "none";

                sortBtns.forEach(btn => {
                    btn.parentElement.setAttribute('aria-sort', 'none');
                    btn.setAttribute('title', 'Unsorted');
                });
                if (ariaSort === 'none') {
                    btn.parentElement.setAttribute('aria-sort', 'ascending');
                    btn.setAttribute('title', 'Sorted Up');
                    upicon.style.display = "inline";
                    downicon.style.display = "none";
                } else if (ariaSort === 'ascending') {
                    btn.parentElement.setAttribute('aria-sort', 'descending');
                    btn.setAttribute('title', 'Sorted Down');
                    upicon.style.display = "none";
                    downicon.style.display = "inline";
                } else {
                    btn.parentElement.setAttribute('aria-sort', 'ascending');
                    btn.setAttribute('title', 'Sorted Up');
                    upicon.style.display = "inline";
                    downicon.style.display = "none";
                }

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

            btn.addEventListener('keyup', function(event) {
                if (event.keyCode === 32) {
                    btn.click();
                }
            })
        })


    })
})();
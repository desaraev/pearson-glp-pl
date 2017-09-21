'use strict';
(function() {
    
    const menubutton = document.querySelector('button[aria-haspopup]'),
        menu = document.querySelector('[role=menu]'),
        menuitems = document.querySelectorAll('[role=menuitemcheckbox]');
    
        menubutton.addEventListener('click', event => {
            const target = event.currentTarget,
                menu = document.querySelector('[role=menu]'),
                _this = menubutton,
                isExpanded = _this.getAttribute('aria-expanded');

            if (isExpanded === 'true') {
                _this.setAttribute('aria-expanded', 'false'); 
                menu.classList.add('hidden');
                _this.focus();
            }
            if (isExpanded === 'false') {
                _this.setAttribute('aria-expanded', 'true');
                menu.classList.remove('hidden');
                menu.focus();
            }
            event.stopPropagation();
        })
        var mouseEnteredMenuButton = false;    
        menubutton.addEventListener('mouseenter', event => {
            const target = event.currentTarget,
                menu = document.querySelector('[role=menu]'),
                _this = menubutton,
                isExpanded = _this.getAttribute('aria-expanded');
            event.stopPropagation();
            mouseEnteredMenuButton = true;

            if (isExpanded === 'false') {
                _this.setAttribute('aria-expanded', 'true');
                menu.classList.remove('hidden');
                menu.focus();
            }
        })

    var itemCount = 1;
    menuitems.forEach(item => {
        item.addEventListener('click', event => {
            const target = event.currentTarget,
                isChecked = target.getAttribute('aria-checked');

            if (isChecked === 'true' )
                target.setAttribute('aria-checked', 'false');
            else
                target.setAttribute('aria-checked', 'true');
            const menu = document.querySelector('[role=menu]');
            menu.setAttribute('aria-activedescendant',target.id);
            changeActiveDescendant();
            event.stopPropagation();

        })
        item.setAttribute('id', 'menuitem' + itemCount);
        itemCount += 1;
    });
        resetActiveDescendant();
        menubutton.addEventListener('keyup', event => {
            const target = event.currentTarget,
                menu = document.querySelector('[role=menu]'),
                _this = menubutton,
                isExpanded = _this.getAttribute('aria-expanded');
                
            if (event.keyCode == 40) { //down arrow
                console.log('down key pressed');
                _this.setAttribute('aria-expanded', 'true');
                menu.classList.remove('hidden');
                menu.focus();
                event.stopPropagation();

            }
        })
    

    function resetActiveDescendant() {
            const menu = document.querySelector('[role=menu]');
            menu.setAttribute('aria-activedescendant','menuitem1');
            changeActiveDescendant();
    }
    function changeActiveDescendant() {
            menuitems.forEach(item => {
                item.style.outline = "none";
                item.style.backgroundColor = "white";
                item.style.padding = "7px 10px"
            });

            var activeDescendantID = document.querySelector('[aria-activedescendant]').getAttribute('aria-activedescendant');
            var activeDescendant = document.getElementById(activeDescendantID);
            activeDescendant.style.outline = "3px solid navy";
            activeDescendant.style.backgroundColor = "#E9E9E9";
    }
    menu.addEventListener('mouseleave', event => {
            const menubutton = document.querySelector('button[aria-haspopup]'), 
                            _this = menu;
            event.stopPropagation();
            setTimeout(function(){ 
                if (!mouseEnteredMenuButton) {
                menubutton.setAttribute('aria-expanded', 'false'); 
                menu.classList.toggle('hidden');
                }
             }, 100);
            mouseEnteredMenu = false;
    })
    var mouseEnteredMenu = false;
    menu.addEventListener('mouseenter', event => {
            const menubutton = document.querySelector('button[aria-haspopup]'), 
                            _this = menu;
            event.stopPropagation();
            mouseEnteredMenu = true;
    })
    menubutton.addEventListener('mouseleave', event => {
            const menu = document.querySelector('[role=menu]'), 
                            _this = menubutton;
            mouseEnteredMenuButton = false;
            event.stopPropagation();
            setTimeout(function(){ 
                if (!mouseEnteredMenu) {
                _this.setAttribute('aria-expanded', 'false'); 
                menu.classList.toggle('hidden');
                }
             }, 100);
    })

        menu.addEventListener('keydown', event => {
            var activeDescendantID = document.querySelector('[aria-activedescendant]').getAttribute('aria-activedescendant');
            var activeDescendant = document.getElementById(activeDescendantID);
            const target = event.currentTarget,
             menubutton = document.querySelector('button[aria-haspopup]'),
                _this = menu;
                
                switch(event.which || event.keyCode) {

                case 9: //tab
                menubutton.setAttribute('aria-expanded', 'false'); 
                _this.classList.toggle('hidden');
                return;
                break;


                case 38: // up
                if (activeDescendant == _this.firstElementChild) {
                    _this.setAttribute('aria-activedescendant',_this.lastElementChild.id);
                } else {
                    _this.setAttribute('aria-activedescendant',activeDescendant.previousElementSibling.id);
                }
                changeActiveDescendant();
                break;


                case 40: // down
                if (activeDescendant == _this.lastElementChild) {
                    _this.setAttribute('aria-activedescendant',_this.firstElementChild.id);
                } else {
                    _this.setAttribute('aria-activedescendant',activeDescendant.nextElementSibling.id);
                }
                changeActiveDescendant();
                break;
                
                case 27: // ESC
                menubutton.setAttribute('aria-expanded', 'false'); 
                _this.classList.toggle('hidden');
                menubutton.focus();
                break;

                case 13:
                case 32: // enter space
                changeActiveDescendant();
                activeDescendant.click();
                break;
                case 36: // home
                _this.setAttribute('aria-activedescendant',_this.firstElementChild.id);
                changeActiveDescendant();
                break;

                case 35: // end
                _this.setAttribute('aria-activedescendant',_this.lastElementChild.id);
                changeActiveDescendant();
                break;


                default: return; // exit this handler for other keys
            }
            event.preventDefault(); // prevent the default action (scroll / move caret)

            
        })




    
})();
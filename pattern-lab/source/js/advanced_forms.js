var courseArray = [];
var counter = 0;
var courseInfo = {num: '', day: '', start: '', end: ''};

   function cloneRow() {

       var row = document.querySelector(".schedule-row:last-child");
       var container = document.getElementById("courseDates");
       var currentDate = row.querySelector("select").selectedIndex;
       var clone = row.cloneNode(true);
       var deleteRowBtn = clone.querySelector("button.remove-daytime");
       var select = clone.querySelector("select");
       var startTime = clone.querySelector(".start input");
       var startTimeLabel = clone.querySelector(".start label");
       var endTime = clone.querySelector(".end input");
       var endTimeLabel = clone.querySelector(".end label");
       var startMenu = clone.querySelector(".start .menu");
       var endMenu = clone.querySelector(".end .menu");

       //get previous day of week and add two
       var date = clone.querySelector("select");
       var dateLabel = clone.querySelector(".basic-select label");

       if (currentDate == 5) {
         date.selectedIndex = 0;
       }
       else if (currentDate == 6) {
         date.selectedIndex = 1;
       }
       else {
         date.selectedIndex = currentDate + 2;
       }

     function clearErrors() {
       startTime.classList = "pe-textInput--basic";
       startTime.removeAttribute('aria-describedby');
         startTime.removeAttribute('aria-invalid');

       endTime.classList = "pe-textInput--basic";
       endTime.removeAttribute('aria-describedby');
         endTime.removeAttribute('aria-invalid');


       var errorMessages = clone.querySelectorAll('p.pe-input--error_message');

       errorMessages.forEach(function(message) {
         if (message) {
           message.parentNode.removeChild(message);
         }
       })


     }

       counter++;

       clone.id = "schedule-row-" + counter;
       deleteRowBtn.id = "remove-schedule-item-" + counter;
       select.id = "dateSelector-" + counter;
       dateLabel.setAttribute("for", "dateSelector-" + counter);
       startTime.classList = "pe-textInput--basic";
       startTime.id = "timeSelectorStart-" + counter;
       startTimeLabel.setAttribute("for", "timeSelectorStart-" + counter);
       endTimeLabel.setAttribute("for", "timeSelectorEnd-" + counter);
       endTime.id = "timeSelectorEnd-" + counter;
       startMenu.id = "menu" + counter + "-start";
       endMenu.id = "menu" + counter + "-end";
     clearErrors();
       container.appendChild(clone);
     // var newcourseInfo = Object.assign(courseInfo, courseInfo);
//
//     		courseArray.push(newcourseInfo);
//     		console.log(courseArray);
     }

   function removeRow(event) {
     var row = event.target.parentNode.parentNode.parentNode.parentNode;

     row.parentNode.removeChild(row);
   }

function rowFunctions(event) {
 //if (!event.target.matches('input')) return
 //console.log('this is an input')
 if (event.target.matches('input')) {
 const menu = event.target.parentNode.parentNode.parentNode.querySelector('.menu'),
   listItem = menu.querySelectorAll('li'),
   input = event.target;

 menu.classList.remove('hidden');
 listItem.forEach((item) => {
           item.addEventListener('click', event => {

               listItem.forEach((item) => {

                   item.setAttribute('aria-checked', 'false');
               });
               event.preventDefault();
               input.value = event.currentTarget.querySelector('a').textContent.replace(/\s(?!AM|PM|am|pm)/g, '').toUpperCase();
               menu.classList.add('hidden');
              // item.setAttribute('aria-checked', 'true');
           })
       });
   input.addEventListener('keyup', () => {
           menu.classList.add('hidden');
       });
       }




 const scheduleRows = event.currentTarget.querySelectorAll('.schedule-row');



     scheduleRows.forEach(row => {
         const start = row.querySelector('.timepicker-container.start'),
            end = row.querySelector('.timepicker-container.end'),
            startTime = start.querySelector('input'),
            endTime = end.querySelector('input'),
            dates = row.querySelectorAll('select'),
            startMenuItems = start.querySelectorAll('.menu li'),
            endMenuItems = end.querySelectorAll('.menu li');

       var currentDate;

       dates.forEach((date) => {
         currentDate = date.options[date.selectedIndex].value;

         date.addEventListener('change', event => {
           currentDate = date.selectedIndex.value;
           validateDays();
         })
         //dateArr[dateArr.length] = currentDate;
         courseInfo.day=currentDate;
         courseArray.push(courseInfo);

         if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }

       })

         //if they select from the list
         startMenuItems.forEach((item) => {
                 item.addEventListener('click', event => {
                     startTime.value = event.currentTarget.querySelector('a').textContent.replace(/\s(?!AM|PM|am|pm)/g, '').toUpperCase();
                     var currentTime = moment(startTime.value, 'h:mm A');
             endTime.value = moment(currentTime).add(50, "minutes").format('h:mm A');

           startTime.value = moment(currentTime).format('h:mm A');
           if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }

                })
             });
             endMenuItems.forEach((item) => {
                 item.addEventListener('click', event => {
                    endTime.value = event.currentTarget.querySelector('a').textContent.replace(/\s(?!AM|PM|am|pm)/g, '').toUpperCase();
                      var currentEnd = moment(endTime.value, 'h:mm A');

             endTime.value = moment(currentEnd).format('h:mm A');

         if (validateTyping(startTime) && validateTyping(endTime)) {
           validateTime();
           validateDays();
         }

                })

             });

         //if they type into start
         startTime.addEventListener('keyup', () => {

           var currentStart = startTime.value.toUpperCase();
           startTime.value = currentStart.toLocaleString();

           //var m = currentTime.match(/(\d{1,2}:\d{2})\s+?(AM|PM)/i)
         if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }


         });
         startTime.addEventListener('blur', () => {
           if (startTime.value) {
             if (validateTyping(startTime) ) {
               var currentStart = moment(startTime.value, 'h:mm A');

               endTime.value = moment(currentStart).add(50, "minutes").format('h:mm A');
               }
           }
            if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }

         })
         endTime.addEventListener('keyup', () => {
           var currentEnd = endTime.value.toUpperCase();
           endTime.value = currentEnd.toLocaleString();

           if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }

         });
         endTime.addEventListener('blur', () => {
           if (endTime.value) {
             var currentEnd = moment(endTime.value, 'h:mm A');
             endTime.value = currentEnd.format('h:mm A');
           }

           if (validateTyping(startTime) && validateTyping(endTime)) {
         validateTime();
         validateDays();
         }

         });

       //courseInfo.start[courseInfo.length] = startTime.value;
       //courseInfo.end[courseInfo.length] = endTime.value;

       // courseArray.push(
// 				    courseInfo
// 				);
//    			startArr[startArr.length] = startTime.value;
//     			endArr[endArr.length] = endTime.value;

       //console.log(courseArray);

         //create function to check validation and tag to all keydown or blur eventss
         function validateDays() {
           var row0 = document.getElementById("schedule-row-0"),
             row1 = document.getElementById("schedule-row-1"),
             row2 = document.getElementById("schedule-row-2"),
             row3 = document.getElementById("schedule-row-3"),
             row4 = document.getElementById("schedule-row-4");

           var row0Date = row0.getElementsByTagName("select")[0];

           var counter = 0;
           var fragment = document.createDocumentFragment();
           var errorP = document.createElement('p');
         errorP.classList = 'pe-input--error_message';

         counter++;

         //console.log( row1.getElementsByTagName("select")[0].selectedIndex.value, row0.getElementsByTagName("select")[0].options[selectedIndex].value );
         if (row1 && !row2) {

         var row1Date = row1.getElementsByTagName("select")[0];
         if ( row1Date.options[row1Date.selectedIndex].value == row0Date.options[row0Date.selectedIndex].value ) {
           if ( row1.querySelector(".start input").value == row0.querySelector(".start input").value) {
             if ( !row1.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".start input").setAttribute('aria-describedby', 'error2-' + counter);
                 row1.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time already taken';
                 errorP.id = 'error2-' + counter;
                 row1.querySelector(".start .timepicker").appendChild(errorP);
               }

           } else if (row1.querySelector(".start input").value < row0.querySelector(".start input").value && row1.querySelector(".end input").value > row0.querySelector(".end input").value ) {
             if ( !row1.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".end .timepicker").appendChild(errorP);
               }
           } else if (row1.querySelector(".start input").value < row0.querySelector(".start input").value && !row1.querySelector(".end input").value > row0.querySelector(".end input").value ) {
             if ( !row1.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".end .timepicker").appendChild(errorP);
               }
           } else if (row1.querySelector(".start input").value > row0.querySelector(".start input").value && row1.querySelector(".start input").value < row0.querySelector(".end input").value ) {
             if ( !row1.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".start .timepicker").appendChild(errorP);
               }
           }
           else {
             //clear errors
             if (row1.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row1.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {
               row1.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row1.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".start .timepicker").removeChild(errorMessage);
               row1.querySelector(".start input").removeAttribute('aria-describedby');
               row1.querySelector(".start input").removeAttribute('aria-invalid');

               row1.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row1.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".end .timepicker").removeChild(errorMessage2);
               row1.querySelector(".end input").removeAttribute('aria-describedby');
               row1.querySelector(".end input").removeAttribute('aria-invalid');

             }
           }
         }
         else {
             //clear errors
             if (row1.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row1.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {
               row1.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row1.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               if(errorMessage) row1.querySelector(".start .timepicker").removeChild(errorMessage);
               row1.querySelector(".start input").removeAttribute('aria-describedby');
               row1.querySelector(".start input").removeAttribute('aria-invalid');

               row1.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row1.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".end .timepicker").removeChild(errorMessage2);
               row1.querySelector(".end input").removeAttribute('aria-describedby');
               row1.querySelector(".end input").removeAttribute('aria-invalid');

             }
           }
         }
           if (row2) {
           var row1Date = row1.getElementsByTagName("select")[0];
           var row2Date = row2.getElementsByTagName("select")[0];
         if ( row1Date.options[row1Date.selectedIndex].value == row0Date.options[row0Date.selectedIndex].value ) {
           if ( row1.querySelector(".start input").value == row0.querySelector(".start input").value) {
             if ( !row1.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".start input").setAttribute('aria-describedby', 'error2-' + counter);
                 row1.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time already taken';
                 errorP.id = 'error2-' + counter;
                 row1.querySelector(".start .timepicker").appendChild(errorP);
               }

           } else if (row1.querySelector(".start input").value < row0.querySelector(".start input").value && row1.querySelector(".end input").value > row0.querySelector(".end input").value ) {
             if ( !row1.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".end .timepicker").appendChild(errorP);
               }
           } else if (row1.querySelector(".start input").value < row0.querySelector(".start input").value && !row1.querySelector(".end input").value < row0.querySelector(".start input").value ) {
             if ( !row1.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".end .timepicker").appendChild(errorP);
               }
           } else if (row1.querySelector(".start input").value > row0.querySelector(".start input").value && row1.querySelector(".start input").value < row0.querySelector(".end input").value ) {
             if ( !row1.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row1.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row1.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                 row1.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row1.querySelector(".start .timepicker").appendChild(errorP);
               }
           }
           else {
             //clear errors
             console.log("all good");
             if (row1.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row1.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {

             row1.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row1.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".start .timepicker").removeChild(errorMessage);
               row1.querySelector(".start input").removeAttribute('aria-describedby');
               row1.querySelector(".start input").removeAttribute('aria-invalid');

               row1.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row1.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".end .timepicker").removeChild(errorMessage2);
               row1.querySelector(".end input").removeAttribute('aria-describedby');
               row1.querySelector(".end input").removeAttribute('aria-invalid');

             }
           }
         }
         else if ( row2Date.options[row2Date.selectedIndex].value == row1Date.options[row1Date.selectedIndex].value ) {
           if ( row2.querySelector(".start input").value == row1.querySelector(".start input").value) {
             if ( !row2.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row2.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row2.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                 row2.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time already taken';
                 errorP.id = 'error3-' + counter;
                 row2.querySelector(".start .timepicker").appendChild(errorP);
               }

           } else if (row2.querySelector(".start input").value < row1.querySelector(".start input").value && row2.querySelector(".end input").value > row1.querySelector(".end input").value ) {
             if ( !row2.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row2.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row2.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row2.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row2.querySelector(".end .timepicker").appendChild(errorP);
               }
           }  else if (row2.querySelector(".start input").value > row1.querySelector(".start input").value && row2.querySelector(".start input").value < row1.querySelector(".end input").value ) {
             if ( !row2.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row2.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row2.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                 row2.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row2.querySelector(".start .timepicker").appendChild(errorP);
               }
           }
           else {
             //clear errors
             if (row2.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row2.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {
               row2.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row2.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".start .timepicker").removeChild(errorMessage);
               row2.querySelector(".start input").removeAttribute('aria-describedby');
               row2.querySelector(".start input").removeAttribute('aria-invalid');

               row2.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row2.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".end .timepicker").removeChild(errorMessage2);
               row2.querySelector(".end input").removeAttribute('aria-describedby');
               row2.querySelector(".end input").removeAttribute('aria-invalid');

             }
             }
         }
         else if ( row2Date.options[row2Date.selectedIndex].value == row0Date.options[row0Date.selectedIndex].value ) {
             if ( row2.querySelector(".start input").value == row0.querySelector(".start input").value) {
               if ( !row2.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                   row2.querySelector(".start input").classList = "pe-textInput--basic_error";
                   row2.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                   row2.querySelector(".start input").setAttribute('aria-invalid', 'true');

                   errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time already taken';
                   errorP.id = 'error3-' + counter;
                   row2.querySelector(".start .timepicker").appendChild(errorP);
                   }

               } else if (row2.querySelector(".start input").value < row0.querySelector(".start input").value && row2.querySelector(".end input").value > row0.querySelector(".end input").value ) {
             if ( !row2.querySelector(".end input").classList.contains("pe-textInput--basic_error") ) {
                 row2.querySelector(".end input").classList = "pe-textInput--basic_error";
                 row2.querySelector(".end input").setAttribute('aria-describedby', 'error3-' + counter);
                 row2.querySelector(".end input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row2.querySelector(".end .timepicker").appendChild(errorP);
               }
           } else if (row2.querySelector(".start input").value > row0.querySelector(".start input").value && row2.querySelector(".start input").value < row0.querySelector(".end input").value ) {
             if ( !row2.querySelector(".start input").classList.contains("pe-textInput--basic_error") ) {
                 row2.querySelector(".start input").classList = "pe-textInput--basic_error";
                 row2.querySelector(".start input").setAttribute('aria-describedby', 'error3-' + counter);
                 row2.querySelector(".start input").setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Start time conflicts with another time';
                 errorP.id = 'error3-' + counter;
                 row2.querySelector(".start .timepicker").appendChild(errorP);
               }
           }
           else {
             //clear errors
             if (row2.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row2.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {
               row2.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row2.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".start .timepicker").removeChild(errorMessage);
               row2.querySelector(".start input").removeAttribute('aria-describedby');
               row2.querySelector(".start input").removeAttribute('aria-invalid');

               row2.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row2.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".end .timepicker").removeChild(errorMessage2);
               row2.querySelector(".end input").removeAttribute('aria-describedby');
               row2.querySelector(".end input").removeAttribute('aria-invalid');

             }
             }
           }


         else {
             //clear errors
             if (row2.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row2.querySelector(".end input").classList.contains('pe-textInput--basic_error') ) {
               row2.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row2.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".start .timepicker").removeChild(errorMessage);
               row2.querySelector(".start input").removeAttribute('aria-describedby');
               row2.querySelector(".start input").removeAttribute('aria-invalid');

               row2.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row2.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row2.querySelector(".end .timepicker").removeChild(errorMessage2);
               row2.querySelector(".end input").removeAttribute('aria-describedby');
               row2.querySelector(".end input").removeAttribute('aria-invalid');

             }
             else if (row1.querySelector(".start input").classList.contains('pe-textInput--basic_error') || row1.querySelector(".end input").classList.contains('pe-textInput--basic_error') ){
                row1.querySelector(".start input").classList = "pe-textInput--basic";
             var errorMessage = row1.querySelector(".start .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".start .timepicker").removeChild(errorMessage);
               row1.querySelector(".start input").removeAttribute('aria-describedby');
               row1.querySelector(".start input").removeAttribute('aria-invalid');

               row1.querySelector(".end input").classList = "pe-textInput--basic";
             var errorMessage2 = row1.querySelector(".end .timepicker").querySelector('p.pe-input--error_message');

               row1.querySelector(".end .timepicker").removeChild(errorMessage2);
               row1.querySelector(".end input").removeAttribute('aria-describedby');
               row1.querySelector(".end input").removeAttribute('aria-invalid');
               }
           }
         }
         }

       function validateTyping(inputField) {
       var counter = 0;
           var fragment = document.createDocumentFragment();
           var errorP = document.createElement('p');
         errorP.classList = 'pe-input--error_message invalid-format';


         counter++;
         var isValid = /^([0-1][0-2]|\d):[0-5][0-9]\s(PM|AM|am|pm)$/.test(inputField.value);


           if (!isValid) {
             console.log(inputField.value);
             if (!inputField.classList.contains("pe-textInput--basic_error") ) {
               inputField.classList = "pe-textInput--basic_error";
                 inputField.setAttribute('aria-describedby', 'error2-' + counter);
                 inputField.setAttribute('aria-invalid', 'true');

                 errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> Invalid time format';
                 errorP.id = 'error2-' + counter;
                 inputField.parentNode.parentNode.appendChild(errorP);
               }
           } else if (isValid && inputField.classList.contains("pe-textInput--basic_error") ) {
                 inputField.classList = "pe-textInput--basic";
               var errorMessage = inputField.parentNode.parentNode.querySelector('p.pe-input--error_message');

               inputField.parentNode.parentNode.removeChild(errorMessage);
               inputField.removeAttribute('aria-describedby');
               inputField.removeAttribute('aria-invalid');
               return true;
               }
               else {
               return true;
               }

       }

         function validateTime() {
           //var date = dateArr.indexOf(currentDate);
           var st = startTime.value;
           var et = endTime.value;
           var timeFormat = 'hh:mm A';
           var diff = moment(et, 'hh:mm A') - moment(st, 'hh:mm A');
           var counter = 0;
           var fragment = document.createDocumentFragment();
           var errorP = document.createElement('p');
         errorP.classList = 'pe-input--error_message';

         counter++;

           if (diff == 0) {
             console.log("end time is same as start time");
             if (!endTime.classList.contains('pe-textInput--basic_error')) {
               endTime.classList = "pe-textInput--basic_error";
               endTime.setAttribute('aria-describedby', 'error2-' + counter);
               endTime.setAttribute('aria-invalid', 'true');

               errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be different than start time';
               errorP.id = 'error2-' + counter;
               endTime.parentNode.parentNode.appendChild(errorP);
               }
             else if (endTime.classList.contains('pe-textInput--basic_error')) {
               var errorMessage = endTime.parentNode.parentNode.querySelector('p.pe-input--error_message');
               errorMessage.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be different than start time';

               }
           }
           else if (diff < 0) {

             //console.log("end time is after start time");
             if (!endTime.classList.contains('pe-textInput--basic_error')) {
               endTime.classList = "pe-textInput--basic_error";
               endTime.setAttribute('aria-describedby', 'error1-' + counter);
               endTime.setAttribute('aria-invalid', 'true');
             errorP.id = 'error1-' + counter;
               endTime.parentNode.parentNode.appendChild(errorP);

               if (( endTime.value.slice(-2) == 'AM' ) && (startTime.value.slice(-2) == 'PM')) {
                  errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be on the same day';

               }
               else {
               errorP.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be after start time';

               }

             } else if (endTime.classList.contains('pe-textInput--basic_error')) {
               var errorMessage = endTime.parentNode.parentNode.querySelector('p.pe-input--error_message');

               if (( endTime.value.slice(-2) == 'AM' ) && (startTime.value.slice(-2) == 'PM')) {
                  errorMessage.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be on the same day';

               }
               else {
               errorMessage.innerHTML = '<svg focusable="false" class="pe-icon--warning-sm-18" role="img" aria-label="Error" ><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#warning-sm-18"></use></svg> End time must be after start time';

               }
             }
           }
           else {
             //clear errors
             if (endTime.classList.contains('pe-textInput--basic_error')) {
               endTime.classList = "pe-textInput--basic";
             var errorMessage = endTime.parentNode.parentNode.querySelector('p.pe-input--error_message');

               endTime.parentNode.parentNode.removeChild(errorMessage);
               endTime.removeAttribute('aria-describedby');
               endTime.removeAttribute('aria-invalid');

             }
           }
         } //end validate function

     });

   };
   function closeMenus(event) {
     if (event.target.matches('input')) return
     const menus = document.querySelectorAll('.menu');
   menus.forEach((menu) => {
     if (menu.classList.contains('hidden')) {return}
     else {
     menu.classList.add('hidden');}
   })
   }
   const courseDateList = document.querySelector('#courseDates');
   courseDateList.addEventListener('click', rowFunctions);
   document.addEventListener('click', closeMenus);

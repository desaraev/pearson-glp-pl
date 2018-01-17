'use strict';
(function() {
    const elements = document.querySelectorAll('.redline-target');
    elements.forEach(element => {
        let w = element.offsetWidth;
        let h = element.offsetHeight;
        let coords = element.getBoundingClientRect();
        let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
        let scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
    
        //if body is position relative/absolute and has a margin set to it. Have to compensate
        let body = window.getComputedStyle(document.body, null);
        let pos = body.getPropertyValue('position');
    
        if ( pos == 'relative' || pos == 'absolute' ){
        scrollY -= parseFloat(body.getPropertyValue('margin-top')) || 0;
        scrollX -= parseFloat(body.getPropertyValue('margin-left')) || 0;
        }
    
        let box = document.createElement('div');
    
        //box.style.position = 'absolute';
        //box.style.zIndex = 1234567890;
        box.style.top = scrollY + coords.top + 'px';
        box.style.left = scrollX + coords.left + 'px';
    
        box.style.width = coords.width + 'px';
        box.style.height = coords.height + 'px';
    
        box.dataset.width = coords.width;
        box.dataset.height = coords.height;
        box.dataset.value = Math.round(coords.width) + ' x ' + Math.round(coords.height);
    
        //box.style.background = 'rgba(0,0,150,.6)';
    
    
    
        box.className = 'PRISMprezeplin';
        console.log(box);
    
        document.body.appendChild(box);
    });
    
    
    let coords = elements[1].getBoundingClientRect();
  
    let redline = document.getElementsByClassName('PRISMprezeplin')[0];
  
    if ( !redline ){
      return;
    }
  
    let bounds = redline.getBoundingClientRect();
  
    let y1 = bounds.top;
    let y2 = bounds.bottom;
    let x1 = bounds.left;
    let x2 = bounds.right;
  
    let y1b = coords.top;
    let y2b = coords.bottom;
    let x1b = coords.left;
    let x2b = coords.right;
  
  
    let dy = 0;
    let dx = 0;
    let ty = 0;
    let tx = 0;
  
    if ( y1b >= y2 ){
      dy = y1b - y2
      ty = y2;
    } else if ( y1b >= y1 ){
      dy = y1b - y1;
      ty = y1;
    } else if ( y1 >= y2b) {
      dy = y1 - y2b;
      ty = y2b;
    } else if ( y1 > y1b ){
      dy = y1 - y1b;
      ty = y1b;
    } else {
      console.warn('dist y issue')
    }
  
    if ( x1b >= x2 ){
      dx = x1b - x2
      tx = x2;
    } else if ( x1b >= x1 ){
      dx = x1b - x1;
      tx = x1;
    } else if ( x1 > x2b) {
      dx = x1 - x2b;
      tx = x2b
    } else if ( x1 > x1b ){
      dx = x1 - x1b;
      tx = x1b
    } else {
      console.warn('dist x issue')
    }
  
  
  
  
    console.log(tx, ty);
    // let dist = document.createElement('div');
    // let info = document.createElement('div');
    // dist.className = 'PRISMdistance';
    // dist.style.position = 'absolute';
    // dist.style.top = scrollY +  ty + 'px';
    // dist.style.left = scrollX +  tx + 'px';
    //
    // dist.style.width = dx + 'px';
    // dist.style.height = dy + 'px';
  
    dx = Math.round(dx);
    dy = Math.round(dy);
  
    // dist.dataset.x = dx;
    // dist.dataset.y = dy;
    // dist.dataset.value = 'x: ' + dx + ' - y: ' + Math.round(dy);
  
  
  
    ////
    if ( dy > 0 ){
      let yline = document.createElement('div');
      let f1 = document.createElement('div');
      let f2 = document.createElement('div');
      yline.className = 'PRISMdistance2 PRISMy';
  
      yline.style.height = dy + 'px';
      yline.style.top = scrollY +  ty + 'px';
      yline.style.left = coords.left + (coords.width / 2) + scrollX - 1 + 'px';
  
      yline.dataset.value = dy;
  
      yline.appendChild(f1);
      yline.appendChild(f2);
  
      document.body.appendChild(yline);
    }
  
    if ( dx > 0 ){
      let xline = document.createElement('div');
      let f1 = document.createElement('div');
      let f2 = document.createElement('div');
      xline.className = 'PRISMdistance2 PRISMx';
  
      xline.style.width = dx + 'px';
      xline.style.top = coords.top + (coords.height /2) + scrollY - 1 + 'px';
      xline.style.left = scrollX + tx + 'px';
  
      xline.dataset.value = dx;
  
      xline.appendChild(f1);
      xline.appendChild(f2);
  
      document.body.appendChild(xline);
  
    }
  
  
    if ( y1 > y1b && y2 < y2b || y1 < y1b && y2 > y2b ){
      console.log('vertically inside');
      let bottomy = Math.abs(y2 - y2b);
  
  
      if ( bottomy > .5 ){
        let y2line = document.createElement('div');
        let f1 = document.createElement('div');
        let f2 = document.createElement('div');
  
        let iy = y2 < y2b ? y2 : y2b;
  
        y2line.className = 'PRISMdistance2 PRISMy2 PRISMy';
  
        y2line.style.height = bottomy + 'px';
        y2line.style.top = scrollY +  iy + 'px';
        y2line.style.left = coords.left + (coords.width / 2) + scrollX - 1 + 'px';
  
        y2line.dataset.value = Math.round(bottomy);
  
        y2line.appendChild(f1);
        y2line.appendChild(f2);
  
        document.body.appendChild(y2line);
      }
    }
  
    if ( x1 > x1b && x2 < x2b || x1 < x1b && x2 > x2b ){
      console.log('horz inside');
      let rightx = Math.abs(x2 - x2b);
      if ( rightx > .5 ){
        let x2line = document.createElement('div');
        let f1 = document.createElement('div');
        let f2 = document.createElement('div');
        x2line.className = 'PRISMdistance2 PRISMx PRISMx2';
  
        let ix = x2 < x2b ? x2 : x2b;
  
        x2line.style.width = rightx + 'px';
        x2line.style.top = coords.top + (coords.height /2) + scrollY - 1 + 'px';
        x2line.style.left = scrollX + ix + 'px';
  
        x2line.dataset.value = Math.round(rightx);
  
        x2line.appendChild(f1);
        x2line.appendChild(f2);
  
        document.body.appendChild(x2line);
      }
    }
  
    console.log(dy);
    console.log(dx);

})();
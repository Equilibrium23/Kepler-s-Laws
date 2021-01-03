var t = 0;
function draw(){
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';
    const width = canvas.width; 
    const height = canvas.height;
    const x = width/2;
    const y = height/2;

    a = parseInt(document.getElementById('a_range').value)
    b = parseInt(document.getElementById('b_range').value)
    
    document.getElementById('slider_a_value').innerHTML = a;
    document.getElementById('slider_b_value').innerHTML = b;

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
    context.stroke();

    // major driveshaft
    context.beginPath();
    context.moveTo(x, y);
    console.log(a)
    context.lineTo(x+a, y);
    context.stroke();

    // minor driveshaft
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, y+b);
    context.stroke();

    // earth
    var earth = new Image();
    earth.src = '../images/ziemia2.png'
    var earth_offest_x =  earth.width/2;
    var earth_offest_y = earth.height/2;
    var earth_x = a*Math.cos(t);
    var earth_y = b*Math.sin(t);
    t+=0.01;
    if(t>2*Math.PI){
      t = 0;
    }
    context.drawImage(earth,x+earth_x - earth_offest_x,y+earth_y- earth_offest_y)

    //sun 
    var sun = new Image();
    sun.src = '../images/slonce1.png'
    var sun_x_offset = sun.width/2;
    var sun_y_offset = sun.height/2;

    const c = Math.sqrt(Math.abs(Math.pow(a,2) - Math.pow(b,2)));

    document.getElementById('mimosrod').innerHTML = (c/a).toPrecision(3);

    const sun_F1 = document.getElementById('ognisko_f1').checked;
    const sun_F2 = document.getElementById('ognisko_f2').checked;

    var sun_F1_x = 0;  
    var sun_F1_y = 0;
    var sun_F2_x = 0;  
    var sun_F2_y = 0; 
    if ( a > b ){
      // focus F1
      context.beginPath();
      context.font = "25px Georgia";
      context.fillText("F1", x-c - 5, y-5 - 10);
      context.stroke();
      if (sun_F1 == true){
        sun_F1_x = x-c;  
        sun_F1_y = y;
      }

      // focus F2
      context.beginPath();
      context.font = "25px Georgia";
      context.fillText("F2", x+c - 5, y-5 - 10);
      context.stroke();
      if (sun_F2 == true){
        sun_F2_x = x+c;  
        sun_F2_y = y;
      }
    }
    else{
      // focus F1
      context.beginPath();
      context.font = "25px Georgia";
      context.fillText("F1", x-5 - 25, y-c);
      context.stroke();
      if (sun_F1 == true){
        sun_F1_x = x;  
        sun_F1_y = y-c;
      }

      // focus F2
      context.beginPath();
      context.font = "25px Georgia";
      context.fillText("F2", x-5 - 25, y+c);
      context.stroke(); 
      if (sun_F2 == true){
        sun_F2_x = x;  
        sun_F2_y = y+c;
      }
    }
    if ( sun_F1_x != 0 ){
      context.drawImage(sun,sun_F1_x - sun_x_offset,sun_F1_y-sun_y_offset);
    }
    else if ( sun_F2_x != 0 ){
      context.drawImage(sun,sun_F2_x - sun_x_offset,sun_F2_y-sun_y_offset);
    }
    window.requestAnimationFrame(draw);
}
function init(){
  window.requestAnimationFrame(draw);
}

var t2 = 0;
var start1 = [];
var start2 = [];
var start3 = [];
function drawSecondLaw(){
  const width = canvas.width; 
  const height = canvas.height;
  const x = width/2;
  const y = height/2;

  const a = 400;
  const b = 270;
  const c = Math.sqrt(Math.abs(Math.pow(a,2) - Math.pow(b,2)));

  context.clearRect(0, 0, width, height);
  context.restore();
  context.beginPath();
  context.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
  context.stroke();
  context.save();

  //sun in focus
  var sun = new Image();
  sun.src = '../images/slonce1.png'
  var sun_x_offset = sun.width/2;
  var sun_y_offset = sun.height/2;
  context.drawImage(sun,x-c - sun_x_offset,y-sun_y_offset);
  // earth
  const G = 6.674 * Math.pow(10,-11);
  const M = 8  * Math.pow(10,7);
  const MI = G*M;
  var earth_x = a*Math.cos(t2);
  var earth_y = b*Math.sin(t2);
  const R = Math.sqrt(Math.abs(Math.pow(earth_x+c,2) - Math.pow(earth_y-20,2)));
  var V = Math.sqrt(MI*( (2/R) - (1/a) ));
  document.getElementById('speed').innerHTML = V.toPrecision(3);
  var earth = new Image();
  earth.src = '../images/ziemia2.png'
  var earth_offest_x =  earth.width/2;
  var earth_offest_y = earth.height/2;
  context.drawImage(earth,x+earth_x - earth_offest_x,y+earth_y- earth_offest_y)

  t2+=V;
  if (t2 > 2*Math.PI){
      return;
  }

  // draw field
  var drawField = false;
  var deadline = 1000 ;
  if ( t2 > Math.PI / 4 ){
      start1.push(performance.now());
      if ( start1[start1.length-1] - start1[0] <= deadline ){
          drawField = true;
      }
      else{
          drawField = false;
      }
  }
  if ( t2 > Math.PI * 3/4 ){
      start2.push(performance.now());
      console.log(start2[start2.length-1] - start2[0]);
      if ( start2[start2.length-1] - start2[0] <= deadline ){
          drawField = true;
      }
      else{
          drawField = false;
      }
  }
  if ( t2 > Math.PI * 5/4 ){
      start3.push(performance.now());
      if ( start3[start3.length-1] - start3[0] <= deadline ){
          drawField = true;
      }
      else{
          drawField = false;
      }
  }
  if( drawField ){
      context2.beginPath();
      context2.lineWidth = 5;
      context2.moveTo(x-c, y);
      context2.lineTo(x + earth_x, y + earth_y -20);
      context2.strokeStyle = 'yellow';
      context2.stroke();
  }
  window.requestAnimationFrame(drawSecondLaw);
}

function second_law()
{
  canvas = document.getElementById("canvas2");
  canvas2 = document.getElementById("canvas3");
  context = canvas.getContext("2d");
  context2 = canvas2.getContext("2d");
  context.clearRect(0, 0, context.width, context.height);
  context2.clearRect(0, 0, context2.width, context2.height);
  window.requestAnimationFrame(drawSecondLaw);
}


function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}


// get the canvas
var can = document.getElementById("can");
var ctx = can.getContext("2d");
//draw the winning line
function drawLine(){
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            var start = document.getElementById(winCondition[0]);
            var end = document.getElementById(winCondition[2]);
            var container = document.getElementById("container");
            container = container.getBoundingClientRect();
            start = start.getBoundingClientRect();
            end = end.getBoundingClientRect();

            var x1 = start.x  - container.x +50; 

            var y1 = start.y - container.y +50;  

            var x2 = end.x  - container.x +50; 

            var y2 = end.y  - container.y +50;  

            ctx.lineWidth  = 7;
            ctx.strokeStyle = playerColor;
            ctx.lineCap ="round"
            ctx.lineJoin ="round"
            
              var currentProgress = 0;
            ctx.beginPath();
            //animation the line draw
          var interval= setInterval( function(){   
                    ctx.clearRect(0, 0, can.width, can.height);
                    ctx.moveTo(x1, y1);
                    var x3=(currentProgress * (x2 - x1 ) + x1)
                    var y3= (currentProgress * (y2 - y1 +1) + y1)
                    ctx.lineTo(x3, y3);
                    currentProgress +=0.01;
                    ctx.stroke();
                    ctx.moveTo(x3, y3);
                    if(currentProgress > 1 )
                    {
                        clearInterval(interval)
                    }
                } 
            
            ,5)   
         }
  }       
}
 

// delete the line to start new game
function deleteLine()  {
    ctx.clearRect(0, 0, can.width, can.height);
}
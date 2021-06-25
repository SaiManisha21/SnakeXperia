const canvasId = "canvas"
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    const heroPosition = [
                          {x: 10, y: 15},
                          {x: 9, y: 15},
                          {x: 8, y: 15},
                          {x: 7, y: 15},
                          {x: 6, y: 15},
                          {x: 5, y: 15},
                          {x: 4, y: 15},
                          {x: 3, y: 15},
                          {x: 2, y: 15},
                          {x: 1, y: 15}                          
                         ]
    const noOfRows = canvas.height/ 20;
    const noOfColumns = canvas.width / 20;
    let food=[6,10]
    let fruit=0
    let speed=50
    let score=0
    const direction = {
        current : 0,
        left: 1,
        right : 2,
        up : 3,
        down : 4
    }
function drawBackground(ctx) {
     const { width, height } =canvas.getBoundingClientRect();
     //Draw border
        ctx.strokeStyle = "lightgray";
        ctx.rect(0, 0, width, height);
        ctx.stroke();
        ctx.lineWidth = 0.5;
     //Draw rows
        for (let i=0; i < noOfRows; i++) {
            ctx.moveTo(0, i * 20);
            ctx.lineTo(400, i * 20);
        }
    //Draw cols
        for (let i=0; i < noOfColumns; i++) {
            ctx.moveTo(i * 20, 0);
            ctx.lineTo(i * 20, 600);
        }

    ctx.stroke();
}//draw background

function drawSnake()
{
    heroPosition.forEach((snake,index)=>{ 
    if(index==0)
    ctx.fillStyle = "black"
    else{
    if(index%2==0)
    ctx.fillStyle="red"
    else ctx.fillStyle="orange"}
    ctx.fillRect((snake.x) * 20,( snake.y) * 20, 20, 20);
    });
}

//generate new food location
function generate_food()
 {
    food[0] = Math.round((Math.random()* 20));
    food[1] = Math.round((Math.random()* 30));
    return food
 }

 function drawFood(ctx) 
{  
    ctx.fillStyle = 'green';
    ctx.fillRect(food[0] * 20, food[1] * 20, 20, 20);
}

function handleKeyPress(event)
{
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    if (keyPressed === LEFT_KEY) 
     {
          if(direction.current != direction.left && direction.current != direction.right)
            direction.current = direction.left;   
     }
    else if (keyPressed === UP_KEY) 
     {
        if(direction.current != direction.up && direction.current != direction.down) 
          direction.current = direction.up; 
     }
    else if (keyPressed === RIGHT_KEY)
     {
        if(direction.current != direction.right && direction.current != direction.left) 
          direction.current = direction.right;      
     }
   else if (keyPressed === DOWN_KEY)
     {
        if(direction.current != direction.down && direction.current != direction.up)
        direction.current = direction.down; 
     }

}

document.addEventListener("keydown", handleKeyPress);

function moveSnake()
 { 

     if(direction.current == direction.right) {
        heroPosition.unshift({
            x : (heroPosition[0].x)+1,
            y : (heroPosition[0].y ) 
        });       
        if(hasEatenFood())
        {
        heroPosition.unshift({
            x : (heroPosition[0].x)+1,
            y : (heroPosition[0].y )                 
        });    
        }
        heroPosition.pop();
        drawSnake()
        gameEnd()
        
     }
    if(direction.current == direction.left) {
        heroPosition.unshift({
            x : (heroPosition[0].x)-1,
            y : (heroPosition[0].y ) 
        })
        if(hasEatenFood())
        {
        heroPosition.unshift({
            x : (heroPosition[0].x)-1,
            y : (heroPosition[0].y )                 
        });     
        }
        heroPosition.pop();
        drawSnake();
        gameEnd()   
    }
    if(direction.current == direction.up) {
        heroPosition.unshift({
            x : (heroPosition[0].x),
            y : (heroPosition[0].y )-1 
        })
        if(hasEatenFood())
        {
        heroPosition.unshift({
            x : (heroPosition[0].x),
            y : (heroPosition[0].y )-1                 
        });    
        }
        heroPosition.pop();
        drawSnake();
        gameEnd()  
    }
    if(direction.current == direction.down) {
        heroPosition.unshift({
            x : (heroPosition[0].x),
            y : (heroPosition[0].y )+1 
        })
        if(hasEatenFood())
        {
        heroPosition.unshift({
            x : (heroPosition[0].x),
            y : (heroPosition[0].y )+1                 
        });   
        }
        heroPosition.pop();
        drawSnake();
        gameEnd()
    }; 

 }

 function hasEatenFood()
 {
     // check if head position and food position are same
     if(heroPosition[0].x==food[0] && heroPosition[0].y==food[1])
     { 
        generate_food()
        fruit++
        //to inrease the speed of snake
        if(fruit%3==0)
        {
          speed=speed+50
        }  
        // Display score on screen
        score += 5;
        document.getElementById('score').innerHTML = score;
        return true
     }
      return false
 }



 function gameEnd()
   {
        //check if snake head touches its tail
        for (let i = 3; i < heroPosition.length-1; i++) 
        {
            if (heroPosition[i].x === heroPosition[0].x && heroPosition[i].y === heroPosition[0].y)
            {
                alert("GAME OVER!!")
                Location.reload()
            } 
        }
        //check if snake head collides with any wall
        const LeftWall = heroPosition[0].x < 0;
        const RightWall = heroPosition[0].x > 19;
        const TopWall = heroPosition[0].y < 0;
        const BottomWall = heroPosition[0].y > 29;
        if(LeftWall || RightWall || TopWall || BottomWall)
        {
                alert("Hit wall..GAME OVER!")
                Location.reload()    
        }
   }


function drawWorld() 
 {
     
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground(ctx);
    moveSnake(ctx)
    drawSnake();
    drawFood(ctx)
  }

let lastAnimationTime;
    const step = (time) => {
        if (!lastAnimationTime) {
            lastAnimationTime = time;
        } 
        if (time - lastAnimationTime > 600-speed ) 
        {
            lastAnimationTime = time;
            drawWorld(); 
        }
        window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);

});


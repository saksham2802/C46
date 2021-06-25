class Game {
          constructor(){
        
          }
        
          getState(){
            var gameStateRef  = database.ref('gameState');
            gameStateRef.on("value",function(data){
               gameState = data.val();
            })
        
          }
        
          update(state){
            database.ref('/').update({
              gameState: state
            });
          }
        
          async start(){
            if(gameState === 0){
              player = new Player();
              var playerCountRef = await database.ref('playerCount').once("value");
              if(playerCountRef.exists()){
                playerCount = playerCountRef.val();
                player.getCount();
              }
              form = new Form()
              form.display();
            }
        
            Bird1 = createSprite(200,100);
           // Bird1.addImage("Bird1",Bird1_img);
            Bird2 = createSprite(200,300);
            //Bird2.addImage("Bird2",Bird2_img);
            Bird3 = createSprite(200,500);
            //Bird3.addImage("Bird3",Bird3_img);
            Bird4 = createSprite(200,700);
            //Bird4.addImage("Bird4",Bird4_img);
            Birds = [Bird1, Bird2, Bird3, Bird4];
          }
        
          play(){
            form.hide();
        
            Player.getPlayerInfo();
            
            if(allPlayers !== undefined){
              //var display_position = 100;
              //image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
        
              //index of the array
              var index =0;
        
              //x and y position of the cars
              var y =200;
              var x;
        
              for(var plr in allPlayers){
                //add 1 to the index for every loop
                index = index + 1 ;
                y = 200 + (index * 200) + allPlayers[plr].yPos;
                x = displayWidth - allPlayers[plr].distance ;
                //position the cars a little away from each other in x direction
               // x = x + 200;
                //use data form the database to display the cars in y direction
              // y = displayHeight - allPlayers[plr].distance;
                Birds[index-1].x = x;
                Birds[index-1].y = y;
                textAlign(CENTER);
                textSize(20);
                text(allPlayers[plr].name, Birds[index - 1].x, Birds[index - 1].y + 75);
                if (index === player.index){
                  Birds[index - 1].shapeColor = "red";
                  camera.position.y = displayHeight/2;
                  camera.position.x = Birds[index-1].y
                }
               
              }
        
            }
        
            
            if(player.distance < 2150){
              if(keyIsDown(38) && player.index !== null){
                  yVel += 0.9;
                  if(keyIsDown(37)){
                      xVel -= 0.2;
                  }
                  if(keyIsDown(39)){
                      xVel += 0.2;
                  }
              }else if(keyIsDown(38) && yVel > 0 && player.index !== null){
                  yVel -= 0.1;
                  xVel *= 0.9;
              }else{
                  yVel *= 0.985;
                  xVel *= 0.985;
              }
            }
        
          //move the car
          player.distance += yVel;
          yVel *= 0.98;
          player.xPos += xVel;
          xVel *= 0.985;
          player.update();
          //display sprites
          drawSprites();
        }
           
      
        }

var dog
var happyDog
var database
var foodStock
var foodS
var fedTime,lastFed,feed,addFood,foodObj
function preload()
{
 dogImage= loadImage("images/dogImg.png")
 happydogImage = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  foodObj = new food()
  database = firebase.database();
  dog = createSprite(250,250);

  dog.addImage(dogImage);
  dog.scale = 0.15;
  
  foodStock = database.ref('Food');
  foodStock.on('value', readStock);
  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(Feeddog);

  addFood=createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
  background(46,139,87)
  drawSprites();
  
  fedTime=database.ref('FeedTime'); 
  fedTime.on("value",function(data){ 
    lastFed=data.val(); });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("LastFeed :" + lastfeed%12 +"PM" +350,30);
  }else if(lastFeed==0){
    text("LastFeed : 12AM ",350,30)
  }else{
    
    text("LastFeed :" +lastFeed%12 + lastFeed + "AM",350,30)
  }
}

function readStock(data) {

  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function feedDog(){

  dog.addImage(happydog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){

  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')
canvas.style.border = '2px solid black'
let intervalID = 0
let score = 0

//Position where the frame will be drawn
let x=20;
let y=60; 
let zomX;
let zomY;

let spriteWidth = 68; 
let spriteHeight = 30; 

//Coordinate of Sprite sheet from where we want to extract the image
let srcX; 
let srcY;
let srcZomX;
let srcZomY;

let row = 1; 
let frameCount = 3; 

//Width of individual frame

let width = spriteWidth / frameCount; 
let height = spriteHeight / row; 
curFrame = 0;

let curZomFrame = 0;

//For Clouds

let clouds = [{x:canvas.width +5 , y: 8}]
let clouds1 = [{x:canvas.width + 10, y: 10}]
let cloudDecrement = 5;

// Creating Images

let charecter = document.createElement('img')
charecter.src = './images/char.png'  

let backImg = document.createElement('img')
backImg.src = './images/blue.png'

let foreImg = document.createElement('img')
foreImg.src = './images/fg.PNG'

let girlImg = document.createElement('img')
girlImg.src = './images/rab.png'

let zombieImage = document.createElement('img')
zombieImage.src = './images/zombie.png'

let cloudImg = document.createElement('img')
cloudImg.src = './images/clouds2.png'

let cloudImg1 = document.createElement('img')
cloudImg1.src = './images/clouds3.png'

let gear = document.createElement('img')
gear.src = './images/gear.png'

// Variables For Rabbits

let zombieArray = [{x:canvas.width+215, y:60}];
let zombieDecrement = 10;
let girlArray = [{x: canvas.width+75, y: 60}]

// Functions for the character / player  

let gearX = 35;
let gearY = 75;
// let gearArray = [{x:40 , y:65 }]
let gearIncrement = 20;
let showBullet = false;
  
function drawGear() {
    if (showBullet) {
        ctx.drawImage(gear, gearX, gearY);
        gearX += gearIncrement 
        console.log(gearX);
        
        if(gearX == 315) {
            clearGear()
        }
    }
}

function clearGear() {
    showBullet = false
    gearX = 35
}

function shootGear() {
    canvas.addEventListener('click', event => {
        showBullet = true       
    });
}


function updateFrame(){
    curFrame++
    curFrame = curFrame % frameCount; 
    srcX = curFrame * width; 
    srcY = 0;
    ctx.clearRect(x,y,width,height);
}

function updateZombFrame() {
    curZomFrame++
    curZomFrame = curZomFrame % frameCount;
    srcZomX = curZomFrame * width;
    srcZomY = 0;
    ctx.clearRect(zomX, zomY, width, height)
}
    
function drawPlayer(){
    updateFrame();
    drawGear()
    ctx.drawImage(charecter,srcX,srcY,width,height,x , y ,width,height);
}

function clearZombie(ind) {
    zombieArray.splice(ind - 2, 1)
    // zombieArray.push({
    //     x: canvas.width + 5,
    //     y: 60
    // })
}

function drawZombie() {
    for(let i = 0; i < zombieArray.length; i++) {
        updateZombFrame()
        ctx.drawImage(zombieImage, srcZomX, srcZomY, width, height, zombieArray[i].x, zombieArray[i].y, width, height)
        zombieArray[i].x -= zombieDecrement;
        //console.log(zombieArray[i].x);
        if (zombieArray[i].x == 335) {        
            zombieArray.push({
                x: canvas.width + 285,
                y: 60
            })
        }
        console.log(zombieArray[i].x, gearX);
        if (zombieArray[i].x <= gearX) {
            clearGear();
            
            clearZombie(i)
        }
    }
}

// Functions for Clouds

function newCloud() {
    for(let i=0; i< clouds.length; i++) {
          
        ctx.drawImage(cloudImg, clouds[i].x, clouds[i].y)
        
        // make the cloud move towards the left on the x axis
        clouds[i].x -= cloudDecrement
        // check if a cloud has reached a certain position
        if (clouds[i].x == 50) {

            //add a new cloud
            clouds.push({
                x: canvas.width+20,
                y: 8
            })
        }
} 
}

function newCloud1() {
    for(let j=0; j< clouds1.length; j++) {
        ctx.drawImage(cloudImg1, clouds1[j].x, clouds1[j].y)
        // make the cloud move towards the left on the x axis
        clouds1[j].x -= 10
        // check if a cloud has reached a certain position
        if (clouds1[j].x == 60) {

            let randomCloud = Math.floor(Math.random() *5 )         

            if(randomCloud < 3) {
                //add a new cloud
                clouds1.push({
                x: canvas.width+20,
                y: 15
            })
            } else {
                clouds1.push({
                    x: canvas.width+40,
                    y: 10
                }) 
            }
        } 
    }
}


function main(){
    ctx.drawImage(backImg, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(foreImg, 0, 90, canvas.width, canvas.height/3)
    drawPlayer();
    newCloud()
    newCloud1()
    drawZombie()
    shootGear()
} 

//Interval for game progress

// intervalID = setInterval(() => {
//    requestAnimationFrame(main)
// }, 100)

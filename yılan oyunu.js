document.addEventListener('DOMContentLoaded',()=>{
const boundary = document.querySelectorAll('.grid div')
const scoreD = document.querySelector('span')
const startBtn = document.querySelector('.start')

const width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSneak = [2,1,0]
let direction = 1
let score = 0;
let speed = 0.9
let intervalTime = 0
let interval = 0

// Oyun kontrol tuşları 
function control(e){
boundary[currentIndex].classList.remove('sneak')

if(e.keyCode === 68){
    direction = 1
}else if(e.keyCode === 87){
    direction = -width
}else if(e.keyCode === 65){
    direction = -1
}else if(e.keyCode === 83){
    direction = +width
}
}

// Oyuna başlama 
function startGame(){
    currentSneak.forEach(index => boundary[index].classList.remove('sneak'))
    boundary[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0;
    randomApple()
    direction = 1
    scoreD.innerText = score
    intervalTime = 1000
    currentSneak = [2,1,0]
    currentIndex = 0
    currentSneak.forEach(index => boundary[index].classList.add('sneak'))
    interval = setInterval(showResult,intervalTime)
}

    // Elmaları rastgele sınırlar içerisinde dağıt
 function randomApple(){
     do{
         appleIndex = Math.floor(Math.random()*boundary.length)

     }while(boundary[appleIndex].classList.contains('sneak'))
     boundary[appleIndex].classList.add('apple')
 }


 function showResult(){
     if(
       (currentSneak[0] + width >=(width*width) && direction === width) ||
       (currentSneak[0] % width === width-1 && direction === 1) ||
       (currentSneak[0] % width === 0 && direction === -1) ||
       (currentSneak[0] - width < 0 && direction === -width) ||
      boundary [currentSneak[0] + direction].classList.contains('sneak')

     ){
         return clearInterval(interval)
     }      

const tail = currentSneak.pop()
boundary[tail].classList.remove('sneak')
currentSneak.unshift(currentSneak[0] + direction)

if(boundary[currentSneak[0]].classList.contains('apple')){
    boundary[currentSneak[0]].classList.remove('apple')
    boundary[tail].classList.add('sneak')
    currentSneak.push(tail)
    randomApple()
    score++
    scoreD.textContent = score
    clearInterval(interval)
    intervalTime = intervalTime *speed
    interval = setInterval(showResult,intervalTime)
}
boundary[currentSneak[0]].classList.add('sneak')
 }

document.addEventListener('keyup',control)
startBtn.addEventListener('click',startGame)
})
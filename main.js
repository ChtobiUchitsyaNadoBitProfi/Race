const score = document.querySelector('.score'),
    start = document.querySelector('.start'),
    gameArea = document.querySelector('.gameArea'),
    car = document.createElement('div');
    car.classList.add('car');

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
	ArrowUp: false,  
	ArrowDown: false,
	ArrowRight: false, 
	ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 5,
  traffic: 7
};

function getQuantityElementElements(heightElement){
  return document.documentElement.clientHeight / heightElement + 1;
}

function startGame() {
  let x;
  start.classList.add('hide');
  gameArea.classList.remove('hide');

  for (let i = 0; i < getQuantityElementElements(100); i++){
    const line = document.createElement('div');
    line.classList.add('line');
    line.style.top = (i * 75) +'px';
    line.y = i * 100;
    gameArea.appendChild(line);
  }
  
  for (let i = 0; i < getQuantityElementElements(80 * setting.traffic); i++){
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.y += Math.random() * 2;
    enemy.y = -50 * setting.traffic * (i + 1);
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - car.clientWidth)) + 'px';
    enemy.style.top = enemy.y + 'px';
    x = Math.floor(Math.random() * Math.floor(10));
    switch(x) {
      case 1:  // if (x === 'value1')
        enemy.style.background = 'transparent url("red1.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 2:  // if (x === 'value2')
        enemy.style.background = 'transparent url("blue1.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 3:  // if (x === 'value1')
        enemy.style.background = 'transparent url("green1.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 4:  // if (x === 'value2')
        enemy.style.background = 'transparent url("grey4.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 5:  // if (x === 'value1')
        enemy.style.background = 'transparent url("purple3.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 6:  // if (x === 'value2')
        enemy.style.background = 'transparent url("blue4.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 7:  // if (x === 'value1')
        enemy.style.background = 'transparent url("police.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
      case 8:  // if (x === 'value2')
        enemy.style.background = 'transparent url("yellow3.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;  
      default:
        enemy.style.background = 'transparent url("red2.png") center / cover no-repeat';
        gameArea.appendChild(enemy);
        break;
    } 
  }

  gameArea.appendChild(car);
  setting.start = true;
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
}

function playGame() {
  if (setting.start) {
    moveRoad();
    moveEnemy();
    if (keys.ArrowLeft && setting.x > 0){
      setting.x -= setting.speed;
      car.style.transform = 'rotate(-10deg)';
    }
    if (keys.ArrowLeft === false){
      car.style.transform = 'rotate(0deg)';
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)){
      setting.x += setting.speed;
      car.style.transform = 'rotate(10deg)';
    }
    if(keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
      setting.y += setting.speed;
    }
    
    car.style.left = setting.x + 'px';
    car.style.top = setting.y + 'px';

    requestAnimationFrame(playGame);
  }
}
function moveEnemy(){
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item){
    item.y += (setting.speed / 2) + 1;
    item.style.top = item.y + 'px';
    if(item.y >= document.documentElement.clientHeight){
      item.y = -100 * setting.traffic;
      item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - car.clientWidth)) + 'px';
    }
  });
}


function startRun(event) {
  event.preventDefault();
  keys[event.key] = true;
}

function stopRun(event) {
  event.preventDefault();
  keys[event.key] = false;
}
   
function moveRoad(){
  let lines = document.querySelectorAll('.line');
  lines.forEach(function(line){
    line.y += setting.speed;
    line.style.top = line.y + 'px';
    if(line.y >= document.documentElement.clientHeight){
      line.y = -100;
    }
  });
}
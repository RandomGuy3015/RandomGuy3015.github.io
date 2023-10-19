let actors = []; // location and vector of every point 
let clicked = false;
let down = false;
let width = 1000;
let height = 1000;
let actor_size = 5;
let actor_amount = width * 5;
let speed = 1;

function setup() {
  createCanvas(width, height);
  background(0);
  noStroke();
  
  for (let i = 0; i < actor_amount; i++) {
    let actor = [0, 0, 0, 0, false];
    actor[0] = Math.floor(random(0, width));
    actor[1] = Math.floor(random(0, height));
    actors.push(actor);
  }
}

function draw() {
  background(0);

  if (!clicked) {
    for (let actor of actors) {
      fill(colorize((actor[2] + actor[3]) / 100));
      square(actor[0], actor[1], actor_size);
      move(actor);
      mouse_move(actor);
    }
  } else {
    for (let actor of actors) {
      fill(colorize((actor[2] + actor[3]) / 100));
      square(actor[0], actor[1], actor_size);
      let x = actor[0] - Math.floor(random(width / 4, 3 * width / 4));
      let y = actor[1] - Math.floor(random(height / 4, 3 * height / 4));
      
      if (x < 100 && y < 100) {
        actor[4] = false;
      }
      
      actor[0] -= x / 20;
      actor[1] -= y / 20;
      
      mouse_move(actor);
    }
  }

  if (mouseIsPressed && !down) {
    clicked = !clicked;
    down = true;
  } else {
    down = false;
  }
}

function mouse_move(actor) {
  let dis = tria(actor);
  
  if (dis < (width * height) / 60) {
    move(actor);
    let disNew = tria(actor);
    
    if (disNew < dis) {
      let factor = Math.floor(100 / (dis * 0.0002));
      if (actor[2] > 0) {
        actor[2] -= factor;
      } else {
        actor[2] += factor;
      }
      if (actor[3] > 0) {
        actor[3] -= factor;
      } else {
        actor[3] += factor;
      }
      actor[4] = true;
    }
  }
  
  if (!actor[4]) {
    if (actor[0] > (3 * width) / 4) {
      actor[0] = width / 4;
      actor[2] *= 0.5;
      actor[3] *= 0.5;
    }
    
    if (actor[0] < width / 4) {
      actor[0] = (3 * width) / 4;
      actor[2] *= 0.5;
      actor[3] *= 0.5;
    }
    
    if (actor[1] > (3 * height) / 4) {
      actor[1] = height / 4;
      actor[2] *= 0.5;
      actor[3] *= 0.5;
    }
    
    if (actor[1] < height / 4) {
      actor[1] = (3 * height) / 4;
      actor[2] *= 0.5;
      actor[3] *= 0.5;
    }
  }
}

function colorize(t) {
  let a = [0.5, 0.5, 0.5];
  let b = [0.5, 0.5, 0.5];
  let c = [1.0, 1.0, 1.0];
  let d = [0.263, 0.416, 0.557];
  
  let c2 = [c[0] * t + d[0], c[1] * t + d[1], c[2] * t + d[2]];
  let b2 = [b[0] * cos(c2[0] * TWO_PI), b[1] * cos(c2[1] * TWO_PI), b[2] * cos(c2[2] * TWO_PI)];
  
  return color(255 * (a[0] + b2[0]), 255 * (a[1] + b2[1]), 255 * (a[2] + b2[2]));
}

function tria(actor) {
  let dist = (actor[0] - mouseX) ** 2 + (actor[1] - mouseY) ** 2;
  return dist;
}

function move(actor) {
  let x = Math.floor(random(-speed, speed + 1)) + actor[2];
  let y = Math.floor(random(-speed, speed + 1)) + actor[3];
  actor[0] += x;
  actor[1] += y;
  actor[2] = x;
  actor[3] = y;
}

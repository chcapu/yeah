let myImage;
let mySong;
let proportion;
let pSize = 5;

let ns = 500;
let p = [];

let delay = 3;


function preload(){
  myImage = loadImage("./assets/horatio.jpg");
  mySong = loadSound("./assets/track.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight)
  background("OrangeRed");

  //resizing the image
  proportion = max(width / myImage.width, height / myImage.height);
	myImage.resize (myImage.width * proportion, myImage.height * proportion);

	for(let i = 0; i <2000; i++)p[i] = new Particle();

  if (!mySong.isPlaying()) {
    mySong.play();
  }

}

function draw() {
	for(const i of p) {
		i.update();
		i.show();
	}

  let start = millis();
  if (millis() > start + delay) {
    console.log("now show text");
  }
}

class Particle {
	constructor() {
		this.init();
		this.sp = 200/ns;
		let length = random(10,30);
		this.maxFc = length / this.sp;
    this.pDiam = pSize * (1 + noise(this.x/ns, this.y/ns) * 0.5);
	}

	init() {
		this.x = random(width);
		this.y = random(height);
		this.fc = 0;
    let c = myImage.get(this.x, this.y); //get pixel color
		this.col = color(c);
		this.col.setAlpha(30); //set color transparency
	}

	update(){
		let angle = noise(this.x / ns, this.y / ns) * TAU * ns;
		let direction = createVector(cos(angle), sin(angle));
		this.x += direction.x * this.sp;
		this.y += direction.y * this.sp;
		this.fc ++;
		if(this.fc > this.maxFc)this.init();
	}

	show(){
		noStroke();
		fill(this.col);
    circle(this.x, this.y, this.pDiam);
	}
}

function mouseClicked() {
  if (mySong.isPlaying()) {
    mySong.stop();
  } else {
    mySong.play();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  proportion = max(width / myImage.width, height / myImage.height);
  myImage.resize(myImage.width * proportion, myImage.height * proportion);
}

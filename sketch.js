const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, fruit, ground;
var fruit_con;

var bg_img;
var food;
var rabbit;

var button;
var bunny;

var blink;
var eat;
var sad;
var cutting;
var comer;
var cortarlacuerda;
var fondosonido;
var llorando;
var aire;
var rope2;
var rope3;
var link2;
var link3;

function preload() {
    bg_img = loadImage('background.png');
    food = loadImage('melon.png');
    rabbit = loadImage('Rabbit-01.png');;
    blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
    eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
    sad = loadAnimation("sad_2.png", "sad_3.png");
    fondosonido = loadSound("sound1.mp3");
    cortarlacuerda = loadSound("rope_cut.mp3");
    comer = loadSound("eating_sound.mp3");
    llorando = loadSound("sad.wav");
    aire = loadSound("air.wav");
    blink.playing = true;
    eat.playing = true;
    eat.looping = false;
    sad.playing = false;
    sad.looping = false;
    fondosonido.playing = true;
}

function setup() {
    createCanvas(500, 700);
    frameRate(80);
    fondosonido.play();
    fondosonido.setVolume(.5);


    engine = Engine.create();
    world = engine.world;

    button = createImg('cut_btn.png');
    button.position(20, 30);
    button.size(50, 50);
    button.mouseClicked(drop);

    blower = createImg('balloon.png');
    blower.position(10, 250);
    blower.size(150, 100);
    blower.mouseClicked(airblow);

    rope = new Rope(8, { x: 40, y: 30 });
    ground = new Ground(200, 690, 600, 20);
    blink.frameDelay = 20; //mientras más pequeño el valor más rapida la animación,entre más grande el valor la animación es más lenta.
    eat.frameDelay = 30;
    sad.frameDelay = 25;

    rope2 = new Rope(7, { x: 370, y: 40 });
    rope3 = new Rope(4, { x: 400, y: 225 });

    bunny = createSprite(100, 620, 100, 100);
    bunny.addImage(rabbit);
    bunny.scale = 0.2;
    bunny.addAnimation("blinking", blink);
    bunny.addAnimation("eating", eat);
    bunny.addAnimation("llorar", sad);
    bunny.changeAnimation("blinking");
    fruit = Bodies.circle(300, 300, 20);
    Matter.Composite.add(rope.body, fruit);

    fruit_con = new Link(rope, fruit);
    link2 = new Link(rope2, fruit);
    link3 = new Link(rope3, fruit);

    mutebtn = createImg('mute.png');
    mutebtn.position(450, 20);
    mutebtn.size(50, 50);
    mutebtn.mouseClicked(mute);

    button2 = createImg('cut_btn.png');
    button2.position(330, 35);
    button2.size(60, 60);
    button2.mouseClicked(drop2);

    button3 = createImg('cut_btn.png');
    button3.position(360, 200);
    button3.size(60, 60);
    button3.mouseClicked(drop3);

    rectMode(CENTER);
    ellipseMode(RADIUS);
    imageMode(CENTER);

}

function draw() {
    background(51);
    image(bg_img, width / 2, height / 2, 490, 690);
    if (fruit != null) {
        image(food, fruit.position.x, fruit.position.y, 70, 70);
    }

    rope.show();
    rope2.show();
    rope3.show();
    Engine.update(engine);
    ground.show();
    if (collide(fruit, bunny) == true) {
        bunny.changeAnimation("eating");
        comer.play();
    }

    if (collide(fruit, ground.body) == true) {
        bunny.changeAnimation("llorar");
        llorando.play();
    }
    drawSprites();
}

function drop() {
    rope.break();
    fruit_con.dettach();
    fruit_con = null;
    cortarlacuerda.play();
}

function drop2() {
    rope2.break();
    link2.dettach();
    link2 = null;
    cortarlacuerda.play();
}

function drop3() {
    rope3.break();
    link3.dettach();
    link3 = null;
    cortarlacuerda.play();
}


function collide(body, sprite) {
    if (body != null) {
        var dis = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
        if (dis <= 80) {
            World.remove(engine.world, fruit);
            fruit = null;
            return true;
        }
    }
}

function airblow() {
    Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 }); //ingresar nueva imagen de ventilador y sonido del aire
    aire.play();
    aire.setVolume(.5);
}

function mute() {
    if (fondosonido.isPlaying()) {
        fondosonido.stop();
    } else {
        fondosonido.play();
        fondosonido.setVolume(.5);
    }
}
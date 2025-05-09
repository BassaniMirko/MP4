let immagini = [];
let il_tuo_video;
let videoAspectRatio = 1; // proporzione video
let posX = 0;      // posizione X delle immagini
let posY = 2;      // posizione Y delle immagini
let posZ = 0;      // posizione Z delle immagini
let rotazione = 45.5;  // rotazione delle immagini

function preload() {
  // Precarica le immagini
  for (let i = 0; i < 384; i++) {
    immagini[i] = loadImage("skeleton/skeleton_" + nf(i, 3) + ".jpg");
  }
  
  // Precarica il video
  il_tuo_video = createVideo('il_tuo_video.mp4', videoLoaded);
  il_tuo_video.hide();
}

// Callback quando il video è caricato
function videoLoaded() {
  il_tuo_video.loop();
  il_tuo_video.volume(0);
  videoAspectRatio = il_tuo_video.width / il_tuo_video.height;
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(0);

  const distanza = mouseY * 0.009;
  imageMode(CENTER);

  // --- 1. Disegna il video ---
  push();
    resetMatrix();
    translate(0, 0, -500);
    textureMode(NORMAL);
    texture(il_tuo_video);
    noStroke();
    let videoWidth = windowWidth * 0.7;
    let videoHeight = videoWidth / videoAspectRatio;
    plane(videoWidth, videoHeight);
  pop();

  // --- 2. Ripristina spazio 3D per immagini ---
  resetMatrix();
  translate(posX, posY, posZ);  // usa le variabili per la posizione
  rotateY(rotazione);           // usa la variabile per la rotazione
  translate(0, 0, immagini.length / 2 * distanza);

  // --- 3. Disegna immagini inclinate ---
  for (let i = 0; i < immagini.length; i++) {
      push();
      translate(0, 0, -i * distanza);
      rotateY(radians(65));
      blendMode(DIFFERENCE);
      image(immagini[(i + frameCount) % immagini.length], 0, 0);
      blendMode(BLEND);
      pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Aggiungi questi controlli con la tastiera
function keyPressed() {
  // Movimento
  if (keyCode === LEFT_ARROW) posX -= 10;
  if (keyCode === RIGHT_ARROW) posX += 10;
  if (keyCode === UP_ARROW) posY -= 10;
  if (keyCode === DOWN_ARROW) posY += 10;
  
  // Controllo rotazione
  if (key === 'a') rotazione -= 0.1;
  if (key === 'd') rotazione += 0.1;
  
  // Reset posizione
  if (key === 'r') {
    posX = 0;
    posY = 0;
    posZ = 0;
    rotazione = 0;
  }
}

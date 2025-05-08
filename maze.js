let immagini = [];
let il_tuo_video;
let videoAspectRatio = 1; // proporzione video

function preload() {
    for (let i = 0; i < 384; i++) {
        immagini[i] = loadImage("skeleton/skeleton_" + nf(i, 3) + ".jpg");
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    il_tuo_video = createVideo('il_tuo_video.mp4');
    il_tuo_video.hide();
    il_tuo_video.loop();
    il_tuo_video.volume(0);

    il_tuo_video.onloadedmetadata = function() {
        videoAspectRatio = il_tuo_video.width / il_tuo_video.height;
    }
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

    let videoWidth = 900;
    let videoHeight = videoWidth / videoAspectRatio;
    plane(videoWidth, videoHeight);
    pop();
    // ----------------------------

    // --- 2. Ripristina spazio 3D per immagini ---
    resetMatrix();
    translate(0, 0, 0);
    rotateY(frameCount * 0.008); // <<< rotazione automatica Y
    rotateX(frameCount * 0.002); // <<< rotazione automatica X
    translate(0, 0, immagini.length / 2 * distanza);
    // --------------------------------------------

    // --- 3. Disegna immagini inclinate ---
    for (let i = 0; i < immagini.length; i++) {
        push();
        translate(0, 0, -i * distanza);
        rotateX(radians(0)); // inclinazione 45°
        blendMode(DIFFERENCE);
        image(immagini[(i + frameCount) % immagini.length], 0, 0);
        blendMode(BLEND);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

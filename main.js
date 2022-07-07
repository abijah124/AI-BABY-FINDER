sound = "beep-warning-6387.mp3";
objects = [];
status = "";
function preload(){
sound = loadSound("beep-warning-6387.mp3");
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd',modeloaded);
document.getElementById("status").innerHTML = "Status :  Detecting object ";
    }
    function modeloaded(){
        console.log("Model loaded");
        status = true;
    }
    function gotresults(error,results){
    if(error){
    console.log(error);
    }
    console.log(results);
    objects = results;
    }
    function draw(){
        image(video,0,0,480,380);
        if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotresults);
        for (i = 0; i < objects.length; i++){
        document.getElementById("status").innerHTML = "Status : object Detected";
        fill (r,g,b);
        floor(objects[i].confidence * 100); 
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
        noFill();
         stroke(r,g,b);
         rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if(objects[i].label == "person"){
        document.getElementById("number_of_objects").innerHTML = "Baby found";
        console.log("stop");
        sound.stop();
         }
    else{
        document.getElementById("number_of_objects").innerHTML = "Baby not found";
        console.log("play");
        sound.play();
    }
    }
 if(objects.length == 0){
    document.getElementById("number_of_objects").innerHTML = "Baby not found";
    console.log("play");
    sound.play();
 }
        }
}
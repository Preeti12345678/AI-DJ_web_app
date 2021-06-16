sound="";
wristleftX="";
wristleftY="";
wristrightX="";
wristrightY="";
function preload(){
    sound=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.position(400,250);
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,"modelLoaded");
    poseNet.on('pose', gotposes);
}
function draw(){
  image(video,0,0,600,500);
  fill("red");
  stroke("red");
  circle(wristleftX,wristleftY,20);
  leftWristX=Number(wristleftX);
  remove_decimals=floor(leftWristX);
  volume=remove_decimals/500;
  document.getElementById("volume_result").innerHTML="Volume= "+volume;
  sound.setVolume(volume);
}
function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
function modelLoaded(){
    console.log("Model Loaded");
}
function gotposes(results){
    if(results.length>0){
       console.log(results);
       wristleftX=results[0].pose.leftWrist.x;
       wristleftY=results[0].pose.leftWrist.y;
       console.log("Left wrist x= "+wristleftX+"Left wrist y= "+wristleftY);
       wristrightX=results[0].pose.rightWrist.x;
       wristrightY=results[0].pose.rightWrist.y;
       console.log("Right wrist x= "+wristrightX+"Right wrist y= "+wristrightY);
    }
}
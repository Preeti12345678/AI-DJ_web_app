sound="";
wristleftX="";
wristleftY="";
wristrightX="";
wristrightY="";
score_leftWrist=0;
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
       score_leftWrist=results[0].pose.keypoints[9].score;
       console.log("Score= "+score_leftWrist);
       wristleftX=results[0].pose.leftWrist.x;
       wristleftY=results[0].pose.leftWrist.y;
       console.log("Left wrist x= "+wristleftX+"Left wrist y= "+wristleftY);
       wristrightX=results[0].pose.rightWrist.x;
       wristrightY=results[0].pose.rightWrist.y;
       console.log("Right wrist x= "+wristrightX+"Right wrist y= "+wristrightY);
       
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    circle(wristrightX,wristrightY,20);

    if(wristrightY>0 && wristrightY<=100){
        document.getElementById("speed_result").innerHTML="Speed=0.5x";
        sound.rate(0.5);
    }
    else if(wristrightY>100 && wristrightY<=200){
        document.getElementById("speed_result").innerHTML="Speed=1x";
        sound.rate(1);
    }
    else if(wristrightY>200 && wristrightY<=300){
        document.getElementById("speed_result").innerHTML="Speed=1.5x";
        sound.rate(1.5);
    }
    else if(wristrightY>300 && wristrightY<=400){
        document.getElementById("speed_result").innerHTML="Speed=2x";
        sound.rate(2);
    }
    else if(wristrightY>400 && wristrightY<=500){
        document.getElementById("speed_result").innerHTML="Speed=2.5x";
        sound.rate(2.5);
    }
    if(score_leftWrist>0.2){
        circle(wristleftX,wristleftY,20);
        leftWristX=Number(wristleftX);
        remove_decimals=floor(leftWristX);
        volume=remove_decimals/500;
        document.getElementById("volume_result").innerHTML="Volume= "+volume;
        sound.setVolume(volume);
        }

  }
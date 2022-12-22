objects =[];
status = "";
var speech = Window.speechSynthesis;
function setup(){
    canvas= createCanvas(500, 400);
    canvas.position(500, 300);
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_name =  document.getElementById("object_name").value;
   
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
  
}

function gotResults(error, results) {
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
    image(video, 0, 0, 500, 400);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for( i = 0; i < objects.length; i++ ){
            document.getElementById("status").innerHTML = "Status : Detecting object";

            if(objects[i].label == object_name){
              fill("#00FF00");
              percent = floor(objects[i].confidence * 100);
              text(objects[i].label + " " + percent + "%", objects[i].x + 2, objects[i].y-15);
              noFill();
              stroke("#00FF00");
              rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
  
              document.getElementById("status").innerHTML = "Status : Object Detected";
              video.stop();
              objectDetector.detect(gotResults);
              document.getElementById("number_of_objects").innerHTML =  object_name + " Detected";
             utterthis = new  SpeechSynthesisUtterance(object_name + " found");
             speech.speak(utterthis);
            }
            else{
              document.getElementById("number_of_objects").innerHTML = object_name + " not detected";
            }
        }
        

       
    }

    
 }
  

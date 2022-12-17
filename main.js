objects =[];
status = "";

function setup(){
    canvas= createCanvas(500, 400);
    canvas.position(500, 300);
    video = createCapture(VIDEO);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Onjects";
  object_name =  document.getElementById("object_name").value;
   
}

function modelLoaded() {
    console.log("model Loaded");
    status = true;
  
}

function draw() {
    image(video, 0, 0, 500, 400);

  }
  
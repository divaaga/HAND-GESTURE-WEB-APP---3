prediction1 = "";

Webcam.set({
    width : 350,
    height : 350,
    image_format : "png",
    png_quality : 90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function takeSnap() {
    Webcam.snap(function(snap){
        document.getElementById("result").innerHTML = "<img id = 'captured_img' src = '"+ snap +"'/>";
    });
}


function speak() {
    var synth = window.speechSynthesis;
    speak_data = "The hand gesture is " + prediction;
    var utter_this = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utter_this);
}

console.log("Ml5 version : " + ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Is_L0j3tA/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!");
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        prediction = results[0].label;

        if(results[0].label == "Peace") {
            document.getElementById("update_gesture").innerHTML = "&#9996;";
        }
        if(results[0].label == "Thumbs up/ Good/ Awsome") {
            document.getElementById("update_gesture").innerHTML = "&#128075;";
        }
        if(results[0].label == "Hello/Bye") {
            document.getElementById("update_gesture").innerHTML = "&#128077;";
        }
        speak();
    }
}

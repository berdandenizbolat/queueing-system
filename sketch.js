var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

var x = "black",
    y = 2;

var eye1 = 0,
    eye2 = 0,
    mouth = 0,
    nose = 0,
    componentSelected = false;

var componentSelection;

class Square{
    constructor(x1, y1, x2, y2){
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    draw(){
        ctx.beginPath()
        ctx.rect(this.x1, this.y1, this.x2 - this.x1, this.y2 - this.y1)
        ctx.stroke();
    }
}


var leftEyeSlider, rightEyeSlider, mouthSlider, noseSlider, backgroundSlider, w, h;

function init() {
    canvas = document.getElementById('can');
    ctx = canvas.getContext("2d");
    w = canvas.width;
    h =  canvas.height;

    saveButton = document.getElementById('btn');
    clearButton = document.getElementById('clr');
    uploadButton = document.getElementById('upl');
    uploadButton1 = document.getElementById('upl1');

    saveButton.style.width = (canvas.width / 3.8).toString() +"px"
    clearButton.style.width = (canvas.width / 3.8).toString() +"px"
    uploadButton.style.width = (canvas.width / 3.8).toString() +"px"

    canvas.style.left = "65px"
    canvas.style.top = "90px"
    saveButton.style.left = "142px"
    saveButton.style.top = "790px"
    saveButton.style.width = "130px"
    clearButton.style.left = "290px"
    clearButton.style.top = "790px"
    clearButton.style.width = "100px"
    uploadButton1.style.left = "405px"
    uploadButton1.style.top = "790px"

    leftEyeText = document.createElement("span")
    document.body.appendChild(leftEyeText)
    leftEyeText.innerHTML = "Left Eye Projection:   "
    leftEyeSlider = document.createElement("input")
    leftEyeSlider.type = "range"
    leftEyeSlider.min = "0";
    leftEyeSlider.max = "100";
    document.body.appendChild(leftEyeSlider)
    leftEyeText.style.position = "absolute"
    leftEyeText.style.top = "610px"
    leftEyeText.style.left = "160px"
    leftEyeSlider.style.top = "610px"
    leftEyeSlider.style.left = "315px"
    leftEyeSlider.style.position = "absolute"

    rightEyeText = document.createElement("span")
    document.body.appendChild(rightEyeText)
    rightEyeText.innerHTML = "Right Eye Projection:   "
    rightEyeSlider = document.createElement("input")
    rightEyeSlider.type = "range"
    rightEyeSlider.min = "0";
    rightEyeSlider.max = "100";
    document.body.appendChild(rightEyeSlider)
    rightEyeText.style.position = "absolute"
    rightEyeText.style.top = "640px"
    rightEyeText.style.left = "160px"
    rightEyeSlider.style.top = "640px"
    rightEyeSlider.style.left = "315px"
    rightEyeSlider.style.position = "absolute"


    mouthText = document.createElement("span")
    document.body.appendChild(mouthText)
    mouthText.innerHTML = "Mouth Projection:   "
    mouthSlider = document.createElement("input")
    mouthSlider.type = "range"
    mouthSlider.min = "0";
    mouthSlider.max = "100";
    document.body.appendChild(mouthSlider)
    mouthText.style.position = "absolute"
    mouthText.style.top = "670px"
    mouthText.style.left = "160px"
    mouthSlider.style.top = "670px"
    mouthSlider.style.left = "315px"
    mouthSlider.style.position = "absolute"


    noseText = document.createElement("span")
    document.body.appendChild(noseText)
    noseText.innerHTML = "Nose Projection:   "
    noseSlider = document.createElement("input")
    noseSlider.type = "range"
    noseSlider.min = "0";
    noseSlider.max = "100";
    document.body.appendChild(noseSlider)
    noseText.style.position = "absolute"
    noseText.style.top = "700px"
    noseText.style.left = "160px"
    noseSlider.style.top = "700px"
    noseSlider.style.left = "315px"
    noseSlider.style.position = "absolute"


    backgroundText = document.createElement("span")
    document.body.appendChild(backgroundText)
    backgroundText.innerHTML = "Background Projection:   "
    backgroundSlider = document.createElement("input")
    backgroundSlider.type = "range"
    backgroundSlider.min = "0";
    backgroundSlider.max = "100";
    document.body.appendChild(backgroundSlider)
    backgroundText.style.position = "absolute"
    backgroundText.style.top = "730px"
    backgroundText.style.left = "160px"
    backgroundSlider.style.top = "730px"
    backgroundSlider.style.left = "315px"
    backgroundSlider.style.position = "absolute"

    selectGender = document.createElement("select")
    selectGender.id ="selectGender"
    selectGender.name = "selectGender"
    labelGender = document.createElement("label")
    labelGender.for = "selectGender"
    labelGender.innerHTML = "Choose a gender:   "
    genderOption1 = document.createElement("option")
    genderOption1.value = "Male"
    genderOption1.innerHTML = "Male"
    genderOption2 = document.createElement("option")
    genderOption2.value = "Female"
    genderOption2.innerHTML = "Female"

    document.body.appendChild(labelGender)
    document.body.appendChild(selectGender)
    selectGender.appendChild(genderOption1)
    selectGender.appendChild(genderOption2)

    labelGender.style.position = "absolute"
    labelGender.style.top = "760px"
    labelGender.style.left = "160px"

    selectGender.style.position = "absolute"
    selectGender.style.top = "760px"
    selectGender.style.left = "350px"

    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);


    uploadButton.addEventListener('change', (event)=>{
        var img = new Image();
        img.onload = draw1;
        img.onerror = failed;
        img.src = URL.createObjectURL(event.target.files[0]);
    })

    componentSelection = document.createElement("input")
    componentSelection.type = "button"
    componentSelection.value = "Select Face Components"
    document.body.appendChild(componentSelection)
    componentSelection.style.position = "absolute"
    componentSelection.style.top = "850px"
    componentSelection.style.left = "190px"
    componentSelection.style.width = "250px"
    componentSelection.style.height = "50px"

    componentSelection.onclick = selectComponents

}

var clickEvent;

var backCanvas = document.createElement('canvas')
backCanvas.width = 500
backCanvas.height = 500
var backCtx = backCanvas.getContext('2d')
var back2Canvas = document.createElement('canvas')
back2Canvas.width = 500
back2Canvas.height = 500
var back2Ctx = back2Canvas.getContext('2d')
var drawingEnabled = true;
let text = ["LEFT EYE", "RIGHT EYE", "MOUTH", "NOSE"]
let faceComponents = [eye1, eye2, mouth, nose]
var textElement;

var index;

function selectComponents(){
    document.body.childNodes.forEach((e)=>{
        if (e.id === "textElement"){
            document.body.removeChild(e)
        }
    })
    index = 0;
    drawingEnabled = false;
    componentSelection.style.display = "none"
    textElement = document.createElement("p")
    textElement.id = "textElement"
    textElement.style.position = "absolute"
    textElement.style.left = "160px"
    textElement.style.top = "50px"
    document.body.appendChild(textElement)
    back2Ctx.drawImage(canvas, 0, 0)
    selectRectangle()
}


function selectRectangle(){
        textElement.innerHTML = "Please square the " + text[index] + " in the image below."
        canvas.addEventListener('click', (e) => {
            backCtx.drawImage(canvas, 0, 0)
            clickEvent = e
            canvas.addEventListener('mousemove', drawRectangle)
            canvas.addEventListener('click', () => {
                canvas.removeEventListener('mousemove', drawRectangle)
                drawingEnabled = true;
                index += 1
                if (index===4){
                    componentSelection.style.display = "block"
                    ctx.clearRect(0, 0, w, h)
                    ctx.drawImage(back2Canvas, 0, 0)
                    textElement.style.left = "180px"
                    textElement.innerHTML = "Face component selection is complete."
                } else {
                    selectRectangle()
                }
            }, {once: true})
        }, {once: true})
}

function drawRectangle(event){
    console.log(event)
    const square = new Square(clickEvent.offsetX, clickEvent.offsetY,  event.offsetX, event.offsetY)
    console.log("here")

    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(backCanvas, 0, 0);
    square.draw()
}

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function erase() {
    var m = confirm("Do you want to clear the sketch?");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        let totalElem = document.body.childNodes.length
        for (let i = 0; i<totalElem; i++){
            const e = document.body.childNodes[i];
            if (e.id === "imgSketch" || e.id === "pSketch" || e.id === "cSketch" || e.id === "pReal" || e.id === "imgReal"){
                document.body.removeChild(e)
                console.log("Element is removed.")
                i-=1;
                totalElem -= 1;
            }
        }
    }
    document.body.childNodes.forEach((e)=>{
        let totalElem = document.body.childNodes.length
        for (let i = 0; i<totalElem; i++){
            const e = document.body.childNodes[i];
            if (e.id === "imgSketch" || e.id === "pSketch" || e.id === "cSketch" || e.id === "pReal" || e.id === "imgReal"){
                document.body.removeChild(e)
                console.log("Element is removed.")
                i-=1;
                totalElem -= 1;
            }
        }
    })
}

function convert() {
    var canvasData = canvas.toDataURL();
    var leftEyeValue = leftEyeSlider.value
    var rightEyeValue = rightEyeSlider.value
    var mouthValue = mouthSlider.value
    var backgroundValue = backgroundSlider.value
    var noseValue = noseSlider.value
    var genderValue = selectGender.value


    let totalElem = document.body.childNodes.length
    for (let i = 0; i<totalElem; i++){
        const e = document.body.childNodes[i];
        if (e.id === "imgSketch" || e.id === "pSketch" || e.id === "cSketch" || e.id === "pReal" || e.id === "imgReal"){
            document.body.removeChild(e)
            console.log("Element is removed.")
            i-=1;
            totalElem -= 1;
        }
    }

    setTimeout(()=>{
        if (genderValue === "Male"){
            genderValue = 0;
        } else {
            genderValue = 1;
        }

        var sendData = {
            'eye1': leftEyeValue / 100,
            'eye2': rightEyeValue / 100,
            'mouth': mouthValue / 100,
            'nose': noseValue / 100,
            'b': backgroundValue / 100,
            'genderValue': genderValue,
            'canvasData': canvasData,
        }

        sendData =JSON.stringify(sendData)
        var ajax = new XMLHttpRequest();


        try {
            ajax.open("POST", "http://localhost:8081/input", false);
            ajax.onreadystatechange = function() {
                console.log("Success!")
                var img = document.createElement('img')
                img.id = "imgSketch"
                img.src = ajax.responseText
                document.body.appendChild(img)
                img.style.position = "absolute"
                img.style.left = "600px"
                img.style.top = "90px"
                sketchText = document.createElement("p")
                sketchText.id = "pSketch"
                sketchText.innerHTML = "Manifold projection of the sketch is given above."
                document.body.appendChild(sketchText)
                sketchText.style.position = "absolute"
                sketchText.style.left = "690px"
                sketchText.style.top = "590px"
                convertRealButton = document.createElement("input")
                convertRealButton.id = "cSketch"
                convertRealButton.type = "button"
                convertRealButton.value = "Convert to Realistic Image"
                convertRealButton.onclick = convertReal
                document.body.appendChild(convertRealButton)
                convertRealButton.style.position = "absolute"
                convertRealButton.style.left = "765px"
                convertRealButton.style.top = "630px"
                convertRealButton.style.height = "40px"
            }
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(sendData);
        } catch (e){
            alert("Projection server is not listening...")
        }

    }, 100)
}

function convertReal(){
    var ajax = new XMLHttpRequest();


    ajax.open("POST", "http://localhost:8081/realistic", false);
    ajax.onreadystatechange = function() {
        console.log("Success!")
        var img = document.createElement('img')
        img.id = "imgReal"
        img.src = ajax.responseText
        document.body.appendChild(img)
        img.style.position = "absolute"
        img.style.left = "1145px"
        img.style.top = "90px"
        sketchText = document.createElement("p")
        sketchText.id = "pReal"
        sketchText.innerHTML = "Realistic image obtained from the projection is given above."
        document.body.appendChild(sketchText)
        sketchText.style.position = "absolute"
        sketchText.style.left = "1220px"
        sketchText.style.top = "590px"
    }
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send();
}


function draw1() {
    ctx.drawImage(this, 0,0, 500, 500);
}

function failed() {
    console.error("The provided file couldn't be loaded as an Image media");
}


function findxy(res, e) {
    if (res === 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag && drawingEnabled) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res === 'up' || res === "out") {
        flag = false;
    }
    if (res === 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

window.onload = (()=>{
    init()
})

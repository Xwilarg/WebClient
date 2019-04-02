function onMouseDown(event) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = async function() {
        if (this.readyState === 4 && this.status === 200) {
            await canvasDraw(JSON.parse(this.responseText));
        }
    }
    http.open("POST", "http://localhost:8082", true);
    http.send(getPosition(event.offsetX) + ";" + getPosition(event.offsetY) + ";" + color);
}

function getPosition(value) {
    if (value <= 0) return 0;
    if (value >= 500) return 10;
    return value / 50;
}

function canvasDraw(colorArray) {
    let canvas = document.getElementById("canvasMain");
    canvas.addEventListener("mousedown", onMouseDown);
    let context = canvas.getContext("2d");
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let imageData = context.createImageData(50, 50);
            for (let i = 0; i < imageData.data.length; i += 4) {
                let color = colorArray[x * 10 + y];
                imageData.data[i] = color.substring(0, 3);
                imageData.data[i + 1] = color.substring(3, 6);
                imageData.data[i + 2] = color.substring(6, 9);
                imageData.data[i + 3] = 255;
            }
            context.putImageData(imageData, x * 50, y * 50);
        }
    }
}

var color;
var canvasColor;

function generateNewColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    color = getColorValue(red) + getColorValue(green) + getColorValue(blue);
    let context = canvasColor.getContext("2d");
    let imageData = context.createImageData(25, 25);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = red;
        imageData.data[i + 1] = green;
        imageData.data[i + 2] = blue;
        imageData.data[i + 3] = 255;
    }
    context.putImageData(imageData, 0, 0);
}

function canvasLaunch() {
    canvasColor = document.getElementById("canvasColor");
    canvasColor.addEventListener("mousedown", generateNewColor);
    generateNewColor();
    let http = new XMLHttpRequest();
    http.onreadystatechange = async function() {
        if (this.readyState === 4 && this.status === 200) {
            await canvasDraw(JSON.parse(this.responseText));
        }
    }
    setInterval(function() {
        http.open("GET", "http://localhost:8082", true);
        http.send();
    }, 1000);
}

function getColorValue(value)
{
    let colorValue = value.toString();
    if (colorValue.length === 1)
        return ("00" + colorValue);
    if (colorValue.length === 2)
        return ("0" + colorValue);
    return (colorValue);
}
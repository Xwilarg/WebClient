function canvasDraw(colorArray) {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let imageData = context.createImageData(50, 50);
            for (let i = 0; i < imageData.data.length; i += 4) {
                let color = colorArray[x * 10 + y];
                imageData.data[i] = color.substring(0, 3);
                imageData.data[i + 1] = color.substring(4, 6);
                imageData.data[i + 2] = color.substring(6, 9);
                imageData.data[i + 3] = 255;
            }
            context.putImageData(imageData, x * 50, y * 50);
        }
    }
}

function canvasLaunch() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = async function() {
        if (this.readyState === 4 & this.status === 200) {
            await canvasDraw(JSON.parse(this.responseText));
        }
    }
    setInterval(function() {
        http.open("GET", "http://localhost:8082", true);
        http.send();
    }, 1000);
}
function canvasLaunch() {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            let imageData = context.createImageData(50, 50);
            for (let i = 0; i < imageData.data.length; i += 4) {
                imageData.data[i] = 255;
                imageData.data[i + 1] = 0;
                imageData.data[i + 2] = 0;
                imageData.data[i + 3] = 255;
            }
            context.putImageData(imageData, x * 50, y * 50);
        }
    }
}
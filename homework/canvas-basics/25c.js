(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d");

    //Red rectangle
    renderingContext.fillStyle = "rgba(255, 0, 0, 0.5)";
    renderingContext.fillRect(10, 10, 100, 200);
    
    //Green rectangle
    renderingContext.fillStyle = "rgba(0, 255, 0, 0.5)";
    renderingContext.fillRect(60, 110, 100, 200);

}());
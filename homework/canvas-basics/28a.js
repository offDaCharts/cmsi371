(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linGradSky = renderingContext.createLinearGradient(256, -200, 256, 400),
        linGradGround = renderingContext.createLinearGradient(256, 100, 256, 700),
        radGradSun = renderingContext.createRadialGradient(246, 170, 1, 256, 190, 75);
    
    //Add color stops
    linGradSky.addColorStop(0, "black");
    linGradSky.addColorStop(1, "blue");
    radGradSun.addColorStop(0, "red");
    radGradSun.addColorStop(1, "orange");
    linGradGround.addColorStop(0, "green");
    linGradGround.addColorStop(1, "black");

    //Draw sky
    renderingContext.fillStyle = linGradSky;
    renderingContext.fillRect(0, 0, 512, 200);
    
    //Draw sun
    renderingContext.fillStyle = radGradSun;
    renderingContext.beginPath();
    renderingContext.arc(256, 190, 50, 0, Math.PI * 2, true);
    renderingContext.fill();

    //Draw ground
    renderingContext.fillStyle = linGradGround;
    renderingContext.fillRect(0, 200, 512, 312);

}());
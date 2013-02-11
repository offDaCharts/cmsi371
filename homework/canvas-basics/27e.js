// JD: Hope you had fun with this one---relived your JPL days
//     a little bit? :)
(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        circleCenter = {x: 306, y: 256},
        radialGradientPlanet = renderingContext.createRadialGradient(
            circleCenter.x - 96, circleCenter.y - 96, 1, circleCenter.x - 76, circleCenter.y - 76, 320
        ),
        radialGradientRing = renderingContext.createRadialGradient(
            circleCenter.x - 96, circleCenter.y - 96, 1, circleCenter.x - 76, circleCenter.y - 76, 320
        ),
        circleRadius = 200,
        ringStartOffset = {x: 256, y: 0},
        controlPointOffset = {x: 256, y: 50};
    
    radialGradientPlanet.addColorStop(0, "white");
    radialGradientPlanet.addColorStop(1, "blue");
    radialGradientRing.addColorStop(0, "white");
    radialGradientRing.addColorStop(1, "red");

    
    //Draw back half of ring
    renderingContext.beginPath();
    renderingContext.moveTo(circleCenter.x + ringStartOffset.x, circleCenter.y - ringStartOffset.y);
    renderingContext.quadraticCurveTo(
        circleCenter.x + controlPointOffset.x, circleCenter.y - controlPointOffset.y,
        circleCenter.y, circleCenter.y - controlPointOffset.y
    );
    renderingContext.quadraticCurveTo(
        circleCenter.x - controlPointOffset.x, circleCenter.y - controlPointOffset.y,
        circleCenter.x - ringStartOffset.x, circleCenter.y - ringStartOffset.y
    );

    
    renderingContext.lineWidth = 25;
    renderingContext.strokeStyle = radialGradientRing;
    renderingContext.stroke();

    //Draw planet
    renderingContext.fillStyle = radialGradientPlanet;
    renderingContext.beginPath();
    renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
    renderingContext.fill();
    
    //Draw front half of ring
    renderingContext.beginPath();
    renderingContext.moveTo(circleCenter.x + ringStartOffset.x, circleCenter.y - ringStartOffset.y);
    renderingContext.quadraticCurveTo(
        circleCenter.x + controlPointOffset.x, circleCenter.y + controlPointOffset.y,
        circleCenter.y, circleCenter.y + controlPointOffset.y
    );
    renderingContext.quadraticCurveTo(
        circleCenter.x - controlPointOffset.x, circleCenter.y + controlPointOffset.y,
        circleCenter.x - ringStartOffset.x, circleCenter.y - ringStartOffset.y
    );
    
    
    renderingContext.strokeStyle = radialGradientRing;
    renderingContext.stroke();

}());
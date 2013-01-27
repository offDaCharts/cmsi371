(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        current = {x: 256, y: 256},
        sideLength = 100,
        angle = Math.PI/6,
        scaleDiagonals = 0.75,
        offset = {x: scaleDiagonals * Math.cos(angle), y: scaleDiagonals * Math.sin(angle)};
        
    renderingContext.beginPath();
    renderingContext.moveTo(current.x, current.y);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - offset.y * sideLength);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - (offset.y + 1) * sideLength);
    renderingContext.moveTo(current.x, current.y);
    renderingContext.lineTo(current.x, current.y -= sideLength);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - offset.y * sideLength);
    renderingContext.lineTo(current.x + (offset.x - 1) * sideLength, current.y - offset.y * sideLength);
    renderingContext.moveTo(current.x, current.y);
    renderingContext.lineTo(current.x -= sideLength, current.y);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - offset.y * sideLength);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - (offset.y - 1) * sideLength);
    renderingContext.moveTo(current.x, current.y);
    renderingContext.lineTo(current.x, current.y += sideLength);
    renderingContext.lineTo(current.x + offset.x * sideLength, current.y - offset.y * sideLength);
    renderingContext.lineTo(current.x + (offset.x + 1) * sideLength, current.y - offset.y * sideLength);
    renderingContext.moveTo(current.x, current.y);
    renderingContext.lineTo(current.x += sideLength, current.y);

    
    renderingContext.lineWidth = 1;
    renderingContext.strokeStyle = "green";
    renderingContext.stroke();

}());
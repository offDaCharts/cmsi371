(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        sideLength = 100,
        // JD: Wow, now that's what I call precision :)
        angle = Math.PI/6,
        scaleDiagonals = 0.75,
        offset = {x: scaleDiagonals * Math.cos(angle), y: scaleDiagonals * Math.sin(angle)},
        // JD: OK, if we are picking nits, note that you could also have
        //     used canvas.width and canvas.height below.
        current = {x: 511 - offset.x * sideLength, y: 511};
        
    //Draw grid frame    
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
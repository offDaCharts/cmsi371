(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        squareSize = 10;

    //Lavendar
    renderingContext.fillStyle = "#E6E6FA";
    
    //Draw squares
    for(var x = 0; x < canvas.width; x+=squareSize + 1) {
        for(var y = 0; y < canvas.height; y+=squareSize + 1) {
            renderingContext.fillRect(x, y, squareSize, squareSize);
        }
    }

}());
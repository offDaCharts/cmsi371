(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        squareSize = 10;

    //Lavendar
    renderingContext.fillStyle = "#E6E6FA";
    
    //Draw squares
    // JD: Strictly speaking, even x and y should be declared up
    //     top to match JavaScript variable declaration semantics.
    for(var x = 0; x < canvas.width; x+=squareSize + 1) {
        for(var y = 0; y < canvas.height; y+=squareSize + 1) {
            renderingContext.fillRect(x, y, squareSize, squareSize);
        }
    }

}());
/*
 * This demo script uses the NanoshopNeighborhood module to apply a
 * "pixel neighborhood" filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        radius = 10;

    //Brown background
    renderingContext.fillStyle = "#5C3317";
    renderingContext.fillRect(0, 0, canvas.width, canvas.height);
    
    //Pink circles
    renderingContext.fillStyle = "#FF00FF";
    for(var y = 0; y < canvas.height; y+= 2 * radius + 10) {
        for(var x = 15*((y/30)%2); x < canvas.width; x+= 2 * radius + 10) {
            // JD: Your polka dots are separate entities---you should
            //     beginPath before every arc.
            //
            //     This may have looked right in one browser, but try
            //     it in some others  :)  What I describe above (which
            //     matches your intent anyway) is the solution that works
            //     across the board.
            //renderingContext.beginPath();
            renderingContext.arc(x, y, radius, 0, 2 * Math.PI, false);
            renderingContext.fill();
        }
    }
    
    // Set a little event handler to apply the filter.
    $("#apply-averager").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.averager 
            ),
            0, 0
        );
    });
    
    $("#apply-randomize").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                NanoshopNeighborhood.random 
            ),
            0, 0
        );
    });
    
    $("#apply-diagBlurr").click(function () {
        // Filter time.
        renderingContext.putImageData(
            NanoshopNeighborhood.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height), 
                NanoshopNeighborhood.diagonalBlurr 
            ),
            0, 0
        );
    });
}());

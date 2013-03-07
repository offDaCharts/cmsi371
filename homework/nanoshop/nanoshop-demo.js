/*
 * This demo script uses the Nanoshop module to apply a simple
 * filter on a canvas drawing.
 */
(function () {
    var canvas = $("#picture")[0],
        renderingContext = canvas.getContext("2d"),
        gradient,
        max = 255,
        darkener = function (r, g, b, a) { // This is a basic "darkener."
                    return [r / 2, g / 2, b / 2, a];
                },

        // JD: This all works out fine, but you missed the additional step
        //     of adding these to the actual Nanoshop object as the
        //     start of a library of filter functions.
        //
        //     (see the way you did NanoshopNeighborhood)
        contrastFilter = function (r, g, b, a) { // This is a basic contrast filter
            // JD: Why aren't ri, gi, and bi preceded by var?
            //     This makes them global variables!
            //
            //     Also, you need Math.floor if you intend these to be
            //     integer operations.  (try 1 / 2 in JavaScript)
                    ri = r/(max);
                    gi = g/(max);
                    bi = b/(max);
                    r = max*(-2*Math.pow(ri,3)+3*Math.pow(ri,2));
                    g = max*(-2*Math.pow(gi,3)+3*Math.pow(gi,2));
                    b = max*(-2*Math.pow(bi,3)+3*Math.pow(bi,2));
                    return [r, g, b, a];
                },
        // JD: Hmmm...a little tight in here...
        blackAndWhiteFilter = function (r, g, b, a) { // This is a basic black and white filter
            // JD: Same thing here with grey.
                    grey = (r+g+b)/3;
                    return [grey, grey, grey, a];
                },
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

    // Set a little event handler to apply the filter.
    $("#apply-darkener").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                darkener
            ),
            0, 0
        );
    });
    
    $("#apply-blackAndWhite").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                blackAndWhiteFilter
            ),
            0, 0
        );
    });
    
    $("#apply-contrast").click(function () {
        // Filter time.
        renderingContext.putImageData(
            Nanoshop.applyFilter(
                renderingContext.getImageData(0, 0, canvas.width, canvas.height),
                contrastFilter
            ),
            0, 0
        );
    });
}());

/*
 * This is the companion script to primitives-demo.html, with different
 * calls to the functions in the Primitives module.
 */
(function () {
    var canvas = document.getElementById("scratch"),
        renderingContext = document.getElementById("scratch").getContext("2d"),
        gradient = {
            xStart: 0,
            xStop: canvas.width,
            colorStart: [255,0,0],
            colorStop: [0,255,0]
        };

    // Start with rectangles.
    renderingContext.fillStyle = "gray"; // For demonstrating the no-color case.
    Primitives.fillRect(renderingContext, 5, 5, 200, 100);
    Primitives.fillRect(renderingContext, 210, 5, 200, 100, [0, 100, 255]);
    Primitives.fillRect(renderingContext, 415, 5, 200, 100,
            [120, 0, 0], [0, 255, 0]);
    Primitives.fillRect(renderingContext, 620, 5, 200, 100,
            [0, 0, 200], [0, 255, 0], [190, 140, 0]);
    Primitives.fillRect(renderingContext, 825, 5, 200, 100,
            [255, 0, 0], [255, 255, 0], [0, 200, 0], [0, 0, 100]);

    // Some dashed line segments.
    Primitives.lineBresenhamDash(renderingContext, 5, 210, 204, 110, 1);
    Primitives.lineBresenhamDash(renderingContext, 210, 210, 409, 110, 2);
    Primitives.lineBresenhamDash(renderingContext, 415, 210, 614, 110, 3);
    Primitives.lineBresenhamDash(renderingContext, 620, 210, 819, 110, 4);
    Primitives.lineBresenhamDash(renderingContext, 825, 210, 1024, 110, 5);

    // A few circles.
    Primitives.circleTrigGradient(renderingContext, 105, 315, 100, gradient);
    Primitives.circleDDAGradient(renderingContext, 310, 315, 100, gradient);
    Primitives.circleBres1Gradient(renderingContext, 515, 315, 100, gradient);
    Primitives.circleBres2Gradient(renderingContext, 720, 315, 100, gradient);
    Primitives.circleBres3Gradient(renderingContext, 925, 315, 100, gradient);

    // And finally...polygon fills!
    renderingContext.save();
    renderingContext.translate(5, 420);
    Primitives.fillPolygon(renderingContext, [
        { x: 50, y: 50 },
        { x: 50, y: 80 },
        { x: 80, y: 100 },
        { x: 140, y: 50 },
        { x: 140, y: 80 },
        { x: 110, y: 50 }
    ]);
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(210, 420);
    Primitives.fillPolygon(renderingContext, [
        { x: 50, y: 5 },
        { x: 100, y: 80 },
        { x: 120, y: 40 }
    ]);
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(415, 420);
    Primitives.fillPolygon(renderingContext, [
        { x: 30, y: 40 },
        { x: 100, y: 40 },
        { x: 100, y: 100 },
        { x: 30, y: 100 }
    ]);
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(620, 420);
    Primitives.fillPolygon(renderingContext, [
        { x: 20, y: 20 },
        { x: 50, y: 25 },
        { x: 100, y: 90 },
        { x: 50, y: 100 },
        { x: 15, y: 80 },
        { x: 10, y: 50 }
    ]);
    renderingContext.restore();

    renderingContext.save();
    renderingContext.translate(825, 420);
    Primitives.fillPolygon(renderingContext, [
        { x: 100, y: 10 },
        { x: 150, y: 100 },
        { x: 20, y: 40 },
        { x: 180, y: 40 },
        { x: 50, y: 100 }
    ]);
    renderingContext.restore();

}());

/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
 
(function () {
    var canvas = document.getElementById("canvas"),

        // First, a selection of "drawing functions" from which we
        // can choose.  Their common trait: they all accept a single
        // renderingContext argument.
        square = [
            function (renderingContext) {
                renderingContext.fillStyle = "blue";
                renderingContext.fillRect(-20, -20, 40, 40);
            },
            function (renderingContext) {
                renderingContext.fillStyle = "red";
                renderingContext.fillRect(-20, -20, 40, 40);
            }],

        circle = [function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        }],
        
        wireCube = [function (renderingContext) {
            var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        sideLength = 100,
        // JD: Wow, now that's what I call precision :)
        angle = Math.PI/6,
        scaleDiagonals = 0.75,
        offset = {x: scaleDiagonals * Math.cos(angle), y: scaleDiagonals * Math.sin(angle)},
        // JD: OK, if we are picking nits, note that you could also have
        //     used canvas.width and canvas.height below.
        current = {x: 0, y: 0};
        
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
        }],
        
        background = function(renderingContext) {
            renderingContext.fillStyle = "black";
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
        },

        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: square,
                numberOfPositions: 2,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: 20,
                        ty: 20,
                        ease: KeyframeTweener.linear
                    },

                    {
                        frame: 30,
                        tx: 100,
                        ty: 50,
                        ease: KeyframeTweener.quadEaseInOut
                    },

                    // The last keyframe does not need an easing function.
                    {
                        frame: 80,
                        tx: 80,
                        ty: 500,
                        rotate: 60 // Keyframe.rotate uses degrees.
                    }
                ]
            },

            {
                draw: circle,
                numberOfPositions: 1,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 50,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 0,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 600,
                        sx: 0.5,
                        sy: 0.5
                    }
                ]
            },
            
            {
                draw: wireCube,
                numberOfPositions: 1,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 10,
                        tx: 200,
                        ty: 100,
                        sx: 0.5,
                        sy: 0.5,
                        ease: KeyframeTweener.quadEaseOut
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 50,
                        sx: 3,
                        sy: 0.25,
                        ease: KeyframeTweener.quadEaseOut,
                        rotate: 120
                    },

                    {
                        frame: 150,
                        tx: 10,
                        ty: 200,
                        sx: 0.5,
                        sy: 0.5,
                        rotate: 30
                    }
                ]
            }
        ];

    // Finally, we initialize the engine.  Mainly, it needs
    // to know the rendering context to use.  And the animations
    // to display, of course.
    KeyframeTweener.initialize({
        renderingContext: canvas.getContext("2d"),
        width: canvas.width,
        height: canvas.height,
        sprites: sprites,
        backgroundFunction: background
    });
}());

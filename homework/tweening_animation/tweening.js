/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
 
(function () {
    var canvas = document.getElementById("canvas"),
    
        // Variables for animation scene references
        bigBangFrameStart = 200,
        sunPos = {x: 400, y: 400},
        planetRadius = 300,
        planetWithRingRadius = 150,
    
        //First, get library of drawing functions:
        drawLib = getDrawLibrary(),
        
        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: drawLib.planet,
                numberOfPositions: 2,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: sunPos.x + planetRadius,
                        ty: sunPos.y,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 50,
                        tx: sunPos.x,
                        ty: sunPos.y + planetRadius,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 100,
                        tx: sunPos.x - planetRadius,
                        ty: sunPos.y,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 150,
                        tx: sunPos.x,
                        ty: sunPos.y - planetRadius,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 200,
                        tx: sunPos.x + planetRadius,
                        ty: sunPos.y
                    }
                ]
            },
            
            {
                draw: drawLib.planetWithRing,
                numberOfPositions: 2,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: sunPos.x + planetWithRingRadius,
                        ty: sunPos.y,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut,
                        rotate: 0
                    },

                    {
                        frame: 50,
                        tx: sunPos.x,
                        ty: sunPos.y - planetWithRingRadius,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn,
                        rotate: 180
                    },

                    {
                        frame: 100,
                        tx: sunPos.x - planetWithRingRadius,
                        ty: sunPos.y,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut,
                        rotate: 360
                    },

                    {
                        frame: 150,
                        tx: sunPos.x,
                        ty: sunPos.y + planetWithRingRadius,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn,
                        rotate: 540
                    },

                    {
                        frame: 200,
                        tx: sunPos.x + planetWithRingRadius,
                        ty: sunPos.y,
                        sx: 0.2,
                        sy: 0.2,
                        rotate: 720
                    }
                ]
            },
            
            {
                draw: drawLib.sun,
                numberOfPositions: 4,
                nextPosition: 0,
                nextPositionFunction: function (nextPos, numOfPos) {
                    return Math.floor(Math.random() * numOfPos);
                },
                
                keyframes: [
                    {
                        frame: 0,
                        tx: sunPos.x,
                        ty: sunPos.y,
                        sx: 0.3,
                        sy: 0.3
                    },

                    {
                        frame: 200,
                        tx: sunPos.x,
                        ty: sunPos.y,
                        sx: 0.3,
                        sy: 0.3
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
        backgroundFunction: drawLib.background
    });
}());

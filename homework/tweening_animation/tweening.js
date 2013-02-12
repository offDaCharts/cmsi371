/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
 
(function () {
    var canvas = document.getElementById("canvas"),
    
        //First, get library of drawing functions:
        drawLib = getDrawLibrary(),
        
        // Then, we have "easing functions" that determine how
        // intermediate frames are computed.

        // Now, to actually define the animated sprites.  Each sprite
        // has a drawing function and an array of keyframes.
        sprites = [
            {
                draw: drawLib.square,
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
                draw: drawLib.circle,
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
                draw: drawLib.wireCube,
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
            },
            
            {
                draw: drawLib.planet,
                numberOfPositions: 2,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: 700,
                        ty: 500,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 50,
                        tx: 500,
                        ty: 700,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 100,
                        tx: 300,
                        ty: 500,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 150,
                        tx: 500,
                        ty: 300,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 200,
                        tx: 700,
                        ty: 500
                    }
                ]
            },
            
            {
                draw: drawLib.planetWithRing,
                numberOfPositions: 1,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: 500,
                        ty: 300,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 50,
                        tx: 300,
                        ty: 500,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 100,
                        tx: 100,
                        ty: 300,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 150,
                        tx: 300,
                        ty: 100,
                        sx: 0.2,
                        sy: 0.2,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 200,
                        tx: 500,
                        ty: 300,
                        sx: 0.2,
                        sy: 0.2
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
                        tx: 300,
                        ty: 300,
                        sx: 0.3,
                        sy: 0.3
                    },

                    {
                        frame: 200,
                        tx: 300,
                        ty: 300,
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

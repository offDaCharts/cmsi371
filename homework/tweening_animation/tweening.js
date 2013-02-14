/*
 * This file demonstrates how our homebrew keyframe-tweening
 * engine is used.
 */
 
(function () {
    var canvas = document.getElementById("canvas"),
    
        // Variables for animation scene references
        bigBangFrameStart = 255,
        sunPos = {x: 512, y: 400},
        planetRadius = 300,
        planetWithRingRadius = 150,
        planetWithRingScale = 0.1,
        sunScale = 0.2,
        singularityStartScale = 0.03,
    
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
                        frame: 0 + bigBangFrameStart,
                        tx: sunPos.x + planetRadius,
                        ty: sunPos.y,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 50 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y + planetRadius,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 100 + bigBangFrameStart,
                        tx: sunPos.x - planetRadius,
                        ty: sunPos.y,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },

                    {
                        frame: 150 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y - planetRadius,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },

                    {
                        frame: 200 + bigBangFrameStart,
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
                        frame: 0 + bigBangFrameStart,
                        tx: sunPos.x + planetWithRingRadius,
                        ty: sunPos.y,
                        sx: planetWithRingScale,
                        sy: planetWithRingScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut,
                        rotate: 0
                    },

                    {
                        frame: 50 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y - planetWithRingRadius,
                        sx: planetWithRingScale,
                        sy: planetWithRingScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn,
                        rotate: 180
                    },

                    {
                        frame: 100 + bigBangFrameStart,
                        tx: sunPos.x - planetWithRingRadius,
                        ty: sunPos.y,
                        sx: planetWithRingScale,
                        sy: planetWithRingScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut,
                        rotate: 360
                    },

                    {
                        frame: 150 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y + planetWithRingRadius,
                        sx: planetWithRingScale,
                        sy: planetWithRingScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn,
                        rotate: 540
                    },

                    {
                        frame: 200 + bigBangFrameStart,
                        tx: sunPos.x + planetWithRingRadius,
                        ty: sunPos.y,
                        sx: planetWithRingScale,
                        sy: planetWithRingScale,
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
                        frame: 0 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y,
                        sx: sunScale,
                        sy: sunScale
                    },

                    {
                        frame: 200 + bigBangFrameStart,
                        tx: sunPos.x,
                        ty: sunPos.y,
                        sx: sunScale,
                        sy: sunScale
                    }
                ]
            },
            
            {
                draw: drawLib.theSingularity,
                numberOfPositions: 1,
                nextPosition: 0,
                keyframes: [
                    {
                        frame: 0,
                        tx: 50,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },
                    
                    {
                        frame: 30,
                        tx: 100,
                        ty: 450,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },
                    
                    {
                        frame: 60,
                        tx: 150,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },
                    
                    {
                        frame: 90,
                        tx: 200,
                        ty: 350,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },
                    
                    {
                        frame: 120,
                        tx: 250,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },
                    
                    {
                        frame: 150,
                        tx: 300,
                        ty: 450,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },
                    
                    {
                        frame: 180,
                        tx: 350,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },
                    
                    {
                        frame: 210,
                        tx: 400,
                        ty: 350,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseOut,
                        easeY: KeyframeTweener.sineEaseIn
                    },
                    
                    {
                        frame: 240,
                        tx: 450,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        easeX: KeyframeTweener.sineEaseIn,
                        easeY: KeyframeTweener.sineEaseOut
                    },
                    
                    {
                        frame: 250,
                        tx: 450,
                        ty: 400,
                        sx: singularityStartScale,
                        sy: singularityStartScale,
                        ease: KeyframeTweener.quadEasein
                    },
                    
                    {
                        frame: 255,
                        tx: 450,
                        ty: 400,
                        sx: 40,
                        sy: 40,
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

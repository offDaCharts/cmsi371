var getObjectsToDraw = function(gl) {
    var objectsToDraw,
        frame,
        top,
        chamber;
        
    frame = [
        {
            //Vert Beam
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [2.4, 3, -2.4],
            scale: [0.1, 6, 0.1],
            children: []
        },
        {
            //Vert Beam
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-2.4, 3, -2.4],
            scale: [0.1, 6, 0.1],
            children: []
        },
        {
            //Vert Beam
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-2.4, 3, 2.4],
            scale: [0.1, 6, 0.1],
            children: []
        },
        {
            //Vert Beam
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [2.4, 3, 2.4],
            scale: [0.1, 6, 0.1],
            children: []
        },
        {
            //Hor Beam bottom
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 0.15, -2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam bottom
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 0.15, 2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam bottom
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [2.4, 0.15, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam bottom
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-2.4, 0.15, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam mid
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 3.5, -2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam mid
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 3.5, 2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam mid
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [2.4, 3.5, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam mid
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-2.4, 3.5, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam cross
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-1, 3.5, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam cross
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [1, 3.5, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam cross
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 3.5, -1],
            scale: [2, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam cross
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 3.5, 1],
            scale: [2, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam top
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 6, -2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam top
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 6, 2.4],
            scale: [5, 0.1, 0.1],
            children: []
        },
        {
            //Hor Beam top
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [2.4, 6, 0],
            scale: [0.1, 0.1, 5],
            children: []
        },
        {
            //Hor Beam top
            color: { r: 0.5, g: 0.5, b: 0.5 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-2.4, 6, 0],
            scale: [0.1, 0.1, 5],
            children: []
        }
    ];
    
    top = [
        {
            //Top
            color: { r: 1.0, g: 0.6, b: 0.6 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [1.75, 6.125, 0],
            scale: [1.5, 0.15, 5],
            children: []
        },
        {
            //Top
            color: { r: 1.0, g: 0.6, b: 0.6 },
            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [-1.75, 6.125, 0],
            scale: [1.5, 0.15, 5],
            children: []
        }
    ];
    
    chamber = [
        {
            //Chamber
            color: { r: 0.8, g: 0.8, b: 0.8 },
            vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, 0.3, 0],
            scale: [0.9, 0.9, 0.9],
            children: [
                //View Port
                {
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [90, 1, 0, 0],
                    translate: [0, 0, 1],
                    scale: [0.5, 0.5, 0.5],
                    children: [
                        {
                            //Plasma
                            color: { r: 0.9, g: 0.4, b: 1.0 },
                            vertices: Shapes.toRawTriangleArray(Shapes.sphere()),
                            mode: gl.TRIANGLES,
                            rotation: [0, 0, 1, 0],
                            translate: [0, 0.2, 0],
                            scale: [0.22, 0.05, 0.22],
                            children: []
                        }
                    ]

                },
                //Vacuum meter Port
                {
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [90, 0, 0, 1],
                    translate: [-1, 0, 0],
                    scale: [0.5, 0.5, 0.5],
                    children: []

                },
                //Feed through Port
                {
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [90, 0, 0, 1],
                    translate: [1, 0, 0],
                    scale: [0.5, 0.5, 0.5],
                    children: []

                },
                //Back Port
                {
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [90, 1, 0, 0],
                    translate: [0, 0, -1],
                    scale: [0.5, 0.5, 0.5],
                    children: []
                },
                {
                //Top Port
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [0, 1, 0, 0],
                    translate: [0, 1, 0],
                    scale: [0.7, 0.7, 0.7],
                    children: []
                },
                {
                //Vacuum Port
                    color: { r: 0.7, g: 0.7, b: 0.7 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                    mode: gl.TRIANGLES,
                    rotation: [0, 1, 0, 0],
                    translate: [0, -1, 0],
                    scale: [0.7, 0.7, 0.7],
                    children: []
                }
            ]
        }
    ];
    
    // Build the objects to display.    
    objectsToDraw = [
        
        {
            color: { r: 0.0, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
            mode: gl.TRIANGLES,
            rotation: [0, 1, 0, 0],
            translate: [0, -3, -18],
            scale: [1, 1, 1],
            inheritScale: true,
            children: [
                {
                    color: { r: 0.0, g: 0.0, b: 0.0 },
                    vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
                    mode: gl.TRIANGLES,
                    rotation: [0, 0, 1, 0],
                    translate: [0, 0, 0],
                    scale: [1, 1, 1],
                    inheritScale: true,
                    children: [
                        {
                            //Base
                            color: { r: 0.8, g: 0.4, b: 0.4 },
                            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                            mode: gl.TRIANGLES,
                            rotation: [0, 1, 0, 0],
                            translate: [0, 0, 0],
                            scale: [5, 0.2, 5],
                            children: [
                                {
                                //Wheel
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                                    mode: gl.TRIANGLES,
                                    rotation: [90, 0, 0, 1],
                                    translate: [-2.3, -0.3, 2.3],
                                    scale: [0.5, 0.5, 0.5]
                                },
                                {
                                //Wheel
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                                    mode: gl.TRIANGLES,
                                    rotation: [90, 0, 0, 1],
                                    translate: [2.3, -0.3, 2.3],
                                    scale: [0.5, 0.5, 0.5]
                                },
                                {
                                //Wheel
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                                    mode: gl.TRIANGLES,
                                    rotation: [90, 0, 0, 1],
                                    translate: [2.3, -0.3, -2.3],
                                    scale: [0.5, 0.5, 0.5]
                                },
                                {
                                //Wheel
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.cylinder()),
                                    mode: gl.TRIANGLES,
                                    rotation: [90, 0, 0, 1],
                                    translate: [-2.3, -0.3, -2.3],
                                    scale: [0.5, 0.5, 0.5]
                                },
                                {
                                //Power Supply
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                                    mode: gl.TRIANGLES,
                                    rotation: [0, 0, 0, 1],
                                    translate: [1.3, 0.45, 1.15],
                                    scale: [2, 0.7, 2.3],
                                    children: [
                                        {
                                            color: { r: 0.6, g: 0.6, b: 0.6 },
                                            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                                            mode: gl.TRIANGLES,
                                            rotation: [0, 0, 0, 1],
                                            translate: [0, 0, 1.12],
                                            scale: [1.8, 0.6, 0.1],
                                            children: []
                                        }
                                    ]
                                },
                                {
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
                                    mode: gl.TRIANGLES,
                                    rotation: [0, 0, 0, 1],
                                    translate: [0, 0, 0],
                                    children: frame
                                },
                                {
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
                                    mode: gl.TRIANGLES,
                                    rotation: [0, 0, 0, 1],
                                    translate: [0, 0, 0],
                                    children: top
                                },
                                {
                                    color: { r: 0.0, g: 0.0, b: 0.0 },
                                    vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
                                    mode: gl.TRIANGLES,
                                    rotation: [0, 0, 0, 1],
                                    translate: [0, 3.5, 0],
                                    children: chamber
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    return objectsToDraw;
}

    
    
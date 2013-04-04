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
    
    ];
    
    // Build the objects to display.    
    objectsToDraw = [
        
        {
            color: { r: 0.0, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 1, 0],
            translate: [0, -3, -18],
            children: [
                {
                    //Base
                    color: { r: 0.8, g: 0.4, b: 0.4 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                    mode: gl.TRIANGLES,
                    rotation: [20, 1, 0, 0],
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
                            translate: [0, 0, 0],
                            children: chamber
                        }
                    ]
                }
            ]
        }
    ];

    return objectsToDraw;
}

    
    
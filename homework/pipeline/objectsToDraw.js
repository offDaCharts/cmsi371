var getObjectsToDraw = function(gl) {
    // Build the objects to display.
    var objectsToDraw = [
        
        {
            color: { r: 0.0, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.nullObject()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 0, 1],
            translate: [0, -2.1, -15],
            scale: [1, 1, 1],
            children: [
                {
                    //Base
                    color: { r: 0.8, g: 0.4, b: 0.4 },
                    vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                    mode: gl.TRIANGLES,
                    rotation: [0, 0, 1, 0],
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
                        }
                        
                    ]
                },
                {
                    color: { r: 0.0, g: 0.0, b: 0.5 },
                    vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
                    mode: gl.TRIANGLES,
                    rotation: [0, 0, 0, 1],
                    translate: [1, 0, 0],
                    scale: [1, 1, 1]
                }
            ]
        }
    ];

    return objectsToDraw;
}

    
    
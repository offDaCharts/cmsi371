/*
 * For maximum modularity, we place everything within a single function that
 * takes the canvas that it will need.
 */
(function (canvas) {

    // Because many of these variables are best initialized then immediately
    // used in context, we merely name them here.  Read on to see how they
    // are used.
    var gl, // The WebGL context.

        // This variable stores 3D model information.
        objectsToDraw,

        // The shader program to use.
        shaderProgram,

        // Utility variable indicating whether some fatal has occurred.
        abort = false,

        // Important state variables.
        currentRotation = 0.0,
        currentInterval,
        rotationMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,

        // An individual "draw object" function.
        drawObject,

        // The big "draw scene" function.
        drawScene,

        // Reusable loop variables.
        i,
        objNum,
        maxi,
        j,
        maxj,

    // Grab the WebGL rendering context.
    gl = GLSLUtilities.getGL(canvas);
    if (!gl) {
        alert("No WebGL context found...sorry.");

        // No WebGL, no use going on...
        return;
    }

    // Set up settings that will not change.  This is not "canned" into a
    // utility function because these settings really can vary from program
    // to program.
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Build the objects to display.
    objectsToDraw = [
        [
            {
                color: { r: 0.0, g: 0.5, b: 0.5 },
                vertices: Shapes.toRawLineArray(Shapes.icosahedron()),
                mode: gl.LINES
            },
            {
                color: { r: 0.0, g: 0.0, b: 0.5 },
                vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                mode: gl.TRIANGLES
            }
        ],
        
        [
            {
                color: { r: 0.5, g: 0.0, b: 0.0 },
                vertices: Shapes.toRawLineArray(Shapes.octahedren()),
                mode: gl.LINES
            },
            {
                color: { r: 0.0, g: 0.5, b: 0.0 },
                vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
                mode: gl.TRIANGLES
            }
        ],
        
        [
            {
                color: { r: 0.0, g: 1, b: 1 },
                vertices: Shapes.toRawLineArray(Shapes.sphere()),
                mode: gl.LINES
            },
            {
                color: { r: 0.0, g: 1, b: 1 },
                vertices: Shapes.toRawLineArray(Shapes.cylinder()),
                mode: gl.LINES
            }
        ]
    ];

    // Pass the vertices to WebGL.
    for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
        for(objNum in objectsToDraw[i]) {
            objectsToDraw[i][objNum].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i][objNum].vertices);

            if (!objectsToDraw[i][objNum].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectsToDraw[i][objNum].colors = [];
                for (j = 0, maxj = objectsToDraw[i][objNum].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectsToDraw[i][objNum].colors = objectsToDraw[i][objNum].colors.concat(
                        objectsToDraw[i][objNum].color.r,
                        objectsToDraw[i][objNum].color.g,
                        objectsToDraw[i][objNum].color.b
                    );
                }
            }
            objectsToDraw[i][objNum].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectsToDraw[i][objNum].colors);
        }
    }

    // Initialize the shaders.
    shaderProgram = GLSLUtilities.initSimpleShaderProgram(
        gl,
        $("#vertex-shader").text(),
        $("#fragment-shader").text(),

        // Very cursory error-checking here...
        function (shader) {
            abort = true;
            alert("Shader problem: " + gl.getShaderInfoLog(shader));
        },

        // Another simplistic error check: we don't even access the faulty
        // shader program.
        function (shaderProgram) {
            abort = true;
            alert("Could not link shaders...sorry.");
        }
    );

    // If the abort variable is true here, we can't continue.
    if (abort) {
        alert("Fatal errors encountered; we cannot continue.");
        return;
    }

    // All done --- tell WebGL to use the shader program from now on.
    gl.useProgram(shaderProgram);

    // Hold on to the important variables within the shaders.
    vertexPosition = gl.getAttribLocation(shaderProgram, "vertexPosition");
    gl.enableVertexAttribArray(vertexPosition);
    vertexColor = gl.getAttribLocation(shaderProgram, "vertexColor");
    gl.enableVertexAttribArray(vertexColor);
    rotationMatrix = gl.getUniformLocation(shaderProgram, "rotationMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        for(objNum in object) {
            // Set the varying colors.
            gl.bindBuffer(gl.ARRAY_BUFFER, object[objNum].colorBuffer);
            gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

            
            
            // Set the varying vertex coordinates.
            gl.bindBuffer(gl.ARRAY_BUFFER, object[objNum].buffer);
            gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.drawArrays(object[objNum].mode, 0, object[objNum].vertices.length / 3);
        }
    };

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix4x4.getRotationMatrix(currentRotation, 0, 1, 0).conversionConvenience.elements));

        // Display the objects.
        for (i = 0, maxi = objectsToDraw.length; i < maxi; i += 1) {
            drawObject(objectsToDraw[i]);
        }

        // All done.
        gl.flush();
    };

    // Set up the projection.
    gl.uniformMatrix4fv(projectionMatrix,
        gl.FALSE,
        new Float32Array(
            frustrum(-2.5, 2.5, -2.5, 2.5, 10, 10000).conversionConvenience()
        )
    );

    // Draw the initial scene.
    drawScene();

    // Set up the rotation toggle: clicking on the canvas does it.
    $(canvas).click(function () {
        if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
        } else {
            currentInterval = setInterval(function () {
                currentRotation += 1.0;
                drawScene();
                if (currentRotation >= 360.0) {
                    currentRotation -= 360.0;
                }
            }, 30);
        }
    });

}(document.getElementById("hello-webgl")));
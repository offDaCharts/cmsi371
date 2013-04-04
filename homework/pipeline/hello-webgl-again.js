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
        transformMatrix,
        projectionMatrix,
        vertexPosition,
        vertexColor,
        
        //function to set up the draw object function
        passVerticesToWebGl,

        // An individual "draw object" function.
        drawObject,
        drawObjects,

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
        
        {
            color: { r: 0.0, g: 0.5, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 0, 1],
            translate: [-1, 0, -15],
            scale: [1, 1, 1],
            children: [
                        /*{
                            color: { r: 0.0, g: 0.0, b: 0.5 },
                            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                            mode: gl.TRIANGLES
                        },*/

                        {
                            color: { r: 0.0, g: 0.0, b: 0.5 },
                            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
                            mode: gl.TRIANGLES,
                            rotation: [0, 0, 0, 1],
                            translate: [1, 0, 0],
                            scale: [1, 1, 1]
                        }
            ]
        },

        {
            color: { r: 0.5, g: 0.0, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
            rotation: [0, 0, 0, 1],
            translate: [2, 0, -15],
            scale: [1, 1, 1],
            children: [
                        /*{
                            color: { r: 0.0, g: 0.0, b: 0.5 },
                            vertices: Shapes.toRawTriangleArray(Shapes.cube()),
                            mode: gl.TRIANGLES
                        },*/

                        {
                            color: { r: 0.5, g: 0.0, b: 0.5 },
                            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
                            mode: gl.TRIANGLES,
                            rotation: [0, 0, 0, 1],
                            translate: [-1, 0, 0],
                            scale: [1, 1, 1]
                        }
            ]
        }
        
        /*
        {
            color: { r: 0.0, g: 0.5, b: 0.0 },
            vertices: Shapes.toRawTriangleArray(Shapes.pyramid()),
            mode: gl.TRIANGLES,
            children: [
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
        }*/
    ];
    
    passVerticesToWebGl = function(objectArray) {
        // Pass the vertices to WebGL.
        /* I have to declare i locally here because otherwise the global i
         * will get changed when the function is called recursively and the
         * loop won't continue
         */
        for (var i = 0, maxi = objectArray.length; i < maxi; i += 1) {
            objectArray[i].buffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].vertices);

            if (!objectArray[i].colors) {
                // If we have a single color, we expand that into an array
                // of the same color over and over.
                objectArray[i].colors = [];
                for (j = 0, maxj = objectArray[i].vertices.length / 3;
                        j < maxj; j += 1) {
                    objectArray[i].colors = objectArray[i].colors.concat(
                        objectArray[i].color.r,
                        objectArray[i].color.g,
                        objectArray[i].color.b
                    );
                }
            }
            objectArray[i].colorBuffer = GLSLUtilities.initVertexBuffer(gl,
                    objectArray[i].colors);
                    
            if(objectArray[i].children) {
                passVerticesToWebGl(objectArray[i].children);
            }
        }
    }
    
    passVerticesToWebGl(objectsToDraw);

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
    transformMatrix = gl.getUniformLocation(shaderProgram, "transformMatrix");
    projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");

    /*
     * Displays an individual object.
     */
    drawObject = function (object) {
        // Set the varying colors.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.colorBuffer);
        gl.vertexAttribPointer(vertexColor, 3, gl.FLOAT, false, 0, 0);

        
        
        // Set the varying vertex coordinates.
        gl.bindBuffer(gl.ARRAY_BUFFER, object.buffer);
        gl.vertexAttribPointer(vertexPosition, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(object.mode, 0, object.vertices.length / 3);
    };
    
    //Displays all the objects
    drawArrayOfObjects = function (object, curRotMat, curScaleMat, curTransMat) {
            //Keep these seperate (instead of one transformation to pass along so
            //that the transformations are always applied in the order: rotate, scale,
            //translate
        var currentRotationMatrix,
            currentScaleMatrix,
            currentTranslationMatrix,
            totalTransformMatrix;
            
        for (var i = 0, maxi = object.length; i < maxi; i += 1) {

                
            if(object[i].rotation) {
                currentRotationMatrix = curRotMat.multiplyMatrices(
                    Matrix4x4.getRotationMatrix(
                        object[i].rotation[0],
                        object[i].rotation[1],
                        object[i].rotation[2],
                        object[i].rotation[3]
                    )
                );
            } else {
                currentRotationMatrix = curRotMat;
            }
            
            if(object[i].scale) {
                currentScaleMatrix = curScaleMat.multiplyMatrices(
                    Matrix4x4.getScaleMatrix(
                        object[i].scale[0],
                        object[i].scale[1],
                        object[i].scale[2]
                    )
                );
            } else {
                currentScaleMatrix = curScaleMat;
            }
            
            if(object[i].translate) {
                currentTranslationMatrix = curTransMat.multiplyMatrices(
                    Matrix4x4.getTranslateMatrix(
                        object[i].translate[0],
                        object[i].translate[1],
                        object[i].translate[2]
                    )
                );
            } else {
                currentTranslationMatrix = curTransMat;
            }
            
            totalTransformMatrix = 
                currentTranslationMatrix.multiplyMatrices(
                    currentScaleMatrix.multiplyMatrices(
                        currentRotationMatrix
                    )
                );
            
            
            
            gl.uniformMatrix4fv(
                transformMatrix, gl.FALSE, 
                new Float32Array(
                    totalTransformMatrix.conversionConvenience().elements
                )
            );                

            drawObject(object[i]);
            
            if(object[i].children) {
                drawArrayOfObjects(
                    object[i].children,
                    currentRotationMatrix,
                    currentScaleMatrix,
                    currentTranslationMatrix
                );
            }
        }
    }

    /*
     * Displays the scene.
     */
    drawScene = function () {
        // Clear the display.
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up the rotation matrix.
        gl.uniformMatrix4fv(rotationMatrix, gl.FALSE, new Float32Array(Matrix4x4.getRotationMatrix(currentRotation, 0, 1, 0).conversionConvenience().elements));

        // Display the objects.
        drawArrayOfObjects(objectsToDraw, new Matrix4x4(), new Matrix4x4(), new Matrix4x4());

        // All done.
        gl.flush();
    };

    // Set up the projection.
    gl.uniformMatrix4fv(projectionMatrix,
        gl.FALSE,
        new Float32Array(
            Matrix4x4.frustum(-2.5, 2.5, -2.5, 2.5, 10, 1000).conversionConvenience().elements
            //new Matrix4x4().elements
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
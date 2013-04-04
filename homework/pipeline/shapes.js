/*
 * This module defines/generates vertex arrays for certain predefined shapes.
 * The "shapes" are returned as indexed vertices, with utility functions for
 * converting these into "raw" coordinate arrays.
 */
var Shapes = {
    /*
     * Returns the vertices for a small icosahedron.
     */
    icosahedron: function () {
        // These variables are actually "constants" for icosahedron coordinates.
        var X = 0.525731112119133606,
            Z = 0.850650808352039932;

        return {
            vertices: [
                [ -X, 0.0, Z ],
                [ X, 0.0, Z ],
                [ -X, 0.0, -Z ],
                [ X, 0.0, -Z ],
                [ 0.0, Z, X ],
                [ 0.0, Z, -X ],
                [ 0.0, -Z, X ],
                [ 0.0, -Z, -X ],
                [ Z, X, 0.0 ],
                [ -Z, X, 0.0 ],
                [ Z, -X, 0.0 ],
                [ -Z, -X, 0.0 ]
            ],

            indices: [
                [ 1, 4, 0 ],
                [ 4, 9, 0 ],
                [ 4, 5, 9 ],
                [ 8, 5, 4 ],
                [ 1, 8, 4 ],
                [ 1, 10, 8 ],
                [ 10, 3, 8 ],
                [ 8, 3, 5 ],
                [ 3, 2, 5 ],
                [ 3, 7, 2 ],
                [ 3, 10, 7 ],
                [ 10, 6, 7 ],
                [ 6, 11, 7 ],
                [ 6, 0, 11 ],
                [ 6, 1, 0 ],
                [ 10, 1, 6 ],
                [ 11, 0, 9 ],
                [ 2, 11, 9 ],
                [ 5, 2, 9 ],
                [ 11, 2, 7 ]
            ]
        };
    },

    /*
     * Returns the vertices for a small cube.
     */
    cube: function () {

        return {
            vertices: [
                [ 0.5, 0.5, 0.5 ],
                [ 0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, -0.5 ],
                [ -0.5, 0.5, 0.5 ],
                [ 0.5, -0.5, 0.5 ],
                [ 0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, -0.5 ],
                [ -0.5, -0.5, 0.5 ]
            ],

            indices: [
                [ 0, 1, 3 ],
                [ 1, 2, 3 ],
                [ 0, 4, 5 ],
                [ 5, 1, 0 ],
                [ 0, 3, 7 ],
                [ 7, 4, 0 ],
                [ 6, 2, 3 ],
                [ 3, 7, 6 ],
                [ 1, 5, 6 ],
                [ 2, 1, 6 ],
                [ 4, 7, 5 ],
                [ 7, 6, 5 ]              
            ]
        };
    },

    /*
     * Returns the vertices for a cylinder.
     */
    cylinder: function () {
        var verticies,
            indicies,
            
            //Increase these for a better approximation
            //Decrease for faster rendering
            verticalSections = 10,
            horizontalSections = 10,
            r = 0.5,
            dVert,
            y,
            x,
            z,
            
            //Angles
            dHor,
            pitchAngle,
            yawAngle,
            xRatios = [],
            zRatios = [],
            
            //Loop variables
            i,
            j;
    
        //Initialize
        verticies = [];
        
        //Calculate the change in angle for each section
        dVert = 1/verticalSections;
        dHor = 2 * Math.PI / horizontalSections;
        
        //Find x and z ratios so they don't have to be calculated everytime
        for(yawAngle = 0; yawAngle < 2 * Math.PI; yawAngle += dHor) {
            xRatios.push(Math.cos(yawAngle));
            zRatios.push(-1 * Math.sin(yawAngle));
        }
        
        //Create vertices
        for(y = -0.5; y <= 0.5; y += dVert) {
            for(j = 0; j < horizontalSections; j++) {
                x = r * xRatios[j];
                z = r * zRatios[j];
                verticies.push([ x, y, z ]);
            }
        }

        //Initialize indicies array
        indicies = [];
        
        //Loop for middle of sphere
        for (i = 0; i < verticalSections; i++) {
            for (j = 0; j < horizontalSections; j++) {
                indicies.push([ 
                    i * horizontalSections + j,
                    (i + 1) * horizontalSections + j,
                    1 + i * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1)
                ]);
                indicies.push([ 
                    1 + i * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1),
                    (i + 1) * horizontalSections + j,
                    1 + (i + 1) * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1)
                ]);
            }
        }

        return {
            vertices: verticies,
            indices: indicies
        };

    },

    /*
     * Returns the vertices for an octahedren.
     */
    octahedren: function () {

        return {
            vertices: [
                [ 0, 1, 0 ],
                [ 1, 0, 0 ],
                [ 0, 0, -1 ],
                [ -1, 0, 0 ],
                [ 0, 0, 1 ],
                [ 0, -1, 0 ]
            ],

            indices: [
                [ 0, 4, 1 ],
                [ 0, 1, 2 ],
                [ 0, 2, 3 ],
                [ 0, 3, 4 ],
                [ 5, 1, 4 ],
                [ 5, 2, 1 ],
                [ 5, 3, 2 ],
                [ 5, 4, 3 ]               
            ]
        };
    },

    /*
     * Returns the vertices for a pyramid.
     */
    pyramid: function () {

        return {
            vertices: [
                [ 0, 1, 0 ],
                [ 1, 0, 0 ],
                [ 0, 0, -1 ],
                [ -1, 0, 0 ],
                [ 0, 0, 1 ]
            ],

            indices: [
                [ 0, 4, 1 ],
                [ 0, 1, 2 ],
                [ 0, 2, 3 ],
                [ 0, 3, 4 ],
                [ 1, 2, 3 ],
                [ 2, 3, 1 ]            
            ]
        };
    },

    /*
     * Returns the vertices for a sphere.
     */
    sphere: function () {
        var verticies,
            indicies,
            
            //Increase these for a better approximation
            //Decrease for faster rendering
            verticalSections = 15,
            horizontalSections = 15,
            
            //Angles
            dVert,
            dHor,
            pitchAngle,
            yawAngle,
            xRatios = [],
            zRatios = [],
            
            //Coordinates
            x,
            y,
            z,
            r,
            
            //Loop variables
            i,
            j;
    
        //Initialize with top point
        verticies = [ [ 0, 1, 0 ] ];
        
        //Calculate the change in angle for each section
        dVert = Math.PI / verticalSections;
        dHor = 2 * Math.PI / horizontalSections;
        
        //Find x and z ratios so they don't have to be calculated everytime
        for(yawAngle = 0; yawAngle < 2 * Math.PI; yawAngle += dHor) {
            xRatios.push(Math.cos(yawAngle));
            zRatios.push(-1 * Math.sin(yawAngle));
        }
        
        //Create vertices
        for(pitchAngle = dVert; pitchAngle < Math.PI; pitchAngle += dVert) {
            y = Math.cos(pitchAngle);
            r = Math.sqrt(1 - y * y);
            //for(yawAngle = 0; yawAngle < 2 * Math.PI; yawAngle += dHor) {
            for(j = 0; j < horizontalSections; j++) {
                x = r * xRatios[j];
                z = r * zRatios[j];
                verticies.push([ x, y, z ]);
            }
        }
        verticies.push([ 0, -1, 0 ]);

        //Initialize indicies array
        indicies = [];
        
        //Loop for top and bottom caps
        for(i = 0; i < horizontalSections; i++) {
            indicies.push([ 0, 1 + i, (2 + ((i < (horizontalSections - 1)) ? i : -1)) ]);
            indicies.push([ 
                verticies.length - 1, 
                verticies.length - (2 + horizontalSections - ((i == 0) ? horizontalSections : i)), 
                verticies.length - (1 + horizontalSections - i)
            ]);            
        }
        
        //Loop for middle of sphere
        for (i = 0; i < verticalSections - 2; i++) {
            for (j = 0; j < horizontalSections; j++) {
                indicies.push([ 
                    1 + i * horizontalSections + j,
                    1 + (i + 1) * horizontalSections + j,
                    2 + i * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1)
                ]);
                indicies.push([ 
                    2 + i * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1),
                    1 + (i + 1) * horizontalSections + j,
                    2 + (i + 1) * horizontalSections + ((j < (horizontalSections - 1)) ? j : -1)
                ]);
            }
        }

        return {
            vertices: verticies,
            indices: indicies
        };
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as triangles.
     */
    toRawTriangleArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ]
                );
            }
        }

        return result;
    },

    /*
     * Utility function for turning indexed vertices into a "raw" coordinate array
     * arranged as line segments.
     */
    toRawLineArray: function (indexedVertices) {
        var result = [],
            i,
            j,
            maxi,
            maxj;

        for (i = 0, maxi = indexedVertices.indices.length; i < maxi; i += 1) {
            for (j = 0, maxj = indexedVertices.indices[i].length; j < maxj; j += 1) {
                result = result.concat(
                    indexedVertices.vertices[
                        indexedVertices.indices[i][j]
                    ],

                    indexedVertices.vertices[
                        indexedVertices.indices[i][(j + 1) % maxj]
                    ]
                );
            }
        }

        return result;
    }

};

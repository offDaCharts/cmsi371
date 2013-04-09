/*
 * Unit tests for our vector object.
 */
$(function () {
    
    test("Pure Transformation Matrices", function () {
        var m = new Matrix4x4();
        
        deepEqual(m.elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             0,0,0,1],
             "initialize identity matrix");

        // JD: Non-prototype functions should be called from the
        //     top-level module object.
        deepEqual(Matrix4x4.getScaleMatrix(2, 5, 21).elements,
            [2,0,0,0,
             0,5,0,0,
             0,0,21,0,
             0,0,0,1],
             "pure scale matrix");

        // JD: Ditto for others...
        deepEqual(m.getTranslateMatrix(4, 5, 6).elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             4,5,6,1],
             "pure translate matrix");

        // JD: A word of caution---when dealing with floating point,
        //     JavaScript implementations might sometimes differ.
        //     Make sure to run this in multiple browsers to see
        //     if there are discrepancies.  Safest scenario in case
        //     JavaScript implementations yield different results is
        //     to build the expected expression into your expected
        //     answer instead of a literal.
        //
        //     Now, for *this* particular test, results are consistent
        //     in Chrome, Firefox, and Safari.  So I don't think you
        //     have to tweak this, but just be aware that this might
        //     happen with future tests.
        deepEqual(m.getRotationMatrix(Math.PI,0,0,1).elements,
            [0.9984971498638638,-0.054803665148789524,0,0,
             0.054803665148789524,0.9984971498638638,0,0,
             0,0,1,0,
             0,0,0,1],
             "pure rotate matrix");

    });
    
    test("Matrices functions", function () {
        var x = new Matrix4x4(
                [0,2,3,1,
                 5,6,3,7,
                 9,7,4,0,
                 1,2,1,0]
            ),
            y = new Matrix4x4(
                [0,5,2,1,
                 3,9,4,7,
                 1,3,4,2,
                 0,3,3,1]
            );
            
        deepEqual(x.multiplyMatrices(y).elements,
            [9,30,23,21,
             21,109,67,60,
             25,120,62,66,
             7,26,14,17],
             "matrix multiplication");
             
        deepEqual(ortho(-5,5,-2,2,1,-1).elements,
            [0.2,0,0,0,
             0,0.5,0,0,
             0,0,1,0,
             0,0,0,1],
             "matrix ortho");

        deepEqual(frustrum(-5,5,-2,2,1,-1).elements,
            [0.2,0,0,0,
             0,0.5,0,0,
             0,0,0,1,
             0,0,-1,0],
             "matrix frustrum");
    });

});

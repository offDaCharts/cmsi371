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
            
        deepEqual(m.getScaleMatrix(2, 5, 21).elements,
            [2,0,0,0,
             0,5,0,0,
             0,0,21,0,
             0,0,0,1],
             "pure scale matrix");
             
        deepEqual(m.getTranslateMatrix(4, 5, 6).elements,
            [1,0,0,0,
             0,1,0,0,
             0,0,1,0,
             4,5,6,1],
             "pure translate matrix");
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
    });

});

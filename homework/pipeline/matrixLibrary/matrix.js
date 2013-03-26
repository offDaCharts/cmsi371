/*
 * This JavaScript file defines a Vector object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Vector objects, and never modify the operands.  This is a design choice.
 *
 * This module is designed for vectors of any number of dimensions.  The
 * implementations are generalized but not optimal for certain sizes of
 * vectors.  Specific Vector2D and Vector3D implementations can be much
 * more compact, while sacrificing generality.
 */
var Matrix4x4 = (function () {
    // Define the constructor.
    var matrix4x4 = function () {
        this.elements = arguments.length ?
        [].slice.call(arguments) :
        [1,0,0,0,
         0,1,0,0,
         0,0,1,0,
         0,0,0,1];
    };

    matrix4x4.prototype.getScaleMatrix = function (sx,sy,sz) {
        return new Matrix4x4(
                sx,0,0,0,
                0,sy,0,0,
                0,0,sz,0,
                0,0,0,1);
    };

        
    matrix4x4.prototype.getTranslateMatrix = function (dx,dy,dz) {
        return new Matrix4x4(
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                dx,dy,dz,1);
    };
    
    matrix4x4.prototype.multiplyMatrices = function (m) {
        var y,
            x,
            result = new Matrix4x4(),
            getValueAt = function(m1, m2, x, y) {
                var i,
                    sum = 0;
                    
                for(i = 0; i < 4; i++) {
                    sum += m1[y*4+i]*m2[i*4+x];
                }
                
                return sum;
            };
            
        for(y = 0; y < 4; y++) {
            for(x = 0; x < 4; x++) {
                result.elements[y*4+x] = getValueAt(this.elements[0], m.elements[0], x, y);
            }
        }
        
        
        return result;
    };

    

    return matrix4x4;
})();

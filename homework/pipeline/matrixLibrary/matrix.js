/*
 * This JavaScript file defines a Matrix4x4 object and associated functions.
 * The object itself is returned as the result of a function, allowing us
 * to encapsulate its code and module variables.
 *
 * This module's approach is non-destructive: methods always return new
 * Matrix objects, and never modify the operands.  This is a design choice.
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
    
    //Matrix for scaling objects
    matrix4x4.getScaleMatrix = function (sx,sy,sz) {
        return new Matrix4x4(
                sx,0,0,0,
                0,sy,0,0,
                0,0,sz,0,
                0,0,0,1);
    };

    //Matrix for translating objects
    matrix4x4.getTranslateMatrix = function (dx,dy,dz) {
        return new Matrix4x4(
                1,0,0,dx,
                0,1,0,dy,
                0,0,1,dz,
                0,0,0,1);
    };

    //Matrix for moving camera
    matrix4x4.getCameraMatrix = function (px,py,pz,qx,qy,qz,ux,uy,uz) {
        var zex,
            zey,
            zez,
            zmag,
            
            zdotu,
            zmagSquared,
            zex,
            zey,
            zez,
            projx,
            projy,
            projz,
            
            yex,
            yey,
            yez,
            ymag,
            
            xex,
            xey,
            xez;
            
        zex = px - qx;
        zey = py - qy;
        zez = pz - qz;
        zmag  = Math.sqrt(zex*zex+zey*zey+zez*zez);
        
        zex = zex/zmag;
        zey = zey/zmag;
        zez = zez/zmag;
        
        //y = up-proj(up,ze)
        zdotu = zex*ux+zey*uy+zez*uz;
        zdotz = zex*zex+zey*zey+zez*zez;
        
        projx = zdotu/zdotz*zex;
        projy = zdotu/zdotz*zey;
        projz = zdotu/zdotz*zez;
        
        yex = ux - projx;
        yey = uy - projy;
        yez = uz - projz;
        
        ymag = Math.sqrt(yex*yex+yey*yey+yez*yez);
        
        yex = yex/ymag;
        yey = yey/ymag;
        yez = yez/ymag;
        
        //y cross z
        xex = yey*zez-yez*zey;
        xey = yez*zex-yex*zez;
        xez = yex*zey-yey*zex;
        
        return new Matrix4x4(
                xex,xey,xez,-1*(px*xex+py*xey+pz*xez),
                yex,yey,yez,-1*(px*yex+py*yey+pz*yez),
                zex,zey,zez,-1*(px*zex+py*zey+pz*zez),                
                0,0,0,1);
    };

    //Matrix for rotating objects
    matrix4x4.getRotationMatrix = function (angle, x, y, z) {
        var axisLength = Math.sqrt((x * x) + (y * y) + (z * z)),
            s = Math.sin(angle * Math.PI / 180.0),
            c = Math.cos(angle * Math.PI / 180.0),
            oneMinusC = 1.0 - c,

            // We can't calculate this until we have normalized
            // the axis vector of rotation.
            x2, // "2" for "squared."
            y2,
            z2,
            xy,
            yz,
            xz,
            xs,
            ys,
            zs;

        // Normalize the axis vector of rotation.
        x /= axisLength;
        y /= axisLength;
        z /= axisLength;

        // *Now* we can calculate the other terms.
        x2 = x * x;
        y2 = y * y;
        z2 = z * z;
        xy = x * y;
        yz = y * z;
        xz = x * z;
        xs = x * s;
        ys = y * s;
        zs = z * s;

        return new Matrix4x4(
            (x2 * oneMinusC) + c, (xy * oneMinusC) - zs, (xz * oneMinusC) + ys, 0,
            (xy * oneMinusC) + zs, (y2 * oneMinusC) + c, (yz * oneMinusC) - xs, 0,
            (xz * oneMinusC) - ys, (yz * oneMinusC) + xs, (z2 * oneMinusC) + c, 0,
            0, 0, 0, 1
        );
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
                result.elements[y*4+x] = getValueAt(this.elements, m.elements, x, y);
            }
        }
        
        
        return result;
    };
    
    //Covert from row order to collumn order
    matrix4x4.prototype.conversionConvenience = function () {
        var x,
            y,
            flippedMatrix = new Matrix4x4();
            
        for(y = 0; y < 4; y++) {
            for(x = 0; x < 4; x++) {
                flippedMatrix.elements[y*4+x] = this.elements[x*4+y];
            }
        }
        
        return flippedMatrix;
    };
    
    matrix4x4.ortho = function (left, right, bottom, top, front, back) {
            return new Matrix4x4(
                2.0/(right-left),0,0,-(right+left)/(right-left),
                0,2.0/(top-bottom),0,-(top+bottom)/(top-bottom),
                0,0,-2.0/(back-front),-(back+front)/(back-front),
                0,0,0,1
            );
    }
    
    matrix4x4.frustum = function (left, right, bottom, top, front, back) {
            return new Matrix4x4(
                2.0*front/(right-left),0,(right+left)/(right-left),0,
                0,2.0*front/(top-bottom),(top+bottom)/(top-bottom),0,
                0,0,-(front+back)/(back-front),-2.0*front*back/(back-front),
                0,0,-1,0
            );
    }

    return matrix4x4;
})();

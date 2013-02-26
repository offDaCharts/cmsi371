/*
 * This is a very simple module that demonstrates rudimentary,
 * pixel-level image processing using a pixel's "neighborhood."
 */
var NanoshopNeighborhood = {
    /*
     * A basic "darkener"---this one does not even use the entire pixel neighborhood;
     * just the exact current pixel like the original Nanoshop.
     */
    darkener: function (rgbaNeighborhood) {
        return [
            rgbaNeighborhood[4].r / 2,
            rgbaNeighborhood[4].g / 2,
            rgbaNeighborhood[4].b / 2,
            rgbaNeighborhood[4].a
        ];
    },

    /*
     * A basic "averager"---this one returns the average of all the pixels in the
     * given neighborhood.
     */
    averager: function (rgbaNeighborhood) {
        var rTotal = 0,
            gTotal = 0,
            bTotal = 0,
            aTotal = 0,
            i;

        for (i = 0; i < 9; i += 1) {
            rTotal += rgbaNeighborhood[i].r;
            gTotal += rgbaNeighborhood[i].g;
            bTotal += rgbaNeighborhood[i].b;
            aTotal += rgbaNeighborhood[i].a;
        }

        return [ rTotal / 9, gTotal / 9, bTotal / 9, aTotal / 9 ];
    },
    
    diagonalBlurr: function (rgbaNeighborhood) {
        return [ (rgbaNeighborhood[0].r + rgbaNeighborhood[4].r + rgbaNeighborhood[8].r) / 3,
                (rgbaNeighborhood[0].g + rgbaNeighborhood[4].g + rgbaNeighborhood[8].g) / 3,
                (rgbaNeighborhood[0].b + rgbaNeighborhood[4].b + rgbaNeighborhood[8].b) / 3,
                (rgbaNeighborhood[0].a + rgbaNeighborhood[4].a + rgbaNeighborhood[8].a) / 3,];
    },
    
    random: function (rgbaNeighborhood) {
        return [ rgbaNeighborhood[Math.floor(Math.random() * 9)].r,
                rgbaNeighborhood[Math.floor(Math.random() * 9)].g,
                rgbaNeighborhood[Math.floor(Math.random() * 9)].b,
                rgbaNeighborhood[Math.floor(Math.random() * 9)].a];
    },

    /*
     * Applies the given filter to the given ImageData object,
     * then modifies its pixels according to the given filter.
     *
     * A filter is a function ({r, g, b, a}[9]) that returns another
     * color as a 4-element array representing the new RGBA value
     * that should go in the center pixel.
     */
    applyFilter: function (imageData, filter) {
        // For every pixel, replace with something determined by the filter.
        var i,
            j,
            max,
            iAbove,
            iBelow,
            pixel,
            pixelArray = imageData.data,

            // A convenience function for creating an rgba object.
            rgba = function (startIndex) {
                return {
                    r: pixelArray[startIndex],
                    g: pixelArray[startIndex + 1],
                    b: pixelArray[startIndex + 2],
                    a: pixelArray[startIndex + 3]
                };
            };

        for (i = 0, max = imageData.width * imageData.height * 4; i < max; i += 4) {
            // The 9-color array that we build must factor in image boundaries.
            // If a particular location is out of range, the color supplied is that
            // of the extant pixel that is adjacent to it.
            iAbove = i - (imageData.width * 4);
            iBelow = i + (imageData.width * 4);

            pixel = filter([
                // The row of pixels above the current one.
                pixelArray[iAbove - 4] ? rgba(iAbove - 4) :
                    (pixelArray[i - 4] ? rgba(i - 4) : rgba(i)),

                pixelArray[iAbove] ? rgba(iAbove) : rgba(i),

                pixelArray[iAbove + 4] ? rgba(iAbove + 4) :
                    (pixelArray[i + 4] ? rgba(i + 4) : rgba(i)),

                // The current row of pixels.
                pixelArray[i - 4] ? rgba(i - 4) : rgba(i),

                // The center pixel: the filter's returned color goes here
                // (based on the loop, we are at least sure to have this).
                rgba(i),

                pixelArray[i + 4] ? rgba(i + 4) : rgba(i),

                // The row of pixels below the current one.
                pixelArray[iBelow - 4] ? rgba(iBelow - 4) :
                    (pixelArray[i - 4] ? rgba(i - 4) : rgba(i)),

                pixelArray[iBelow] ? rgba(iBelow) : rgba(i),

                pixelArray[iBelow + 4] ? rgba(iBelow + 4) :
                    (pixelArray[i + 4] ? rgba(i + 4) : rgba(i))
            ]);

            // Apply the color that is returned by the filter.
            for (j = 0; j < 4; j += 1) {
                pixelArray[i + j] = pixel[j];
            }
        }

        return imageData;
    }
};

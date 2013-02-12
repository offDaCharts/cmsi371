/*
 * Library of draw functions to draw sprites
 */
var getDrawLibrary = function() { 
    return drawLib = {
        square: [
            function (renderingContext) {
                renderingContext.fillStyle = "blue";
                renderingContext.fillRect(-20, -20, 40, 40);
            },
            function (renderingContext) {
                renderingContext.fillStyle = "red";
                renderingContext.fillRect(-20, -20, 40, 40);
            }],

        circle: [function (renderingContext) {
            renderingContext.strokeStyle = "red";
            renderingContext.beginPath();
            renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
            renderingContext.stroke();
        }],
        
        wireCube: [function (renderingContext) {
            var sideLength = 100,
            // JD: Wow, now that's what I call precision :)
            angle = Math.PI/6,
            scaleDiagonals = 0.75,
            offset = {x: scaleDiagonals * Math.cos(angle), y: scaleDiagonals * Math.sin(angle)},
            // JD: OK, if we are picking nits, note that you could also have
            //     used canvas.width and canvas.height below.
            current = {x: 0, y: 0};
            
            //Draw grid frame    
            renderingContext.beginPath();
            renderingContext.moveTo(current.x, current.y);
            renderingContext.lineTo(
                current.x + offset.x * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.lineTo(
                current.x + offset.x * sideLength, current.y - (offset.y + 1) * sideLength
            );
            renderingContext.moveTo(current.x, current.y);
            renderingContext.lineTo(current.x, current.y -= sideLength);
            renderingContext.lineTo(
                current.x + offset.x * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.lineTo(
                current.x + (offset.x - 1) * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.moveTo(current.x, current.y);
            renderingContext.lineTo(current.x -= sideLength, current.y);
            renderingContext.lineTo(   
                current.x + offset.x * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.lineTo(
                current.x + offset.x * sideLength, current.y - (offset.y - 1) * sideLength
            );
            renderingContext.moveTo(current.x, current.y);
            renderingContext.lineTo(current.x, current.y += sideLength);
            renderingContext.lineTo(
                current.x + offset.x * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.lineTo(
                current.x + (offset.x + 1) * sideLength, current.y - offset.y * sideLength
            );
            renderingContext.moveTo(current.x, current.y);
            renderingContext.lineTo(current.x += sideLength, current.y);

        
            renderingContext.lineWidth = 1;
            renderingContext.strokeStyle = "green";
            renderingContext.stroke();
        }],
        
        planet: [
            function (renderingContext) {
                renderingContext.strokeStyle = "blue";
                renderingContext.beginPath();
                renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
                renderingContext.stroke();
            }, 
            function (renderingContext) {
                renderingContext.strokeStyle = "red";
                renderingContext.beginPath();
                renderingContext.arc(0, 0, 50, 0, Math.PI * 2);
                renderingContext.stroke();
            }
        ],
        
        planetWithRing: [function (renderingContext) {
            var circleCenter = {x: 0, y: 0},
                radialGradientPlanet = renderingContext.createRadialGradient(
                    circleCenter.x - 96, circleCenter.y - 96, 1, circleCenter.x - 76, circleCenter.y - 76, 320
                ),
                radialGradientRing = renderingContext.createRadialGradient(
                    circleCenter.x - 96, circleCenter.y - 96, 1, circleCenter.x - 76, circleCenter.y - 76, 320
                ),
                circleRadius = 200,
                ringStartOffset = {x: 256, y: 0},
                controlPointOffset = {x: 256, y: 50};
            
            radialGradientPlanet.addColorStop(0, "white");
            radialGradientPlanet.addColorStop(1, "blue");
            radialGradientRing.addColorStop(0, "white");
            radialGradientRing.addColorStop(1, "red");

            
            //Draw back half of ring
            renderingContext.beginPath();
            renderingContext.moveTo(circleCenter.x + ringStartOffset.x, circleCenter.y - ringStartOffset.y);
            renderingContext.quadraticCurveTo(
                circleCenter.x + controlPointOffset.x, circleCenter.y - controlPointOffset.y,
                circleCenter.y, circleCenter.y - controlPointOffset.y
            );
            renderingContext.quadraticCurveTo(
                circleCenter.x - controlPointOffset.x, circleCenter.y - controlPointOffset.y,
                circleCenter.x - ringStartOffset.x, circleCenter.y - ringStartOffset.y
            );

            
            renderingContext.lineWidth = 25;
            renderingContext.strokeStyle = radialGradientRing;
            renderingContext.stroke();

            //Draw planet
            renderingContext.fillStyle = radialGradientPlanet;
            renderingContext.beginPath();
            renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
            renderingContext.fill();
            
            //Draw front half of ring
            renderingContext.beginPath();
            renderingContext.moveTo(circleCenter.x + ringStartOffset.x, circleCenter.y - ringStartOffset.y);
            renderingContext.quadraticCurveTo(
                circleCenter.x + controlPointOffset.x, circleCenter.y + controlPointOffset.y,
                circleCenter.y, circleCenter.y + controlPointOffset.y
            );
            renderingContext.quadraticCurveTo(
                circleCenter.x - controlPointOffset.x, circleCenter.y + controlPointOffset.y,
                circleCenter.x - ringStartOffset.x, circleCenter.y - ringStartOffset.y
            );
            
            
            renderingContext.strokeStyle = radialGradientRing;
            renderingContext.stroke();

        }],
        
        sun: [
            function (renderingContext) {
                var circleCenter = {x: 0, y: 0},
                radialGradientSun = renderingContext.createRadialGradient(
                    circleCenter.x - 96, circleCenter.y - 96, 1, circleCenter.x - 76, circleCenter.y - 76, 320
                ),
                circleRadius = 200;
                
                radialGradientSun.addColorStop(0, "red");
                radialGradientSun.addColorStop(1, "orange");
                
                renderingContext.fillStyle = radialGradientSun;
                renderingContext.beginPath();
                renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
                renderingContext.fill();

            },
            function (renderingContext) {
                var circleCenter = {x: 0, y: 0},
                radialGradientSun = renderingContext.createRadialGradient(
                    circleCenter.x + 96, circleCenter.y - 96, 1, circleCenter.x + 76, circleCenter.y - 76, 320
                ),
                circleRadius = 200;
                
                radialGradientSun.addColorStop(0, "red");
                radialGradientSun.addColorStop(1, "orange");
                
                renderingContext.fillStyle = radialGradientSun;
                renderingContext.beginPath();
                renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
                renderingContext.fill();

            },
            function (renderingContext) {
                var circleCenter = {x: 0, y: 0},
                radialGradientSun = renderingContext.createRadialGradient(
                    circleCenter.x + 96, circleCenter.y + 96, 1, circleCenter.x + 76, circleCenter.y + 76, 320
                ),
                circleRadius = 200;
                
                radialGradientSun.addColorStop(0, "red");
                radialGradientSun.addColorStop(1, "orange");
                
                renderingContext.fillStyle = radialGradientSun;
                renderingContext.beginPath();
                renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
                renderingContext.fill();

            },
            function (renderingContext) {
                var circleCenter = {x: 0, y: 0},
                radialGradientSun = renderingContext.createRadialGradient(
                    circleCenter.x - 96, circleCenter.y + 96, 1, circleCenter.x - 76, circleCenter.y + 76, 320
                ),
                circleRadius = 200;
                
                radialGradientSun.addColorStop(0, "red");
                radialGradientSun.addColorStop(1, "orange");
                
                renderingContext.fillStyle = radialGradientSun;
                renderingContext.beginPath();
                renderingContext.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2, true);
                renderingContext.fill();

            }
        ],
        
        background: function(renderingContext) {
            renderingContext.fillStyle = "black";
            renderingContext.fillRect(0, 0, canvas.width, canvas.height);
        }
    };
};

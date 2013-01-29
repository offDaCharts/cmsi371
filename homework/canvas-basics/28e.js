(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        linGradSky = renderingContext.createLinearGradient(256, -200, 256, 400),
        linGradGround = renderingContext.createLinearGradient(256, 100, 256, 700),
        coordY = 450,
        buildSpacing = 20,
        winSpacing = 10,
        levelSpacing = 20,
        levelHeight = 50,
        winHeight = levelHeight-levelSpacing;
    
    //Add color stops
    linGradSky.addColorStop(0, "black");
    linGradSky.addColorStop(1, "blue");
    linGradGround.addColorStop(0, "green");
    linGradGround.addColorStop(1, "black");

    //Draw sky
    renderingContext.fillStyle = linGradSky;
    renderingContext.fillRect(0, 0, 512, 350);

    //Draw ground
    renderingContext.fillStyle = linGradGround;
    renderingContext.fillRect(0, 350, 512, 312);
    
    //Pick random number of buildings
    var numBuild = Math.floor((Math.random()*5+2));
    var width = (512-(numBuild+1)*buildSpacing)/numBuild; 
    
    for(var i = 0; i < numBuild; i++) {
        var numLevel = Math.floor((Math.random()*5+2));;
        var numWindow = Math.floor((Math.random()*3+1));;
        renderingContext.fillStyle = "black";
        renderingContext.fillRect(buildSpacing*(i+1)+width*i, coordY-numLevel*levelHeight, width, numLevel*levelHeight);
        for(var j = 0; j < numLevel; j++) {
            var winWidth = (width-(numWindow+1)*winSpacing)/numWindow;
            for(var k = 0; k < numWindow; k++) {
                renderingContext.fillStyle = "yellow";
                var buildStart = buildSpacing*(i+1)+width*i;
                var winStart = winSpacing*(k+1)+winWidth*k;
                renderingContext.fillRect(buildStart+winStart, (coordY-numLevel*levelHeight+levelSpacing/2)+levelSpacing*j+winHeight*j, winWidth, winHeight);
            }
        }
    }

}());
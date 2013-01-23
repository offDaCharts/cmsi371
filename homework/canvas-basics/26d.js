(function () {
    var canvas = document.getElementById("canvas"),
        renderingContext = canvas.getContext("2d"),
        radius = 10;

    //Lavendar
    renderingContext.fillStyle = "#5C3317";
    renderingContext.fillRect(0, 0, canvas.width, canvas.height);
    
    renderingContext.fillStyle = "#FF00FF";
    for(var y = 0; y < canvas.height; y+= 2 * radius + 10) {
        for(var x = 15*((y/30)%2); x < canvas.width; x+= 2 * radius + 10) {
            renderingContext.arc(x, y, radius, 0, 2 * Math.PI, false);
            renderingContext.fill();
        }
    }
    

}());
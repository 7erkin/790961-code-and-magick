var CLOUD_HEIGHT = 270; 
var CLOUD_WIDTH = 420;
var SHIFT_SHADOW = 10;                         // the shadow's shift
var X_COOR_CLOUD = 100; 
var Y_COOR_CLOUD = 10;
var GISTOGRAM_HEIGHT = 150;
var GISTOGRAM_COLUMN_WIDTH = 40;
var GISTOGRAM_DISTANCE_BETWEEN_COLUMN = 50;
var GISTOGRAM_PLAYER_COLUMN_COLOUR = 'red';
var GISTOGRAM_LABELAREA_HEIGHT = 30;           // area for players name
var GISTOGRAM_LABEL_SHIFT = 15;                // labels margin from nearest block

getMaxValue = function(array){
    var temp = array[0]; 
    for(var i = 1; i < array.length; ++i)
        if(array[i] > temp)
            temp = array[i];
    return temp;
}

renderParametersCreator = function(ctx){        // some kind of "fabric" 
    var renderObjectParameters = {
        renderCloudParameters: {context: ctx, x: X_COOR_CLOUD, y: Y_COOR_CLOUD, width: CLOUD_WIDTH, height: CLOUD_HEIGHT, color: 'white'},
        renderShadowCloudParameters: {context: ctx, x: X_COOR_CLOUD + SHIFT_SHADOW, y: Y_COOR_CLOUD + SHIFT_SHADOW, width: CLOUD_WIDTH, height: CLOUD_HEIGHT,
            color: 'rgba(0, 0, 0, 0.7)'},
        renderGistogramParameters: {context: ctx, height: GISTOGRAM_HEIGHT, columnWidth: GISTOGRAM_COLUMN_WIDTH,
             distanceBetweenColumn: GISTOGRAM_DISTANCE_BETWEEN_COLUMN, colorColumnPlayer: GISTOGRAM_PLAYER_COLUMN_COLOUR}
    };
    return renderObjectParameters;
}

renderCloud = function(renderParameters){
    renderParameters.context.fillStyle = renderParameters.color;
    renderParameters.context.fillRect(renderParameters.x, renderParameters.y, renderParameters.width, renderParameters.height);
}

renderGistogram = function(renderParameters, names, times){
    var maxValue = getMaxValue(times);
    renderParameters.context.fillStyle = 'black';
    renderParameters.context.font = "16px PT Mono";
    // shift parameters has been used because of TEXT IS COVERED WITH CLOUD!
    renderParameters.context.fillText("Ура вы победили!", X_COOR_CLOUD + 50, Y_COOR_CLOUD + GISTOGRAM_LABEL_SHIFT);     // shift parameters
    renderParameters.context.fillText("Список результатов:", X_COOR_CLOUD + 50, Y_COOR_CLOUD + 2 * GISTOGRAM_LABEL_SHIFT);  // shift parameters
    for(var i = 0; i < names.length; ++i){
        renderParameters.context.fillStyle = (names[i] == 'Вы') ? GISTOGRAM_PLAYER_COLUMN_COLOUR : 'rgba(' + Math.random() * 255 + ', 255, ' + Math.random() * 255 + ', 1)';
        var delta = GISTOGRAM_HEIGHT * (1 - times[i]/maxValue);
        var xCoorRectangle = X_COOR_CLOUD + GISTOGRAM_DISTANCE_BETWEEN_COLUMN + (GISTOGRAM_COLUMN_WIDTH + GISTOGRAM_DISTANCE_BETWEEN_COLUMN) * i;
        var yCoorRectangle = Y_COOR_CLOUD + CLOUD_HEIGHT - GISTOGRAM_HEIGHT + delta;
        var heightRectangle = GISTOGRAM_HEIGHT - GISTOGRAM_LABELAREA_HEIGHT - delta;
        renderParameters.context.fillRect(xCoorRectangle, yCoorRectangle, GISTOGRAM_COLUMN_WIDTH, heightRectangle);
        renderParameters.context.fillStyle = 'black';
        renderParameters.context.fillText(Math.round(times[i]), xCoorRectangle, yCoorRectangle - GISTOGRAM_LABEL_SHIFT / 2); 
        renderParameters.context.fillText(names[i], xCoorRectangle, yCoorRectangle + heightRectangle + GISTOGRAM_LABEL_SHIFT);        
    }
} 

window.renderStatistics = function(ctx, names, times){
    renderObjectsParameters = renderParametersCreator(ctx);
    renderCloud(renderObjectsParameters.renderShadowCloudParameters);         
    renderCloud(renderObjectsParameters.renderCloudParameters);
    renderGistogram(renderObjectsParameters.renderGistogramParameters, names, times);
}
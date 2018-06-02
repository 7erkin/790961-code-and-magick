var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var SHIFT_SHADOW = 10;
var X_COOR_CLOUD = 100;
var Y_COOR_CLOUD = 10;
var GISTOGRAM_HEIGHT = 150;
var GISTOGRAM_COLUMN_WIDTH = 40;
var GISTOGRAM_DISTANCE_BETWEEN_COLUMN = 50;
var GISTOGRAM_PLAYER_COLUMN_COLOUR = 'black';
var GISTOGRAM_LABELAREA_HEIGHT = 30;

getMaxValue = function(array){
    var temp = array[0]; 
    for(var i = 1; i < array.length; ++i)
        if(array[i] > temp)
            temp = array[i];
    return temp;
}

renderParametersCreator = function(ctx){
    var renderObjectParameters = {
        renderCloudParameters: {context: ctx, x: X_COOR_CLOUD, y: Y_COOR_CLOUD, width: CLOUD_WIDTH, height: CLOUD_HEIGHT, color: 'white'},
        renderShadowCloudParameters: {context: ctx, x: X_COOR_CLOUD + SHIFT_SHADOW, y: Y_COOR_CLOUD + SHIFT_SHADOW, width: CLOUD_WIDTH, height: CLOUD_HEIGHT,
            color: 'black'},
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
    for(var i = 0; i < names.length; ++i){
        renderParameters.context.fillStyle = (names[i] == 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(' + Math.random() * 255 + ', 255, ' + Math.random() * 255 + ', 1)';
        var temp = GISTOGRAM_HEIGHT * (1 - times[i]/maxValue);
        renderParameters.context.fillRect(X_COOR_CLOUD + GISTOGRAM_DISTANCE_BETWEEN_COLUMN + (GISTOGRAM_COLUMN_WIDTH + GISTOGRAM_DISTANCE_BETWEEN_COLUMN) * i,
                Y_COOR_CLOUD + CLOUD_HEIGHT - GISTOGRAM_HEIGHT + temp,
                GISTOGRAM_COLUMN_WIDTH, GISTOGRAM_HEIGHT - GISTOGRAM_LABELAREA_HEIGHT - temp);
    }
}

window.renderStatistics = function(ctx, names, times){
    renderObjectsParameters = renderParametersCreator(ctx);
    renderCloud(renderObjectsParameters.renderShadowCloudParameters);         
    renderCloud(renderObjectsParameters.renderCloudParameters);
    renderGistogram(renderObjectsParameters.renderGistogramParameters, names, times);
}
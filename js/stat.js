var CLOUD_WIDTH = 270;
var CLOUD_HEIGHT = 420;
var SHIFT_SHADOW = 10;
var X_COOR_CLOUD = 100;
var Y_COOR_CLOUD = 0;

getMaxValue = function(array){
    var temp = array[0]; 
    for(var i = 1; i < array.length; ++i)
        if(array[i] > temp)
            temp = array[i];
    return temp;
}

renderCloud = function(renderParameters){
    renderParameters.context.fillStyle = renderParameters.color;
    renderParameters.context.fillRect(renderParameters.x, renderParameters.y, renderParameters.height, renderParameters.width);
}

window.renderStatistics = function(ctx, names, times){
    var maxValue = getMaxValue(times);
    var renderCloudParameters = {context: ctx, x: X_COOR_CLOUD, y: Y_COOR_CLOUD, width: CLOUD_WIDTH, height: CLOUD_HEIGHT, color: 'white'};
    var renderShadowCloudParameters = {context: ctx, x: X_COOR_CLOUD + SHIFT_SHADOW, y: Y_COOR_CLOUD + SHIFT_SHADOW, width: CLOUD_WIDTH, height: CLOUD_HEIGHT,
         color: 'black'};
    renderCloud(renderShadowCloudParameters);         
    renderCloud(renderCloudParameters);
}
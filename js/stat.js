getMaxValue = function(array){
    var temp = array[0]; 
    for(var i = 1; i < array.length; ++i)
        if(array[i] > temp)
            temp = array[i];
    return temp;
}
window.renderStatistics = function(ctx, names, times){
    var maxValue = getMaxValue(times);
}
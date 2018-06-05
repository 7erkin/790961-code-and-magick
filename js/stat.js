'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var SHIFT_SHADOW = 10;
var X_COOR_CLOUD = 100;
var Y_COOR_CLOUD = 10;
var GISTOGRAM_HEIGHT = 150;
var GISTOGRAM_COLUMN_WIDTH = 40;
var GISTOGRAM_DISTANCE_BETWEEN_COLUMN = 50;
var GISTOGRAM_PLAYER_COLUMN_COLOUR = 'red';
var GISTOGRAM_LABELAREA_HEIGHT = 30;
var GISTOGRAM_LABEL_SHIFT = 15;

var getMaxValue = function (array) {
  var temp = array[0];
  for (var i = 1; i < array.length; ++i) {
    if (array[i] > temp) {
      temp = array[i];
    }
  }
  return temp;
};

var getRandomInit = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var randomColorGenerator = function () {
  var addColor = getRandomInit(0, 140);
  var redComponent = 0;
  var greenComponent = 0;
  var blueComponent = getRandomInit(150, 255);
  var aComponent = 1;
  return 'rgba(' + redComponent + ', ' + reenComponent + ', ' + blueComponent + ', ' + aComponent + ')';
};

var renderParametersCreator = function (ctx) {
  var renderObjectParameters = {
    renderCloudParameters: {
      context: ctx,
      x: X_COOR_CLOUD,
      y: Y_COOR_CLOUD,
      width: CLOUD_WIDTH,
      height: CLOUD_HEIGHT,
      color: 'white'
    },
    renderShadowCloudParameters: {
      context: ctx,
      x: X_COOR_CLOUD + SHIFT_SHADOW,
      y: Y_COOR_CLOUD + SHIFT_SHADOW,
      width: CLOUD_WIDTH,
      height: CLOUD_HEIGHT,
      color: 'rgba(0, 0, 0, 0.7)'
    },
    renderGistogramParameters: {
      context: ctx,
      height: GISTOGRAM_HEIGHT,
      columnWidth: GISTOGRAM_COLUMN_WIDTH,
      distanceBetweenColumn: GISTOGRAM_DISTANCE_BETWEEN_COLUMN,
      colorColumnPlayer: GISTOGRAM_PLAYER_COLUMN_COLOUR
    }
  };
  return renderObjectParameters;
};

var renderCloud = function (renderParameters) {
  renderParameters.context.fillStyle = renderParameters.color;
  renderParameters.context.fillRect(renderParameters.x, renderParameters.y, renderParameters.width, renderParameters.height);
};

var renderGistogramLabel = function () {
  renderParameters.context.fillStyle = 'black';
  renderParameters.context.font = '16px PT Mono';
  // shift parameters has been used because of TEXT IS COVERED WITH CLOUD!
  renderParameters.context.fillText('Ура вы победили!', X_COOR_CLOUD + 50, Y_COOR_CLOUD + GISTOGRAM_LABEL_SHIFT); // shift parameters
  renderParameters.context.fillText('Список результатов:', X_COOR_CLOUD + 50, Y_COOR_CLOUD + 2 * GISTOGRAM_LABEL_SHIFT); // shift parameters
};

var renderGistogramColumn = function () {
  var maxValue = getMaxValue(times);
  for (var i = 0; i < names.length; ++i) {
    renderParameters.context.fillStyle = (names[i] === 'Вы') ? GISTOGRAM_PLAYER_COLUMN_COLOUR : randomColorGenerator();
    var delta = GISTOGRAM_HEIGHT * (1 - times[i] / maxValue);
    var xCoorRectangle = X_COOR_CLOUD + GISTOGRAM_DISTANCE_BETWEEN_COLUMN + (GISTOGRAM_COLUMN_WIDTH + GISTOGRAM_DISTANCE_BETWEEN_COLUMN) * i;
    var yCoorRectangle = Y_COOR_CLOUD + CLOUD_HEIGHT - GISTOGRAM_HEIGHT + delta;
    var heightRectangle = GISTOGRAM_HEIGHT - GISTOGRAM_LABELAREA_HEIGHT - delta;
    renderParameters.context.fillRect(xCoorRectangle, yCoorRectangle, GISTOGRAM_COLUMN_WIDTH, heightRectangle);
    renderParameters.context.fillStyle = 'black';
    renderParameters.context.fillText(Math.round(times[i]), xCoorRectangle, yCoorRectangle - GISTOGRAM_LABEL_SHIFT / 2);
    renderParameters.context.fillText(names[i], xCoorRectangle, yCoorRectangle + heightRectangle + GISTOGRAM_LABEL_SHIFT);
  }
};

var renderGistogram = function (renderParameters, names, times) {
  renderGistogramLabel();
  renderGistogramColumn(renderParameters, names, times);
};

window.renderStatistics = function (ctx, names, times) {
  var renderObjectsParameters = renderParametersCreator(ctx);
  renderCloud(renderObjectsParameters.renderShadowCloudParameters);
  renderCloud(renderObjectsParameters.renderCloudParameters);
  renderGistogram(renderObjectsParameters.renderGistogramParameters, names, times);
};

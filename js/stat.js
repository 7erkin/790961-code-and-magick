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
  var redComponent = addColor;
  var greenComponent = addColor;
  var blueComponent = getRandomInit(150, 255);
  var aComponent = 1;
  return 'rgba(' + redComponent + ', ' + greenComponent + ', ' + blueComponent + ', ' + aComponent + ')';
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

var renderGistogramTitle = function (renderParameters) {
  renderParameters.context.fillStyle = 'black';
  renderParameters.context.font = '16px PT Mono';
  // shift parameters has been used because of TEXT IS COVERED WITH CLOUD!
  renderParameters.context.fillText('Ура вы победили!', X_COOR_CLOUD + 50, Y_COOR_CLOUD + GISTOGRAM_LABEL_SHIFT); // shift parameters
  renderParameters.context.fillText('Список результатов:', X_COOR_CLOUD + 50, Y_COOR_CLOUD + 2 * GISTOGRAM_LABEL_SHIFT); // shift parameters
};

var renderGistogramColumn = function (context, geometryColumn) {
  var alias = geometryColumn;
  context.fillStyle = alias.color;
  context.fillRect = (alias.xCoor, alias.yCoor, alias.width, alias.height);
  context.fillStyle = alias.upLabel.color;
  context.fillText(alias.upLabel.name, alias.upLabel.xCoor, alias.upLabel.yCoor);
  context.fillStyle = alias.downLabel.color;
  context.fillText(alias.downLabel.name, alias.downLabel.xCoor, alias.downLabel.yCoor);
};

var getGeometryColumns = function (renderParameters, names, times) {
  var maxValue = getMaxValue(times);
  var geometryColumns = [];
  var alias = geometryColumns;
  for (var i = 0; i < names.length; ++i) {
    var delta = GISTOGRAM_HEIGHT * (1 - times[i] / maxValue);
    alias[i] = {};
    alias[i].upLabel = {};
    alias[i].downLabel = {};
    alias[i].xCoor = X_COOR_CLOUD + GISTOGRAM_DISTANCE_BETWEEN_COLUMN + (GISTOGRAM_COLUMN_WIDTH + GISTOGRAM_DISTANCE_BETWEEN_COLUMN) * i;
    alias[i].yCoor = Y_COOR_CLOUD + CLOUD_HEIGHT - GISTOGRAM_HEIGHT + delta;
    alias[i].height = GISTOGRAM_HEIGHT - GISTOGRAM_LABELAREA_HEIGHT - delta;
    alias[i].width = GISTOGRAM_COLUMN_WIDTH;
    alias[i].color = (names === 'Вы') ? GISTOGRAM_PLAYER_COLUMN_COLOUR : randomColorGenerator();
    alias[i].upLabel.xCoor = alias[i].xCoor;
    alias[i].upLabel.yCoor = alias[i].yCoor - GISTOGRAM_LABEL_SHIFT / 2;
    alias[i].upLabel.name = Math.round(times[i]);
    alias[i].upLabel.color = 'black';
    alias[i].downLabel.xCoor = alias[i].xCoor;
    alias[i].downLabel.yCoor = alias[i].yCoor + alias[i].height + GISTOGRAM_LABEL_SHIFT;
    alias[i].downLabel.name = names[i];
    alias[i].downLabel.color = 'black';
  }
  return geometryColumns;
};

var renderGistogramColumns = function (renderParameters, names, times) {
  var geometryParameters = getGeometryColumns(renderParameters, names, times);
  for (var i = 0; i < names.length; ++i) {
    renderGistogramColumn(renderParameters.context, geometryParameters[i]);
  }
};

var renderGistogram = function (renderParameters, names, times) {
  renderGistogramTitle(renderParameters);
  renderGistogramColumns(renderParameters, names, times);
};

window.renderStatistics = function (ctx, names, times) {
  var renderObjectsParameters = renderParametersCreator(ctx);
  renderCloud(renderObjectsParameters.renderShadowCloudParameters);
  renderCloud(renderObjectsParameters.renderCloudParameters);
  renderGistogram(renderObjectsParameters.renderGistogramParameters, names, times);
};

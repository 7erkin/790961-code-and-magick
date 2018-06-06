var QUANTITY_WIZARDS = 4;

var showSetupBlock = function () {
    var domElement = document.querySelector('.setup');
    domElement.classList.remove('.hidden');
};

var wizards = {
    wizardsProperties: [],
    propertyPull: {
        firstNames: [ 
            'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
        ],
        lastNames: [
            'да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
        ],
        coatColors: [
            'rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
        ],
        eyesColors: [
            'black', 'red', 'blue', 'yellow', 'green'
        ]
    },
    initWizards: function (wizardsQuantity) {
        for(var i = 0; i < wizardsQuantity; ++i){
            this.wizardsProperties[i] = {};
            this.wizardsProperties[i].name = this.getName();
            this.wizardsProperties[i].coatColor = this.getColorCoat();
            this.wizardsProperties[i].eyesColor = this.getColorEyes();
        }
    },
    getName: function () {
        var indexFirstName = Math.round(Math.random() * this.propertyPull.firstNames.length);
        var indexLastName = Math.round(Math.random() * this.propertyPull.lastNames.length);
        return this.propertyPull.firstNames[indexFirstName] + ' ' + this.propertyPull.lastNames[indexLastName];
    },
    getColorCoat: function () {
        var index = Math.round(Math.random() * this.propertyPull.coatColors.length);
        return this.propertyPull.coatColors[index];
    },
    eyesColors: function () {
        var index = Math.round(Math.random() * this.propertyPull.eyesColors.length);
        return this.propertyPull.eyesColors[index];
    }
};

var showSetupSimilarBlock = function(wizards) {
    var template = document.querySelector('#similar-wizard-template').content.querySelector('div');
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < QUANTITY_WIZARDS; ++i) {
        var element = template.cloneNode(true);
        makeWizard(element, wizards.wizardsProperties[i]);
        fragment.appendChild(element);
    }
    var targetObject = document.querySelector('.setup-similar-list');
    targetObject.appendChild(fragment);
    targetObject.classList.remove('.hidden');
};

var makeWizard = function (element, wizardProperty) {
    element.querySelector('.setup-similar-label').textContent = wizardProperty.name;
    element.querySelector('.wizard-coat').style.fill = wizardProperty.coatColor;
    element.querySelector('.wizard-eyes').style.fill = wizardProperty.eyesColor;
};

wizards.initWizards(QUANTITY_WIZARDS);
showSetupBlock();
showSetupSimilarBlock(wizards);
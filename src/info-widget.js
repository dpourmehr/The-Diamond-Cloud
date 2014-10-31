define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var SequentialLayout = require('famous/views/SequentialLayout');
  
  var InfoWidget = function(options) {

    this.options = options || {};

    this.widgetLayout = new SequentialLayout({direction: 1});

    this.view = new View();

    this._initWidget();

  }

  InfoWidget.prototype.constructor = InfoWidget;

  InfoWidget.prototype.getWidget = function() {
    return this.widgetLayout;
  }

  InfoWidget.prototype.getView = function() {
    return this.view;
  }

  InfoWidget.prototype._initWidget = function() {
    var self = this;

    var surfaces = [];

    this.widgetLayout.sequenceFrom(surfaces);

    var glyphView = new View();

    var initTime = Date.now();
    var glyphMod = new Modifier({
      origin: [0.5, 0.5],
      transform: function() {
        if(self.options.spin == 'yes')
        return Transform.rotate(0, .002 * (Date.now() - initTime), 0);
      }
    });

    var glyphSurface = new Surface({
      content: '<img src=' + this.options.icon + ' width="24" height="24">',
      size: [24, 24],
      classes: ['backface']
    });

    var glyphBack = new Surface({
      size: [50, 50],
      properties: {
        backgroundColor: '#00FFCC',
        borderRadius: '25px',
        border: '2px solid #000'
      }
    });

    glyphView.add(glyphMod).add(glyphSurface);

    glyphView.add(new Modifier({transform: Transform.translate(0, 0, -1)})).add(glyphBack);

    var testView = new View();
    var testMod = new Modifier({
      size: [50, 50],
      origin: [0.5, 0.1],
      transform: Transform.translate(0, 0, 5)
    });

    testView.add(testMod).add(glyphView);

    surfaces.push(testView);

    var infoView = new View();

    var infoSurface = new Surface({
      size: [200, 150],
      content: this.options.title + '<br><br>' + this.options.content,
      properties: {
        color: 'black'
      },
      classes: ['info-background']
    });

    infoSurface.on('mouseenter', function() {
      var self2 = self;
      infoSurface.setProperties({
        backgroundColor: '#67ffe0',
        cursor: function() {
          if(self2.options.title == '<br>Vote Here' || self2.options.title == '<br>Weekly Changelog') {
            return 'pointer'
          }
        }()
      });
    });

    infoSurface.on('click', function() {
      self.view._eventOutput.emit(self.options.title);
    });

    infoSurface.on('mouseleave', function() {
      infoSurface.setProperties({
        backgroundColor: '#00FFCC'
      })
    })

    infoView.add(infoSurface);

    surfaces.push(infoView);


  }

  module.exports = InfoWidget;

});
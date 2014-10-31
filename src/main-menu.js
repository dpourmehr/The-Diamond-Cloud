define(function(require, exports, module) {
  //All the required classes used in this file

  var Engine = require('famous/core/Engine');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var SnapTransition = require('famous/transitions/SnapTransition');
  var Modifier = require('famous/core/Modifier');
  var Timer = require('famous/utilities/Timer');
  var View = require('famous/core/View');
  var Deck = require('famous/views/Deck');
  var SequentialLayout = require('famous/views/SequentialLayout');
  var TransitionableTransform = require('famous/transitions/TransitionableTransform');
  var SnapTransition = require('famous/transitions/SnapTransition');

  var MainMenu = function(options) {
    this.view = new View();

    var background = new Surface({
      size: [screen.width, 40],
      content: '',
      classes: ['navBar']
    });

    options = options || {};

    this.layout = new SequentialLayout({direction: 0});

    this.surfaces = [];

    this.layout.sequenceFrom(this.surfaces);

    this.view.add(new Modifier({transform: Transform.translate(0, 0, 2)})).add(this.layout);

    this.initItems();

  }

  View.prototype = Object.create(View.prototype);

  MainMenu.prototype.constructor = MainMenu;

  MainMenu.prototype.getView = function() {
    return this.view;
  }

  MainMenu.prototype.initItems = function() {

    var self = this;

    var firstItem = new Surface({
      content: 'Home',
      size: [100, 40],
      classes: ['button'],
      properties: {
        borderLeft: '1px solid #000'
      }
    });

    firstItem.on('click', function() {
      self.view._eventOutput.emit('home');
    });

    this.addListeners(firstItem);

    var secondItem = new Surface({
      content: 'Ranks and Commands',
      size: [200, 40],
      classes: ['button']
    });

    secondItem.on('click', function() {
      self.view._eventOutput.emit('commands');
    });

    this.addListeners(secondItem);

    var thirdItem = new Surface({
      content: 'Vote',
      size: [100, 40],
      classes: ['button']
    });

    thirdItem.on('click', function() {
      self.view._eventOutput.emit('vote');
    });

    this.addListeners(thirdItem);
	
	var applicationTT = new TransitionableTransform();
  applicationTT.setScale([1, 0, 1]);
  var applicationsLayout = new SequentialLayout({direction: 1});
  var views = [];
  applicationsLayout.sequenceFrom(views);
  
  
  
  var bottomMenu = new View();
  var bottomMod = new Modifier({transform: applicationTT});
  var bottomSeqLayout = new SequentialLayout({direction: 1});
  var bottomSurfaces = [];
  bottomSeqLayout.sequenceFrom(bottomSurfaces);
  
  bottomSeqLayout.sequenceFrom(bottomSurfaces);
  
	var fifthItem = new Surface({
    content: 'Applications',
    size: [120, 40],
    classes: ['button']
  });
  
  views.push(fifthItem);
  
  fifthItem.on('mouseenter', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 1, 1], {method: SnapTransition, period: 200, dampingRatio: .6});
  });
  
  fifthItem.on('mouseleave', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 0, 1], {duration: 200});
  });
  
  var builderApp = new Surface({
    content: 'Builder',
    size: [120, 40],
    properties: {
      textAlign: 'center',
      borderRight: '1px solid #000',
      borderLeft: '1px solid #000',
      lineHeight: '40px',
      backgroundColor: '#fff',
      color: '#000',
      borderBottom: '1px solid black'
    }
  });
  
  this.addListeners(builderApp);
  
  builderApp.on('mouseenter', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 1, 1], {method: SnapTransition, period: 100, dampingRatio: .1});
  });
  
  builderApp.on('mouseleave', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 0, 1], {duration: 200});
  });
  
  builderApp.on('click', function() {
    self.view._eventOutput.emit('builder');
  });
  
  bottomSurfaces.push(builderApp);
  
  var modApp = new Surface({
    content: 'Moderator',
    size: [100, 40],
    classes: ['button']
  });
  
  this.addListeners(modApp);
  
  modApp.on('mouseenter', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 1, 1], {method: SnapTransition, period: 700, dampingRatio: .4});
  });
  
  modApp.on('mouseleave', function() {
    applicationTT.halt();
    applicationTT.setScale([1, 0, 1], {duration: 200});
  });
  
  modApp.on('click', function() {
    self.view._eventOutput.emit('mod');
  });
  
  //bottomSurfaces.push(modApp);
  
  bottomMenu.add(bottomMod).add(bottomSeqLayout);
  views.push(bottomMenu);
  
  this.addListeners(fifthItem);

  var sixthItem = new Surface({
    content: 'Factions',
    size: [100, 40],
    classes: ['button'],
  });

  sixthItem.on('click', function() {
    self.view._eventOutput.emit('factions');
  });

  this.addListeners(sixthItem);

  var seventhItem = new Surface({
    content: 'Apply to join us!',
    size: [150, 40],
    classes: ['button']
  });

  seventhItem.on('click', function() {
    self.view._eventOutput.emit('apply');
  })

  this.addListeners(seventhItem);

  var eigthItem = new Surface({
    content: 'Submit Advertising Here',
    size: [200, 40],
    classes: ['button'],
    properties: {
      borderRight: '1px solid #000'
    }
  });

  eigthItem.on('click', function() {
    self.view._eventOutput.emit('submitAdvertising');
  });

  this.addListeners(eigthItem);


    this.surfaces.push(firstItem);
    this.surfaces.push(secondItem);
    this.surfaces.push(thirdItem);
    this.surfaces.push(applicationsLayout);
    this.surfaces.push(sixthItem);
    //this.surfaces.push(seventhItem);
    this.surfaces.push(eigthItem);
    //this.surfaces.push(new Surface({size:[screen.width - 500, 40], classes: ['button']}));

  }

  MainMenu.prototype.addListeners = function(surface) {

    surface.on('mouseenter', function() {
      surface.setProperties({
        color: '#6dcff6',
        cursor: 'pointer'
      });
    });

    surface.on('mouseleave', function() {
      surface.setProperties({
        color: '#000',
        cursor: 'initial'
      });
    });

  }

  module.exports = MainMenu;

});
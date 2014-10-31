define(function(require, exports, module) {
  'use strict';

  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var RenderController = require('famous/views/RenderController');
  var Modifier = require('famous/core/Modifier');
  var InputSurface = require('famous/surfaces/InputSurface');
  var GridLayout = require('famous/views/GridLayout');
  var Transform = require('famous/core/Transform');
  var ScrollView = require('./famous/views/Scrollview');
  var SequentialLayout = require('./famous/views/SequentialLayout');
  var ScrollContainer = require('./famous/views/ScrollContainer');
  var StateModifier = require('./famous/modifiers/StateModifier');
  var Utility = require('./famous/utilities/Utility');
  var ContainerSurface = require('./famous/surfaces/ContainerSurface');

  var Activities = require('./activities');

  var ActivityFeed = function(options) {
    this.options = options || {};

    this.sequentialLayout = new SequentialLayout({direction: 1});

    this.topBottom = [];

    this.sequentialLayout.sequenceFrom(this.topBottom);

    this.scrollView = new ScrollView({direction: 1, clipSize: 300});

    this.views = [];

    this.scrollView.sequenceFrom(this.views);

    this.scrollHeader = new View({
      size: [750, 65]
    });

    this._initHeader();
    this._initFeed();
  }

  ActivityFeed.prototype.constructor = ActivityFeed;

  ActivityFeed.prototype.getView = function() {
    return this.sequentialLayout;
  }

  ActivityFeed.prototype._initHeader = function() {
    var self = this;

    var emailActivity  = new Surface({
      size: [750, 65],
      content: 'Player Rank Commands (Scrolls down...)',
      classes: ['feedHeader'],
    });

    this.scrollHeader.add(emailActivity);

    var scrollHeaderIcons = new SequentialLayout({direction: 0, itemSpacing: 10});

    var icons = [];

    scrollHeaderIcons.sequenceFrom(icons);

    var refresh = new Surface({
      content: '<img src="./content/images/refresh-grey.png" width="15" height="16">',
      size: [20, 20],
      classes: ['feedHeaderIcon']
    });

    this.addHoverListener(refresh);

    refresh.on('click', function() {
      self.refresh();
    });

    icons.push(refresh);

    var filter = new Surface({
      content: '<img src="./content/images/search-grey.png" width="15" height="16">',
      size: [20, 20],
      classes: ['feedHeaderIcon']
    });

    this.addHoverListener(filter);

    filter.on('click', function() {
      self.showFilter();
    });

    icons.push(filter);

    var iconsModifier = new Modifier({
      origin: [.9, 0],
      transform: Transform.translate(0, 0, 0)
    });

    //this.scrollHeader.add(iconsModifier).add(scrollHeaderIcons);

    this.views.push(this.scrollHeader);
  }

  ActivityFeed.prototype._initFeed = function() {
    var self = this;

    var empty = new Surface({
      content: 'None found',
      size: [750, 50],
      classes: ['emptyFeed']
    });

    this.addHoverColor(empty);

    var mod = new Modifier({
      size: [750, 400]
    });

    var scrollContainer = new ScrollContainer({
      scrollview: { direction : 1}
    });

    var tempView = new View();

    var mainNode = tempView.add(mod);

    var tempSeqLayout = new SequentialLayout({direction: 1});
    tempSeqLayout.sequenceFrom(this.views);

    var tempArray = [];

    tempArray.push(tempSeqLayout);

    scrollContainer.sequenceFrom(tempArray);

    mainNode.add(scrollContainer);

    this.topBottom.push(mainNode);
  }

  ActivityFeed.prototype.getActivities = function() {

    var self = this;

    var activities = new Activities();

    for(var i = 0; i < activities.getNumbActivities(); i++) {

      if(i == 16) {
        var dwellerRank  = new Surface({
          size: [750, 65],
          content: 'Dweller Rank Commands',
          classes: ['feedHeader'],
        });

        var tempView = new View({
          size: [750, 65]
        });

        tempView.add(dwellerRank);

        this.views.push(tempView);
      }
      if(i == 17) {
        var citizenRank  = new Surface({
          size: [750, 65],
          content: 'Citizen Rank Commands',
          classes: ['feedHeader'],
        });

        var tempView = new View({
          size: [750, 65]
        });

        tempView.add(citizenRank);

        this.views.push(tempView);
      }
      if(i == 19) {
        var trustedRank  = new Surface({
          size: [750, 65],
          content: 'Trusted Rank Commands',
          classes: ['feedHeader'],
        });

        var tempView = new View({
          size: [750, 65]
        });

        tempView.add(trustedRank);

        this.views.push(tempView);
      }
      if(i == 21) {
        var modRank  = new Surface({
          size: [750, 65],
          content: 'Moderator Rank Commands',
          classes: ['feedHeader'],
        });

        var tempView = new View({
          size: [750, 65]
        });

        tempView.add(modRank);

        this.views.push(tempView);
      }
      if(i == 26) {
        var goldRank  = new Surface({
          size: [750, 65],
          content: 'Gold Premium Rank Commands',
          classes: ['feedHeader'],
        });

        var tempView = new View({
          size: [750, 65]
        });

        tempView.add(goldRank);

        this.views.push(tempView);
      }

      var status = activities.getStatus(i);
      var from = activities.getFrom(i);
      var subject = activities.getSubject(i);
      var time = activities.getTime(i);
      var actions = activities.getActions(i);

      var temp = this.createElement(status, from, subject, time, actions);
      temp.pipe(this.scrollView);

      this.views.push(temp);

    }

  }

  ActivityFeed.prototype.createElement = function(status, from, subject, time, actions) {
    var self = this;

    var view = new View({
      size: function() {
        if(actions == 0) {
          return [750, 65];
        }
        else return [750, 85];
      }()
    });

    var statSurface = new Surface({
      content: function() {
        if(status == 'read') {
          return '<img src="./content/images/read.png">'
        } else if(status == 'unread') {
          return '<img src="./content/images/unread.png">'
        }
      }(),
      size: [46, 46],
      classes: ['task-status']
    });

    var backgroundSurface = new Surface({
      size: function() {
        if(actions == 0) {
          return [750, 65];
        }
        else return [750, 85];
      }(),
      classes: ['task-background']
    });

    var fromSurface = new Surface({
      content: from,
      size: [500, 15],
      classes: ['task-from']
    });

    var subjectSurface = new Surface({
      content: subject,
      size: [500, 15],
      classes: ['task-subject']
    });

    var receivedTime = new Surface({
      content: 'Received ' + time,
      size: [100, 15],
      classes: ['task-received']
    });

    var actionsSurface = new Surface({
      content: actions + ' Actions',
      size: [300, 15],
      classes: ['task-actions']
    });

    var overLaySurface = new Surface({
      content: '',
      size: function() {
        if(actions == 0) return [750, 65];
        else return [750, 85];
      }(),
      classes: ['task-overlay']
    });

    view.add(backgroundSurface);
    view.add(statSurface);
    view.add(fromSurface);
    view.add(subjectSurface);
    if(actions != 0) {
      view.add(actionsSurface);
    }
    //view.add(new Modifier({origin: [0.9, 0]})).add(receivedTime);
    //view.add(new Modifier({opacity: 0})).add(overLaySurface);

    // overLaySurface.on('click', function() {
    //   alert('clicked');
    // });
    return view;

  }

  ActivityFeed.prototype.refresh = function() {
  } 

  ActivityFeed.prototype.showFilter = function() {
  } 

  ActivityFeed.prototype.addHoverColor = function(surface) {
    surface.on('mouseenter', function() {
      surface.setProperties({
        backgroundColor: '#fafafa'
      });
    });

    surface.on('mouseleave', function() {
      surface.setProperties({
        backgroundColor: '#fff'
      });
    });
  }

  ActivityFeed.prototype.addHoverListener = function(surface) {
    surface.on('mouseenter', function() {
      surface.setProperties({
        cursor: 'pointer'
      });
    });

    surface.on('mouseleave', function() {
      surface.setProperties({
        cursor: 'initial'
      });
    });
  }

  module.exports = ActivityFeed;

});
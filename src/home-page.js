define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var SequentialLayout = require('famous/views/SequentialLayout');

  var InfoWidget = require('./info-widget');
  var MainMenu = require('./main-menu');

  var HomePage = function() {

    this.view = new View();

    this.mainLayout = new SequentialLayout({direction: 1, itemSpacing: 100});

    this.sizeMod = new Modifier({
      align: [0.5, 0.5],
      size: [900, 300],
      origin: [0.5, 0.5]
    });

    this.renderables = [];

    var serverInfo = new Surface({
      size: [700, 150],
      content: 'The Diamond Cloud',
      classes: ['website-title']
    });


    this.mainLayout.sequenceFrom(this.renderables);

    this.infoLayout = new SequentialLayout({direction: function() {
      if(document.documentElement.clientWidth < 600) {
        return 1;
      } else return 0;
    }(), itemSpacing: 100});

    this.renderables.push(this.infoLayout);


    this._initPage();

  }

  HomePage.prototype.constructor = HomePage;

  HomePage.prototype.getView = function() {
    return this.mainLayout;
  }

  HomePage.prototype.getEmit = function() {
    return this.view;
  }

  HomePage.prototype.header = function() {
    var view = new View();

    var modifier = new Modifier({



    });

    var headerSurface = new Surface({
      size: [700, 300],
      content: '<img src="./content/images/header.png" width="700px" height="300px">'
    });

    view.add(modifier).add(headerSurface);

    return view;
  }

  HomePage.prototype._initPage = function() {

    var self = this;

    var infoMods = new Modifier({transform: Transform.translate(0, -50, 0)});
    var infoMods2 = new Modifier({transform: Transform.translate(0, -50, 0)});
    var infoMods3 = new Modifier({transform: Transform.translate(0, -50, 0)});

    var infos = [];

    this.infoLayout.sequenceFrom(infos);

    var ipView = new View();
    var ipInfo = new InfoWidget({
      spin: 'yes',
      title: '<br>Join using this IP',
      content: 'mc.thediamondcloud.com',
      icon: "./content/images/wifi.png"
    });

    ipView.add(infoMods).add(ipInfo.getWidget());

    var voteNow = new View();
    var voteInfo = new InfoWidget({
      spin: 'yes',
      title: '<br>Vote Here',
      content: 'Click here to vote',
      icon: "./content/images/vote1.png"
    });

    voteInfo.getView().on('<br>Vote Here', function() {
      self.view._eventOutput.emit('vote');
    });

    voteNow.add(infoMods2).add(voteInfo.getWidget());

    var changeLog = new View();
    var changeInfo = new InfoWidget({
      spin: 'yes',
      title: '<br>Weekly Changelog',
      content: 'Click to view Changelog',
      icon: "./content/images/grid.png"
    });

    changeLog.add(infoMods3).add(changeInfo.getWidget());

    infos.push(ipView);
    infos.push(voteNow);
    infos.push(changeLog);


  }

  module.exports = HomePage;

});
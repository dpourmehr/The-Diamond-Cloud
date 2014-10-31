define(function(require, exports, module) {
  //All the required classes used in this file

  var Engine = require('famous/core/Engine');
  var StateModifier = require('famous/modifiers/StateModifier');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var ContainerSurface = require('famous/surfaces/ContainerSurface');
  var Modifier = require('famous/core/Modifier');
  var Timer = require('famous/utilities/Timer');
  var Cube = require('./cube')
  var MainMenu = require('./main-menu');
  var RanksAndCommands = require('./ranks-and-commands');
  var View = require('famous/core/View');
  var RenderController = require('famous/views/RenderController');
  var mainContext = Engine.createContext();
  var SequentialLayout = require('famous/views/SequentialLayout');
  var VideoSurface = require('famous/surfaces/VideoSurface');

  var ActivityFeed = require('./activity-feed');
  var Activities = require('./activities');
  var VoteList = require('./vote-list');
  var HomePage = require('./home-page');

  var renderController = new RenderController();

  mainContext.setPerspective(1000);

  var serverInfo = new Surface({
    size: [600, 150],
    content: 'The Diamond Cloud',
    classes: ['website-title']
  });

  var menu = new MainMenu();

  mainContext.add(new Modifier({origin: [0.5, 0], transform: Transform.translate(0, 25, 1)})).add(serverInfo);
  mainContext.add(new Modifier({origin: [0.5, 0], transform: Transform.translate(0, 200, 1)})).add(menu.getView());

  var headerSurface = new Surface({
    size: [1200, 400],
    content: '<img src="./content/images/header.png" width="1200px" height="400px">'
  });

 // mainContext.add(new Modifier({origin: [0.5, 0.9]})).add(headerSurface);
  var ranksAndCommands = new RanksAndCommands();

  var middleModifier = new Modifier({
    origin: [0.5, 0],
    transform: Transform.translate(0, 300, 1),
    opacity: 1
  });

  var homePage = new HomePage();

  mainContext.add(middleModifier).add(renderController);

  menu.getView().on('home', function() {
    renderController.hide();


  renderController.show(homePage.getView());

  });


  var ranksShowing = false;

  menu.getView().on('commands', function() {
    
    var view = new View();
    var activityFeed = new ActivityFeed();
    var feedMod = new StateModifier({
      origin: [0.5, 0],
      opacity: 1,
      transform: Transform.multiply(Transform.scale(1, 1, 1), Transform.translate(0, -50, 5))
    });
    activityFeed.getActivities();
    view.add(feedMod).add(activityFeed.getView());

    renderController.show(view);

  });

  var votesShowing = false;

  menu.getView().on('vote', function() {

      renderController.hide();
      setTimeout(function(){
        renderController.show(new VoteList().getList());
      }, 300);

  });

  homePage.getEmit().on('vote', function() {

      renderController.hide();
      setTimeout(function(){
        renderController.show(new VoteList().getList());
      }, 300);

  });

  
  menu.getView().on('builder', function() {

      renderController.hide();
      setTimeout(function(){
        var builderApplication = new Surface({
          size: [640, 1050],
          content: '<iframe id="JotFormIFrame" onload="window.parent.scrollTo(0,0)" allowtransparency="true" src="http://form.jotform.us/form/42216275317148" frameborder="0" style="width:100%; height:865px; border:none;" scrolling="no"></iframe> <script type="text/javascript">window.handleIFrameMessage = function(e) {var args = e.data.split(":");var iframe = document.getElementById("JotFormIFrame");if (!iframe)return;switch (args[0]) {case "scrollIntoView":iframe.scrollIntoView();break;case "setHeight":iframe.style.height = args[1] + "px";break;}};if (window.addEventListener) {window.addEventListener("message", handleIFrameMessage, false);} else if (window.attachEvent) {window.attachEvent("onmessage", handleIFrameMessage);}</script>',
          classes: ['application']
        });

        var view = new View();
        var modifier = new Modifier({
          transform: Transform.translate(0, 0, 0)
        });

        view.add(modifier).add(builderApplication);
        renderController.show(view);}, 300);

  });

  menu.getView().on('submitAdvertising', function() {

      renderController.hide();
      setTimeout(function(){
        var submitAdvertising = new Surface({
          size: [640, 650],
          content: '<iframe id="JotFormIFrame" onload="window.parent.scrollTo(0,0)" allowtransparency="true" src="http://form.jotform.us/form/42217165206144" frameborder="0" style="width:100%; height:576px; border:none;" scrolling="no"></iframe> <script type="text/javascript">window.handleIFrameMessage = function(e) {var args = e.data.split(":");var iframe = document.getElementById("JotFormIFrame");if (!iframe)return;switch (args[0]) {case "scrollIntoView":iframe.scrollIntoView();break;case "setHeight":iframe.style.height = args[1] + "px";break;}};if (window.addEventListener) {window.addEventListener("message", handleIFrameMessage, false);} else if (window.attachEvent) {window.attachEvent("onmessage", handleIFrameMessage);}</script>',
          classes: ['application']
        });

        var view = new View();
        var modifier = new Modifier({
          transform: Transform.translate(0, 0, 0)
        });

        view.add(modifier).add(submitAdvertising);
        renderController.show(view);}, 300);

  });

  menu.getView().on('apply', function() {
    renderController.hide();

    var surface3 = new Surface({
      size: [640, 800],
      content: '<iframe width="640px" height="800" allowTransparency="true" frameborder="0" scrolling="yes" style="border:none" src="http://www.emailmeform.com/builder/embed/8q1G2wSN90a4vme696"><a href="http://www.emailmeform.com/builder/embed/8q1G2wSN90a4vme696">Fill out form.</a></iframe>' +
              '<div style="margin-top:18px;text-align:center"><div id="emf_advertisement"><font face="Verdana" size="2" color="#000000">Powered by</font><span style="position: relative; padding-left: 3px; bottom: -5px;"></span><font face="Verdana" size="2" color="#000000">EMF </font><a style="text-decoration:none;" href="http://www.emailmeform.com/" target="_blank"><font face="Verdana" size="2" color="#000000">Online Order Form</font></a></div></div>'
    });

    var view = new View();
    var modifier = new Modifier({
      transform: Transform.translate(0, 0, 0)
    });

    view.add(modifier).add(surface3);

    renderController.show(view);
  })

  menu.getView().on('factions', function() {
    renderController.hide();
  });

  //mainContext.add(new Modifier({origin: [0.5, 0], transform: Transform.translate(0, 300, 0)})).add(new Surface({size: [true, 40], content: 'SERVER IS NOW WHITELISTED! PLEASE CLICK ON "APPLY TO JOIN US!"', properties: {backgroundColor: "red", color: "white", classes:['importantInfo']}}));
  
  menu.getView()._eventOutput.emit('home');

});
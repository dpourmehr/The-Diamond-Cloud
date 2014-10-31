define(function(require, exports, module) {

  var ScrollView = require('famous/views/Scrollview');
  var Surface =require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');

  var RanksAndCommands = function(options) {

    options = options || {};

    this.scrollView = new ScrollView({
      size: [400, 300]
    });

    this.surfaces = [];

    this.scrollView.sequenceFrom(this.surfaces);

    this._initScrollView();

  }

  RanksAndCommands.prototype.constructor = RanksAndCommands;

  RanksAndCommands.prototype.getView = function() {
    return this.playerRanksAndCommands;
  }


  RanksAndCommands.prototype._initScrollView = function() {
    this.playerRanksAndCommands =  new Surface({
      size: [400, 300],
      content: '<center>Ranks and Commands</center><br>' +
               '<dl><dt>Player</dt>' + '<br><dd>Co-Owner of Chest   ---   /lock coowner player add [Name] ' + 
               '</dd><dd>Lock targeted chest (punch owned chest to target)   ---   /lock</dd>' +
               '<dd>Set self to AFK   ---   /afk</dd>' + 
               '<dd>Check Cloud Currency (C) balance   ---   /balance</dd>' +
               '<dd>Delete your home   ---   /delhome [playername]</dd>' +
               '<dd>Get your position   ---   /getpos</dd>' +
               '<dd>Message a modifier for help   ---   /helpop [message]</dd>' +
               '<dd>Go home   ---   /home</dd>' +
               '<dd>Retrieve a toolkit   ---   /kit tools</dd>' +
               '<dd>Message someone   ---   /msg [player] [message]</dd>' +
               '<dd>Pay someone   ---   /pay [player] [amount]</dd></dl>',
      classes: ['scrollView'],
      properties: {
        background: 'linear-gradient(#FFFFCC, #fff, #FFFFCC)',
        color: 'black',
        //textAlign: 'center',
        //lineHeight: '80px',
        borderRadius: '10px',
        verticalAlign: 'middle',
        boxShadow: '10px 10px 10px #888888'
      }

    });

    this.surfaces.push(this.playerRanksAndCommands);
  }

  module.exports = RanksAndCommands;
});
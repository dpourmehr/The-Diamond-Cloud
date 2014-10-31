define(function(require, exports, module) {

  var Engine = require('famous/core/Engine');
  var Surface = require('famous/core/Surface');
  var Transform = require('famous/core/Transform');
  var Modifier = require('famous/core/Modifier');
  var View = require('famous/core/View');
  var SequentialLayout = require('famous/views/SequentialLayout');

  var VoteList = function() {

    this.sequentialLayout = new SequentialLayout({
      direction: 1,
      itemSpacing: 30
    });

    this.adList = [];

    this.sequentialLayout.sequenceFrom(this.adList);

    this._initList();

  }


  VoteList.prototype.constructor = VoteList;

  VoteList.prototype.getList = function() {
    return this.sequentialLayout;
  }

  VoteList.prototype._initList = function() {
    this.adList.push(this.createVoteSlot('<a href="http://www.planetminecraft.com/server/the-diamond-cloud/vote/"><img src="http://static.planetminecraft.com/files/banner/616570_0.png" width="608px" height="72px"></a>')); 
    this.adList.push(this.createVoteSlot('<a href="http://topg.org/Minecraft/in-390373" target="_blank"><img src="http://topg.org/banner.jpg" border="0" alt="minecraft servers" width="608px" height="72px"></a>'));
    this.adList.push(this.createVoteSlot('<a href="http://minecraftservers.org/server/156171" target="_blank"><img src="http://status.minecraftservers.org/classic/156171.png" alt="The Diamond Cloud Minecraft server" width="608px" height="72px" /></a>'));
    this.adList.push(this.createVoteSlot('<a href="http://minecraftservers.net/server/76826/vote/"><img src="http://minecraftservers.net/status/server_76826.png" width="608px" height="72px" /></a>'));
   
  }

  VoteList.prototype.createVoteSlot = function(content) {
    var voteSlot = new View();
    var voteSlotMod = new Modifier({
      origin: [0.5, 0.2]
    });

    var voteSlotSurface = new Surface({
      size: [608, 72],
      content: content,
      classes: ['voting-list']
    });

    voteSlot.add(voteSlotMod).add(voteSlotSurface);

    return voteSlot;

  }

  module.exports = VoteList;

});
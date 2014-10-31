define(function(require, exports, module) {

  var Email = require('./email');

  var Activities = function() {


    this.records = [];


    this._createTasks();
  }

  Activities.prototype.constructor = Activities;

  Activities.prototype._createTasks = function() {

    this.records.push(new Email('read', '/sethome', 'Sets home teleport for your player', '2:25 pm', 0));
    this.records.push(new Email('read', '/home', 'Teleport to your sethome', '2:25 pm', 0));
    this.records.push(new Email('read', '/delhome', 'Delete your home teleport location', '2:25 pm', 0));
    this.records.push(new Email('read', '/back', 'Warps you to the location you last teled from (includes death)', '2:25 pm', 0));
    this.records.push(new Email('read', '/balance', 'Displays your Cloud Currency balance', '2:25 pm', 0));
    this.records.push(new Email('read', '/balancetop', 'Shows user with most Cloud Currency', '2:25 pm', 0));
    this.records.push(new Email('read', '/help', 'Shows help for plugins on server', '2:25 pm', 0));
    this.records.push(new Email('read', '/ignore playername', 'Ignore a specified player', '2:25 pm', 0));
    this.records.push(new Email('read', '/kit tools', 'Gets basic iron toolset', '2:25 pm', 0));
    this.records.push(new Email('read', '/msg playername', 'Message another player in-game', '2:25 pm', 0));
    this.records.push(new Email('read', '/pay playername amount', 'Pay a specified player an amount of Cloud Currency', '2:25 pm', 0));
    this.records.push(new Email('read', '/rules', 'View server rules', '2:25 pm', 0));
    this.records.push(new Email('read', '/spawn', 'Teleport to the server spawn', '2:25 pm', 0));
    this.records.push(new Email('read', '/list', 'Lists the players online', '2:25 pm', 0));
    this.records.push(new Email('read', '/unstuck', 'Use this if trapped inside blocks', '2:25 pm', 0));
    this.records.push(new Email('read', '/afk', 'Use this to put your player into AFK mode', '2:25 pm', 0));
  
    this.records.push(new Email('read', 'All commands in ranks above this', '', '2:25 pm', 0));
    
    this.records.push(new Email('read', 'Gain ability to use trade sign', 'http://ess.khhq.net/wiki/Sign_Tutorial#Trade_Sign', '2:25 pm', 0));  
    this.records.push(new Email('read', 'All commands in ranks above this', '', '2:25 pm', 0));
  
    this.records.push(new Email('read', 'More to come...', '', '2:25 pm', 0));
    this.records.push(new Email('read', 'All commands in ranks above this', '', '2:25 pm', 0));

    this.records.push(new Email('read', '/ban playername', 'Bans specified player', '2:25 pm', 0));
    this.records.push(new Email('read', '/ban-ip playername', 'Ban IP-Address of player', '2:25 pm', 0));
    this.records.push(new Email('read', '/kick playername', 'Kicks specified player', '2:25 pm', 0));
    this.records.push(new Email('read', '/tpa playername', 'Teleport to specified player', '2:25 pm', 0));
    this.records.push(new Email('read', 'All commands in ranks above this', '', '2:25 pm', 0));

    this.records.push(new Email('read', 'Hold down spacebar in air to jump continuously', '', '2:25 pm', 0));
    this.records.push(new Email('read', 'Right click diamond in hand to gain Fire particle trail', '', '2:25 pm', 0));
    this.records.push(new Email('read', 'You can lock one extra chest', '', '2:25 pm', 0));
    this.records.push(new Email('read', '/afk', 'Sets your player to afk mode', '2:25 pm', 0));
    this.records.push(new Email('read', '/jump', 'Aim mouse, use command, fly through the air to location', '2:25 pm', 0));
    this.records.push(new Email('read', '/tpa playername', 'Teleport to your friends', '2:25 pm', 0));
  }

  Activities.prototype.getNumbActivities = function() {
    return this.records.length;
  }

  Activities.prototype.getStatus = function(index) {
    return this.records[index].getStatus();
  }

  Activities.prototype.getFrom = function(index) {
    return this.records[index].getFrom();
  }

  Activities.prototype.getSubject = function(index) {
    return this.records[index].getSubject();
  }

  Activities.prototype.getTime = function(index) {
    return this.records[index].getTime();
  }

  Activities.prototype.getActions = function(index) {
    return this.records[index].getActions();
  }

  module.exports = Activities;

});
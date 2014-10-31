define(function(require, exports, module) {

  var Email = function(status, from, subject, time, actions) {

    this.status = status;
    this.from = from;
    this.subject = subject;
    this.time = time;
    this.actions = actions;

  }

  Email.prototype.constructor = Email;

  Email.prototype.getStatus = function() {
    return this.status;
  }

  Email.prototype.getFrom = function() {
    return this.from;
  }

  Email.prototype.getSubject = function() {
    return this.subject;
  }

  Email.prototype.getTime = function() {
    return this.time;
  }

  Email.prototype.getActions = function() {
    return this.actions;
  }

  module.exports = Email;

});
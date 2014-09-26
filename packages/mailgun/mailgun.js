// Write your package code here!

var EmailLogs = new Meteor.Collection('emailLogs');

var API_KEY = '<<INSERT YOUR API KEY>>';
var DOMAIN = '<<INSERT YOUR DOMAIN>>';
var mailgun = Npm.require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN});


var Fiber = Npm.require('fibers');
var Future = Npm.require('fibers/future')

steps = [];

steps[0] = function(emails, content) {
  Email.send({to: emails, from: "hello@myapp.com", text: content});
  EmailLogs.insert({time: new Date(), userId: Meteor.userId()});
}

steps[1] = function(emails, content, callback) {
  
  var data = {to: emails, from: "hello@myapp.com", text: content};

  mailgun.messages().send(data, function(error, body) {
    if (error)
      return callback(error);
    
    EmailLogs.insert({time: new Date(), userId: Meteor.userId()});
    
    callback(null);
  });
};

steps[2] = function(emails, content, callback) {
  
  var data = {to: emails, from: "hello@myapp.com", text: content};

  mailgun.messages().send(data, function(error, body) {
    // Wrap the callback in a fiber
    new Fiber(function() {
      if (error)
        return callback(error);
    
      EmailLogs.insert({time: new Date(), userId: Meteor.userId()});

      callback(null);
    }).run();
  });
};

steps[3] = function(emails, content) {
  var future = new Future;
  var data = {to: emails, from: "hello@myapp.com", text: content};

  mailgun.messages().send(data, function(error, body) {
    
    // Wrap the callback in a fiber
    new Fiber(function() {
      if (error)
        return future.error(error);
    
      EmailLogs.insert({time: new Date(), userId: Meteor.userId()});

      future.return(null);
    }).run();

  });
  
  return future.wait();
};

steps[4] = function(emails, content) {
  var future = new Future;
  var data = {to: emails, from: "hello@myapp.com", text: content};

  mailgun.messages().send(data, Meteor.bindEnvironment(function(error, body) {
    if (error)
      return future.error(error);
  
    EmailLogs.insert({time: new Date(), userId: Meteor.userId()});

    future.return(null);
  }));
    
  return future.wait();
};

steps[5] = function(emails, content) {
  var future = new Future;
  var data = {to: emails, from: "hello@myapp.com", text: content};

  mailgun.messages().send(data, Meteor.bindEnvironment(function(error, body) {
    if (error)
      return future.error(error);
  
    EmailLogs.insert({time: new Date(), userId: Meteor.userId()});

    future.return(null);
  }));
    
  return future.wait();
};


var messages = mailgun.messages();
var wrappedSend = Meteor._wrapAsync(messages.send.bind(messages));

steps[6] = function(emails, content) {

  var data = {to: emails, from: "hello@myapp.com", text: content};
  
  wrappedSend(data);
  
  EmailLogs.insert({time: new Date(), userId: Meteor.userId()});
};
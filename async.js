if (Meteor.isServer) {
  var STEP = 6;
  
  Meteor.methods({
    sendEmail: function() {
      return steps[STEP]('tom@thesnail.org', 'hello tom!');
    }
  })
} else {
  send = function() {
    Meteor.call('sendEmail', function(error, response) {
      if (error) {
        console.log(error);
      }
    })
  }
}
